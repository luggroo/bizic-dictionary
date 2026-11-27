#!/usr/bin/env python3
"""Bind one local reader export and its two bundled IME dictionaries to reviewed Git inputs."""
import argparse
import csv
import gzip
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import subprocess
import sys
import tempfile
from zipfile import BadZipFile, ZipFile

REPOSITORY = Path(__file__).resolve().parents[1]
ARCHIVE = 'learning-content/learning.zip'
PIN = 'learning-content/learning.sha256'
TABLES = ('shared/bundle/Assets/words.tsv', 'shared/bundle/Assets/northern-words.tsv')
COLUMNS = 'id word key meaning recommended aliases variants frequency kind shortGloss plain diacritic hanUnits romanAliases presentation'.split()
MANIFEST = 'offline-manifest.json'
# Source-specific rules used by the reader and/or the keyboard's build-time spelling adapters.
RULE_MODULES = {
    'site/ipa-normalize.js', 'site/notation-profiles.js', 'site/notation-ui.js',
    'site/southern-notation.js', 'site/yubao.js', 'site/grammar-notation.js',
    'site/lexical-reviews.js', 'site/spelling-boundaries.js', 'site/longshan-texts.js',
    'site/notation-pairs.js', 'site/south-zhou-phonology.js',
    'scripts/refresh-brassett-ipa.cjs', 'scripts/normalize-ipa-data.cjs',
}
RULE_EVIDENCE = {
    'site/xu-ipa-site-mapping.json', 'site/xu-ipa-site-mapping.md',
    'site/xu-transcription-notes.md', 'site/notation-coverage.json',
}
PREPARATION = {
    'scripts/export-offline.py', 'scripts/prepare-webfonts.py', 'scripts/apply-gloss-reviews.py',
    'scripts/prepare-search-data.cjs', 'scripts/build-localized-home.cjs',
    'scripts/build-readable-dictionary.cjs', 'scripts/skill-contract.cjs',
}
KEYBOARD_PROGRAMS = {
    'tools/import_words.py', 'tools/import_northern_words.py', 'tools/site_spellings.cjs',
    'tools/site_survey_words.cjs', 'tools/han_orthography.py', 'tools/keyboard_gloss.py',
    'tools/story-demo/longshan_spelling.py', 'tools/apply_orthography.py',
    'tools/prepare_northern_han_loans.py', 'tools/prepare_plain_han_loans.py',
    'tools/prepare_survey_han_loans.py', 'tools/sync_reviewed_loan_forms.py',
}
INDEX_BUILD = {'tools/ime_dictionary_index.py', 'tools/prepare_learning_assets.py', 'gradle/learning-assets.gradle'}
IME_PROVENANCE = {'tools/web-demo/ui/words.js', 'shared/bundle/Assets/licenses/orthography-revisions.json',
                  'shared/bundle/Assets/licenses/tujia-frequencies.json', 'shared/bundle/Assets/dialect-data-LICENSE.txt'}
DIRECT_COPIES = RULE_EVIDENCE | {'site/brassett/grammar.json'}
BATCH = re.compile(r'prepared/words-\d+\.json\.gz')
REVISION = re.compile(r'[a-f0-9]{40}')
SHA256 = re.compile(r'[a-f0-9]{64}')


def require(condition, message):
    if not condition:
        raise ValueError(message)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'), allow_nan=False).encode()


def fingerprint(value):
    return digest(canonical(value))


def unique_keys(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f'duplicate JSON key: {key}')
        result[key] = value
    return result


def git(repo, *args):
    result = subprocess.run(['git', '-C', str(repo), *args], capture_output=True,
                            env={**os.environ, 'GIT_NO_LAZY_FETCH': '1', 'GIT_ALLOW_PROTOCOL': ''})
    require(result.returncode == 0, result.stderr.decode(errors='replace').strip() or 'Git command failed')
    return result.stdout


def revision(repo, ref):
    commit = git(repo, 'rev-parse', '--verify', '--end-of-options', f'{ref}^{{commit}}').decode().strip()
    require(REVISION.fullmatch(commit), f'unsupported Git revision: {commit}')
    return commit


def dictionary_group(path):
    if path in RULE_MODULES:
        return 'spellingPrograms'
    if path in RULE_EVIDENCE:
        return 'spellingEvidence'
    if path.startswith('site/') and path.endswith(('.json', '.json.gz', '.md')):
        return 'sourceData'
    if path in PREPARATION or path.startswith('scripts/mobile-compat/'):
        return 'readerBuild'
    if path.startswith(('site/', 'offline/')):
        return 'readerSources'


