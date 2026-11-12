---
name: translate-tujia
description: Translate into Northern or Southern Tujia using the Bizic Academy dictionary, corpus, and reference grammar, with evidence-based lexical and grammatical verification.
---

# Translate Tujia / 土家语翻译

Use this skill when asked to translate Chinese, English, songs, poems, or other material into Tujia, or to review an existing Tujia translation. This is a **research workflow**, not a claim that an automatic translator or validated bilingual model exists.

## Source priority

1. Work **only with materials in this repository** unless the user expressly permits external research.
2. Consult `docs/reference-grammar.md` for Northern/Southern grammar, tone and spelling, nominalization, modifier placement, verb morphology, argument structure, and particles.
3. Consult `site/longshan-texts.json` for attested Northern discourse, dialogues, folk songs, and natural phrases; preserve the original line and its translation when citing.
4. Consult `site/yubao-60757-*.json` for Northern Longshan vocabulary and `site/yubao-60756-*.json` for Northern Xianren vocabulary. Other dialects require separately identified sources.
5. Use the site's prepared dictionary where accessible (`site/dictionary.json.gz`, `site/data.json.gz`), and record provenance and dialect for every selected form. These are gzip files; decode before parsing. If unavailable, do not invent dictionary entries.
6. Existing grammar and corpus examples are evidence; do not treat automatically generated English glosses or editorial inferences as native-speaker validation.

## Translation procedure

1. **Identify dialect**. If not specified, ask whether Northern or Southern; if previous context unambiguously establishes the dialect, preserve it. For Northern, prefer a consistent Longshan variety unless the user selects another location.
2. **Analyze the source** by clause, participants, focus, aspect, idiom, and intended pragmatic effect. For songs, record line count, approximate syllable count, parallelism, rhyme, and repeated phrases.
3. **Find vocabulary** in the dictionary, checking example contexts and part of speech. Distinguish loanwords, idioms, and polysemy. Do not use an attested word with an unrelated sense merely because the Chinese gloss overlaps.
4. **Check grammar** against attested examples. Northern is generally SOV; verify adjective/stative predicate vs attributive usage, derived long forms, `nie`/`niexi` linking and nominalization, case/recipient marking, aspect, and result/degree complements.
5. **Check corpus** for the actual construction, not merely individual words. Especially for lyrics, look at attested terms of address, self-reference, and particles in songs and dialogue.
6. **Draft natural Tujia** rather than calquing Chinese word order. Preserve meaning and meter where possible; when competing constraints conflict, explain the trade-off.
7. **Audit each line**: dialect consistency, semantic match, grammar, syllable count, tones, spelling, and unsupported words. Separate **attested** constructions from **analogical proposals** and unresolved choices.
8. **Present a usable final translation**, followed by brief notes only where uncertainty matters. Do not pretend a draft has been verified by a native speaker.

## Romanization and tones

- Default to the **site's tone-marked romanization** when the user asks for `调号拼音`, not raw IPA or trailing Ye tone letters.
- Follow the site's own phonology and conversion code, including `site/grammar-notation.js` for reference-grammar display conventions; do not assign Mandarin tones by intuition.
- Preserve syllable boundaries, nasalization, and any lexically untoned particles. Do not invent tone marks when a source lacks them.
- For technical discussion, include IPA or source-specific Ye spellings alongside tone-marked forms if useful; in a singable lyric, favor tone-marked spelling alone unless the user requests otherwise.
- Do not mix Xianren, Longshan, and Southern phonology silently.

## Specific construction cautions

- **Stative modifiers**: A short predicate form does not automatically function as an attributive adjective. Check whether a lexical long/derived adjective is attested; otherwise evaluate `nie` or `niexi` with actual examples. Do not invent derivational suffixes.
- **`xi`**: In `V-xi + adjective`, documented examples include “eat well,” “plough well,” and “time passes slowly”; analyses include complement marking or event nominalization. Other `xi` functions include clause nominalization, degree, and assertion. Do not assume all are interchangeable.
- **`mor` / `mo`**: It is attested as a manner/accompaniment marker (“laugh while walking,” “sit while eating”) and also in corpus expressions translated as “speak clearly,” “manage to do,” “beat nearly to death,” and flooding to a result. Do not reduce it to manner only. Conversely, do not assume every stative predicate accepts `mor` as a result complement without evidence.
- **`di mor kaxilan`**: A proposed lyric rendering of “痛得不好过,” supported by analogy with `V mor + result`, **not** a directly verified native-speaker example. Preserve the user's preferred lyric form, but label the construction provisional when discussing its evidence.
- A source's Chinese “烂” may mean rotten, soft from cooking, or spoiled. Verify the sense and context before using the same Tujia lexeme for a rotten fruit.

## Lyric editing conventions

- Treat user-authored Tujia lines as the base text; do not overwrite their choices or replace a verse with an unrelated translation.
- Preserve line count, repeated refrains, meaningful vocatives, and song rhythm.
- If the user asks only for a targeted edit (e.g., one final line), edit that span and leave the rest intact.
- Explicitly distinguish user-supplied but unverified words from database-attested forms.
- Prefer concise alternatives over fabricated certainty. Mark a genuine unresolved choice rather than making up a form to complete a rhyme.

## Privacy and publication

- Never access, copy, publish, or upload private source archives, keys, or unpublished fieldwork without explicit permission. This skill must refer only to materials already committed to this repository.
- The skill file itself contains workflow guidance only, not private corpus data or credentials.

## Example request

> Translate this eight-line Chinese folk song into Northern Tujia in tone-marked romanization, matching the original meter. Verify address terms in the repository's Longshan songs, and annotate any unattested morphology.

Deliver the lyric, a short list of uncertain expressions, and a concise source trail.
