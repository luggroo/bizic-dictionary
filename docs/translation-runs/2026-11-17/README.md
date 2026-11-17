# Six independent translation drafts

The first five source-language passages come from the examples on https://tujia.biz/translation.html?lang=zh. Four texts are translated into Northern/Longshan Tujia; the Longshan Tujia song is translated into Chinese, English, Japanese and Tibetan. A sixth example, the Korean song <반달> with its supplied 윤극영 credit, uses the text provided for this translation task.

The original five translators were started with `fork_turns=none` and received only their assigned source, the frozen local Skill and administrative instructions to save answers, evidence and timing. The original snapshot, standard prompts, first answers, the song's one standard repair round, and complete static-query responses are retained in `records.zip` under `first-blind-run/`. The reviewer was not blind to the website during source extraction. This is translator blindness, not a double-blind quality study.

## Published-skill Tibetan rerun

The Skill was published as [f341ec4cef24c68ea9527d6ddbe4dd6b4e068262](https://github.com/luggroo/bizic-translator/commit/f341ec4cef24c68ea9527d6ddbe4dd6b4e068262). Its [GitHub grammar/reference checks](https://github.com/luggroo/bizic-translator/actions/runs/44122558462) succeeded before a fresh translator was started. The new translator received no old translations or editorial suggestions. Its administrative instructions specified the pinned checkout and saving answers, evidence and timing.

`bo-crane/translation.md` and `translation.json` are the unmodified first answer. During publication review, `zuān` (rn458429) was found to have POS `cl.` and gloss `(for visits)`: the first answer had incorrectly used this classifier as a verb. A narrow review requested checking the record and correcting the affected sentence, without new unrelated queries. `translation-reviewed.md/json` contain the corrected answer; `review-log.md` records the audit. Public display and PDF use the reviewed answer, retaining Chinese 绕 as the unresolved lexical insertion. The first-answer hashes remain in `first-round.sha256.json`.

The rerun took approximately 211 seconds and executed 43 exact queries. It does not by itself establish a speed or accuracy gain over the old Skill. The song's `rixhuax` remains unresolved. The archived drafts contain other provisional expressions and Chinese insertions; no native-speaker validation is claimed.

## Korean example

The Korean run used a fresh translator with `fork_turns=none`, pinned to published Skill [8acd0fbcc4ace28d6a9e16871c98365427b2c0aa](https://github.com/luggroo/bizic-translator/commit/8acd0fbcc4ace28d6a9e16871c98365427b2c0aa). It received only the supplied Korean source, the pinned Skill and separate record/gloss-format requirements. No website translation, other translator output or evaluation result was supplied. See `ko-bandal/standard-prompt.txt`, `dispatch.json` and `management.json`.

The first answer took approximately 210 seconds. Title, author credit and all four verse lines were retained. Review checked the two exact quantities, the mast-installation negation, absence of a steering pole, manner and westward goal; no broad omission-repair round was triggered. A narrow pronunciation review reused the four saved `resolved` loan-mapping responses to fill the corresponding gloss IPA fields. The recording instruction's general null-IPA wording for insertions had overlapped with the newer specific loan-mapping rule. `gloss.initial.json` preserves the first gloss; `review-log.md` identifies the correction. `translation.md/json` remain unchanged and their hashes are recorded.

The four new loan forms for 银河、桂树、歌词、作曲 use `proposed-loan-mapping`, including per-character sources and transformations. Their IPA is a rule-generated proposed reading, not an attested Tujia lexical pronunciation. The author's original Korean name is retained with blank IPA. The title uses a productive moon + half phrase; its idiomatic status is unverified. These qualifications are retained in the reader notes.

## Public artifacts

- Reader pages: https://tujia.biz/translation-runs.html and https://tujia.biz/translation-runs-en.html
- Individual PDFs: `/translation-runs/en-crow.pdf`, `zh-rabbit.pdf`, `ja-jizo.pdf`, `bo-crane.pdf`, `reverse-song.pdf`, `ko-bandal.pdf`
- Combined PDF: https://tujia.biz/translation-runs/all-translations.pdf

The PDFs now use the Skill’s interlinear-gloss format: each full source sentence appears once, followed by separate target-clause groups with italicized Pinyin, source-paired IPA and lexical/grammatical gloss. The layout is black-and-white, serif, unboxed, paginated and wraps only between word columns. Chinese insertions have blank IPA cells; source pronunciation conflicts and unresolved meanings are marked locally. Lexical gloss uses English, Chinese, Japanese or Tibetan according to the case; the reverse song has Chinese gloss plus its preserved four-language translations. All grammatical labels use the fixed Skill inventory. The existing teaching examples remain separately accessible from the translation guide. The six independent drafts also have their own aligned `gloss.json` and `gloss-audit.md`; the raw first answers and evidence are unchanged. `publication-manifest.json` identifies the displayed versions and PDF hashes; `pdf-validation.json` records extraction checks. PDF layout uses the saved gloss data and does not trigger retranslation. Missing fields were checked against the selected witnesses and constructions. Display spelling, IPA and gloss share the same word and morpheme boundaries; modal components remain whole and negation is separately marked. The archive retains earlier draft PDFs as historical records and includes the current gloss PDFs under `aligned-gloss/pdf/`.

`build-publication.py` documents the export. Its inputs are the original blind-run directory and the published-skill rerun directory, both included in the full archive. Execution records belong here in `docs/`; the reader pages contain the actual drafts, necessary meaning notes and links to these records.

The earlier five-example PDF remains at `/translation-runs/five-translations.pdf` as the previous five-example edition. The current combined PDF contains all six examples. Korean records are also included under `korean-bandal-run/` in the archive.

## UI gloss languages

The five translations into Tujia display Chinese lexical gloss in the Chinese UI and English lexical gloss in the English UI. Grammatical labels, Pinyin and IPA are unchanged. `gloss-ui-locales.json` supplies display meanings without editing archived `gloss.json` data. The reverse song retains its original gloss and four translations. All existing PDFs retain their original gloss language and bytes. Use `build-publication.py --html-only` for UI-only updates; a full export renders PDFs directly from the archived gloss data.

UI regression checks: `python docs/translation-runs/2026-11-17/test-gloss-ui.py` compares protected content with `GLOSS_UI_BASE` (default `HEAD`). `NODE_PATH=<temporary Playwright node_modules> node docs/translation-runs/2026-11-17/test-gloss-ui-browser.cjs` exercises live language switches in system Chromium, including reader navigation and PDF links.
