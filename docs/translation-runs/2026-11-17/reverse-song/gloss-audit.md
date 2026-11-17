# Reverse-song gloss audit

已仅更新本例 gloss.json 与本审校记录，未修改四语自由译文、PDF或技能。

- 四行原文分别保留原记音，一行对应一个 target_units 对齐组。
- 四语译文与 round2.md 逐字比较通过；原文与 translation-round2.json 比较通过。
- 调号拼音、IPA、汉语gloss的词内连字符数量逐列检查通过。
- 拆开 lafdongx、daxjiev；按既有分析以连字符连接 yě-diē 与 sī-jí-hī-cē；已选 -xǐ 作为词缀接于 ǒng。
- 语法标签只使用 ADVZ、GEN、PL、COMPL、NEG；代词“大家”、量词“下”、存在谓语“有”和能愿“做得动”均按词义标注。
- 完整词条使用原选同见证拼音/IPA；组合形式按词素分别记录来源，明确为来源基记拼接，不冒充整词语流见证。特别补齐 lá 之外的 dōng、yě 之外的 -diē、sī 之外的 -jí 与否定能愿后缀。
- rixhuax 词义与完整IPA仍未定，IPA为null；未把 rī 或 huā 的单词IPA写成整个未知词的IPA。其他原有试译和记音差异详见 gloss.json notes。
- 本轮复用已有记录和 lookup-1.json、lookup-3.json，仅查看对应见证，未重跑全文或新增词汇查询。

执行 `python /workspace/bizic-translator/scripts/check_gloss_labels.py /workspace/bizic-dictionary/docs/translation-runs/2026-11-17/reverse-song/gloss.json`：passed=true，errors=[]，固定标签39项，实际使用5项。
