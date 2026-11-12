---
name: translate-tujia
description: Translate text into Northern or Southern Tujia, or review an existing translation, using the Bizic Academy dictionary, corpus, and reference grammar to check meaning, dialect, grammar, and spelling.
---

# Translate Tujia / 土家语翻译

Build a usable translation from attested words and constructions. Preserve the source's meaning and distinguish supported forms, productive combinations, and unresolved choices.

## Establish the task

- Follow the requested dialect and locality. Reuse an unambiguous target from the conversation; otherwise ask Northern or Southern while analyzing the source. For Northern without a narrower target, use Longshan materials and state that basis once. Translate Northern and Southern separately when both are requested.
- Identify the audience, register, and requested spelling. Separate meaning from additional constraints such as meter, rhyme, line count, or terminology; explain a trade-off only when it affects the result.
- For revision, preserve the supplied text and edit the requested span. Distinguish the author's choices from independently attested forms.

## Find evidence

Start with the committed repository materials. Use additional sources when the user supplies or authorizes them, preserving their provenance and access scope.

| Material | Use |
| --- | --- |
| `docs/reference-grammar.md` | Locate the relevant dialect's sentence patterns, nominal phrases, predicate forms, tone and spelling rules. Record the cited work, page, and example when available. |
| `site/dictionary.json.gz` | Search lexical senses and full forms. Inspect individual `attestations` and their IDs, source, locality, spelling scheme, and linked `notations`; merged entries can contain different witnesses. |
| `site/data.json.gz` | Look up source metadata and corpus texts. Check extraction quality, dialect, locality, and alignment before quoting an example. |
| `site/longshan-texts.json` | Find Northern discourse and genre-specific usage. Inspect `blocks`, literal wording, and context; a paragraph summary or cultural paraphrase is not a word-for-word translation. |
| `site/yubao-*.json` | Consult vocabulary and sentences from a specific survey point. Read each file's `point`, `location`, and `dialect`; Longshan, Xianren, Wanmi-po, and Southern Tanxi remain distinct. |
| `site/notation-profiles.js`, `site/grammar-notation.js`, `site/southern-notation.js` | Check source-specific transcription and display conversions. A display convention does not establish phonetic identity between sources. |

Decode gzip files before parsing, for example:

```python
import gzip, json
with gzip.open("site/dictionary.json.gz", "rt", encoding="utf-8") as f:
    words = json.load(f)["words"]
```

Search both lexical records and sentences; inspect complete records rather than taking the first gloss match. A missing search result establishes a retrieval gap. Machine glosses, OCR, editorial analyses, and a source cited by the grammar retain their limitations; cite a secondary quotation honestly when the original has not been checked. Record the repository commit for a reproducible audit.

## Translate

1. **Analyze meaning by clause.** Track participants and their roles, reference, time, aspect, negation scope, modality, comparison, condition, direction, result, and speech act. Keep narration and quotation distinct. Split long clauses where useful without deleting events or logical relations.
2. **Choose lexical senses and a workable paraphrase.** Prefer witnesses from the target locality and compatible sources. Identify the source locality and limits of any cross-locality borrowing. Check context, part of speech, argument roles, idioms, loans, and collocations. Search synonyms and simpler expressions, then use the paraphrase and borrowing options below before treating a missing exact word as untranslated.
3. **Find a construction.** Find an applicable grammatical rule or close attested examples for each important relation. Verify phrase order, case or relation markers, modifier vs predicate forms, nominalization, and clause linkage. General SOV order is a starting point; use the selected dialect's actual patterns for questions, topics, comparison, and other constructions.
4. **Apply supported rules.** Ordinary lexical substitution is possible when the construction is productive and the new word fits its semantic role. Check animacy, countability, classifiers, possession, compound boundaries, register, and tonal or morphological effects. When adapting an example, check additions, deletions, and movement separately; a gloss alone does not establish that a marker is optional in that construction. A superficially similar example does not establish a new predicate construction or suffix function.
5. **Build the predicate.** Resolve action stage, direction, result, ability, intention, possibility, and negation before choosing forms. Distinguish the meanings behind source-language expressions such as Chinese “会” and “了”. Check the whole predicate, contractions, irregular forms, and the scope of each marker; use Southern evidence for Southern morphology.
6. **Realize the sentence.** Arrange arguments and modifiers, select attested full forms, and maintain consistent reference and discourse flow. Preserve meaningful repetition, address terms, and voice. For constrained genres, check rhythm and line structure after semantic and grammatical checks.
7. **Audit against the source.** Recheck roles, polarity, time, modality, comparison direction, quantity, reference, and omitted or added content. Then check lexical sense, morphology, dialect, tones, and spelling. Back-translation can expose drift; it does not establish grammaticality or naturalness.

