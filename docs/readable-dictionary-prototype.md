# Separate dictionary text routes

The website build generates a separate `/text/` directory for direct text
reading: a Chinese sense lookup for **吃** and full source-witness pages for
**w684** and **stedt-rn-43584**. Their initial HTML
contains the evidence; reading and navigation require no JavaScript, JSON
download, or gzip decompression on the client.

| Generated route | Scope |
| --- | --- |
| `/text/` | Directory of the available text lookup and source pages |
| `/text/lookup/zh/吃.html` | All matches for 吃 in the prepared Chinese exact-search keys |
| `/text/entry/w684.html` | Every witness of the merged Northern entry |
| `/text/entry/stedt-rn-43584.html` | Every witness of the merged Southern entry |

The existing `/`, `/#words`, and `/?id=…` routes remain the interactive website.
Its homepage, navigation, footer, and no-script fallback do not expose the text
entry point. The ordinary app does not preload or fetch these files; a reader
opens `/text/` or a specific text URL directly. The directory is separate public
content, not a replacement for the default interface.

The other two current candidates retain links to the existing interactive
website, explicitly labeled as requiring JavaScript. This prototype does not
provide arbitrary-query search or complete static coverage of the dictionary.

## Size and ordinary browsing

The current four pages add **87,521 bytes (85.47 KiB)** of HTML to the deployment
directory. The local staged site grows by about **0.13%**. No copy of the full
dictionary is added to the text directory.

| Text page | HTML bytes | Local gzip estimate |
| --- | ---: | ---: |
| `/text/index.html` | 6,402 | 2,727 |
| `/text/lookup/zh/吃.html` | 7,915 | 2,857 |
| `/text/entry/w684.html` | 60,248 | 5,842 |
| `/text/entry/stedt-rn-43584.html` | 12,956 | 3,609 |
| Total | 87,521 | 15,035 |

Local Brotli compression totals 11,848 bytes. Both compression figures are
estimates, not measurements of the deployed server's content encoding.

A JavaScript-enabled Chromium comparison of ordinary home → search **吃** →
open **w684** found identical request sets, status codes, and response bytes
before and after generating `/text/`. The three stages made 21, 15, and three
requests respectively, with **zero text-directory requests and zero added
response bytes**. The homepage HTML hash and its 76,681-byte size also stayed
unchanged. The local preview had the same missing font and three media paths in
both runs; this is an incremental comparison, not a production traffic estimate.

The Pages build uploads all site files, but the ordinary asset manifest includes
only root-level JavaScript and CSS. There is no service worker or precache step
that pulls this text directory into normal browsing. Tests keep the text entry
point out of the homepage's links and resource hints. Extending the prototype
to all entries would require a fresh storage measurement; it need not add any
ordinary page-load requests.

## Data and provenance

`scripts/prepare-search-data.cjs` invokes
`scripts/build-readable-dictionary.cjs` after writing prepared data. The new
renderer consumes the same final merged entries, source aliases, and prepared
spelling summaries as the website. It does not independently convert spellings
or rewrite original forms.

- Each witness has its own visible ID, original transcription, senses, source,
  locator, dialect, and recorded locality. Unknown locality stays unknown;
  source-wide geography is separately labeled.
- Linked notation is selected by `attestationIds`, never array position.
  Entry-level display spelling is identified separately from witness evidence.
- Merged notation records can combine source and derived forms. Their processing
  metadata is labeled as belonging to the notation record; mixed origins are
  not assigned to individual witnesses without a mapping.
- Original Chinese/English glosses, editorial translation provenance, source
  notices, and entry notes remain visible. Evidence is not hidden in collapsed
  controls or HTML attributes alone.
- Pages show the prepared-data version. Entry pages also show the SHA-256 of
  their prepared gzip input. These identify data, not linguistic correctness.

## Build and preview

Use the repository's normal dataset-expansion, gloss-review, IPA-normalization,
and prepared-data build sequence. The Pages workflow runs the new generator
through the existing build and runs its end-to-end test with the browser tests.
Generated pages are ignored by Git and included in the site artifact.

For the current local prototype, the complete staged website is at
`.local/readable-preview/site`. No live deployment is needed to inspect it:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory .local/readable-preview/site
```

Open `http://127.0.0.1:8765/text/`, follow the **吃** lookup, then open the two
full witness pages. To regenerate the four pages from existing prepared data:

