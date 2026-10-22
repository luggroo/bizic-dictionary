# Reader-facing copy audit — 2026-10-21

Audited base: `210ac4720c5e248c30fe87d476252c96a0bb6371`.

Rebased onto `90cb3fc94d40031d53a23e019d0bda103ec71eca`, preserving the
new GitHub feedback footer, AI-assistance disclosure, and removal of the local
word-transcription editor. These independent changes are not part of the audit.

The audit covered the published `site/` application: dictionary annotations,
gloss-review data and its publishing script, northern and southern grammar,
the standalone verb guide and its integrated copy, notation profiles and
tables, corpus interface, historical comparison, source catalogue, Chinese
and English UI strings, and compressed downloadable metadata.

## Findings and changes

| Problem | Example | Change |
| --- | --- | --- |
| Commissioning conversation presented as evidence | “经用户确认”, “使用者核定” | Explain the meaning or spelling directly; retain source references and uncertainty. |
| Chat provenance embedded in grammar | “用户在分享的 Gemini 对话中…” | Identify unpublished supplementary material, distinguish it from published examples, and explain the transcription basis. |
| Commissioning language inside editorial notes | “经用户确认” | Retain “编者注 / Editor's note”; rewrite the body for readers. |
| Instructions to the implementer in linguistic prose | “不能用去调索引覆盖原词形” | Explain that the two forms differ in tone and meaning. |
| Implementation mechanics in notation help | Database pairing precedence | Explain what the table compares and where readers can check the evidence. |
| Review instructions addressed the project owner | “优先请你审核”, “导出交回整合” | “待考问题”; optional personal notes with an accurate browser-local storage description. |
| Work queues in the public source catalogue | Parsing rank and priority queue | Remove maintenance controls and priority badges; describe full-text availability. |
| Repeated task-progress wording in data | “汉语释义为本次编辑补译” | State that English glosses come from STEDT and Chinese glosses are site translations. This one template occurred in 14,385 notice fields. |
| Stale implementation status | No tone-mark convention selected | Describe the existing tone-mark convention and refer to the separate survey-point tables. |
| Defensive or repetitive prose | “不冒充”, “不宣称”, “不硬套”, instructions against arbitrary replacements | Replace with specific statements about sources, scope, contrasts or unresolved analysis. |

The death euphemism note now explains the two literal readings, describes
`lu²²` as a possible completion-and-departure marker, and retains the missing
tone on source `liau`. It does not present the tentative analysis as certain.

## Preservation

Original literature, recorded speech, word forms, tone values, source links
and lexical senses were not rewritten for style. Genuine caveats remain:
unmarked source tones, uncertain meanings, dialect limits, OCR errors, source
inconsistencies, constructed teaching examples and unpublished material.

A recursive comparison of the two compressed datasets against the base found:

- Dictionary: only the 14,385 repeated `notice` fields changed.
- Catalogue: 110 availability labels, five OCR notices, five recognition
  quality descriptions and one source description changed.
- All other fields and array lengths in those datasets were identical.

The glossary review overlay has separate copy edits to explanations and
English notes; its entry identities, Chinese senses and original English
glosses remain intact. Conversion maps and spelling logic were not changed.

## Verification

- All site JavaScript parsed successfully.
- IPA normalization, word-merge, southern notation and notation-pair tests passed.
- Expanded assets were processed by the same glossary-review and IPA steps used
  for publication; the new reader-copy check passed on source and expanded data.
- In the supported browser preview, all seven main pages were opened in Chinese
  and English. The death-euphemism detail showed the revised note.
- The repository's standalone Playwright UI-language script could not launch
  because its Chromium executable was absent; the browser preview checks above
  were used for the affected reading surfaces. This audit was not a new mobile
  layout or device-compatibility certification.

`AGENTS.md` records the audience and provenance rules. The publication workflow
now runs `scripts/test-reader-copy.cjs` after generated annotations are applied.
That check catches known conversation leaks, including compressed and generated
metadata. It cannot judge prose quality and does not replace editorial review.
