/**
 * STEDT Tujia Lexicon Importer
 * Run from workspace root: node --experimental-vm-modules scripts/src/import-stedt.mjs
 *
 * Field order from STEDT:
 *   [0] rn, [1] analysis, [2] reflex, [3] gloss, [4] gfn,
 *   [5] lgid, [6] language, [7] grpid, [8] grpno, [9] grp,
 *   [10] citation, [11] srcabbr, [12] srcid, [13] semkey,
 *   [14] chaptertitle, [15] num_notes
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// pg is in lib/db node_modules
let pg;
try {
  pg = require("/home/runner/workspace/node_modules/pg");
} catch {
  pg = require("/home/runner/workspace/lib/db/node_modules/pg");
}

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

const entryMap = new Map();
for (const row of rows) {
  const [, , reflex, gloss, gfn, , language, , , , , , , , chaptertitle] = row;
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
    });
  }
  const e = entryMap.get(key);
  e.glosses.add(g);
  if (!e.category && chaptertitle?.trim()) e.category = chaptertitle.trim();
  if (!e.pos && gfn?.trim()) e.pos = cleanPos(gfn);
}

const entries = Array.from(entryMap.values());
console.log(`Unique entries: ${entries.length} (northern: ${entries.filter(e=>e.variety==='northern').length}, southern: ${entries.filter(e=>e.variety==='southern').length})`);

// ── 3. Ensure English language row ───────────────────────────────────────────
await db.query(`
  INSERT INTO languages (code, name, native_name, flag, is_base, sort_order)
  VALUES ('en','English','English','🇬🇧',false,2)
  ON CONFLICT (code) DO NOTHING
`);

// ── 4. Clear existing STEDT entries to allow fresh import ────────────────────
await db.query(`DELETE FROM entries WHERE category IS NOT NULL OR ipa IS NOT NULL`);
console.log("Cleared old entries. Inserting fresh STEDT data…");

// ── 5. Bulk insert entries in batches of 250 ─────────────────────────────────
const BATCH = 250;
let totalEntries = 0;
const entryRows = []; // { id, glosses }

for (let i = 0; i < entries.length; i += BATCH) {
  const batch = entries.slice(i, i + BATCH);
  const vals = [];
  const params = [];
  let p = 1;
  for (const e of batch) {
    vals.push(`($${p++},$${p++},$${p++},$${p++},$${p++})`);
    params.push(e.word, e.ipa, e.variety, e.pos, e.category);
  }
  const res = await db.query(
    `INSERT INTO entries (tujia_word,ipa,variety,part_of_speech,category) VALUES ${vals.join(',')} RETURNING id`,
    params
  );
  res.rows.forEach((row, j) => entryRows.push({ id: row.id, glosses: batch[j].glosses }));
  totalEntries += res.rows.length;
  if (i % (BATCH * 5) === 0 || i + BATCH >= entries.length) {
    process.stdout.write(`\r  Entries: ${totalEntries}/${entries.length}  `);
  }
}
console.log(`\nInserted ${totalEntries} entries`);

// ── 6. Bulk insert translations ───────────────────────────────────────────────
let totalTrans = 0;
const TBATCH = 500;
const allTrans = [];
for (const { id, glosses } of entryRows) {
  for (const g of glosses) allTrans.push({ entryId: id, text: g });
}
console.log(`Total translations to insert: ${allTrans.length}`);

for (let i = 0; i < allTrans.length; i += TBATCH) {
  const batch = allTrans.slice(i, i + TBATCH);
  const vals = [];
  const params = [];
  let p = 1;
  for (const t of batch) {
    vals.push(`($${p++},'en',$${p++})`);
    params.push(t.entryId, t.text);
  }
  await db.query(`INSERT INTO translations (entry_id,language_code,text) VALUES ${vals.join(',')}`, params);
  totalTrans += batch.length;
  if (i % (TBATCH * 5) === 0 || i + TBATCH >= allTrans.length) {
    process.stdout.write(`\r  Translations: ${totalTrans}/${allTrans.length}  `);
  }
}
console.log(`\nInserted ${totalTrans} translations`);

// ── 7. Final stats ────────────────────────────────────────────────────────────
const s1 = await db.query(`SELECT variety, COUNT(*)::int cnt FROM entries GROUP BY variety ORDER BY variety`);
const s2 = await db.query(`SELECT COUNT(*)::int cnt FROM translations`);
console.log("\n=== Final DB stats ===");
s1.rows.forEach(r => console.log(`  ${r.variety}: ${r.cnt} entries`));
console.log(`  Total translations: ${s2.rows[0].cnt}`);

await db.end();
console.log("Done.");
