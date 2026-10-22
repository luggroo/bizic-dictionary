# Tujia-first interface typography

- Tujia spelling and interface labels: Gentium Plus 6.200 (all four faces).
- IPA and phonetic-only dictionary headwords: the existing same-origin Charis files.
- Bilingual UI: Tujia first in DOM and visual order; Chinese/English below. Existing Chinese/English interface font stacks are unchanged.
- Language records, spellings, transliteration rules, glosses and search logic are unchanged.

`site/typography.js` annotates rendered notation from dictionary records and existing column labels. It runs inside the localization refresh, while its observer is disconnected. Explicit slash-delimited IPA within linguistic content is tagged without changing text. The existing observer continues to handle newly rendered pages, details and spelling changes.

## Fonts

The Pages build runs `python3 scripts/prepare-webfonts.py site`. It fetches the pinned official SIL Gentium Plus 6.200 release, validates the expected archive size and WOFF2 signatures, and publishes the four unmodified fonts and their OFL alongside the site. An acquisition error stops deployment. Visitors do not request fonts from Google Fonts or another external service. Run the same command before local preview.

## Checks

`node scripts/test-typography.cjs` uses Playwright against `BASE_URL` (default `http://127.0.0.1:8000/`). It checks seven pages at 320, 390 and 1440 px, actual font loading, UI/DOM order, language and spelling changes, IPA-only headwords, console errors and document overflow. Set `BROWSER=webkit` for WebKit.

Implementation verification used Chromium with the current deployed site data and full Gentium Plus 6.200 fonts, including U+0331/U+0332, stacked tone marks, composed/decomposed vowels and tone digits. Browser font inspection confirmed the custom Gentium Plus face, not a fallback. No iOS/Android physical-device test was performed in this change.
