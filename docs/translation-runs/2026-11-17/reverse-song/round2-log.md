# 补查轮记录

- 开始：2026-11-17 15:20:00 UTC。
- 答复与结构化记录保存后的结束确认：2026-11-17 15:22:06 UTC。
- 无暂停／恢复等待。
- 复用第一轮冻结词典与全部既有查询；未读网站例子、网站译文或其他 agent 结果；未覆盖首轮。

新增操作与结果：

1. 只读 pronunciation.py 的索引、分词、候选裁剪逻辑，确认首轮每段仅返回30个候选，且命中不表示句义成立。
2. 只读冻结 recovery-playbook.md，复用反向恢复词界与同源见证原则。
3. round2-inspection.json：一次 load_static 复用全部静态记录，检查去调去空格 term 满足 ri.*hua、da.*jie、ri.*fa 的词，以及已有 w964、w533、w528 的完整原始记录。命中大姐 dǎjiē、右手 dàréjjiē、一起来源等；未找到能支持 rixhuax 的整词。完整 jíhuā“计划”见证源记 ji2hua1／jifhuax，与原文 rixhuax 不符，不采用为译义。
4. round2-lookup-1.json：reverse-lookup，ye，affix-tone，max-cost=3，查询 daxjiev、rixhuax、dajiev、rihuax、yerdiex、ongrxir、xirciv。后两条复合查询用于确认程度成分范围，前两条放大原查询编辑预算，未产生可靠新整词。
5. round2-lookup-2.json：单个 StaticLexicon 会话精确查 赶紧、急、争、赶、齐、齐心、打结、忙、工作、打算、指望、收成、ri1hua1、da1jie4。赶命中 jiè；工作命中 rī 等。其余无助于填补原文未解项。

语法例句核对：复用第一轮已读 event-linking.md 中 A＋mǒ＋B 的方式结构（包括 B06:37 ex.12）、clause-patterns.md 中属格及存在句（包括 B06:84 ex.62）、aspect-modality.md 中完成成分与情态槽位（B06:139–140）。这些支持“方式＋耙田”“今年的＋食物”“存在”“用＋完＋不能实现”的结构；不提供 rixhuax 的词义。

对照结果：

- 19个原文连写片段全部纳入结构化记录；第一轮漏出的 jiev“赶”在第二轮试译中补出。
- 末句原先保存的 w2067 并不在该片段默认候选前30中，第二轮改为已有精确高调“用”见证 stedt-rn-289086，并保留 sī＋jí 的分词；首轮证据文件本已包含这个词义。
- 第一轮第三句“已有安排”属于无直接依据的上下文猜译；第二轮撤回。第三句仍有一个核心词义缺口，因此没有虚称已完整译成。
