# Spelling boundary policy

Current policy: join noun suffixes to their bases. Use spaces between nouns and verbs/adjectives, and hyphens before predicate suffixes. Predicate nominalizers such as ma retain their boundary; subsequent noun suffixes do not introduce another hyphen (xie-madie, xie-maka). Keep a verb's following grammatical marker chain together (nie-bieta).

The audit removed 215 noun-only rules from the previous 421 rules. The remaining 206 explicit forms cover 206 current entries: 117 phrases, 5 verb-marker chains, 77 nominalizers and 7 predicates followed by nominalizers and noun suffixes. Mixed noun–verb–nominalizer constructions retain both boundary types (zi bang-ma, koba ti-ma, lamen ka-ma).

Noun diminutives, sex markers, clan/household markers, plurals and locative suffixes are no longer hyphenated. No additional kuli/bu segmentation review is needed under this display policy. Necessary syllable-separating apostrophes are preserved (halie'aba).

Boundary metadata is attached after merging. Original notations, source IPA, attestations, IDs and senses are unchanged. Search accepts joined and separated spelling. Both Northern display modes use the same morphological decisions; Southern notation is unchanged.

Validation: `node scripts/test-spelling-boundaries.cjs` checks restored noun forms, mixed constructions, predicate chains, apostrophes, original notation equality and equality of all non-boundary word data. Search, merge, Tian and Southern spelling regressions pass.
