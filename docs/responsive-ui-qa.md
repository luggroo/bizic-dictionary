# Responsive dictionary UI and prepared search

The desktop dictionary uses two aligned word lists from 1180px upward, with row order left to right. Phones keep a single list. Opening a desktop word entry leaves the results available beside a 470px detail pane; narrow screens use a full-screen modal. All seven navigation choices remain visible on mobile.

The implementation began from `59aec21`, incorporated `edde586`, then merged `ae93932` from main in an isolated branch. The concurrent grammar terminology, citation and spelling corrections are retained. Main was not overwritten or force-pushed.

## Data preparation

The build runs normalization, merging, spelling conversion and search indexing once. The browser fetches a 1,750,595-byte compressed search dataset, then loads complete evidence or source texts when needed. A dataset version identifies every related chunk. Native gzip decoding has a bundled, licensed pako fallback.

After the existing dataset expansion, gloss review and IPA normalization steps, run:

```sh
node scripts/prepare-search-data.cjs site
node scripts/test-prepared-search.cjs site
node scripts/test-prepared-loader.cjs site
```

GitHub Pages performs these steps before publishing. Generated records in `site/prepared/` and expanded JSON datasets are ignored by Git. Full Gentium Plus fonts are installed by the existing webfont build step; Charis remains the IPA font.

## Verification on 2026-10-23

| Area | Result |
| --- | --- |
| Automated regression suites | 18 suites passed, including reader copy, search, IPA, southern notation, word merges, word classes and loan reviews |
| Prepared-data equivalence | All 16,577 records; every IPA, displayed spelling, semantic group and loan scope; 40 query/filter combinations and 10 POS groups |
| Original evidence | All word chunks and 54 source-text chunks matched the complete prepared records |
| Reviewed reference grammar | All 13 chapters and 1,561 IPA pairs passed DOM checks for bilingual text, citations, source links and spelling modes |
| Grammar reading pages | 40 pages × two languages; 1,168 citation and return links checked, original section anchors and IPA retained; direct section URLs, language changes and Back/Forward/reload passed |
| Question-word forms | 13 original rows grouped into 9 meanings, retaining all 15 long/short forms, switchable Ye / tone-marked spelling and IPA; distinct usages retained |
| Detail rendering | 152 sources, 487 corpus entries and 359 historical comparisons rendered successfully |
| Navigation and export | Shared URLs, aliases, reload, Back/Forward/Close, language/filter persistence and blocked storage passed; JSON export retains evidence and excludes internal caches |
| Responsive browser checks | Seven sections × two languages × five widths (320, 390, 768, 1024, 1440px); no page overflow. Fixed and repeated the 320px English navigation checks |
| Browser interactions | Search and loan/POS filters; desktop and mobile details; grammar chapter, language and spelling switches; readers from all three collections; source full-text search; historical comparison details |
| Gzip compatibility | Native and fallback paths, already-decoded JSON, missing assets and truncated payloads passed |
| Static checks | All runtime JavaScript passed syntax checks; no diff whitespace errors |

The follow-up browser pass checked clickable overview totals, section paging, larger headings/pagination, bilingual question forms and both spelling modes. The grouped question table and pagination fit 320, 390, 768, 1024 and 1440px widths. The reported adjective table has exactly one spelling/IPA pair per form.

QA found and fixed lazy-detail history restoration, narrow English navigation clipping, an English search false positive caused by a source-note parenthesis, and untranslated corpus collection counts.

Browser layout and interaction checks used Chromium with responsive iframe viewports. A physical phone and Safari/WebKit were not available. Local media files absent from the upstream repository remain unavailable; source recording links are retained. External recordings and all third-party source links were not individually playback-tested. The old cleanup-equivalence suite compares a retired layout with a historical commit and does not apply to this redesign. The grammar DOM audit reuses the assertions from the browser grammar suite without requiring a local browser binary.

![Desktop dictionary at 1280px](ui-qa-desktop.jpg)

![Grouped question words with switchable spelling and IPA](ui-qa-grammar.jpg)
