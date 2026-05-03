import { pgTable, serial, text, integer, timestamp, unique } from "drizzle-orm/pg-core";
import { entriesTable } from "./entries";

/**
 * Proto-Tujia (Proto-Bizic) cognate groups.
 *
 * Data sourced from:
 *   Zhou, Y. (2020). "Proto-Bizic: A Study of Tujia Historical Phonology."
 *   Stanford University B.A. thesis; surfaced at
 *   https://en.wiktionary.org/wiki/Appendix:Proto-Tujia_reconstructions
 *
 * Each group represents one reconstructed proto-form with cognate reflexes
 * across the six attested Tujia varieties:
 *   Northern: Tasha (Longshan), Laxidong (Longshan), Xianren (Baojing), Xiaolongre (Guzhang)
 *   Southern: Cebu (Luxi), Caji-adi (Luxi)
 */
export const cognateGroupsTable = pgTable("cognate_groups", {
  id: serial("id").primaryKey(),
  wiktionaryNo: integer("wiktionary_no").unique(),
  protoForm: text("proto_form"),
  glossEn: text("gloss_en").notNull(),
  glossZh: text("gloss_zh"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Many-to-many join: dictionary entries ↔ Proto-Tujia cognate groups.
 * An entry may belong to multiple cognate groups (polysemy),
 * and a group may have multiple matched entries per variety.
 */
export const entryCognateGroupsTable = pgTable(
  "entry_cognate_groups",
  {
    id: serial("id").primaryKey(),
    entryId: integer("entry_id")
      .notNull()
      .references(() => entriesTable.id, { onDelete: "cascade" }),
    cognateGroupId: integer("cognate_group_id")
      .notNull()
      .references(() => cognateGroupsTable.id, { onDelete: "cascade" }),
  },
  (table) => [unique().on(table.entryId, table.cognateGroupId)],
);

export type CognateGroup = typeof cognateGroupsTable.$inferSelect;
export type EntryCognateGroup = typeof entryCognateGroupsTable.$inferSelect;
