# Dead-code cleanup — 2026-10-21

Baseline: `43765b36a0c70ad93c2007846fd6f8d2aea1f4b3`.

## Scope

- Removed 99 unreferenced UI template modules (45 in the legacy dictionary, 54 in the empty mockup sandbox). All non-template source modules were treated as import-graph roots; transitive imports were retained. No remaining import points to a deleted file.
- Removed the inaccessible word-comparison bar, dialog, selection state, event handlers and CSS. The word-card comparison controls had already been removed. Historical comparison remains unchanged.
- Removed unused `wordCollections`, `dictionarySummary`, and `notationBadge` functions.
- Preserved every dictionary, corpus, grammar and research data file, legacy API/database code, import/export utilities, package manifests and lockfile. Dependencies are not pruned in this pass; legacy projects were not rebuilt in this environment.

## Regression checks

`node scripts/test-cleanup-equivalence.cjs` compares the baseline revision with the working tree using the real datasets and script loading order. Processed data and 85 rendered states are byte-for-byte identical: page views, 56 north/south grammar chapters, scoped search results, populated bookmarks and representative word/corpus/source/history details. Random discovery is seeded identically.

Also passed: `test-search.cjs`, `test-word-merges.cjs`, `test-southern-notation.cjs`, JavaScript syntax checks and surviving-import checks.

The equality test checks rendered HTML, not browser interaction or pixel output. No active CSS/layout rule was changed. Mobile device visual QA and a full legacy React build are outside this verification.
