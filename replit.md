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

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Tujia Dictionary (`artifacts/tujia-dictionary`)
- **Preview path**: `/`
- **Type**: React + Vite web app
- **Purpose**: Multilingual Tujia language dictionary (Tujia → Chinese, English, Japanese)
- **Pages**: Home, Search, Entry Detail, Browse by Category, About

### API Server (`artifacts/api-server`)
- **Preview path**: `/api`
- **Type**: Express 5 API
- **Routes**: `/api/languages`, `/api/entries`, `/api/entries/stats`, `/api/entries/categories`, `/api/entries/:id`, `/api/entries/:id/related`

## Database Schema

### languages
Stores all supported languages. Add a row to support a new language — no schema changes needed.
- `id`, `code` (unique, e.g. "zh", "en", "ja"), `name`, `native_name`, `flag`, `is_base`, `sort_order`

### entries
Core Tujia dictionary entries.
- `id`, `tujia_word`, `tone_marks`, `part_of_speech`, `category`, `example_sentence`, `example_translation`, `cultural_note`

### translations
Translations per entry per language. Supports **multiple senses per language** (non-1:1 mapping).
- `id`, `entry_id` → entries, `language_code` → languages, `text`, `romanization`, `notes`

## Expandable Language Architecture

To add a new language (e.g. Korean):
1. Insert a row into `languages`: `INSERT INTO languages (code, name, native_name, flag, is_base, sort_order) VALUES ('ko', 'Korean', '한국어', '🇰🇷', false, 4)`
2. Insert translation rows into `translations` for any entries you want to cover
3. The frontend automatically groups and displays any language present in the data
