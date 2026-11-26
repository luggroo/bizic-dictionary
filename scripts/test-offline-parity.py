#!/usr/bin/env python3
"""Compare the immutable application snapshot with a prepared production website."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import re
import subprocess
from zipfile import ZipFile


def check(site, archive):
    def production(name):
        return json.loads(gzip.decompress((site / 'prepared' / (name + '.json.gz')).read_bytes()))

    with ZipFile(archive) as bundle:
        paths = set(bundle.namelist())
        manifest = json.loads(bundle.read('offline-manifest.json'))
        assert len(paths) == len(bundle.namelist()), 'Repeated file in archive'
        assert paths == {'offline-manifest.json', *(file['path'] for file in manifest['files'])}
        assert manifest['schemaVersion'] == 1 and re.fullmatch('[0-9a-f]{40}', manifest['sourceRevision'])
        version = re.search(r'<meta name="prepared-data-version" content="([0-9a-f]+)">', (site / 'index.html').read_text())[1]
        assert manifest['contentVersion'] == version
        for file in manifest['files']:
            data = bundle.read(file['path'])
            assert len(data) == file['size'] and hashlib.sha256(data).hexdigest() == file['sha256'], file['path']
            assert not file['path'].endswith(('.pdf', '.mp3', '.mp4', '.onnx')), file['path']
        assert not any(name.startswith(('text/', 'prepared/entries/', 'prepared/corpus-entries/')) for name in paths)
        assert {'data.json.gz', 'dictionary.json.gz', 'prepared/core.json.gz', 'prepared/words-index.json.gz'}.isdisjoint(paths)
        for homepage in ('index.html', 'en/index.html'):
            html = bundle.read(homepage).decode('utf-8')
            nav = re.search(r'<aside[\s\S]*?<nav\b[^>]*>([\s\S]*?)</nav>', html)[1]
            assert re.findall(r'<button data-view="([^"]+)"', nav) == ['words','grammar','corpus','sources']
            assert nav.count('href="/_app/keyboard"') == 1

        def mobile(name):
            return json.loads(gzip.decompress(bundle.read('prepared/' + name + '.json.gz')))

        # Assert full dataset and field equality, including verbatim attestations,
        # loan scopes, glosses, location data, citations and both language editions' notes.
        for name in ('home','history','catalogue','corpus-index','corpus-search','corpus'):
            assert mobile(name) == production(name), name
        search_test = Path(__file__).with_name('test-prepared-search.cjs')
        subprocess.run(['node', search_test, site.resolve(), '--check-offline'], check=True,
                       input=bundle.read('prepared/word-search.json.gz'))
        index = production('word-search')
        columns = dict(zip(index['keys'], index['columns'], strict=True))
        ids = columns['id']
        batches = {}
        for word_id, number in zip(ids, columns['_chunk'], strict=True):
            batches.setdefault(number, []).append(word_id)
        for number, group in batches.items():
            batch = mobile('words-' + str(number))
            assert [entry['id'] for entry in batch] == group
            for word in batch:
                assert word == production('entries/' + word['id']), word['id']
        for corpus in mobile('corpus')['corpus']:
            assert corpus == production('corpus-entries/' + corpus['id']), corpus['id']
        for source in [*mobile('catalogue')['sources'], *mobile('catalogue')['sourceVariants']]:
            if source.get('_textChunk'):
                assert mobile(source['_textChunk']) == production(source['_textChunk']), source['id']
        assert all('fonts/' + f in paths for f in ['Charis-Regular.woff2','Charis-Bold.woff2','NotoSerifTibetan.woff',
                                                   *(f'GentiumPlus-{style}.woff2' for style in ['Regular','Bold','Italic','BoldItalic'])])
        assert all(name in paths for name in ['vendor/pako_inflate.min.js','translation.html','translation-en.html','brassett/grammar.json',
                                               'grammar-reviewed-data.js','grammar-xiaren-data.js','notation-profiles.js'])
        print('PASS', json.dumps(dict(manifest['counts'], wordBatches=len(batches), verifiedFiles=len(paths) - 1)))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site', type=Path, help='Website directory after the Pages preparation steps')
    parser.add_argument('archive', type=Path)
    args = parser.parse_args()
    check(args.site, args.archive)
