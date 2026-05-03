import { Router, type IRouter } from "express";
import { db, entriesTable } from "@workspace/db";
import { sql, asc } from "drizzle-orm";
import { ListDialectsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dialects", async (req, res): Promise<void> => {
  const rows = await db
    .select({
      variety: entriesTable.variety,
      dialect: entriesTable.dialect,
      count: sql<number>`count(*)::int`,
    })
    .from(entriesTable)
    .where(sql`${entriesTable.dialect} is not null`)
    .groupBy(entriesTable.variety, entriesTable.dialect)
    .orderBy(asc(entriesTable.variety), asc(entriesTable.dialect));

  res.json(
    ListDialectsResponse.parse(
      rows
        .filter((r) => r.dialect != null)
        .map((r) => ({ variety: r.variety, dialect: r.dialect!, count: r.count }))
    )
  );
});

export default router;
