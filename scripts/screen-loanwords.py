#!/usr/bin/env python3
"""Reproducible phonotactic ranking of reviewed positives vs unlabeled entries.

Requires numpy and scikit-learn. Scores are review priorities, not calibrated
borrowing probabilities. No meaning, donor, source ID or existing badge enters
the classifier. Meanings are used only in a separate reference-retrieval pass.
"""
import argparse
from collections import Counter, defaultdict
import csv
import hashlib
import json
from pathlib import Path
import re
import unicodedata

import numpy as np
import sklearn
from sklearn.feature_extraction import DictVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import StratifiedGroupKFold

TONES = '⁰¹²³⁴⁵⁶⁷⁸⁹'
VOWELS = set('aeiouyɑɐɒæɛɜəɘɤɨɪɔœøɵɯʉʊʌɶɞɿʅ')
SEPARATORS = re.compile(r'[\s|｜◦.·\-–—=()\[\]<>ˈˌ]+')


def syllables(ipa):
    """Reject incomplete segmentation; never silently discard untuned tails."""
    value = SEPARATORS.sub('', unicodedata.normalize('NFC', ipa))
    parts = re.findall(r'([^' + TONES + r']+)([' + TONES + r']+)', value)
    if not parts or ''.join(a + b for a, b in parts) != value:
        return None
    result = []
    for segment, tone in parts:
        if re.search(r'[0-9/／;；~～]', segment):
            return None
        nucleus = next((i for i, ch in enumerate(segment)
                        if unicodedata.normalize('NFD', ch)[0] in VOWELS), None)
        # Syllabic nasals are a rime; preserve the original segment.
        if nucleus is None:
            if not re.fullmatch(r'[mnŋɲȵ̩̍̃]+', segment):
                return None
            nucleus = 0
        result.append((segment[:nucleus] or '∅', segment[nucleus:], tone))
    return result


def forms(word):
    return list(dict.fromkeys(s.strip() for ipa in word['ipa']
                              for s in re.split(r'[/／;；~～]', ipa) if s.strip()))


def features(parts):
    counts = Counter()
    for onset, rime, tone in parts:
        for key in (f'O:{onset}', f'R:{rime}', f'T:{tone}',
                    f'OR:{onset}|{rime}', f'RT:{rime}|{tone}',
                    f'ORT:{onset}|{rime}|{tone}'):
            counts[key] += 1
    # Frequencies avoid making word length the principal borrowing signal.
    for key in counts:
        counts[key] /= len(parts)
    for a, b in zip(parts, parts[1:]):
        counts['PAIR:' + '|'.join(a + b)] += 1 / max(1, len(parts) - 1)
    return dict(counts)


def region(word):
    return 'south' if '南部' in word.get('dialect', '') or word['source'] == 'yubao-60824' else 'north'


def rules_for(word, registry):
    aliases = set(word['aliases'])
    return [rule for rule in registry['rules'] if rule['id'] in aliases]


def blocked(word, registry):
    return any(r['policy'] in ('exclude-entry', 'retain-review') for r in rules_for(word, registry))


def rejected_form(word, ipa, registry):
    canonical = lambda s: SEPARATORS.sub('', unicodedata.normalize('NFC', s))
    return any(r['policy'] == 'reject-form' and canonical(r['ipa']) == canonical(ipa)
               for r in rules_for(word, registry))


def group_ids(rows):
    """Put identical segmental forms OR identical glosses in one CV fold."""
    parents = list(range(len(rows)))
    def find(i):
        while i != parents[i]:
            parents[i] = parents[parents[i]]
            i = parents[i]
        return i
    seen = {}
    for i, row in enumerate(rows):
        gloss = re.sub(r'[\s（）()]+', '', row['word']['zh'])
        segmental = '|'.join(a + b for a, b, _ in row['parts'])
        for key in ((row['region'], 'gloss', gloss), (row['region'], 'ipa', segmental)):
            if key in seen:
                parents[find(i)] = find(seen[key])
            seen[key] = i
    return np.array([find(i) for i in range(len(rows))])


