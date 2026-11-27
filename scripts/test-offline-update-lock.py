#!/usr/bin/env python3
"""Local release-lock regression tests. Uses temporary Git repositories only."""
import copy
import gzip
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from zipfile import ZipFile

sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('update_lock', Path(__file__).with_name('offline-update-lock.py'))
lock = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lock)


def write(root, name, data):
    path = root / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def commit(repo, message):
    lock.git(repo, 'add', '--', '.')
    lock.git(repo, '-c', 'user.name=Test', '-c', 'user.email=test@local.invalid',
             '-c', 'commit.gpgsign=false', 'commit', '-qm', message)
    return lock.revision(repo, 'HEAD')


class LocalRelease(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.dictionary, self.keyboard = self.root / 'dictionary', self.root / 'keyboard'
        for repo in (self.dictionary, self.keyboard):
            repo.mkdir()
            lock.git(repo, 'init', '-q')
        required = lock.RULE_MODULES | lock.DIRECT_COPIES | {
            'site/data.json.gz', 'site/dictionary.json.gz', 'site/gloss-reviews.json'}
        for name in required:
            write(self.dictionary, name, b'{}' if name.endswith('.json') else b'original\n')
        self.source = commit(self.dictionary, 'Local source witnesses')
        for i, name in enumerate(lock.TABLES):
            row = ['w1', 'form', '', 'sense', '', '', '', '1', 'tujia', '', 'form', 'form', '', '', '']
            lines = [lock.COLUMNS, row] if i == 0 else [row]
            write(self.keyboard, name, ''.join('\t'.join(r) + '\n' for r in lines).encode())
        write(self.keyboard, 'tools/site_spellings.cjs', b'// trusted build adapter\n')
        write(self.keyboard, 'tools/web-demo/ui/words.js', b'// local demo inputs\n')
        self.word = {'id': 'w1',
                     'attestations': [{'id': 'a1', 'source': 'A', 'term': 'X?', 'locator': 'p. 2',
                                       'notice': 'tone uncertain', 'dialect': 'local'}],
                     'notations': {'ipa': [{'text': 'X?', 'method': 'derived', 'attestationIds': ['a1']}]}}
        self.pack()
        self.keyboard_revision = commit(self.keyboard, 'Pin reader and two lexicons')

    def pack(self, mutate=None):
        entries = {p[5:]: (self.dictionary / p).read_bytes() for p in lock.DIRECT_COPIES}
        for name in ('index.html', 'en/index.html'):
            entries[name] = b'<meta name="prepared-data-version" content="1111111111111111">'
        entries['app.js'] = b'// bundled application only'
        display = {'ye': [{'text': 'form'}], 'accent': [{'text': 'form'}]}
        index = {'words': [{'id': 'w1', 'source': 'A', 'dialects': ['local'], '_display': display}], 'wordAliases': {}}
        for name, data in (('words-0', [self.word]), ('word-search', index),
                           ('corpus', {'corpus': []}), ('catalogue', {'sources': [{'id': 'A'}]})):
            entries[f'prepared/{name}.json.gz'] = gzip.compress(lock.canonical(data), mtime=0)
        manifest = {'schemaVersion': 1, 'sourceRevision': self.source, 'contentVersion': '1111111111111111',
                    'counts': {'words': 1, 'sources': 1, 'aliases': 0, 'corpus': 0},
                    'files': [{'path': p, 'size': len(b), 'sha256': lock.digest(b), 'category': 'other'}
                              for p, b in sorted(entries.items())]}
        if mutate:
            mutate(manifest, entries)
        dest = self.keyboard / lock.ARCHIVE
        dest.parent.mkdir(parents=True, exist_ok=True)
        with ZipFile(dest, 'w') as bundle:
            for p, b in entries.items():
                bundle.writestr(p, b)
            bundle.writestr(lock.MANIFEST, lock.canonical(manifest))
        write(self.keyboard, lock.PIN, (lock.digest(dest.read_bytes()) + '\n').encode())

    def build(self):
        return lock.build(self.dictionary, self.keyboard, 'HEAD')

    def cli(self, *args):
        return subprocess.run([sys.executable, spec.origin, *map(str, args)], capture_output=True, text=True)

    def test_reproducible_cli_and_unrelated_personal_files(self):
        path, repeat = self.root / 'receipt.json', self.root / 'repeat.json'
        options = ['--dictionary', self.dictionary, '--keyboard', self.keyboard]
        for target in (path, repeat):
            run = self.cli('create', *options, '--out', target)
            self.assertEqual(run.returncode, 0, run.stderr)
        self.assertEqual(path.read_bytes(), repeat.read_bytes())
        write(self.keyboard, 'README.md', b'documentation added after release')
        commit(self.keyboard, 'Independent documentation change')
        write(self.keyboard, 'private/user-data.sqlite', b'mock personal word')
        self.assertEqual(self.cli('verify', *options, '--lock', path).returncode, 0)
        self.assertEqual((self.keyboard / 'private/user-data.sqlite').read_bytes(), b'mock personal word')
        self.assertFalse(json.loads(self.cli('compare', path, repeat).stdout)['changedFiles'])
        damaged = json.loads(path.read_bytes())
        damaged['contentVersion'] = '0' * 16
        path.write_text(json.dumps(damaged))
        self.assertNotEqual(self.cli('verify', *options, '--lock', path).returncode, 0)

    def test_dirty_or_missing_inputs_fail(self):
        for repo, name in [(self.keyboard, p) for p in (*lock.TABLES, lock.ARCHIVE, lock.PIN)] + [
                (self.dictionary, 'site/notation-ui.js'), (self.dictionary, 'site/dictionary.json.gz')]:
            with self.subTest(name=name):
                path = repo / name
                original = path.read_bytes()
                path.write_bytes(original + b'x')
                with self.assertRaisesRegex(ValueError, 'dirty input'):
                    self.build()
                path.unlink()
                with self.assertRaisesRegex(ValueError, 'missing or unsupported'):
                    self.build()
                path.write_bytes(original)
        write(self.dictionary, 'site/extra-notation.js', b'new unchecked rule')
        with self.assertRaisesRegex(ValueError, 'untracked'):
            self.build()

    def test_committed_tsv_schema_and_pin_detected(self):
        write(self.keyboard, lock.PIN, b'0' * 64)
        commit(self.keyboard, 'Wrong checksum')
        with self.assertRaisesRegex(ValueError, 'learning.sha256'):
            self.build()
        self.pack()
        write(self.keyboard, lock.TABLES[1], b'w1\tonly five fields\n')
        commit(self.keyboard, 'Wrong supplementary columns')
        with self.assertRaisesRegex(ValueError, 'incompatible TSV row'):
            self.build()

    def test_mislabeled_or_corrupt_snapshots(self):
        cases = [
            (lambda m, e: m.update(schemaVersion=2), 'schemaVersion'),
            (lambda m, e: m.update(contentVersion='2' * 16), 'differs from index.html'),
            (lambda m, e: m['files'].append(m['files'][0]), 'duplicate'),
            (lambda m, e: e.update({'new.js': b'unlisted'}), 'membership'),
            (lambda m, e: e.update({'app.js': b'corrupt'}), 'corrupt member'),
            (lambda m, e: m['counts'].update(corpus=100), 'disagree with manifest counts'),
        ]
        for mutate, diagnostic in cases:
            with self.subTest(diagnostic=diagnostic):
                self.pack(mutate)
                commit(self.keyboard, 'Bad local fixture')
                with self.assertRaisesRegex(ValueError, diagnostic):
                    self.build()
        self.pack()
        commit(self.keyboard, 'Restore local fixture')
        write(self.dictionary, 'README.md', b'new revision')
        next_revision = commit(self.dictionary, 'Different source revision')
        with self.assertRaisesRegex(ValueError, 'requested dictionary revision'):
            lock.build(self.dictionary, self.keyboard, 'HEAD', next_revision)

    def test_change_classification_and_complete_witnesses(self):
        before = self.build()
        self.word['attestations'][0]['notice'] = 'alternative recorded; tone uncertain'
        self.pack()
        commit(self.keyboard, 'Retain revised witness')
        corrected = self.build()
        self.assertNotEqual(before['witnesses']['attestationsSha256'], corrected['witnesses']['attestationsSha256'])
        self.assertEqual(before['witnesses']['notationsSha256'], corrected['witnesses']['notationsSha256'])
        self.assertEqual(before['spellingRulesVersion'], corrected['spellingRulesVersion'])
        self.assertTrue(lock.compare(before, corrected)['threeInputBytesChanged'])
        self.assertFalse(lock.compare(before, corrected)['indexBuildCodeChanged'])
        original = copy.deepcopy(self.word)
        write(self.dictionary, 'site/notation-ui.js', b'// reviewed algorithm change')
        self.source = commit(self.dictionary, 'Change trusted conversion program')
        self.pack()
        commit(self.keyboard, 'Pin new program revision')
        changed = self.build()
        self.assertNotEqual(corrected['spellingRulesVersion'], changed['spellingRulesVersion'])
        self.assertEqual(lock.compare(corrected, changed)['changedFiles']['spellingPrograms'], ['site/notation-ui.js'])
        self.assertEqual(original, self.word)
        self.assertEqual(corrected['witnesses'], changed['witnesses'])
        self.assertEqual(changed['distribution'], 'signed-apk')

    def test_shared_spellings_are_reported_and_never_replaced(self):
        core = lock.TABLES[0]
        before = self.build()
        source = self.keyboard / core
        original = source.read_bytes()
        source.write_bytes(original.replace(b'w1\tform\t', b'w1\tother\t'))
        commit(self.keyboard, 'Divergent local typing representation')
        after = self.build()
        self.assertEqual(lock.compare(before, after)['sharedSpellings'][core]['newOrChangedDifferences'], ['w1'])
        self.assertEqual(lock.compare(after, before)['sharedSpellings'][core]['resolved'], ['w1'])
        self.assertEqual(lock.spelling_report(after)['tables'][core]['differences']['w1']['ime']['ye'], 'other')
        p, q = self.root / 'old.json', self.root / 'new.json'
        lock.save(p, before)
        lock.save(q, after)
        self.assertNotEqual(self.cli('compare', p, q, '--review-spellings').returncode, 0)
        self.assertEqual(self.cli('compare', q, p, '--review-spellings').returncode, 0)

    def test_code_only_index_update_uses_same_three_inputs(self):
        before = self.build()
        write(self.keyboard, 'tools/ime_dictionary_index.py', b'# revised witness grouping for the same word tables')
        commit(self.keyboard, 'Update only the index generator')
        after = self.build()
        changes = lock.compare(before, after)
        self.assertFalse(changes['threeInputBytesChanged'])
        self.assertTrue(changes['indexBuildCodeChanged'])
        self.assertEqual({'imeIndexBuild': ['tools/ime_dictionary_index.py']}, changes['changedFiles'])
        self.assertEqual(before['spellingRulesVersion'], after['spellingRulesVersion'])
        self.assertEqual(before['sharedSpellingAudit'], after['sharedSpellingAudit'])

    def test_independent_generation_provenance(self):
        receipt = self.build()
        rebuilt = self.root / 'built'
        sources = {n: lock.digest((self.dictionary / 'site' / n).read_bytes())
                   for n in ('dictionary.json.gz', 'data.json.gz', 'notation-ui.js')}
        native_inputs = {'words.js': receipt['inputs']['imeEditorialInputs']['tools/web-demo/ui/words.js']}
        origin = {'sourceRevision': self.source, 'sourcesSHA256': sources, 'inputSHA256': native_inputs,
                  'wordsSHA256': receipt['inputs']['imeLexicons'][lock.TABLES[0]]}
        for name in lock.TABLES:
            write(rebuilt, Path(name).name, (self.keyboard / name).read_bytes())
        write(rebuilt, 'licenses/tujia-frequencies.json', lock.canonical(origin))
        lock.verify_rebuilt(receipt, rebuilt)
        write(rebuilt, 'northern-words.tsv', b'stale')
        with self.assertRaisesRegex(ValueError, 'rebuilt output differs'):
            lock.verify_rebuilt(receipt, rebuilt)
        origin['sourceRevision'] = 'f' * 40
        write(rebuilt, 'licenses/tujia-frequencies.json', lock.canonical(origin))
        with self.assertRaisesRegex(ValueError, 'another dictionary revision'):
            lock.verify_rebuilt(receipt, rebuilt)


if __name__ == '__main__':
    unittest.main()
