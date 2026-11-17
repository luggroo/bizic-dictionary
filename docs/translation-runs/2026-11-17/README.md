# Five independent translation drafts

The source-language passages come from the five examples on https://tujia.biz/translation.html?lang=zh. Four texts are translated into Northern/Longshan Tujia. The fifth source is already Longshan Tujia and is translated into Chinese, English, Japanese and Tibetan.

The original five translators were started with `fork_turns=none` and received only their assigned source, the frozen local Skill and administrative instructions to save answers, evidence and timing. The original snapshot, standard prompts, first answers, the song's one standard repair round, and complete static-query responses are retained in `records.zip` under `first-blind-run/`. The reviewer was not blind to the website during source extraction. This is translator blindness, not a double-blind quality study.

## Published-skill Tibetan rerun

The Skill was published as [f341ec4cef24c68ea9527d6ddbe4dd6b4e068262](https://github.com/luggroo/bizic-translator/commit/f341ec4cef24c68ea9527d6ddbe4dd6b4e068262). Its [GitHub grammar/reference checks](https://github.com/luggroo/bizic-translator/actions/runs/44122558462) succeeded before a fresh translator was started. The new translator received no old translations or editorial suggestions. Its administrative instructions specified the pinned checkout and saving answers, evidence and timing.

`bo-crane/translation.md` and `translation.json` are the unmodified first answer. During publication review, `zuān` (rn458429) was found to have POS `cl.` and gloss `(for visits)`: the first answer had incorrectly used this classifier as a verb. A narrow review requested checking the record and correcting the affected sentence, without new unrelated queries. `translation-reviewed.md/json` contain the corrected answer; `review-log.md` records the audit. Public display and PDF use the reviewed answer, retaining Chinese 绕 as the unresolved lexical insertion. The first-answer hashes remain in `first-round.sha256.json`.

The rerun took approximately 211 seconds and executed 43 exact queries. It does not by itself establish a speed or accuracy gain over the old Skill. The song's `rixhuax` remains unresolved. The archived drafts contain other provisional expressions and Chinese insertions; no native-speaker validation is claimed.

## Public artifacts

- Reader pages: https://tujia.biz/translation-runs.html and https://tujia.biz/translation-runs-en.html
- Individual PDFs: `/translation-runs/en-crow.pdf`, `zh-rabbit.pdf`, `ja-jizo.pdf`, `bo-crane.pdf`, `reverse-song.pdf`
- Combined PDF: https://tujia.biz/translation-runs/five-translations.pdf

The PDFs now use the Skill’s interlinear-gloss format: each full source sentence appears once, followed by separate target-clause groups with italicized Pinyin, source-paired IPA and lexical/grammatical gloss. The layout is black-and-white, serif, unboxed, paginated and wraps only between word columns. Chinese insertions have blank IPA cells; source pronunciation conflicts and unresolved meanings are marked locally. Lexical gloss uses English, Chinese, Japanese or Tibetan according to the case; the reverse song has Chinese gloss plus its preserved four-language translations. All grammatical labels use the fixed Skill inventory. The existing teaching examples remain separately accessible from the translation guide. The five independent drafts also have their own aligned `gloss.json` and `gloss-audit.md`; the raw first answers and evidence are unchanged. `publication-manifest.json` identifies the displayed versions and PDF hashes; `pdf-validation.json` records extraction checks. PDF layout uses the saved gloss data and does not trigger retranslation. Missing fields were checked against the selected witnesses and constructions. Display spelling, IPA and gloss share the same word and morpheme boundaries; modal components remain whole and negation is separately marked. The archive retains earlier draft PDFs as historical records and includes the current gloss PDFs under `aligned-gloss/pdf/`.

`build-publication.py` documents the export. Its inputs are the original blind-run directory and the published-skill rerun directory, both included in the full archive. Execution records belong here in `docs/`; the reader pages contain the actual drafts, necessary meaning notes and links to these records.
