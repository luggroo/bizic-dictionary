/**
 * Completes Chinese translations for entries missing zh, using Gemini Flash.
 * Incremental: only processes entries that have no zh translation yet.
 * Run: node scripts/src/retranslate-chinese-gemini.mjs
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pg = require("/home/runner/workspace/lib/db/node_modules/pg");
const { Client } = pg;

const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();

const BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
const API_KEY  = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;

if (!BASE_URL || !API_KEY) {
  throw new Error("AI_INTEGRATIONS_GEMINI_BASE_URL / AI_INTEGRATIONS_GEMINI_API_KEY not set");
}

// ── 1. Ensure zh language row ─────────────────────────────────────────────────
await db.query(`
  INSERT INTO languages (code, name, native_name, flag, is_base, sort_order)
  VALUES ('zh', 'Chinese', '汉语', '🇨🇳', false, 3)
  ON CONFLICT (code) DO UPDATE SET native_name='汉语'
`);

// ── 2. Load entries missing zh ────────────────────────────────────────────────
const { rows: allEntries } = await db.query(`
  SELECT
    e.id AS entry_id,
    e.part_of_speech,
    e.category,
    json_agg(json_build_object('text', t.text) ORDER BY t.id) AS senses
  FROM entries e
  JOIN translations t ON t.entry_id = e.id AND t.language_code = 'en'
  WHERE NOT EXISTS (
    SELECT 1 FROM translations zh WHERE zh.entry_id = e.id AND zh.language_code = 'zh'
  )
  GROUP BY e.id
  ORDER BY e.id
`);
console.log(`Entries missing zh translations: ${allEntries.length}`);

if (allEntries.length === 0) {
  console.log("All entries already have Chinese translations. Done.");
  await db.end();
  process.exit(0);
}

// ── 3. Config ─────────────────────────────────────────────────────────────────
const ENTRIES_PER_BATCH = 120;
const CONCURRENCY = 1;
const RETRY_DELAY = 3000;
const MODEL = "gemini-2.5-flash";

async function translateBatch(entries, attempt = 0) {
  const payload = entries.map((e) => ({
    id: e.entry_id,
    pos: e.part_of_speech || "",
    cat: e.category || "",
    senses: e.senses.map((s) => s.text),
  }));

  const prompt = `You are a professional Tujia-Chinese linguist translating Tujia dictionary entries into Simplified Chinese.

Rules:
- Each entry has a part of speech (pos) and semantic category (cat).
- Each entry has one or more English glosses (senses). Translate EACH sense separately, preserving the same count and order.
- Use pos and cat to resolve ambiguity:
  * cat "Planets/Meteorological objects/Sky" + gloss "sky" → "天" (not 天空)
  * cat "Sky..." + gloss "ink" → "墨" (secondary meaning)
  * grammatical terms: translate precisely (e.g., "pluralising suffix" → "复数词缀", "locative suffix" → "处所词缀")
  * "(excl)" → "感叹语气", "(interrogative)" → "疑问语气"
  * "won't" (verbal suffix context) → "否定将来时词缀"
- Short, natural Simplified Chinese only. No brackets, no explanations, no pinyin.
- Return ONLY valid JSON: an array where each element is { "id": <number>, "zh": [<one string per sense, same count and order as input senses>] }

Input:
${JSON.stringify(payload)}

Output (JSON array only, no markdown):`;

  try {
    const url = `${BASE_URL}/models/${MODEL}:generateContent?key=${API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      if ((response.status === 429 || response.status === 503) && attempt < 5) {
        const delay = RETRY_DELAY * Math.pow(2, attempt);
        console.warn(`\n  ${response.status} rate limit, retrying in ${delay}ms…`);
        await new Promise((r) => setTimeout(r, delay));
        return translateBatch(entries, attempt + 1);
      }
      throw new Error(`API error ${response.status}: ${err.slice(0, 300)}`);
    }

    const json = await response.json();
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
    // Extract JSON array from response (Gemini may wrap in markdown)
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error(`No JSON array in response: ${content.slice(0, 300)}`);
    const results = JSON.parse(jsonMatch[0]);

    const map = new Map();
    for (const r of results) {
      if (r.id && Array.isArray(r.zh)) {
        map.set(r.id, r.zh.map((s) => String(s).trim()).filter(Boolean));
      }
    }
    return map;
  } catch (err) {
    if (attempt < 3) {
      console.warn(`\n  Batch error (attempt ${attempt}): ${err.message}. Retrying…`);
      await new Promise((r) => setTimeout(r, RETRY_DELAY * (attempt + 1)));
      return translateBatch(entries, attempt + 1);
    }
    console.error(`\n  Batch failed after retries: ${err.message}`);
    return new Map();
  }
}

// ── 4. Process ────────────────────────────────────────────────────────────────
const chunks = [];
for (let i = 0; i < allEntries.length; i += ENTRIES_PER_BATCH) {
  chunks.push(allEntries.slice(i, i + ENTRIES_PER_BATCH));
}
console.log(`Processing ${chunks.length} chunks (${CONCURRENCY} parallel, ${ENTRIES_PER_BATCH} entries each)…`);

let totalInserted = 0;
let totalErrors = 0;
const pendingRows = [];

async function flushPending() {
  if (pendingRows.length === 0) return;
  const rows = pendingRows.splice(0, 500);
  const vals = [];
  const params = [];
  let p = 1;
  for (const { entryId, zhText } of rows) {
    vals.push(`($${p++}, 'zh', $${p++})`);
    params.push(entryId, zhText);
  }
  await db.query(
    `INSERT INTO translations (entry_id, language_code, text) VALUES ${vals.join(",")}`,
    params
  );
  totalInserted += rows.length;
}

for (let i = 0; i < chunks.length; i += CONCURRENCY) {
  const parallelChunks = chunks.slice(i, i + CONCURRENCY);
  const results = await Promise.all(parallelChunks.map((chunk) => translateBatch(chunk)));

  for (let j = 0; j < parallelChunks.length; j++) {
    const chunk = parallelChunks[j];
    const zhMap = results[j];

    for (const entry of chunk) {
      const zhSenses = zhMap.get(entry.entry_id);
      if (!zhSenses || zhSenses.length === 0) {
        totalErrors++;
        continue;
      }
      const count = Math.min(entry.senses.length, zhSenses.length);
      for (let k = 0; k < count; k++) {
        if (zhSenses[k]) {
          pendingRows.push({ entryId: entry.entry_id, zhText: zhSenses[k] });
        }
      }
    }
  }

  while (pendingRows.length >= 500) {
    await flushPending();
  }

  const done = Math.min(i + CONCURRENCY, chunks.length);
  process.stdout.write(
    `\r  Chunk ${done}/${chunks.length} | inserted ${totalInserted} zh rows | errors ${totalErrors}`
  );
}

while (pendingRows.length > 0) {
  await flushPending();
}

console.log(`\nDone. Inserted ${totalInserted} Chinese translations. Errors: ${totalErrors}`);

const { rows: stats } = await db.query(
  `SELECT language_code, COUNT(*)::int AS cnt FROM translations GROUP BY language_code ORDER BY language_code`
);
console.log("\nTranslation counts by language:");
stats.forEach((r) => console.log(`  ${r.language_code}: ${r.cnt}`));

await db.end();
