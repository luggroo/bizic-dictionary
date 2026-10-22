# Website copy

Write all public website content for people reading and learning about Tujia.

- Explain the language, the evidence, and how to use the site. Keep prompts,
  implementation decisions, task progress, and commissioning conversations in
  code comments or `docs/`, outside the published `site/` directory.
- Do not cite “the user confirmed”, a chat, or model output as linguistic
  authority. Describe unpublished supplementary material honestly as such;
  do not imply that it is published research, a field recording, or a native
  speaker judgement unless that provenance is established.
- Preserve genuine uncertainty, source qualifications, dialect scope, original
  transcriptions, tone values, and source quotations. Copy editing must not
  silently turn tentative analyses into established facts.
- State the useful finding directly. Avoid repetitive defensive instructions,
  descriptions of what the implementation refuses to do, and generic AI-style
  framing such as “不是……而是……” when a direct statement is clearer.
- Maintenance queues, parsing priorities, internal review history, and database
  implementation details do not belong in the reading interface. Reader tools
  may explain concrete effects, such as where a personal note is saved.
- Update Chinese text, its English interface translation, duplicated grammar
  content, downloadable data, and publishing scripts together where relevant.
- Before publishing copy changes, run `node scripts/test-reader-copy.cjs` and
  inspect the affected rendered pages. The script catches known conversation
  leaks; it does not replace editorial reading.
