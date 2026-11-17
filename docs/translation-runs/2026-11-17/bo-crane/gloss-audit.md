# Gloss 规范审校

本次仅规范既有审校译文的词界、记音和逐词释义，不重译全文。输入为本目录 `translation-reviewed.json` 与 `display.md`；规范依据为 `/workspace/bizic-translator/skills/translate-tujia/references/output.md`。仅新增或更新 `gloss.json`、本日志；未修改译文、其他文件或 PDF。

- 四行藏语原文分别保存于 `clauses[].source`，完整保留字面和标点。每行下只提供 `target_units[].tokens`，用于拼音、IPA、gloss 三行对齐；`translation` 仅是规范词界后的数据字段，排版时不额外重复整句译文。
- 实词释义由既有汉语词义对应为藏语：白→དཀར་པོ་，鹤→ཁྲུང་ཁྲུང་，我→ང་，翅膀→གཤོག་པ་，借→གཡར་，远→ཐག་རིང་，地方→ས་ཆ་，走→འགྲོ་，理塘→ལི་ཐང་，绕行→བསྐོར་，回来→ཕྱིར་ལོག་。这一步只改变逐词释义的语言，保留既有目标词项及所选义项。
- 虚词及语法成分保留 `LNK`、`DAT`、`DIR.IMM`、`ALL`、`NEG`、`PFV`，并在 `abbreviations` 中逐项列出固定定义。代词“我”用藏语词义，未写作人称缩写。
- 第四行仅将既有 `绕 liē` 规范为 `绕-liē`。合并词元的三层形式为 `绕-liē` → `-lie⁵⁵` → `བསྐོར་-PFV`。汉语词根读音留空，后缀读音复用既有语法记录；`source.components` 明确保留“绕”的 `ipa=null` 和 `liē` 的 `ipa=lie⁵⁵`，并保留后缀来源。
- “鹤”“理塘”的整词 `ipa=null`。没有添加汉语词根的音值或土家语读音。“绕-liē”的IPA连字符前为空，连字符后为已有后缀记音；排版器须原样保留这一空位。
- `gú` 沿用已选 `directives.md#gu` 所列独立祈使成分及原词界，写为 `lú gú`；没有仅因整句具有祈使意义便另造变位或改变词界。`nie`、格标记和否定词同样沿用已有独立词元。
- 末句保留审校版“理塘 绕-liē, sōngkō.”，没有恢复首轮量词 `zuān`。本次没有新增检索或替换词项。

已运行：

```text
python /workspace/bizic-translator/scripts/check_gloss_labels.py /workspace/bizic-dictionary/docs/translation-runs/2026-11-17/bo-crane/gloss.json
```

检查结果：`passed=true`；固定标签39项；本例使用 `ALL, DAT, DIR.IMM, LNK, NEG, PFV`；`errors=[]`。另已检查四行原文与审校版逐行一致，目标译文未出现 `zuān`。该脚本核对标签清单，不替代语言审校；词义和词元来源均复用既有审校记录。