## Paraphrase and borrowing

Use meaning-preserving paraphrase actively. Translate the intended sense rather than requiring a dictionary headword for every source expression. Search the semantic field across Chinese and English glosses and inspect actual arguments and collocations: a brief headword gloss may cover the intended sense under different wording. Incorporate lexical information supplied by the user with its stated provenance, and investigate its construction rather than repeating an exact-gloss search. Simplify ornate wording, split reciprocal statements into two clauses, and express an abstract relation through a supported construction. Preserve participants, polarity, scope, conditions, and the passage's central contrast. Figurative large numbers can become “many” when abundance is the point; “all” is suitable when the intended set is exhaustive. Keep exact quantities when they matter. Briefly identify a material shift in meaning or emphasis.

Before borrowing a whole compound or idiom, try expressing its meaning with simpler predicates, modality, negation, or two linked clauses. Check the scope of negation and modality in the resulting construction; independently attested component words do not make every combination interchangeable. Prefer a supported compositional native expression when it retains the intended relation and emphasis.

When a native expression is unavailable or unsuitable, consult same-dialect examples of Chinese loans and code-switching. Inspect what was borrowed—a noun, a predicate, a modifier, or a connector—and how it participates in Tujia syntax. Borrowed nouns still take the relevant noun-phrase order and classifiers; objects precede verbs where the selected construction requires SOV. Borrowed predicates must receive the selected dialect's appropriate argument order, negation, aspect, and modality. Use attested local verbs for collocations when available rather than copying a Chinese verb–object phrase as a block.

Chinese lexical insertions may be written directly in Chinese characters. For a new translation, a proposed insertion can fill an unattested lexical slot when analogous borrowing patterns support the construction. Distinguish this proposed use from an established loan or a quoted mixed-language utterance; an exact historical occurrence of every inserted Chinese word is not a prerequisite for offering a clearly labelled mixed-language draft. Existing loans and proposed insertions remain subject to semantic and grammatical checks. Do not invent a Tujia pronunciation or tone for Chinese characters, or treat Chinese word order as the default merely because some words are Chinese.

Keep Tujia sentence structure and supported vocabulary wherever possible. Before delivery, revisit proposed Chinese insertions for native words missed through narrow gloss matching, and use a suitable native expression when found unless the task calls for borrowing. Explain the principal paraphrases and Chinese insertions once after the translation. A lexical gap that can be addressed this way need not become a placeholder; unresolved syntax or a materially uncertain meaning still requires a localized note.

## Preserve transcription and uncertainty

- Follow the requested notation; use the site's tone-marked romanization for `调号拼音`. Keep source transcription alongside it when useful for review. Use verified source-specific conversions and inspect failures instead of completing missing mappings by intuition.
- Preserve tone values, syllable boundaries, nasalization, and genuinely untoned particles in source quotations. Keep source IPA unchanged when a display system groups distinct tone values. Different notation arrays are paired only when their provenance supports that pairing.
- Distinguish an exact quotation from a new translation. A new sentence whose words and productive construction have evidence may be offered as a **proposed translation / 拟译** even if the full sentence is unattested. State the specific remaining gap rather than requiring an exact corpus match for every sentence.
- After considering paraphrase and an appropriate Chinese insertion, mark any remaining unsupported span `⟦待核：…⟧` and complete supported portions. If the uncertainty determines the whole clause's roles, polarity, modality, or logic, give a structural explanation or a clearly delimited candidate instead of asserting a verified complete sentence.
- Treat conflicting glosses, ambiguous alignment, missing tones, and incomplete source context as separate evidence gaps. Preserve ambiguity when it cannot be resolved. Identify Chinese insertions and retain their written form without assigning an unsupported Tujia pronunciation.

## Deliver

Give the translation first. For a short text, add only the notes needed to explain a material uncertainty or adaptation. For a longer text, align numbered clauses or passages with the source; keep dialect versions distinct. Add word alignment, IPA, or an evidence table when the task calls for learning, review, or verification.

For an audit, identify the affected span, the specific issue, supporting evidence, and a correction or unresolved choice. Report what was actually checked. Reserve “native-speaker reviewed” for an actual documented review; corpus support alone does not establish naturalness.

Use committed or authorized material within its access scope. Permission to read source material for research does not authorize publishing it. Keep progress reports and commissioning conversations outside the translation itself.
