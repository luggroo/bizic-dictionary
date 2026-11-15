# Search sitemaps

Submit `https://tujia.biz/sitemap.xml` using the domain property or the
`https://tujia.biz/` URL-prefix property in Search Console. It directly lists the
Chinese homepage, the translation introduction and the English homepage. The
`/en/` URL-prefix property covers only that subtree and is not the property for
this site-wide submission.

The detailed index is available separately at `https://tujia.biz/sitemap-index.xml`.
It links to five groups built from the HTML pages actually published:

| Group | Content |
| --- | --- |
| `sitemap-pages.xml` | Chinese and English homes, translation introduction, text directory, complete dialect tables and main browse indexes |
| `sitemap-entries.xml` | Individual dictionary entries with source witnesses |
| `sitemap-lookups.xml` | Fixed Chinese-meaning lookup pages |
| `sitemap-sources.xml` | Source and collection indexes |
| `sitemap-corpus.xml` | Individual published examples and texts |

Numeric browse pages, first-character directories, verification files, data
downloads, JavaScript redirect pages and fragment routes such as `#words` and
`#grammar` are omitted. The dictionary sitemap covers the readable export;
entries available only inside the interactive dictionary have no standalone HTML
to include yet. Grammar sections likewise need standalone pages before they can
be listed individually.

The root `sitemap.xml` keeps its original three-URL format, including after a
rebuild. `robots.txt` continues to advertise that root file. The detailed index
and child files are generated during deployment and ignored by Git; the detailed
index can be submitted independently. Groups automatically
split into numbered files before reaching the protocol's URL or byte limits.
The readable pages expose matching canonical URLs. Unicode path components are
URL-encoded and XML values are escaped.

Run after preparing the readable dictionary and English homepage:

```sh
node scripts/build-sitemaps.cjs site
python3 scripts/test-sitemaps.py site
```

`lastmod` is omitted because a rebuild time is not a reliable per-page content
modification time. `priority` and `changefreq` are omitted because Google ignores
them. Listing a URL helps discovery but does not guarantee indexing. See
[Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
