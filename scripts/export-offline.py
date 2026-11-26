#!/usr/bin/env python3
"""Build a self-contained, deterministic reader ZIP from the Pages inputs."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from zipfile import ZIP_DEFLATED, ZIP_STORED, ZipFile, ZipInfo

REPO = Path(__file__).resolve().parents[1]
SITE = REPO / 'site'
SCRIPTS = REPO / 'scripts'


def run(*args):
    subprocess.run(args, cwd=REPO, check=True)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def json_bytes(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':')).encode('utf-8')


def prepared_json(root, name):
    return json.loads(gzip.decompress((root / 'prepared' / (name + '.json.gz')).read_bytes()))


def prepare(root, font_archive):
    # A working checkout can also contain the generated multi-thousand-page SEO tree.
    # Start from tracked Pages inputs, not from the contents of a previous build.
    names = subprocess.check_output(['git', 'ls-files', '-z', 'site'], cwd=REPO).decode().split('\0')
    for name in filter(None, names):
        source = REPO / name
        destination = root / source.relative_to(SITE)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
    for name in ('data.json', 'dictionary.json'):
        (root / name).write_bytes(gzip.decompress((root / (name + '.gz')).read_bytes()))
    font_args = ['--archive', str(font_archive.resolve())] if font_archive else []
    run(sys.executable, SCRIPTS / 'prepare-webfonts.py', root, *font_args)
    run(sys.executable, SCRIPTS / 'apply-gloss-reviews.py', root)
    for script in ('refresh-brassett-ipa', 'normalize-ipa-data', 'prepare-search-data', 'build-localized-home'):
        run('node', SCRIPTS / (script + '.cjs'), root)


def category(path):
    name = path.name
    if path.parts[0] == 'fonts':
        return 'fonts'
    if path.parts[0] == 'prepared':
        if name.startswith(('word', 'entries')):
            return 'dictionary'
        if name.startswith('corpus'):
            return 'corpus'
        if name.startswith(('catalogue', 'source-', 'history')):
            return 'bibliography'
        return 'other'
    if 'translations' in name or name.startswith('ui-language'):
        return 'localization'
    if 'grammar' in name or name.startswith(('south-zhou', 'verbs')):
        return 'grammar'
    if 'notation' in name or 'ipa' in name:
        return 'notation'
    if name.startswith(('word-', 'editorial-', 'lexical-', 'semantic-', 'spelling-')):
        return 'dictionary'
    if name.startswith(('yubao', 'longshan-texts', 'corpus')):
        return 'corpus'
    if name in ('research.js', 'comparison-merge.js'):
        return 'bibliography'
    if path.suffix in ('.js', '.html', '.css', '.svg', '.webmanifest'):
        return 'frontend'
    return 'other'


def build_reader(root, output):
    def copy(name, source=None):
        dest = output / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source or root / name, dest)
    index = (root / 'index.html').read_text()
    version = re.search(r'<meta name="prepared-data-version" content="([0-9a-f]+)">', index)[1]
    # Same eager dependencies and all of the production loader's lazy groups.
    eager = re.findall(r'(?:src|href)="([^"?]+\.(?:js|css))(?:\?[^"]*)?"', index)
    loader = (root / 'page-loader.js').read_text().split(' const assets=', 1)[0]
    lazy = re.findall(r"'([\w./-]+\.(?:js|css))'", loader)
    data_files = ['icon.svg', 'yangque-logo.svg', 'brassett/grammar.json',
                  'notation-coverage.json', 'xu-ipa-site-mapping.json', 'xu-ipa-site-mapping.md',
                  'xu-transcription-notes.md', 'translation-gloss.js', 'translation-guide.js',
                  'translation-guide.css', 'vendor/pako-LICENSE.txt', 'vendor/opencc-dictionary-LICENSE.txt']
    for name in set(eager + lazy + data_files):
        copy(name)
    for path in (root / 'fonts').iterdir():
        copy(path.relative_to(root))
    copy('fonts/NotoSerifTibetan-OFL.txt', REPO / 'offline/NotoSerifTibetan-OFL.txt')
    for name in ('academy.css', 'academy.js'):
        copy(name, REPO / 'offline' / name)
    copy('mobile-optional.js', SITE / 'mobile-optional.js')
    run('node', '-e', "require('./scripts/mobile-optional.cjs').writeCatalog(process.argv[1],process.argv[2])",
        SITE, output)

    for name in ('home', 'word-search', 'catalogue', 'history', 'corpus', 'corpus-search', 'corpus-index'):
        copy('prepared/' + name + '.json.gz')
    for path in (root / 'prepared').glob('source-*.json.gz'):
        copy(path.relative_to(root))
    # Batch the exact production single-entry payloads. The forgiving online loader
    # also needs separate 200-word batches for exports; the app can share one set.
    index_data = prepared_json(root, 'word-search')
    columns = dict(zip(index_data['keys'], index_data['columns'], strict=True))
    batches = {}
    for word_id, group in zip(columns['id'], columns['_chunk'], strict=True):
        batches.setdefault(group, []).append(word_id)
    for group, ids in batches.items():
        entries = [prepared_json(root, 'entries/' + word_id) for word_id in ids]
        if any(entry['id'] != word_id or not isinstance(entry['attestations'], list)
               for entry, word_id in zip(entries, ids, strict=True)):
            raise ValueError('Invalid dictionary batch ' + str(group))
        data = gzip.compress(json_bytes(entries), compresslevel=9, mtime=0)
        (output / 'prepared' / ('words-' + str(group) + '.json.gz')).write_bytes(data)
    # gzip headers can record the build host's operating system. The payload and
    # CRC are independent of those fields. Use a fixed timestamp and OS byte.
    for chunk in (output / 'prepared').glob('*.gz'):
        data = bytearray(chunk.read_bytes())
        data[4:8] = bytes(4)
        data[9] = 255
        chunk.write_bytes(data)
    corpus_ids = [c['id'] for c in prepared_json(root, 'corpus')['corpus']]
    if corpus_ids != [c['_corpusEntry'] for c in prepared_json(root, 'corpus-index')['corpus']]:
        raise ValueError('Corpus index disagrees with full corpus')
    optional_script = '<script src="mobile-optional.js" defer></script>'
    for name in ('index.html', 'en/index.html', 'translation.html', 'translation-en.html'):
        html = (root / name).read_text().replace('<html lang=', '<html data-edition="offline" lang=', 1)
        html = html.replace('毕兹学堂', '毕资学堂').replace('</head>', '<link rel="stylesheet" href="academy.css"></head>')
        if name.endswith('index.html'):
            html = re.sub(r'<link rel="manifest"[^>]*>', '', html)
            # Both entrypoints render their localized home immediately. Both use the same bootstrap data.
            html, count = re.subn(r'<script id="site-bootstrap-data"[^>]*>[\s\S]*?</script>', '', html)
            if count != 1:
                raise ValueError('Expected production home bootstrap data')
            html = html.replace('<script src="media.js"', optional_script + '<script src="media.js"', 1)
            html = html.replace('<script src="app.js"', '<script src="academy.js" defer></script><script src="app.js"', 1)
        else:
            # The translation guide uses editorial absolute links for its learning tabs.
            html = html.replace('href="https://tujia.biz/?lang=', 'href="/?lang=')
            html = html.replace('href="translation-runs', 'href="https://tujia.biz/translation-runs')
            html = html.replace('</body>', optional_script+'<script src="academy.js" defer></script></body>')
        dest = output / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(html)
    # Keep the legacy published grammar URL; avoid executing inline redirects.
    guide = (root / 'guides/verbs.html').read_text()
    inline = re.search(r'<script>([^<]+)</script>', guide)
    (output / 'guides').mkdir()
    (output / 'guides/verbs.js').write_text(inline[1] + '\n')
    guide = guide.replace('<meta charset=', '<head><meta charset=', 1)
    (output / 'guides/verbs.html').write_text(guide.replace(inline[0], '<script src="verbs.js" defer></script></head>'))
    return version, {'words':len(columns['id']), 'aliases':len(index_data['wordAliases']), 'corpus':len(corpus_ids),
                     'sources':len(prepared_json(root, 'catalogue')['sources'])}


def write_zip(output, archive, version, counts):
    revision = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=REPO, text=True).strip()
    entries = sorted((p.relative_to(output) for p in output.rglob('*') if p.is_file()), key=Path.as_posix)
    files = []
    for name in entries:
        data = (output / name).read_bytes()
        files.append({'path':name.as_posix(), 'size':len(data), 'sha256':digest(data), 'category':category(name)})
    manifest = {'schemaVersion':1, 'contentVersion':version, 'sourceRevision':revision, 'counts':counts, 'files':files}
    manifest_path = Path('offline-manifest.json')
    (output / manifest_path).write_bytes(json_bytes(manifest) + b'\n')
    with ZipFile(archive, 'w') as bundle:
        for name in sorted([manifest_path, *entries], key=Path.as_posix):
            info = ZipInfo(name.as_posix(), (1980, 1, 1, 0, 0, 0))
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            method = ZIP_STORED if name.suffix in ('.gz','.woff','.woff2') else ZIP_DEFLATED
            bundle.writestr(info, (output / name).read_bytes(), compress_type=method, compresslevel=9)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archive', type=Path)
    parser.add_argument('--directory', type=Path, help='Also write extracted assets to this new directory')
    parser.add_argument('--font-archive', type=Path, help='Use the cached upstream GentiumPlus-6.200.zip')
    options = parser.parse_args()
    if options.directory and options.directory.exists():
        parser.error('--directory must be a new directory')
    archive = options.archive.resolve()
    archive.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=archive.parent) as scratch:
        temp = Path(scratch)
        root, output = temp / 'pages', temp / 'mobile'
        output.mkdir()
        prepare(root, options.font_archive)
        version, counts = build_reader(root, output)
        run('node', SCRIPTS / 'mobile-compat/build.cjs', output)
        result = temp / 'snapshot.zip'
        write_zip(output, result, version, counts)
        if options.directory:
            shutil.copytree(output, options.directory)
        result.replace(archive)
        print(json.dumps({'archive':str(archive), 'bytes':archive.stat().st_size, 'sha256':digest(archive.read_bytes()),
                          'contentVersion':version, **counts}, ensure_ascii=False))


if __name__ == '__main__':
    main()
