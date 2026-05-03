/**
 * normalize-brassett.mjs
 *
 * 1. Convert numeric tone markers in Brassett 04 Tujia (ASCII digits: a1, ci3)
 *    and Brassett 06 Tujia (Unicode superscripts: a¹, ci³) to pinyin-style
 *    diacritics: ā(1) á(2) ǎ(3) à(4).
 *    Tone diacritic placement follows the pinyin nucleus rule:
 *      - If the vowel cluster contains 'a' → mark on 'a'
 *      - Else if it contains 'e' → mark on 'e'
 *      - Else if the cluster ends with 'ou' → mark on 'o'
 *      - Otherwise → mark on the last vowel
 * 2. After normalization, merge entries that are identical (same tujia_word +
 *    variety) across the two sources. The merged entry keeps both source labels.
 *
 * Run: pnpm --filter @workspace/scripts run normalize-brassett
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pg = require("/home/runner/workspace/lib/db/node_modules/pg");
const { Client } = pg;

const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();

// ── Tone normalization ──────────────────────────────────────────────────────

const TONE_MAP = {
  a: ["ā", "á", "ǎ", "à"],
  e: ["ē", "é", "ě", "è"],
  i: ["ī", "í", "ǐ", "ì"],
  o: ["ō", "ó", "ǒ", "ò"],
  u: ["ū", "ú", "ǔ", "ù"],
};

const SUPER = { "¹": "1", "²": "2", "³": "3", "⁴": "4" };

function markNucleus(vowels, tone) {
  let idx;
  if (vowels.includes("a")) {
    idx = vowels.indexOf("a");
  } else if (vowels.includes("e")) {
    idx = vowels.indexOf("e");
  } else if (vowels.length >= 2 && (vowels.slice(-2) === "ou" || vowels.slice(-2) === "uo")) {
    idx = vowels.length - 1; // ou/uo → mark on o
  } else {
    idx = vowels.length - 1; // mark on last vowel
  }
  const v = vowels[idx];
  const d = TONE_MAP[v];
  if (!d) return vowels; // shouldn't happen
  return vowels.slice(0, idx) + d[tone - 1] + vowels.slice(idx + 1);
}

/**
 * Normalize tone markers from the original IPA/reflex form (digits or superscripts)
 * to diacritic form, with correct syllable-boundary apostrophes.
 *
 * Strategy: tokenize by tone-digit boundaries FIRST (so we know exactly
 * where each syllable starts), then apply diacritics, then join with
 * apostrophes before non-initial syllables whose first letter is a, e, or o.
 */
function normalizeTones(originalIpa) {
  // Step 1: convert superscripts to ASCII digits
  const s = originalIpa.replace(/[¹²³⁴]/g, (m) => SUPER[m]);

  // Step 2: split into syllable tokens at tone-digit boundaries.
  // A token is every character up to and including one digit [1-4].
  // Any trailing characters without a digit form an untoned tail.
  const tokens = [];
  let pos = 0;
  while (pos < s.length) {
    let digitPos = -1;
    for (let j = pos; j < s.length; j++) {
      if ("1234".includes(s[j])) { digitPos = j; break; }
    }
    if (digitPos === -1) {
      if (pos < s.length) tokens.push({ raw: s.slice(pos), toned: false });
      break;
    }
    tokens.push({ raw: s.slice(pos, digitPos + 1), toned: true });
    pos = digitPos + 1;
  }

  if (tokens.length === 0) return s;

  // Step 3: apply diacritics to each toned token
  const normed = tokens.map((t) => {
    if (!t.toned) return t.raw;
    return t.raw.replace(/([aeiou]+)([^aeiou1-4]*)([1-4])$/, (_, vowels, coda, toneStr) => {
      return markNucleus(vowels, parseInt(toneStr, 10)) + coda;
    });
  });

  // Step 4: join, inserting apostrophe before non-initial syllables whose
  // first letter (ignoring a leading non-letter prefix like '-') is a, e, or o.
  let result = normed[0] ?? "";
  for (let i = 1; i < tokens.length; i++) {
    const firstLetter = tokens[i].raw.match(/[a-z]/)?.[0];
    if (firstLetter === "a" || firstLetter === "e" || firstLetter === "o") {
      result += "'";
    }
    result += normed[i];
  }

  return result;
}

// ── Fetch Brassett entries ─────────────────────────────────────────────────

console.log("Fetching Brassett entries…");
const { rows: brassett } = await db.query(`
  SELECT id, tujia_word, ipa, source, variety
  FROM entries
  WHERE source LIKE '%Brassett 04 Tujia%'
     OR source LIKE '%Brassett 06 Tujia%'
  ORDER BY id
`);
console.log(`  Found ${brassett.length} Brassett entries`);

// ── Step 1: Normalize tone markers on all Brassett entries ─────────────────
// Re-derive tujia_word from the original ipa column (which still has raw digits/superscripts),
// so any previous bad apostrophe passes are fully undone and correctly re-applied.

console.log("\nStep 1: Normalizing tone markers…");
let normalized = 0;
let unchanged = 0;

for (const row of brassett) {
  // Use ipa (original form) as the source of truth; fall back to tujia_word if ipa is missing
  const source = row.ipa && /[1-4¹²³⁴]/.test(row.ipa) ? row.ipa : row.tujia_word;
  const newWord = normalizeTones(source);
  if (newWord !== row.tujia_word) {
    await db.query(
      `UPDATE entries SET tujia_word = $1, updated_at = NOW() WHERE id = $2`,
      [newWord, row.id]
    );
    normalized++;
    if (normalized <= 10) {
      console.log(`  ipa:${source}  ${row.tujia_word} → ${newWord}`);
    }
  } else {
    unchanged++;
  }
}
console.log(`  Normalized: ${normalized}, unchanged: ${unchanged}`);

