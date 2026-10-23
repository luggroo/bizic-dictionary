# Spelling boundary policy

Current policy: join noun suffixes to their bases. Use spaces between nouns and verbs/adjectives, and hyphens before predicate suffixes. Predicate nominalizers such as ma retain their boundary; subsequent noun suffixes do not introduce another hyphen (xie-madie, xie-maka). Keep a verb's following grammatical marker chain together (nie-bieta).

The audit removed 215 noun-only rules from the previous 421 rules. The remaining 206 explicit forms cover 206 current entries: 117 phrases, 5 verb-marker chains, 77 nominalizers and 7 predicates followed by nominalizers and noun suffixes. Mixed noun–verb–nominalizer constructions retain both boundary types (zi bang-ma, koba ti-ma, lamen ka-ma).

Noun diminutives, sex markers, clan/household markers, plurals and locative suffixes are no longer hyphenated. No additional kuli/bu segmentation review is needed under this display policy. Necessary syllable-separating apostrophes are preserved (halie'aba).

Boundary metadata is attached after merging. Original notations, source IPA, attestations, IDs and senses are unchanged. Search accepts joined and separated spelling. Both Northern display modes use the same morphological decisions; Reviewed Southern forms use the same word-boundary policy. Southern POJ retains intra-word syllable hyphens and uses spaces at nominal–predicate boundaries.

Validation: `node scripts/test-spelling-boundaries.cjs` checks restored noun forms, mixed constructions, predicate chains, apostrophes, original notation equality and equality of all non-boundary word data. Search, merge, Tian and Southern spelling regressions pass.


## Baojing and Luxi extension (2026-10-21)

Added 93 individually selected survey forms across Baojing Yangchao (60756), Baojing Wanmipo (60823), and Luxi Tanxi (60824), plus Huang and Dai’s “打倒” (STEDT 407684). The new forms produce 125 display rules, including separate Luxi accent/POJ keys. Rules match both entry identity and the complete spelling, never a blanket substring replacement.

Nominal arguments are separated from predicates with spaces, including Luxi. Predicate chains use hyphens: ha-mo-kua-liao; the reviewed lie-linked chains include Yangchao 咽气 and Wanmipo 上学、鞭打、瞪. Nominal lie in words for dogs and eggs is not treated as a predicate linker. Unreviewed forms remain unchanged.

Validation checks every new rule against loaded, merged dictionary forms in its target display mode, and verifies that source records, IPA, senses and IDs remain unchanged. This is a reviewed batch, not a claim that every complex form in the corpus has been segmented.


## Morphology evidence review (2026-10-22)

The user's clarification reaffirms that non-category-changing verbal suffix chains stay together internally. Only a nominalizer adds a further boundary of that type. Do not infer multiple predicate boundaries from syllable count or a final lie/le/liau/nau string. In particular, the candidate góu-nà-liě is withdrawn; góu's status remains unestablished. The subsequent user-confirmed boundary is góunà-liě, with gouna left intact.

The 55 predicate/suffix candidates in the separate 354-record review are now annotated with independent-stem evidence in `morphology-evidence-2026-10-22.json`. The user's 11 named groups received focused documentary review. A bare swallow stem corresponding to re is attested in Brassett 2004 and Lu et al. 2019 example 64, but the function of Wanmipo lie in reliē is a separate question. Luxi cò and mí have exact independent same-point attestations; this does not by itself settle whether the negative element is an orthographic word or suffix. The piu attested independently at Wanmipo means the noun “wound”, not an independently verified verb “break”.

The audit now recommends Luxi cépě ēu (“boiling water” + “burn/heat”), supported by same-point survey entries 0065, 0858 and 2719. Wanmipo melā zuliū retains the whole predicate after the independently attested noun “sun”. These are review-list changes; no unverified internal analyses from that list were installed as dictionary display rules. Former multi-hyphen examples in the extension above must not be generalized to suffix chains: independently established predicates and a non-category-changing marker chain are different structures.

### User-confirmed follow-up

Installed the explicitly approved góunà-liě (Yangchao 0831) and re-liē (Wanmipo 0765) as exact-entry display rules. These approvals settle the displayed boundaries, not the internal status of gou or the exact grammatical function of lie. Original source transcription and tone placement are preserved.

Release integration preserves the latest IPA normalization and Luxi transcription corrections. Seven Luxi boundary keys were updated to the current ii / jjie spellings without changing their reviewed word boundaries. Fusion notes are available in both Chinese and English.

For Wanmipo xiunáo and piunáo, record the working analysis of a suffix -unao whose u is fused with the stem. The user has approved xiu-náo / piu-náo as the surface spellings and xi•unao / pi•unao in the explanatory notes; both exact-entry display rules and notes are installed. The bullet marks the analytical morpheme boundary, while the hyphen marks the surface spelling boundary after fusion. This remains a morphological analysis, not new documentary evidence for independently attested Wanmipo xi / pi. Preserve source letters and tones, do not restore an extra u in the spelling, and do not generalize to every nau-final word.

## POS audit integration (2026-10-23)

`lexical-reviews.js` adds exact-entry nominal–predicate boundaries for 307 entries, with 618 rules across the applicable display modes. The display IPA follows the same boundary while retaining every segment and tone; source notations and attestations remain unchanged. These rules precede older display rules for the same exact form. Ambiguous structures stay tentative, and opaque short variants are not forced into the segmentation of longer forms. Details and checks are in `pos-audit-2026-10-23.md`.
