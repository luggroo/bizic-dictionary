出版前证据审校轮

本轮仅复用首轮 queries.json 中既有“转”查询及对应完整记录，未进行新查询，未读取网站例子或其他译文。

核对结果：
- stedt-rn-458429，Brassett 2004，zuān /tsuɛn⁵⁵/，pos=cl.，zh=转，en=(for visits)。这里是计访次的量词，英文括注解释量词适用范围；不能凭该括注推导“转游”动词。首轮漏读词性，所用谓词与见证不一致。
- 对应同词条 w2750 同样为 cl.；没有提供动词用法。
- 既有 stedt-rn-458430 与 w2751 为 zuán /tsuɛn²⁴/，pos=vi.，义为 turn/to turn。词条提供不及物“转”的支持，没有建立“围绕理塘转游”的路径义及对应论元框架。故不简单改作 zuán。

修正：
首轮：理塘 bō zuān liē, sōngkō.
审校：理塘 绕 liē, sōngkō.

采用已读技能 paraphrase-and-borrowing.md 的最小汉语插入处理，保留“绕”这一待解决谓词，并用 clause-patterns.md 的宾语在动词前框架安排“理塘 绕”。理塘是绕行对象，故移除将其标为移动目标的 bō。后续 liē、sōngkō 及其来源保持原有先后构式，表示绕行后返回。此为按发布规则组合的拟译，未声称整句搭配有独立语料见证；“绕”的IPA为null，不造土家语读音。

前三句及其词元来源未改。完整答复与结构化译文分别保存为 translation-reviewed.md、translation-reviewed.json；translation.md、translation.json保持原字节不变。

审校计时与完整性：
{
  "round": "出版前证据审校，独立于首轮",
  "start_utc": "2026-11-17T16:15:46+00:00",
  "end_utc": "2026-11-17T16:16:29.028280+00:00",
  "new_queries": 0,
  "reused_evidence": "queries.json中的转查询及其对应完整见证",
  "changed_units": [
    "4"
  ],
  "rejected": [
    {
      "attestation_id": "stedt-rn-458429",
      "form": "zuān",
      "pos": "cl.",
      "en": "(for visits)",
      "reason": "访次量词，不能作转游动词。"
    },
    {
      "attestation_id": "stedt-rn-458430",
      "form": "zuán",
      "pos": "vi.",
      "en": "turn",
      "reason": "虽为动词，但既有词条未证明环绕地名的目标义及论元结构，不能只改声调便视作修正。"
    }
  ],
  "original_translation_json_sha256": "d71232205d89012df639c1d10e5ef79aa43556dcab0c254e58e8db156b8c540e",
  "original_translation_md_sha256": "e813dfe720927905bc36bab371ba042369541ff4dc8949832180545eaa4e7286"
}
