# Blind run evidence — en-crow

Only the assigned original and the frozen translate-tujia skill, reference files and static shards were read. No prior translations, other agents’ output, or evaluation results were consulted. No PDF was generated; the frozen skill was not modified.

Start: 2026-11-17 15:12:34 UTC.
End: 2026-11-17T15:16:58.542794+00:00.

Snapshot and every actual successful query response are in translation.json and queries.jsonl. Static exact lookups normalized NFKC/casefold/trim, used manifest FNV buckets, then filtered Northern records and source metadata. A later single scan queried eight explicit gloss substrings, saved complete witnesses, and deduplicated attestations. substring.py's console source label was accidentally taken from the last catalog value; the JSON records carry the correct per-record source_metadata and are authoritative.

## Selection and construction decisions

- Crow gǎ, thirst zégǎ, water cě, jar guán, stones ǎbǎ, turn over duán, swell/rise óng, finally zuíhóu: selected exact attested Northern forms. guán is a jar term; no assertion of a spout or handle is added.
- Found nì: Northern TBL rn430963 explicitly find / look for. Perfective liē supplies a completed narrative event. Brassett nī was retrieved but is glossed look for; yǐ see was rejected in favor of the exact find witness. TBL locality is not explicit in the export.
- Generic mouth záqī: B06 rn453769 (found by scoped substring), not the classifier zé. Instrument phrase uses B06:154 ex37; ordinary inability uses B06:127–128 V tā tī. Sentence 2 paraphrases failure to reach as inability to touch water with the mouth. Heavy dùzǐ with physical inability V hī cē follows B06:127–129.
- A little: cě lá xié uses lá (quantity a little, B06 rn455255) before existential. Numeral lá (one) is distinct: the sentence 4 quantity phrase follows the fully attested B06:37 ex12 lá bú lá bú mǒ; bú is explicitly used for stones (B04 rn455728). The first sentence's one crow and one jar use animal/jar classifier lǒng.
- Small stones: noun + attested long adjective bíkuī. Clause-patterns.md B06:101 ex66/69 supplies this direct modifier order. No adjective-nie structure is invented for a form already licensed directly.
- Goal: guán wótū bō, using the entire inside-pitcher place phrase before goal bō and main throwing verb lá. Original one-by-one is retained.
- Tried: exact and bounded expanded checks found no suitable attempt word. 试着 is a proposed minimal Chinese adverb insertion, placed immediately before duán. This is provisional contact-language composition under paraphrase-and-borrowing.md, not an attested whole clause. The attempt concept inadvertently reached 13 query keys (limit 12); recorded rather than omitted.
- Water rose: óng rn454366 explicitly rise/swell, avoiding the weaker preliminary ascend gǔ. Final dē xǐ expresses circumstantial ability, not permission or a newly acquired skill.

Meaning check: all five source sentences retained in order; crow and jar references consistent; little water vs low level distinguished; third sentence attempt, contrast and physical weight preserved; interior destination and iterative quantity preserved; rise precedes final ability. No IPA was invented for missing fields. Display term forms follow frozen format-2 shards; function forms follow bundled source-paired examples.

## Queries and execution

The exact commands are preserved as lookup.py, substring.py and compose.py. lookup.py was invoked with five batches; queries.jsonl records actual normalized conceptual keys, time, status, engine, source revision, full records and witness IDs. It includes zeroes and rejected candidates. No embedding setup or external retrieval was used.
