# zh-rabbit gloss 核验

仅更新本例 `gloss.json` 与本记录；未改 translation.json、display.md、技能或 PDF。逐词数据以本例 translation.json 与 display.md 为底稿，未采用其他译文。

原文保留三句，每句仅保存一次；目标断言分为 5／3／2 组，共十组。“折颈而死”的既有目标文本有两条独立断言，分别换组；短关系从句与跑的方式结构留在所属主句。

词汇与语义保持首轮版本。检查将新词元的连字符展开后，与 translation.json 的原始词元序列逐项比较，完全一致。仅规范词界与 gloss：动词-PFV、动词-STAT、动词-意愿、动词-NEG-能、关系谓词-LNK；领属 nie 保持独立并标 GEN。能愿 cá、tī 各自整体释“想、能”；否定 tā 标 NEG。代词、量词、存在谓语按词义；连接词统一 CONN，方式成分统一 ADVZ。zái为实义重复副词“再”，处所词 wótū／sétā 分别释“里面／旁边”。

已有IPA逐项复用。仅补缺失语法字段：

- nie /ɲie/、niě /ɲie²¹/：clause-patterns.md，B06:56 §4.3.6、95例24；无调nie不补固定声调。
- mǒ /mɔ²¹/：event-linking.md，B06:37例12。
- liē /liɛ⁵⁵/：aspect-modality.md，B06:139–140表7.1。
- bǒ /pɔ²¹/：event-linking.md，B06:90例110。
- āimǒ /ai⁵⁵mɔ²¹/：event-linking.md，B06 §7.6 rn455293／B04 w174。
- cá /tsʰa²⁴/、tā /tʰa⁵⁵/、tī /tʰi⁵⁵/：aspect-modality.md，B06:127–130。

唯一音形疑点：hǔ“个”的原IPA为fu²¹。只复查 /workspace/bizic-dictionary/site/dictionary.json.gz 中 w875 的同见证 stedt-rn-456359；原文hu3、同见证派生IPA fu²¹均仍如此。未猜改为其他音，展示IPA局部标“读音待核”；原值及来源保留在本记录与词元source中。

宋国、耒的IPA为null；嘲笑-liē的汉语根为空，IPA为-liɛ⁵⁵，并用ipa_segments: [null, "liɛ⁵⁵"]保留空根及已知后缀对应。未为汉语插入臆造读音。

验证：

- check_gloss_labels.py 通过，39项固定标签表，使用ADVZ、CONN、GEN、LNK、NEG、PFV、STAT，无表外标签。
- 三条完整原文、十个目标组；translation与tokens拼音逐项相同。
- 词素连字符在拼音、IPA、gloss三层一致；读音待核局部除外。
- 连字符展开后的词元序列与首轮完全一致。