def fit_predict(train, test, bags, seed):
    # Fit the vocabulary on training rows only, including during validation.
    vectorizer = DictVectorizer()
    x = vectorizer.fit_transform([features(r['parts']) for r in train])
    xt = vectorizer.transform([features(r['parts']) for r in test])
    labels = np.array([r['label'] for r in train])
    positives, background = np.flatnonzero(labels == 1), np.flatnonzero(labels == 0)
    if not len(positives) or not len(background):
        raise ValueError('Both reviewed positives and unlabeled background are required')
    rng = np.random.default_rng(seed)
    predictions = []
    for _ in range(bags):
        chosen = np.r_[positives, rng.choice(background, min(len(background), len(positives) * 2), replace=False)]
        model = LogisticRegression(C=0.3, class_weight='balanced', solver='liblinear', random_state=seed, max_iter=500)
        model.fit(x[chosen], labels[chosen])
        predictions.append(model.predict_proba(xt)[:, 1])
    return np.mean(predictions, axis=0), np.std(predictions, axis=0)


def reference_bank(words, registry):
    bank = defaultdict(list)
    for w in words:
        if blocked(w, registry):
            continue
        for note in w['notes']:
            donor = note.get('donor', '')
            if not donor or any(r['policy'] == 'reject-donor' and r.get('donor') == donor
                                for r in rules_for(w, registry)):
                continue
            for form in note.get('reviewedForms', []):
                if rejected_form(w, form['ipa'], registry):
                    continue
                parts = syllables(form['ipa'])
                if not parts:
                    continue
                start, end = form['span']
                selected = parts[start - 1:end]
                if not selected or end > len(parts):
                    continue
                key = (region(w), tuple(o + r for o, r, _ in selected))
                bank[key].append({'id': w['id'], 'donor': donor, 'source': w['source'],
                                  'ipa': form['ipa'], 'span': [start, end],
                                  'tones': [t for _, _, t in selected]})
    return bank


def matches(row, bank, registry):
    w, parts = row['word'], row['parts']
    prohibited = {r['donor'] for r in rules_for(w, registry) if r['policy'] == 'reject-donor'}
    found = []
    for start in range(len(parts)):
        for end in range(start + 1, len(parts) + 1):
            key = (row['region'], tuple(o + r for o, r, _ in parts[start:end]))
            for ref in bank.get(key, []):
                if ref['id'] == w['id'] or ref['donor'] in prohibited:
                    continue
                same_tones = ref['tones'] == [t for _, _, t in parts[start:end]]
                overlap = ''.join(sorted(set(ref['donor']) & set(w['zh']) - set('子儿的（）；; ')))
                # A single unrelated homophone is not a useful retrieval result.
                if end - start == 1 and not overlap:
                    continue
                found.append({**ref, 'candidateSpan': [start + 1, end],
                              'sameTones': same_tones, 'sameSource': ref['source'] == w['source'],
                              'glossOverlap': overlap})
    found.sort(key=lambda x: (bool(x['glossOverlap']), x['sameTones'], x['sameSource'],
                              x['candidateSpan'][1] - x['candidateSpan'][0]), reverse=True)
    unique = {}
    for ref in found:
        unique.setdefault((ref['donor'], tuple(ref['candidateSpan']), ref['sameTones']), ref)
    return list(unique.values())[:6]


