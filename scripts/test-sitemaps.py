"""Validate the published sitemap graph against actual HTML, without a browser."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET

root = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / 'site')
ns = '{http://www.sitemaps.org/schemas/sitemap/0.9}'


class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = None
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        if tag == 'meta' and attrs.get('name') in ('robots', 'googlebot'):
            self.noindex |= 'noindex' in attrs.get('content', '').lower()


def local_path(url):
    parsed = urlsplit(url)
    assert parsed.scheme == 'https' and parsed.netloc == 'tujia.biz', url
    assert not parsed.query and not parsed.fragment, url
    name = unquote(parsed.path).lstrip('/')
    if not name or name.endswith('/'):
        name += 'index.html'
    file = root / name
    assert file.is_file(), (url, file)
    return file


def read_urlset(file):
    xml = ET.parse(file).getroot()
    assert xml.tag == ns + 'urlset'
    assert 0 < len(xml) <= 50000
    assert file.stat().st_size < 50_000_000
    urls = []
    for item in xml:
        url = item.findtext(ns + 'loc')
        page = local_path(url)
        assert page.suffix == '.html'
        parser = Metadata()
        parser.feed(page.read_text())
        assert parser.canonical == url, (url, parser.canonical)
        assert not parser.noindex, url
        assert item.find(ns + 'lastmod') is None, 'Do not claim a build time as a content update'
        urls.append(url)
    return urls


primary_urls = read_urlset(root / 'sitemap.xml')
expected_primary = {'https://tujia.biz/', 'https://tujia.biz/translation.html', 'https://tujia.biz/en/',
                    'https://tujia.biz/text/all/north.html', 'https://tujia.biz/text/all/south.html'}
for tab in ['words','grammar','notation','history','corpus','sources']:
    expected_primary.update(['https://tujia.biz/'+tab+'.html', 'https://tujia.biz/en/'+tab+'.html'])
assert len(primary_urls) == len(set(primary_urls)) == 17
assert set(primary_urls) == expected_primary

index = ET.parse(root / 'sitemap-index.xml').getroot()
assert index.tag == ns + 'sitemapindex'
children = [node.findtext(ns + 'loc') for node in index]
assert len(children) == len(set(children)) and len(children) >= 5
urls = []
sizes = {}
for child in children:
    file = local_path(child)
    child_urls = read_urlset(file)
    sizes[file.name] = len(child_urls)
    urls.extend(child_urls)

assert len(urls) == len(set(urls))
assert set(primary_urls) <= set(urls)
assert {'https://tujia.biz/', 'https://tujia.biz/en/', 'https://tujia.biz/translation.html',
        'https://tujia.biz/text/', 'https://tujia.biz/text/all/north.html',
        'https://tujia.biz/text/all/south.html'} <= set(urls)
actual_entries = {local_path(u).name for u in urls if '/text/entry/' in u}
assert actual_entries == {p.name for p in (root / 'text/entry').glob('*.html')}
actual_queries = {local_path(u).name for u in urls if '/text/lookup/zh/' in u}
assert actual_queries == {p.name for p in (root / 'text/lookup/zh').glob('*.html')}
assert any('%E5%90%83.html' in u for u in urls), 'Chinese paths must round-trip through URL encoding'
assert not any('/initial/zh/' in u or '/guides/' in u or 'google84a8104b434e4b7d' in u for u in urls)
assert not any(re.search(r'/text/(?:corpus|source/[^/]+|browse/[^/]+)/\d+\.html$', u) for u in urls), 'Browse pagination is not a separate content target'
assert 'Sitemap: https://tujia.biz/sitemap.xml' in (root / 'robots.txt').read_text()

# Exercise both protocol limits independently of the current dictionary size.
script = str(Path(__file__).with_name('build-sitemaps.cjs').resolve())
subprocess.run(['node', '-e', """
const assert=require('node:assert/strict');
const {chunkUrls}=require(process.argv[1]);
const urls=['https://tujia.biz/a','https://tujia.biz/b','https://tujia.biz/c'];
assert.equal(chunkUrls(urls,2).length,2);
const bytes=Buffer.byteLength(chunkUrls(urls.slice(0,1))[0]);
assert.equal(chunkUrls(urls,100,bytes).length,3);
assert.throws(()=>chunkUrls(urls,100,bytes-1));
assert(chunkUrls(["https://tujia.biz/吃&喝's.html"])[0].includes('&amp;'));
""", script], check=True)

print(json.dumps({'result': 'PASS', 'primary_urls': len(primary_urls), 'urls': len(urls), 'groups': sizes,
                  'checks': 'XML, unique canonical URLs, existing HTML, encoding, coverage and size limits'}))
