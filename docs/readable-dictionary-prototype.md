# Dictionary text routes

`/text/` publishes compact initial HTML for direct reading without JavaScript,
client-side decompression, fonts, images, or data requests. Its native links
include their absolute destination as visible text for readers that discard
`href` attributes. The ordinary interactive homepage does not link, redirect,
preload, or fetch this directory.

## Published coverage

Selection operates on source witnesses after the normal website build has
applied its gloss reviews, IPA normalization and entry merges.

| Collection | Distinct entries in collection | Source witnesses |
| --- | ---: | ---: |
| Brassett 04 and 06, including their source aliases | 3,578 | 13,652 |
| Chinese Language Resources Protection Project, Longshan (`60757`) | 1,937 | 2,008 |
| Southern Tujia | 3,763 | 4,078 |
| Union | **8,938** | **19,738** |

An entry may belong to multiple collections. Southern selection uses the
witness dialect; a Southern source label may supply selection scope only when
the witness has no dialect classification. An explicit Northern or mixed
witness label is not overridden. Source-wide geography remains separately
labeled and is not assigned to a witness's missing locality.

The export also contains **199 survey sentences**: 99 from Longshan and 100
from Southern Luxi/Tanxi. Each retains both the survey file's original
transcription and the website's normalized IPA, Chinese prompt and source
annotation. This is a dictionary and survey-sentence export, not a reproduction
of every source PDF, recording or grammar chapter.

## Navigation

| Route | Content |
| --- | --- |
| `/text/` | Small coverage summary and collection links |
| `/text/browse/zh/index.html` | Paginated directory of all 4,978 Chinese sense keys |
| `/text/lookup/zh/吃.html` | Entries whose included witnesses match 吃 |
| `/text/entry/w684.html` | Included witnesses of that merged entry |
| `/text/source/brassett/index.html` | Brassett entry directory |
| `/text/source/longshan/index.html` | Longshan survey entry directory |
| `/text/source/southern/index.html` | Southern entry directory |
| `/text/corpus/index.html` | Survey sentence directory |

Directories contain at most 100 items per leaf page. Query pages are generated
for the Chinese senses actually present in selected witnesses. Punctuation
splitting and NFKC normalization match the site's Chinese-key conventions;
this is exact sense lookup, not arbitrary free-text search. The browse directory
is the authoritative list of URLs. Oversized or unsafe filename components use
short digest paths advertised by that directory. Pagination is separate from
query paths, including numeric queries.

The 吃 page now has two distinct merged entries in three collection rows:
Brassett and Longshan share `w684`; Southern witnesses use `stedt-rn-43584`.
The previously displayed Baojing candidates are outside this export's scope.
No interactive-only candidate is presented as a text detail page.

## Evidence and compact rendering

Pages use plain paragraphs, headings, wrapped text blocks and native links.
The small inline stylesheet supports text enlargement, keyboard focus, narrow
screens and system light/dark colors. There are no cards, decorative assets,
external stylesheets or bilingual repetitions of every interface label.
Original English glosses and source language material remain intact.

Every populated witness field is retained, including editorial translation
provenance, original glosses, corrections and notices. Entry IDs, attestation
IDs, source IDs and canonical source IDs remain distinct. Source descriptions
are listed once per entry. A linked notation is also listed once, with the exact
included attestation IDs; its processing metadata is not attributed to an
individual witness when the merged record has multiple origins. Unlinked
headline spelling is not promoted to witness evidence. The export performs no
new spelling conversion.

All pages show the prepared-data version. Generated routes are removed before
rebuilding so deleted or excluded records cannot remain publicly accessible as
stale files. The generator never rewrites the interactive homepage or prepared
datasets.

## Measured size

Measurements for prepared-data version `22cb01c6881a6922`:

| Item | HTML bytes |
| --- | ---: |
| Text directory | 2,086 |
| 吃 lookup | 1,550 |
| `w684` detail | 10,318 |
| `stedt-rn-43584` detail | 4,522 |
| Largest page (sentence directory leaf) | 18,224 |
| All 14,267 files | **45,073,361** |

The two sample details previously occupied 60,248 and 12,956 bytes. They are
now about 83% and 65% smaller, respectively; the Northern page also excludes
witnesses outside the selected collections. These percentages therefore
combine layout savings with the explicit source-scope change.

The staged site excluding `/text/` occupies 67,467,248 bytes. Full text coverage
adds about **45.1 MB**, or **66.8%**, bringing that staged directory to about
112.5 MB. The extension is substantial deployment storage; it does not add
ordinary homepage transfer. The sum of separately gzip-compressed HTML files
is 19,529,943 bytes, a local estimate rather than a server encoding measurement.
Readers retrieve individual small pages, never the whole directory by default.

## Build and validation

The normal Pages workflow invokes `build-readable-dictionary.cjs` from
`prepare-search-data.cjs`. The generated `/text/` and `/prepared/` directories
remain ignored by Git and are included in the deployment artifact.

For an already prepared stage:

```sh
node scripts/build-readable-dictionary.cjs .local/release-qa/site
READABLE_SCREENSHOT_DIR=.local/text-expanded/screenshots node scripts/test-readable-dictionary.cjs .local/release-qa/site
node scripts/test-reader-copy.cjs .local/release-qa/site
node scripts/test-web-loading.cjs .local/release-qa/site
```

The full export check compares all selected witness fields and notation links
against prepared data; checks every Chinese query's candidate set, all sentence
transcriptions and every internal link; and enforces a 60 MiB storage budget.
Fixtures check source aliases, dialect isolation, unsafe content, stale-route
removal, missing locality and numeric-query/pagination separation.

Chromium tests run with JavaScript disabled at desktop and 320px widths in
light and dark mode. They discover the 吃 URL from visible directory text,
navigate through query and collection directories, read source witnesses,
exercise keyboard navigation and 200% text enlargement, and assert that only
documents are requested. The ordinary loading regression covers interactive
search, reader routes, deferred datasets, retries and navigation races. Screenshots
receive a separate visual review; the reader-copy check also passes.

The relevant [Chrome Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance/guides)
is applied through semantic HTML, native navigation, relative font sizing,
unrestricted zoom, wrapping layouts, system color preferences and no render-time
data dependency. These checks do not claim full accessibility conformance or
establish a particular hosted model's domain access. DeepSeek/Gemini must still
test their own page-reading tools after publication.