def keyboard_group(path):
    if path in TABLES:
        return 'imeLexicons'
    if path in (ARCHIVE, PIN):
        return 'imeReaderPin'
    if path in KEYBOARD_PROGRAMS:
        return 'imeSpellingPrograms'
    if path.startswith('tools/data/') or path in IME_PROVENANCE:
        return 'imeEditorialInputs'
    if path in INDEX_BUILD:
        return 'imeIndexBuild'
    if path.startswith(('shared/src/', 'shared/include/')) or path == 'app/src/main/cpp/jni.cpp':
        return 'imeNativePrograms'


def inventory(repo, commit, classify, required):
    tree = git(repo, 'ls-tree', '-r', '-z', '--full-tree', commit)
    groups = {}
    selected = set()
    # Also catch staged-only edits and additional untracked publication inputs.
    changed = git(repo, 'diff', '--cached', '--no-ext-diff', '--no-renames', '--name-only', '-z', commit, '--')
    changed += git(repo, 'ls-files', '--others', '--exclude-standard', '-z')
    dirty = sorted({p for p in changed.decode().split('\0') if classify(p)})
    require(not dirty, f'{repo}: staged, untracked or different input(s) from {commit}: {", ".join(dirty[:10])}')
    for entry in filter(None, tree.decode().split('\0')):
        head, path = entry.split('\t', 1)
        section = classify(path)
        if not section:
            continue
        mode, kind, git_id = head.split()
        source = repo / path
        require(kind == 'blob' and mode in ('100644', '100755') and source.is_file()
                and not source.is_symlink(), f'missing or unsupported input: {source}')
        data = source.read_bytes()
        # Compare bytes to the immutable blob even when Git's stat cache or skip-worktree flags hide edits.
        object_hash = hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest()
        require(object_hash == git_id, f'dirty input differs from {commit}: {source}')
        groups.setdefault(section, {})[path] = digest(data)
        selected.add(path)
    require(required <= selected, f'{repo}: missing required Git inputs: {sorted(required - selected)}')
    return groups


def read_manifest(bundle):
    names = bundle.namelist()
    require(len(set(names)) == len(names), 'duplicate ZIP member')
    for name in names:
        path = PurePosixPath(name)
        require(name == path.as_posix() and not path.is_absolute() and '..' not in path.parts
                and '\\' not in name and not name.endswith('/'), f'invalid member path: {name}')
    manifest = json.loads(bundle.read(MANIFEST), object_pairs_hook=unique_keys)
    require(isinstance(manifest, dict) and type(manifest.get('schemaVersion')) is int
            and manifest['schemaVersion'] == 1, 'unsupported reader schemaVersion')
    require(REVISION.fullmatch(str(manifest.get('sourceRevision'))), 'invalid dictionary sourceRevision')
    require(re.fullmatch('[0-9a-f]{16}', str(manifest.get('contentVersion'))), 'invalid prepared contentVersion')
    require(isinstance(manifest.get('files'), list), 'invalid manifest files')
    files = {}
    for row in manifest['files']:
        path = row['path']
        require(path != MANIFEST and path not in files, f'duplicate or recursive manifest member: {path}')
        require(type(row['size']) is int and row['size'] >= 0 and SHA256.fullmatch(str(row['sha256'])),
                f'invalid manifest entry: {path}')
        files[path] = row
    require(set(names) == set(files) | {MANIFEST}, 'ZIP and manifest membership differ')
    return manifest, files


def word_evidence(files, bundle, index_ids):
    witnesses, readings = {}, {}
    witness_count = 0
    for name in sorted(files):
        if not BATCH.fullmatch(name):
            continue
        entries = json.loads(gzip.decompress(bundle.read(name)))
        require(isinstance(entries, list), f'invalid word batch: {name}')
        for word in entries:
            word_id = word['id']
            sources, forms = word['attestations'], word['notations']
            require(isinstance(word_id, str) and word_id and word_id not in witnesses, f'invalid or duplicate ID: {word_id}')
            require(isinstance(sources, list) and sources and isinstance(forms, dict), f'missing evidence: {word_id}')
            for item in sources:
                require(isinstance(item, dict) and all(isinstance(item.get(k), str) and item[k]
                        for k in ('id', 'source', 'term')), f'incomplete source attestation: {word_id}')
            # Hash entire objects, including review status, original tones, locators, alternatives and unknown fields.
            witnesses[word_id] = fingerprint(sources)
            readings[word_id] = fingerprint(forms)
            witness_count += len(sources)
    require(witnesses and witnesses.keys() == index_ids, 'word batches and search index have different IDs')
    return {'words': len(witnesses), 'attestations': witness_count,
            'attestationsSha256': fingerprint(witnesses), 'notationsSha256': fingerprint(readings)}


