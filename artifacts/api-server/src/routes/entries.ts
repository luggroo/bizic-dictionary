import { Router, type IRouter } from "express";
import { db, entriesTable, translationsTable, languagesTable, cognateGroupsTable, entryCognateGroupsTable } from "@workspace/db";
import { eq, ilike, sql, desc, asc, and, inArray } from "drizzle-orm";
import {
  ListEntriesQueryParams,
  GetEntryParams,
  GetRelatedEntriesParams,
  ListEntriesResponse,
  GetEntryResponse,
  GetDictionaryStatsResponse,
  ListCategoriesResponse,
  GetRelatedEntriesResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function normalizePartOfSpeech(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function normalizeChineseTranslation(entryId: number, languageCode: string, text: string): string {
  if (languageCode !== "zh") return text;
  const fixes: Record<number, string> = {
    9345: "阴天",
    10767: "天",
    10808: "天",
    11030: "天",
    7425: "句末助词",
    7422: "否定动词后缀",
    7409: "男性性别后缀",
    7410: "小称后缀",
    7413: "复数后缀",
    7414: "处所后缀",
    7420: "相关名词后缀",
  };
  return fixes[entryId] ?? text;
}

function selectChineseTranslations(translations: Array<{ languageCode: string; text: string; notes?: string | null }>, partOfSpeech: string | null | undefined): string[] {
  const zhTranslations = translations.filter((t) => t.languageCode === "zh");
  if (zhTranslations.length === 0) return [];

  const pos = normalizePartOfSpeech(partOfSpeech);
  if (!pos) return zhTranslations.map((t) => t.text);

  const preferred = zhTranslations.filter((t) => {
    const text = t.text.trim();
    const notes = (t.notes ?? "").trim().toLowerCase();
    if (pos.includes("adj")) return text === "瘦" || notes.includes("adjective") || notes.includes("adj");
    if (pos.includes("noun")) return text !== "瘦肉";
    if (pos.includes("verb")) return notes.includes("verb") || notes.includes("v.");
    return false;
  });
  const source = preferred.length > 0 ? preferred : zhTranslations;
  const seen = new Set<string>();
  const result: string[] = [];
  for (const t of source) {
    const text = t.text.trim();
    if (!text || seen.has(text)) continue;
    seen.add(text);
    result.push(text);
  }
  return result;
}

async function buildPrimaryTranslations(entryId: number, partOfSpeech?: string | null): Promise<Record<string, string>> {
  const translations = await db
    .select({ languageCode: translationsTable.languageCode, text: translationsTable.text, notes: translationsTable.notes })
    .from(translationsTable)
    .where(eq(translationsTable.entryId, entryId));
  const map: Record<string, string> = {};
  const zh = selectChineseTranslations(translations, partOfSpeech);
  if (zh.length > 0) map.zh = zh.map((text) => normalizeChineseTranslation(entryId, "zh", text)).join("; ");
  for (const t of translations) {
    if (t.languageCode === "zh") continue;
    if (!map[t.languageCode]) map[t.languageCode] = t.text;
  }
  return map;
}

function toForms(entry: { tujiaSpelling: string | null; tujiaToned: string | null; ipa: string | null; swMandarin: string | null }) {
  return {
    spelling: entry.tujiaSpelling,
    toned: entry.tujiaToned,
    ipa: entry.ipa,
    swMandarin: entry.swMandarin,
  };
}

function toSummary(entry: typeof entriesTable.$inferSelect, primaryTranslations: Record<string, string>) {
  return {
    id: entry.id,
    tujiaWord: entry.tujiaWord,
    variety: entry.variety,
    dialect: entry.dialect,
    forms: toForms(entry),
    partOfSpeech: entry.partOfSpeech,
    category: entry.category,
    source: entry.source,
    primaryTranslations,
  };
}

async function getCognateSummaries(entryId: number) {
  const rows = await db
    .select({
      groupId: cognateGroupsTable.id,
      wiktionaryNo: cognateGroupsTable.wiktionaryNo,
      protoForm: cognateGroupsTable.protoForm,
      glossEn: cognateGroupsTable.glossEn,
      glossZh: cognateGroupsTable.glossZh,
    })
    .from(entryCognateGroupsTable)
    .innerJoin(cognateGroupsTable, eq(entryCognateGroupsTable.cognateGroupId, cognateGroupsTable.id))
    .where(eq(entryCognateGroupsTable.entryId, entryId));
  return rows;
}

async function rankedSearch(q: string): Promise<number[]> {
  const term = q.trim();
  if (!term) return [];
  if (term.length < 3) {
    const rows = await db.execute(sql`
      SELECT DISTINCT e.id
      FROM entries e
      LEFT JOIN translations t ON t.entry_id = e.id
      WHERE e.tujia_word ILIKE ${term + '%'}
        OR e.ipa ILIKE ${term + '%'}
        OR t.text ILIKE ${term + '%'}
      LIMIT 200
    `);
    return (rows.rows as unknown as { id: number }[]).map((r) => r.id);
  }
  const rows = await db.execute(sql`
    WITH
    fts AS (
      SELECT t.entry_id, MAX(ts_rank_cd(to_tsvector('english', t.text), websearch_to_tsquery('english', ${term}))) AS fts_rank
      FROM translations t
      WHERE to_tsvector('english', t.text) @@ websearch_to_tsquery('english', ${term})
      GROUP BY t.entry_id
    ),
    trgm AS (
      SELECT e.id AS entry_id, GREATEST(word_similarity(${term}, e.tujia_word), COALESCE(word_similarity(${term}, e.ipa), 0.0)) AS trgm_score
      FROM entries e
      WHERE ${term} <% e.tujia_word OR ${term} <% COALESCE(e.ipa, '')
    ),
    ilike_hits AS (
      SELECT DISTINCT e.id AS entry_id, 0.3::float AS ilike_score
      FROM entries e
      LEFT JOIN translations t ON t.entry_id = e.id
      WHERE e.tujia_word ILIKE ${'%' + term + '%'}
        OR e.ipa ILIKE ${'%' + term + '%'}
        OR t.text ILIKE ${'%' + term + '%'}
    ),
    all_hits AS (
      SELECT entry_id FROM fts
      UNION SELECT entry_id FROM trgm
      UNION SELECT entry_id FROM ilike_hits
    ),
    scored AS (
      SELECT h.entry_id,
        COALESCE(f.fts_rank, 0.0) * 3.0 + COALESCE(t.trgm_score, 0.0) * 2.0 + COALESCE(i.ilike_score, 0.0) AS score
      FROM all_hits h
      LEFT JOIN fts f ON f.entry_id = h.entry_id
      LEFT JOIN trgm t ON t.entry_id = h.entry_id
      LEFT JOIN ilike_hits i ON i.entry_id = h.entry_id
    )
    SELECT entry_id, score FROM scored ORDER BY score DESC LIMIT 2000
  `);
  return (rows.rows as unknown as { entry_id: number }[]).map((r) => r.entry_id);
}

router.get("/entries/:id/cognates", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const parsed = GetEntryParams.safeParse({ id: parseInt(raw, 10) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid entry ID", message: parsed.error.message });
    return;
  }
  const cognates = await getCognateSummaries(parsed.data.id);
  res.json({ cognates });
});

router.get("/entries/stats", async (req, res): Promise<void> => {
  const [totalEntries] = await db.select({ count: sql<number>`count(*)::int` }).from(entriesTable);
  const [totalLanguages] = await db.select({ count: sql<number>`count(*)::int` }).from(languagesTable);
  const [totalTranslations] = await db.select({ count: sql<number>`count(*)::int` }).from(translationsTable);
  const categoriesResult = await db.selectDistinct({ category: entriesTable.category }).from(entriesTable).where(sql`${entriesTable.category} is not null`);
  const [northernRow] = await db.select({ count: sql<number>`count(*)::int` }).from(entriesTable).where(eq(entriesTable.variety, "northern"));
  const [southernRow] = await db.select({ count: sql<number>`count(*)::int` }).from(entriesTable).where(eq(entriesTable.variety, "southern"));
  const languages = await db.select().from(languagesTable).orderBy(asc(languagesTable.sortOrder));
  const recentRaw = await db.select().from(entriesTable).orderBy(desc(entriesTable.createdAt)).limit(6);
  const recentEntries = await Promise.all(recentRaw.map(async (e) => toSummary(e, await buildPrimaryTranslations(e.id, e.partOfSpeech))));
  res.json(GetDictionaryStatsResponse.parse({ totalEntries: totalEntries.count, totalLanguages: totalLanguages.count, totalTranslations: totalTranslations.count, totalCategories: categoriesResult.length, northernCount: northernRow?.count ?? 0, southernCount: southernRow?.count ?? 0, languages, recentEntries }));
});

router.get("/entries/categories", async (req, res): Promise<void> => {
  const rows = await db.select({ category: entriesTable.category, count: sql<number>`count(*)::int` }).from(entriesTable).where(sql`${entriesTable.category} is not null`).groupBy(entriesTable.category).orderBy(desc(sql`count(*)`));
  res.json(ListCategoriesResponse.parse(rows.filter((r) => r.category != null).map((r) => ({ category: r.category!, count: r.count }))));
});

router.get("/entries", async (req, res): Promise<void> => {
  const parsed = ListEntriesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters", message: parsed.error.message });
    return;
  }
  const { q, category, variety, dialect, page, limit } = parsed.data;
  const offset = ((page ?? 1) - 1) * (limit ?? 20);
  const pageSize = limit ?? 20;
  let rankedIds: number[] | null = null;
  if (q) {
    rankedIds = await rankedSearch(q);
    if (rankedIds.length === 0) {
      res.json(ListEntriesResponse.parse({ entries: [], total: 0, page: page ?? 1, limit: pageSize, totalPages: 0 }));
      return;
    }
  }
  const extraConditions = [];
  if (category) extraConditions.push(eq(entriesTable.category, category));
  if (variety) extraConditions.push(eq(entriesTable.variety, variety));
  if (dialect) extraConditions.push(eq(entriesTable.dialect, dialect));
  let rawEntries: (typeof entriesTable.$inferSelect)[];
  let total: number;
  if (rankedIds && rankedIds.length > 0) {
    let filteredIds = rankedIds;
    if (extraConditions.length > 0) {
      const filterRows = await db.select({ id: entriesTable.id }).from(entriesTable).where(and(inArray(entriesTable.id, rankedIds), ...extraConditions));
      const passSet = new Set(filterRows.map((r) => r.id));
      filteredIds = rankedIds.filter((id) => passSet.has(id));
    }
    total = filteredIds.length;
    const pagedIds = filteredIds.slice(offset, offset + pageSize);
    if (pagedIds.length === 0) rawEntries = [];
    else {
      const fetched = await db.select().from(entriesTable).where(inArray(entriesTable.id, pagedIds));
      const byId = new Map(fetched.map((e) => [e.id, e]));
      rawEntries = pagedIds.map((id) => byId.get(id)!).filter(Boolean);
    }
  } else {
    const whereClause = extraConditions.length > 0 ? and(...extraConditions) : undefined;
    const [countRow] = await db.select({ total: sql<number>`count(*)::int` }).from(entriesTable).where(whereClause);
    total = countRow.total;
    rawEntries = await db.select().from(entriesTable).where(whereClause).orderBy(asc(entriesTable.tujiaWord)).limit(pageSize).offset(offset);
  }
  const entries = await Promise.all(rawEntries.map(async (e) => toSummary(e, await buildPrimaryTranslations(e.id, e.partOfSpeech))));
  res.json(ListEntriesResponse.parse({ entries, total, page: page ?? 1, limit: pageSize, totalPages: Math.ceil(total / pageSize) }));
});

router.get("/entries/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetEntryParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid entry ID", message: params.error.message });
    return;
  }
  const [entry] = await db.select().from(entriesTable).where(eq(entriesTable.id, params.data.id));
  if (!entry) {
    res.status(404).json({ error: "Not found", message: "Entry not found" });
    return;
  }
  const rawTranslations = await db.select({ id: translationsTable.id, languageCode: translationsTable.languageCode, text: translationsTable.text, romanization: translationsTable.romanization, notes: translationsTable.notes, languageName: languagesTable.name, languageNativeName: languagesTable.nativeName, flag: languagesTable.flag }).from(translationsTable).innerJoin(languagesTable, eq(translationsTable.languageCode, languagesTable.code)).where(eq(translationsTable.entryId, entry.id)).orderBy(asc(languagesTable.sortOrder));
  const cognates = await getCognateSummaries(entry.id);
  res.json(GetEntryResponse.parse({ id: entry.id, tujiaWord: entry.tujiaWord, variety: entry.variety, dialect: entry.dialect, forms: toForms(entry), partOfSpeech: entry.partOfSpeech, category: entry.category, exampleSentence: entry.exampleSentence, exampleTranslation: entry.exampleTranslation, culturalNote: entry.culturalNote, source: entry.source, createdAt: entry.createdAt.toISOString(), translations: rawTranslations, cognates }));
});

router.get("/entries/:id/related", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetRelatedEntriesParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid entry ID", message: params.error.message });
    return;
  }
  const [entry] = await db.select({ category: entriesTable.category }).from(entriesTable).where(eq(entriesTable.id, params.data.id));
  if (!entry || !entry.category) {
    res.json(GetRelatedEntriesResponse.parse([]));
    return;
  }
  const rawRelated = await db.select().from(entriesTable).where(and(eq(entriesTable.category, entry.category), sql`${entriesTable.id} != ${params.data.id}`)).limit(6);
  const related = await Promise.all(rawRelated.map(async (e) => toSummary(e, await buildPrimaryTranslations(e.id, e.partOfSpeech))));
  res.json(GetRelatedEntriesResponse.parse(related));
});

export default router;
