# 独立盲测：反向歌谣首轮

- 开始时间：2026-11-17 15:13:56 UTC（首次执行工具后读取时钟；读取 skill 的实际开始略早）。
- 首轮结束确认时间：2026-11-17 15:19:27 UTC（时钟读取时 round1.md 与 translation.json 均已保存；文件写入的精确时点未单独读取时钟）。
- 中断／恢复：收到“恢复原任务”管理消息前，本 agent 未观察到暂停命令或停工，因此没有可扣除的实际等待区间。恢复消息的精确时间未记录。其后收到首轮存档提醒。没有读取方向确认中的任何语义提示。
- 首轮答复：round1.md；文件保存后不再覆盖。
- 未生成 PDF，未改 skill，未访问网站或参考译文，未读取其他 agent／评测产物。

## 实际检索

冻结路径：docs/evaluation/blind-five-2026-11-17/frozen/skills/translate-tujia/lexicon。
使用仓库 scripts/reverse-lookup.py、scripts/export-readable-lexicon.py 与 src/tujia_lex/static.py。

1. lookup-1.json：reverse lookup，notation ye，affix-tone，默认 limit=30、max-cost=2。实际 query：meftaxcer、lafdongx、ongr、xir、civ、hufnix、daxjiev、mor、serkex、paf、longrbair、nier、yerdiex、rixhuax、xief、soxtir、xiexqix、sixjif、heircef。状态 hit；个别候选不适合句意。
2. lookup-2.json：尝试 limit=200，对 lafdongx、daxjiev、yerdiex、rixhuax、sixjif 追加检索；CLI 拒绝 Invalid query, result limit or edit budget，未产生结果。该文件为空；不将其视作词条不存在。
3. lookup-3.json：reverse lookup，notation ye，affix-tone，query：six、huax、laf、dax、jiev、diex。结果保存完整。
4. lookup-4.json：export-readable-lexicon lookup 命令传入重复 --query 劳动、团结、庄稼、茂盛、用；该 CLI 仅保留最后一个，实际仅查“用”。结果完整保存。
5. lookup-5.json：复用一个 StaticLexicon 实例，精确查 劳动、团结、大家、庄稼、茂盛、计划、长、丰收、一起、一、下、花、变化、生长、好。
6. lookup-6.json：精确查 lafdongx、daxjiev、yerdiex、rixhuax、ríhuā、rīhuā、dājiè、春雷、声、干劲、干活、干头、希望、做、有、ruá、huá、huā、hxua、hxri。
7. lookup-7.json：精确查 办法、方法、事情、活、做法、dājiē、dàjiè、rī huā、日化、声响。

附加只读查看：冻结 skill 的反向翻译、执行状态、输出规范、检索说明、语法索引、事件链接、句型、体貌情态、nie/niexi；读取 write-for-readers 云端 skill（未含本测试原文或答案）。对冻结 lexicon 以 rg 进行含“劳动、团结、庄稼、茂盛、lā、dājiè”的文件路径粗检；没有用此扫描取得额外词义。

## 首轮的实质缺口

- daxjiev 整体没有可靠释义；“一齐”为语境试译。
- rixhuax 整体没有可靠释义；“已有安排”为语境试译，不是查证结果。四语均以同一暂拟语义组织。
- soxtir 采用身体整词候选；sixjif 采用用＋完成，heircef 采用否定完成能力，末句不漏译否定。
- 第一行 lafdongx 采用一＋声响／次，xir 采用程度后缀，未采用草。