def snapshot(bundle, manifest, files, sources):
    groups = {'readerData': {}, 'readerActiveContent': {}, 'readerOtherAssets': {}}
    for name, row in files.items():
        info = bundle.getinfo(name)
        require(info.file_size == row['size'] and digest(bundle.read(name)) == row['sha256'], f'corrupt member: {name}')
        if name.endswith(('.json', '.json.gz', '.md')):
            group = 'readerData'
        elif name.endswith(('.js', '.html', '.svg')):
            group = 'readerActiveContent'
        else:
            group = 'readerOtherAssets'
        groups[group][name] = row['sha256']
    for source in DIRECT_COPIES:
        name = source.removeprefix('site/')
        original = sources[dictionary_group(source)][source]
        require(groups['readerData'].get(name) == original, f'exported source differs from Git: {name}')
    for name in ('index.html', 'en/index.html'):
        matches = re.findall(rb'<meta name="prepared-data-version" content="([0-9a-f]+)">', bundle.read(name))
        require(matches == [manifest['contentVersion'].encode()], f'contentVersion differs from {name}')
    def prepared(name):
        return json.loads(gzip.decompress(bundle.read(f'prepared/{name}.json.gz')))

    index = prepared('word-search')
    ids = {entry['id'] for entry in index['words']}
    require(len(ids) == len(index['words']), 'duplicate search ID')
    counts = {'words': len(ids), 'aliases': len(index['wordAliases']), 'sources': len(prepared('catalogue')['sources']),
              'corpus': len(prepared('corpus')['corpus'])}
    require(all(type(manifest['counts'].get(k)) is int and manifest['counts'][k] == v for k, v in counts.items()),
            'prepared data disagree with manifest counts')
    return groups, word_evidence(files, bundle, ids), {entry['id']: entry for entry in index['words']}


def lexicon_rows(repo, words):
    rows, spelling_audit = {}, {}
    for index, name in enumerate(TABLES):
        matched, unmatched, different = [], [], {}
        exact, case_only = 0, 0
        with (repo / name).open(encoding='utf-8', newline='') as handle:
            reader = csv.reader(handle, delimiter='\t')
            if index == 0:
                require(next(reader, None) == COLUMNS, f'incompatible TSV header: {name}')
            count = 0
            for line in reader:
                require(len(line) == len(COLUMNS) and line[0] and line[0] != 'id',
                        f'incompatible TSV row at {name}:{reader.line_num}')
                count += 1
                row = dict(zip(COLUMNS, line))
                if row['kind'] not in ('tujia', 'phonetic'):
                    continue
                word = words.get(row['id'])
                if word is None:
                    unmatched.append(row['id'])
                    continue
                displayed = {k: [v['text'] for v in word.get('_display', {}).get(k, [])] for k in ('ye', 'accent')}
                native = {'ye': row['word'], 'accent': row['diacritic']}
                if all(native[k] in displayed[k] for k in native):
                    exact += 1
                    matched.append(row['id'])
                elif all(native[k].lower() in [s.lower() for s in displayed[k]] for k in native):
                    case_only += 1
                    matched.append(row['id'])
                else:
                    different[row['id']] = {'ime': native, 'reader': displayed, 'source': word.get('source'),
                                             'dialects': word.get('dialects', [])}
            require(count > 0, f'empty lexicon: {name}')
            rows[name] = count
        spelling_audit[name] = {'exact': exact, 'caseOnly': case_only, 'different': different,
                                'matchedIds': sorted(matched), 'noDirectId': sorted(unmatched)}
    return rows, spelling_audit


