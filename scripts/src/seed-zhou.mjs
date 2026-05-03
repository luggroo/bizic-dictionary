/**
 * Seed Proto-Bizic cognate groups from the Wiktionary appendix.
 * Fetches https://en.wiktionary.org/wiki/Appendix:Proto-Tujia_reconstructions
 * and inserts/upserts into cognate_groups with dialect reflexes stored as JSONB.
 *
 * Run: pnpm --filter @workspace/scripts run seed-zhou
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { parse } from "node-html-parser";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const sql = postgres(DATABASE_URL);

const WIKTIONARY_URL =
  "https://en.wiktionary.org/wiki/Appendix:Proto-Tujia_reconstructions";

const DIALECT_COLS = ["tasha", "laxidong", "xianren", "xiaolongre", "cebu", "caji_adi"];

function parseWiktionaryNo(raw) {
  if (!raw || raw === "No.") return null;
  const trimmed = raw.trim();
  if (trimmed.startsWith("?")) {
    // ?1 → store as negative to allow separate nulls; use wiktionary_no_str for display
    const n = parseInt(trimmed.slice(1), 10);
    return isNaN(n) ? null : -(n + 10000);
  }
  const n = parseInt(trimmed, 10);
  return isNaN(n) ? null : n;
}

async function fetchAndParse() {
  const res = await fetch(WIKTIONARY_URL, {
    headers: { "User-Agent": "TujiaDict/1.0 (data archival; contact via GitHub luggroo/bizic)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching Wiktionary`);
  const html = await res.text();
  const root = parse(html);

  // Find the wikitable
  const table = root.querySelector("table.wikitable");
  if (!table) throw new Error("Could not find wikitable on the page");

  const rows = table.querySelectorAll("tr");
  const results = [];

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td, th");
    if (cells.length < 4) continue;

    const raw = cells.map((c) => c.innerText.trim().replace(/\u00a0/g, " ").replace(/\s+/g, " "));

    const noRaw = raw[0];
    const glossEn = raw[1] || "";
    const glossZh = raw[2] || null;
    const protoForm = raw[3] || null;
    const tasha = raw[4] || null;
    const laxidong = raw[5] || null;
    const xianren = raw[6] || null;
    const xiaolongre = raw[7] || null;
    const cebu = raw[8] || null;
    const cajiAdi = raw[9] || null;

    if (!glossEn || glossEn === "English gloss") continue;

    const wiktionaryNo = parseWiktionaryNo(noRaw);
    const wiktionaryNoStr = noRaw;

    const reflexes = {
      tasha: tasha || null,
      laxidong: laxidong || null,
      xianren: xianren || null,
      xiaolongre: xiaolongre || null,
      cebu: cebu || null,
      caji_adi: cajiAdi || null,
    };

    results.push({
      wiktionary_no: wiktionaryNo,
      wiktionary_no_str: wiktionaryNoStr,
      proto_form: protoForm || null,
      gloss_en: glossEn,
      gloss_zh: glossZh,
      reflexes,
    });
  }

  return results;
}

async function main() {
  console.log("Fetching Wiktionary Proto-Tujia table…");
  const rows = await fetchAndParse();
  console.log(`Parsed ${rows.length} rows.`);

  // Clear existing data (reseed)
  await sql`DELETE FROM entry_cognate_groups`;
  await sql`DELETE FROM cognate_groups`;
  console.log("Cleared existing cognate data.");

  let inserted = 0;
  for (const row of rows) {
    await sql`
      INSERT INTO cognate_groups (wiktionary_no, wiktionary_no_str, proto_form, gloss_en, gloss_zh, reflexes)
      VALUES (
        ${row.wiktionary_no},
        ${row.wiktionary_no_str},
        ${row.proto_form},
        ${row.gloss_en},
        ${row.gloss_zh},
        ${sql.json(row.reflexes)}
      )
    `;
    inserted++;
    if (inserted % 50 === 0) console.log(`  Inserted ${inserted}/${rows.length}…`);
  }

  console.log(`Done. Inserted ${inserted} rows into cognate_groups.`);
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
