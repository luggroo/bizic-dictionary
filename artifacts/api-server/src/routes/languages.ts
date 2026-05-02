import { Router, type IRouter } from "express";
import { db, languagesTable } from "@workspace/db";
import { asc } from "drizzle-orm";
import { ListLanguagesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/languages", async (req, res): Promise<void> => {
  const langs = await db
    .select()
    .from(languagesTable)
    .orderBy(asc(languagesTable.sortOrder));

  res.json(ListLanguagesResponse.parse(langs));
});

export default router;
