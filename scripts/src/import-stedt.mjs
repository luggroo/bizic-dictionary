/**
 * STEDT Tujia Lexicon Importer
 * Run: node scripts/src/import-stedt.mjs
 *
 * Field order from STEDT search/ajax:
 *   [0] rn, [1] analysis, [2] reflex, [3] gloss, [4] gfn,
 *   [5] lgid, [6] language, [7] grpid, [8] grpno, [9] grp,
 *   [10] citation, [11] srcabbr, [12] srcid, [13] semkey,
 *   [14] chaptertitle, [15] num_notes
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pg = require("/home/runner/workspace/lib/db/node_modules/pg");
const { Client } = pg;

const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();

// ── 1. Fetch ─────────────────────────────────────────────────────────────────
console.log("Fetching STEDT Tujia data…");
const resp = await fetch("https://stedtdb.johnblowe.com/search/ajax", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
    Referer: "https://stedtdb.johnblowe.com/gnis?lg=tujia",
  },
  body: "tbl=lexicon&lggrp=5&f=&s=&start=0&limit=9999",
});
const json = await resp.json();
const rows = json.data ?? [];
console.log(`Fetched ${rows.length} raw STEDT records`);

// ── 2. Process ───────────────────────────────────────────────────────────────
function mapVariety(langName) {
  if (langName?.includes("Southern")) return "southern";
  return "northern";
}
function cleanGloss(g) {
  if (!g) return null;
  const s = g.trim();
  if (!s || /^\[.*\]$/.test(s)) return null;
  if (/^[\d\s\-\/]+$/.test(s)) return null;
  return s;
}
const posMap = {
  "n.": "noun", "v.": "verb", "adj.": "adjective", "adv.": "adverb",
  "pron.": "pronoun", "num.": "numeral", "clf.": "classifier",
  "part.": "particle", "prep.": "preposition", "conj.": "conjunction",
  "nsuff.": "nominal suffix", "vsuff.": "verbal suffix",
  "suff.": "suffix", "pref.": "prefix",
};
function cleanPos(gfn) {
  if (!gfn?.trim()) return null;
  return posMap[gfn.trim().toLowerCase()] ?? gfn.trim();
}

// Group by (reflex, variety) — collect all glosses and ALL unique citations
const entryMap = new Map();
for (const row of rows) {
  const [rn, , reflex, gloss, gfn, , language, , , , citation, srcabbr, , , chaptertitle] = row;
  if (!reflex?.trim()) continue;
  const g = cleanGloss(gloss);
  if (!g) continue;

  const variety = mapVariety(language);
  const key = `${reflex.trim()}|||${variety}`;

  if (!entryMap.has(key)) {
    entryMap.set(key, {
      word: reflex.trim(), ipa: reflex.trim(), variety,
      pos: cleanPos(gfn), category: chaptertitle?.trim() || null,
      glosses: new Set(),
      citations: new Set(),  // collect all unique citations
    });
  }
  const e = entryMap.get(key);
  e.glosses.add(g);
  if (!e.category && chaptertitle?.trim()) e.category = chaptertitle.trim();
  if (!e.pos && gfn?.trim()) e.pos = cleanPos(gfn);
  // Record citation — prefer the human-readable citation over the srcabbr code
  const cite = citation?.trim() || srcabbr?.trim();
  if (cite) e.citations.add(cite);
}

const entries = Array.from(entryMap.values());
console.log(`Unique entries: ${entries.length}`);

// ── 3. Ensure English language row ───────────────────────────────────────────
await db.query(`
  INSERT INTO languages (code, name, native_name, flag, is_base, sort_order)
  VALUES ('en','English','English','🇬🇧',false,2)
  ON CONFLICT (code) DO NOTHING
`);

// ── 4. Clear old STEDT entries ────────────────────────────────────────────────
await db.query(`DELETE FROM entries WHERE 1=1`);
console.log("Cleared old entries. Inserting fresh STEDT data…");

// ── 5. Bulk insert entries in batches of 200 ──────────────────────────────────
const BATCH = 200;
let totalEntries = 0;
const entryRows = []; // { id, glosses }

for (let i = 0; i < entries.length; i += BATCH) {
  const batch = entries.slice(i, i + BATCH);
  const vals = [];
  const params = [];
  let p = 1;
  for (const e of batch) {
    const sourceStr = e.citations.size > 0 ? [...e.citations].join(" / ") : null;
    vals.push(`($${p++},$${p++},$${p++},$${p++},$${p++},$${p++})`);
    params.push(e.word, e.ipa, e.variety, e.pos, e.category, sourceStr);
  }
  const res = await db.query(
    `INSERT INTO entries (tujia_word,ipa,variety,part_of_speech,category,source) VALUES ${vals.join(",")} RETURNING id`,
    params
  );
  res.rows.forEach((row, j) => entryRows.push({ id: row.id, glosses: batch[j].glosses }));
  totalEntries += res.rows.length;
  process.stdout.write(`\r  Entries: ${totalEntries}/${entries.length}  `);
}
console.log(`\nInserted ${totalEntries} entries`);

// ── 6. Bulk insert translations ───────────────────────────────────────────────
const allTrans = [];
for (const { id, glosses } of entryRows) {
  for (const g of glosses) allTrans.push({ entryId: id, text: g });
}
console.log(`Total translations to insert: ${allTrans.length}`);

const TBATCH = 500;
let totalTrans = 0;
for (let i = 0; i < allTrans.length; i += TBATCH) {
  const batch = allTrans.slice(i, i + TBATCH);
  const vals = []; const params = []; let p = 1;
  for (const t of batch) { vals.push(`($${p++},'en',$${p++})`); params.push(t.entryId, t.text); }
  await db.query(`INSERT INTO translations (entry_id,language_code,text) VALUES ${vals.join(",")}`, params);
  totalTrans += batch.length;
  process.stdout.write(`\r  Translations: ${totalTrans}/${allTrans.length}  `);
}
console.log(`\nInserted ${totalTrans} translations`);

// ── 7. Stats ──────────────────────────────────────────────────────────────────
const s1 = await db.query(`SELECT variety, COUNT(*)::int cnt FROM entries GROUP BY variety ORDER BY variety`);
const s2 = await db.query(`SELECT COUNT(*)::int cnt FROM translations`);
const s3 = await db.query(`SELECT COUNT(*)::int cnt FROM entries WHERE source IS NOT NULL`);
console.log("\n=== Final DB stats ===");
s1.rows.forEach(r => console.log(`  ${r.variety}: ${r.cnt} entries`));
console.log(`  Total translations: ${s2.rows[0].cnt}`);
console.log(`  Entries with source: ${s3.rows[0].cnt}`);

await db.end();
console.log("Done.");
