# Gloss audit — en-crow

依据本目录 translation.json、display.md 与当前 translate-tujia/references/output.md 制作 gloss.json；未重新翻译，未引入其他译文，未修改原记录、PDF或技能。

五条完整原文各出现一次，对应独立目标主句组数为3、2、3、1、2。原文第一句中的“乌鸦口渴”、找到水罐、水罐内有水分组；第二句状态与不能接触分组；第三句尝试、重量状态与体力不能分组；第五句水上涨与最后可饮水分组。

词元音形、实际见证ID与定位均复用translation.json。动词完整体用“-liē”，否定能愿链分别为“būbǔ-tā-tī”“duán-hī-cē”，肯定能愿为“hǔ-dēxǐ”；dēxǐ内部连写。词内连字符在拼音、IPA与gloss中同界。程度成分内部连写，依要求作为整体释为very/too。短语中的领属、工具、方式、目标和连接成分统一用GEN、INS、ADVZ、ALL、CONN。代词it与量词individual、piece按词义释义。

局部缺口：原译汉语插入“试着”没有土家语读音见证，IPA为null；保留原译位置，并在notes说明该位置不代表已有整句见证。其余词元IPA无新增缺口，沿用来源基记；没有推测语流变调。既有数词lá的/la³⁵/和其他同形词的/la²⁴/来源差异保留，不作音值统一。没有新增词典检索。

验证：

- 逐句删除空格、标点和形态连字符后的字符串与既有译文完全相同。
- 全部有IPA词列的拼音、IPA与gloss连字符数一致。
- `python scripts/check_gloss_labels.py /workspace/bizic-dictionary/docs/translation-runs/2026-11-17/en-crow/gloss.json`通过，errors为空；使用标签为ADVZ、ALL、CONN、GEN、INS、NEG、PFV，全部属于固定39项表且已声明。
