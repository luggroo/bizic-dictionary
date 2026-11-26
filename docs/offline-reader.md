# Offline reader snapshot

The Android app loads the production reader from a bundled HTTPS origin. The ZIP is a build input. Its HTML, JavaScript, CSS, local data and fonts ship inside the signed application. The website and the native keyboard retain their own source repositories.

## Build

Use Python 3.10 or later, Git, Node.js and pnpm. Install the locked WebView compatibility dependencies and run the exporter from this repository.

```sh
pnpm --dir scripts/mobile-compat --ignore-workspace install --frozen-lockfile --ignore-scripts
python3 scripts/export-offline.py out/learning.zip --directory out/learning
```

The first build fetches the official Gentium Plus 6.200 ZIP. For a fully offline rebuild, add `--font-archive /path/to/GentiumPlus-6.200.zip`. Both paths verify the same SHA-256 digest. The exported asset directory is optional and must be new. Pin the emitted ZIP digest in the keyboard repository and extract its members beneath `assets/learning/` during the app build.

The origin root serves the bundled `index.html`. English also has an `en/index.html` entry point. The Android asset handler can decode prepared gzip files and serve `application/json`, allowing the WebView to parse the response directly. Static hosts can serve the gzip bytes. The shared decoder checks the gzip magic and uses the browser decompressor or the included pako fallback. A native shell can accept a top-level user tap on `/_app/keyboard` to open its keyboard settings, or on `/_app/resource/<id>` to open a catalogued optional resource.

## Production source and offline coverage

| Area | Source-level behavior | Snapshot |
| --- | --- | --- |
| Publication | `.github/workflows/pages.yml` expands the two archives, installs webfonts, applies reviewed glosses, regenerates derived Brassett IPA and normalizes IPA. `scripts/prepare-search-data.cjs` applies the phonological, editorial, source-merging and reconstruction rules. | The exporter invokes these preparation scripts on a temporary copy. The shared frontend mounts the same compiled data as Pages. |
| Dictionary | `site/word-index.js` unpacks search columns and alias mappings. `app.js` searches original and displayed spellings, Chinese and English, handles dialect and part-of-speech filters, and opens lexical records. `word-entry.js` renders editorial notes. | The exporter runs the same unpacker and part-of-speech classifier at build time. It saves the resulting search terms, reviewed spellings, lexical classes and filter counts so older WebViews can open the dictionary sooner. The 200-entry batches contain the complete records for detail views and bulk dictionary export, including original attestations, dialects, loans, citations and translated notes. |
| Grammar | `grammar-reviewed.js`, the reviewed data and translations, `grammar-xiaren-data.js`, `grammar-notation.js` and `grammar-pages.js` render the northern, southern and Xianren materials, IPA, examples, chapter links and pagination. | The app ships the same modules, empty-state behavior, chapter IDs and source links. |
| Corpus | `loadYubao` and `loadLongshanTexts` merge survey entries, annotated texts and supplementary texts with the base corpus during preparation. `corpus-search.js` and `corpus-player.js` render search hits, transcripts and media controls. | The full corpus, summary index and search text are identical to Pages. A local detail reads the full corpus, so a second copy of every individual corpus entry is unnecessary. |
| Sources and notation | `research.js`, `notation-ui.js`, `notation-pairs.js` and the dialect/IPA mappings implement the catalogue, original text search, historical comparisons and notation converter. | All published metadata, including source variants and extracted text chunks, the notation tables and downloadable mapping files are local. Original publications and media remain optional. |
| Routes and preferences | `app.js` handles hash routes, stable `?id=` links, alias resolution, browser history and dialogs. `ui-language.js` applies the Chinese/English interface and Tujia headings with Ye or accent spelling. `taste.css` supplies the production light reader. | App routes reuse the router, headers, word cards and grammatical displays. The app adds a system/light/dark preference, remembers the interface language at cold launch, and exposes keyboard management in the main navigation. |
| Translation | The two translation guides share `translation-guide.js`, `translation-gloss.js` and the guide stylesheet. | Both guides work locally. A reader can request an example PDF through the native cache or open the online translation showcase. |

At production revision `405ef42106377132fc2a2474875e280180360f0a`, the tracked site occupies 23,782,827 bytes. `data.json.gz` is 2,698,614 bytes and contains 148 source records, 8 source variants, 26 corpus records and 1,352 reconstruction inputs. `dictionary.json.gz` is 1,437,661 bytes and contains 9,297 source dictionary records, 10,280 aliases and 567 word IDs with editorial notes. Their top-level keys are disjoint. Their prepared forms are where the duplication occurs. The published build integrates surveys and annotations into 16,577 dictionary entries with 12,539 aliases, 501 corpus records, 153 sources, 8 source variants and 359 merged comparisons.

The Pages output includes 16,577 independently compressed word-entry files totaling 17,366,980 bytes, 83 bulk word files totaling 2,464,072 bytes, a 2,013,328-byte full core and a 1,447,067-byte earlier search index. The current website’s compact search index is 674,665 bytes. Its offline form occupies 1,484,875 bytes, including word classes and source filters. The app also ships 83 batches of complete entries with their notes and 55 source-text chunks. Opening a word hydrates only the selected record. The archive omits the raw input archives, individual-entry gzip files, alternate indexes, the static text/SEO mirror, publication/demo PDFs, audio, videos, verification files and build tools. The complete Charis, Gentium Plus and Tibetan fonts and the vendors’ license notices travel with the reader.

## Contract and verification

`offline-manifest.json` lists the export schema, the Pages prepared data version, the dictionary checkout revision, counts and every other member's relative path, byte length, SHA-256 digest and size-report category. Sort order and ZIP timestamps are fixed. This manifest identifies data and dependencies inside the APK. A later network update contract needs a separate signature, declarative schemas and activation rules.

Compare an exported snapshot with an independently prepared website directory and exercise the actual mobile reader in a browser.

```sh
python3 scripts/test-offline-parity.py /path/to/prepared/site out/learning.zip
node scripts/test-offline-mobile.cjs out/learning
BROWSER=webkit node scripts/test-offline-mobile.cjs out/learning
```

The parity test walks every lexical entry, corpus record and source text against its published counterpart and verifies every archive member hash. The browser test uses the app's local HTTPS origin with external requests blocked. It needs Playwright and a browser executable. Android emulator runs additionally exercise the platform WebView, native navigation and IME.
