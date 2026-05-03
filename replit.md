# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push-force` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `node scripts/src/import-stedt.mjs` — re-import all Tujia data from STEDT (run from workspace root with DATABASE_URL set)
- `node scripts/src/translate-to-chinese.mjs` — batch-translate all English glosses → Simplified Chinese via AI (gpt-4o-mini)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Tujia Dictionary (`artifacts/tujia-dictionary`)
- **Preview path**: `/`
- **Type**: React + Vite web app
- **Purpose**: Multilingual Tujia language dictionary (Tujia → English + Chinese, with Northern/Southern variety color coding)
- **Pages**: Home, Search (with variety/dialect/category filters + ranked FTS), Entry Detail (IPA forms + translations + source), Browse by Category (452 categories), About
- **i18n**: EN / 中文 / 土家 UI switcher via plain button group (no Radix ToggleGroup — causes duplicate React issues)
- **Variety colors**: Northern = terracotta (primary), Southern = teal `#0d9488`
- **Source citations**: Shown on entry cards (small footnote with BookMarked icon) and entry detail sidebar (Source section). All 7,388 entries have STEDT academic citations.

### API Server (`artifacts/api-server`)
- **Preview path**: `/api`
- **Type**: Express 5 API
- **Routes**: `/api/languages`, `/api/entries`, `/api/entries/stats`, `/api/entries/categories`, `/api/entries/:id`, `/api/entries/:id/related`, `/api/dialects`
- **Search**: PostgreSQL FTS (`websearch_to_tsquery` + `ts_rank_cd`) + trigram similarity (`pg_trgm`) + ILIKE fallback; rank preserved via in-memory sort after Drizzle typed `select()`

## Database Schema

### languages
Stores all supported languages. Add a row to support a new language — no schema changes needed.
- `id`, `code` (unique, e.g. "zh", "en"), `name`, `native_name`, `flag`, `is_base`, `sort_order`

### entries
Core Tujia dictionary entries. IDs start from 7407 (after most recent STEDT import clearing old data).
- `id`, `tujia_word`, `ipa`, `tujia_spelling`, `tujia_toned`, `sw_mandarin` (four Tujia forms)
- `variety` ("northern" or "southern"), `dialect` (optional sub-variety)
- `part_of_speech`, `category` (STEDT semantic chaptertitle), `tone_marks`
- `example_sentence`, `example_translation`, `cultural_note`
- `source` — academic citation(s) from STEDT (e.g. "Tian 86", "Sun H 91 ZMYY / Brassett 06 Tujia"); multiple sources joined with " / "

### translations
Translations per entry per language. Supports **multiple senses per language** (non-1:1 mapping).
- `id`, `entry_id` → entries, `language_code` → languages, `text`, `romanization`, `notes`

## Data

### STEDT Import
All 7,388 unique Tujia entries imported from the STEDT database (https://stedtdb.johnblowe.com) via `scripts/src/import-stedt.mjs`:
- **Northern Tujia**: 6,459 entries
- **Southern Tujia**: 929 entries
- **Total EN translations**: 9,018 (all English glosses from STEDT)
- **Categories**: 452 semantic categories (STEDT chaptertitle field)
- **Source citations**: 7,388 entries have source populated (all entries)
- **STEDT API**: `POST https://stedtdb.johnblowe.com/search/ajax` with `tbl=lexicon&lggrp=5&limit=9999`
- Field mapping: `[2]reflex` → `tujia_word`/`ipa`, `[3]gloss` → EN translation, `[6]language` → variety, `[14]chaptertitle` → category, `[4]gfn` → part_of_speech, `[10]citation` → source

### Chinese Translations
Batch-translated from English glosses via `scripts/src/translate-to-chinese.mjs` using OpenAI `gpt-4o-mini` via Replit AI Integrations (`AI_INTEGRATIONS_OPENAI_BASE_URL` + `AI_INTEGRATIONS_OPENAI_API_KEY`). Translates 4,135 unique glosses across 9,018 entries.

## Expandable Language Architecture

To add a new language (e.g. Japanese):
1. Insert a row into `languages`: `INSERT INTO languages (code, name, native_name, flag, is_base, sort_order) VALUES ('ja', 'Japanese', '日本語', '🇯🇵', false, 4)`
2. Insert translation rows into `translations` for entries you want to cover
3. The frontend automatically groups and displays any language present in the data

## Important Notes

- **Do NOT use `@radix-ui/react-toggle-group`** — causes duplicate React hook error in this Vite setup. Use plain `<button>` elements instead.
- The STEDT `reflex` field is already in IPA notation (tonal superscripts); it maps to both `tujia_word` and `ipa` columns.
- STEDT data does not include Bifzivkar romanization (`tujia_spelling`) or SW Mandarin equivalents — those fields remain null and can be enriched later.
- `db.execute()` in Drizzle returns `{ rows: [...] }` with **snake_case** column names. Use Drizzle typed `db.select().from(table)` for camelCase mapping. Avoid mixing Drizzle ORM conditions inside raw `db.execute()` — they produce parameterised `$N` tokens that conflict with LIMIT/OFFSET.
- Entry IDs auto-increment and reset each time the STEDT import is re-run (it clears all entries first). Do not hardcode entry IDs in tests or UI.
