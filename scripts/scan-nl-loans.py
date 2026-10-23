#!/usr/bin/env python3
"""Isolate references gained by n/l comparison, with all exclusions applied."""
import argparse
import copy
import importlib.util
import json
from pathlib import Path
import sys

sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('screen', Path(__file__).with_name('screen-loanwords.py'))
screen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(screen)


def scan(input_path, constraints_path):
    words = json.loads(input_path.read_text())['words']
    registry = json.loads(constraints_path.read_text())
    before_registry = copy.deepcopy(registry)
    for area in ('north', 'south'):
        before_registry['phonologicalComparison'][area] = [
            policy for policy in registry['phonologicalComparison'][area]
            if policy not in ('n-l-onset', 'palatal-n-before-i')]
    before_bank = screen.reference_bank(words, before_registry)
    bank = screen.reference_bank(words, registry)
    delta = []
    for word in words:
        if word['scope'] or screen.blocked(word, registry):
            continue
        for ipa in screen.forms(word):
            parts = screen.syllables(ipa)
            if not parts or not any(o in ('n', 'l', 'ɲ', 'ȵ', 'nʲ') for o, _, _ in parts):
                continue
            row = {'word': word, 'parts': parts, 'ipa': ipa, 'region': screen.region(word)}
            before = screen.matches(row, before_bank, before_registry)
            after = screen.matches(row, bank, registry)
            keys = {(r['id'], r['donor'], tuple(r['candidateSpan'])) for r in before}
            novel = [r for r in after if r['nlSyllables']
                     and (r['id'], r['donor'], tuple(r['candidateSpan'])) not in keys]
            if novel:
                old_donors = {r['donor'] for r in before}
                delta.append({'id': word['id'], 'zh': word['zh'], 'en': word['en'],
                              'ipa': ipa, 'location': word['location'] or word['dialect'],
                              'source': word['source'], 'spelling': word['spelling'],
                              'newDonors': sorted({r['donor'] for r in novel} - old_donors),
                              'references': novel})
    return delta


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--constraints', type=Path, default=Path(__file__).resolve().parents[1] / 'docs/loan-screening-constraints.json')
    args = parser.parse_args()
    result = scan(args.input, args.constraints)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print('n/l comparison adds references to', len(result), 'forms in', len({r['id'] for r in result}), 'entries;',
          sum(bool(r['newDonors']) for r in result), 'forms gain a new donor hypothesis.')
