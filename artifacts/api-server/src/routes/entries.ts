import { Router, type IRouter } from "express";
import { db, entriesTable, translationsTable, languagesTable } from "@workspace/db";
import { eq, ilike, or, sql, desc, asc, and } from "drizzle-orm";
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

router.get("/entries/stats", async (req, res): Promise<void> => {
  const [totalEntries] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(entriesTable);

  const [totalLanguages] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(languagesTable);

  const [totalTranslations] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(translationsTable);

  const categoriesResult = await db
    .selectDistinct({ category: entriesTable.category })
    .from(entriesTable)
    .where(sql`${entriesTable.category} is not null`);

  const languages = await db
    .select()
    .from(languagesTable)
    .orderBy(asc(languagesTable.sortOrder));

  const recentRaw = await db
    .select()
    .from(entriesTable)
    .orderBy(desc(entriesTable.createdAt))
    .limit(6);

  const recentEntries = await Promise.all(
    recentRaw.map(async (entry) => {
      const translations = await db
        .select({
          languageCode: translationsTable.languageCode,
          text: translationsTable.text,
        })
        .from(translationsTable)
        .where(eq(translationsTable.entryId, entry.id));

      const primaryTranslations: Record<string, string> = {};
      for (const t of translations) {
        if (!primaryTranslations[t.languageCode]) {
          primaryTranslations[t.languageCode] = t.text;
        }
      }

      return {
        id: entry.id,
        tujiaWord: entry.tujiaWord,
        toneMarks: entry.toneMarks,
        partOfSpeech: entry.partOfSpeech,
        category: entry.category,
        primaryTranslations,
      };
    })
  );

  res.json(
    GetDictionaryStatsResponse.parse({
      totalEntries: totalEntries.count,
      totalLanguages: totalLanguages.count,
      totalTranslations: totalTranslations.count,
      totalCategories: categoriesResult.length,
      languages,
      recentEntries,
    })
  );
});

router.get("/entries/categories", async (req, res): Promise<void> => {
  const rows = await db
    .select({
      category: entriesTable.category,
      count: sql<number>`count(*)::int`,
    })
    .from(entriesTable)
    .where(sql`${entriesTable.category} is not null`)
    .groupBy(entriesTable.category)
    .orderBy(desc(sql`count(*)`));

  res.json(
    ListCategoriesResponse.parse(
      rows
        .filter((r) => r.category != null)
        .map((r) => ({ category: r.category!, count: r.count }))
    )
  );
});

router.get("/entries", async (req, res): Promise<void> => {
  const parsed = ListEntriesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters", message: parsed.error.message });
    return;
  }

  const { q, language, category, page, limit } = parsed.data;
  const offset = ((page ?? 1) - 1) * (limit ?? 20);
  const pageSize = limit ?? 20;

  let matchingEntryIds: number[] | null = null;

  if (q) {
    const searchTerm = `%${q}%`;

    if (language) {
      const rows = await db
        .select({ entryId: translationsTable.entryId })
        .from(translationsTable)
        .where(
          and(
            eq(translationsTable.languageCode, language),
            ilike(translationsTable.text, searchTerm)
          )
        );
      matchingEntryIds = rows.map((r) => r.entryId);
    } else {
      const tujiaMatches = await db
        .select({ id: entriesTable.id })
        .from(entriesTable)
        .where(ilike(entriesTable.tujiaWord, searchTerm));

      const translationMatches = await db
        .select({ entryId: translationsTable.entryId })
        .from(translationsTable)
        .where(ilike(translationsTable.text, searchTerm));

      const ids = new Set([
        ...tujiaMatches.map((r) => r.id),
        ...translationMatches.map((r) => r.entryId),
      ]);
      matchingEntryIds = Array.from(ids);
    }

    if (matchingEntryIds.length === 0) {
      res.json(
        ListEntriesResponse.parse({
          entries: [],
          total: 0,
          page: page ?? 1,
          limit: pageSize,
          totalPages: 0,
        })
      );
      return;
    }
  }

  const conditions = [];
  if (matchingEntryIds !== null) {
    conditions.push(sql`${entriesTable.id} = ANY(${sql.raw(`ARRAY[${matchingEntryIds.join(",")}]::int[]`)})`)
  }
  if (category) {
    conditions.push(eq(entriesTable.category, category));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ total }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(entriesTable)
    .where(whereClause);

  const rawEntries = await db
    .select()
    .from(entriesTable)
    .where(whereClause)
    .orderBy(asc(entriesTable.tujiaWord))
    .limit(pageSize)
    .offset(offset);

  const entries = await Promise.all(
    rawEntries.map(async (entry) => {
      const translations = await db
        .select({
          languageCode: translationsTable.languageCode,
          text: translationsTable.text,
        })
        .from(translationsTable)
        .where(eq(translationsTable.entryId, entry.id));

      const primaryTranslations: Record<string, string> = {};
      for (const t of translations) {
        if (!primaryTranslations[t.languageCode]) {
          primaryTranslations[t.languageCode] = t.text;
        }
      }

      return {
        id: entry.id,
        tujiaWord: entry.tujiaWord,
        toneMarks: entry.toneMarks,
        partOfSpeech: entry.partOfSpeech,
        category: entry.category,
        primaryTranslations,
      };
    })
  );

  res.json(
    ListEntriesResponse.parse({
      entries,
      total,
      page: page ?? 1,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  );
});

router.get("/entries/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetEntryParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid entry ID", message: params.error.message });
    return;
  }

  const [entry] = await db
    .select()
    .from(entriesTable)
    .where(eq(entriesTable.id, params.data.id));

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
      ...entry,
      createdAt: entry.createdAt.toISOString(),
      translations: rawTranslations,
    })
  );
});

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
    .where(
      and(
        eq(entriesTable.category, entry.category),
        sql`${entriesTable.id} != ${params.data.id}`
      )
    )
    .limit(6);

  const related = await Promise.all(
    rawRelated.map(async (e) => {
      const translations = await db
        .select({ languageCode: translationsTable.languageCode, text: translationsTable.text })
        .from(translationsTable)
        .where(eq(translationsTable.entryId, e.id));

      const primaryTranslations: Record<string, string> = {};
      for (const t of translations) {
        if (!primaryTranslations[t.languageCode]) {
          primaryTranslations[t.languageCode] = t.text;
        }
      }

      return {
        id: e.id,
        tujiaWord: e.tujiaWord,
        toneMarks: e.toneMarks,
        partOfSpeech: e.partOfSpeech,
        category: e.category,
        primaryTranslations,
      };
    })
  );

  res.json(GetRelatedEntriesResponse.parse(related));
});

export default router;
