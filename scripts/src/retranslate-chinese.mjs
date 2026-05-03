/**
 * Retranslate all Tujia lexicon entries into Chinese (Simplified).
 *
 * Key improvements over the previous translate-to-chinese.mjs:
 * - Processes PER ENTRY (not per unique gloss), so context is not lost
 * - Sends part_of_speech + category + ALL English senses together
 * - Gets one Chinese translation PER English sense (not one per entry)
 * - Uses gpt-4o for higher accuracy
 * - Removes all old zh rows first, then re-inserts
 *
 * Run: node scripts/src/retranslate-chinese.mjs
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

// ── 1. Ensure zh language row ─────────────────────────────────────────────────
await db.query(`
  INSERT INTO languages (code, name, native_name, flag, is_base, sort_order)
  VALUES ('zh', 'Chinese', '汉语', '🇨🇳', false, 3)
  ON CONFLICT (code) DO UPDATE SET native_name='汉语'
`);

// ── 2. Optionally delete existing zh translations (set DELETE_ALL=1 to force re-translate) ──
if (process.env.DELETE_ALL === "1") {
  const { rowCount: deleted } = await db.query(
    `DELETE FROM translations WHERE language_code = 'zh'`
  );
  console.log(`Deleted ${deleted} old Chinese translations.`);
} else {
  const { rows: [{ cnt }] } = await db.query(
    `SELECT COUNT(*)::int AS cnt FROM translations WHERE language_code='zh'`
  );
  console.log(`Incremental mode: ${cnt} zh rows already in DB. Only translating missing entries.`);
}

// ── 3. Load entries that are MISSING zh translations ─────────────────────────
const { rows: allEntries } = await db.query(`
  SELECT
    e.id AS entry_id,
    e.part_of_speech,
    e.category,
    json_agg(json_build_object('en_id', t.id, 'text', t.text) ORDER BY t.id) AS senses
  FROM entries e
  JOIN translations t ON t.entry_id = e.id AND t.language_code = 'en'
  WHERE NOT EXISTS (
    SELECT 1 FROM translations zh WHERE zh.entry_id = e.id AND zh.language_code = 'zh'
  )
  GROUP BY e.id
  ORDER BY e.id
`);
console.log(`Loaded ${allEntries.length} entries with English senses.`);

// ── 4. Batch config ──────────────────────────────────────────────────────────
const ENTRIES_PER_BATCH = 25;   // entries per API call
const CONCURRENCY = 4;           // parallel requests
const RETRY_DELAY = 2000;

/**
 * For one batch of entries, ask GPT-4o to translate each English sense
 * into Chinese with full context.
 *
 * Returns: Map<entry_id, string[]> — one zh string per English sense, in order.
 */
async function translateBatch(entries, attempt = 0) {
  // Build a compact JSON payload describing each entry
  const payload = entries.map((e) => ({
    id: e.entry_id,
    pos: e.part_of_speech || "",
    cat: e.category || "",
    senses: e.senses.map((s) => s.text),
  }));

  const prompt = `You are a professional Tujia-Chinese linguist. Translate each English gloss into accurate Simplified Chinese.

Context: These are lexical entries from the Tujia language dictionary.
- Each entry has a part of speech (pos) and semantic category (cat).
- Each entry has one or more English glosses (senses). Translate EACH sense separately.
- Use the pos and cat to resolve ambiguity. For example, if pos=noun and cat=Planets/Meteorological objects/Sky, translate "sky" as "天" not "天空".
- For grammatical terms (suffix, particle, classifier), give precise Chinese linguistic terms.
- Never add explanations or brackets. Short, natural Chinese only.
- Return ONLY valid JSON: an array with one object per input entry.
  Each object: { "id": <number>, "zh": [<one Chinese string per sense, same order>] }

Input:
${JSON.stringify(payload, null, 2)}

Output (JSON array):`;

  try {
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_completion_tokens: 4096,
        temperature: 0.1,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      if (response.status === 429 && attempt < 5) {
        const delay = RETRY_DELAY * Math.pow(2, attempt);
        console.warn(`\n  429 rate limit, retrying in ${delay}ms…`);
        await new Promise((r) => setTimeout(r, delay));
        return translateBatch(entries, attempt + 1);
      }
      throw new Error(`API error ${response.status}: ${err}`);
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content?.trim() ?? "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error(`No JSON array in response: ${content.slice(0, 300)}`);
    const results = JSON.parse(jsonMatch[0]);

    // Build map from entry_id → zh array
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

// ── 5. Process all entries in parallel chunks ─────────────────────────────────
const chunks = [];
for (let i = 0; i < allEntries.length; i += ENTRIES_PER_BATCH) {
  chunks.push(allEntries.slice(i, i + ENTRIES_PER_BATCH));
}
console.log(`Processing ${chunks.length} chunks of up to ${ENTRIES_PER_BATCH} entries (${CONCURRENCY} parallel)…`);

let totalInserted = 0;
let totalErrors = 0;
const INSERT_BATCH = 500;
const pendingRows = []; // { entryId, zhText }

async function flushPending() {
  if (pendingRows.length === 0) return;
  const rows = pendingRows.splice(0, INSERT_BATCH);
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
      // Match zh senses to en senses by index (same length expected)
      const count = Math.min(entry.senses.length, zhSenses.length);
      for (let k = 0; k < count; k++) {
        if (zhSenses[k]) {
          pendingRows.push({ entryId: entry.entry_id, zhText: zhSenses[k] });
        }
      }
    }
  }

  // Flush accumulated rows in batches
  while (pendingRows.length >= INSERT_BATCH) {
    await flushPending();
  }

  const done = Math.min(i + CONCURRENCY, chunks.length);
  process.stdout.write(
    `\r  Chunk ${done}/${chunks.length} | inserted ${totalInserted} zh rows | errors ${totalErrors}`
  );
}

// Flush remaining
while (pendingRows.length > 0) {
  await flushPending();
}

console.log(`\nDone. Inserted ${totalInserted} Chinese translations. Errors: ${totalErrors}`);

// ── 6. Final stats ─────────────────────────────────────────────────────────────
const { rows: stats } = await db.query(
  `SELECT language_code, COUNT(*)::int AS cnt FROM translations GROUP BY language_code ORDER BY language_code`
);
console.log("\nTranslation counts by language:");
stats.forEach((r) => console.log(`  ${r.language_code}: ${r.cnt}`));

await db.end();
