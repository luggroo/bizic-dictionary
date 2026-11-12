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

## Validate grammatical applicability first

Before composing a clause or adopting a paraphrase, verify the grammatical operations it needs in the target variety. Prioritize modality, aspect and stem changes, negation, nominalization, and predicate class. For each operation, identify its intended meaning and scope, the class of predicate or phrase it selects, its attachment site and order, and any restrictions on combinations. Consult the relevant grammar discussion and its examples; a dictionary gloss or a list of suffixes establishes neither applicability nor co-occurrence.

| Area | Check before use |
| --- | --- |
| Modality | Distinguish ability, circumstantial possibility, permission, necessity, intention, and prediction. Verify whether the form selects a verb, predicate phrase, or clause and whether it permits the intended stative or negative predicate. An example of learned ability does not by itself license a prediction or an emotional dependency reading. |
| Aspect and stem forms | Distinguish an ongoing event, a maintained state, completion, experience, an impending action, and a change of state. Check the predicate class, stem alternation or contraction, suffix order, and compatibility with modality and negation. A source-language tense or aspect word does not automatically require a suffix. |
| Negation | Distinguish negative existence or possession, factual negation, intention or prediction negation, negative ability, prohibition, and negative copulas. Determine what is negated and whether a lexical negative predicate can combine with another negative or modal form. Preserve the scope of double negation; the availability of both components alone does not license their concatenation. |
| Nominalization and linking | Determine whether the construction refers to an event, proposition, participant, object, place, or a modifier of an explicit head. Check argument gaps, head position, and the distribution of linking and nominalizing forms. Different functions or homophonous markers are not freely interchangeable. |
| Property predicates and adjectives | Classify the actual lexical form and its use as predicate, attributive modifier, or independent nominal expression. A Chinese adjective gloss does not establish a Tujia adjective. Check short vs derived forms and whether modification requires a linker or nominalization. Neither the predicate form nor a related adjective can automatically substitute for the other. |

For Northern Tujia, start with the reference grammar's predicate overview, sections 4.2–4.7, predicate-component order, and chapter 6; use the corresponding Southern sections for Southern translation. Keep source-specific differences and conflicting analyses explicit. Productive rules can support a new sentence without an exact full-sentence match when their semantic and grammatical conditions fit. If applicability remains unresolved, locate that uncertainty in the construction rather than hiding it behind a fluent lexical paraphrase or a Chinese insertion.

## Translate

1. **Analyze meaning by clause.** Track participants and their roles, reference, time, aspect, negation scope, modality, comparison, condition, direction, result, and speech act. Keep narration and quotation distinct. Split long clauses where useful without deleting events or logical relations.
2. **Retrieve senses and classify lexical forms.** Prefer witnesses from the target locality and compatible sources. Identify the source locality and limits of any cross-locality borrowing. Check context, argument roles, idioms, loans, and collocations. Establish the candidate predicate's class from its grammar and usage, rather than relying on a Chinese gloss or a machine part-of-speech label. Search synonyms and simpler expressions without assuming they share the same grammatical behavior.
3. **Validate grammar before composing.** Apply the priority checks above to each required modal, aspectual, negative, nominalizing, and modifying operation. Find an applicable rule or close attested examples for the whole construction, including relevant combination restrictions. Verify phrase order, case or relation markers, modifier vs predicate forms, and clause linkage. General SOV order is a starting point; use the selected dialect's actual patterns for questions, topics, comparison, and other constructions.
4. **Apply supported rules.** Ordinary lexical substitution is possible when the construction is productive and the new word fits its semantic role. Check animacy, countability, classifiers, possession, compound boundaries, register, and tonal or morphological effects. When adapting an example, check additions, deletions, and movement separately; a gloss alone does not establish that a marker is optional in that construction. A superficially similar example does not establish a new predicate construction or suffix function.
5. **Build the predicate.** Resolve action stage, direction, result, ability, intention, possibility, and negation before choosing forms. Distinguish the meanings behind source-language expressions such as Chinese “会” and “了”. Check the whole predicate, contractions, irregular forms, and the scope of each marker; use Southern evidence for Southern morphology.
6. **Realize the sentence.** Arrange arguments and modifiers, select attested full forms, and maintain consistent reference and discourse flow. Preserve meaningful repetition, address terms, and voice. For constrained genres, check rhythm and line structure after semantic and grammatical checks.
7. **Audit grammar and meaning.** First revisit the applicability and interaction of modality, aspect, negation, nominalization, and predicate/modifier forms in the assembled clause. Then recheck roles, polarity, time, comparison direction, quantity, reference, and omitted or added content against the source. Check lexical sense, dialect, tones, and spelling. Back-translation can expose drift; it does not establish grammaticality or naturalness.

## Paraphrase and borrowing

Use meaning-preserving paraphrase actively. Translate the intended sense rather than requiring a dictionary headword for every source expression. Search the semantic field across Chinese and English glosses and inspect actual arguments and collocations: a brief headword gloss may cover the intended sense under different wording. Incorporate lexical information supplied by the user with its stated provenance, and investigate its construction rather than repeating an exact-gloss search. Simplify ornate wording, split reciprocal statements into two clauses, and express an abstract relation through a supported construction. Preserve participants, polarity, scope, conditions, and the passage's central contrast. Figurative large numbers can become “many” when abundance is the point; “all” is suitable when the intended set is exhaustive. Keep exact quantities when they matter. Briefly identify a material shift in meaning or emphasis.

Before borrowing a whole compound or idiom, try expressing its meaning with simpler predicates, modality, negation, or two linked clauses. For abstract, literary, or technical concepts, also search common everyday synonyms, broader or narrower senses appropriate to the context, and familiar paired or opposing terms. A conceptual pair may be expressible with an ordinary word pair even when its abstract Chinese label has no exact dictionary match. Check each component's lexical form and the pair's use in the intended syntactic position; neither automatically add nominalization nor assume bare property predicates can always function as nouns. Check the scope of negation and modality in the resulting construction; independently attested component words do not make every combination interchangeable. Prefer a supported compositional native expression when it retains the intended relation and emphasis.

When a native expression is unavailable or unsuitable, consult same-dialect examples of Chinese loans and code-switching. Inspect what was borrowed—a noun, a predicate, a modifier, or a connector—and how it participates in Tujia syntax. Borrowed nouns still take the relevant noun-phrase order and classifiers; objects precede verbs where the selected construction requires SOV. Borrowed predicates must receive the selected dialect's appropriate argument order, negation, aspect, and modality. For a compositional Chinese verb–object expression, separate the object from the predicate before borrowing and rebuild the expression in Tujia order. When the construction is SOV, use subject + object + predicate, even if both lexical units remain in Chinese characters. Prefer a suitable attested Tujia verb when available; otherwise propose the missing noun and verb as separate insertions. Apply negation, modality, aspect, and any stem changes to the resulting predicate in their licensed positions, not to an opaque Chinese verb–object block. Preserve genuinely lexicalized compounds and names as lexical units only where their status and usage justify it.

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
