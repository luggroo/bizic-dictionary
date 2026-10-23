#!/usr/bin/env python3
"""Check linguistic distinctions and exclusions before running the ranker."""
import importlib.util
import json
from pathlib import Path
import sys
import unittest

sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('screen', Path(__file__).with_name('screen-loanwords.py'))
screen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(screen)


class ScreeningGuards(unittest.TestCase):
    def test_phonetic_distinctions(self):
        parse = screen.syllables
        self.assertEqual(parse('kɔŋ⁵⁵tɕaŋ⁵⁵ɣə³³la³³'),
                         [('k', 'ɔŋ', '⁵⁵'), ('tɕ', 'aŋ', '⁵⁵'), ('ɣ', 'ə', '³³'), ('l', 'a', '³³')])
        self.assertEqual(parse('tsɿ³³'), [('ts', 'ɿ', '³³')])
        self.assertNotEqual(parse('tsʰa³³'), parse('tsa³³'))
        self.assertNotEqual(parse('jã²¹'), parse('ja²¹'))
        self.assertNotEqual(parse('ja²¹'), parse('ja³³'))
        self.assertIsNone(parse('pau⁵⁵wa'))  # no invented tone on final wa
        self.assertIsNone(parse('a'))

    def test_alias_exclusion_and_scope(self):
        registry = json.loads((Path(__file__).resolve().parents[1] / 'docs/loan-screening-constraints.json').read_text())
        family = [r for r in registry['rules'] if r.get('family') == 'setu-corpse']
        self.assertEqual(len(family), 5)
        for rule in family:
            self.assertTrue(screen.blocked({'aliases': ['merged-fixture', rule['id']]}, registry))
        self.assertFalse(screen.blocked({'aliases': ['yubao-60824-v-2277']}, registry))
        component = {'aliases': ['yubao-60823-v-0411']}
        self.assertFalse(screen.blocked(component, registry))
        self.assertEqual(screen.rules_for(component, registry)[0]['span'], [2, 2])

    def test_exact_form_exclusion(self):
        word = {'aliases': ['a']}
        registry = {'rules': [{'id': 'a', 'policy': 'reject-form', 'ipa': 'tɕa³³'}]}
        self.assertTrue(screen.rejected_form(word, 'tɕa ³³', registry))
        self.assertFalse(screen.rejected_form(word, 'tɕa⁵⁵', registry))
        self.assertFalse(screen.rejected_form(word, 'tɕʰa³³', registry))

    def test_validation_grouping(self):
        def row(zh, ipa):
            return {'region': 'north', 'word': {'zh': zh}, 'parts': screen.syllables(ipa)}
        groups = screen.group_ids([row('箭', 'tɕaŋ⁵⁵'), row('箭', 'tɕiã¹³'),
                                   row('别义', 'tɕaŋ³³'), row('绳', 'ɣə³³la³³')])
        self.assertEqual(groups[0], groups[1])
        self.assertEqual(groups[0], groups[2])
        self.assertNotEqual(groups[0], groups[3])

    def test_loan_adaptation_retrieval(self):
        registry = {'rules': [], 'phonologicalComparison': {
            'north': ['y-to-i', 'nasal-coda-to-nasal-vowel'],
            'south': ['nasal-coda-to-nasal-vowel']}}
        rounded, adapted = screen.syllables('tɕʰyn³³'), screen.syllables('tɕʰĩ³³')
        self.assertNotEqual(screen.features(rounded), screen.features(adapted))
        self.assertEqual(screen.comparison_key(rounded, 'north', registry, True),
                         screen.comparison_key(adapted, 'north', registry, True))
        self.assertNotEqual(screen.comparison_key(rounded, 'south', registry, True),
                            screen.comparison_key(adapted, 'south', registry, True))
        self.assertNotEqual(screen.comparison_key(screen.syllables('n³³'), 'north', registry, True),
                            screen.comparison_key(screen.syllables('ŋ³³'), 'north', registry, True))
        reference = {'id': 'gall-reference', 'aliases': ['gall-reference'], 'zh': '苦胆',
                     'source': 'northern-point', 'dialect': '北部', 'notes': [{
                         'donor': '苦胆', 'reviewedForms': [{'ipa': 'kʰu⁵³tan³³', 'span': [1, 2]}]}]}
        word = {'id': 'snake-gall', 'aliases': ['snake-gall'], 'zh': '蛇胆', 'source': 'northern-point'}
        row = {'word': word, 'parts': screen.syllables('ɣo⁵⁵kʰu⁵³tã³³'), 'region': 'north'}
        refs = screen.matches(row, screen.reference_bank([reference], registry), registry)
        self.assertEqual(refs[0]['donor'], '苦胆')
        self.assertEqual(refs[0]['candidateSpan'], [2, 3])
        self.assertEqual(refs[0]['matchType'], 'adaptation')
        self.assertTrue(refs[0]['sameTones'])
        # Oral vowels, aspiration and the recorded tones remain distinct.
        self.assertNotEqual(screen.comparison_key(screen.syllables('kʰu⁵³ta³³'), 'north', registry, True),
                            screen.comparison_key(screen.syllables('kʰu⁵³tã³³'), 'north', registry, True))
        self.assertNotEqual(screen.comparison_key(screen.syllables('ku⁵³tã³³'), 'north', registry, True),
                            screen.comparison_key(screen.syllables('kʰu⁵³tã³³'), 'north', registry, True))
        row['parts'] = screen.syllables('ɣo⁵⁵kʰu⁵³tã⁵⁵')
        self.assertFalse(screen.matches(row, screen.reference_bank([reference], registry), registry)[0]['sameTones'])

    def test_explicit_followup_exclusions(self):
        root = Path(__file__).resolve().parents[1]
        review = json.loads((root / 'docs/loan-adaptation-review-2026-10-23.json').read_text())
        registry = json.loads((root / 'docs/loan-screening-constraints.json').read_text())
        for word in review['excluded']:
            for alias in word['aliases']:
                self.assertTrue(screen.blocked({'aliases': [alias, word['id']]}, registry))


if __name__ == '__main__':
    unittest.main()
