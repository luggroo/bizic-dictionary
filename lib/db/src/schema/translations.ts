import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { entriesTable } from "./entries";
import { languagesTable } from "./languages";

export const translationsTable = pgTable("translations", {
  id: serial("id").primaryKey(),
  entryId: integer("entry_id").notNull().references(() => entriesTable.id, { onDelete: "cascade" }),
  languageCode: text("language_code").notNull().references(() => languagesTable.code, { onDelete: "cascade" }),
  text: text("text").notNull(),
  romanization: text("romanization"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTranslationSchema = createInsertSchema(translationsTable).omit({ id: true, createdAt: true });
export type InsertTranslation = z.infer<typeof insertTranslationSchema>;
export type Translation = typeof translationsTable.$inferSelect;