// ── Step 2: Find and merge duplicates across sources ──────────────────────

console.log("\nStep 2: Finding cross-source duplicates after normalization…");

// Re-fetch after normalization
const { rows: fresh } = await db.query(`
  SELECT id, tujia_word, source, variety
  FROM entries
  WHERE source LIKE '%Brassett 04 Tujia%'
     OR source LIKE '%Brassett 06 Tujia%'
  ORDER BY id
`);

// Categorize each entry by which Brassett sources it belongs to
function hasSrc04(source) { return source.includes("Brassett 04 Tujia"); }
function hasSrc06(source) { return source.includes("Brassett 06 Tujia"); }

// Group by (tujia_word, variety)
const byKey = new Map(); // key → [rows]
for (const row of fresh) {
  const key = `${row.tujia_word}|||${row.variety}`;
  if (!byKey.has(key)) byKey.set(key, []);
  byKey.get(key).push(row);
}

// Find groups that have entries from BOTH Brassett 04 and Brassett 06
// (but are stored as separate rows, not yet merged)
const toMerge = [];
for (const [key, group] of byKey) {
  if (group.length < 2) continue;

  const has04 = group.some((r) => hasSrc04(r.source) && !hasSrc06(r.source));
  const has06 = group.some((r) => hasSrc06(r.source) && !hasSrc04(r.source));
  if (has04 && has06) {
    const rows04 = group.filter((r) => hasSrc04(r.source) && !hasSrc06(r.source));
    const rows06 = group.filter((r) => hasSrc06(r.source) && !hasSrc04(r.source));
    toMerge.push({ key, rows04, rows06 });
  }
}

console.log(`  Found ${toMerge.length} groups to merge`);

// ── Step 3: Merge each duplicate group ────────────────────────────────────

let merged = 0;
let translationsMoved = 0;

for (const { key, rows04, rows06 } of toMerge) {
  // Keep the Brassett 04 entry as canonical (lower or higher id, doesn't matter — pick first of each)
  const keeper = rows04[0];
  const donors = rows06;

  // Update keeper's source to combined label
  await db.query(
    `UPDATE entries SET source = 'Brassett 04 Tujia / Brassett 06 Tujia', updated_at = NOW() WHERE id = $1`,
    [keeper.id]
  );

  for (const donor of donors) {
    // Move translations from donor to keeper (skip if identical text+language already exists)
    const { rows: donorTrans } = await db.query(
      `SELECT language_code, text, romanization, notes FROM translations WHERE entry_id = $1`,
      [donor.id]
    );

    for (const t of donorTrans) {
      // Check if keeper already has this translation text
      const { rows: exists } = await db.query(
        `SELECT id FROM translations WHERE entry_id = $1 AND language_code = $2 AND text = $3`,
        [keeper.id, t.language_code, t.text]
      );
      if (exists.length === 0) {
        await db.query(
          `INSERT INTO translations (entry_id, language_code, text, romanization, notes)
           VALUES ($1, $2, $3, $4, $5)`,
          [keeper.id, t.language_code, t.text, t.romanization ?? null, t.notes ?? null]
        );
        translationsMoved++;
      }
    }

    // Delete donor entry (cascades translations via FK)
    await db.query(`DELETE FROM entries WHERE id = $1`, [donor.id]);
    merged++;
  }

  if (merged <= 5) {
    console.log(`  Merged: "${rows04[0].tujia_word}" (kept id=${keeper.id}, removed id=${donors.map(d=>d.id).join(",")})`);
  }
}

// ── Stats ──────────────────────────────────────────────────────────────────

const s1 = await db.query(`SELECT COUNT(*)::int cnt FROM entries WHERE source LIKE '%Brassett%'`);
const s2 = await db.query(`SELECT COUNT(*)::int cnt FROM entries WHERE source = 'Brassett 04 Tujia / Brassett 06 Tujia'`);
const s3 = await db.query(`SELECT COUNT(*)::int cnt FROM entries WHERE source = 'Brassett 04 Tujia'`);
const s4 = await db.query(`SELECT COUNT(*)::int cnt FROM entries WHERE source = 'Brassett 06 Tujia'`);

console.log("\n=== Final stats ===");
console.log(`  Total Brassett entries: ${s1.rows[0].cnt}`);
console.log(`  Brassett 04 only:       ${s3.rows[0].cnt}`);
console.log(`  Brassett 06 only:       ${s4.rows[0].cnt}`);
console.log(`  Merged (both sources):  ${s2.rows[0].cnt}`);
console.log(`  Entries merged (removed): ${merged}`);
console.log(`  Translations moved:     ${translationsMoved}`);

// Show a few examples of the normalized output
const { rows: examples } = await db.query(`
  SELECT tujia_word, source FROM entries
  WHERE source = 'Brassett 04 Tujia / Brassett 06 Tujia'
  ORDER BY tujia_word LIMIT 8
`);
console.log("\n  Sample merged entries:");
for (const e of examples) console.log(`    ${e.tujia_word}`);

const { rows: ex04 } = await db.query(`
  SELECT tujia_word FROM entries WHERE source = 'Brassett 04 Tujia' ORDER BY RANDOM() LIMIT 5
`);
console.log("\n  Sample Brassett 04 normalized:");
for (const e of ex04) console.log(`    ${e.tujia_word}`);

const { rows: ex06 } = await db.query(`
  SELECT tujia_word FROM entries WHERE source = 'Brassett 06 Tujia' ORDER BY RANDOM() LIMIT 5
`);
console.log("\n  Sample Brassett 06 normalized:");
for (const e of ex06) console.log(`    ${e.tujia_word}`);

await db.end();
console.log("\nDone.");