```sh
node scripts/build-readable-dictionary.cjs .local/readable-preview/site
```

## Validation

```sh
READABLE_SCREENSHOT_DIR=.local/readable-preview/screenshots node scripts/test-readable-dictionary.cjs .local/readable-preview/site
node scripts/test-reader-copy.cjs .local/readable-preview/site
node scripts/test-prepared-search.cjs .local/readable-preview/site
node scripts/test-prepared-version.cjs .local/readable-preview/site
```

The reading test serves the pages over local HTTP, navigates from the text directory through lookup to both
entries with JavaScript disabled at desktop and mobile sizes, and compares every
witness and linked notation with the prepared records. It checks escaping,
unsafe source links, unknown-locality handling, mixed notation origins,
translation provenance, and horizontal overflow.

The current data produces four candidates, 18 Northern witnesses, and three
Southern witnesses. Desktop/mobile screenshots are generated locally when
`READABLE_SCREENSHOT_DIR` is set. Playwright and an installed Chromium are needed
for this test; `CHROMIUM_EXECUTABLE` can select a browser binary.

## Modern Web Guidance

The prototype applies the relevant parts of
[Chrome's Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance/guides):

| Guidance | Implementation |
| --- | --- |
| [HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html) | Native links, landmarks, ordered heading levels, labeled definition lists, and language annotations for English interface text and glosses |
| [Accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility) | Keyboard skip link to the focusable main heading, visible focus, distinct candidate link names, list semantics, and standalone link targets at least 44px high at the default font size |
| [Typography](https://developer.chrome.com/docs/modern-web-guidance/guides/visual-design/typography) and [OS text scaling](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/respect-os-text-scale) | Relative font sizes, an unset root font size, unitless line heights, unrestricted zoom, and the progressive `text-scale` meta declaration |
| [CSS layout](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css-layout) | Content-driven card columns, wrapping metadata, flexible heights, and document order matching visual order |
| [Dark mode](https://developer.chrome.com/docs/modern-web-guidance/guides/visual-design/dark-mode) | Early color-scheme declaration and shared light/dark color tokens selected by system preference, with a forced-colors focus outline |
| [Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance) | Complete initial HTML and small inline CSS; no client scripts, downloaded fonts, images, or data-fetch dependency chain |

The browser checks include keyboard navigation, 320px layout, doubled root font
size, increased text spacing, computed text and focus contrast, and emulated
dark/forced-color preferences. These supplement the source-fidelity tests.
The local run on 2026-11-13 passed for all four `/text/` pages in all three color modes,
preserving all 21 witnesses and making document requests only. Minimum sampled
text contrast was 5.28:1 in light mode, 8.08:1 in dark mode, and 13.99:1 with
forced colors; tested focus outlines exceeded 3:1. Reader-copy checks also passed.

They do not establish full WCAG conformance, physical-device OS text scaling,
screen-reader behavior, Safari/Firefox compatibility, or production Core Web
Vitals. Those require their respective environments after publication.

Local success does not verify Gemini or DeepSeek domain access. After a separate
publication, each target platform must open `/text/`, fetch the lookup page, discover the two
detail URLs, and quote their witness records. A platform fetch failure remains
distinct from an empty dictionary result. No translation skill was changed as
part of this prototype.

## Plain-text discovery follow-up

The directory now states its exact published coverage in prose. Directory and
candidate links include their complete public URL as visible text, so a reader
that drops `href` attributes can still recover the actual destination. Candidate
links include their entry ID; interactive-only candidates retain their actual
JavaScript route. No ungenerated text detail URL is advertised.

The browser test also seeds only `/text/`, extracts subsequent destinations from
visible main text, and reaches both details with JavaScript disabled. It verifies
all 21 witnesses against prepared data, including source/locality distinctions.
The follow-up adds 1,171 HTML bytes over the first prototype; ordinary homepage
links, resources and default behavior remain unchanged. Reader-copy, normal
loading and the existing desktop/mobile/accessibility checks pass.

This checks browser rendering and deterministic text discovery, not a hosted
model's extraction. A separate translator skill experiment records page access,
unpublished coverage and missing witness-linked notation independently. In this
release, headline accent forms have no witness IDs in the prepared summary;
their proximity to a witness does not establish a spelling/IPA pair.
