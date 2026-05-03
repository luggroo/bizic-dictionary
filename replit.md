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
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `node scripts/src/import-stedt.mjs` — re-import all Tujia data from STEDT (run from workspace root with DATABASE_URL set)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Tujia Dictionary (`artifacts/tujia-dictionary`)
- **Preview path**: `/`
- **Type**: React + Vite web app
- **Purpose**: Multilingual Tujia language dictionary (Tujia → English, with Northern/Southern variety color coding)
- **Pages**: Home, Search (with variety/dialect/category filters), Entry Detail (IPA forms + translations), Browse by Category (452 categories), About
- **i18n**: EN / 中文 / 土家 UI switcher via plain button group (no Radix ToggleGroup — causes duplicate React issues)
- **Variety colors**: Northern = terracotta (primary), Southern = teal `#0d9488`

### API Server (`artifacts/api-server`)
- **Preview path**: `/api`
- **Type**: Express 5 API
- **Routes**: `/api/languages`, `/api/entries`, `/api/entries/stats`, `/api/entries/categories`, `/api/entries/:id`, `/api/entries/:id/related`, `/api/dialects`

## Database Schema

### languages
Stores all supported languages. Add a row to support a new language — no schema changes needed.
- `id`, `code` (unique, e.g. "zh", "en", "ja"), `name`, `native_name`, `flag`, `is_base`, `sort_order`

### entries
Core Tujia dictionary entries. Entry IDs start from 19 (after STEDT import).
- `id`, `tujia_word`, `ipa`, `tujia_spelling`, `tujia_toned`, `sw_mandarin` (four Tujia forms)
- `variety` ("northern" or "southern"), `dialect` (optional sub-variety)
- `part_of_speech`, `category` (STEDT semantic chaptertitle), `tone_marks`
- `example_sentence`, `example_translation`, `cultural_note`

### translations
Translations per entry per language. Supports **multiple senses per language** (non-1:1 mapping).
- `id`, `entry_id` → entries, `language_code` → languages, `text`, `romanization`, `notes`

## Data

### STEDT Import
All 7,388 unique Tujia entries were imported from the STEDT database (https://stedtdb.johnblowe.com) via `scripts/src/import-stedt.mjs`:
- **Northern Tujia**: 6,459 entries  
- **Southern Tujia**: 929 entries  
- **Total translations**: 9,018 (all English glosses from STEDT)
- **Categories**: 452 semantic categories (STEDT chaptertitle field)
- **STEDT API**: `POST https://stedtdb.johnblowe.com/search/ajax` with `tbl=lexicon&lggrp=5&limit=9999`
- Field mapping: `reflex` → `tujia_word`/`ipa`, `gloss` → English translation, `language` → variety, `chaptertitle` → category, `gfn` → part_of_speech

## Expandable Language Architecture

To add a new language (e.g. Japanese):
1. Insert a row into `languages`: `INSERT INTO languages (code, name, native_name, flag, is_base, sort_order) VALUES ('ja', 'Japanese', '日本語', '🇯🇵', false, 3)`
2. Insert translation rows into `translations` for entries you want to cover
3. The frontend automatically groups and displays any language present in the data

## Important Notes

- **Do NOT use `@radix-ui/react-toggle-group`** — causes duplicate React hook error in this Vite setup. Use plain `<button>` elements instead.
- The STEDT `reflex` field is already in IPA notation (tonal superscripts); it maps to both `tujia_word` and `ipa` columns.
- STEDT data does not include Bifzivkar romanization (`tujia_spelling`) or SW Mandarin equivalents — those fields remain null and can be enriched later.