def build(dictionary, keyboard, keyboard_ref, expected_dictionary=None):
    keyboard_commit = revision(keyboard, keyboard_ref)
    keyboard_files = inventory(keyboard, keyboard_commit, keyboard_group,
                               {*TABLES, ARCHIVE, PIN, 'tools/site_spellings.cjs'})
    archive_sha = keyboard_files['imeReaderPin'][ARCHIVE]
    require((keyboard / PIN).read_text(encoding='ascii').strip() == archive_sha, 'keyboard learning.sha256 differs from ZIP')
    with ZipFile(keyboard / ARCHIVE) as bundle:
        manifest, files = read_manifest(bundle)
        dictionary_commit = manifest['sourceRevision']
        require(revision(dictionary, dictionary_commit) == dictionary_commit, 'missing dictionary commit')
        if expected_dictionary:
            require(revision(dictionary, expected_dictionary) == dictionary_commit,
                    'ZIP sourceRevision does not match requested dictionary revision')
        sources = inventory(dictionary, dictionary_commit, dictionary_group, RULE_MODULES | DIRECT_COPIES
                            | {'site/data.json.gz', 'site/dictionary.json.gz', 'site/gloss-reviews.json'})
        payload, evidence, words = snapshot(bundle, manifest, files, sources)
    inputs = {**sources, **keyboard_files, **payload}
    joint_inputs = {'learning.zip': archive_sha, **inputs['imeLexicons']}
    row_counts, spelling_audit = lexicon_rows(keyboard, words)
    return {
        'lockSchemaVersion': 1, 'distribution': 'signed-apk', 'readerSchemaVersion': manifest['schemaVersion'],
        'generationEvidence': 'pinned-inputs; common generation of historical TSVs is unverified',
        'dictionaryRevision': dictionary_commit, 'keyboardInputRevision': keyboard_commit,
        'archiveSha256': archive_sha, 'contentVersion': manifest['contentVersion'], 'counts': manifest['counts'],
        'spellingRulesVersion': fingerprint([inputs['spellingPrograms'], inputs['spellingEvidence']]),
        'jointInputVersion': fingerprint(joint_inputs), 'witnesses': evidence, 'inputs': inputs,
        'groupVersions': {name: fingerprint(mapping) for name, mapping in inputs.items()},
        'imeTableSchema': {'columns': COLUMNS, 'firstTableHasHeader': True, 'rows': row_counts},
        'sharedSpellingAudit': spelling_audit,
    }


def verify_rebuilt(receipt, rebuilt):
    frequency = json.loads((rebuilt / 'licenses/tujia-frequencies.json').read_bytes(), object_pairs_hook=unique_keys)
    require(frequency.get('sourceRevision') == receipt['dictionaryRevision'], 'rebuilt lexicon reports another dictionary revision')
    require(frequency.get('wordsSHA256') == receipt['inputs']['imeLexicons'][TABLES[0]], 'rebuilt wordsSHA256 differs')
    recorded = frequency.get('sourcesSHA256', {})
    require(recorded and {'dictionary.json.gz', 'data.json.gz', 'notation-ui.js'} <= recorded.keys(),
            'missing rebuilt dictionary source digests')
    for name, checksum in recorded.items():
        key = 'site/' + name
        require(receipt['inputs'].get(dictionary_group(key), {}).get(key) == checksum,
                f'rebuilt dictionary source mismatch: {key}')
    recorded_inputs = frequency.get('inputSHA256', {})
    require('words.js' in recorded_inputs, 'missing rebuilt keyboard input digests')
    for name, checksum in recorded_inputs.items():
        path = 'tools/web-demo/ui/words.js' if name == 'words.js' else 'tools/data/' + name
        require(receipt['inputs'].get('imeEditorialInputs', {}).get(path) == checksum,
                f'rebuilt keyboard input mismatch: {path}')
    for path, checksum in receipt['inputs']['imeLexicons'].items():
        require(digest((rebuilt / Path(path).name).read_bytes()) == checksum, f'rebuilt output differs: {path}')


def read_lock(path):
    lock = json.loads(path.read_bytes(), object_pairs_hook=unique_keys)
    require(isinstance(lock, dict) and type(lock.get('lockSchemaVersion')) is int
            and lock['lockSchemaVersion'] == 1 and lock.get('distribution') == 'signed-apk', 'unsupported lock format')
    require(isinstance(lock.get('inputs'), dict) and all(isinstance(r, dict) for r in lock['inputs'].values()),
            'invalid lock inputs')
    require(lock.get('groupVersions') == {k: fingerprint(v) for k, v in lock['inputs'].items()},
            'invalid group digest in lock')
    return lock


