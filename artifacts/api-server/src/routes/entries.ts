import { Router, type IRouter } from "express";
import { db, entriesTable, translationsTable, languagesTable } from "@workspace/db";
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

// ─── helpers ────────────────────────────────────────────────────────────────

async function buildPrimaryTranslations(entryId: number): Promise<Record<string, string>> {
  const translations = await db
    .select({ languageCode: translationsTable.languageCode, text: translationsTable.text })
    .from(translationsTable)
    .where(eq(translationsTable.entryId, entryId));
  const map: Record<string, string> = {};
  for (const t of translations) {
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

/**
 * Ranked full-text + trigram search.
 *
 * Strategy:
 *  1. FTS via websearch_to_tsquery on translations.text (English meanings)
 *  2. Trigram word_similarity on entries.tujia_word and entries.ipa (phonetic forms)
 *  3. Exact/prefix ILIKE fallback for very short queries (< 3 chars)
 *  4. FULL OUTER JOIN and combine scores; sort by combined score desc
 *
 * Returns entry IDs ordered by relevance score.
 */
async function rankedSearch(q: string): Promise<number[]> {
  const term = q.trim();
  if (!term) return [];

  // Very short queries: just do prefix ILIKE (FTS/trigram not useful)
  if (term.length < 3) {
    const rows = await db.execute(sql`
      SELECT DISTINCT e.id
      FROM entries e
      LEFT JOIN translations t ON t.entry_id = e.id
      WHERE e.tujia_word ILIKE ${term + '%'}
        OR e.ipa         ILIKE ${term + '%'}
        OR t.text        ILIKE ${term + '%'}
      LIMIT 200
    `);
    return (rows.rows as unknown as { id: number }[]).map((r) => r.id);
  }

  // Build tsquery — websearch_to_tsquery handles operators AND OR - "phrase" etc.
  // Falls back gracefully if query produces an empty tsquery (e.g. all stop-words).
  const rows = await db.execute(sql`
    WITH
    -- ── Full-text search on English (and any other) translations ─────────────
    fts AS (
      SELECT
        t.entry_id,
        MAX(ts_rank_cd(to_tsvector('english', t.text),
                       websearch_to_tsquery('english', ${term}))) AS fts_rank
      FROM translations t
      WHERE to_tsvector('english', t.text)
            @@ websearch_to_tsquery('english', ${term})
      GROUP BY t.entry_id
    ),

    -- ── Trigram similarity on Tujia/IPA phonetic forms ───────────────────────
    trgm AS (
      SELECT
        e.id AS entry_id,
        GREATEST(
          word_similarity(${term}, e.tujia_word),
          COALESCE(word_similarity(${term}, e.ipa), 0.0)
        ) AS trgm_score
      FROM entries e
      WHERE ${term} <% e.tujia_word
         OR ${term} <% COALESCE(e.ipa, '')
    ),

    -- ── ILIKE fallback for partial substring matches ──────────────────────────
    ilike_hits AS (
      SELECT DISTINCT e.id AS entry_id, 0.3::float AS ilike_score
      FROM entries e
      LEFT JOIN translations t ON t.entry_id = e.id
      WHERE e.tujia_word ILIKE ${'%' + term + '%'}
         OR e.ipa        ILIKE ${'%' + term + '%'}
         OR t.text       ILIKE ${'%' + term + '%'}
    ),

    -- ── Union all three sources ───────────────────────────────────────────────
    all_hits AS (
      SELECT entry_id FROM fts
      UNION
      SELECT entry_id FROM trgm
      UNION
      SELECT entry_id FROM ilike_hits
    ),

    -- ── Score each candidate ──────────────────────────────────────────────────
    scored AS (
      SELECT
        h.entry_id,
        COALESCE(f.fts_rank,   0.0) * 3.0   -- weight: FTS is most semantically relevant
        + COALESCE(t.trgm_score, 0.0) * 2.0  -- weight: phonetic form match
        + COALESCE(i.ilike_score, 0.0)        -- weight: broad substring fallback
        AS score
      FROM all_hits h
      LEFT JOIN fts      f ON f.entry_id = h.entry_id
      LEFT JOIN trgm     t ON t.entry_id = h.entry_id
      LEFT JOIN ilike_hits i ON i.entry_id = h.entry_id
    )

    SELECT entry_id, score
    FROM scored
    ORDER BY score DESC
    LIMIT 2000
  `);

  return (rows.rows as unknown as { entry_id: number }[]).map((r) => r.entry_id);
}

// ─── stats ──────────────────────────────────────────────────────────────────

router.get("/entries/stats", async (req, res): Promise<void> => {
  const [totalEntries] = await db.select({ count: sql<number>`count(*)::int` }).from(entriesTable);
  const [totalLanguages] = await db.select({ count: sql<number>`count(*)::int` }).from(languagesTable);
  const [totalTranslations] = await db.select({ count: sql<number>`count(*)::int` }).from(translationsTable);

  const categoriesResult = await db
    .selectDistinct({ category: entriesTable.category })
    .from(entriesTable)
    .where(sql`${entriesTable.category} is not null`);

  const [northernRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(entriesTable)
    .where(eq(entriesTable.variety, "northern"));

  const [southernRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(entriesTable)
    .where(eq(entriesTable.variety, "southern"));

  const languages = await db.select().from(languagesTable).orderBy(asc(languagesTable.sortOrder));

  const recentRaw = await db
    .select()
    .from(entriesTable)
    .orderBy(desc(entriesTable.createdAt))
    .limit(6);

  const recentEntries = await Promise.all(
    recentRaw.map(async (e) => toSummary(e, await buildPrimaryTranslations(e.id)))
  );

  res.json(
    GetDictionaryStatsResponse.parse({
      totalEntries: totalEntries.count,
      totalLanguages: totalLanguages.count,
      totalTranslations: totalTranslations.count,
      totalCategories: categoriesResult.length,
      northernCount: northernRow?.count ?? 0,
      southernCount: southernRow?.count ?? 0,
      languages,
      recentEntries,
    })
  );
});

// ─── categories ─────────────────────────────────────────────────────────────

router.get("/entries/categories", async (req, res): Promise<void> => {
  const rows = await db
    .select({ category: entriesTable.category, count: sql<number>`count(*)::int` })
    .from(entriesTable)
    .where(sql`${entriesTable.category} is not null`)
    .groupBy(entriesTable.category)
    .orderBy(desc(sql`count(*)`));

  res.json(
    ListCategoriesResponse.parse(
      rows.filter((r) => r.category != null).map((r) => ({ category: r.category!, count: r.count }))
    )
  );
});

// ─── list / search ───────────────────────────────────────────────────────────

router.get("/entries", async (req, res): Promise<void> => {
  const parsed = ListEntriesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters", message: parsed.error.message });
    return;
  }

  const { q, language, category, variety, dialect, page, limit } = parsed.data;
  const offset = ((page ?? 1) - 1) * (limit ?? 20);
  const pageSize = limit ?? 20;

  // ── Ranked search ──────────────────────────────────────────────────────────
  let rankedIds: number[] | null = null;

  if (q) {
    rankedIds = await rankedSearch(q);

    if (rankedIds.length === 0) {
      res.json(
        ListEntriesResponse.parse({ entries: [], total: 0, page: page ?? 1, limit: pageSize, totalPages: 0 })
      );
      return;
    }
  }

  // ── Build extra filters (not the ID list — handled separately for ranked path) ──
  const extraConditions = [];
  if (category) extraConditions.push(eq(entriesTable.category, category));
  if (variety)  extraConditions.push(eq(entriesTable.variety, variety));
  if (dialect)  extraConditions.push(eq(entriesTable.dialect, dialect));

  // ── Fetch page, preserving rank order when searching ──────────────────────
  let rawEntries: (typeof entriesTable.$inferSelect)[];
  let total: number;

  if (rankedIds && rankedIds.length > 0) {
    // Apply extra filters to narrow the ranked set while keeping rank order.
    let filteredIds = rankedIds;
    if (extraConditions.length > 0) {
      // Fetch IDs that also satisfy category/variety/dialect filters.
      // inArray with up to 2000 IDs is fine for Postgres.
      const filterRows = await db
        .select({ id: entriesTable.id })
        .from(entriesTable)
        .where(and(inArray(entriesTable.id, rankedIds), ...extraConditions));
      const passSet = new Set(filterRows.map((r) => r.id));
      filteredIds = rankedIds.filter((id) => passSet.has(id));
    }

    total = filteredIds.length;
    const pagedIds = filteredIds.slice(offset, offset + pageSize);

    if (pagedIds.length === 0) {
      rawEntries = [];
    } else {
      // Use Drizzle typed select — gives camelCase column mapping automatically.
      const fetched = await db
        .select()
        .from(entriesTable)
        .where(inArray(entriesTable.id, pagedIds));
      // Restore rank order (DB may return in any order with inArray).
      const byId = new Map(fetched.map((e) => [e.id, e]));
      rawEntries = pagedIds.map((id) => byId.get(id)!).filter(Boolean);
    }
  } else {
    // No search query — plain listing with optional filters
    const whereClause = extraConditions.length > 0 ? and(...extraConditions) : undefined;

    const [countRow] = await db
      .select({ total: sql<number>`count(*)::int` })
      .from(entriesTable)
      .where(whereClause);
    total = countRow.total;

    rawEntries = await db
      .select()
      .from(entriesTable)
      .where(whereClause)
      .orderBy(asc(entriesTable.tujiaWord))
      .limit(pageSize)
      .offset(offset);
  }

  const entries = await Promise.all(
    rawEntries.map(async (e) => toSummary(e, await buildPrimaryTranslations(e.id)))
  );

  res.json(
    ListEntriesResponse.parse({ entries, total, page: page ?? 1, limit: pageSize, totalPages: Math.ceil(total / pageSize) })
  );
});

// ─── entry detail ────────────────────────────────────────────────────────────

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

  const rawTranslations = await db
    .select({
      id: translationsTable.id,
      languageCode: translationsTable.languageCode,
      text: translationsTable.text,
      romanization: translationsTable.romanization,
      notes: translationsTable.notes,
      languageName: languagesTable.name,
      languageNativeName: languagesTable.nativeName,
      flag: languagesTable.flag,
    })
    .from(translationsTable)
    .innerJoin(languagesTable, eq(translationsTable.languageCode, languagesTable.code))
    .where(eq(translationsTable.entryId, entry.id))
    .orderBy(asc(languagesTable.sortOrder));

  res.json(
    GetEntryResponse.parse({
      id: entry.id,
      tujiaWord: entry.tujiaWord,
      variety: entry.variety,
      dialect: entry.dialect,
      forms: toForms(entry),
      partOfSpeech: entry.partOfSpeech,
      category: entry.category,
      exampleSentence: entry.exampleSentence,
      exampleTranslation: entry.exampleTranslation,
      culturalNote: entry.culturalNote,
      source: entry.source,
      createdAt: entry.createdAt.toISOString(),
      translations: rawTranslations,
    })
  );
});

// ─── related entries ─────────────────────────────────────────────────────────

router.get("/entries/:id/related", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetRelatedEntriesParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid entry ID", message: params.error.message });
    return;
  }

  const [entry] = await db
    .select({ category: entriesTable.category })
    .from(entriesTable)
    .where(eq(entriesTable.id, params.data.id));

  if (!entry || !entry.category) {
    res.json(GetRelatedEntriesResponse.parse([]));
    return;
  }

  const rawRelated = await db
    .select()
    .from(entriesTable)
    .where(and(eq(entriesTable.category, entry.category), sql`${entriesTable.id} != ${params.data.id}`))
    .limit(6);

  const related = await Promise.all(
    rawRelated.map(async (e) => toSummary(e, await buildPrimaryTranslations(e.id)))
  );

  res.json(GetRelatedEntriesResponse.parse(related));
});

export default router;
