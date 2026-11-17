# ja-jizo gloss 修复审计

仅生成 gloss.json；未修改首轮译文、PDF或技能。

{
  "source_clauses": 27,
  "target_units": 42,
  "words": 229,
  "ipa_local_gaps": 11,
  "new_lexical_queries": 0,
  "labels": [
    "ABL",
    "ADVZ",
    "ALL",
    "BEN",
    "CAUS",
    "CONN",
    "DAT",
    "FOC",
    "GEN",
    "INCH",
    "INS",
    "IRR",
    "LNK",
    "NEG",
    "PFV",
    "PROG",
    "STAT",
    "VEN"
  ]
}

## 范围与来源

读取本例 translation.json、display.md；复用其 query_ledger 中的实际见证。补读当前 output.md、notation-audit.md 的词界规定，以及 clause-patterns.md、event-linking.md、aspect-modality.md、direction-suffixes.md 中实际缺失成分的配对例句。未重新检索全文或新做词汇查询。

## 分组与词界

27条原文（含标题），原文各出现一次。将独立主句拆成目标单元；简短时间从句、定语与方式结构保留在主句内。动词体貌、情态、否定、属性/关系从句的附着连接和方式化成分用连字符连接；能愿 tī 整体释义为「できる」，其前 tā 单独标 NEG。

## 同音项与局部缺口

漢語挿入の発音欄は空欄（null）。無声調の nie は同一形の対応する IPA が初回資料に無いため、語内で「読音未確認」とした。

IPA は各語の既存見証または引用された文法例の基底表記。文中の連続変調は再構成していない。

niě/nie は実際の構造に従い GEN（所有・所属）と LNK（性質・関係節・場所による修飾）を区別した。名詞を明示する既存訳に独立名詞化は追加していない。

初回の自動詞元記録にあった同音異義の取り違えを、既存訳の意味役割と取得済み見証で訂正した。tái は一箇所のみ「貧しい」、他は「無い」。dá は数量句で「個」、否定位置で NEG。niē は CONN、zí は雪が「降る」、hǔ は INCH、dǒ は CAUS、pē は「包む」、lā は PROG、cá は「したい」、zái は「再び」。

「第六尊地藏菩萨像」「六尊」は初回からの漢語挿入として保持した。第17・18行の引用は元の日本語の実際の句点に従う二文として別に示した。

第15文では外側の発話枠を保ったまま二つの引用断言を別組にした。第25文の反復するお辞儀は各独立述語を別組にした。

IPA 待核位置：

[
  {
    "sentence": 0,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 3,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 6,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 8,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 19,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 20,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 20,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 20,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 20,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 20,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  },
  {
    "sentence": 26,
    "surface": "nie",
    "issue": "paired IPA unavailable; retained local pending marker"
  }
]

## 检查

词序/词形覆盖断言通过：去掉标点、空格和词素连字符后，全部目标单元与既有译文逐字符相同。check_gloss_labels.py 检查通过：passed=true，18种已用标签全部属于固定39标签，无错误。
