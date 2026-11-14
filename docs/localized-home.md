# Chinese and English homepages

`/` serves the Chinese homepage and `/en/` serves the English homepage. Both
return their title, description, navigation and home content in HTML, including
when JavaScript is disabled. Each has its own canonical URL and reciprocal
`hreflang` links. Both URLs are listed in `site/sitemap.xml`.

The English page is generated from `site/index.html` and the existing interface
translation tables by `scripts/build-localized-home.cjs`. Run it after preparing
the search data and versioning browser assets:

```sh
node scripts/build-localized-home.cjs site
node scripts/test-localized-home.cjs site
```

The Pages workflow performs these steps before deploying. After editing home
copy or interface labels, regenerate the checked-in `site/en/index.html` too.
The English page references the same root scripts, styles, fonts and lazy data
files; it does not duplicate or preload the dictionary. The root `<base>` URL
keeps relative asset requests working from `/en/` on the custom domain.

Generated `data-ui-source` attributes retain the Chinese interface strings so
the existing language selector can switch in either direction without a reload.
They are separate from dictionary records and source transcriptions. Native
language links in the footer work without JavaScript; when JavaScript is active,
they also retain the current query, route and entry ID. Explicit language entry
points override saved language preferences, and existing `?lang=en` / `?lang=zh`
links remain supported.

Publishing makes the pages available for crawling. Search result titles and
indexing schedules remain under the search engine's control. Search Console URL
inspection and reindexing require access to the verified site property.