def run(input_path, constraints_path, output):
    words = json.loads(input_path.read_text())['words']
    registry = json.loads(constraints_path.read_text())
    rows, coverage, native = [], [], []
    for w in words:
        rules = rules_for(w, registry)
        status = 'already-annotated' if w['scope'] else 'excluded' if blocked(w, registry) else 'ranked'
        parsed = [(ipa, syllables(ipa)) for ipa in forms(w)]
        for ipa, parts in parsed:
            if parts:
                row = dict(word=w, ipa=ipa, parts=parts, region=region(w),
                           label=int(w['scope'] == 'whole'),
                           status='excluded-form' if rejected_form(w, ipa, registry) else status)
                rows.append(row)
                if any(r.get('nativeSeed') for r in rules):
                    native.append(row)
        coverage.append({'id': w['id'], 'status': status if any(p for _, p in parsed) else 'unparsed',
                         'constraintPolicies': sorted({r['policy'] for r in rules}),
                         'parsedForms': sum(p is not None for _, p in parsed), 'forms': len(parsed)})
    bank = reference_bank(words, registry)
    diagnostics = {}
    for area in ('north', 'south'):
        area_rows = [r for r in rows if r['region'] == area]
        # Partial/mixed entries and excluded cases are not negative examples.
        train = [r for r in area_rows if r['word']['scope'] in ('', 'whole')
                 and not blocked(r['word'], registry) and r['status'] != 'excluded-form']
        groups = group_ids(train)
        y = np.array([r['label'] for r in train])
        oof = np.zeros(len(train))
        folds = StratifiedGroupKFold(n_splits=5, shuffle=True, random_state=20261023)
        for fold, (tr, te) in enumerate(folds.split(np.zeros(len(train)), y, groups)):
            assert not set(groups[tr]) & set(groups[te])
            oof[te], _ = fit_predict([train[i] for i in tr], [train[i] for i in te], 3, 20261023 + fold)
        windows = []
        for row in area_rows:
            if row['status'] != 'ranked':
                continue
            for start in range(len(row['parts'])):
                for end in range(start + 1, min(len(row['parts']), start + 4) + 1):
                    if start == 0 and end == len(row['parts']):
                        continue
                    windows.append({'parts': row['parts'][start:end], 'parent': row,
                                    'span': [start + 1, end]})
        predictions, variability = fit_predict(train, area_rows + windows, 8, 20261023)
        for row, score, spread in zip(area_rows, predictions[:len(area_rows)], variability[:len(area_rows)]):
            row['score'], row['bagStd'] = round(float(score), 6), round(float(spread), 6)
            row['bestSpanScore'], row['bestSpan'] = row['score'], [1, len(row['parts'])]
        for window, score in zip(windows, predictions[len(area_rows):]):
            row = window['parent']
            if score > row['bestSpanScore']:
                row['bestSpanScore'], row['bestSpan'] = round(float(score), 6), window['span']
        diagnostics[area] = {'reviewedWholeForms': int(y.sum()), 'unlabeledForms': int((y == 0).sum()),
                             'groups': len(set(groups)), 'groupedLabelAUC': round(float(roc_auc_score(y, oof)), 4)}
    candidates = []
    for r in rows:
        if r['status'] != 'ranked':
            continue
        w = r['word']
        refs = matches(r, bank, registry)
        exact_semantic = any(ref['sameTones'] and ref['glossOverlap'] for ref in refs)
        segmental_semantic = any(ref['glossOverlap'] for ref in refs)
        tier = 'A-exact-reference' if exact_semantic else 'B-segmental-reference' if segmental_semantic else 'C-pattern-only'
        candidates.append({'id': w['id'], 'zh': w['zh'], 'en': w['en'], 'ipa': r['ipa'],
                           'spelling': ' / '.join(v['text'] for v in w['spelling'].get('accent', [])),
                           'location': w['location'] or w['dialect'], 'source': w['source'],
                           'region': r['region'], 'priority': r['score'], 'bagStd': r['bagStd'],
                           'bestSpanPriority': r['bestSpanScore'], 'bestSpan': r['bestSpan'],
                           'tier': tier, 'references': refs})
    candidates.sort(key=lambda r: (-r['priority'], r['id'], r['ipa']))
    by_id = {w['id']: w for w in words}
    assert not any(blocked(by_id[r['id']], registry) for r in candidates)
    # Aggregated profiles are observations, not historical sound correspondences.
    profiles = {}
    for name, subset in [('reviewedWhole', [r for r in rows if r['label'] and not blocked(r['word'], registry)]),
                         ('unlabeled', [r for r in rows if r['status'] == 'ranked']), ('explicitNativeSeeds', native)]:
        profiles[name] = {'entries': len({r['word']['id'] for r in subset}),
                          'ids': sorted({r['word']['id'] for r in subset}) if name == 'explicitNativeSeeds' else None}
        for area in ('north', 'south'):
            parts = [part for r in subset if r['region'] == area for part in r['parts']]
            profiles[name][area] = {kind: dict(Counter(make(p) for p in parts).most_common(30))
                                    for kind, make in [('onset', lambda p: p[0]), ('rime', lambda p: p[1]),
                                                       ('tone', lambda p: p[2]), ('combination', lambda p: '|'.join(p))]}
    enrichment = {}
    for area in ('north', 'south'):
        positive = Counter('|'.join(p) for r in rows if r['region'] == area and r['label']
                           and not blocked(r['word'], registry) for p in r['parts'])
        background = Counter('|'.join(p) for r in rows if r['region'] == area and r['status'] == 'ranked'
                             for p in r['parts'])
        ptotal, utotal = sum(positive.values()), sum(background.values())
        vocabulary = len(positive.keys() | background.keys())
        enriched = [{'combination': key, 'reviewedCount': count, 'unlabeledCount': background[key],
                     'frequencyRatio': round(((count + 0.5) / (ptotal + 0.5 * vocabulary)) /
                                             ((background[key] + 0.5) / (utotal + 0.5 * vocabulary)), 3)}
                    for key, count in positive.items() if count >= 8]
        enrichment[area] = {'reviewedSyllables': ptotal, 'unlabeledSyllables': utotal,
                            'minimumReviewedCount': 8, 'smoothing': 0.5,
                            'combinations': sorted(enriched, key=lambda r: -r['frequencyRatio'])[:30]}
    output.mkdir(parents=True, exist_ok=True)
    summary = {'method': 'Bagged logistic positive-versus-unlabeled ranking; separate North/South fits',
               'seed': 20261023, 'bags': 8, 'pythonDependencies': {'numpy': np.__version__, 'sklearn': sklearn.__version__},
               'inputSHA256': hashlib.sha256(input_path.read_bytes()).hexdigest(),
               'constraintsSHA256': hashlib.sha256(constraints_path.read_bytes()).hexdigest(),
               'limitations': ['Unlabeled entries are not certified native negatives.',
                               'Scores are not calibrated borrowing probabilities.',
                               'Grouped label AUC measures known-label separation, not etymological precision.',
                               'Same-segment or same-gloss entries share validation folds; unrecorded related roots may remain.',
                               'Source and dialect-specific IPA conventions limit comparisons; tone differences remain explicit.',
                               'Unparsed forms remain in coverage; they require manual review.',
                               'Same donor/gloss character overlap supports retrieval only; it does not prove etymology.'],
               'counts': dict(Counter(r['status'] for r in coverage)), 'totalEntries': len(words),
               'existingScopes': dict(Counter(w['scope'] or 'unmarked' for w in words)),
               'rankedForms': len(candidates), 'diagnostics': diagnostics, 'profiles': profiles,
               'phonotacticEnrichment': enrichment}
    for name, value in [('summary', summary), ('coverage', coverage), ('candidates', candidates)]:
        (output / (name + '.json')).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    with (output / 'candidates.tsv').open('w') as handle:
        writer = csv.writer(handle, delimiter='\t', lineterminator='\n')
        writer.writerow(['id', '汉义', '拼音', 'IPA', '调查点', '整词排序分数（非概率）', '最高片段分数', '片段音节', '检索级别', '对照词／音节／声调相同'])
        for r in candidates:
            refs = '; '.join(f"{x['donor']} [{','.join(map(str,x['candidateSpan']))}] {x['sameTones']} ({x['id']})" for x in r['references'])
            writer.writerow([r['id'], r['zh'], r['spelling'], r['ipa'], r['location'], r['priority'], r['bestSpanPriority'], r['bestSpan'], r['tier'], refs])
    print(json.dumps({k: summary[k] for k in ('totalEntries', 'counts', 'rankedForms', 'diagnostics')}, ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--constraints', type=Path, default=Path(__file__).resolve().parents[1] / 'docs/loan-screening-constraints.json')
    args = parser.parse_args()
    run(args.input, args.constraints, args.output)