def compare(old, new):
    changes = {}
    for group in sorted(old['inputs'].keys() | new['inputs'].keys()):
        before, after = old['inputs'].get(group, {}), new['inputs'].get(group, {})
        paths = sorted(p for p in before.keys() | after.keys() if before.get(p) != after.get(p))
        if paths:
            changes[group] = paths
    metadata = sorted(k for k in old.keys() | new.keys()
                      if k not in ('inputs', 'groupVersions') and old.get(k) != new.get(k))
    spelling = {}
    for name in TABLES:
        a, b = old['sharedSpellingAudit'][name], new['sharedSpellingAudit'][name]
        before, after = a['different'], b['different']
        removed = before.keys() - after.keys()
        spelling[name] = {
            'newOrChangedDifferences': sorted(k for k in after if before.get(k) != after[k]),
            'resolved': sorted(removed & set(b['matchedIds'])),
            'noLongerComparable': sorted(removed - set(b['matchedIds'])),
            'newWithoutDirectId': sorted(set(b['noDirectId']) - set(a['noDirectId'])),
        }
    return {'changedFiles': changes, 'changedFields': metadata, 'sharedSpellings': spelling,
            'readerOrImePayloadChanged': old['jointInputVersion'] != new['jointInputVersion'],
            'distribution': 'signed-apk'}


def spelling_report(receipt):
    report = {k: receipt[k] for k in ('dictionaryRevision', 'keyboardInputRevision', 'contentVersion',
                                      'archiveSha256', 'spellingRulesVersion', 'jointInputVersion')}
    report['assessment'] = '同一词条 ID 下至少一种拼写不同。每条差异均需结合来源和方言复核。'
    report['tables'] = {
        path: {'exact': audit['exact'], 'caseOnly': audit['caseOnly'], 'withoutDirectId': len(audit['noDirectId']),
               'differences': audit['different'], 'differenceCount': len(audit['different'])}
        for path, audit in receipt['sharedSpellingAudit'].items()}
    return report


def save(path, value):
    data = json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2, allow_nan=False) + '\n'
    with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=path.parent, delete=False) as output:
        temp = Path(output.name)
        try:
            output.write(data)
        except BaseException:
            temp.unlink(missing_ok=True)
            raise
    try:
        os.replace(temp, path)
    finally:
        temp.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    for mode in ('create', 'verify'):
        sub = commands.add_parser(mode)
        sub.add_argument('--dictionary', type=Path, default=REPOSITORY)
        sub.add_argument('--keyboard', type=Path, required=True)
        sub.add_argument('--dictionary-revision', help='also require this expected dictionary Git commit')
        if mode == 'create':
            sub.add_argument('--keyboard-revision', default='HEAD', help='Git commit containing the reviewed IME inputs')
            sub.add_argument('--out', type=Path, required=True)
        else:
            sub.add_argument('--lock', type=Path, required=True)
            sub.add_argument('--rebuilt-lexicons', type=Path, help='also verify both independently generated tables and their dictionary provenance')
    diff = commands.add_parser('compare')
    diff.add_argument('old', type=Path)
    diff.add_argument('new', type=Path)
    diff.add_argument('--review-spellings', action='store_true',
                      help='exit nonzero for new/changed disagreements or newly unlinked IME rows')
    spellings = commands.add_parser('spellings', help='export dated, source-specific differences for editorial review')
    spellings.add_argument('--lock', type=Path, required=True)
    spellings.add_argument('--out', type=Path, required=True)
    args = parser.parse_args()
    if args.command == 'spellings':
        save(args.out, spelling_report(read_lock(args.lock)))
        return
    if args.command == 'compare':
        changes = compare(read_lock(args.old), read_lock(args.new))
        print(json.dumps(changes, ensure_ascii=False, indent=2))
        if args.review_spellings:
            require(not any(s['newOrChangedDifferences'] or s['noLongerComparable'] or s['newWithoutDirectId']
                            for s in changes['sharedSpellings'].values()), 'review changes in shared spellings')
        return
    expected = read_lock(args.lock) if args.command == 'verify' else None
    ref = expected['keyboardInputRevision'] if expected else args.keyboard_revision
    current = build(args.dictionary, args.keyboard, ref, args.dictionary_revision)
    if expected is not None:
        require(current == expected, 'lock does not match local inputs: ' + json.dumps(compare(expected, current)))
        if args.rebuilt_lexicons:
            verify_rebuilt(current, args.rebuilt_lexicons)
    else:
        save(args.out, current)
    print(f"{args.command} OK  archive={current['archiveSha256']}  rules={current['spellingRulesVersion']}"
          f"  joint={current['jointInputVersion']}")


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, BadZipFile, KeyError, TypeError, csv.Error) as error:
        sys.exit(f'offline-update-lock: {error}')
