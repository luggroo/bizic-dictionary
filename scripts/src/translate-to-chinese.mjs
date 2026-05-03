/**
 * Batch-translates all unique English glosses into Chinese (Simplified),
 * then inserts zh translations into the translations table.
 *
 * Incremental: inserts after every CONCURRENCY batches so progress is never lost.
 * Run: node scripts/src/translate-to-chinese.mjs
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pg = require("/home/runner/workspace/lib/db/node_modules/pg");
const { Client } = pg;

const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();

const OPENAI_BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const OPENAI_API_KEY  = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

if (!OPENAI_BASE_URL || !OPENAI_API_KEY) {
  throw new Error("AI_INTEGRATIONS_OPENAI_BASE_URL / AI_INTEGRATIONS_OPENAI_API_KEY not set");
}

// ── 1. Ensure zh language row exists ─────────────────────────────────────────
await db.query(`
  INSERT INTO languages (code, name, native_name, flag, is_base, sort_order)
  VALUES ('zh', 'Chinese', '中文', '🇨🇳', false, 3)
  ON CONFLICT (code) DO NOTHING
`);

// ── 2. Load unique English glosses that don't have a zh translation yet ───────
const { rows: glossRows } = await db.query(`
  SELECT DISTINCT t.text AS gloss
  FROM translations t
  WHERE t.language_code = 'en'
    AND NOT EXISTS (
      SELECT 1 FROM translations t2
      WHERE t2.entry_id     = t.entry_id
        AND t2.language_code = 'zh'
    )
  ORDER BY t.text
`);

const uniqueGlosses = glossRows.map((r) => r.gloss);
console.log(`Unique English glosses needing Chinese translation: ${uniqueGlosses.length}`);

if (uniqueGlosses.length === 0) {
  console.log("Nothing to translate.");
  await db.end();
  process.exit(0);
}

// ── 3. Config ─────────────────────────────────────────────────────────────────
const BATCH_SIZE  = 80;   // glosses per API call
const CONCURRENCY = 4;    // parallel requests per round
const RETRY_DELAY = 2000;

async function translateBatch(englishTerms, attempt = 0) {
  const prompt = `Translate the following English words/phrases into Simplified Chinese (简体中文).
These are glosses from the Tujia language dictionary — concise meanings of words.

Rules:
- Output ONLY a JSON array of strings, same length and order as input.
- Each translation should be the natural, concise Chinese equivalent.
- Use natural Mandarin Chinese, not word-for-word.
- For grammatical terms (e.g. "nominal suffix", "verbal prefix"), translate them accurately.
- Never include explanations, brackets, or extra text.

Input (${englishTerms.length} terms):
${JSON.stringify(englishTerms)}

Output (JSON array of ${englishTerms.length} Chinese strings):`;

  try {
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_completion_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      if (response.status === 429 && attempt < 4) {
        const delay = RETRY_DELAY * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delay));
        return translateBatch(englishTerms, attempt + 1);
      }
      throw new Error(`API error ${response.status}: ${err}`);
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content?.trim() ?? "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error(`No JSON array in response: ${content.slice(0, 200)}`);
    const translated = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(translated) || translated.length !== englishTerms.length) {
      throw new Error(`Length mismatch: got ${translated.length}, expected ${englishTerms.length}`);
    }
    return translated;
  } catch (err) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, RETRY_DELAY * (attempt + 1)));
      return translateBatch(englishTerms, attempt + 1);
    }
    console.error(`\nBatch failed after retries:`, err.message);
    // Return empty strings so we don't block the rest
    return englishTerms.map(() => "");
  }
}

// ── 4. Translate + insert incrementally ───────────────────────────────────────
const batches = [];
for (let i = 0; i < uniqueGlosses.length; i += BATCH_SIZE) {
  batches.push(uniqueGlosses.slice(i, i + BATCH_SIZE));
}
console.log(`Processing ${batches.length} batches of up to ${BATCH_SIZE} terms (${CONCURRENCY} parallel)…`);

let totalTranslated = 0;
let totalInserted = 0;

for (let i = 0; i < batches.length; i += CONCURRENCY) {
  const chunk = batches.slice(i, i + CONCURRENCY);

  // Translate this chunk in parallel
  const results = await Promise.all(chunk.map((b) => translateBatch(b)));

  // Build gloss→zh map for this chunk
  const glossToZh = new Map();
  for (let j = 0; j < chunk.length; j++) {
    chunk[j].forEach((eng, k) => {
      if (results[j][k]) glossToZh.set(eng, results[j][k]);
    });
  }
  totalTranslated += glossToZh.size;

  // Fetch the entry_id/en_gloss pairs for the glosses we just translated
  const glossList = [...glossToZh.keys()];
  const { rows: enRows } = await db.query(
    `SELECT entry_id, text AS en_gloss
     FROM translations
     WHERE language_code = 'en'
       AND text = ANY($1::text[])
       AND NOT EXISTS (
         SELECT 1 FROM translations t2
         WHERE t2.entry_id = translations.entry_id AND t2.language_code = 'zh'
       )`,
    [glossList]
  );

  // Insert zh translations
  if (enRows.length > 0) {
    const vals = [];
    const params = [];
    let p = 1;
    for (const row of enRows) {
      const zh = glossToZh.get(row.en_gloss);
      if (!zh) continue;
      vals.push(`($${p++}, 'zh', $${p++})`);
      params.push(row.entry_id, zh);
    }
    if (vals.length > 0) {
      await db.query(
        `INSERT INTO translations (entry_id, language_code, text) VALUES ${vals.join(",")} ON CONFLICT DO NOTHING`,
        params
      );
      totalInserted += vals.length;
    }
  }

  const done = Math.min(i + CONCURRENCY, batches.length);
  process.stdout.write(`\r  Batch ${done}/${batches.length} | translated ${totalTranslated} glosses | inserted ${totalInserted} zh rows`);
}

console.log(`\nDone. Inserted ${totalInserted} Chinese translations.`);

// ── 5. Final stats ─────────────────────────────────────────────────────────────
const { rows: stats } = await db.query(
  `SELECT language_code, COUNT(*)::int AS cnt FROM translations GROUP BY language_code ORDER BY language_code`
);
console.log("\nTranslation counts by language:");
stats.forEach((r) => console.log(`  ${r.language_code}: ${r.cnt}`));

await db.end();
