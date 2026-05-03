import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

/**
 * variety: 'northern' | 'southern'
 *   Northern Tujia (北部土家语 Bizika) — spoken mainly in Longshan, Laifeng, Yongshun,
 *     Baojing, Sangzhi counties of Hunan and western Hubei. Has multiple dialects.
 *   Southern Tujia (南部土家语 Mnjang) — spoken in a small area of Hunan, severely endangered.
 *
 * dialect: specific dialect within the variety, e.g.:
 *   Northern: 'Longshan', 'Laifeng', 'Yongshun', 'Baojing', 'Sangzhi'
 *   Southern: 'Maoba', 'Hefeng'
 *
 * Four Tujia word forms (see Bifzivkar orthography):
 *   tujiaSpelling  — Bifzivkar romanization without tones  (e.g. "bifzivkar")
 *   tujiaToned     — Bifzivkar with pinyin-style tone diacritics  (e.g. "bízìkǎ")
 *   ipa            — International Phonetic Alphabet transcription (e.g. "pi²zi³ka³")
 *   swMandarin     — Southwest Mandarin sound-alikes written in Chinese characters (e.g. "币子卡")
 */
export const entriesTable = pgTable("entries", {
  id: serial("id").primaryKey(),
  // Canonical display form (same as tujiaSpelling)
  tujiaWord: text("tujia_word").notNull(),
  // Variety and dialect
  variety: text("variety").notNull().default("northern"),
  dialect: text("dialect"),
  // Four Tujia representations
  tujiaSpelling: text("tujia_spelling"),
  tujiaToned: text("tujia_toned"),
  ipa: text("ipa"),
  swMandarin: text("sw_mandarin"),
  // Legacy / combined tone marks (kept for backward compat)
  toneMarks: text("tone_marks"),
  // Linguistic metadata
  partOfSpeech: text("part_of_speech"),
  category: text("category"),
  exampleSentence: text("example_sentence"),
  exampleTranslation: text("example_translation"),
  culturalNote: text("cultural_note"),
  // Academic source citation(s) from STEDT or other datasets
  source: text("source"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertEntrySchema = createInsertSchema(entriesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertEntry = z.infer<typeof insertEntrySchema>;
export type Entry = typeof entriesTable.$inferSelect;
