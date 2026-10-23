// Editorial analysis is separate from source glosses, annotations and IPA.
const EDITORIAL_NOTES=[{
 id:'death-euphemism-sleep',wordIds:['yubao-60757-v-0552'],
 kind:'婉称',
 text:'用于婉称老年人去世，字面为“背盐去了”或“睡着了”。',
 literalMeaning:'/la²⁴pu⁵⁵/ 意为“盐”，/uo⁵⁵/ 意为“背”；/lu²²/ 可能表示动作完成并离去。/ȵie²⁴pie⁵⁵liau/ 意为“睡着了”，末尾 liau 在原记录中未标声调。',
 originalMeaning:'死。原注：“婉称，最常用的几种，指老人：他～了”。',
 evidenceIds:['yubao-60757-v-0806','w1621','w1628','yubao-60757-v-0552']
},...Object.entries(typeof YUBAO_LUXI_CORRECTIONS==='undefined'?{}:YUBAO_LUXI_CORRECTIONS).map(([serial,c])=>({
 id:'luxi-transcription-'+serial,wordIds:['yubao-60824-v-'+serial],kind:'记音校订',text:c.note
}))];
EDITORIAL_NOTES.push(
 {id:'wanmipo-xiunao-fusion',wordIds:['yubao-60823-v-2733'],kind:'词干与后缀',text:'可分析为 xi•unao：后缀 -unao 的 u 与词干融合，拼写作 xiu-náo。• 标示形态分析中的边界，- 标示融合后的拼写分界。'},
 {id:'wanmipo-piunao-fusion',wordIds:['yubao-60823-v-2870'],kind:'词干与后缀',text:'可分析为 pi•unao：后缀 -unao 的 u 与词干融合，拼写作 piu-náo。• 标示形态分析中的边界，- 标示融合后的拼写分界。'}
);
// Chinese loanword notes retain recorded meanings, including Yubao survey prompts.
EDITORIAL_NOTES.push(...[
 {
  "id": "chinese-loan-stedt-rn-289609",
  "wordIds": [
   "stedt-rn-289609"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「总理」。",
  "donor": "总理",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsõ⁵⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-288668",
  "wordIds": [
   "stedt-rn-288668"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「总理」。",
  "donor": "总理",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsũ⁵⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w717",
  "wordIds": [
   "w717"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钢笔」。",
  "donor": "钢笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵pi²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "kan⁵⁵pi²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-289813",
  "wordIds": [
   "stedt-rn-289813"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钢笔」。",
  "donor": "钢笔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã³³pi²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-288877",
  "wordIds": [
   "stedt-rn-288877"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钢笔」。",
  "donor": "钢笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵pi³⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
 "id": "chinese-loan-stedt-rn-289802",
 "wordIds": [
  "stedt-rn-289802"
 ],
 "kind": "借词来源",
 "text": "可能借自湘语「火车」。",
 "donor": "火车",
 "donorVariety": "湘语",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "h̄o⁵⁵tsʰe³³",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "ma-car-dragonfly-2026-10-23"
},
 {
  "id": "chinese-loan-stedt-rn-204432",
  "wordIds": [
   "stedt-rn-204432"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火车」。",
  "donor": "火车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo³⁵tsʰie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-288866",
  "wordIds": [
   "stedt-rn-288866"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火车」。",
  "donor": "火车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵tsʰe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-204891",
  "wordIds": [
   "stedt-rn-204891"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「利息」。",
  "donor": "利息",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li²¹ɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-289810",
  "wordIds": [
   "stedt-rn-289810"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「利息」。",
  "donor": "利息",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li¹³ɕi³³",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-289679",
  "wordIds": [
   "stedt-rn-289679"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钉子」。",
  "donor": "钉子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tẽ³³tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-288740",
  "wordIds": [
   "stedt-rn-288740"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钉子」。",
  "donor": "钉子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tẽ⁵⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w1276",
  "wordIds": [
   "w1276"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「耐烦」。",
  "donor": "耐烦",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lai²⁴fɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w4886",
  "wordIds": [
   "w4886"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「轻」。",
  "donor": "轻",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-183573",
  "wordIds": [
   "stedt-rn-183573"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「春」。",
  "donor": "春",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuən⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-196017",
  "wordIds": [
   "stedt-rn-196017"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「民族」。",
  "donor": "民族",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "min²¹tsʰu²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "mĩ²¹tsʰu²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-289629",
  "wordIds": [
   "stedt-rn-289629"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「民族」。",
  "donor": "民族",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mĩ²¹tsʰu̵²̄¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-289509",
  "wordIds": [
   "stedt-rn-289509"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「燕子」。",
  "donor": "燕子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiã⁵⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-383001",
  "wordIds": [
   "stedt-rn-383001"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「时节」。",
  "donor": "时节",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹tɕie²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w3329",
  "wordIds": [
   "w3329"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初三」。",
  "donor": "初三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-220701",
  "wordIds": [
   "stedt-rn-220701"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「失败」。",
  "donor": "失败",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹pai³⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-290103",
  "wordIds": [
   "stedt-rn-290103"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「提高」。",
  "donor": "提高",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "di¹³kaɨ³³",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-288801",
  "wordIds": [
   "stedt-rn-288801"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话，具体原词待考。",
  "donor": "",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuei²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60824-v-2053",
  "wordIds": [
   "yubao-60824-v-2053"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「桂花」。",
  "donor": "桂花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuei³⁵xua³³",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60824-v-1494",
  "wordIds": [
   "yubao-60824-v-1494"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「碎米」。",
  "donor": "碎米",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei¹³mi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60824-v-1504",
  "wordIds": [
   "yubao-60824-v-1504"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「大麦」。",
  "donor": "大麦",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta¹³me²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60824-v-1642",
  "wordIds": [
   "yubao-60824-v-1642"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「团鱼」。",
  "donor": "团鱼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "duã¹³y³³",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60824-v-0657",
  "wordIds": [
   "yubao-60824-v-0657"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「外孙」。",
  "donor": "外孙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wai¹³suẽ³³",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60824-v-2378",
  "wordIds": [
   "yubao-60824-v-2378"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「外孙女」。",
  "donor": "外孙女",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wai²¹suẽ⁵⁵ny²¹",
    "span": [
     1,
     3
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60824-v-2438",
  "wordIds": [
   "yubao-60824-v-2438"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「犁把」。",
  "donor": "犁把",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li¹³po⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60823-v-0214",
  "wordIds": [
   "yubao-60823-v-0214"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黄瓜」。",
  "donor": "黄瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã⁵⁵kua³³",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60823-v-0569",
  "wordIds": [
   "yubao-60823-v-0569"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「和尚」。",
  "donor": "和尚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo³³sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60823-v-2653",
  "wordIds": [
   "yubao-60823-v-2653"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「劳动」。",
  "donor": "劳动",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau³³tũ¹³",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60823-v-2791",
  "wordIds": [
   "yubao-60823-v-2791"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「劳动」。",
  "donor": "劳动",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau³³tũ¹³",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-288498",
  "wordIds": [
   "stedt-rn-288498"
  ],
  "kind": "借词来源",
  "text": "其中 /si²¹tɕe³⁵/ 可能借自西南官话「时节」。",
  "donor": "时节",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹tɕe³⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-289842",
  "wordIds": [
   "stedt-rn-289842"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「工人阶级」。",
  "donor": "工人阶级",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ³³ze³³kai³³tɕi²¹",
    "span": [
     1,
     4
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-288915",
  "wordIds": [
   "stedt-rn-288915"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工人阶级」。",
  "donor": "工人阶级",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kũ⁵⁵zĩ²¹kai⁵⁵tɕi³⁵",
    "span": [
     1,
     4
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-289701",
  "wordIds": [
   "stedt-rn-289701"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「裹脚」。",
  "donor": "裹脚",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ko⁵⁵tɕio²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w2649",
  "wordIds": [
   "w2649"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「爪爪」。",
  "donor": "爪爪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵tsau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w264",
  "wordIds": [
   "w264"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「背箩」。",
  "donor": "背箩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pei⁵⁵luɔ²¹",
    "span": [
     1,
     2
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w201",
  "wordIds": [
   "w201"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八」。",
  "donor": "八",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa²⁴",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w220",
  "wordIds": [
   "w220"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「摆」。",
  "donor": "摆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pai⁵¹",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w246",
  "wordIds": [
   "w246"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「百」。",
  "donor": "百",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɤ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w263",
  "wordIds": [
   "w263"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「背」。",
  "donor": "背",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pei²⁴",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-127206",
  "wordIds": [
   "stedt-rn-127206"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「背」。",
  "donor": "背",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pei³⁵",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-43385",
  "wordIds": [
   "stedt-rn-43385"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「背」。",
  "donor": "背",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pei³⁵",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-stedt-rn-227892",
  "wordIds": [
   "stedt-rn-227892"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「百」。",
  "donor": "百",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɯe²1",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "pɯe²¹",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-yubao-60824-v-2690",
  "wordIds": [
   "yubao-60824-v-2690"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「摆」。",
  "donor": "摆",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pai⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ]
 },
 {
  "id": "chinese-loan-w213",
  "wordIds": [
   "w213"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八月」。",
  "donor": "八月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa²⁴jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pa³⁵je⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w222",
  "wordIds": [
   "w222"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「摆手」。",
  "donor": "摆手",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pai⁵⁵sou⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w223",
  "wordIds": [
   "w223"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「摆手舞」。",
  "donor": "摆手舞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pai⁵⁵sou⁵⁵wu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w224",
  "wordIds": [
   "w224"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「跛子」。",
  "donor": "跛子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pai⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pai⁵⁵ tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w226",
  "wordIds": [
   "w226"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「半」。",
  "donor": "半",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "pan⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w229",
  "wordIds": [
   "w229"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「办」。",
  "donor": "办",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w230",
  "wordIds": [
   "w230"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「半边」。",
  "donor": "半边",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ²⁴piɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w231",
  "wordIds": [
   "w231"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「办法」。",
  "donor": "办法",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ²⁴fa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w234",
  "wordIds": [
   "w234"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「半夜」。",
  "donor": "半夜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ²⁴jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w235",
  "wordIds": [
   "w235"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「班长」。",
  "donor": "班长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ⁵⁵tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w239",
  "wordIds": [
   "w239"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「报告」。",
  "donor": "报告",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau²⁴kau⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pau³⁵kau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w240",
  "wordIds": [
   "w240"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「保护」。",
  "donor": "保护",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵⁵xu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w257",
  "wordIds": [
   "w257"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「白菜」。",
  "donor": "白菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɤ²⁴tsʰai⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pɯe³⁵tsʰai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w265",
  "wordIds": [
   "w265"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「背时」。",
  "donor": "背时",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pei⁵⁵sɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w266",
  "wordIds": [
   "w266"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「杯子」。",
  "donor": "杯子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pei⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w268",
  "wordIds": [
   "w268"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「本地」。",
  "donor": "本地",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɜŋ²⁴ti⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w269",
  "wordIds": [
   "w269"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「本事」。",
  "donor": "本事",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɜŋ⁵¹sɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w270",
  "wordIds": [
   "w270"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「本子」。",
  "donor": "本子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɜŋ⁵¹tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w276",
  "wordIds": [
   "w276"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「比较」。",
  "donor": "比较",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi⁵⁵tɕiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w285",
  "wordIds": [
   "w285"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「必需」。",
  "donor": "必需",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi²⁴ɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w287",
 "wordIds": [
  "w287"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「边」。",
 "donor": "边",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "piɛn⁵⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "pian⁵⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w288",
  "wordIds": [
   "w288"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「变」。",
  "donor": "变",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piɛn²⁴",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "pian³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w289",
  "wordIds": [
   "w289"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扁担」。",
  "donor": "扁担",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piɛn⁵⁵taŋ²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pian⁵⁵tan²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w291",
  "wordIds": [
   "w291"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「便衣」。",
  "donor": "便衣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piɛn²⁴ji⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w297",
  "wordIds": [
   "w297"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「别的」。",
  "donor": "别的",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piɛ²⁴ti⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w299",
  "wordIds": [
   "w299"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「兵」。",
  "donor": "兵",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pĩ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "piŋ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "pin⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w300",
  "wordIds": [
   "w300"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「病」。",
  "donor": "病",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w345",
  "wordIds": [
   "w345"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「部落」。",
  "donor": "部落",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu²⁴luɔ⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w348",
  "wordIds": [
   "w348"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「不是」。",
  "donor": "不是",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu²⁴sɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w350",
  "wordIds": [
   "w350"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「不行」。",
  "donor": "不行",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu²⁴ɕiŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w351",
  "wordIds": [
   "w351"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「部长」。",
  "donor": "部长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu²⁴tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pu³⁵tsã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w360",
  "wordIds": [
   "w360"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「差不多」。",
  "donor": "差不多",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa⁵⁵pu⁵⁵tuɔ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w372",
  "wordIds": [
   "w372"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「茶盘」。",
  "donor": "茶盘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa²¹pʰaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w381",
  "wordIds": [
   "w381"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「财神」。",
  "donor": "财神",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰai²¹sɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w383",
  "wordIds": [
   "w383"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「唱」。",
  "donor": "唱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ²⁴",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tsʰan³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w384",
  "wordIds": [
   "w384"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「场」。",
  "donor": "场",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tsʰan²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w387",
  "wordIds": [
   "w387"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「唱歌」。",
  "donor": "唱歌",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ²⁴kuɔ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tsʰan³⁵ko⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w388",
  "wordIds": [
   "w388"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「参加」。",
  "donor": "参加",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ⁵⁵tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w429",
  "wordIds": [
   "w429"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「车子」。",
  "donor": "车子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɤ⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w462",
  "wordIds": [
   "w462"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「充」。",
  "donor": "充",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɔŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w477",
  "wordIds": [
   "w477"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初三」。",
  "donor": "初三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w478",
  "wordIds": [
   "w478"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「出生」。",
  "donor": "出生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu²¹sɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w479",
  "wordIds": [
   "w479"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初一」。",
  "donor": "初一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵ji²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w480",
 "wordIds": [
  "w480"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「串」。",
 "donor": "串",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tsʰuɛn²⁴",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "tsʰuan³⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w484",
  "wordIds": [
   "w484"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锤子」。",
  "donor": "锤子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuei²¹tsɨ²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tsʰui²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w485",
  "wordIds": [
   "w485"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「春」。",
  "donor": "春",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰun⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tsʰuən⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w486",
 "wordIds": [
  "w486"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「寸」。",
 "donor": "寸",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tsʰun²⁴",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "tsʰuin³⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w487",
  "wordIds": [
   "w487"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「春天」。",
  "donor": "春天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰun⁵⁵tʰiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w488",
  "wordIds": [
   "w488"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「村长」。",
  "donor": "村长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰun⁵⁵tsaŋ⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w501",
  "wordIds": [
   "w501"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「错误」。",
  "donor": "错误",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuɔ²⁴wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w518",
  "wordIds": [
   "w518"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「打扮」。",
  "donor": "打扮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵paŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w524",
  "wordIds": [
   "w524"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大鼓」。",
  "donor": "大鼓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²⁴ku⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w525",
  "wordIds": [
   "w525"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大哥」。",
  "donor": "大哥",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²¹kuɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w527",
  "wordIds": [
   "w527"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大锅子」。",
  "donor": "大锅子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²⁴kuɔ⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w530",
  "wordIds": [
   "w530"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大吉」。",
  "donor": "大吉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²⁴tɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w532",
  "wordIds": [
   "w532"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大概」。",
  "donor": "大概",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²⁴kʰai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w534",
  "wordIds": [
   "w534"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「打溜子」。",
  "donor": "打溜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵liu⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w535",
  "wordIds": [
   "w535"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大路」。",
  "donor": "大路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²⁴lu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w536",
  "wordIds": [
   "w536"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大门」。",
  "donor": "大门",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²⁴mɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w537",
  "wordIds": [
   "w537"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「打米机」。",
  "donor": "打米机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵mi⁵⁵tɕi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w538",
  "wordIds": [
   "w538"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大年」。",
  "donor": "大年",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²⁴ȵiɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w546",
  "wordIds": [
   "w546"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「代表」。",
  "donor": "代表",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tai²⁴piau⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tai³⁵piau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w548",
  "wordIds": [
   "w548"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「当」。",
  "donor": "当",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w549",
  "wordIds": [
   "w549"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「党」。",
  "donor": "党",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w551",
  "wordIds": [
   "w551"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「荡」。",
  "donor": "荡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w552",
  "wordIds": [
   "w552"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「党部」。",
  "donor": "党部",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵⁵pu²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w556",
  "wordIds": [
   "w556"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「当紧」。",
  "donor": "当紧",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵⁵tɕiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w557",
  "wordIds": [
   "w557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「当时」。",
  "donor": "当时",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵⁵sɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w558",
  "wordIds": [
   "w558"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「但是」。",
  "donor": "但是",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ²⁴sɨ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w560",
  "wordIds": [
   "w560"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「胆子」。",
  "donor": "胆子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵⁵tsɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w564",
  "wordIds": [
   "w564"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「道场」。",
  "donor": "道场",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau²⁴tsʰaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w565",
  "wordIds": [
   "w565"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「到处」。",
  "donor": "到处",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau²⁴tsʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w566",
  "wordIds": [
   "w566"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「到底」。",
  "donor": "到底",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau²⁴ti⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w567",
  "wordIds": [
   "w567"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「道理」。",
  "donor": "道理",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau²⁴li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w568",
  "wordIds": [
   "w568"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钉」。",
  "donor": "钉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɜŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w569",
  "wordIds": [
   "w569"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「定」。",
  "donor": "定",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɜŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w571",
  "wordIds": [
   "w571"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「灯笼」。",
  "donor": "灯笼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɜŋ⁵⁵lɔŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w573",
  "wordIds": [
   "w573"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钉子」。",
  "donor": "钉子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɜŋ⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tən⁵⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w585",
  "wordIds": [
   "w585"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「地点」。",
  "donor": "地点",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²⁴tiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w589",
  "wordIds": [
   "w589"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第三」。",
  "donor": "第三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²⁴saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w591",
  "wordIds": [
   "w591"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第五」。",
  "donor": "第五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²⁴wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w592",
  "wordIds": [
   "w592"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「弟兄」。",
  "donor": "弟兄",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²⁴ɕiɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w594",
  "wordIds": [
   "w594"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「地主」。",
  "donor": "地主",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²⁴tsu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w595",
  "wordIds": [
   "w595"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「点」。",
  "donor": "点",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w597",
  "wordIds": [
   "w597"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「点」。",
  "donor": "点",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn⁵¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w599",
  "wordIds": [
   "w599"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电灯」。",
  "donor": "电灯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn²⁴tɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w606",
  "wordIds": [
   "w606"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电视」。",
  "donor": "电视",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn²⁴sɨ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w607",
  "wordIds": [
   "w607"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电影」。",
  "donor": "电影",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn²⁴jiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w608",
  "wordIds": [
   "w608"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「癫子」。",
  "donor": "癫子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tian⁵⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w609",
  "wordIds": [
   "w609"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「点钟」。",
  "donor": "点钟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn⁵⁵tsɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w618",
  "wordIds": [
   "w618"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冬」。",
  "donor": "冬",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "toŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w623",
  "wordIds": [
   "w623"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洞」。",
  "donor": "洞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ²⁴",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "toŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w627",
  "wordIds": [
   "w627"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「东北」。",
  "donor": "东北",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ⁵⁵pɤ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w634",
  "wordIds": [
   "w634"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「动身」。",
  "donor": "动身",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ²⁴sɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w637",
  "wordIds": [
   "w637"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「斗争」。",
  "donor": "斗争",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tou²⁴tsɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w649",
  "wordIds": [
   "w649"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「端午」。",
  "donor": "端午",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuɛn⁵⁵wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w654",
  "wordIds": [
   "w654"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「队伍」。",
  "donor": "队伍",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuei²⁴wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w662",
  "wordIds": [
   "w662"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「多半」。",
  "donor": "多半",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuɔ⁵⁵paŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w709",
 "wordIds": [
  "w709"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「解放」。",
 "donor": "解放",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "kai⁵⁵fɛn²¹",
   "span": [
    1,
    2
   ]
  },
  {
   "ipa": "kai⁵⁵xuã²¹",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w711",
  "wordIds": [
   "w711"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「解决」。",
  "donor": "解决",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai⁵⁵tɕiɛ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w713",
  "wordIds": [
   "w713"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「街上」。",
  "donor": "街上",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai⁵⁵saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w714",
  "wordIds": [
   "w714"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「敢」。",
  "donor": "敢",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "kaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w715",
  "wordIds": [
   "w715"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钢」。",
  "donor": "钢",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "kaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "kan⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w716",
  "wordIds": [
   "w716"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肝」。",
  "donor": "肝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w718",
  "wordIds": [
   "w718"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「干部」。",
  "donor": "干部",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ²⁴pu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w721",
  "wordIds": [
   "w721"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「赶快」。",
  "donor": "赶快",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵kʰuai²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w744",
  "wordIds": [
   "w744"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「格外」。",
  "donor": "格外",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɤ²⁴wai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w748",
  "wordIds": [
   "w748"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「更」。",
  "donor": "更",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɜŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w749",
  "wordIds": [
   "w749"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「更」。",
  "donor": "更",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɜŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w752",
  "wordIds": [
   "w752"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「更加」。",
  "donor": "更加",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɜŋ²⁴tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w763",
  "wordIds": [
   "w763"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工厂」。",
  "donor": "工厂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ⁵⁵tsʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w764",
  "wordIds": [
   "w764"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「共产党」。",
  "donor": "共产党",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ²⁴tsʰaŋ⁵⁵taŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w765",
  "wordIds": [
   "w765"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「共产主义」。",
  "donor": "共产主义",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ²⁴tsʰaŋ⁵⁵tsu⁵⁵ȵi²⁴",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w767",
  "wordIds": [
   "w767"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工夫」。",
  "donor": "工夫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ⁵⁵xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w769",
  "wordIds": [
   "w769"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「公路」。",
  "donor": "公路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ⁵⁵lu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w772",
  "wordIds": [
   "w772"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工人」。",
  "donor": "工人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ⁵⁵zɜŋ²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "koŋ⁵⁵zən²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w773",
  "wordIds": [
   "w773"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工人阶级」。",
  "donor": "工人阶级",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ⁵⁵zɜŋ²¹kai⁵⁵tɕi⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w774",
  "wordIds": [
   "w774"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工作」。",
  "donor": "工作",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ⁵⁵tsuɔ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w811",
  "wordIds": [
   "w811"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「果品」。",
  "donor": "果品",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuɔ⁵⁵pʰiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w812",
  "wordIds": [
   "w812"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「歌舞」。",
  "donor": "歌舞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuɔ⁵⁵wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w838",
  "wordIds": [
   "w838"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「含」。",
  "donor": "含",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xaŋ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w839",
  "wordIds": [
   "w839"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「咸」。",
  "donor": "咸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xaŋ²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "xan²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w848",
  "wordIds": [
   "w848"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「好多」。",
  "donor": "好多",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xau⁵⁵tuɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w860",
  "wordIds": [
   "w860"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「恨」。",
  "donor": "恨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɜŋ²⁴",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "xən³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w862",
  "wordIds": [
   "w862"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「很多」。",
  "donor": "很多",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɜŋ⁵⁵tuɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w873",
  "wordIds": [
   "w873"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「后宫」。",
  "donor": "后宫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xou²⁴kɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w886",
  "wordIds": [
   "w886"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「服侍」。",
  "donor": "服侍",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu⁵⁵sɨ⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w888",
  "wordIds": [
   "w888"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「副州长」。",
  "donor": "副州长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu²⁴tsou⁵⁵tsaŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w889",
  "wordIds": [
   "w889"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「副主席」。",
  "donor": "副主席",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu²⁴tsu⁵⁵ɕi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w893",
  "wordIds": [
   "w893"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「花花」。",
  "donor": "花花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fa⁵⁵fa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w894",
  "wordIds": [
   "w894"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「花甲」。",
  "donor": "花甲",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fa⁵⁵tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w896",
  "wordIds": [
   "w896"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「发展」。",
  "donor": "发展",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fa²¹tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w898",
 "wordIds": [
  "w898"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「方」。",
 "donor": "方",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "xuã⁵⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "fɛn⁵⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "xuan⁵⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
 "id": "chinese-loan-w904",
 "wordIds": [
  "w904"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「反对」。",
 "donor": "反对",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "fɛn⁵⁵tuei²⁴",
   "span": [
    1,
    2
   ]
  },
  {
   "ipa": "xuan⁵⁵tui³⁵",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
 "id": "chinese-loan-w917",
 "wordIds": [
  "w917"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「飞机」。",
 "donor": "飞机",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "fei⁵⁵tɕi⁵⁵",
   "span": [
    1,
    2
   ]
  },
  {
   "ipa": "xuei⁵⁵tɕi⁵⁵",
   "span": [
    1,
    2
   ]
  },
  {
   "ipa": "xui⁵⁵tɕi⁵⁵",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w919",
  "wordIds": [
   "w919"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肥料」。",
  "donor": "肥料",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fei²¹liau²⁴",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "xui²¹liau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w922",
  "wordIds": [
   "w922"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肥皂」。",
  "donor": "肥皂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fei²¹tsau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w928",
  "wordIds": [
   "w928"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火车」。",
  "donor": "火车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fɔ⁵⁵tsʰɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w966",
  "wordIds": [
   "w966"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「积极」。",
  "donor": "积极",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi²¹tɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w978",
  "wordIds": [
   "w978"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「机器」。",
  "donor": "机器",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi⁵⁵tɕʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w980",
  "wordIds": [
   "w980"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「技术」。",
  "donor": "技术",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi²⁴su²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕi³⁵su²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w983",
  "wordIds": [
   "w983"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「急用」。",
  "donor": "急用",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi²⁴jɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w984",
  "wordIds": [
   "w984"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麂子」。",
  "donor": "麂子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w991",
  "wordIds": [
   "w991"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「家伙」。",
  "donor": "家伙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕia⁵⁵fɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w999",
  "wordIds": [
   "w999"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尖」。",
  "donor": "尖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛn⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tɕian⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w1001",
 "wordIds": [
  "w1001"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「箭」。",
 "donor": "箭",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tɕiɛn²⁴",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "tɕian³⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w1009",
  "wordIds": [
   "w1009"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「建设」。",
  "donor": "建设",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛn²⁴sɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1015",
  "wordIds": [
   "w1015"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「教育」。",
  "donor": "教育",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau²⁴jou²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1034",
  "wordIds": [
   "w1034"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「接任」。",
  "donor": "接任",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛ⁵⁵zɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1046",
  "wordIds": [
   "w1046"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「筋」。",
  "donor": "筋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tɕiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tɕin⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1047",
  "wordIds": [
   "w1047"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「经」。",
  "donor": "经",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1048",
  "wordIds": [
   "w1048"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「斤」。",
  "donor": "斤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1049",
  "wordIds": [
   "w1049"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「敬」。",
  "donor": "敬",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1050",
  "wordIds": [
   "w1050"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「劲」。",
  "donor": "劲",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1051",
  "wordIds": [
   "w1051"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「紧」。",
  "donor": "紧",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1055",
  "wordIds": [
   "w1055"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「进贡」。",
  "donor": "进贡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ²⁴kɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1057",
  "wordIds": [
   "w1057"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「今后」。",
  "donor": "今后",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵xou²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1058",
  "wordIds": [
   "w1058"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「经济」。",
  "donor": "经济",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵tɕi⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕĩ⁵⁵tɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1060",
  "wordIds": [
   "w1060"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「经验」。",
  "donor": "经验",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵liɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1063",
  "wordIds": [
   "w1063"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「军师」。",
  "donor": "军师",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵sɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1065",
  "wordIds": [
   "w1065"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「紧张」。",
  "donor": "紧张",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1066",
  "wordIds": [
   "w1066"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「今早」。",
  "donor": "今早",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵tsau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1067",
  "wordIds": [
   "w1067"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「镜子」。",
  "donor": "镜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1073",
  "wordIds": [
   "w1073"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「就是」。",
  "donor": "就是",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiu²⁴sɨ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1074",
  "wordIds": [
   "w1074"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「九月」。",
  "donor": "九月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiu⁵⁵jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕiu⁵⁵je⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1127",
  "wordIds": [
   "w1127"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「开年」。",
  "donor": "开年",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰai⁵⁵ȵiɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1128",
  "wordIds": [
   "w1128"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「开始」。",
  "donor": "开始",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰai⁵⁵sɨ⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1129",
  "wordIds": [
   "w1129"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「开张」。",
  "donor": "开张",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰai⁵⁵tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1147",
  "wordIds": [
   "w1147"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肯定」。",
  "donor": "肯定",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɜŋ⁵¹tɜŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1170",
  "wordIds": [
   "w1170"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苦菜」。",
  "donor": "苦菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵¹tsʰai²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1172",
  "wordIds": [
   "w1172"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苦瓜」。",
  "donor": "苦瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵¹kua⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1178",
  "wordIds": [
   "w1178"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苦日」。",
  "donor": "苦日",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵¹zɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1189",
  "wordIds": [
   "w1189"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「快当」。",
  "donor": "快当",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰuai²⁴taŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1190",
  "wordIds": [
   "w1190"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「快点」。",
  "donor": "快点",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰuai²⁴tiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1191",
  "wordIds": [
   "w1191"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「快活」。",
  "donor": "快活",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰuai²⁴fɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1193",
  "wordIds": [
   "w1193"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「快些」。",
  "donor": "快些",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰuai²⁴ɕiɛ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w1194",
 "wordIds": [
  "w1194"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「宽」。",
 "donor": "宽",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "kʰuɛn⁵⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "kʰuan⁵⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "kʰuã⁵⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w1210",
  "wordIds": [
   "w1210"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「可能」。",
  "donor": "可能",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰuɔ⁵⁵ȵɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1273",
  "wordIds": [
   "w1273"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蜡烛」。",
  "donor": "蜡烛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la²⁴tsu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1278",
  "wordIds": [
   "w1278"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「难」。",
  "donor": "难",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "laŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1281",
  "wordIds": [
   "w1281"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「南边」。",
  "donor": "南边",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "laŋ²¹piɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1286",
  "wordIds": [
   "w1286"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「栏杆」。",
  "donor": "栏杆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "laŋ²¹kaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1299",
  "wordIds": [
   "w1299"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老板」。",
  "donor": "老板",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵paŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1300",
  "wordIds": [
   "w1300"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老百姓」。",
  "donor": "老百姓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵pɤ²¹ɕiŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1303",
  "wordIds": [
   "w1303"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「劳动力」。",
  "donor": "劳动力",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau²¹tɔŋ²⁴li²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1312",
  "wordIds": [
   "w1312"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老人家」。",
  "donor": "老人家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵¹zɜŋ²¹ka²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1322",
  "wordIds": [
   "w1322"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「零」。",
  "donor": "零",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɜŋ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1358",
  "wordIds": [
   "w1358"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「练」。",
  "donor": "练",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liɛn²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w1359",
 "wordIds": [
  "w1359"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「梁」。",
 "donor": "梁",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "liɛn²¹",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "lian²¹",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
 "id": "chinese-loan-w1364",
 "wordIds": [
  "w1364"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「凉快」。",
 "donor": "凉快",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "liɛn²¹kʰuai²⁴",
   "span": [
    1,
    2
   ]
  },
  {
   "ipa": "lian²¹kʰuai³⁵",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w1366",
  "wordIds": [
   "w1366"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冷水」。",
  "donor": "冷水",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liɛn²¹suei²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1369",
  "wordIds": [
   "w1369"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「了不起」。",
  "donor": "了不起",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liau⁵⁵pu²¹tɕʰi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1383",
  "wordIds": [
   "w1383"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「领袖」。",
  "donor": "领袖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liŋ⁵⁵ɕiu²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1386",
  "wordIds": [
   "w1386"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「溜子」。",
  "donor": "溜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liu⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1395",
  "wordIds": [
   "w1395"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「农村」。",
  "donor": "农村",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɔŋ²¹tsʰun⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1399",
  "wordIds": [
   "w1399"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「龙家」。",
  "donor": "龙家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɔŋ²¹tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1413",
  "wordIds": [
   "w1413"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「六月」。",
  "donor": "六月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu²⁴jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "lu³⁵je⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1414",
  "wordIds": [
   "w1414"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「录音机」。",
  "donor": "录音机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu²¹jiŋ⁵⁵tɕi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1416",
  "wordIds": [
   "w1416"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乱七八糟」。",
  "donor": "乱七八糟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luɛn²⁴tɕʰi²¹pa²¹tsau⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1417",
  "wordIds": [
   "w1417"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「论文」。",
  "donor": "论文",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lun²⁴wɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1443",
  "wordIds": [
   "w1443"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「落花生」。",
  "donor": "落花生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luɔ²¹fa²¹sɜŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1461",
  "wordIds": [
   "w1461"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马鞭子」。",
  "donor": "马鞭子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵¹piɛn⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1466",
  "wordIds": [
   "w1466"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻利」。",
  "donor": "麻利",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma²¹li²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1473",
  "wordIds": [
   "w1473"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「慢」。",
  "donor": "慢",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "maŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1475",
  "wordIds": [
   "w1475"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「满」。",
  "donor": "满",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "maŋ⁵¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "man⁵³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1485",
  "wordIds": [
   "w1485"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「毛毯子」。",
  "donor": "毛毯子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau²¹tʰaŋ⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1487",
  "wordIds": [
   "w1487"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「帽子」。",
  "donor": "帽子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "mau³⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1518",
  "wordIds": [
   "w1518"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麦子」。",
  "donor": "麦子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɤ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1521",
  "wordIds": [
   "w1521"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「煤炉子」。",
  "donor": "煤炉子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei²¹lu²¹tsɨ²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1523",
  "wordIds": [
   "w1523"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「媒人」。",
  "donor": "媒人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei²¹zɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1524",
  "wordIds": [
   "w1524"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「没有」。",
  "donor": "没有",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei²¹jou⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1547",
  "wordIds": [
   "w1547"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉花」。",
  "donor": "棉花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miɛn²¹fa²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "mian²¹xua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1557",
  "wordIds": [
   "w1557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「命」。",
  "donor": "命",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1558",
  "wordIds": [
   "w1558"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「民兵」。",
  "donor": "民兵",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miŋ²¹piŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1559",
  "wordIds": [
   "w1559"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「民族」。",
  "donor": "民族",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miŋ²¹tsʰu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1561",
  "wordIds": [
   "w1561"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「名誉」。",
  "donor": "名誉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miŋ²¹ji²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1562",
  "wordIds": [
   "w1562"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「名字」。",
  "donor": "名字",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miŋ²¹tsɨ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1563",
  "wordIds": [
   "w1563"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「民主」。",
  "donor": "民主",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mĩ²¹tsu⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "miŋ²¹tsu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1597",
  "wordIds": [
   "w1597"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「硬」。",
  "donor": "硬",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋɜŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1608",
  "wordIds": [
   "w1608"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「念」。",
  "donor": "念",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵiɛn²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1609",
  "wordIds": [
   "w1609"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年」。",
  "donor": "年",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵiɛn²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1611",
  "wordIds": [
   "w1611"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年纪」。",
  "donor": "年纪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵiɛn²¹tɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1613",
  "wordIds": [
   "w1613"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年轻」。",
  "donor": "年轻",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵiɛn²¹tɕʰiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1614",
  "wordIds": [
   "w1614"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年轻人」。",
  "donor": "年轻人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵiɛn²¹tɕʰiŋ⁵⁵zɜŋ²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1615",
  "wordIds": [
   "w1615"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年猪」。",
  "donor": "年猪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵiɛn²¹tsu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1698",
  "wordIds": [
   "w1698"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「盘子」。",
  "donor": "盘子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰaŋ²¹tsɨ²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pʰan²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1701",
  "wordIds": [
   "w1701"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「泡子」。",
  "donor": "泡子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰau²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1713",
  "wordIds": [
   "w1713"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「喷」。",
  "donor": "喷",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰɜŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1723",
  "wordIds": [
   "w1723"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「皮鞋」。",
  "donor": "皮鞋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰi²¹xai²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1727",
  "wordIds": [
   "w1727"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「偏」。",
  "donor": "偏",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiɛn⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1728",
  "wordIds": [
   "w1728"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「片」。",
  "donor": "片",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiɛn⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1729",
  "wordIds": [
   "w1729"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「骗」。",
  "donor": "骗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiɛn²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1736",
  "wordIds": [
   "w1736"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「瓶」。",
  "donor": "瓶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiŋ²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "pʰin²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1738",
  "wordIds": [
   "w1738"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「平衡」。",
  "donor": "平衡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiŋ²¹xɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w1787",
 "wordIds": [
  "w1787"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「汽车」。",
 "donor": "汽车",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tɕʰi²⁴tsʰɤ⁵⁵",
   "span": [
    1,
    2
   ]
  },
  {
   "ipa": "tɕʰi³⁵tsʰe⁵⁵",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "ma-car-dragonfly-2026-10-23"
},
 {
  "id": "chinese-loan-w1791",
  "wordIds": [
   "w1791"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「起劲」。",
  "donor": "起劲",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵tɕiŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1792",
  "wordIds": [
   "w1792"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「吃亏」。",
  "donor": "吃亏",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²⁴kʰuei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1794",
  "wordIds": [
   "w1794"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「起码」。",
  "donor": "起码",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵ma⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1797",
  "wordIds": [
   "w1797"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「起事」。",
  "donor": "起事",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵sɨ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1799",
  "wordIds": [
   "w1799"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「七月」。",
  "donor": "七月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²⁴jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕʰi³⁵je⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w1805",
 "wordIds": [
  "w1805"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「千」。",
 "donor": "千",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tɕʰiɛn⁵⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "tɕʰian⁵⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w1806",
  "wordIds": [
   "w1806"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「圈」。",
  "donor": "圈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛn⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1810",
  "wordIds": [
   "w1810"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「全」。",
  "donor": "全",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛn²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1811",
  "wordIds": [
   "w1811"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「浅」。",
  "donor": "浅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛn⁵¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tɕʰian⁵³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1820",
  "wordIds": [
   "w1820"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钳钳」。",
  "donor": "钳钳",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛn²⁴tɕʰiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕʰian²⁴tɕʰian³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1837",
  "wordIds": [
   "w1837"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「缺点」。",
  "donor": "缺点",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛ²¹tiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1847",
  "wordIds": [
   "w1847"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「轻」。",
  "donor": "轻",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1850",
  "wordIds": [
   "w1850"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「请」。",
  "donor": "请",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1868",
  "wordIds": [
   "w1868"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「裙子」。",
  "donor": "裙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ²¹tsɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1870",
  "wordIds": [
   "w1870"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「穷」。",
  "donor": "穷",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɔŋ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1875",
  "wordIds": [
   "w1875"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「秋天」。",
  "donor": "秋天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiu⁵⁵tʰiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1897",
  "wordIds": [
   "w1897"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「染」。",
  "donor": "染",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zaŋ⁵¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "zan⁵³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1925",
  "wordIds": [
   "w1925"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「认」。",
  "donor": "认",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zɜŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1926",
  "wordIds": [
   "w1926"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「人」。",
  "donor": "人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zɜŋ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1927",
  "wordIds": [
   "w1927"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「人民」。",
  "donor": "人民",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zɜŋ²¹miŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1929",
  "wordIds": [
   "w1929"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「认为」。",
  "donor": "认为",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zɜŋ²⁴wei²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1930",
  "wordIds": [
   "w1930"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「任务」。",
  "donor": "任务",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zɜŋ²⁴wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1946",
  "wordIds": [
   "w1946"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「如果」。",
  "donor": "如果",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zu²¹kuɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1992",
  "wordIds": [
   "w1992"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三」。",
  "donor": "三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1993",
  "wordIds": [
   "w1993"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「山」。",
  "donor": "山",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1994",
  "wordIds": [
   "w1994"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「上」。",
  "donor": "上",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1995",
  "wordIds": [
   "w1995"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「散」。",
  "donor": "散",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1996",
  "wordIds": [
   "w1996"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「山歌」。",
  "donor": "山歌",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵kuɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2001",
  "wordIds": [
   "w2001"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三月」。",
  "donor": "三月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2036",
  "wordIds": [
   "w2036"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「深」。",
  "donor": "深",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "sən⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2037",
  "wordIds": [
   "w2037"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「省」。",
  "donor": "省",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2038",
  "wordIds": [
   "w2038"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「神」。",
  "donor": "神",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2040",
  "wordIds": [
   "w2040"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「神灯」。",
  "donor": "神灯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ²¹tɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2041",
  "wordIds": [
   "w2041"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「生活」。",
  "donor": "生活",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ⁵⁵fɔ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2043",
  "wordIds": [
   "w2043"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「神龛」。",
  "donor": "神龛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ²¹kʰaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2045",
  "wordIds": [
   "w2045"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「胜利」。",
  "donor": "胜利",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ²⁴li²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2049",
  "wordIds": [
   "w2049"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「神仙」。",
  "donor": "神仙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ²¹ɕiɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2075",
  "wordIds": [
   "w2075"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「失败」。",
  "donor": "失败",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²¹pai²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2077",
  "wordIds": [
   "w2077"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「是的」。",
  "donor": "是的",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴ti⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2080",
  "wordIds": [
   "w2080"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「世界」。",
  "donor": "世界",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴kai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2083",
  "wordIds": [
   "w2083"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「时候」。",
  "donor": "时候",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²¹xou²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2084",
  "wordIds": [
   "w2084"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「师傅」。",
  "donor": "师傅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ⁵⁵xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2085",
  "wordIds": [
   "w2085"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「实话」。",
  "donor": "实话",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴fa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2086",
  "wordIds": [
   "w2086"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「石灰」。",
  "donor": "石灰",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴fei⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "si³⁵xui⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2088",
  "wordIds": [
   "w2088"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「时间」。",
  "donor": "时间",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²¹tɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2089",
  "wordIds": [
   "w2089"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「时节」。",
  "donor": "时节",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²¹tɕiɛ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2094",
  "wordIds": [
   "w2094"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「时刻」。",
  "donor": "时刻",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²¹kʰɤ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2102",
  "wordIds": [
   "w2102"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十里」。",
  "donor": "十里",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ⁵⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2115",
  "wordIds": [
   "w2115"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「世上」。",
  "donor": "世上",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2122",
  "wordIds": [
   "w2122"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「世世代代」。",
  "donor": "世世代代",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴sɨ⁵⁵tai²⁴tai⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2124",
  "wordIds": [
   "w2124"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「时时刻刻」。",
  "donor": "时时刻刻",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²¹sɨ²¹kʰɤ²¹kʰɤ²¹",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2126",
  "wordIds": [
   "w2126"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「私塾」。",
  "donor": "私塾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ⁵⁵su⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2130",
  "wordIds": [
   "w2130"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「实现」。",
  "donor": "实现",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴ɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2132",
  "wordIds": [
   "w2132"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「师爷」。",
  "donor": "师爷",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ⁵⁵jɤ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2133",
  "wordIds": [
   "w2133"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四月」。",
  "donor": "四月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2134",
  "wordIds": [
   "w2134"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十月」。",
  "donor": "十月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²¹jɤ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2136",
  "wordIds": [
   "w2136"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「松」。",
  "donor": "松",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɔŋ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "soŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2152",
  "wordIds": [
   "w2152"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「手表」。",
  "donor": "手表",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sou⁵⁵piau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2155",
  "wordIds": [
   "w2155"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「首先」。",
  "donor": "首先",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sou⁵⁵ɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2161",
  "wordIds": [
   "w2161"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「书记」。",
  "donor": "书记",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su⁵⁵tɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2162",
  "wordIds": [
   "w2162"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「书记长」。",
  "donor": "书记长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su⁵⁵tɕi⁵⁵tsaŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w2172",
 "wordIds": [
  "w2172"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「算」。",
 "donor": "算",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "suɛn²⁴",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "suan³⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "suã³⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w2174",
  "wordIds": [
   "w2174"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「算了」。",
  "donor": "算了",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suɛn²⁴liau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2175",
  "wordIds": [
   "w2175"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「算命子」。",
  "donor": "算命子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suɛn²⁴miŋ⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2177",
  "wordIds": [
   "w2177"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「虽然」。",
  "donor": "虽然",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵zaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2179",
  "wordIds": [
   "w2179"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「顺」。",
  "donor": "顺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sun²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2180",
  "wordIds": [
   "w2180"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「顺坦」。",
  "donor": "顺坦",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sun²⁴tʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2193",
  "wordIds": [
   "w2193"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「所以」。",
  "donor": "所以",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suɔ⁵⁵ji⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2226",
  "wordIds": [
   "w2226"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「态度」。",
  "donor": "态度",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰai²⁴tu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2229",
  "wordIds": [
   "w2229"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「滩」。",
  "donor": "滩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2230",
  "wordIds": [
   "w2230"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「趟」。",
  "donor": "趟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2231",
  "wordIds": [
   "w2231"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「探」。",
  "donor": "探",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2232",
  "wordIds": [
   "w2232"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「糖」。",
  "donor": "糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰã²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tʰaŋ²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tʰan²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2233",
  "wordIds": [
   "w2233"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「弹」。",
  "donor": "弹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2237",
  "wordIds": [
   "w2237"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「糖食」。",
  "donor": "糖食",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ²¹sɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2238",
  "wordIds": [
   "w2238"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「探长」。",
  "donor": "探长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ²⁴tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2239",
  "wordIds": [
   "w2239"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「探子」。",
  "donor": "探子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2243",
  "wordIds": [
   "w2243"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「讨论」。",
  "donor": "讨论",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰau⁵⁵lun²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2245",
  "wordIds": [
   "w2245"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桃子」。",
  "donor": "桃子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰau²¹tsɨ²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tʰau²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2269",
  "wordIds": [
   "w2269"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「体质」。",
  "donor": "体质",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰi⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2270",
  "wordIds": [
   "w2270"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「天」。",
  "donor": "天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiɛn⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2271",
  "wordIds": [
   "w2271"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「甜」。",
  "donor": "甜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiɛn²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tʰian²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2272",
  "wordIds": [
   "w2272"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「田」。",
  "donor": "田",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiɛn²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2275",
  "wordIds": [
   "w2275"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「天气」。",
  "donor": "天气",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiɛn⁵⁵tɕʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2291",
  "wordIds": [
   "w2291"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「通」。",
  "donor": "通",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2292",
  "wordIds": [
   "w2292"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桶」。",
  "donor": "桶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2294",
  "wordIds": [
   "w2294"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铜」。",
  "donor": "铜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔŋ²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tʰoŋ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2306",
  "wordIds": [
   "w2306"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铜钱」。",
  "donor": "铜钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔŋ²¹tɕʰiɛn²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tʰoŋ²¹tɕʰian²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2311",
  "wordIds": [
   "w2311"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「通夜」。",
  "donor": "通夜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔŋ⁵⁵jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2323",
  "wordIds": [
   "w2323"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「土蛮子」。",
  "donor": "土蛮子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵maŋ²¹tsɨ²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2328",
  "wordIds": [
   "w2328"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「图形」。",
  "donor": "图形",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu²¹ɕiŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2338",
  "wordIds": [
   "w2338"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「退休」。",
  "donor": "退休",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰuei²⁴ɕiu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2346",
  "wordIds": [
   "w2346"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「拖拉机」。",
  "donor": "拖拉机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰuɔ⁵⁵la⁵⁵tɕi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2351",
  "wordIds": [
   "w2351"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「袜子」。",
  "donor": "袜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wa²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "wa³⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w2355",
 "wordIds": [
  "w2355"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「万」。",
 "donor": "万",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "wɛn²⁴",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "wan³⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w2361",
  "wordIds": [
   "w2361"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「晚年」。",
  "donor": "晚年",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wɛn⁵⁵ȵiɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2362",
  "wordIds": [
   "w2362"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「完全」。",
  "donor": "完全",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wɛn²¹tɕʰiɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2367",
  "wordIds": [
   "w2367"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伟大」。",
  "donor": "伟大",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wei⁵⁵ta²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2368",
  "wordIds": [
   "w2368"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「卫生」。",
  "donor": "卫生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wei²⁴sɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2408",
  "wordIds": [
   "w2408"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「武艺」。",
  "donor": "武艺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu⁵⁵ȵi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2418",
  "wordIds": [
   "w2418"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「五月」。",
  "donor": "五月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu⁵⁵jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "wu⁵⁵je⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2435",
  "wordIds": [
   "w2435"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「习惯」。",
  "donor": "习惯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi²¹kuɛn²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2443",
  "wordIds": [
   "w2443"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「席上」。",
  "donor": "席上",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi²¹saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2447",
  "wordIds": [
   "w2447"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「下面」。",
  "donor": "下面",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕia²⁴miɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2448",
  "wordIds": [
   "w2448"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「下山」。",
  "donor": "下山",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕia²⁴saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2450",
  "wordIds": [
   "w2450"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鲜」。",
  "donor": "鲜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "ɕian⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2451",
  "wordIds": [
   "w2451"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「先」。",
  "donor": "先",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2455",
  "wordIds": [
   "w2455"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「县」。",
  "donor": "县",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2459",
  "wordIds": [
   "w2459"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「选」。",
  "donor": "选",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2463",
  "wordIds": [
   "w2463"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「先进」。",
  "donor": "先进",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵⁵tɕiŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2466",
  "wordIds": [
   "w2466"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「先生」。",
  "donor": "先生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵⁵sɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2467",
  "wordIds": [
   "w2467"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「闲事」。",
  "donor": "闲事",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn²¹sɨ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2470",
  "wordIds": [
   "w2470"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「县长」。",
  "donor": "县长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn²⁴tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2478",
  "wordIds": [
   "w2478"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小路」。",
  "donor": "小路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵¹lu²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2479",
  "wordIds": [
   "w2479"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小时」。",
  "donor": "小时",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵⁵sɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2508",
  "wordIds": [
   "w2508"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「新」。",
  "donor": "新",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2509",
  "wordIds": [
   "w2509"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「心」。",
  "donor": "心",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2511",
  "wordIds": [
   "w2511"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「信」。",
  "donor": "信",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2515",
  "wordIds": [
   "w2515"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「幸福」。",
  "donor": "幸福",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ²⁴xu²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "ɕin³⁵xu²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "ɕĩ³⁵xu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2516",
  "wordIds": [
   "w2516"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「行了」。",
  "donor": "行了",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ²¹liau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2517",
  "wordIds": [
   "w2517"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「新年」。",
  "donor": "新年",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ⁵⁵ȵiɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2519",
  "wordIds": [
   "w2519"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「休息」。",
  "donor": "休息",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiu⁵⁵ɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2523",
  "wordIds": [
   "w2523"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铅笔」。",
  "donor": "铅笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jɛn²¹pi²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2524",
  "wordIds": [
   "w2524"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「圆灯」。",
  "donor": "圆灯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jɛn²¹tɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2538",
  "wordIds": [
   "w2538"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「腰间」。",
  "donor": "腰间",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jau⁵⁵kaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2559",
  "wordIds": [
   "w2559"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「越更」。",
  "donor": "越更",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jɤ²⁴kɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2570",
  "wordIds": [
   "w2570"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「野猪」。",
  "donor": "野猪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jɤ⁵⁵tsu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2580",
  "wordIds": [
   "w2580"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「以后」。",
  "donor": "以后",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji⁵⁵xou²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2581",
  "wordIds": [
   "w2581"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「意见」。",
  "donor": "意见",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²⁴tɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2582",
  "wordIds": [
   "w2582"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「已经」。",
  "donor": "已经",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji⁵⁵tɕĩ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "ji⁵⁵tɕiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2589",
  "wordIds": [
   "w2589"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「依然」。",
  "donor": "依然",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji⁵⁵zaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2591",
  "wordIds": [
   "w2591"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「意思」。",
  "donor": "意思",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²⁴sɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2593",
  "wordIds": [
   "w2593"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一下」。",
  "donor": "一下",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²⁴ɕia⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2594",
  "wordIds": [
   "w2594"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一些」。",
  "donor": "一些",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²¹ɕiɛ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2596",
  "wordIds": [
   "w2596"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一直」。",
  "donor": "一直",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2597",
  "wordIds": [
   "w2597"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「赢」。",
  "donor": "赢",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "jiŋ²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "jin²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2598",
  "wordIds": [
   "w2598"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「运动」。",
  "donor": "运动",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiŋ²⁴tɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2599",
  "wordIds": [
   "w2599"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「应该」。",
  "donor": "应该",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiŋ²⁴kai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2602",
  "wordIds": [
   "w2602"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「因为」。",
  "donor": "因为",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiŋ⁵⁵wei²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2603",
  "wordIds": [
   "w2603"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「印子」。",
  "donor": "印子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiŋ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2608",
  "wordIds": [
   "w2608"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「优点」。",
  "donor": "优点",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jou⁵⁵tiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2610",
  "wordIds": [
   "w2610"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「有心」。",
  "donor": "有心",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jou⁵⁵ɕiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2629",
  "wordIds": [
   "w2629"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「寨子」。",
  "donor": "寨子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsai²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2630",
  "wordIds": [
   "w2630"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「丈」。",
  "donor": "丈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2631",
  "wordIds": [
   "w2631"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「张」。",
  "donor": "张",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2632",
  "wordIds": [
   "w2632"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「帐」。",
  "donor": "帐",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2633",
  "wordIds": [
   "w2633"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「战」。",
  "donor": "战",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2635",
  "wordIds": [
   "w2635"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「战功」。",
  "donor": "战功",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ²⁴kɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2636",
  "wordIds": [
   "w2636"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「长进」。",
  "donor": "长进",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ⁵¹tɕiŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2642",
  "wordIds": [
   "w2642"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「照顾」。",
  "donor": "照顾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau²⁴ku⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2659",
  "wordIds": [
   "w2659"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「这个」。",
  "donor": "这个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɤ²⁴kuɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2665",
  "wordIds": [
   "w2665"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正」。",
  "donor": "正",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2666",
  "wordIds": [
   "w2666"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「镇」。",
  "donor": "镇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2669",
  "wordIds": [
   "w2669"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「真的」。",
  "donor": "真的",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ⁵⁵ti⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2671",
  "wordIds": [
   "w2671"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「整风」。",
  "donor": "整风",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ⁵⁵xɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2672",
  "wordIds": [
   "w2672"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「政府」。",
  "donor": "政府",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ²⁴xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2674",
  "wordIds": [
   "w2674"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「争取」。",
  "donor": "争取",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ⁵⁵tɕʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2677",
  "wordIds": [
   "w2677"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正式」。",
  "donor": "正式",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ²⁴sɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2678",
  "wordIds": [
   "w2678"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「政协」。",
  "donor": "政协",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ²⁴ɕiɛ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2679",
  "wordIds": [
   "w2679"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正月」。",
  "donor": "正月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ⁵⁵jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2680",
  "wordIds": [
   "w2680"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正在」。",
  "donor": "正在",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ²⁴tsai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2681",
  "wordIds": [
   "w2681"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「真正」。",
  "donor": "真正",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ⁵⁵tsɜŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2682",
  "wordIds": [
   "w2682"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「政治」。",
  "donor": "政治",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2701",
  "wordIds": [
   "w2701"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「子弹」。",
  "donor": "子弹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ⁵⁵taŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2704",
  "wordIds": [
   "w2704"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「之后」。",
  "donor": "之后",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ⁵⁵xou²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2709",
  "wordIds": [
   "w2709"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「资料」。",
  "donor": "资料",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ⁵⁵liau²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2711",
  "wordIds": [
   "w2711"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「侄女子」。",
  "donor": "侄女子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ²⁴ȵi⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2718",
  "wordIds": [
   "w2718"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「字音」。",
  "donor": "字音",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ²⁴jiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2719",
  "wordIds": [
   "w2719"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「只有」。",
  "donor": "只有",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ²⁴jou⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2720",
  "wordIds": [
   "w2720"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「自由」。",
  "donor": "自由",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ²⁴jou²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2721",
  "wordIds": [
   "w2721"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「纸张纸薄」。",
  "donor": "纸张纸薄",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ⁵⁵tsaŋ⁵⁵tsɨ⁵⁵pɔ²¹",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2723",
  "wordIds": [
   "w2723"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「自治」。",
  "donor": "自治",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɨ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2727",
  "wordIds": [
   "w2727"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「重」。",
  "donor": "重",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2730",
  "wordIds": [
   "w2730"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中间」。",
  "donor": "中间",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵kaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2731",
  "wordIds": [
   "w2731"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「总共」。",
  "donor": "总共",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵kɔŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2733",
  "wordIds": [
   "w2733"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「总理」。",
  "donor": "总理",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2734",
  "wordIds": [
   "w2734"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「总路线」。",
  "donor": "总路线",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵lu²⁴ɕiɛn²⁴",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2735",
  "wordIds": [
   "w2735"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「终于」。",
  "donor": "终于",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2738",
  "wordIds": [
   "w2738"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「做工」。",
  "donor": "做工",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsou²⁴kɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2739",
  "wordIds": [
   "w2739"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「州长」。",
  "donor": "州长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsou⁵⁵tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2742",
  "wordIds": [
   "w2742"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「主人家」。",
  "donor": "主人家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵⁵zɜŋ²¹ka²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2743",
  "wordIds": [
   "w2743"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「主席」。",
  "donor": "主席",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵⁵ɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2744",
  "wordIds": [
   "w2744"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「主意」。",
  "donor": "主意",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵⁵ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2745",
  "wordIds": [
   "w2745"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「注意」。",
  "donor": "注意",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu²⁴ji⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2746",
  "wordIds": [
   "w2746"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「组长」。",
  "donor": "组长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵¹tsaŋ⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-w2749",
 "wordIds": [
  "w2749"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「砖」。",
 "donor": "砖",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tsuã⁵⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "tsuɛn⁵⁵",
   "span": [
    1,
    1
   ]
  },
  {
   "ipa": "tsuan⁵⁵",
   "span": [
    1,
    1
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w2752",
  "wordIds": [
   "w2752"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「专门」。",
  "donor": "专门",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuɛn⁵⁵mɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2753",
  "wordIds": [
   "w2753"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「转转」。",
  "donor": "转转",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuɛn²⁴tsuɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2755",
  "wordIds": [
   "w2755"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「最好」。",
  "donor": "最好",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuei²⁴xau⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2756",
  "wordIds": [
   "w2756"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「最后」。",
  "donor": "最后",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuei²⁴xou²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2771",
  "wordIds": [
   "w2771"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桌子」。",
  "donor": "桌子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuɔ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w3073",
  "wordIds": [
   "w3073"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「包谷」。",
  "donor": "包谷",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵⁵ku⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w5234",
  "wordIds": [
   "w5234"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「算命」。",
  "donor": "算命",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suɛn²⁴miŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w5688",
  "wordIds": [
   "w5688"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一下」。",
  "donor": "一下",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²⁴ɕia⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w5744",
  "wordIds": [
   "w5744"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「爪子」。",
  "donor": "爪子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w5859",
  "wordIds": [
   "w5859"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「爪子」。",
  "donor": "爪子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsua⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288736",
  "wordIds": [
   "stedt-rn-288736"
  ],
  "kind": "借词来源",
  "text": "/si³⁵xuei⁵⁵/ 可能借自西南官话「石灰」。",
  "donor": "石灰",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³⁵xuei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288921",
  "wordIds": [
   "stedt-rn-288921"
  ],
  "kind": "借词来源",
  "text": "/tɕiau³⁵jiu³⁵/ 可能借自西南官话「教育」。",
  "donor": "教育",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau³⁵jiu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43497",
  "wordIds": [
   "stedt-rn-43497"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「旁边」。",
  "donor": "旁边",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bã²¹ piã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289776",
  "wordIds": [
   "stedt-rn-289776"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「盘子」。",
  "donor": "盘子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bã³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289777",
  "wordIds": [
   "stedt-rn-289777"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「瓶子」。",
  "donor": "瓶子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bĩ³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289610",
  "wordIds": [
   "stedt-rn-289610"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「部长」。",
  "donor": "部长",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bu³⁵tsã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-453555",
  "wordIds": [
   "stedt-rn-453555"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「草鱼」。",
  "donor": "草鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰau⁵¹ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-127407",
  "wordIds": [
   "stedt-rn-127407"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「痰」。",
  "donor": "痰",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-454083",
  "wordIds": [
   "stedt-rn-454083"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「打米机」。",
  "donor": "打米机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵¹mi⁵¹tɕi⁵¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289517",
  "wordIds": [
   "stedt-rn-289517"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「田鸡」。",
  "donor": "田鸡",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "diã¹³tɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-455115",
  "wordIds": [
   "stedt-rn-455115"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洞」。",
  "donor": "洞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289422",
  "wordIds": [
   "stedt-rn-289422"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「铜」。",
  "donor": "铜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dõ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289615",
  "wordIds": [
   "stedt-rn-289615"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「同志」。",
  "donor": "同志",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dõ¹³tsi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289873",
  "wordIds": [
   "stedt-rn-289873"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「自由」。",
  "donor": "自由",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzi¹³jiu̵³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289826",
  "wordIds": [
   "stedt-rn-289826"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「旗子」。",
  "donor": "旗子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑi²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289617",
  "wordIds": [
   "stedt-rn-289617"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「群众」。",
  "donor": "群众",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑỹ²¹tsõ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290129",
  "wordIds": [
   "stedt-rn-290129"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「方」。",
  "donor": "方",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290226",
  "wordIds": [
   "stedt-rn-290226"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「反动」。",
  "donor": "反动",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fã³³tõ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290118",
  "wordIds": [
   "stedt-rn-290118"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「反对」。",
  "donor": "反对",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fã⁵⁵tuei¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290102",
  "wordIds": [
   "stedt-rn-290102"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「发展」。",
  "donor": "发展",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fua¹³tsã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43569",
  "wordIds": [
   "stedt-rn-43569"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「肥料」。",
  "donor": "肥料",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fuei²¹ liaɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289560",
  "wordIds": [
   "stedt-rn-289560"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「葵花」。",
  "donor": "葵花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "gu̵¹³h̄ua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-366853",
  "wordIds": [
   "stedt-rn-366853"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洋芋」。",
  "donor": "洋芋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jan²¹ji³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-205095",
  "wordIds": [
   "stedt-rn-205095"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铅笔」。",
  "donor": "铅笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jian²¹pi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-372691",
  "wordIds": [
   "stedt-rn-372691"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洋火」。",
  "donor": "洋火",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jian²¹xo²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-380892",
  "wordIds": [
   "stedt-rn-380892"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「样子」。",
  "donor": "样子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jian³⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-191274",
  "wordIds": [
   "stedt-rn-191274"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「秧子」。",
  "donor": "秧子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jian⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288613",
  "wordIds": [
   "stedt-rn-288613"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洋芋」。",
  "donor": "洋芋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiã²¹ji³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288878",
  "wordIds": [
   "stedt-rn-288878"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铅笔」。",
  "donor": "铅笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiã²¹pi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288856",
  "wordIds": [
   "stedt-rn-288856"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洋火」。",
  "donor": "洋火",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiã²¹xo²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289501",
  "wordIds": [
   "stedt-rn-289501"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「鸭子」。",
  "donor": "鸭子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jia⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-361297",
  "wordIds": [
   "stedt-rn-361297"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「野猪」。",
  "donor": "野猪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jie⁵⁵tsu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-427465",
  "wordIds": [
   "stedt-rn-427465"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「阴」。",
  "donor": "阴",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jin⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289760",
  "wordIds": [
   "stedt-rn-289760"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钥匙」。",
  "donor": "钥匙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jio²¹si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289859",
  "wordIds": [
   "stedt-rn-289859"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「优点」。",
  "donor": "优点",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiu̵³³tiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-231105",
  "wordIds": [
   "stedt-rn-231105"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一定」。",
  "donor": "一定",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²¹tən³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290006",
  "wordIds": [
   "stedt-rn-290006"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「赢」。",
  "donor": "赢",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290305",
  "wordIds": [
   "stedt-rn-290305"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「已经」。",
  "donor": "已经",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji³³tɕĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-228300",
  "wordIds": [
   "stedt-rn-228300"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一半」。",
  "donor": "一半",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji³⁵pan⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288924",
  "wordIds": [
   "stedt-rn-288924"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「运动」。",
  "donor": "运动",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ³⁵tũ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288939",
  "wordIds": [
   "stedt-rn-288939"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「意见」。",
  "donor": "意见",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji³⁵tɕiã³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290300",
  "wordIds": [
   "stedt-rn-290300"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「一定」。",
  "donor": "一定",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji¹³dẽ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289866",
  "wordIds": [
   "stedt-rn-289866"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「意见」。",
  "donor": "意见",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji¹³tɕiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43575",
  "wordIds": [
   "stedt-rn-43575"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「影子」。",
  "donor": "影子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ⁵⁵ tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43574",
  "wordIds": [
   "stedt-rn-43574"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「影子」。",
  "donor": "影子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ⁵⁵ tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-431784",
  "wordIds": [
   "stedt-rn-431784"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「拥抱」。",
  "donor": "拥抱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "joŋ⁵³pau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289695",
  "wordIds": [
   "stedt-rn-289695"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「戒指」。",
  "donor": "戒指",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-412027",
  "wordIds": [
   "stedt-rn-412027"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「敢」。",
  "donor": "敢",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kan³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-390151",
  "wordIds": [
   "stedt-rn-390151"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「间」。",
  "donor": "间",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kan⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-365472",
  "wordIds": [
   "stedt-rn-365472"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「甘蔗」。",
  "donor": "甘蔗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kan⁵⁵tsa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-402264",
  "wordIds": [
   "stedt-rn-402264"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「高兴」。",
  "donor": "高兴",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kau⁵⁵ɕin³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-127409",
  "wordIds": [
   "stedt-rn-127409"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「肝」。",
  "donor": "肝",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289424",
  "wordIds": [
   "stedt-rn-289424"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钢」。",
  "donor": "钢",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288675",
  "wordIds": [
   "stedt-rn-288675"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「干部」。",
  "donor": "干部",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã³⁵pu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289616",
  "wordIds": [
   "stedt-rn-289616"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「干部」。",
  "donor": "干部",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã¹³pu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289586",
  "wordIds": [
   "stedt-rn-289586"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「根」。",
  "donor": "根",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kẽ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-220446",
  "wordIds": [
   "stedt-rn-220446"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「开始」。",
  "donor": "开始",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰai⁵⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288666",
  "wordIds": [
   "stedt-rn-288666"
  ],
  "kind": "借词来源",
  "text": "/mu³⁵tɕiã³⁵/ 可能借自西南官话「木匠」。",
  "donor": "木匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu³⁵tɕiã³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289503",
  "wordIds": [
   "stedt-rn-289503"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「鸽子」。",
  "donor": "鸽子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ko²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289868",
  "wordIds": [
   "stedt-rn-289868"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「工厂」。",
  "donor": "工厂",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ³³tsʰã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289839",
  "wordIds": [
   "stedt-rn-289839"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「共产党」。",
  "donor": "共产党",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ¹³tsʰã⁵⁵tã⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289843",
  "wordIds": [
   "stedt-rn-289843"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「共产主义」。",
  "donor": "共产主义",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ¹³tsʰã⁵⁵tsu⁵⁵ni¹³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289840",
  "wordIds": [
   "stedt-rn-289840"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「共青团」。",
  "donor": "共青团",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ¹³tɕʰĩ³³duã³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-204279",
  "wordIds": [
   "stedt-rn-204279"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「公路」。",
  "donor": "公路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "koŋ⁵⁵lu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-204942",
  "wordIds": [
   "stedt-rn-204942"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工资」。",
  "donor": "工资",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "koŋ⁵⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-220497",
  "wordIds": [
   "stedt-rn-220497"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「管理」。",
  "donor": "管理",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuan³⁵li⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-413062",
  "wordIds": [
   "stedt-rn-413062"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「管」。",
  "donor": "管",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuan⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290217",
  "wordIds": [
   "stedt-rn-290217"
  ],
  "kind": "借词来源",
  "text": "/kuã³³mĩ²¹/ 可能借自西南官话或湘语「光明」。",
  "donor": "光明",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuã³³mĩ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289302",
  "wordIds": [
   "stedt-rn-289302"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「光荣」。",
  "donor": "光荣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuã⁵⁵jĩ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289301",
  "wordIds": [
   "stedt-rn-289301"
  ],
  "kind": "借词来源",
  "text": "/kuã⁵⁵mĩ²¹/ 可能借自西南官话「光明」。",
  "donor": "光明",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuã⁵⁵mĩ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-378540",
  "wordIds": [
   "stedt-rn-378540"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「故事」。",
  "donor": "故事",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ku³⁵si⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288912",
  "wordIds": [
   "stedt-rn-288912"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「共产党」。",
  "donor": "共产党",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kũ³⁵tsʰã⁵⁵tã⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288916",
  "wordIds": [
   "stedt-rn-288916"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「共产主义」。",
  "donor": "共产主义",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kũ³⁵tsʰã⁵⁵tsu⁵⁵ni³⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288809",
  "wordIds": [
   "stedt-rn-288809"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「弓」。",
  "donor": "弓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kũ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288941",
  "wordIds": [
   "stedt-rn-288941"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工厂」。",
  "donor": "工厂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kũ⁵⁵tsʰã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-454186",
  "wordIds": [
   "stedt-rn-454186"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「栏杆」。",
  "donor": "栏杆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "laŋ²¹kaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-381307",
  "wordIds": [
   "stedt-rn-381307"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「南」。",
  "donor": "南",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lan²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-402052",
  "wordIds": [
   "stedt-rn-402052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「懒」。",
  "donor": "懒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lan²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-209838",
  "wordIds": [
   "stedt-rn-209838"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「劳动」。",
  "donor": "劳动",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau²¹toŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-455009",
  "wordIds": [
   "stedt-rn-455009"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「那边」。",
  "donor": "那边",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la²⁴piɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288492",
  "wordIds": [
   "stedt-rn-288492"
  ],
  "kind": "借词来源",
  "text": "/lã²¹piã⁵⁵/ 可能借自西南官话「南边」。",
  "donor": "南边",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lã²¹piã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289791",
  "wordIds": [
   "stedt-rn-289791"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蜡烛」。",
  "donor": "蜡烛",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la²¹tsu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288855",
  "wordIds": [
   "stedt-rn-288855"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蜡烛」。",
  "donor": "蜡烛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la³⁵tsu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289329",
  "wordIds": [
   "stedt-rn-289329"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「零」。",
  "donor": "零",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lẽ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290245",
  "wordIds": [
   "stedt-rn-290245"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「零」。",
  "donor": "零",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lẽ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289259",
  "wordIds": [
   "stedt-rn-289259"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「嫩」。",
  "donor": "嫩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lẽ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-200913",
  "wordIds": [
   "stedt-rn-200913"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「镰刀」。",
  "donor": "镰刀",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lian²¹tau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288733",
  "wordIds": [
   "stedt-rn-288733"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「梁」。",
  "donor": "梁",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liã²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289285",
  "wordIds": [
   "stedt-rn-289285"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「凉快」。",
  "donor": "凉快",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liã²¹kʰuai³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289672",
  "wordIds": [
   "stedt-rn-289672"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「梁」。",
  "donor": "梁",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289577",
  "wordIds": [
   "stedt-rn-289577"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「李子」。",
  "donor": "李子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li³³tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288616",
  "wordIds": [
   "stedt-rn-288616"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「落花生」。",
  "donor": "落花生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo²¹xua²¹sẽ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-367263",
  "wordIds": [
   "stedt-rn-367263"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「落花生」。",
  "donor": "落花生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo²¹xua²¹sən⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289557",
  "wordIds": [
   "stedt-rn-289557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「落花生」。",
  "donor": "落花生",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo¹³h̄ua³³sẽ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289758",
  "wordIds": [
   "stedt-rn-289758"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「箩筐」。",
  "donor": "箩筐",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo¹³kʰuã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-195813",
  "wordIds": [
   "stedt-rn-195813"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「农民」。",
  "donor": "农民",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "loŋ²¹min²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-419673",
  "wordIds": [
   "stedt-rn-419673"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「聋」。",
  "donor": "聋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "loŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184134",
  "wordIds": [
   "stedt-rn-184134"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「六月」。",
  "donor": "六月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-228096",
  "wordIds": [
   "stedt-rn-228096"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「零」。",
  "donor": "零",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lən³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-198873",
  "wordIds": [
   "stedt-rn-198873"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「帽子」。",
  "donor": "帽子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289262",
  "wordIds": [
   "stedt-rn-289262"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻利」。",
  "donor": "麻利",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma²¹li³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289510",
  "wordIds": [
   "stedt-rn-289510"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「麻雀」。",
  "donor": "麻雀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³tɕʰio²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289540",
  "wordIds": [
   "stedt-rn-289540"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蚂蟥」。",
  "donor": "蚂蟥",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³wã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-368616",
  "wordIds": [
   "stedt-rn-368616"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马食」。",
  "donor": "马食",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵³si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-375236",
  "wordIds": [
   "stedt-rn-375236"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马鞍子」。",
  "donor": "马鞍子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵³ŋan⁵⁵tsi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289251",
  "wordIds": [
   "stedt-rn-289251"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「满」。",
  "donor": "满",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288813",
  "wordIds": [
   "stedt-rn-288813"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马鞭子」。",
  "donor": "马鞭子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵piã⁵⁵tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288814",
  "wordIds": [
   "stedt-rn-288814"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马鞍子」。",
  "donor": "马鞍子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵ŋã⁵⁵tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289561",
  "wordIds": [
   "stedt-rn-289561"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「棉花」。",
  "donor": "棉花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³³h̄ua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-359381",
  "wordIds": [
   "stedt-rn-359381"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「绵羊」。",
  "donor": "绵羊",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mian²¹jian²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-200556",
  "wordIds": [
   "stedt-rn-200556"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「面条」。",
  "donor": "面条",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mian³⁵tʰiau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-205452",
  "wordIds": [
   "stedt-rn-205452"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「民歌」。",
  "donor": "民歌",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "min²¹ko³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-206370",
  "wordIds": [
   "stedt-rn-206370"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「名字」。",
  "donor": "名字",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "min²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288908",
  "wordIds": [
   "stedt-rn-288908"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「名字」。",
  "donor": "名字",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mĩ²¹tsi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289872",
  "wordIds": [
   "stedt-rn-289872"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「民主」。",
  "donor": "民主",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mĩ¹³tsu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289627",
  "wordIds": [
   "stedt-rn-289627"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「模范」。",
  "donor": "模范",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mo³³fã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-354556",
  "wordIds": [
   "stedt-rn-354556"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「木匠」。",
  "donor": "木匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu²¹tɕian³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289607",
  "wordIds": [
   "stedt-rn-289607"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「木匠」。",
  "donor": "木匠",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu²¹tɕiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-205197",
  "wordIds": [
   "stedt-rn-205197"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墨水」。",
  "donor": "墨水",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɯ³⁵sui⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289809",
  "wordIds": [
   "stedt-rn-289809"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「银行」。",
  "donor": "银行",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nĩ²¹h̄ã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288873",
  "wordIds": [
   "stedt-rn-288873"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「银行」。",
  "donor": "银行",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nĩ²¹xã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-355489",
  "wordIds": [
   "stedt-rn-355489"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「跛子」。",
  "donor": "跛子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pai⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-379898",
  "wordIds": [
   "stedt-rn-379898"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「办法」。",
  "donor": "办法",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pan³⁵xua²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pã³⁵xua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-220599",
  "wordIds": [
   "stedt-rn-220599"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「保护」。",
  "donor": "保护",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵⁵xu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290248",
  "wordIds": [
   "stedt-rn-290248"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「半」。",
  "donor": "半",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184236",
  "wordIds": [
   "stedt-rn-184236"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八月」。",
  "donor": "八月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa³⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288839",
  "wordIds": [
   "stedt-rn-288839"
  ],
  "kind": "借词来源",
  "text": "/pʰã²¹tsi²¹/ 可能借自西南官话「盘子」。",
  "donor": "盘子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰã²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289857",
  "wordIds": [
   "stedt-rn-289857"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「办法」。",
  "donor": "办法",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã¹³fa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289856",
  "wordIds": [
   "stedt-rn-289856"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「报告」。",
  "donor": "报告",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paɨ¹³kaɨ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289678",
  "wordIds": [
   "stedt-rn-289678"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「板子」。",
  "donor": "板子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-373468",
  "wordIds": [
   "stedt-rn-373468"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「盘子」。",
  "donor": "盘子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰan²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-422470",
  "wordIds": [
   "stedt-rn-422470"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「骗」。",
  "donor": "骗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰian³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289125",
  "wordIds": [
   "stedt-rn-289125"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「骗」。",
  "donor": "骗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiã³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290041",
  "wordIds": [
   "stedt-rn-290041"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「骗」。",
  "donor": "骗",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-396209",
  "wordIds": [
   "stedt-rn-396209"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「平」。",
  "donor": "平",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰin²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-373571",
  "wordIds": [
   "stedt-rn-373571"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「瓶子」。",
  "donor": "瓶子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰin²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-191988",
  "wordIds": [
   "stedt-rn-191988"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「编织」。",
  "donor": "编织",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pian³⁵ tsi⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "pian³⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-375691",
  "wordIds": [
   "stedt-rn-375691"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鞭子」。",
  "donor": "鞭子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pian⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289196",
  "wordIds": [
   "stedt-rn-289196"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「表扬」。",
  "donor": "表扬",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piau⁵⁵jiã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289752",
  "wordIds": [
   "stedt-rn-289752"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「鞭子」。",
  "donor": "鞭子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piã³³tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289178",
  "wordIds": [
   "stedt-rn-289178"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「变」。",
  "donor": "变",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piã³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290094",
  "wordIds": [
   "stedt-rn-290094"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「变」。",
  "donor": "变",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290112",
  "wordIds": [
   "stedt-rn-290112"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「表扬」。",
  "donor": "表扬",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piaɨ⁵⁵jiã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289142",
  "wordIds": [
   "stedt-rn-289142"
  ],
  "kind": "借词来源",
  "text": "/pu³⁵si³⁵/ 可能借自西南官话「不是」。",
  "donor": "不是",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu³⁵si³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-374979",
  "wordIds": [
   "stedt-rn-374979"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伞」。",
  "donor": "伞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "san³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-183981",
  "wordIds": [
   "stedt-rn-183981"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三月」。",
  "donor": "三月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "san⁵⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-185154",
  "wordIds": [
   "stedt-rn-185154"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三十日」。",
  "donor": "三十日",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "san⁵⁵si⁵⁵zi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-204687",
  "wordIds": [
   "stedt-rn-204687"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「商店」。",
  "donor": "商店",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "san⁵⁵tian³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289806",
  "wordIds": [
   "stedt-rn-289806"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「商店」。",
  "donor": "商店",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã³³dã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288513",
  "wordIds": [
   "stedt-rn-288513"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三月」。",
  "donor": "三月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵je³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288885",
  "wordIds": [
   "stedt-rn-288885"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「山歌」。",
  "donor": "山歌",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵ko⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-347269",
  "wordIds": [
   "stedt-rn-347269"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「沙子」。",
  "donor": "沙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sa⁵⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43576",
  "wordIds": [
   "stedt-rn-43576"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「神」。",
  "donor": "神",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sẽ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289198",
  "wordIds": [
   "stedt-rn-289198"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「胜利」。",
  "donor": "胜利",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sẽ³⁵li³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288917",
  "wordIds": [
   "stedt-rn-288917"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「社会主义」。",
  "donor": "社会主义",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "se³⁵xuei³⁵tsu⁵⁵ni³⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289834",
  "wordIds": [
   "stedt-rn-289834"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「姓」。",
  "donor": "姓",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sẽ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290114",
  "wordIds": [
   "stedt-rn-290114"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「胜利」。",
  "donor": "胜利",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sẽ¹³li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289844",
  "wordIds": [
   "stedt-rn-289844"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「社会主义」。",
  "donor": "社会主义",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "se¹³xuei²¹tsu⁵⁵ni¹³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289209",
  "wordIds": [
   "stedt-rn-289209"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「深」。",
  "donor": "深",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sẽ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-454503",
  "wordIds": [
   "stedt-rn-454503"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「柿子」。",
  "donor": "柿子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "si³⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288520",
  "wordIds": [
   "stedt-rn-288520"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十月」。",
  "donor": "十月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹je²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184338",
  "wordIds": [
   "stedt-rn-184338"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十月」。",
  "donor": "十月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹jie²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289199",
  "wordIds": [
   "stedt-rn-289199"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「失败」。",
  "donor": "失败",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹pai³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290115",
  "wordIds": [
   "stedt-rn-290115"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「失败」。",
  "donor": "失败",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹pai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-365266",
  "wordIds": [
   "stedt-rn-365266"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「柿子」。",
  "donor": "柿子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289854",
  "wordIds": [
   "stedt-rn-289854"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「思想」。",
  "donor": "思想",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³³ɕiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288514",
  "wordIds": [
   "stedt-rn-288514"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四月」。",
  "donor": "四月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³⁵je⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184032",
  "wordIds": [
   "stedt-rn-184032"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四月」。",
  "donor": "四月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289833",
  "wordIds": [
   "stedt-rn-289833"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「事情」。",
  "donor": "事情",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si¹³tɕĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184389",
  "wordIds": [
   "stedt-rn-184389"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十一月」。",
  "donor": "十一月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si⁵⁵ji⁵⁵jie⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184950",
  "wordIds": [
   "stedt-rn-184950"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十一日」。",
  "donor": "十一日",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si⁵⁵ji⁵⁵zi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-185052",
  "wordIds": [
   "stedt-rn-185052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十六日」。",
  "donor": "十六日",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si⁵⁵lu³⁵zi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290113",
  "wordIds": [
   "stedt-rn-290113"
  ],
  "kind": "借词来源",
  "text": "/kai⁵⁵fuã¹³/ 可能借自西南官话或湘语「解放」。",
  "donor": "解放",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai⁵⁵fuã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-185001",
  "wordIds": [
   "stedt-rn-185001"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十五日」。",
  "donor": "十五日",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si⁵⁵wu⁵⁵zi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288927",
  "wordIds": [
   "stedt-rn-288927"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「思想」。",
  "donor": "思想",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si⁵⁵ɕiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289698",
  "wordIds": [
   "stedt-rn-289698"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蓑衣」。",
  "donor": "蓑衣",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "so³³ji³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290196",
  "wordIds": [
   "stedt-rn-290196"
  ],
  "kind": "借词来源",
  "text": "/sõ³³/ 可能借自西南官话或湘语「松」。",
  "donor": "松",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sõ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288922",
  "wordIds": [
   "stedt-rn-288922"
  ],
  "kind": "借词来源",
  "text": "/wuei³⁵sẽ⁵⁵/ 可能借自西南官话「卫生」。",
  "donor": "卫生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wuei³⁵sẽ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-225240",
  "wordIds": [
   "stedt-rn-225240"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「酸」。",
  "donor": "酸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suan⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289402",
  "wordIds": [
   "stedt-rn-289402"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「霜」。",
  "donor": "霜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-203514",
  "wordIds": [
   "stedt-rn-203514"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「刷子」。",
  "donor": "刷子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sua⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288555",
  "wordIds": [
   "stedt-rn-288555"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「水獭」。",
  "donor": "水獭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui⁵⁵tʰa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289280",
  "wordIds": [
   "stedt-rn-289280"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「松」。",
  "donor": "松",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sũ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289612",
  "wordIds": [
   "stedt-rn-289612"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「书记」。",
  "donor": "书记",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su⁵⁵tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288671",
  "wordIds": [
   "stedt-rn-288671"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「书记」。",
  "donor": "书记",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su⁵⁵tɕi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289626",
  "wordIds": [
   "stedt-rn-289626"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「代表」。",
  "donor": "代表",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tai³⁵piaɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-365926",
  "wordIds": [
   "stedt-rn-365926"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「稻草」。",
  "donor": "稻草",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau³⁵tsʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-127410",
  "wordIds": [
   "stedt-rn-127410"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「胆」。",
  "donor": "胆",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tã²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-362419",
  "wordIds": [
   "stedt-rn-362419"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大雁」。",
  "donor": "大雁",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta³⁵ŋan³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289917",
  "wordIds": [
   "stedt-rn-289917"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「打扮」。",
  "donor": "打扮",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵pã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288934",
  "wordIds": [
   "stedt-rn-288934"
  ],
  "kind": "借词来源",
  "text": "/tsʰo³⁵wu³⁵/ 可能借自西南官话「错误」。",
  "donor": "错误",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰo³⁵wu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288933",
  "wordIds": [
   "stedt-rn-288933"
  ],
  "kind": "借词来源",
  "text": "/tɕʰe²¹tiã⁵⁵/ 可能借自西南官话「缺点」。",
  "donor": "缺点",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰe²¹tiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288936",
  "wordIds": [
   "stedt-rn-288936"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「态度」。",
  "donor": "态度",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰai³⁵tu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289863",
  "wordIds": [
   "stedt-rn-289863"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「态度」。",
  "donor": "态度",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰai¹³tu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-348052",
  "wordIds": [
   "stedt-rn-348052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「炭」。",
  "donor": "炭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰan³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-368144",
  "wordIds": [
   "stedt-rn-368144"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「汤」。",
  "donor": "汤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰan⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289715",
  "wordIds": [
   "stedt-rn-289715"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「汤」。",
  "donor": "汤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-427847",
  "wordIds": [
   "stedt-rn-427847"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「跳舞」。",
  "donor": "跳舞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiau³⁵wu⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288831",
  "wordIds": [
   "stedt-rn-288831"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「挑桶」。",
  "donor": "挑桶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiau⁵⁵tʰũ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289287",
  "wordIds": [
   "stedt-rn-289287"
  ],
  "kind": "借词来源",
  "text": "/tʰiã²¹/ 可能借自西南官话「甜」。",
  "donor": "甜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiã²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290009",
  "wordIds": [
   "stedt-rn-290009"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「跳舞」。",
  "donor": "跳舞",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiaɨ¹³wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-204228",
  "wordIds": [
   "stedt-rn-204228"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铁路」。",
  "donor": "铁路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰie²¹lu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289782",
  "wordIds": [
   "stedt-rn-289782"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「梯子」。",
  "donor": "梯子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰi³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289487",
  "wordIds": [
   "stedt-rn-289487"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「兔子」。",
  "donor": "兔子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu²¹tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288871",
  "wordIds": [
   "stedt-rn-288871"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铜钱」。",
  "donor": "铜钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰũ²¹tɕʰiã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289824",
  "wordIds": [
   "stedt-rn-289824"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「电影」。",
  "donor": "电影",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã²¹jĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43565",
  "wordIds": [
   "stedt-rn-43565"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「癫子」。",
  "donor": "癫子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã³³ tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288897",
  "wordIds": [
   "stedt-rn-288897"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电影」。",
  "donor": "电影",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã³⁵jĩ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288852",
  "wordIds": [
   "stedt-rn-288852"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电话」。",
  "donor": "电话",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã³⁵xua³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289788",
  "wordIds": [
   "stedt-rn-289788"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「电话」。",
  "donor": "电话",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã¹³h̄ua⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289943",
  "wordIds": [
   "stedt-rn-289943"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「点」。",
  "donor": "点",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43422",
  "wordIds": [
   "stedt-rn-43422"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「癫子」。",
  "donor": "癫子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã⁵⁵ tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-409610",
  "wordIds": [
   "stedt-rn-409610"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钉」。",
  "donor": "钉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tin⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-205809",
  "wordIds": [
   "stedt-rn-205809"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「笛子」。",
  "donor": "笛子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²¹tsi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-355180",
  "wordIds": [
   "stedt-rn-355180"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「敌人」。",
  "donor": "敌人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²¹zən²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-195150",
  "wordIds": [
   "stedt-rn-195150"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「敌人」。",
  "donor": "敌人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²¹zən²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-228249",
  "wordIds": [
   "stedt-rn-228249"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第八」。",
  "donor": "第八",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³¹pa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290246",
  "wordIds": [
   "stedt-rn-290246"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「第一」。",
  "donor": "第一",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³⁵ji³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-228198",
  "wordIds": [
   "stedt-rn-228198"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第五」。",
  "donor": "第五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³⁵wu⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290247",
  "wordIds": [
   "stedt-rn-290247"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「第五」。",
  "donor": "第五",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³⁵wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289331",
  "wordIds": [
   "stedt-rn-289331"
  ],
  "kind": "借词来源",
  "text": "/ti³⁵wu⁵⁵/ 可能借自西南官话「第五」。",
  "donor": "第五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³⁵wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289450",
  "wordIds": [
   "stedt-rn-289450"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冬」。",
  "donor": "冬",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tõ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-381256",
  "wordIds": [
   "stedt-rn-381256"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「东」。",
  "donor": "东",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "toŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43354",
  "wordIds": [
   "stedt-rn-43354"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「爪子」。",
  "donor": "爪子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵ tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-361042",
  "wordIds": [
   "stedt-rn-361042"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「爪子」。",
  "donor": "爪子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-200046",
  "wordIds": [
   "stedt-rn-200046"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「早饭」。",
  "donor": "早饭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵xuan³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43501",
  "wordIds": [
   "stedt-rn-43501"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「爪子」。",
  "donor": "爪子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaɨ⁵⁵ tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289864",
  "wordIds": [
   "stedt-rn-289864"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「经验」。",
  "donor": "经验",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ³³niã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289304",
  "wordIds": [
   "stedt-rn-289304"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正确」。",
  "donor": "正确",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ³⁵kʰo²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288925",
  "wordIds": [
   "stedt-rn-288925"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「政策」。",
  "donor": "政策",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ³⁵tsʰe²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288918",
  "wordIds": [
   "stedt-rn-288918"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「政治」。",
  "donor": "政治",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ³⁵tsi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290220",
  "wordIds": [
   "stedt-rn-290220"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「正确」。",
  "donor": "正确",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ³⁵tɕʰio²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290148",
  "wordIds": [
   "stedt-rn-290148"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「正」。",
  "donor": "正",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289838",
  "wordIds": [
   "stedt-rn-289838"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「政府」。",
  "donor": "政府",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ¹³fu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289852",
  "wordIds": [
   "stedt-rn-289852"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「政策」。",
  "donor": "政策",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ¹³tsʰe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289845",
  "wordIds": [
   "stedt-rn-289845"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「政治」。",
  "donor": "政治",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ¹³tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288511",
  "wordIds": [
   "stedt-rn-288511"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正月」。",
  "donor": "正月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ⁵⁵je⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289772",
  "wordIds": [
   "stedt-rn-289772"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「砧板」。",
  "donor": "砧板",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ⁵⁵pã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288932",
  "wordIds": [
   "stedt-rn-288932"
  ],
  "kind": "借词来源",
  "text": "/jiu⁵⁵tiã⁵⁵/ 可能借自西南官话「优点」。",
  "donor": "优点",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiu⁵⁵tiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-198618",
  "wordIds": [
   "stedt-rn-198618"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「仓库」。",
  "donor": "仓库",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰan⁵⁵kʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288741",
  "wordIds": [
   "stedt-rn-288741"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「城」。",
  "donor": "城",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰẽ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-stedt-rn-289801",
 "wordIds": [
  "stedt-rn-289801"
 ],
 "kind": "借词来源",
 "text": "可能借自湘语「车子」。",
 "donor": "车子",
 "donorVariety": "湘语",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tsʰe³³tsi²¹",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "ma-car-dragonfly-2026-10-23"
},
 {
  "id": "chinese-loan-stedt-rn-289345",
  "wordIds": [
   "stedt-rn-289345"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「寸」。",
  "donor": "寸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰẽ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288865",
  "wordIds": [
   "stedt-rn-288865"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「车子」。",
  "donor": "车子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰe⁵⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-204381",
  "wordIds": [
   "stedt-rn-204381"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「车子」。",
  "donor": "车子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰie³⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288920",
  "wordIds": [
   "stedt-rn-288920"
  ],
  "kind": "借词来源",
  "text": "/wẽ²¹xua³⁵/ 可能借自西南官话「文化」。",
  "donor": "文化",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wẽ²¹xua³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-199842",
  "wordIds": [
   "stedt-rn-199842"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「绸子」。",
  "donor": "绸子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰou²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-226056",
  "wordIds": [
   "stedt-rn-226056"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「错误」。",
  "donor": "错误",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰo³⁵wu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289861",
  "wordIds": [
   "stedt-rn-289861"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「错误」。",
  "donor": "错误",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰo¹³wu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289674",
  "wordIds": [
   "stedt-rn-289674"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「窗户」。",
  "donor": "窗户",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuã³³fu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288506",
  "wordIds": [
   "stedt-rn-288506"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「春」。",
  "donor": "春",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuẽ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289470",
  "wordIds": [
   "stedt-rn-289470"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初一」。",
  "donor": "初一",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289472",
  "wordIds": [
   "stedt-rn-289472"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初三」。",
  "donor": "初三",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288529",
  "wordIds": [
   "stedt-rn-288529"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初一」。",
  "donor": "初一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵ji³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-384635",
  "wordIds": [
   "stedt-rn-384635"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初一」。",
  "donor": "初一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵ji⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184797",
  "wordIds": [
   "stedt-rn-184797"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初一」。",
  "donor": "初一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵ji⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184848",
  "wordIds": [
   "stedt-rn-184848"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初三」。",
  "donor": "初三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵san⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tsʰu⁵⁵sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-357174",
  "wordIds": [
   "stedt-rn-357174"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「侄子」。",
  "donor": "侄子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-197496",
  "wordIds": [
   "stedt-rn-197496"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「侄子」。",
  "donor": "侄子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi³¹tsi³¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288946",
  "wordIds": [
   "stedt-rn-288946"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「自由」。",
  "donor": "自由",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi³⁵jiu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288725",
  "wordIds": [
   "stedt-rn-288725"
  ],
  "kind": "借词来源",
  "text": "/tsi³⁵ni⁵⁵tsi⁵⁵/ 可能借自西南官话「侄女子」。",
  "donor": "侄女子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi³⁵ni⁵⁵tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-197547",
  "wordIds": [
   "stedt-rn-197547"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「侄女」。",
  "donor": "侄女",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi³⁵ȵi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289663",
  "wordIds": [
   "stedt-rn-289663"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「侄子」。",
  "donor": "侄子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289747",
  "wordIds": [
   "stedt-rn-289747"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「子弹」。",
  "donor": "子弹",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi⁵⁵tã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289778",
  "wordIds": [
   "stedt-rn-289778"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「桌子」。",
  "donor": "桌子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tso²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289853",
  "wordIds": [
   "stedt-rn-289853"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「总路线」。",
  "donor": "总路线",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsõ⁵⁵lu³⁵ɕiã¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288903",
  "wordIds": [
   "stedt-rn-288903"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钟」。",
  "donor": "钟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsũ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288926",
  "wordIds": [
   "stedt-rn-288926"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「总路线」。",
  "donor": "总路线",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsũ⁵⁵lu³⁵ɕiã³⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288664",
  "wordIds": [
   "stedt-rn-288664"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「主人家」。",
  "donor": "主人家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵⁵zẽ²¹ka²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288664--south",
  "wordIds": [
   "stedt-rn-288664--south"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「主人家」。",
  "donor": "主人家",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵⁵zẽ²¹ka²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-355957",
  "wordIds": [
   "stedt-rn-355957"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「主人」。",
  "donor": "主人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵⁵zən²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288667--south",
  "wordIds": [
   "stedt-rn-288667--south"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「主席」。",
  "donor": "主席",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵⁵ɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-398902",
  "wordIds": [
   "stedt-rn-398902"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「真」。",
  "donor": "真",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsən³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-384788",
  "wordIds": [
   "stedt-rn-384788"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正月」。",
  "donor": "正月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsən⁵⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289762",
  "wordIds": [
   "stedt-rn-289762"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「大锅」。",
  "donor": "大锅",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu̵²¹ku̵²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288509",
  "wordIds": [
   "stedt-rn-288509"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冬」。",
  "donor": "冬",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tũ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-374829",
  "wordIds": [
   "stedt-rn-374829"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钉子」。",
  "donor": "钉子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tən⁵⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43430",
  "wordIds": [
   "stedt-rn-43430"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「胆子」。",
  "donor": "胆子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɑ̃⁵⁵ tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-374099",
  "wordIds": [
   "stedt-rn-374099"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钳钳」。",
  "donor": "钳钳",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰian³⁵tɕʰian²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289210",
  "wordIds": [
   "stedt-rn-289210"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「浅」。",
  "donor": "浅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289326",
  "wordIds": [
   "stedt-rn-289326"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「千」。",
  "donor": "千",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288761",
  "wordIds": [
   "stedt-rn-288761"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「裙子」。",
  "donor": "裙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-stedt-rn-289803",
 "wordIds": [
  "stedt-rn-289803"
 ],
 "kind": "借词来源",
 "text": "可能借自湘语「汽车」。",
 "donor": "汽车",
 "donorVariety": "湘语",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tɕʰi³³tsʰe³³",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "ma-car-dragonfly-2026-10-23"
},
 {
  "id": "chinese-loan-stedt-rn-184185",
  "wordIds": [
   "stedt-rn-184185"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「七月」。",
  "donor": "七月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289860",
  "wordIds": [
   "stedt-rn-289860"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「缺点」。",
  "donor": "缺点",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰye¹³tiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-415603",
  "wordIds": [
   "stedt-rn-415603"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「剪」。",
  "donor": "剪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕian⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-401627",
  "wordIds": [
   "stedt-rn-401627"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狡猾」。",
  "donor": "狡猾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau²¹xua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289573",
  "wordIds": [
   "stedt-rn-289573"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「姜」。",
  "donor": "姜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288810",
  "wordIds": [
   "stedt-rn-288810"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箭」。",
  "donor": "箭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290101",
  "wordIds": [
   "stedt-rn-290101"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「建设」。",
  "donor": "建设",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³⁵se²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289185",
  "wordIds": [
   "stedt-rn-289185"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「建设」。",
  "donor": "建设",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³⁵se³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289749",
  "wordIds": [
   "stedt-rn-289749"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「箭」。",
  "donor": "箭",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289211",
  "wordIds": [
   "stedt-rn-289211"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尖」。",
  "donor": "尖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289961",
  "wordIds": [
   "stedt-rn-289961"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「剪」。",
  "donor": "剪",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290117",
  "wordIds": [
   "stedt-rn-290117"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「检查」。",
  "donor": "检查",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵dza²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-203361",
  "wordIds": [
   "stedt-rn-203361"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「镜子」。",
  "donor": "镜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕin³⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289855",
  "wordIds": [
   "stedt-rn-289855"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「觉悟」。",
  "donor": "觉悟",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕio⁵⁵wu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289644",
  "wordIds": [
   "stedt-rn-289644"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「舅母」。",
  "donor": "舅母",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiu̵¹³mõ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184287",
  "wordIds": [
   "stedt-rn-184287"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「九月」。",
  "donor": "九月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiu⁵⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43540",
  "wordIds": [
   "stedt-rn-43540"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「筋」。",
  "donor": "筋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289307",
  "wordIds": [
   "stedt-rn-289307"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「积极」。",
  "donor": "积极",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi²¹tɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289307--south",
  "wordIds": [
   "stedt-rn-289307--south"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「积极」。",
  "donor": "积极",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi²¹tɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289587",
  "wordIds": [
   "stedt-rn-289587"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「茎」。",
  "donor": "茎",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289420",
  "wordIds": [
   "stedt-rn-289420"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「金子」。",
  "donor": "金子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289734",
  "wordIds": [
   "stedt-rn-289734"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「机器」。",
  "donor": "机器",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³³tɕʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289846",
  "wordIds": [
   "stedt-rn-289846"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「经济」。",
  "donor": "经济",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³tɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290197",
  "wordIds": [
   "stedt-rn-290197"
  ],
  "kind": "借词来源",
  "text": "/tɕĩ³³/ 可能借自西南官话或湘语「紧」。",
  "donor": "紧",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288938",
  "wordIds": [
   "stedt-rn-288938"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「计划」。",
  "donor": "计划",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³⁵xua³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289865",
  "wordIds": [
   "stedt-rn-289865"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「计划」。",
  "donor": "计划",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi¹³h̄ua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289867",
  "wordIds": [
   "stedt-rn-289867"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「技术」。",
  "donor": "技术",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi¹³su³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290049",
  "wordIds": [
   "stedt-rn-290049"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「记得」。",
  "donor": "记得",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi¹³tɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289281",
  "wordIds": [
   "stedt-rn-289281"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「紧」。",
  "donor": "紧",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-360517",
  "wordIds": [
   "stedt-rn-360517"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鸡冠」。",
  "donor": "鸡冠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi⁵⁵kuan⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288937",
  "wordIds": [
   "stedt-rn-288937"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「经验」。",
  "donor": "经验",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵niã³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-206625",
  "wordIds": [
   "stedt-rn-206625"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「记号」。",
  "donor": "记号",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi⁵⁵xau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289566",
  "wordIds": [
   "stedt-rn-289566"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「黄瓜」。",
  "donor": "黄瓜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wã¹³kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290219",
  "wordIds": [
   "stedt-rn-290219"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「伟大」。",
  "donor": "伟大",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wei⁵⁵ta³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289847",
  "wordIds": [
   "stedt-rn-289847"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「文化」。",
  "donor": "文化",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wẽ²¹h̄ua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290145",
  "wordIds": [
   "stedt-rn-290145"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「横」。",
  "donor": "横",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wẽ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-200148",
  "wordIds": [
   "stedt-rn-200148"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「晚饭」。",
  "donor": "晚饭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wuan⁵⁵xuan³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289327",
  "wordIds": [
   "stedt-rn-289327"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「万」。",
  "donor": "万",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wuã³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289327--south",
  "wordIds": [
   "stedt-rn-289327--south"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「万」。",
  "donor": "万",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wuã³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288764",
  "wordIds": [
   "stedt-rn-288764"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「袜子」。",
  "donor": "袜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wua³⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289849",
  "wordIds": [
   "stedt-rn-289849"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「卫生」。",
  "donor": "卫生",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wuei¹³sẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289303",
  "wordIds": [
   "stedt-rn-289303"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伟大」。",
  "donor": "伟大",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wuei⁵⁵ta³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289529",
  "wordIds": [
   "stedt-rn-289529"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蜈蚣」。",
  "donor": "蜈蚣",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu³³kõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-184083",
  "wordIds": [
   "stedt-rn-184083"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「五月」。",
  "donor": "五月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu⁵⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-436933",
  "wordIds": [
   "stedt-rn-436933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乌龟」。",
  "donor": "乌龟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu⁵⁵kui⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289136",
  "wordIds": [
   "stedt-rn-289136"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「恨」。",
  "donor": "恨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xẽ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-201729",
  "wordIds": [
   "stedt-rn-201729"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火药」。",
  "donor": "火药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵jiu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-190407",
  "wordIds": [
   "stedt-rn-190407"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黄瓜」。",
  "donor": "黄瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuan⁵⁵kua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289202",
  "wordIds": [
   "stedt-rn-289202"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「反对」。",
  "donor": "反对",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã⁵⁵tuei³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289310",
  "wordIds": [
   "stedt-rn-289310"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「反动」。",
  "donor": "反动",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã⁵⁵tũ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-186735",
  "wordIds": [
   "stedt-rn-186735"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狐狸」。",
  "donor": "狐狸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu²¹li²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289059",
  "wordIds": [
   "stedt-rn-289059"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「染」。",
  "donor": "染",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289841",
  "wordIds": [
   "stedt-rn-289841"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「人民」。",
  "donor": "人民",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zẽ³³mĩ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288931",
  "wordIds": [
   "stedt-rn-288931"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「任务」。",
  "donor": "任务",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zẽ³⁵wu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289858",
  "wordIds": [
   "stedt-rn-289858"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「任务」。",
  "donor": "任务",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zẽ¹³wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-201984",
  "wordIds": [
   "stedt-rn-201984"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鞍子」。",
  "donor": "鞍子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋan⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289753",
  "wordIds": [
   "stedt-rn-289753"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「鞍子」。",
  "donor": "鞍子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋã³³tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-223761",
  "wordIds": [
   "stedt-rn-223761"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年轻」。",
  "donor": "年轻",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵian³⁵tɕʰin⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-225495",
  "wordIds": [
   "stedt-rn-225495"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「香」。",
  "donor": "香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕian⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-430084",
  "wordIds": [
   "stedt-rn-430084"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「相信」。",
  "donor": "相信",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕian⁵⁵ɕin³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-189591",
  "wordIds": [
   "stedt-rn-189591"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小麦」。",
  "donor": "小麦",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵⁵mɯe²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290207",
  "wordIds": [
   "stedt-rn-290207"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「香」。",
  "donor": "香",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289783",
  "wordIds": [
   "stedt-rn-289783"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「箱子」。",
  "donor": "箱子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288670",
  "wordIds": [
   "stedt-rn-288670"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「县长」。",
  "donor": "县长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã³⁵tsã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289611",
  "wordIds": [
   "stedt-rn-289611"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「县长」。",
  "donor": "县长",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã¹³tsã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289291",
  "wordIds": [
   "stedt-rn-289291"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「香」。",
  "donor": "香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289308",
  "wordIds": [
   "stedt-rn-289308"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「先进」。",
  "donor": "先进",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã⁵⁵tɕĩ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-380315",
  "wordIds": [
   "stedt-rn-380315"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「姓」。",
  "donor": "姓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕin³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289491",
  "wordIds": [
   "stedt-rn-289491"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「熊」。",
  "donor": "熊",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiõ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-195966",
  "wordIds": [
   "stedt-rn-195966"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「学生」。",
  "donor": "学生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕio³⁵sən⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289819",
  "wordIds": [
   "stedt-rn-289819"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「信」。",
  "donor": "信",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕĩ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288635",
  "wordIds": [
   "stedt-rn-288635"
  ],
  "kind": "借词来源",
  "text": "/tʰau²¹tsi²¹/ 可能借自西南官话「桃子」。",
  "donor": "桃子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰau²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290221",
  "wordIds": [
   "stedt-rn-290221"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「幸福」。",
  "donor": "幸福",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕĩ³⁵fu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288883",
  "wordIds": [
   "stedt-rn-288883"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「信」。",
  "donor": "信",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕĩ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290086",
  "wordIds": [
   "stedt-rn-290086"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「旋」。",
  "donor": "旋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕyã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60757-v-0041",
  "wordIds": [
   "yubao-60757-v-0041"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「淹」。",
  "donor": "淹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋan²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60757-v-2277",
  "wordIds": [
   "yubao-60757-v-2277"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尸体」。",
  "donor": "尸体",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɘ²⁴tʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0015",
  "wordIds": [
   "yubao-60756-v-0015"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冰雹」。",
  "donor": "冰雹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piŋ⁵⁵pʰau⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0018",
  "wordIds": [
   "yubao-60756-v-0018"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「露水」。",
  "donor": "露水",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³³sui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0044",
  "wordIds": [
   "yubao-60756-v-0044"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「地震」。",
  "donor": "地震",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³tseŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0051",
  "wordIds": [
   "yubao-60756-v-0051"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「沙子」。",
  "donor": "沙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sa⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0052",
  "wordIds": [
   "yubao-60756-v-0052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「砖」。",
  "donor": "砖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0079",
  "wordIds": [
   "yubao-60756-v-0079"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年初」。",
  "donor": "年初",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵaŋ³³tsʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0080",
  "wordIds": [
   "yubao-60756-v-0080"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年底」。",
  "donor": "年底",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵaŋ³³ti⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0091",
  "wordIds": [
   "yubao-60756-v-0091"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「上午」。",
  "donor": "上午",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵u⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0101",
  "wordIds": [
   "yubao-60756-v-0101"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「清明」。",
  "donor": "清明",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵⁵miŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0102",
  "wordIds": [
   "yubao-60756-v-0102"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「端午」。",
  "donor": "端午",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuaŋ⁵⁵u³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0105",
  "wordIds": [
   "yubao-60756-v-0105"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冬至」。",
  "donor": "冬至",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0119",
  "wordIds": [
   "yubao-60756-v-0119"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「左边」。",
  "donor": "左边",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔ⁵³piaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0121",
  "wordIds": [
   "yubao-60756-v-0121"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中间」。",
  "donor": "中间",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵kaŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0155",
  "wordIds": [
   "yubao-60756-v-0155"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「荷花」。",
  "donor": "荷花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ³³xua⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0165",
  "wordIds": [
   "yubao-60756-v-0165"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「柑子」。",
  "donor": "柑子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0167",
  "wordIds": [
   "yubao-60756-v-0167"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「柿子」。",
  "donor": "柿子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0168",
  "wordIds": [
   "yubao-60756-v-0168"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「石榴」。",
  "donor": "石榴",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³liu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0169",
  "wordIds": [
   "yubao-60756-v-0169"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「枣子」。",
  "donor": "枣子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0176",
  "wordIds": [
   "yubao-60756-v-0176"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「香菇」。",
  "donor": "香菇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ⁵⁵ku⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0179",
  "wordIds": [
   "yubao-60756-v-0179"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「稻草」。",
  "donor": "稻草",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau³³tsʰau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0186",
  "wordIds": [
   "yubao-60756-v-0186"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉花」。",
  "donor": "棉花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miaŋ³³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0188",
  "wordIds": [
   "yubao-60756-v-0188"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「芝麻」。",
  "donor": "芝麻",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵⁵ma³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0192",
  "wordIds": [
   "yubao-60756-v-0192"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「落花生」。",
  "donor": "落花生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɔ³³xua³³seŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0194",
  "wordIds": [
   "yubao-60756-v-0194"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「绿豆」。",
  "donor": "绿豆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³³təu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0200",
  "wordIds": [
   "yubao-60756-v-0200"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「莴笋」。",
  "donor": "莴笋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɔ⁵⁵sun³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0208",
  "wordIds": [
   "yubao-60756-v-0208"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「茄子」。",
  "donor": "茄子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰe³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0212",
  "wordIds": [
   "yubao-60756-v-0212"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黄瓜」。",
  "donor": "黄瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uaŋ³³kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0213",
  "wordIds": [
   "yubao-60756-v-0213"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「丝瓜」。",
  "donor": "丝瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0216",
  "wordIds": [
   "yubao-60756-v-0216"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「红苕」。",
  "donor": "红苕",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔŋ³³sau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0230",
  "wordIds": [
   "yubao-60756-v-0230"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鸽子」。",
  "donor": "鸽子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔ³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0232",
  "wordIds": [
   "yubao-60756-v-0232"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「爪子」。",
  "donor": "爪子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsua⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0261",
  "wordIds": [
   "yubao-60756-v-0261"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「骡子」。",
  "donor": "骡子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɔ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0312",
  "wordIds": [
   "yubao-60756-v-0312"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大门」。",
  "donor": "大门",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵meŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0315",
  "wordIds": [
   "yubao-60756-v-0315"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「梯子」。",
  "donor": "梯子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰi⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0319",
  "wordIds": [
   "yubao-60756-v-0319"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「家具」。",
  "donor": "家具",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕa⁵⁵tɕi⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0322",
  "wordIds": [
   "yubao-60756-v-0322"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「床」。",
  "donor": "床",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0328",
  "wordIds": [
   "yubao-60756-v-0328"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「席子」。",
  "donor": "席子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0330",
  "wordIds": [
   "yubao-60756-v-0330"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桌子」。",
  "donor": "桌子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔ³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0331",
  "wordIds": [
   "yubao-60756-v-0331"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「柜子」。",
  "donor": "柜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kui³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0332",
  "wordIds": [
   "yubao-60756-v-0332"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「抽屉」。",
  "donor": "抽屉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰəu⁵⁵tʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0341",
  "wordIds": [
   "yubao-60756-v-0341"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「瓶子」。",
  "donor": "瓶子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiŋ³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0350",
  "wordIds": [
   "yubao-60756-v-0350"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「热水瓶」。",
  "donor": "热水瓶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ze³³sui³³pʰiŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0358",
  "wordIds": [
   "yubao-60756-v-0358"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「剪刀」。",
  "donor": "剪刀",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕaŋ⁵⁵tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0359",
  "wordIds": [
   "yubao-60756-v-0359"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蜡烛」。",
  "donor": "蜡烛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la³³tsu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0361",
  "wordIds": [
   "yubao-60756-v-0361"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伞」。",
  "donor": "伞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0367",
  "wordIds": [
   "yubao-60756-v-0367"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「衬衫」。",
  "donor": "衬衫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰeŋ³³saŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0368",
  "wordIds": [
   "yubao-60756-v-0368"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「背心」。",
  "donor": "背心",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe³³ɕiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0376",
  "wordIds": [
   "yubao-60756-v-0376"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「帽子」。",
  "donor": "帽子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0378",
  "wordIds": [
   "yubao-60756-v-0378"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「袜子」。",
  "donor": "袜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ua³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0380",
  "wordIds": [
   "yubao-60756-v-0380"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「围裙」。",
  "donor": "围裙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ui³³tɕʰiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0382",
  "wordIds": [
   "yubao-60756-v-0382"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扣子」。",
  "donor": "扣子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰəu³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0391",
  "wordIds": [
   "yubao-60756-v-0391"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「面条」。",
  "donor": "面条",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miaŋ⁵⁵tʰiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0394",
  "wordIds": [
   "yubao-60756-v-0394"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「包子」。",
  "donor": "包子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0399",
  "wordIds": [
   "yubao-60756-v-0399"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「豆浆」。",
  "donor": "豆浆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "təu³³tɕaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0402",
  "wordIds": [
   "yubao-60756-v-0402"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「粽子」。",
  "donor": "粽子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0454",
  "wordIds": [
   "yubao-60756-v-0454"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「相貌」。",
  "donor": "相貌",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ³³mau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0469",
  "wordIds": [
   "yubao-60756-v-0469"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「下巴」。",
  "donor": "下巴",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xa³³pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0476",
  "wordIds": [
   "yubao-60756-v-0476"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「左手」。",
  "donor": "左手",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔ⁵³səu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0483",
  "wordIds": [
   "yubao-60756-v-0483"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「无名指」。",
  "donor": "无名指",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u³³miŋ³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0529",
  "wordIds": [
   "yubao-60756-v-0529"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「媒人」。",
  "donor": "媒人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³³zeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0537",
  "wordIds": [
   "yubao-60756-v-0537"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「新郎子」。",
  "donor": "新郎子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ⁵⁵laŋ⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0538",
  "wordIds": [
   "yubao-60756-v-0538"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「新娘子」。",
  "donor": "新娘子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ⁵⁵ȵaŋ⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0539",
  "wordIds": [
   "yubao-60756-v-0539"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「孕妇」。",
  "donor": "孕妇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zun³³xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0549",
  "wordIds": [
   "yubao-60756-v-0549"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「生日」。",
  "donor": "生日",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "seŋ³⁵zɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0553",
  "wordIds": [
   "yubao-60756-v-0553"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「自杀」。",
  "donor": "自杀",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ³³sa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0568",
  "wordIds": [
   "yubao-60756-v-0568"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「和尚」。",
  "donor": "和尚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ³³saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0569",
  "wordIds": [
   "yubao-60756-v-0569"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尼姑」。",
  "donor": "尼姑",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵi³³ku³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0570",
  "wordIds": [
   "yubao-60756-v-0570"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「道士」。",
  "donor": "道士",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau³³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0583",
  "wordIds": [
   "yubao-60756-v-0583"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老人家」。",
  "donor": "老人家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵zeŋ⁵⁵ka⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0591",
  "wordIds": [
   "yubao-60756-v-0591"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「泥水匠」。",
  "donor": "泥水匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵi³³sui³³tɕaŋ³⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0592",
  "wordIds": [
   "yubao-60756-v-0592"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「木匠」。",
  "donor": "木匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu³³tɕaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0596",
  "wordIds": [
   "yubao-60756-v-0596"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「师傅」。",
  "donor": "师傅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0599",
  "wordIds": [
   "yubao-60756-v-0599"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「妓女」。",
  "donor": "妓女",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³³ȵi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0603",
  "wordIds": [
   "yubao-60756-v-0603"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「聋子」。",
  "donor": "聋子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɔŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0607",
  "wordIds": [
   "yubao-60756-v-0607"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「癫子」。",
  "donor": "癫子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiaŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0639",
  "wordIds": [
   "yubao-60756-v-0639"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「嫂子」。",
  "donor": "嫂子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sau⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0645",
  "wordIds": [
   "yubao-60756-v-0645"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「妹夫」。",
  "donor": "妹夫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me⁵⁵xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0662",
  "wordIds": [
   "yubao-60756-v-0662"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「名字」。",
  "donor": "名字",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miŋ³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0678",
  "wordIds": [
   "yubao-60756-v-0678"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「独轮车」。",
  "donor": "独轮车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu³³lun³⁵tsʰe⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0679",
  "wordIds": [
   "yubao-60756-v-0679"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「轮子」。",
  "donor": "轮子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lun³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0685",
  "wordIds": [
   "yubao-60756-v-0685"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「打工」。",
  "donor": "打工",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵kɔŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0688",
  "wordIds": [
   "yubao-60756-v-0688"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「起子」。",
  "donor": "起子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0689",
  "wordIds": [
   "yubao-60756-v-0689"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锤子」。",
  "donor": "锤子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰui³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0690",
  "wordIds": [
   "yubao-60756-v-0690"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钉子」。",
  "donor": "钉子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "teŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0694",
  "wordIds": [
   "yubao-60756-v-0694"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「商店」。",
  "donor": "商店",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵tiaŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0699",
  "wordIds": [
   "yubao-60756-v-0699"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「合算」。",
  "donor": "合算",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ³³suaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0701",
  "wordIds": [
   "yubao-60756-v-0701"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亏本」。",
  "donor": "亏本",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰui⁵⁵peŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0702",
  "wordIds": [
   "yubao-60756-v-0702"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铜钱」。",
  "donor": "铜钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔŋ³³tɕʰaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0704",
  "wordIds": [
   "yubao-60756-v-0704"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「硬币」。",
  "donor": "硬币",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋeŋ³³pi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0705",
  "wordIds": [
   "yubao-60756-v-0705"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「本钱」。",
  "donor": "本钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "peŋ⁵⁵tɕʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0707",
  "wordIds": [
   "yubao-60756-v-0707"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「路费」。",
  "donor": "路费",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³³xui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0709",
  "wordIds": [
   "yubao-60756-v-0709"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「赚」。",
  "donor": "赚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuaŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0712",
  "wordIds": [
   "yubao-60756-v-0712"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「算盘」。",
  "donor": "算盘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suaŋ⁵⁵pʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0722",
  "wordIds": [
   "yubao-60756-v-0722"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「考试」。",
  "donor": "考试",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰau³⁵sɿ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0723",
  "wordIds": [
   "yubao-60756-v-0723"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「书包」。",
  "donor": "书包",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su⁵⁵pau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0724",
  "wordIds": [
   "yubao-60756-v-0724"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「本子」。",
  "donor": "本子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "peŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0726",
  "wordIds": [
   "yubao-60756-v-0726"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钢笔」。",
  "donor": "钢笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ³⁵pi⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0728",
  "wordIds": [
   "yubao-60756-v-0728"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「毛笔」。",
  "donor": "毛笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau³³pi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0731",
  "wordIds": [
   "yubao-60756-v-0731"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「信」。",
  "donor": "信",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0732",
  "wordIds": [
   "yubao-60756-v-0732"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「连环画」。",
  "donor": "连环画",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liaŋ³³xuaŋ³³xua⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0736",
  "wordIds": [
   "yubao-60756-v-0736"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「风筝」。",
  "donor": "风筝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔŋ⁵⁵tseŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0741",
  "wordIds": [
   "yubao-60756-v-0741"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锣鼓家什」。",
  "donor": "锣鼓家什",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɔ³³ku³³tɕa³³sɿ³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0743",
  "wordIds": [
   "yubao-60756-v-0743"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「笛子」。",
  "donor": "笛子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0752",
  "wordIds": [
   "yubao-60756-v-0752"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「串门」。",
  "donor": "串门",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuaŋ⁵⁵meŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0797",
  "wordIds": [
   "yubao-60756-v-0797"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「挺」。",
  "donor": "挺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰeŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0811",
  "wordIds": [
   "yubao-60756-v-0811"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「挡」。",
  "donor": "挡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0857",
  "wordIds": [
   "yubao-60756-v-0857"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「掺」。",
  "donor": "掺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0875",
  "wordIds": [
   "yubao-60756-v-0875"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「打算」。",
  "donor": "打算",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta³⁵suaŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0879",
  "wordIds": [
   "yubao-60756-v-0879"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「相信」。",
  "donor": "相信",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ⁵⁵ɕiŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0890",
  "wordIds": [
   "yubao-60756-v-0890"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「后悔」。",
  "donor": "后悔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xəu³³xui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0891",
  "wordIds": [
   "yubao-60756-v-0891"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「忌妒」。",
  "donor": "忌妒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³³tu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0895",
  "wordIds": [
   "yubao-60756-v-0895"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「装」。",
  "donor": "装",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0914",
  "wordIds": [
   "yubao-60756-v-0914"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肯」。",
  "donor": "肯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰeŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0933",
  "wordIds": [
   "yubao-60756-v-0933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「对不起」。",
  "donor": "对不起",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tui³³pu³³tɕʰi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0943",
  "wordIds": [
   "yubao-60756-v-0943"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「宽」。",
  "donor": "宽",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰuaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0952",
  "wordIds": [
   "yubao-60756-v-0952"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「深」。",
  "donor": "深",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "seŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0954",
  "wordIds": [
   "yubao-60756-v-0954"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「清」。",
  "donor": "清",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0960",
  "wordIds": [
   "yubao-60756-v-0960"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「平」。",
  "donor": "平",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0980",
  "wordIds": [
   "yubao-60756-v-0980"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「弯」。",
  "donor": "弯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0988",
  "wordIds": [
   "yubao-60756-v-0988"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亮」。",
  "donor": "亮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liaŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0992",
  "wordIds": [
   "yubao-60756-v-0992"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「凉」。",
  "donor": "凉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1003",
  "wordIds": [
   "yubao-60756-v-1003"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「慢」。",
  "donor": "慢",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "maŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1007",
  "wordIds": [
   "yubao-60756-v-1007"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「松」。",
  "donor": "松",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɔŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1008",
  "wordIds": [
   "yubao-60756-v-1008"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「紧」。",
  "donor": "紧",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1014",
  "wordIds": [
   "yubao-60756-v-1014"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年轻人」。",
  "donor": "年轻人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵaŋ³³tɕʰiŋ³³zeŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1031",
  "wordIds": [
   "yubao-60756-v-1031"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「味道」。",
  "donor": "味道",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ui³³tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1036",
  "wordIds": [
   "yubao-60756-v-1036"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「甜」。",
  "donor": "甜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1052",
  "wordIds": [
   "yubao-60756-v-1052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「懒」。",
  "donor": "懒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "laŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1055",
  "wordIds": [
   "yubao-60756-v-1055"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老实」。",
  "donor": "老实",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1058",
  "wordIds": [
   "yubao-60756-v-1058"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大方」。",
  "donor": "大方",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta³³xuaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1072",
  "wordIds": [
   "yubao-60756-v-1072"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「二十」。",
  "donor": "二十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɚ³⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1073",
  "wordIds": [
   "yubao-60756-v-1073"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三十」。",
  "donor": "三十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1080",
  "wordIds": [
   "yubao-60756-v-1080"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「二两」。",
  "donor": "二两",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɚ³³liaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1084",
  "wordIds": [
   "yubao-60756-v-1084"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「个把」。",
  "donor": "个把",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔ³³pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1106",
  "wordIds": [
   "yubao-60756-v-1106"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「辆」。",
  "donor": "辆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1128",
  "wordIds": [
   "yubao-60756-v-1128"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「趟」。",
  "donor": "趟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1187",
  "wordIds": [
   "yubao-60756-v-1187"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「随便」。",
  "donor": "随便",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui³³piaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1189",
  "wordIds": [
   "yubao-60756-v-1189"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肯定」。",
  "donor": "肯定",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰeŋ⁵⁵teŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1190",
  "wordIds": [
   "yubao-60756-v-1190"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「可能」。",
  "donor": "可能",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɔ⁵⁵leŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1197",
  "wordIds": [
   "yubao-60756-v-1197"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「按」。",
  "donor": "按",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1199",
  "wordIds": [
   "yubao-60756-v-1199"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「如果」。",
  "donor": "如果",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zu³³kɔ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1200",
  "wordIds": [
   "yubao-60756-v-1200"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「不管」。",
  "donor": "不管",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu³³kuaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1206",
  "wordIds": [
   "yubao-60756-v-1206"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「北极星」。",
  "donor": "北极星",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe³³tɕi³⁵ɕiŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1230",
  "wordIds": [
   "yubao-60756-v-1230"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「荒山」。",
  "donor": "荒山",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ⁵⁵saŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1240",
  "wordIds": [
   "yubao-60756-v-1240"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「梯田」。",
  "donor": "梯田",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰi⁵⁵tʰiaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1245",
  "wordIds": [
   "yubao-60756-v-1245"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「荒山」。",
  "donor": "荒山",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ⁵⁵saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1275",
  "wordIds": [
   "yubao-60756-v-1275"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「地洞」。",
  "donor": "地洞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³tɔŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1276",
  "wordIds": [
   "yubao-60756-v-1276"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洞口」。",
  "donor": "洞口",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ³³kʰəu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1278",
  "wordIds": [
   "yubao-60756-v-1278"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「岔路」。",
  "donor": "岔路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa³³lu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1279",
  "wordIds": [
   "yubao-60756-v-1279"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大路」。",
  "donor": "大路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta³³lu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1281",
  "wordIds": [
   "yubao-60756-v-1281"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「公路」。",
  "donor": "公路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ³⁵lu⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1284",
  "wordIds": [
   "yubao-60756-v-1284"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「渡口」。",
  "donor": "渡口",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu³³kʰəu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1290",
  "wordIds": [
   "yubao-60756-v-1290"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「渣滓」。",
  "donor": "渣滓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsa⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1291",
  "wordIds": [
   "yubao-60756-v-1291"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「煤渣子」。",
  "donor": "煤渣子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³³tsa³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1293",
  "wordIds": [
   "yubao-60756-v-1293"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「金子」。",
  "donor": "金子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1295",
  "wordIds": [
   "yubao-60756-v-1295"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铜」。",
  "donor": "铜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1299",
  "wordIds": [
   "yubao-60756-v-1299"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钢」。",
  "donor": "钢",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1306",
  "wordIds": [
   "yubao-60756-v-1306"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「玻璃」。",
  "donor": "玻璃",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɔ⁵³li³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1307",
  "wordIds": [
   "yubao-60756-v-1307"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「硫磺」。",
  "donor": "硫磺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liu³³xuaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1322",
  "wordIds": [
   "yubao-60756-v-1322"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火铲」。",
  "donor": "火铲",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ⁵⁵tsʰaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1327",
  "wordIds": [
   "yubao-60756-v-1327"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「温水」。",
  "donor": "温水",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "un⁵⁵sui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1328",
  "wordIds": [
   "yubao-60756-v-1328"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「碱水」。",
  "donor": "碱水",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕaŋ⁵⁵sui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1329",
  "wordIds": [
   "yubao-60756-v-1329"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「春天」。",
  "donor": "春天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰun⁵⁵tʰiaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1330",
  "wordIds": [
   "yubao-60756-v-1330"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「夏天」。",
  "donor": "夏天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕa³³tʰiaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1332",
  "wordIds": [
   "yubao-60756-v-1332"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冬天」。",
  "donor": "冬天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ⁵⁵tʰiaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1336",
  "wordIds": [
   "yubao-60756-v-1336"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「上半年」。",
  "donor": "上半年",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵paŋ⁵⁵ȵaŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1337",
  "wordIds": [
   "yubao-60756-v-1337"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「下半年」。",
  "donor": "下半年",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕa⁵⁵paŋ⁵⁵ȵaŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1355",
  "wordIds": [
   "yubao-60756-v-1355"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初二」。",
  "donor": "初二",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵ɚ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1356",
  "wordIds": [
   "yubao-60756-v-1356"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初三」。",
  "donor": "初三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1357",
  "wordIds": [
   "yubao-60756-v-1357"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初四」。",
  "donor": "初四",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵sɿ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1358",
  "wordIds": [
   "yubao-60756-v-1358"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初五」。",
  "donor": "初五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵u⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1359",
  "wordIds": [
   "yubao-60756-v-1359"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初六」。",
  "donor": "初六",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵lu⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1360",
  "wordIds": [
   "yubao-60756-v-1360"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初七」。",
  "donor": "初七",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵tɕʰi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1361",
  "wordIds": [
   "yubao-60756-v-1361"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初八」。",
  "donor": "初八",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵pa³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1363",
  "wordIds": [
   "yubao-60756-v-1363"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初十」。",
  "donor": "初十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵sɿ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1365",
  "wordIds": [
   "yubao-60756-v-1365"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「半天」。",
  "donor": "半天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ³³tʰiaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1367",
  "wordIds": [
   "yubao-60756-v-1367"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「东」。",
  "donor": "东",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1368",
  "wordIds": [
   "yubao-60756-v-1368"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「南」。",
  "donor": "南",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "naŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1371",
  "wordIds": [
   "yubao-60756-v-1371"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正面」。",
  "donor": "正面",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ³³miaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1375",
  "wordIds": [
   "yubao-60756-v-1375"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「对岸」。",
  "donor": "对岸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tui³³ŋaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1382",
  "wordIds": [
   "yubao-60756-v-1382"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中间」。",
  "donor": "中间",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵kaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1383",
  "wordIds": [
   "yubao-60756-v-1383"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「樟树」。",
  "donor": "樟树",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ⁵⁵su⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1397",
  "wordIds": [
   "yubao-60756-v-1397"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「万年青」。",
  "donor": "万年青",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uaŋ³³ȵaŋ⁵⁵tɕʰiŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1414",
  "wordIds": [
   "yubao-60756-v-1414"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「西瓜」。",
  "donor": "西瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1425",
  "wordIds": [
   "yubao-60756-v-1425"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「柑子」。",
  "donor": "柑子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1428",
  "wordIds": [
   "yubao-60756-v-1428"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「无花果」。",
  "donor": "无花果",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u³³xua⁵⁵kɔ⁵³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1436",
  "wordIds": [
   "yubao-60756-v-1436"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「仙人掌」。",
  "donor": "仙人掌",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ⁵⁵zeŋ⁵⁵tsaŋ⁵³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1442",
  "wordIds": [
   "yubao-60756-v-1442"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「菊花」。",
  "donor": "菊花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³³xua⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1443",
  "wordIds": [
   "yubao-60756-v-1443"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桂花」。",
  "donor": "桂花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kui³³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1452",
  "wordIds": [
   "yubao-60756-v-1452"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「金银花」。",
  "donor": "金银花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵ȵiŋ⁵⁵xua⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1457",
  "wordIds": [
   "yubao-60756-v-1457"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「水葫芦」。",
  "donor": "水葫芦",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui⁵⁵xu⁵⁵lu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1481",
  "wordIds": [
   "yubao-60756-v-1481"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「篾条」。",
  "donor": "篾条",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mie⁵⁵tʰiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1488",
  "wordIds": [
   "yubao-60756-v-1488"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「粮食」。",
  "donor": "粮食",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liaŋ³³sɿ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1515",
  "wordIds": [
   "yubao-60756-v-1515"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「豆子」。",
  "donor": "豆子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "təu³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1521",
  "wordIds": [
   "yubao-60756-v-1521"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「毛冬瓜」。",
  "donor": "毛冬瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau³³tɔŋ³³kua³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1522",
  "wordIds": [
   "yubao-60756-v-1522"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苦瓜」。",
  "donor": "苦瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵³kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1544",
  "wordIds": [
   "yubao-60756-v-1544"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狮子」。",
  "donor": "狮子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1557",
  "wordIds": [
   "yubao-60756-v-1557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狐狸」。",
  "donor": "狐狸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu³³li³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1558",
  "wordIds": [
   "yubao-60756-v-1558"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狼」。",
  "donor": "狼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "laŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1583",
  "wordIds": [
   "yubao-60756-v-1583"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「画眉」。",
  "donor": "画眉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua⁵⁵mi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1584",
  "wordIds": [
   "yubao-60756-v-1584"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「白鹤」。",
  "donor": "白鹤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe³³xɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1591",
  "wordIds": [
   "yubao-60756-v-1591"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麝香」。",
  "donor": "麝香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "se³³ɕaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1594",
  "wordIds": [
   "yubao-60756-v-1594"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蟒蛇」。",
  "donor": "蟒蛇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "maŋ⁵⁵se⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1595",
  "wordIds": [
   "yubao-60756-v-1595"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「水蛇」。",
  "donor": "水蛇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui⁵⁵se⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1600",
  "wordIds": [
   "yubao-60756-v-1600"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「七寸」。",
  "donor": "七寸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³tsʰun⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1607",
  "wordIds": [
   "yubao-60756-v-1607"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大壁虎」。",
  "donor": "大壁虎",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵pʰi⁵⁵xu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1616",
  "wordIds": [
   "yubao-60756-v-1616"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蚕丝」。",
  "donor": "蚕丝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ³³sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1621",
  "wordIds": [
   "yubao-60756-v-1621"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蜂王」。",
  "donor": "蜂王",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔŋ⁵⁵uaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1633",
  "wordIds": [
   "yubao-60756-v-1633"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「臭虫」。",
  "donor": "臭虫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰəu⁵⁵tsʰɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1634",
  "wordIds": [
   "yubao-60756-v-1634"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「毛虫」。",
  "donor": "毛虫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau³³tsʰɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1642",
  "wordIds": [
   "yubao-60756-v-1642"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乌龟」。",
  "donor": "乌龟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u⁵⁵kui⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1649",
  "wordIds": [
   "yubao-60756-v-1649"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黄鳝」。",
  "donor": "黄鳝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uaŋ³³saŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1667",
  "wordIds": [
   "yubao-60756-v-1667"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「绒毛」。",
  "donor": "绒毛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zɔŋ³³mau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1724",
  "wordIds": [
   "yubao-60756-v-1724"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「仓库」。",
  "donor": "仓库",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ³⁵kʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1726",
  "wordIds": [
   "yubao-60756-v-1726"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「草棚」。",
  "donor": "草棚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰau⁵⁵pʰɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1732",
  "wordIds": [
   "yubao-60756-v-1732"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「梁」。",
  "donor": "梁",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1742",
  "wordIds": [
   "yubao-60756-v-1742"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桩子」。",
  "donor": "桩子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuaŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1746",
  "wordIds": [
   "yubao-60756-v-1746"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「板子」。",
  "donor": "板子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1748",
  "wordIds": [
   "yubao-60756-v-1748"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「楼板」。",
  "donor": "楼板",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ləu³³paŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1749",
  "wordIds": [
   "yubao-60756-v-1749"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「板子」。",
  "donor": "板子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1750",
  "wordIds": [
   "yubao-60756-v-1750"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「天花板」。",
  "donor": "天花板",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiaŋ⁵⁵xua³³paŋ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1762",
  "wordIds": [
   "yubao-60756-v-1762"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箱子」。",
  "donor": "箱子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1763",
  "wordIds": [
   "yubao-60756-v-1763"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「木箱子」。",
  "donor": "木箱子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu³³ɕaŋ³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1769",
  "wordIds": [
   "yubao-60756-v-1769"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电视」。",
  "donor": "电视",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiaŋ³³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1770",
  "wordIds": [
   "yubao-60756-v-1770"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冰箱」。",
  "donor": "冰箱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piŋ⁵⁵ɕaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1772",
  "wordIds": [
   "yubao-60756-v-1772"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电灯」。",
  "donor": "电灯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiaŋ³³teŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1773",
  "wordIds": [
   "yubao-60756-v-1773"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「灯泡」。",
  "donor": "灯泡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "teŋ³⁵pʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1774",
  "wordIds": [
   "yubao-60756-v-1774"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电线」。",
  "donor": "电线",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiaŋ³³ɕaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1780",
  "wordIds": [
   "yubao-60756-v-1780"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「灯笼」。",
  "donor": "灯笼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "teŋ⁵⁵lɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1788",
  "wordIds": [
   "yubao-60756-v-1788"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「盘子」。",
  "donor": "盘子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰaŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1793",
  "wordIds": [
   "yubao-60756-v-1793"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「抹布」。",
  "donor": "抹布",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³pu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1798",
  "wordIds": [
   "yubao-60756-v-1798"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「炉子」。",
  "donor": "炉子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1810",
  "wordIds": [
   "yubao-60756-v-1810"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「刷子」。",
  "donor": "刷子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sua³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1820",
  "wordIds": [
   "yubao-60756-v-1820"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「木碗」。",
  "donor": "木碗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu³³uaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1822",
  "wordIds": [
   "yubao-60756-v-1822"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「盘子」。",
  "donor": "盘子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰaŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1827",
  "wordIds": [
   "yubao-60756-v-1827"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「缺口」。",
  "donor": "缺口",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰe³³kʰəu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1828",
  "wordIds": [
   "yubao-60756-v-1828"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「刀面」。",
  "donor": "刀面",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau⁵⁵miaŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1829",
  "wordIds": [
   "yubao-60756-v-1829"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「背面」。",
  "donor": "背面",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe³³miaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1833",
  "wordIds": [
   "yubao-60756-v-1833"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「瓦罐」。",
  "donor": "瓦罐",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ua⁵⁵kuaŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1834",
  "wordIds": [
   "yubao-60756-v-1834"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「杯子」。",
  "donor": "杯子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1835",
  "wordIds": [
   "yubao-60756-v-1835"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「玻璃杯」。",
  "donor": "玻璃杯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɔ⁵⁵li⁵⁵pe⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1837",
  "wordIds": [
   "yubao-60756-v-1837"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「茶杯子」。",
  "donor": "茶杯子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa³³pe³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1838",
  "wordIds": [
   "yubao-60756-v-1838"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蒸笼」。",
  "donor": "蒸笼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ⁵⁵lɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1840",
  "wordIds": [
   "yubao-60756-v-1840"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箅子」。",
  "donor": "箅子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1843",
  "wordIds": [
   "yubao-60756-v-1843"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「水壶」。",
  "donor": "水壶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui⁵⁵xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1850",
  "wordIds": [
   "yubao-60756-v-1850"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钻子」。",
  "donor": "钻子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuaŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1852",
  "wordIds": [
   "yubao-60756-v-1852"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墨斗」。",
  "donor": "墨斗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³³təu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1854",
  "wordIds": [
   "yubao-60756-v-1854"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铁丝」。",
  "donor": "铁丝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰie³³sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1858",
  "wordIds": [
   "yubao-60756-v-1858"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「梭子」。",
  "donor": "梭子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɔ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1865",
  "wordIds": [
   "yubao-60756-v-1865"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火枪」。",
  "donor": "火枪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ⁵³tɕʰaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1871",
  "wordIds": [
   "yubao-60756-v-1871"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「毒箭」。",
  "donor": "毒箭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu³³tɕaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1886",
  "wordIds": [
   "yubao-60756-v-1886"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锥子」。",
  "donor": "锥子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsui⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1890",
  "wordIds": [
   "yubao-60756-v-1890"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「手表」。",
  "donor": "手表",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "səu⁵⁵piau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1895",
  "wordIds": [
   "yubao-60756-v-1895"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钱包」。",
  "donor": "钱包",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰaŋ³³pau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1907",
  "wordIds": [
   "yubao-60756-v-1907"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「花瓶」。",
  "donor": "花瓶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua⁵⁵pʰiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1908",
  "wordIds": [
   "yubao-60756-v-1908"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「花盆」。",
  "donor": "花盆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua⁵⁵pʰeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1914",
  "wordIds": [
   "yubao-60756-v-1914"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「磨盘」。",
  "donor": "磨盘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɔ⁵⁵pʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1918",
  "wordIds": [
   "yubao-60756-v-1918"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「推剪」。",
  "donor": "推剪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰui⁵⁵tɕaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1932",
  "wordIds": [
   "yubao-60756-v-1932"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铁箍子」。",
  "donor": "铁箍子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰie³³ku⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1933",
  "wordIds": [
   "yubao-60756-v-1933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「门帘子」。",
  "donor": "门帘子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "meŋ³³liaŋ⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1934",
  "wordIds": [
   "yubao-60756-v-1934"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火镰」。",
  "donor": "火镰",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ⁵⁵liaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1935",
  "wordIds": [
   "yubao-60756-v-1935"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火盆」。",
  "donor": "火盆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ⁵⁵pʰeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1940",
  "wordIds": [
   "yubao-60756-v-1940"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「拖拉机」。",
  "donor": "拖拉机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔ³³la³³tɕi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1946",
  "wordIds": [
   "yubao-60756-v-1946"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「手机」。",
  "donor": "手机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "səu⁵⁵tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1949",
  "wordIds": [
   "yubao-60756-v-1949"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉布」。",
  "donor": "棉布",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miaŋ³³pu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1950",
  "wordIds": [
   "yubao-60756-v-1950"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻布」。",
  "donor": "麻布",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³pu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1954",
  "wordIds": [
   "yubao-60756-v-1954"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉线」。",
  "donor": "棉线",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miaŋ³³ɕaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1955",
  "wordIds": [
   "yubao-60756-v-1955"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻线」。",
  "donor": "麻线",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³ɕaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1957",
  "wordIds": [
   "yubao-60756-v-1957"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「绸子」。",
  "donor": "绸子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰəu³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1968",
  "wordIds": [
   "yubao-60756-v-1968"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扣眼」。",
  "donor": "扣眼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰəu³³ŋaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1973",
  "wordIds": [
   "yubao-60756-v-1973"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「裙子」。",
  "donor": "裙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1988",
  "wordIds": [
   "yubao-60756-v-1988"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「草帽子」。",
  "donor": "草帽子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰau⁵⁵mau⁵⁵tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1989",
  "wordIds": [
   "yubao-60756-v-1989"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「皮帽」。",
  "donor": "皮帽",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰi³³mau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1990",
  "wordIds": [
   "yubao-60756-v-1990"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉帽」。",
  "donor": "棉帽",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miaŋ³³mau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1991",
  "wordIds": [
   "yubao-60756-v-1991"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「手套」。",
  "donor": "手套",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "səu⁵⁵tʰau⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2000",
  "wordIds": [
   "yubao-60756-v-2000"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「项链」。",
  "donor": "项链",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xaŋ⁵⁵liaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2010",
  "wordIds": [
   "yubao-60756-v-2010"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扣肉」。",
  "donor": "扣肉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰəu⁵⁵zu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2011",
  "wordIds": [
   "yubao-60756-v-2011"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「腊肉」。",
  "donor": "腊肉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la³³zu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2013",
  "wordIds": [
   "yubao-60756-v-2013"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「五花肉」。",
  "donor": "五花肉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u⁵⁵xua⁵⁵zu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2024",
  "wordIds": [
   "yubao-60756-v-2024"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「烧饼」。",
  "donor": "烧饼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sau⁵⁵piŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2031",
  "wordIds": [
   "yubao-60756-v-2031"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「汤」。",
  "donor": "汤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2038",
  "wordIds": [
   "yubao-60756-v-2038"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「糖」。",
  "donor": "糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2039",
  "wordIds": [
   "yubao-60756-v-2039"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「白糖」。",
  "donor": "白糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe³³tʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2040",
  "wordIds": [
   "yubao-60756-v-2040"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冰糖」。",
  "donor": "冰糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piŋ⁵⁵tʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2041",
  "wordIds": [
   "yubao-60756-v-2041"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「红糖」。",
  "donor": "红糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔŋ³³tʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2044",
  "wordIds": [
   "yubao-60756-v-2044"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「浓茶」。",
  "donor": "浓茶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵɔŋ³³tsʰa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2052",
  "wordIds": [
   "yubao-60756-v-2052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八角香」。",
  "donor": "八角香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa³³kɔ³³ɕaŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2053",
  "wordIds": [
   "yubao-60756-v-2053"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桂皮」。",
  "donor": "桂皮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kui⁵⁵pʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2068",
  "wordIds": [
   "yubao-60756-v-2068"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「硬饭」。",
  "donor": "硬饭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋeŋ³³xuaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2070",
  "wordIds": [
   "yubao-60756-v-2070"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「碎米」。",
  "donor": "碎米",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui³³mi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2072",
  "wordIds": [
   "yubao-60756-v-2072"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「寡蛋」。",
  "donor": "寡蛋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kua⁵⁵taŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2080",
  "wordIds": [
   "yubao-60756-v-2080"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肌肉」。",
  "donor": "肌肉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi⁵⁵zu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2097",
  "wordIds": [
   "yubao-60756-v-2097"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「筋」。",
  "donor": "筋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2133",
  "wordIds": [
   "yubao-60756-v-2133"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「门牙」。",
  "donor": "门牙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "meŋ³³ŋa³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2145",
  "wordIds": [
   "yubao-60756-v-2145"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八字胡」。",
  "donor": "八字胡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa³³tsɿ³³xu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2155",
  "wordIds": [
   "yubao-60756-v-2155"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「汗毛」。",
  "donor": "汗毛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xaŋ³³mau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2160",
  "wordIds": [
   "yubao-60756-v-2160"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「虎口」。",
  "donor": "虎口",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu⁵³kʰəu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2168",
  "wordIds": [
   "yubao-60756-v-2168"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「响屁」。",
  "donor": "响屁",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ⁵⁵pʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2172",
  "wordIds": [
   "yubao-60756-v-2172"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「子宫」。",
  "donor": "子宫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵³kɔŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2184",
  "wordIds": [
   "yubao-60756-v-2184"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大病」。",
  "donor": "大病",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta³³piŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2185",
  "wordIds": [
   "yubao-60756-v-2185"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「内伤」。",
  "donor": "内伤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lui³³saŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2202",
  "wordIds": [
   "yubao-60756-v-2202"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「忌口」。",
  "donor": "忌口",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³³kʰəu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2207",
  "wordIds": [
   "yubao-60756-v-2207"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「感冒」。",
  "donor": "感冒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵mau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2208",
  "wordIds": [
   "yubao-60756-v-2208"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「传染」。",
  "donor": "传染",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuaŋ³³zaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2211",
  "wordIds": [
   "yubao-60756-v-2211"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「按摩」。",
  "donor": "按摩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋaŋ⁵⁵mɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2213",
  "wordIds": [
   "yubao-60756-v-2213"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「发汗」。",
  "donor": "发汗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua³³xaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2219",
  "wordIds": [
   "yubao-60756-v-2219"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻风」。",
  "donor": "麻风",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³xɔŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2224",
  "wordIds": [
   "yubao-60756-v-2224"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「痢疾」。",
  "donor": "痢疾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li³⁵tɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2225",
  "wordIds": [
   "yubao-60756-v-2225"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「瘫痪」。",
  "donor": "瘫痪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ⁵⁵xuaŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2229",
  "wordIds": [
   "yubao-60756-v-2229"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伤口」。",
  "donor": "伤口",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵kʰəu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2232",
  "wordIds": [
   "yubao-60756-v-2232"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「痔疮」。",
  "donor": "痔疮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ³³tsʰuaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2233",
  "wordIds": [
   "yubao-60756-v-2233"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冻疮」。",
  "donor": "冻疮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɔŋ³³tsʰuaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2238",
  "wordIds": [
   "yubao-60756-v-2238"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「梅毒」。",
  "donor": "梅毒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³³tu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2239",
  "wordIds": [
   "yubao-60756-v-2239"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伤口」。",
  "donor": "伤口",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵kʰəu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2243",
  "wordIds": [
   "yubao-60756-v-2243"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伤」。",
  "donor": "伤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2248",
  "wordIds": [
   "yubao-60756-v-2248"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻子」。",
  "donor": "麻子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2254",
  "wordIds": [
   "yubao-60756-v-2254"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「左撇子」。",
  "donor": "左撇子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔ⁵⁵pʰie⁵³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2256",
  "wordIds": [
   "yubao-60756-v-2256"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「近视」。",
  "donor": "近视",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2264",
  "wordIds": [
   "yubao-60756-v-2264"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「瘫痪」。",
  "donor": "瘫痪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ⁵⁵xuaŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2275",
  "wordIds": [
   "yubao-60756-v-2275"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年纪」。",
  "donor": "年纪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵaŋ³³tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2276",
  "wordIds": [
   "yubao-60756-v-2276"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「送葬」。",
  "donor": "送葬",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɔŋ³³tsaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2277",
  "wordIds": [
   "yubao-60756-v-2277"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尸体」。",
  "donor": "尸体",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sə³³tʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2282",
  "wordIds": [
   "yubao-60756-v-2282"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「土葬」。",
  "donor": "土葬",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵tsaŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2289",
  "wordIds": [
   "yubao-60756-v-2289"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「打卦」。",
  "donor": "打卦",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵kua⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2297",
  "wordIds": [
   "yubao-60756-v-2297"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「经书」。",
  "donor": "经书",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵su³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2305",
  "wordIds": [
   "yubao-60756-v-2305"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「高个子」。",
  "donor": "高个子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kau⁵⁵kɔ⁵³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2306",
  "wordIds": [
   "yubao-60756-v-2306"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「光头」。",
  "donor": "光头",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuaŋ⁵⁵tʰəu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2309",
  "wordIds": [
   "yubao-60756-v-2309"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年轻人」。",
  "donor": "年轻人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵaŋ³³tɕʰiŋ³³zeŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2312",
  "wordIds": [
   "yubao-60756-v-2312"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「熟人」。",
  "donor": "熟人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su³³zeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2316",
  "wordIds": [
   "yubao-60756-v-2316"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工人」。",
  "donor": "工人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ⁵⁵zeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2317",
  "wordIds": [
   "yubao-60756-v-2317"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「官」。",
  "donor": "官",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2318",
  "wordIds": [
   "yubao-60756-v-2318"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「头子」。",
  "donor": "头子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰəu³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2319",
  "wordIds": [
   "yubao-60756-v-2319"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「土司王」。",
  "donor": "土司王",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵³sɿ³³uaŋ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2323",
  "wordIds": [
   "yubao-60756-v-2323"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老板」。",
  "donor": "老板",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵paŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2326",
  "wordIds": [
   "yubao-60756-v-2326"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「骗子」。",
  "donor": "骗子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiaŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2327",
  "wordIds": [
   "yubao-60756-v-2327"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「胖子」。",
  "donor": "胖子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰaŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2330",
  "wordIds": [
   "yubao-60756-v-2330"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老百姓」。",
  "donor": "老百姓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵pe⁵³ɕiŋ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2331",
  "wordIds": [
   "yubao-60756-v-2331"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「姓」。",
  "donor": "姓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2333",
  "wordIds": [
   "yubao-60756-v-2333"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「兵」。",
  "donor": "兵",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2334",
  "wordIds": [
   "yubao-60756-v-2334"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老师」。",
  "donor": "老师",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2336",
  "wordIds": [
   "yubao-60756-v-2336"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「敌人」。",
  "donor": "敌人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³zeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2341",
  "wordIds": [
   "yubao-60756-v-2341"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「证人」。",
  "donor": "证人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ⁵⁵zeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2344",
  "wordIds": [
   "yubao-60756-v-2344"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「接生婆」。",
  "donor": "接生婆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕe³³seŋ³³pʰɔ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2349",
  "wordIds": [
   "yubao-60756-v-2349"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「篾匠」。",
  "donor": "篾匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mie³³tɕaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2350",
  "wordIds": [
   "yubao-60756-v-2350"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铁匠」。",
  "donor": "铁匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰie³³tɕaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2356",
  "wordIds": [
   "yubao-60756-v-2356"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「私生子」。",
  "donor": "私生子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³seŋ³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2357",
  "wordIds": [
   "yubao-60756-v-2357"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「犯人」。",
  "donor": "犯人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ⁵⁵zeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2359",
  "wordIds": [
   "yubao-60756-v-2359"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「长辈」。",
  "donor": "长辈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ³⁵pe⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2367",
  "wordIds": [
   "yubao-60756-v-2367"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「姊妹」。",
  "donor": "姊妹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵⁵me³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2372",
  "wordIds": [
   "yubao-60756-v-2372"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「表姐」。",
  "donor": "表姐",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piau⁵⁵tɕe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2373",
  "wordIds": [
   "yubao-60756-v-2373"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「表妹」。",
  "donor": "表妹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piau⁵⁵me⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2374",
  "wordIds": [
   "yubao-60756-v-2374"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「表哥」。",
  "donor": "表哥",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piau⁵⁵kɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2375",
  "wordIds": [
   "yubao-60756-v-2375"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「表弟」。",
  "donor": "表弟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piau³⁵ti⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2377",
  "wordIds": [
   "yubao-60756-v-2377"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「侄女子」。",
  "donor": "侄女子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ³³ȵi⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2382",
  "wordIds": [
   "yubao-60756-v-2382"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老祖宗」。",
  "donor": "老祖宗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵tsu⁵⁵tsɔŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2383",
  "wordIds": [
   "yubao-60756-v-2383"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「孤儿」。",
  "donor": "孤儿",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ku⁵⁵ɚ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2384",
  "wordIds": [
   "yubao-60756-v-2384"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「母女俩」。",
  "donor": "母女俩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu⁵⁵ȵi⁵⁵liaŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2398",
  "wordIds": [
   "yubao-60756-v-2398"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亲家」。",
  "donor": "亲家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ³³ka³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2399",
  "wordIds": [
   "yubao-60756-v-2399"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亲家公」。",
  "donor": "亲家公",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ³³ka³³kɔŋ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2400",
  "wordIds": [
   "yubao-60756-v-2400"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亲家母」。",
  "donor": "亲家母",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ³³ka³³mu³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2401",
  "wordIds": [
   "yubao-60756-v-2401"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「父子」。",
  "donor": "父子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2402",
  "wordIds": [
   "yubao-60756-v-2402"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「父女」。",
  "donor": "父女",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu³³ȵi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2403",
  "wordIds": [
   "yubao-60756-v-2403"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「母子」。",
  "donor": "母子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2416",
  "wordIds": [
   "yubao-60756-v-2416"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「收割」。",
  "donor": "收割",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "səu³⁵kɔ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2419",
  "wordIds": [
   "yubao-60756-v-2419"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肥料」。",
  "donor": "肥料",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xui³³liau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2430",
  "wordIds": [
   "yubao-60756-v-2430"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铲子」。",
  "donor": "铲子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2436",
  "wordIds": [
   "yubao-60756-v-2436"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铡刀」。",
  "donor": "铡刀",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsa³³tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2442",
  "wordIds": [
   "yubao-60756-v-2442"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「风车」。",
  "donor": "风车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔŋ³³tsʰe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2447",
  "wordIds": [
   "yubao-60756-v-2447"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鞭子」。",
  "donor": "鞭子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piaŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2454",
  "wordIds": [
   "yubao-60756-v-2454"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马棚」。",
  "donor": "马棚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵pʰɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2457",
  "wordIds": [
   "yubao-60756-v-2457"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「笼子」。",
  "donor": "笼子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɔŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2483",
  "wordIds": [
   "yubao-60756-v-2483"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火车」。",
  "donor": "火车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ⁵³tsʰe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2484",
  "wordIds": [
   "yubao-60756-v-2484"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「汽车」。",
  "donor": "汽车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³tsʰe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2489",
  "wordIds": [
   "yubao-60756-v-2489"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电话」。",
  "donor": "电话",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiaŋ³³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2490",
  "wordIds": [
   "yubao-60756-v-2490"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「机器」。",
  "donor": "机器",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi⁵⁵tɕʰi⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2505",
  "wordIds": [
   "yubao-60756-v-2505"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「政府」。",
  "donor": "政府",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ³³xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2506",
  "wordIds": [
   "yubao-60756-v-2506"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乡政府」。",
  "donor": "乡政府",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ⁵⁵tseŋ³³xu³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2507",
  "wordIds": [
   "yubao-60756-v-2507"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「省」。",
  "donor": "省",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "seŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2509",
  "wordIds": [
   "yubao-60756-v-2509"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「村」。",
  "donor": "村",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰun⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2510",
  "wordIds": [
   "yubao-60756-v-2510"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「章子」。",
  "donor": "章子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2511",
  "wordIds": [
   "yubao-60756-v-2511"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「私章」。",
  "donor": "私章",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵tsaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2512",
  "wordIds": [
   "yubao-60756-v-2512"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「记号」。",
  "donor": "记号",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³³xau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2514",
  "wordIds": [
   "yubao-60756-v-2514"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黑板」。",
  "donor": "黑板",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xe³³paŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2524",
  "wordIds": [
   "yubao-60756-v-2524"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「放假」。",
  "donor": "放假",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ³³tɕa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2534",
  "wordIds": [
   "yubao-60756-v-2534"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「跳舞」。",
  "donor": "跳舞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiau³³u³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2539",
  "wordIds": [
   "yubao-60756-v-2539"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「琴」。",
  "donor": "琴",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2551",
  "wordIds": [
   "yubao-60756-v-2551"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「相片」。",
  "donor": "相片",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ³³pʰiaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2555",
  "wordIds": [
   "yubao-60756-v-2555"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墨汁」。",
  "donor": "墨汁",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2556",
  "wordIds": [
   "yubao-60756-v-2556"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「糨糊」。",
  "donor": "糨糊",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕaŋ⁵⁵xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2557",
  "wordIds": [
   "yubao-60756-v-2557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「地图」。",
  "donor": "地图",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti⁵⁵tʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2558",
  "wordIds": [
   "yubao-60756-v-2558"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「图画」。",
  "donor": "图画",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu³³xua³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2561",
  "wordIds": [
   "yubao-60756-v-2561"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「算」。",
  "donor": "算",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suaŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2564",
  "wordIds": [
   "yubao-60756-v-2564"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「减」。",
  "donor": "减",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2569",
  "wordIds": [
   "yubao-60756-v-2569"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「对歌」。",
  "donor": "对歌",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tui³³kɔ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2643",
  "wordIds": [
   "yubao-60756-v-2643"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「争」。",
  "donor": "争",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2644",
  "wordIds": [
   "yubao-60756-v-2644"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「吃亏」。",
  "donor": "吃亏",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵³kʰui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2645",
  "wordIds": [
   "yubao-60756-v-2645"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「上当」。",
  "donor": "上当",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ³³taŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2646",
  "wordIds": [
   "yubao-60756-v-2646"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「道歉」。",
  "donor": "道歉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau³³tɕʰaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2652",
  "wordIds": [
   "yubao-60756-v-2652"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「赌博」。",
  "donor": "赌博",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu⁵⁵pɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2660",
  "wordIds": [
   "yubao-60756-v-2660"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「点头」。",
  "donor": "点头",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiaŋ⁵⁵tʰəu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2668",
  "wordIds": [
   "yubao-60756-v-2668"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「弹」。",
  "donor": "弹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2684",
  "wordIds": [
   "yubao-60756-v-2684"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「躺」。",
  "donor": "躺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2697",
  "wordIds": [
   "yubao-60756-v-2697"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「翻」。",
  "donor": "翻",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2707",
  "wordIds": [
   "yubao-60756-v-2707"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「染」。",
  "donor": "染",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2727",
  "wordIds": [
   "yubao-60756-v-2727"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「服侍」。",
  "donor": "服侍",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu⁵⁵sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2728",
  "wordIds": [
   "yubao-60756-v-2728"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「认罪」。",
  "donor": "认罪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zeŋ³³tsui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2729",
  "wordIds": [
   "yubao-60756-v-2729"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「包庇」。",
  "donor": "包庇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵⁵pʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2736",
  "wordIds": [
   "yubao-60756-v-2736"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「瞄准」。",
  "donor": "瞄准",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miau³³tsun⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2755",
  "wordIds": [
   "yubao-60756-v-2755"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「含」。",
  "donor": "含",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2787",
  "wordIds": [
   "yubao-60756-v-2787"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「照顾」。",
  "donor": "照顾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau³³ku³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2793",
  "wordIds": [
   "yubao-60756-v-2793"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「胜利」。",
  "donor": "胜利",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "seŋ³³li³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2811",
  "wordIds": [
   "yubao-60756-v-2811"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钉」。",
  "donor": "钉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "teŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2817",
  "wordIds": [
   "yubao-60756-v-2817"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「赌气」。",
  "donor": "赌气",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu³³tɕʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2824",
  "wordIds": [
   "yubao-60756-v-2824"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伤心」。",
  "donor": "伤心",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵ɕiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2826",
  "wordIds": [
   "yubao-60756-v-2826"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「恨」。",
  "donor": "恨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xeŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2831",
  "wordIds": [
   "yubao-60756-v-2831"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「放心」。",
  "donor": "放心",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ³³ɕiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2833",
  "wordIds": [
   "yubao-60756-v-2833"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「变」。",
  "donor": "变",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piaŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2850",
  "wordIds": [
   "yubao-60756-v-2850"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正」。",
  "donor": "正",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2851",
  "wordIds": [
   "yubao-60756-v-2851"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「反」。",
  "donor": "反",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2853",
  "wordIds": [
   "yubao-60756-v-2853"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「横」。",
  "donor": "横",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xun³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2856",
  "wordIds": [
   "yubao-60756-v-2856"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「满」。",
  "donor": "满",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "maŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2859",
  "wordIds": [
   "yubao-60756-v-2859"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冷清」。",
  "donor": "冷清",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "leŋ⁵⁵tɕʰiŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2862",
  "wordIds": [
   "yubao-60756-v-2862"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「嫩」。",
  "donor": "嫩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lun³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2865",
  "wordIds": [
   "yubao-60756-v-2865"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乱」。",
  "donor": "乱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luaŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2868",
  "wordIds": [
   "yubao-60756-v-2868"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「暗」。",
  "donor": "暗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋaŋ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2875",
  "wordIds": [
   "yubao-60756-v-2875"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「纯」。",
  "donor": "纯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sun³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2881",
  "wordIds": [
   "yubao-60756-v-2881"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「清楚」。",
  "donor": "清楚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵⁵tsʰu⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2882",
  "wordIds": [
   "yubao-60756-v-2882"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「模糊」。",
  "donor": "模糊",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɔ³³xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2885",
  "wordIds": [
   "yubao-60756-v-2885"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「空闲」。",
  "donor": "空闲",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɔŋ⁵⁵ɕaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2891",
  "wordIds": [
   "yubao-60756-v-2891"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「浪费」。",
  "donor": "浪费",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "laŋ³³xui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2894",
  "wordIds": [
   "yubao-60756-v-2894"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「聪明」。",
  "donor": "聪明",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɔŋ⁵⁵miŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2898",
  "wordIds": [
   "yubao-60756-v-2898"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「慌里慌张」。",
  "donor": "慌里慌张",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ⁵⁵li³³xuaŋ⁵⁵tsaŋ⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2899",
  "wordIds": [
   "yubao-60756-v-2899"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻利」。",
  "donor": "麻利",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2903",
  "wordIds": [
   "yubao-60756-v-2903"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「可怜」。",
  "donor": "可怜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɔ⁵⁵liaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2906",
  "wordIds": [
   "yubao-60756-v-2906"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「孤独」。",
  "donor": "孤独",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ku⁵⁵tu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2907",
  "wordIds": [
   "yubao-60756-v-2907"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亲」。",
  "donor": "亲",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2909",
  "wordIds": [
   "yubao-60756-v-2909"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「贪心」。",
  "donor": "贪心",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ³³ɕiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2912",
  "wordIds": [
   "yubao-60756-v-2912"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十二」。",
  "donor": "十二",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³ɚ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2913",
  "wordIds": [
   "yubao-60756-v-2913"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十三」。",
  "donor": "十三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³saŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2914",
  "wordIds": [
   "yubao-60756-v-2914"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十四」。",
  "donor": "十四",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2915",
  "wordIds": [
   "yubao-60756-v-2915"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十五」。",
  "donor": "十五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³u³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2916",
  "wordIds": [
   "yubao-60756-v-2916"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十六」。",
  "donor": "十六",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵lu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2917",
  "wordIds": [
   "yubao-60756-v-2917"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十七」。",
  "donor": "十七",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³⁵tɕʰi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2918",
  "wordIds": [
   "yubao-60756-v-2918"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十八」。",
  "donor": "十八",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2921",
  "wordIds": [
   "yubao-60756-v-2921"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四十」。",
  "donor": "四十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2922",
  "wordIds": [
   "yubao-60756-v-2922"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「五十」。",
  "donor": "五十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u⁵⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2923",
  "wordIds": [
   "yubao-60756-v-2923"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「六十」。",
  "donor": "六十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2924",
  "wordIds": [
   "yubao-60756-v-2924"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「七十」。",
  "donor": "七十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2925",
  "wordIds": [
   "yubao-60756-v-2925"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八十」。",
  "donor": "八十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa³⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2928",
  "wordIds": [
   "yubao-60756-v-2928"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「百把个」。",
  "donor": "百把个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe³³pa⁵⁵kɔ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2929",
  "wordIds": [
   "yubao-60756-v-2929"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「千把个」。",
  "donor": "千把个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰaŋ⁵⁵pa⁵³kɔ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2933",
  "wordIds": [
   "yubao-60756-v-2933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十多个」。",
  "donor": "十多个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³tɔ³³kɔ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2934",
  "wordIds": [
   "yubao-60756-v-2934"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第二」。",
  "donor": "第二",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³ɚ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2935",
  "wordIds": [
   "yubao-60756-v-2935"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第三」。",
  "donor": "第三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³saŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2939",
  "wordIds": [
   "yubao-60756-v-2939"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「串」。",
  "donor": "串",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2948",
  "wordIds": [
   "yubao-60756-v-2948"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「两」。",
  "donor": "两",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2954",
  "wordIds": [
   "yubao-60756-v-2954"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「寸」。",
  "donor": "寸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰun⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2956",
  "wordIds": [
   "yubao-60756-v-2956"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「丈」。",
  "donor": "丈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2973",
  "wordIds": [
   "yubao-60756-v-2973"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「到底」。",
  "donor": "到底",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau³³ti³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2974",
  "wordIds": [
   "yubao-60756-v-2974"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「差不多」。",
  "donor": "差不多",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa⁵⁵pu³³tɔ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2975",
  "wordIds": [
   "yubao-60756-v-2975"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「起码」。",
  "donor": "起码",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵ma³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2991",
  "wordIds": [
   "yubao-60756-v-2991"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「难道」。",
  "donor": "难道",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "naŋ³³tau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2992",
  "wordIds": [
   "yubao-60756-v-2992"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「到底」。",
  "donor": "到底",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau³³ti³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2995",
  "wordIds": [
   "yubao-60756-v-2995"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「暂时」。",
  "donor": "暂时",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsaŋ⁵⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2997",
  "wordIds": [
   "yubao-60756-v-2997"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「居然」。",
  "donor": "居然",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi⁵⁵zaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0015",
  "wordIds": [
   "yubao-60823-v-0015"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冰雹」。",
  "donor": "冰雹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pĩ⁵⁵pʰau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0050",
  "wordIds": [
   "yubao-60823-v-0050"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「水泥」。",
  "donor": "水泥",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui⁵⁵ni⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0052",
  "wordIds": [
   "yubao-60823-v-0052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「砖」。",
  "donor": "砖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0067",
  "wordIds": [
   "yubao-60823-v-0067"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「时候」。",
  "donor": "时候",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³xɤu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0105",
  "wordIds": [
   "yubao-60823-v-0105"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冬至」。",
  "donor": "冬至",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tũ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0121",
  "wordIds": [
   "yubao-60823-v-0121"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中间」。",
  "donor": "中间",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsũ⁵⁵kã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0185",
  "wordIds": [
   "yubao-60823-v-0185"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「包谷」。",
  "donor": "包谷",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵⁵ku³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0212",
  "wordIds": [
   "yubao-60823-v-0212"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黄瓜」。",
  "donor": "黄瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uã³³kua¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0216",
  "wordIds": [
   "yubao-60823-v-0216"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「红苕」。",
  "donor": "红苕",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xũ³¹sau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0261",
  "wordIds": [
   "yubao-60823-v-0261"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「骡子」。",
  "donor": "骡子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo³³tsɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0298",
  "wordIds": [
   "yubao-60823-v-0298"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「街上」。",
  "donor": "街上",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai⁵⁵sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0353",
  "wordIds": [
   "yubao-60823-v-0353"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「帕子」。",
  "donor": "帕子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰa¹³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0354",
  "wordIds": [
   "yubao-60823-v-0354"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「帕子」。",
  "donor": "帕子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰa¹³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0358",
  "wordIds": [
   "yubao-60823-v-0358"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「剪刀」。",
  "donor": "剪刀",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0361",
  "wordIds": [
   "yubao-60823-v-0361"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「伞」。",
  "donor": "伞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0378",
  "wordIds": [
   "yubao-60823-v-0378"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「袜子」。",
  "donor": "袜子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ua³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0379",
  "wordIds": [
   "yubao-60823-v-0379"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「围巾」。",
  "donor": "围巾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ui³³tɕĩ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0382",
  "wordIds": [
   "yubao-60823-v-0382"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扣子」。",
  "donor": "扣子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɤu¹³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0394",
  "wordIds": [
   "yubao-60823-v-0394"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「包子」。",
  "donor": "包子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0395",
  "wordIds": [
   "yubao-60823-v-0395"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「饺子」。",
  "donor": "饺子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0399",
  "wordIds": [
   "yubao-60823-v-0399"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「豆浆」。",
  "donor": "豆浆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɤu¹³tɕiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0411",
  "wordIds": [
   "yubao-60823-v-0411"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「猪肝」。",
  "donor": "猪肝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵⁵kã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0423",
  "wordIds": [
   "yubao-60823-v-0423"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黄酒」。",
  "donor": "黄酒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã³³tɕiɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0537",
  "wordIds": [
   "yubao-60823-v-0537"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「新郎子」。",
  "donor": "新郎子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕĩ⁵⁵lã⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0549",
  "wordIds": [
   "yubao-60823-v-0549"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「生日」。",
  "donor": "生日",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɤ̃⁵⁵zɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0568",
  "wordIds": [
   "yubao-60823-v-0568"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「和尚」。",
  "donor": "和尚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo³³sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0571",
  "wordIds": [
   "yubao-60823-v-0571"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「算命子」。",
  "donor": "算命子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suã¹³mĩ⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0583",
  "wordIds": [
   "yubao-60823-v-0583"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老人家」。",
  "donor": "老人家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵zɤ̃⁵⁵ka⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0596",
  "wordIds": [
   "yubao-60823-v-0596"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「师傅」。",
  "donor": "师傅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵³xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0607",
  "wordIds": [
   "yubao-60823-v-0607"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「癫子」。",
  "donor": "癫子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0662",
  "wordIds": [
   "yubao-60823-v-0662"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「名字」。",
  "donor": "名字",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mĩ³¹tsɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0679",
  "wordIds": [
   "yubao-60823-v-0679"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「车轮子」。",
  "donor": "车轮子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɤ⁵⁵lɤ̃⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0688",
  "wordIds": [
   "yubao-60823-v-0688"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「起子」。",
  "donor": "起子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0702",
  "wordIds": [
   "yubao-60823-v-0702"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铜钱」。",
  "donor": "铜钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰũ³¹tɕʰiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0705",
  "wordIds": [
   "yubao-60823-v-0705"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「本钱」。",
  "donor": "本钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɤ̃⁵⁵tɕʰiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0712",
  "wordIds": [
   "yubao-60823-v-0712"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「算盘」。",
  "donor": "算盘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suã³¹pʰã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0716",
  "wordIds": [
   "yubao-60823-v-0716"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「街上」。",
  "donor": "街上",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai⁵⁵sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0717",
  "wordIds": [
   "yubao-60823-v-0717"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「庙会」。",
  "donor": "庙会",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miau¹³xui⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0722",
  "wordIds": [
   "yubao-60823-v-0722"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「考试」。",
  "donor": "考试",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰau⁵⁵sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0736",
  "wordIds": [
   "yubao-60823-v-0736"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「风筝」。",
  "donor": "风筝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xũ⁵⁵tɤ̃⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0811",
  "wordIds": [
   "yubao-60823-v-0811"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「挡」。",
  "donor": "挡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0847",
  "wordIds": [
   "yubao-60823-v-0847"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「挽」。",
  "donor": "挽",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0860",
  "wordIds": [
   "yubao-60823-v-0860"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「转」。",
  "donor": "转",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0879",
  "wordIds": [
   "yubao-60823-v-0879"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「相信」。",
  "donor": "相信",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã⁵⁵ɕĩ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0901",
  "wordIds": [
   "yubao-60823-v-0901"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「不是」。",
  "donor": "不是",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu³³sɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0943",
  "wordIds": [
   "yubao-60823-v-0943"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「宽」。",
  "donor": "宽",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰuã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0952",
  "wordIds": [
   "yubao-60823-v-0952"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「深」。",
  "donor": "深",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɤ̃⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0954",
  "wordIds": [
   "yubao-60823-v-0954"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「清」。",
  "donor": "清",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0959",
  "wordIds": [
   "yubao-60823-v-0959"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尖」。",
  "donor": "尖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0960",
  "wordIds": [
   "yubao-60823-v-0960"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「平」。",
  "donor": "平",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰĩ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0992",
  "wordIds": [
   "yubao-60823-v-0992"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「凉快」。",
  "donor": "凉快",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liã³³kʰuai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1031",
  "wordIds": [
   "yubao-60823-v-1031"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「味道」。",
  "donor": "味道",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ui¹³tau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1032",
  "wordIds": [
   "yubao-60823-v-1032"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「气味」。",
  "donor": "气味",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi¹³ui⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1036",
  "wordIds": [
   "yubao-60823-v-1036"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「甜」。",
  "donor": "甜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1040",
  "wordIds": [
   "yubao-60823-v-1040"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「香」。",
  "donor": "香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1073",
  "wordIds": [
   "yubao-60823-v-1073"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三十」。",
  "donor": "三十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1199",
  "wordIds": [
   "yubao-60823-v-1199"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「如果」。",
  "donor": "如果",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zu³³ko⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1208",
  "wordIds": [
   "yubao-60823-v-1208"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「光」。",
  "donor": "光",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1246",
  "wordIds": [
   "yubao-60823-v-1246"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「雪山」。",
  "donor": "雪山",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕie³³sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1281",
  "wordIds": [
   "yubao-60823-v-1281"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「公路」。",
  "donor": "公路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kũ⁵⁵lu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1293",
  "wordIds": [
   "yubao-60823-v-1293"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「金子」。",
  "donor": "金子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1299",
  "wordIds": [
   "yubao-60823-v-1299"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钢」。",
  "donor": "钢",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1302",
  "wordIds": [
   "yubao-60823-v-1302"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铅」。",
  "donor": "铅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1306",
  "wordIds": [
   "yubao-60823-v-1306"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「玻璃」。",
  "donor": "玻璃",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "po⁵⁵li³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1321",
  "wordIds": [
   "yubao-60823-v-1321"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火镰」。",
  "donor": "火镰",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵liã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1328",
  "wordIds": [
   "yubao-60823-v-1328"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「碱水」。",
  "donor": "碱水",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵sui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1329",
  "wordIds": [
   "yubao-60823-v-1329"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「春天」。",
  "donor": "春天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuɤ̃⁵⁵tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1331",
  "wordIds": [
   "yubao-60823-v-1331"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「秋天」。",
  "donor": "秋天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɤu⁵⁵tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1332",
  "wordIds": [
   "yubao-60823-v-1332"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冬天」。",
  "donor": "冬天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tũ⁵⁵tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1356",
  "wordIds": [
   "yubao-60823-v-1356"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初三」。",
  "donor": "初三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1357",
  "wordIds": [
   "yubao-60823-v-1357"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初四」。",
  "donor": "初四",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵sɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1358",
  "wordIds": [
   "yubao-60823-v-1358"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初五」。",
  "donor": "初五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵u⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1359",
  "wordIds": [
   "yubao-60823-v-1359"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初六」。",
  "donor": "初六",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵lu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1360",
  "wordIds": [
   "yubao-60823-v-1360"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初七」。",
  "donor": "初七",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵³tɕʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1361",
  "wordIds": [
   "yubao-60823-v-1361"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初八」。",
  "donor": "初八",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1362",
  "wordIds": [
   "yubao-60823-v-1362"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初九」。",
  "donor": "初九",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵tɕiɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1363",
  "wordIds": [
   "yubao-60823-v-1363"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初十」。",
  "donor": "初十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1365",
  "wordIds": [
   "yubao-60823-v-1365"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「半天」。",
  "donor": "半天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã¹³tʰiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1382",
  "wordIds": [
   "yubao-60823-v-1382"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中间」。",
  "donor": "中间",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsũ⁵⁵kã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1397",
  "wordIds": [
   "yubao-60823-v-1397"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「万年青」。",
  "donor": "万年青",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uã¹³niã³³tɕʰĩ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1414",
  "wordIds": [
   "yubao-60823-v-1414"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「西瓜」。",
  "donor": "西瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1422",
  "wordIds": [
   "yubao-60823-v-1422"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「香蕉」。",
  "donor": "香蕉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã⁵⁵tɕiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1423",
  "wordIds": [
   "yubao-60823-v-1423"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「芭蕉」。",
  "donor": "芭蕉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa⁵⁵tɕiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1427",
  "wordIds": [
   "yubao-60823-v-1427"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「山楂」。",
  "donor": "山楂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵tsa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1431",
  "wordIds": [
   "yubao-60823-v-1431"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「杏仁」。",
  "donor": "杏仁",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕĩ¹³zɤ̃³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1517",
  "wordIds": [
   "yubao-60823-v-1517"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「豆芽菜」。",
  "donor": "豆芽菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɤu³³ŋa⁵⁵tsʰai³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1518",
  "wordIds": [
   "yubao-60823-v-1518"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四季豆」。",
  "donor": "四季豆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ¹³tɕi⁵⁵tɤu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1521",
  "wordIds": [
   "yubao-60823-v-1521"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冬瓜」。",
  "donor": "冬瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tũ⁵⁵kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1522",
  "wordIds": [
   "yubao-60823-v-1522"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苦瓜」。",
  "donor": "苦瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵⁵kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1544",
  "wordIds": [
   "yubao-60823-v-1544"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狮子」。",
  "donor": "狮子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1546",
  "wordIds": [
   "yubao-60823-v-1546"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大熊猫」。",
  "donor": "大熊猫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta¹³ɕũ³³mau⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1547",
  "wordIds": [
   "yubao-60823-v-1547"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狗熊」。",
  "donor": "狗熊",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɤu⁵⁵ɕũ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1548",
  "wordIds": [
   "yubao-60823-v-1548"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「熊掌」。",
  "donor": "熊掌",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕũ³³tsã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1549",
  "wordIds": [
   "yubao-60823-v-1549"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「熊胆」。",
  "donor": "熊胆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕũ³³tã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1557",
  "wordIds": [
   "yubao-60823-v-1557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狐狸」。",
  "donor": "狐狸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu³³li¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1561",
  "wordIds": [
   "yubao-60823-v-1561"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「水獭」。",
  "donor": "水獭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui⁵³tʰa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1562",
  "wordIds": [
   "yubao-60823-v-1562"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「旱獭」。",
  "donor": "旱獭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xã¹³tʰa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1618",
  "wordIds": [
   "yubao-60823-v-1618"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「地蚕」。",
  "donor": "地蚕",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³tsʰã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1642",
  "wordIds": [
   "yubao-60823-v-1642"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乌龟」。",
  "donor": "乌龟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u⁵³kui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1649",
  "wordIds": [
   "yubao-60823-v-1649"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黄鳝」。",
  "donor": "黄鳝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uã³³sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1742",
  "wordIds": [
   "yubao-60823-v-1742"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桩子」。",
  "donor": "桩子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuã⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1762",
  "wordIds": [
   "yubao-60823-v-1762"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箱子」。",
  "donor": "箱子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1784",
  "wordIds": [
   "yubao-60823-v-1784"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洗盆」。",
  "donor": "洗盆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi³³pʰɤ̃⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1788",
  "wordIds": [
   "yubao-60823-v-1788"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「茶盘」。",
  "donor": "茶盘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa³³pʰã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1809",
  "wordIds": [
   "yubao-60823-v-1809"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「丝瓜瓤瓤」。",
  "donor": "丝瓜瓤瓤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵kua³¹zã³³zã⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1847",
  "wordIds": [
   "yubao-60823-v-1847"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锤子」。",
  "donor": "锤子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰui³³tsɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1864",
  "wordIds": [
   "yubao-60823-v-1864"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「子弹壳壳」。",
  "donor": "子弹壳壳",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵⁵tã³³kʰo³³kʰo⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1875",
  "wordIds": [
   "yubao-60823-v-1875"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马鞭鞭」。",
  "donor": "马鞭鞭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵³piã¹³piã⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1886",
  "wordIds": [
   "yubao-60823-v-1886"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锥子」。",
  "donor": "锥子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsui⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1912",
  "wordIds": [
   "yubao-60823-v-1912"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「水磨」。",
  "donor": "水磨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui⁵⁵mo³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1934",
  "wordIds": [
   "yubao-60823-v-1934"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火镰」。",
  "donor": "火镰",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵liã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1940",
  "wordIds": [
   "yubao-60823-v-1940"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「拖拉机」。",
  "donor": "拖拉机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰo⁵⁵la⁵⁵tɕi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1949",
  "wordIds": [
   "yubao-60823-v-1949"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉布」。",
  "donor": "棉布",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã³³pu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1954",
  "wordIds": [
   "yubao-60823-v-1954"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉纱」。",
  "donor": "棉纱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã³³sa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1968",
  "wordIds": [
   "yubao-60823-v-1968"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扣眼」。",
  "donor": "扣眼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɤu¹³ŋã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1973",
  "wordIds": [
   "yubao-60823-v-1973"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「裙子」。",
  "donor": "裙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ³¹tsɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1979",
  "wordIds": [
   "yubao-60823-v-1979"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「裤裆」。",
  "donor": "裤裆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu¹³tã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2021",
  "wordIds": [
   "yubao-60823-v-2021"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「粉皮」。",
  "donor": "粉皮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuɤ̃⁵⁵pʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2022",
  "wordIds": [
   "yubao-60823-v-2022"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「面片子」。",
  "donor": "面片子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã¹³pʰiã¹³tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2024",
  "wordIds": [
   "yubao-60823-v-2024"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「烧饼」。",
  "donor": "烧饼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sau⁵⁵pĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2038",
  "wordIds": [
   "yubao-60823-v-2038"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「糖」。",
  "donor": "糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2040",
  "wordIds": [
   "yubao-60823-v-2040"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「冰糖」。",
  "donor": "冰糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pĩ⁵⁵tʰã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2041",
  "wordIds": [
   "yubao-60823-v-2041"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「红糖」。",
  "donor": "红糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xũ³¹tʰã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2044",
  "wordIds": [
   "yubao-60823-v-2044"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「浓茶」。",
  "donor": "浓茶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nũ³¹tsʰa¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2052",
  "wordIds": [
   "yubao-60823-v-2052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八角香」。",
  "donor": "八角香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa³³ko¹³ɕiã⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2054",
  "wordIds": [
   "yubao-60823-v-2054"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「花椒」。",
  "donor": "花椒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua⁵⁵tɕiau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2057",
  "wordIds": [
   "yubao-60823-v-2057"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「面面糊」。",
  "donor": "面面糊",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã¹³miã³³xu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2058",
  "wordIds": [
   "yubao-60823-v-2058"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻花」。",
  "donor": "麻花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³xua⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2060",
  "wordIds": [
   "yubao-60823-v-2060"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「牛奶」。",
  "donor": "牛奶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "niɤu³³lai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2072",
  "wordIds": [
   "yubao-60823-v-2072"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「寡蛋」。",
  "donor": "寡蛋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kua⁵⁵tã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2091",
  "wordIds": [
   "yubao-60823-v-2091"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肝」。",
  "donor": "肝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2097",
  "wordIds": [
   "yubao-60823-v-2097"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「筋」。",
  "donor": "筋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2155",
  "wordIds": [
   "yubao-60823-v-2155"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「绒毛」。",
  "donor": "绒毛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zũ³¹mau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2225",
  "wordIds": [
   "yubao-60823-v-2225"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中风」。",
  "donor": "中风",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsũ¹³xũ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2249",
  "wordIds": [
   "yubao-60823-v-2249"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「记号」。",
  "donor": "记号",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi¹³xau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2252",
  "wordIds": [
   "yubao-60823-v-2252"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「灰指甲」。",
  "donor": "灰指甲",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xui⁵⁵tsɿ⁵⁵tɕia³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2275",
  "wordIds": [
   "yubao-60823-v-2275"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年纪」。",
  "donor": "年纪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "niã³³tɕi¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2297",
  "wordIds": [
   "yubao-60823-v-2297"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「经书」。",
  "donor": "经书",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵su⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2319",
  "wordIds": [
   "yubao-60823-v-2319"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「土司」。",
  "donor": "土司",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2331",
  "wordIds": [
   "yubao-60823-v-2331"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「姓」。",
  "donor": "姓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕĩ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2333",
  "wordIds": [
   "yubao-60823-v-2333"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「兵」。",
  "donor": "兵",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pĩ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2341",
  "wordIds": [
   "yubao-60823-v-2341"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「证人」。",
  "donor": "证人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɤ̃¹³zɤ̃⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2345",
  "wordIds": [
   "yubao-60823-v-2345"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「皇帝」。",
  "donor": "皇帝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uã³³ti¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2349",
  "wordIds": [
   "yubao-60823-v-2349"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「篾匠」。",
  "donor": "篾匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mie³³tɕiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2364",
  "wordIds": [
   "yubao-60823-v-2364"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大舅娘」。",
  "donor": "大舅娘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta³³tɕiɤu³³niã⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2377",
  "wordIds": [
   "yubao-60823-v-2377"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「侄女子」。",
  "donor": "侄女子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ³³ni⁵⁵tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2398",
  "wordIds": [
   "yubao-60823-v-2398"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亲家」。",
  "donor": "亲家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ¹³ka⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2399",
  "wordIds": [
   "yubao-60823-v-2399"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亲家」。",
  "donor": "亲家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ¹³ka⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2400",
  "wordIds": [
   "yubao-60823-v-2400"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亲家母」。",
  "donor": "亲家母",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ¹³ka⁵⁵mu³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2429",
  "wordIds": [
   "yubao-60823-v-2429"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铲子」。",
  "donor": "铲子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰã⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2430",
  "wordIds": [
   "yubao-60823-v-2430"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铲子」。",
  "donor": "铲子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰã⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2447",
  "wordIds": [
   "yubao-60823-v-2447"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鞭子」。",
  "donor": "鞭子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piã¹³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2451",
  "wordIds": [
   "yubao-60823-v-2451"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「细筛」。",
  "donor": "细筛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi¹³sai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2454",
  "wordIds": [
   "yubao-60823-v-2454"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马棚」。",
  "donor": "马棚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵pʰũ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2505",
  "wordIds": [
   "yubao-60823-v-2505"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「政府」。",
  "donor": "政府",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɤ̃¹³xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2506",
  "wordIds": [
   "yubao-60823-v-2506"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乡政府」。",
  "donor": "乡政府",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã⁵⁵tsɤ̃¹³xu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2507",
  "wordIds": [
   "yubao-60823-v-2507"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「省」。",
  "donor": "省",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɤ̃⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2508",
  "wordIds": [
   "yubao-60823-v-2508"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「县」。",
  "donor": "县",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2509",
  "wordIds": [
   "yubao-60823-v-2509"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「村」。",
  "donor": "村",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuɤ̃⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2510",
  "wordIds": [
   "yubao-60823-v-2510"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「章子」。",
  "donor": "章子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsã⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2511",
  "wordIds": [
   "yubao-60823-v-2511"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「私章」。",
  "donor": "私章",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵tsã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2512",
  "wordIds": [
   "yubao-60823-v-2512"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「记号」。",
  "donor": "记号",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi¹³xau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2545",
  "wordIds": [
   "yubao-60823-v-2545"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「簧」。",
  "donor": "簧",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2551",
  "wordIds": [
   "yubao-60823-v-2551"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「相片」。",
  "donor": "相片",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã¹³pʰiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2556",
  "wordIds": [
   "yubao-60823-v-2556"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「面糊」。",
  "donor": "面糊",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã³³xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2557",
  "wordIds": [
   "yubao-60823-v-2557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「地图」。",
  "donor": "地图",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti¹³tʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2561",
  "wordIds": [
   "yubao-60823-v-2561"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「算」。",
  "donor": "算",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2564",
  "wordIds": [
   "yubao-60823-v-2564"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「减」。",
  "donor": "减",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2602",
  "wordIds": [
   "yubao-60823-v-2602"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「剪」。",
  "donor": "剪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2610",
  "wordIds": [
   "yubao-60823-v-2610"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「焖」。",
  "donor": "焖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɤ̃¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2644",
  "wordIds": [
   "yubao-60823-v-2644"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「吃亏」。",
  "donor": "吃亏",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³kʰui⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2645",
  "wordIds": [
   "yubao-60823-v-2645"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「上当」。",
  "donor": "上当",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã¹³tã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2672",
  "wordIds": [
   "yubao-60823-v-2672"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扳」。",
  "donor": "扳",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2673",
  "wordIds": [
   "yubao-60823-v-2673"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「捧」。",
  "donor": "捧",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰũ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2707",
  "wordIds": [
   "yubao-60823-v-2707"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「染」。",
  "donor": "染",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2787",
  "wordIds": [
   "yubao-60823-v-2787"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「服侍」。",
  "donor": "服侍",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu⁵³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2811",
  "wordIds": [
   "yubao-60823-v-2811"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钉」。",
  "donor": "钉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɤ̃⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2833",
  "wordIds": [
   "yubao-60823-v-2833"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「变」。",
  "donor": "变",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2844",
  "wordIds": [
   "yubao-60823-v-2844"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「介绍」。",
  "donor": "介绍",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai¹³sau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2850",
  "wordIds": [
   "yubao-60823-v-2850"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正」。",
  "donor": "正",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɤ̃¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2851",
  "wordIds": [
   "yubao-60823-v-2851"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「反」。",
  "donor": "反",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2853",
  "wordIds": [
   "yubao-60823-v-2853"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「横」。",
  "donor": "横",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuɤ̃³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2856",
  "wordIds": [
   "yubao-60823-v-2856"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「满」。",
  "donor": "满",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2865",
  "wordIds": [
   "yubao-60823-v-2865"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乱」。",
  "donor": "乱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2890",
  "wordIds": [
   "yubao-60823-v-2890"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「方便」。",
  "donor": "方便",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã⁵⁵piã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2894",
  "wordIds": [
   "yubao-60823-v-2894"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「聪明」。",
  "donor": "聪明",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰũ⁵⁵mĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2895",
  "wordIds": [
   "yubao-60823-v-2895"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狡猾」。",
  "donor": "狡猾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau⁵⁵xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2898",
  "wordIds": [
   "yubao-60823-v-2898"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「慌张」。",
  "donor": "慌张",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã⁵⁵tsã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2899",
  "wordIds": [
   "yubao-60823-v-2899"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻利」。",
  "donor": "麻利",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma¹³li³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2913",
  "wordIds": [
   "yubao-60823-v-2913"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十三」。",
  "donor": "十三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2914",
  "wordIds": [
   "yubao-60823-v-2914"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十四」。",
  "donor": "十四",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³sɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2915",
  "wordIds": [
   "yubao-60823-v-2915"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十五」。",
  "donor": "十五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³u⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2916",
  "wordIds": [
   "yubao-60823-v-2916"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十六」。",
  "donor": "十六",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ¹³lu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2917",
  "wordIds": [
   "yubao-60823-v-2917"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十七」。",
  "donor": "十七",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ¹³tɕʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2918",
  "wordIds": [
   "yubao-60823-v-2918"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十八」。",
  "donor": "十八",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ¹³pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2919",
  "wordIds": [
   "yubao-60823-v-2919"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十九」。",
  "donor": "十九",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³tɕiɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2921",
  "wordIds": [
   "yubao-60823-v-2921"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四十」。",
  "donor": "四十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ¹³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2922",
  "wordIds": [
   "yubao-60823-v-2922"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「五十」。",
  "donor": "五十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u⁵⁵sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2923",
  "wordIds": [
   "yubao-60823-v-2923"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「六十」。",
  "donor": "六十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu¹³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2924",
  "wordIds": [
   "yubao-60823-v-2924"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「七十」。",
  "donor": "七十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi¹³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2925",
  "wordIds": [
   "yubao-60823-v-2925"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八十」。",
  "donor": "八十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa¹³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2926",
  "wordIds": [
   "yubao-60823-v-2926"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「九十」。",
  "donor": "九十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɤu⁵⁵sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2929",
  "wordIds": [
   "yubao-60823-v-2929"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「千把个」。",
  "donor": "千把个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã⁵⁵pa³³ko³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2931",
  "wordIds": [
   "yubao-60823-v-2931"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三四个」。",
  "donor": "三四个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵sɿ¹³ko⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2932",
  "wordIds": [
   "yubao-60823-v-2932"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十几个」。",
  "donor": "十几个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³tɕi⁵⁵ko³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2933",
  "wordIds": [
   "yubao-60823-v-2933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十多个」。",
  "donor": "十多个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³to⁵⁵ko³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2935",
  "wordIds": [
   "yubao-60823-v-2935"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第三」。",
  "donor": "第三",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti¹³sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2937",
  "wordIds": [
   "yubao-60823-v-2937"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「半个」。",
  "donor": "半个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã¹³ko⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2951",
  "wordIds": [
   "yubao-60823-v-2951"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钱」。",
  "donor": "钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2954",
  "wordIds": [
   "yubao-60823-v-2954"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「寸」。",
  "donor": "寸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuɤ̃³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2956",
  "wordIds": [
   "yubao-60823-v-2956"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「丈」。",
  "donor": "丈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0015",
  "wordIds": [
   "yubao-60824-v-0015"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冰雹」。",
  "donor": "冰雹",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pĩ³³pʰau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0018",
  "wordIds": [
   "yubao-60824-v-0018"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「露水」。",
  "donor": "露水",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu¹³suei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0038",
  "wordIds": [
   "yubao-60824-v-0038"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「池塘」。",
  "donor": "池塘",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzi¹³dã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0044",
  "wordIds": [
   "yubao-60824-v-0044"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「地震」。",
  "donor": "地震",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti¹³tsẽ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0050",
  "wordIds": [
   "yubao-60824-v-0050"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「水泥」。",
  "donor": "水泥",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵ni²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0051",
  "wordIds": [
   "yubao-60824-v-0051"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「沙子」。",
  "donor": "沙子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sa⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0055",
  "wordIds": [
   "yubao-60824-v-0055"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「煤油」。",
  "donor": "煤油",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me¹³jiʉ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0056",
  "wordIds": [
   "yubao-60824-v-0056"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「炭」。",
  "donor": "炭",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0058",
  "wordIds": [
   "yubao-60824-v-0058"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「灰尘」。",
  "donor": "灰尘",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuei³³dzẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0066",
  "wordIds": [
   "yubao-60824-v-0066"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「磁铁」。",
  "donor": "磁铁",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzi²¹tʰie¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0078",
  "wordIds": [
   "yubao-60824-v-0078"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「往年」。",
  "donor": "往年",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wã⁵⁵niã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0079",
  "wordIds": [
   "yubao-60824-v-0079"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「年初」。",
  "donor": "年初",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "niã¹³tsʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0080",
  "wordIds": [
   "yubao-60824-v-0080"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「年底」。",
  "donor": "年底",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "niã¹³ti⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0089",
  "wordIds": [
   "yubao-60824-v-0089"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「每天」。",
  "donor": "每天",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei⁵⁵tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0091",
  "wordIds": [
   "yubao-60824-v-0091"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「上午」。",
  "donor": "上午",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã¹³wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0093",
  "wordIds": [
   "yubao-60824-v-0093"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「下午」。",
  "donor": "下午",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕia¹³wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0097",
  "wordIds": [
   "yubao-60824-v-0097"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「半夜」。",
  "donor": "半夜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã¹³je³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0099",
  "wordIds": [
   "yubao-60824-v-0099"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「年初一」。",
  "donor": "年初一",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "niã¹³tsʰu³³ji²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0101",
  "wordIds": [
   "yubao-60824-v-0101"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「清明」。",
  "donor": "清明",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ²¹mĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0102",
  "wordIds": [
   "yubao-60824-v-0102"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「端午」。",
  "donor": "端午",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuã⁵⁵wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0104",
  "wordIds": [
   "yubao-60824-v-0104"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「中秋」。",
  "donor": "中秋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsõ³³tɕʰiʉ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0105",
  "wordIds": [
   "yubao-60824-v-0105"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冬至」。",
  "donor": "冬至",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tõ³³tsi¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0110",
  "wordIds": [
   "yubao-60824-v-0110"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「阳历」。",
  "donor": "阳历",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jã²¹li²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0125",
  "wordIds": [
   "yubao-60824-v-0125"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「对面」。",
  "donor": "对面",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuei¹³mẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0153",
  "wordIds": [
   "yubao-60824-v-0153"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「梅花」。",
  "donor": "梅花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei¹³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0155",
  "wordIds": [
   "yubao-60824-v-0155"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「荷花」。",
  "donor": "荷花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo¹³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0160",
  "wordIds": [
   "yubao-60824-v-0160"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「苹果」。",
  "donor": "苹果",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bĩ¹³ko⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0161",
  "wordIds": [
   "yubao-60824-v-0161"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「桃子」。",
  "donor": "桃子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dau¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0163",
  "wordIds": [
   "yubao-60824-v-0163"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「李子」。",
  "donor": "李子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0167",
  "wordIds": [
   "yubao-60824-v-0167"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「柿子」。",
  "donor": "柿子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0168",
  "wordIds": [
   "yubao-60824-v-0168"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「石榴」。",
  "donor": "石榴",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si¹³liʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0169",
  "wordIds": [
   "yubao-60824-v-0169"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「枣子」。",
  "donor": "枣子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0170",
  "wordIds": [
   "yubao-60824-v-0170"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「板栗」。",
  "donor": "板栗",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa⁵⁵li²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0171",
  "wordIds": [
   "yubao-60824-v-0171"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「核桃」。",
  "donor": "核桃",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xe¹³dau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0176",
  "wordIds": [
   "yubao-60824-v-0176"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「香菇」。",
  "donor": "香菇",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã³³ku³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0186",
  "wordIds": [
   "yubao-60824-v-0186"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「棉花」。",
  "donor": "棉花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã³³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0187",
  "wordIds": [
   "yubao-60824-v-0187"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「油菜」。",
  "donor": "油菜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiʉ²¹tsʰai¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0189",
  "wordIds": [
   "yubao-60824-v-0189"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「葵花」。",
  "donor": "葵花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɡuei¹³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0192",
  "wordIds": [
   "yubao-60824-v-0192"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「落花生」。",
  "donor": "落花生",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo¹³xua³³sẽ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0196",
  "wordIds": [
   "yubao-60824-v-0196"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「白菜」。",
  "donor": "白菜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe²¹tsʰai¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0199",
  "wordIds": [
   "yubao-60824-v-0199"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「芹菜」。",
  "donor": "芹菜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑĩ²¹tsʰai¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0201",
  "wordIds": [
   "yubao-60824-v-0201"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「韭葱」。",
  "donor": "韭葱",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiʉ⁵⁵tsʰõ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0206",
  "wordIds": [
   "yubao-60824-v-0206"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「洋葱」。",
  "donor": "洋葱",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jã¹³tsʰõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0213",
  "wordIds": [
   "yubao-60824-v-0213"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「丝瓜」。",
  "donor": "丝瓜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³³kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0227",
  "wordIds": [
   "yubao-60824-v-0227"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「麻雀子」。",
  "donor": "麻雀子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma²¹tɕʰio²¹tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0232",
  "wordIds": [
   "yubao-60824-v-0232"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「爪子」。",
  "donor": "爪子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0245",
  "wordIds": [
   "yubao-60824-v-0245"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蚊子」。",
  "donor": "蚊子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wẽ¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0261",
  "wordIds": [
   "yubao-60824-v-0261"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「骡子」。",
  "donor": "骡子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ly²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0281",
  "wordIds": [
   "yubao-60824-v-0281"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「毛兔子」。",
  "donor": "毛兔子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau¹³tʰu¹³tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0288",
  "wordIds": [
   "yubao-60824-v-0288"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「鸭子」。",
  "donor": "鸭子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ja²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0303",
  "wordIds": [
   "yubao-60824-v-0303"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「茅屋」。",
  "donor": "茅屋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau¹³wu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0306",
  "wordIds": [
   "yubao-60824-v-0306"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「大锅」。",
  "donor": "大锅",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʉ²¹kʉ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0314",
  "wordIds": [
   "yubao-60824-v-0314"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「窗户」。",
  "donor": "窗户",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuã³³fu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0319",
  "wordIds": [
   "yubao-60824-v-0319"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「家具」。",
  "donor": "家具",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕia³³tɕy¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0321",
  "wordIds": [
   "yubao-60824-v-0321"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「炕」。",
  "donor": "炕",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0328",
  "wordIds": [
   "yubao-60824-v-0328"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「席子」。",
  "donor": "席子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0329",
  "wordIds": [
   "yubao-60824-v-0329"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蚊帐」。",
  "donor": "蚊帐",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wẽ²¹tsã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0331",
  "wordIds": [
   "yubao-60824-v-0331"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「柜子」。",
  "donor": "柜子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuei¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0337",
  "wordIds": [
   "yubao-60824-v-0337"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「菜刀」。",
  "donor": "菜刀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰai³⁵tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0338",
  "wordIds": [
   "yubao-60824-v-0338"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「木勺」。",
  "donor": "木勺",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mo¹³so⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0347",
  "wordIds": [
   "yubao-60824-v-0347"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「火柴」。",
  "donor": "火柴",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵dzai³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0349",
  "wordIds": [
   "yubao-60824-v-0349"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钥匙」。",
  "donor": "钥匙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jau²¹si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0350",
  "wordIds": [
   "yubao-60824-v-0350"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「热水瓶」。",
  "donor": "热水瓶",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ze¹³suei⁵⁵bĩ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0353",
  "wordIds": [
   "yubao-60824-v-0353"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「帕子」。",
  "donor": "帕子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰa¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0360",
  "wordIds": [
   "yubao-60824-v-0360"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「电筒」。",
  "donor": "电筒",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã³⁵dõ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0361",
  "wordIds": [
   "yubao-60824-v-0361"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「伞」。",
  "donor": "伞",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0368",
  "wordIds": [
   "yubao-60824-v-0368"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「背心子」。",
  "donor": "背心子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pei⁵⁵sẽ³³tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0376",
  "wordIds": [
   "yubao-60824-v-0376"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「帽子」。",
  "donor": "帽子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau³⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0378",
  "wordIds": [
   "yubao-60824-v-0378"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「袜子」。",
  "donor": "袜子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wa²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0379",
  "wordIds": [
   "yubao-60824-v-0379"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「围巾」。",
  "donor": "围巾",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wei¹³tɕĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0380",
  "wordIds": [
   "yubao-60824-v-0380"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「围裙」。",
  "donor": "围裙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wei¹³dʑyẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0393",
  "wordIds": [
   "yubao-60824-v-0393"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「馒头」。",
  "donor": "馒头",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mã¹³do³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0394",
  "wordIds": [
   "yubao-60824-v-0394"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「包子」。",
  "donor": "包子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau³³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0417",
  "wordIds": [
   "yubao-60824-v-0417"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「酱油」。",
  "donor": "酱油",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³⁵jiʉ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0421",
  "wordIds": [
   "yubao-60824-v-0421"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「草烟」。",
  "donor": "草烟",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰau⁵⁵jã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0425",
  "wordIds": [
   "yubao-60824-v-0425"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「茶叶」。",
  "donor": "茶叶",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dza¹³je³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0452",
  "wordIds": [
   "yubao-60824-v-0452"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「旋」。",
  "donor": "旋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕyã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0457",
  "wordIds": [
   "yubao-60824-v-0457"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「眼珠子」。",
  "donor": "眼珠子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋã³⁵tsu⁵⁵tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0459",
  "wordIds": [
   "yubao-60824-v-0459"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「眉毛」。",
  "donor": "眉毛",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mi¹³mau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0469",
  "wordIds": [
   "yubao-60824-v-0469"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「下巴」。",
  "donor": "下巴",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xa¹³pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0533",
  "wordIds": [
   "yubao-60824-v-0533"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「结婚」。",
  "donor": "结婚",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕie¹³xuẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0537",
  "wordIds": [
   "yubao-60824-v-0537"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「新郎官」。",
  "donor": "新郎官",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕĩ³³lã¹³kuã³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0549",
  "wordIds": [
   "yubao-60824-v-0549"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「生日」。",
  "donor": "生日",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sẽ³³zi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0553",
  "wordIds": [
   "yubao-60824-v-0553"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「自杀」。",
  "donor": "自杀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi³⁵sa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0555",
  "wordIds": [
   "yubao-60824-v-0555"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「入殓」。",
  "donor": "入殓",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zu²¹liã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0564",
  "wordIds": [
   "yubao-60824-v-0564"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「观音」。",
  "donor": "观音",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuã³³jĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0565",
  "wordIds": [
   "yubao-60824-v-0565"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「灶神」。",
  "donor": "灶神",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau³⁵sẽ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0567",
  "wordIds": [
   "yubao-60824-v-0567"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「祠堂」。",
  "donor": "祠堂",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzi¹³dã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0568",
  "wordIds": [
   "yubao-60824-v-0568"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「和尚」。",
  "donor": "和尚",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo²¹sã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0569",
  "wordIds": [
   "yubao-60824-v-0569"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「尼姑」。",
  "donor": "尼姑",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ni¹³ku³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0586",
  "wordIds": [
   "yubao-60824-v-0586"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「邻居」。",
  "donor": "邻居",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lĩ¹³tɕy³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0591",
  "wordIds": [
   "yubao-60824-v-0591"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「泥水匠」。",
  "donor": "泥水匠",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ni¹³suei⁵⁵tɕiã¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0593",
  "wordIds": [
   "yubao-60824-v-0593"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「裁缝」。",
  "donor": "裁缝",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzai¹³fõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0595",
  "wordIds": [
   "yubao-60824-v-0595"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「厨师」。",
  "donor": "厨师",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzu¹³si³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0596",
  "wordIds": [
   "yubao-60824-v-0596"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「师傅」。",
  "donor": "师傅",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³³fu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0597",
  "wordIds": [
   "yubao-60824-v-0597"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「徒弟」。",
  "donor": "徒弟",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "du²¹ti¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0607",
  "wordIds": [
   "yubao-60824-v-0607"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「癫子」。",
  "donor": "癫子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0633",
  "wordIds": [
   "yubao-60824-v-0633"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「舅母」。",
  "donor": "舅母",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiʉ¹³mu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0655",
  "wordIds": [
   "yubao-60824-v-0655"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「重孙」。",
  "donor": "重孙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzõ¹³suẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0658",
  "wordIds": [
   "yubao-60824-v-0658"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「外孙」。",
  "donor": "外孙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wai¹³suẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0673",
  "wordIds": [
   "yubao-60824-v-0673"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「扁担」。",
  "donor": "扁担",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piã⁵⁵tã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0675",
  "wordIds": [
   "yubao-60824-v-0675"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「筛子」。",
  "donor": "筛子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sai³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0679",
  "wordIds": [
   "yubao-60824-v-0679"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「轮子」。",
  "donor": "轮子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luẽ¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0687",
  "wordIds": [
   "yubao-60824-v-0687"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钳子」。",
  "donor": "钳子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑiã¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0688",
  "wordIds": [
   "yubao-60824-v-0688"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「起子」。",
  "donor": "起子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0690",
  "wordIds": [
   "yubao-60824-v-0690"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钉子」。",
  "donor": "钉子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tẽ³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0694",
  "wordIds": [
   "yubao-60824-v-0694"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「商店」。",
  "donor": "商店",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã³³tiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0695",
  "wordIds": [
   "yubao-60824-v-0695"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「馆子」。",
  "donor": "馆子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuã³³tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0705",
  "wordIds": [
   "yubao-60824-v-0705"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「本钱」。",
  "donor": "本钱",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pẽ⁵⁵dʑiã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0707",
  "wordIds": [
   "yubao-60824-v-0707"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「路费」。",
  "donor": "路费",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu¹³xuei¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0709",
  "wordIds": [
   "yubao-60824-v-0709"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「赚」。",
  "donor": "赚",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0712",
  "wordIds": [
   "yubao-60824-v-0712"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「算盘」。",
  "donor": "算盘",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suã¹³bã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0718",
  "wordIds": [
   "yubao-60824-v-0718"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「学堂」。",
  "donor": "学堂",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕio¹³dã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0719",
  "wordIds": [
   "yubao-60824-v-0719"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「学堂」。",
  "donor": "学堂",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕio¹³dã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0722",
  "wordIds": [
   "yubao-60824-v-0722"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「考试」。",
  "donor": "考试",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰau⁵⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0723",
  "wordIds": [
   "yubao-60824-v-0723"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「书包」。",
  "donor": "书包",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su³³pau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0724",
  "wordIds": [
   "yubao-60824-v-0724"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「本子」。",
  "donor": "本子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pẽ⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0726",
  "wordIds": [
   "yubao-60824-v-0726"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钢笔」。",
  "donor": "钢笔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã³³pi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0728",
  "wordIds": [
   "yubao-60824-v-0728"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「毛笔」。",
  "donor": "毛笔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau²¹pi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0731",
  "wordIds": [
   "yubao-60824-v-0731"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「信」。",
  "donor": "信",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕĩ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0767",
  "wordIds": [
   "yubao-60824-v-0767"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「含」。",
  "donor": "含",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0797",
  "wordIds": [
   "yubao-60824-v-0797"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「挺」。",
  "donor": "挺",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰẽ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0860",
  "wordIds": [
   "yubao-60824-v-0860"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「转」。",
  "donor": "转",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕyã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0876",
  "wordIds": [
   "yubao-60824-v-0876"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「记得」。",
  "donor": "记得",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi¹³tu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0884",
  "wordIds": [
   "yubao-60824-v-0884"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「舒服」。",
  "donor": "舒服",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su³³fu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0894",
  "wordIds": [
   "yubao-60824-v-0894"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「欺负」。",
  "donor": "欺负",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³fu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0895",
  "wordIds": [
   "yubao-60824-v-0895"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「装」。",
  "donor": "装",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0915",
  "wordIds": [
   "yubao-60824-v-0915"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「应该」。",
  "donor": "应该",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ¹³kai³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0933",
  "wordIds": [
   "yubao-60824-v-0933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「对不住」。",
  "donor": "对不住",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuei¹³pu³³tsu¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0934",
  "wordIds": [
   "yubao-60824-v-0934"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「再见」。",
  "donor": "再见",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsai¹³tɕiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0953",
  "wordIds": [
   "yubao-60824-v-0953"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「浅」。",
  "donor": "浅",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0957",
  "wordIds": [
   "yubao-60824-v-0957"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「扁」。",
  "donor": "扁",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0998",
  "wordIds": [
   "yubao-60824-v-0998"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「干净」。",
  "donor": "干净",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã³³tɕĩ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1007",
  "wordIds": [
   "yubao-60824-v-1007"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「松」。",
  "donor": "松",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sõ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1008",
  "wordIds": [
   "yubao-60824-v-1008"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「紧」。",
  "donor": "紧",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1024",
  "wordIds": [
   "yubao-60824-v-1024"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「闲」。",
  "donor": "闲",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1028",
  "wordIds": [
   "yubao-60824-v-1028"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「热闹」。",
  "donor": "热闹",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ze²¹nau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1029",
  "wordIds": [
   "yubao-60824-v-1029"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「熟悉」。",
  "donor": "熟悉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su²¹ɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1031",
  "wordIds": [
   "yubao-60824-v-1031"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「味道」。",
  "donor": "味道",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wei¹³tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1040",
  "wordIds": [
   "yubao-60824-v-1040"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「香」。",
  "donor": "香",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1055",
  "wordIds": [
   "yubao-60824-v-1055"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「老实」。",
  "donor": "老实",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1076",
  "wordIds": [
   "yubao-60824-v-1076"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「一万」。",
  "donor": "一万",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²¹wã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1079",
  "wordIds": [
   "yubao-60824-v-1079"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「第一」。",
  "donor": "第一",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1118",
  "wordIds": [
   "yubao-60824-v-1118"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「行」。",
  "donor": "行",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xã²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1160",
  "wordIds": [
   "yubao-60824-v-1160"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「很」。",
  "donor": "很",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xẽ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1173",
  "wordIds": [
   "yubao-60824-v-1173"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「常时」。",
  "donor": "常时",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzã¹³si³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1178",
  "wordIds": [
   "yubao-60824-v-1178"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「反正」。",
  "donor": "反正",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fã⁵⁵tsẽ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1187",
  "wordIds": [
   "yubao-60824-v-1187"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「随便」。",
  "donor": "随便",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei²¹piã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1189",
  "wordIds": [
   "yubao-60824-v-1189"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「肯定」。",
  "donor": "肯定",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰẽ⁵⁵tĩ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1190",
  "wordIds": [
   "yubao-60824-v-1190"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「可能」。",
  "donor": "可能",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰo⁵⁵nẽ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1195",
  "wordIds": [
   "yubao-60824-v-1195"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「往」。",
  "donor": "往",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1197",
  "wordIds": [
   "yubao-60824-v-1197"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「按」。",
  "donor": "按",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1199",
  "wordIds": [
   "yubao-60824-v-1199"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「如果」。",
  "donor": "如果",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zu¹³ko⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1209",
  "wordIds": [
   "yubao-60824-v-1209"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「影子」。",
  "donor": "影子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1226",
  "wordIds": [
   "yubao-60824-v-1226"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「水蒸气」。",
  "donor": "水蒸气",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei³⁵tsẽ³⁵tɕʰi¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1230",
  "wordIds": [
   "yubao-60824-v-1230"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「荒山」。",
  "donor": "荒山",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã³³sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1245",
  "wordIds": [
   "yubao-60824-v-1245"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「荒山」。",
  "donor": "荒山",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã³³sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1251",
  "wordIds": [
   "yubao-60824-v-1251"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「阴山」。",
  "donor": "阴山",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ³³sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1278",
  "wordIds": [
   "yubao-60824-v-1278"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「岔路」。",
  "donor": "岔路",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa¹³lu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1287",
  "wordIds": [
   "yubao-60824-v-1287"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「灰尘」。",
  "donor": "灰尘",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuei³³dzẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1293",
  "wordIds": [
   "yubao-60824-v-1293"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「金子」。",
  "donor": "金子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1302",
  "wordIds": [
   "yubao-60824-v-1302"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「铅」。",
  "donor": "铅",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1306",
  "wordIds": [
   "yubao-60824-v-1306"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「玻璃」。",
  "donor": "玻璃",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "po³³li³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1307",
  "wordIds": [
   "yubao-60824-v-1307"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「硫磺」。",
  "donor": "硫磺",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liʉ²¹xuã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1308",
  "wordIds": [
   "yubao-60824-v-1308"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「碱」。",
  "donor": "碱",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1309",
  "wordIds": [
   "yubao-60824-v-1309"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「火药」。",
  "donor": "火药",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵jio²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1315",
  "wordIds": [
   "yubao-60824-v-1315"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「打火石」。",
  "donor": "打火石",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵xo⁵⁵si³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1323",
  "wordIds": [
   "yubao-60824-v-1323"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「汽油」。",
  "donor": "汽油",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵jiʉ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1328",
  "wordIds": [
   "yubao-60824-v-1328"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「碱水」。",
  "donor": "碱水",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵suei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1329",
  "wordIds": [
   "yubao-60824-v-1329"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「春天」。",
  "donor": "春天",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuẽ³³tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1330",
  "wordIds": [
   "yubao-60824-v-1330"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「夏天」。",
  "donor": "夏天",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕia¹³tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1331",
  "wordIds": [
   "yubao-60824-v-1331"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「秋天」。",
  "donor": "秋天",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiʉ¹³tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1332",
  "wordIds": [
   "yubao-60824-v-1332"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冬天」。",
  "donor": "冬天",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tõ³³tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1335",
  "wordIds": [
   "yubao-60824-v-1335"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「每年」。",
  "donor": "每年",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei⁵⁵niã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1336",
  "wordIds": [
   "yubao-60824-v-1336"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「上半年」。",
  "donor": "上半年",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã¹³pã³⁵niã²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1337",
  "wordIds": [
   "yubao-60824-v-1337"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「下半年」。",
  "donor": "下半年",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕia²¹pã³⁵niã²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1354",
  "wordIds": [
   "yubao-60824-v-1354"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初一」。",
  "donor": "初一",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1356",
  "wordIds": [
   "yubao-60824-v-1356"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初三」。",
  "donor": "初三",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1357",
  "wordIds": [
   "yubao-60824-v-1357"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初四」。",
  "donor": "初四",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³si³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1358",
  "wordIds": [
   "yubao-60824-v-1358"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初五」。",
  "donor": "初五",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1359",
  "wordIds": [
   "yubao-60824-v-1359"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初六」。",
  "donor": "初六",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³lu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1360",
  "wordIds": [
   "yubao-60824-v-1360"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初七」。",
  "donor": "初七",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³tɕʰi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1361",
  "wordIds": [
   "yubao-60824-v-1361"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初八」。",
  "donor": "初八",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³pa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1362",
  "wordIds": [
   "yubao-60824-v-1362"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初九」。",
  "donor": "初九",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³tɕiʉ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1363",
  "wordIds": [
   "yubao-60824-v-1363"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「初十」。",
  "donor": "初十",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1365",
  "wordIds": [
   "yubao-60824-v-1365"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「半天」。",
  "donor": "半天",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã³⁵tʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1367",
  "wordIds": [
   "yubao-60824-v-1367"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「东」。",
  "donor": "东",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tõ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1371",
  "wordIds": [
   "yubao-60824-v-1371"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「正面」。",
  "donor": "正面",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ¹³miã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1372",
  "wordIds": [
   "yubao-60824-v-1372"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「反面」。",
  "donor": "反面",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fã⁵⁵miã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1414",
  "wordIds": [
   "yubao-60824-v-1414"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「西瓜」。",
  "donor": "西瓜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi³³kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1417",
  "wordIds": [
   "yubao-60824-v-1417"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「樱桃」。",
  "donor": "樱桃",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ³³dau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1422",
  "wordIds": [
   "yubao-60824-v-1422"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「香蕉」。",
  "donor": "香蕉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã³³tɕiau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1423",
  "wordIds": [
   "yubao-60824-v-1423"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「芭蕉」。",
  "donor": "芭蕉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa³³tɕiau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1426",
  "wordIds": [
   "yubao-60824-v-1426"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「橙子」。",
  "donor": "橙子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzẽ¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1432",
  "wordIds": [
   "yubao-60824-v-1432"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「葵花子」。",
  "donor": "葵花子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɡuei¹³xua³³tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1436",
  "wordIds": [
   "yubao-60824-v-1436"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「仙人掌」。",
  "donor": "仙人掌",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã³⁵zẽ²¹tsã⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1442",
  "wordIds": [
   "yubao-60824-v-1442"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「菊花」。",
  "donor": "菊花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕy¹³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1443",
  "wordIds": [
   "yubao-60824-v-1443"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「桂花」。",
  "donor": "桂花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuei³⁵xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1445",
  "wordIds": [
   "yubao-60824-v-1445"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「月季花」。",
  "donor": "月季花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ye²¹tɕi²¹xua³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1448",
  "wordIds": [
   "yubao-60824-v-1448"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「鸡冠花」。",
  "donor": "鸡冠花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³³kuã³³xua³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1449",
  "wordIds": [
   "yubao-60824-v-1449"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「葵花」。",
  "donor": "葵花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɡuei¹³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1452",
  "wordIds": [
   "yubao-60824-v-1452"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「金银花」。",
  "donor": "金银花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³nĩ³³xua³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1467",
  "wordIds": [
   "yubao-60824-v-1467"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「莲子」。",
  "donor": "莲子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liã¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1473",
  "wordIds": [
   "yubao-60824-v-1473"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蒲公英」。",
  "donor": "蒲公英",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bu¹³kõ³³jĩ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1475",
  "wordIds": [
   "yubao-60824-v-1475"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「灵芝」。",
  "donor": "灵芝",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lĩ¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1498",
  "wordIds": [
   "yubao-60824-v-1498"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「稗子」。",
  "donor": "稗子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pai¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1505",
  "wordIds": [
   "yubao-60824-v-1505"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「燕麦」。",
  "donor": "燕麦",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jã³⁵me⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1507",
  "wordIds": [
   "yubao-60824-v-1507"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「苦荞」。",
  "donor": "苦荞",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵⁵dʑiau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1514",
  "wordIds": [
   "yubao-60824-v-1514"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蓖麻子」。",
  "donor": "蓖麻子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi⁵⁵ma²¹tsi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1521",
  "wordIds": [
   "yubao-60824-v-1521"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冬瓜」。",
  "donor": "冬瓜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tõ³³kua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1522",
  "wordIds": [
   "yubao-60824-v-1522"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「苦瓜」。",
  "donor": "苦瓜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵⁵kua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1524",
  "wordIds": [
   "yubao-60824-v-1524"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「花菜」。",
  "donor": "花菜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua³³tsʰai¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1537",
  "wordIds": [
   "yubao-60824-v-1537"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冬笋」。",
  "donor": "冬笋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tõ²¹suẽ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1544",
  "wordIds": [
   "yubao-60824-v-1544"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「狮子」。",
  "donor": "狮子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1557",
  "wordIds": [
   "yubao-60824-v-1557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「狐狸」。",
  "donor": "狐狸",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fu¹³li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1559",
  "wordIds": [
   "yubao-60824-v-1559"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「黄鼠狼」。",
  "donor": "黄鼠狼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã¹³su⁵⁵lã²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1561",
  "wordIds": [
   "yubao-60824-v-1561"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「水獭」。",
  "donor": "水獭",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵tʰa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1563",
  "wordIds": [
   "yubao-60824-v-1563"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「野牛」。",
  "donor": "野牛",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "je⁵⁵niʉ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1566",
  "wordIds": [
   "yubao-60824-v-1566"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「骆驼」。",
  "donor": "骆驼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "no¹³do³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1576",
  "wordIds": [
   "yubao-60824-v-1576"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「燕子」。",
  "donor": "燕子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jã¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1577",
  "wordIds": [
   "yubao-60824-v-1577"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「野鸡」。",
  "donor": "野鸡",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "je⁵⁵tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1581",
  "wordIds": [
   "yubao-60824-v-1581"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「孔雀」。",
  "donor": "孔雀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰõ⁵⁵tɕʰio²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1582",
  "wordIds": [
   "yubao-60824-v-1582"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「鹦鹉」。",
  "donor": "鹦鹉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ⁵⁵wu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1583",
  "wordIds": [
   "yubao-60824-v-1583"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「画眉」。",
  "donor": "画眉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua⁵⁵mi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1590",
  "wordIds": [
   "yubao-60824-v-1590"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「麝香」。",
  "donor": "麝香",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "se¹³ɕiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1593",
  "wordIds": [
   "yubao-60824-v-1593"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「毒蛇」。",
  "donor": "毒蛇",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu²¹se²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1594",
  "wordIds": [
   "yubao-60824-v-1594"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蟒蛇」。",
  "donor": "蟒蛇",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mã⁵⁵se²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1595",
  "wordIds": [
   "yubao-60824-v-1595"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「水蛇」。",
  "donor": "水蛇",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵se²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1600",
  "wordIds": [
   "yubao-60824-v-1600"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「七寸」。",
  "donor": "七寸",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹tsʰuẽ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1606",
  "wordIds": [
   "yubao-60824-v-1606"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「四脚蛇」。",
  "donor": "四脚蛇",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³⁵tɕio²¹se²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1624",
  "wordIds": [
   "yubao-60824-v-1624"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「飞蛾」。",
  "donor": "飞蛾",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fei³³ŋo²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1629",
  "wordIds": [
   "yubao-60824-v-1629"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蚂蟥」。",
  "donor": "蚂蟥",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵wã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1637",
  "wordIds": [
   "yubao-60824-v-1637"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「屎蛆蛆」。",
  "donor": "屎蛆蛆",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "se³⁵tɕʰy³³tɕʰy³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1651",
  "wordIds": [
   "yubao-60824-v-1651"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「金鱼」。",
  "donor": "金鱼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³y²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1689",
  "wordIds": [
   "yubao-60824-v-1689"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「绵羊」。",
  "donor": "绵羊",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã¹³jã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1724",
  "wordIds": [
   "yubao-60824-v-1724"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「仓库」。",
  "donor": "仓库",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰã³³kʰu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1725",
  "wordIds": [
   "yubao-60824-v-1725"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「棚子」。",
  "donor": "棚子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bõ¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1741",
  "wordIds": [
   "yubao-60824-v-1741"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「栏杆」。",
  "donor": "栏杆",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nã³⁵kã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1742",
  "wordIds": [
   "yubao-60824-v-1742"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「桩子」。",
  "donor": "桩子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuã³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1753",
  "wordIds": [
   "yubao-60824-v-1753"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「围墙」。",
  "donor": "围墙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wei¹³dʑiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1764",
  "wordIds": [
   "yubao-60824-v-1764"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「皮箱」。",
  "donor": "皮箱",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bi¹³ɕiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1765",
  "wordIds": [
   "yubao-60824-v-1765"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「衣柜」。",
  "donor": "衣柜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji³³kuei¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1766",
  "wordIds": [
   "yubao-60824-v-1766"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「桌子」。",
  "donor": "桌子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tso²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1769",
  "wordIds": [
   "yubao-60824-v-1769"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「电视」。",
  "donor": "电视",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã³⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1770",
  "wordIds": [
   "yubao-60824-v-1770"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冰箱」。",
  "donor": "冰箱",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pĩ³³ɕiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1771",
  "wordIds": [
   "yubao-60824-v-1771"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「洗衣机」。",
  "donor": "洗衣机",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵ji³³tɕi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1772",
  "wordIds": [
   "yubao-60824-v-1772"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「电灯」。",
  "donor": "电灯",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã³⁵tẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1773",
  "wordIds": [
   "yubao-60824-v-1773"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「灯泡」。",
  "donor": "灯泡",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tẽ³³pʰau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1774",
  "wordIds": [
   "yubao-60824-v-1774"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「电线」。",
  "donor": "电线",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã¹³ɕiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1775",
  "wordIds": [
   "yubao-60824-v-1775"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「开关」。",
  "donor": "开关",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰai³³kuã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1777",
  "wordIds": [
   "yubao-60824-v-1777"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「灯罩」。",
  "donor": "灯罩",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tẽ³³tsau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1779",
  "wordIds": [
   "yubao-60824-v-1779"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「灯花」。",
  "donor": "灯花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tẽ³³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1780",
  "wordIds": [
   "yubao-60824-v-1780"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「灯笼」。",
  "donor": "灯笼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tẽ³³lõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1787",
  "wordIds": [
   "yubao-60824-v-1787"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「篮子」。",
  "donor": "篮子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nã¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1793",
  "wordIds": [
   "yubao-60824-v-1793"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「抹布」。",
  "donor": "抹布",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma²¹pu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1795",
  "wordIds": [
   "yubao-60824-v-1795"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蓑衣」。",
  "donor": "蓑衣",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "so³³ji³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1798",
  "wordIds": [
   "yubao-60824-v-1798"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「炉子」。",
  "donor": "炉子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1799",
  "wordIds": [
   "yubao-60824-v-1799"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「火筒」。",
  "donor": "火筒",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵dõ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1800",
  "wordIds": [
   "yubao-60824-v-1800"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「铁夹」。",
  "donor": "铁夹",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰie²¹ka²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1801",
  "wordIds": [
   "yubao-60824-v-1801"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「大锅」。",
  "donor": "大锅",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʉ²¹ku¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1809",
  "wordIds": [
   "yubao-60824-v-1809"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「丝瓜瓤瓤」。",
  "donor": "丝瓜瓤瓤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³³kua³³zã³³zã³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1816",
  "wordIds": [
   "yubao-60824-v-1816"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「砧板」。",
  "donor": "砧板",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ⁵⁵pã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1825",
  "wordIds": [
   "yubao-60824-v-1825"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「尖刀」。",
  "donor": "尖刀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³³tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1828",
  "wordIds": [
   "yubao-60824-v-1828"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「刀面」。",
  "donor": "刀面",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau³⁵miã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1831",
  "wordIds": [
   "yubao-60824-v-1831"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「柴刀」。",
  "donor": "柴刀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzai¹³tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1834",
  "wordIds": [
   "yubao-60824-v-1834"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「杯子」。",
  "donor": "杯子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pei³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1835",
  "wordIds": [
   "yubao-60824-v-1835"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「玻璃杯」。",
  "donor": "玻璃杯",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "po³³li³³pei³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1851",
  "wordIds": [
   "yubao-60824-v-1851"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「凿子」。",
  "donor": "凿子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰo¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1862",
  "wordIds": [
   "yubao-60824-v-1862"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「子弹」。",
  "donor": "子弹",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi⁵⁵tã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1864",
  "wordIds": [
   "yubao-60824-v-1864"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「子弹壳壳」。",
  "donor": "子弹壳壳",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi⁵⁵tã¹³kʰo²¹kʰo²¹",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1871",
  "wordIds": [
   "yubao-60824-v-1871"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「毒箭」。",
  "donor": "毒箭",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu²¹tɕiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1886",
  "wordIds": [
   "yubao-60824-v-1886"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「锥子」。",
  "donor": "锥子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuei³³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1889",
  "wordIds": [
   "yubao-60824-v-1889"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「蒲团」。",
  "donor": "蒲团",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bu¹³duã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1891",
  "wordIds": [
   "yubao-60824-v-1891"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「眼镜」。",
  "donor": "眼镜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jã⁵⁵tɕĩ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1895",
  "wordIds": [
   "yubao-60824-v-1895"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钱包」。",
  "donor": "钱包",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑiã¹³pau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1898",
  "wordIds": [
   "yubao-60824-v-1898"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「烟灰」。",
  "donor": "烟灰",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jã³³xuei³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1901",
  "wordIds": [
   "yubao-60824-v-1901"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「水烟枪」。",
  "donor": "水烟枪",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵jã²¹tɕʰiã³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1906",
  "wordIds": [
   "yubao-60824-v-1906"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「洗衣粉」。",
  "donor": "洗衣粉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵ji³³fẽ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1911",
  "wordIds": [
   "yubao-60824-v-1911"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「锯末粉」。",
  "donor": "锯末粉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɨ³⁵mu²¹fẽ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1917",
  "wordIds": [
   "yubao-60824-v-1917"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钳子」。",
  "donor": "钳子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑiã¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1918",
  "wordIds": [
   "yubao-60824-v-1918"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「推剪」。",
  "donor": "推剪",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰuei¹³tɕiã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1924",
  "wordIds": [
   "yubao-60824-v-1924"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「毯子」。",
  "donor": "毯子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰã⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1933",
  "wordIds": [
   "yubao-60824-v-1933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「门帘」。",
  "donor": "门帘",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mẽ¹³liã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1934",
  "wordIds": [
   "yubao-60824-v-1934"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「火镰」。",
  "donor": "火镰",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵liã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1935",
  "wordIds": [
   "yubao-60824-v-1935"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「火盆」。",
  "donor": "火盆",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵bẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1939",
  "wordIds": [
   "yubao-60824-v-1939"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「水碾」。",
  "donor": "水碾",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵niã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1940",
  "wordIds": [
   "yubao-60824-v-1940"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「拖拉机」。",
  "donor": "拖拉机",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰo³³la³³tɕi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1943",
  "wordIds": [
   "yubao-60824-v-1943"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「牙刷」。",
  "donor": "牙刷",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ja¹³sua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1944",
  "wordIds": [
   "yubao-60824-v-1944"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「牙膏」。",
  "donor": "牙膏",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ja¹³kau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1947",
  "wordIds": [
   "yubao-60824-v-1947"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「飞机」。",
  "donor": "飞机",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fei³³tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1950",
  "wordIds": [
   "yubao-60824-v-1950"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「麻布」。",
  "donor": "麻布",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma²¹pu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1954",
  "wordIds": [
   "yubao-60824-v-1954"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「棉线」。",
  "donor": "棉线",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã²¹ɕiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1958",
  "wordIds": [
   "yubao-60824-v-1958"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「皮子」。",
  "donor": "皮子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bi²¹tsi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1964",
  "wordIds": [
   "yubao-60824-v-1964"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「单衣」。",
  "donor": "单衣",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tã³³ji³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1967",
  "wordIds": [
   "yubao-60824-v-1967"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「短袖」。",
  "donor": "短袖",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuã⁵⁵ɕiʉ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1979",
  "wordIds": [
   "yubao-60824-v-1979"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「裤裆」。",
  "donor": "裤裆",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu¹³tã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1981",
  "wordIds": [
   "yubao-60824-v-1981"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「靴子」。",
  "donor": "靴子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕye³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1983",
  "wordIds": [
   "yubao-60824-v-1983"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「皮鞋」。",
  "donor": "皮鞋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bi¹³xai³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1984",
  "wordIds": [
   "yubao-60824-v-1984"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「胶鞋」。",
  "donor": "胶鞋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau³³xai²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1989",
  "wordIds": [
   "yubao-60824-v-1989"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「皮帽子」。",
  "donor": "皮帽子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bi¹³mau⁵⁵tsi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2000",
  "wordIds": [
   "yubao-60824-v-2000"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「项链」。",
  "donor": "项链",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã¹³liã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2001",
  "wordIds": [
   "yubao-60824-v-2001"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「珠子」。",
  "donor": "珠子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tso³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2002",
  "wordIds": [
   "yubao-60824-v-2002"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「粉」。",
  "donor": "粉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fẽ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2008",
  "wordIds": [
   "yubao-60824-v-2008"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「排骨」。",
  "donor": "排骨",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bai²¹ku²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2011",
  "wordIds": [
   "yubao-60824-v-2011"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「腊肉」。",
  "donor": "腊肉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la¹³zu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2013",
  "wordIds": [
   "yubao-60824-v-2013"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「五花肉」。",
  "donor": "五花肉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu⁵⁵xua³³zu²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2015",
  "wordIds": [
   "yubao-60824-v-2015"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「坨坨肉」。",
  "donor": "坨坨肉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "do²¹do²¹zu²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2018",
  "wordIds": [
   "yubao-60824-v-2018"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「粉丝」。",
  "donor": "粉丝",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fẽ⁵⁵si³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2020",
  "wordIds": [
   "yubao-60824-v-2020"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「粉条」。",
  "donor": "粉条",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fẽ⁵⁵diau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2021",
  "wordIds": [
   "yubao-60824-v-2021"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「粉皮皮」。",
  "donor": "粉皮皮",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fẽ⁵⁵bi²¹bi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2022",
  "wordIds": [
   "yubao-60824-v-2022"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「面片」。",
  "donor": "面片",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã¹³pʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2032",
  "wordIds": [
   "yubao-60824-v-2032"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「米汤」。",
  "donor": "米汤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mi⁵⁵tʰã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2037",
  "wordIds": [
   "yubao-60824-v-2037"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「面筋」。",
  "donor": "面筋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã¹³tɕĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2040",
  "wordIds": [
   "yubao-60824-v-2040"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冰糖」。",
  "donor": "冰糖",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bĩ³³dã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2042",
  "wordIds": [
   "yubao-60824-v-2042"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「瓜子」。",
  "donor": "瓜子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kua⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2046",
  "wordIds": [
   "yubao-60824-v-2046"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「板油」。",
  "donor": "板油",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã⁵⁵jiʉ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2051",
  "wordIds": [
   "yubao-60824-v-2051"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「花生油」。",
  "donor": "花生油",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua³³sẽ³³jiʉ²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2052",
  "wordIds": [
   "yubao-60824-v-2052"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「八角」。",
  "donor": "八角",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa²¹ko²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2054",
  "wordIds": [
   "yubao-60824-v-2054"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「花椒」。",
  "donor": "花椒",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua³³tɕiau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2055",
  "wordIds": [
   "yubao-60824-v-2055"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「胡椒粉」。",
  "donor": "胡椒粉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fu¹³tɕiau³³fẽ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2058",
  "wordIds": [
   "yubao-60824-v-2058"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「麻花」。",
  "donor": "麻花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma¹³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2074",
  "wordIds": [
   "yubao-60824-v-2074"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「凉粉」。",
  "donor": "凉粉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liã¹³fẽ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2078",
  "wordIds": [
   "yubao-60824-v-2078"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「皮肤」。",
  "donor": "皮肤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bi¹³fu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2097",
  "wordIds": [
   "yubao-60824-v-2097"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「筋」。",
  "donor": "筋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2112",
  "wordIds": [
   "yubao-60824-v-2112"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「气管」。",
  "donor": "气管",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi¹³kuã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2115",
  "wordIds": [
   "yubao-60824-v-2115"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「酒窝」。",
  "donor": "酒窝",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiʉ⁵⁵wo³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2117",
  "wordIds": [
   "yubao-60824-v-2117"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「太阳心」。",
  "donor": "太阳心",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰai³⁵jã²¹sẽ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2118",
  "wordIds": [
   "yubao-60824-v-2118"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「眼皮」。",
  "donor": "眼皮",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ŋã⁵⁵bi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2119",
  "wordIds": [
   "yubao-60824-v-2119"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「单眼皮」。",
  "donor": "单眼皮",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tã³³ŋã⁵⁵bi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2120",
  "wordIds": [
   "yubao-60824-v-2120"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「双眼皮」。",
  "donor": "双眼皮",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suã³³ŋã⁵⁵bi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2133",
  "wordIds": [
   "yubao-60824-v-2133"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「门牙」。",
  "donor": "门牙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mẽ¹³ŋa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2139",
  "wordIds": [
   "yubao-60824-v-2139"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「假牙」。",
  "donor": "假牙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕia⁵⁵ja²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2143",
  "wordIds": [
   "yubao-60824-v-2143"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「人中」。",
  "donor": "人中",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zẽ¹³tsõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2145",
  "wordIds": [
   "yubao-60824-v-2145"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「八字胡」。",
  "donor": "八字胡",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa²¹tsi²¹fu²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2159",
  "wordIds": [
   "yubao-60824-v-2159"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「指纹」。",
  "donor": "指纹",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi⁵⁵wẽ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2163",
  "wordIds": [
   "yubao-60824-v-2163"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「脚肚子」。",
  "donor": "脚肚子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕio²¹tu⁵⁵tsi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2172",
  "wordIds": [
   "yubao-60824-v-2172"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「子宫」。",
  "donor": "子宫",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi⁵⁵kõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2180",
  "wordIds": [
   "yubao-60824-v-2180"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「药店」。",
  "donor": "药店",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jio²¹tiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2182",
  "wordIds": [
   "yubao-60824-v-2182"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「西医」。",
  "donor": "西医",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi³³ji³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2185",
  "wordIds": [
   "yubao-60824-v-2185"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「内伤」。",
  "donor": "内伤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luei¹³sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2186",
  "wordIds": [
   "yubao-60824-v-2186"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「外伤」。",
  "donor": "外伤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wai¹³sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2189",
  "wordIds": [
   "yubao-60824-v-2189"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「药粉」。",
  "donor": "药粉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jau²¹fẽ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2192",
  "wordIds": [
   "yubao-60824-v-2192"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「药酒」。",
  "donor": "药酒",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jio¹³tɕiʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2193",
  "wordIds": [
   "yubao-60824-v-2193"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「草药」。",
  "donor": "草药",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰau³³jio³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2195",
  "wordIds": [
   "yubao-60824-v-2195"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「毒药」。",
  "donor": "毒药",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu¹³jio³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2200",
  "wordIds": [
   "yubao-60824-v-2200"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「麻药」。",
  "donor": "麻药",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma²¹jio²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2201",
  "wordIds": [
   "yubao-60824-v-2201"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「补药」。",
  "donor": "补药",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu⁵⁵jio²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2207",
  "wordIds": [
   "yubao-60824-v-2207"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「感冒」。",
  "donor": "感冒",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵mau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2208",
  "wordIds": [
   "yubao-60824-v-2208"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「传染」。",
  "donor": "传染",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑyã¹³sã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2220",
  "wordIds": [
   "yubao-60824-v-2220"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「天花」。",
  "donor": "天花",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiã³³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2232",
  "wordIds": [
   "yubao-60824-v-2232"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「痔疮」。",
  "donor": "痔疮",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi³³tsʰuã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2235",
  "wordIds": [
   "yubao-60824-v-2235"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「水泡子」。",
  "donor": "水泡子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵pʰau¹³tsi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2238",
  "wordIds": [
   "yubao-60824-v-2238"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「梅毒」。",
  "donor": "梅毒",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei²¹tu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2243",
  "wordIds": [
   "yubao-60824-v-2243"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「伤」。",
  "donor": "伤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2248",
  "wordIds": [
   "yubao-60824-v-2248"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「麻子」。",
  "donor": "麻子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2250",
  "wordIds": [
   "yubao-60824-v-2250"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「结巴」。",
  "donor": "结巴",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕie²¹pa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2251",
  "wordIds": [
   "yubao-60824-v-2251"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「脚气」。",
  "donor": "脚气",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕio²¹tɕʰi¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2256",
  "wordIds": [
   "yubao-60824-v-2256"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「近视眼」。",
  "donor": "近视眼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³⁵si²¹ŋã⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2257",
  "wordIds": [
   "yubao-60824-v-2257"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「老花眼」。",
  "donor": "老花眼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵xua³³ŋã⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2258",
  "wordIds": [
   "yubao-60824-v-2258"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「白内障」。",
  "donor": "白内障",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pe²¹luei³⁵tsã¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2268",
  "wordIds": [
   "yubao-60824-v-2268"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「离婚」。",
  "donor": "离婚",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li³⁵xuẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2271",
  "wordIds": [
   "yubao-60824-v-2271"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「脐带」。",
  "donor": "脐带",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑi²¹tai³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2275",
  "wordIds": [
   "yubao-60824-v-2275"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「岁数」。",
  "donor": "岁数",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei¹³su³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2277",
  "wordIds": [
   "yubao-60824-v-2277"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「尸体」。",
  "donor": "尸体",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si⁵⁵tʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2294",
  "wordIds": [
   "yubao-60824-v-2294"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「神仙」。",
  "donor": "神仙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sẽ¹³ɕiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2316",
  "wordIds": [
   "yubao-60824-v-2316"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「工人」。",
  "donor": "工人",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ³³zẽ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2319",
  "wordIds": [
   "yubao-60824-v-2319"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「土司」。",
  "donor": "土司",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2320",
  "wordIds": [
   "yubao-60824-v-2320"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「医生」。",
  "donor": "医生",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji¹³sẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2322",
  "wordIds": [
   "yubao-60824-v-2322"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「屠夫」。",
  "donor": "屠夫",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʉ²¹fu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2323",
  "wordIds": [
   "yubao-60824-v-2323"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「老板」。",
  "donor": "老板",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵pã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2325",
  "wordIds": [
   "yubao-60824-v-2325"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「土匪」。",
  "donor": "土匪",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵fei³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2328",
  "wordIds": [
   "yubao-60824-v-2328"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「民族」。",
  "donor": "民族",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mĩ²¹tsʰʉ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2330",
  "wordIds": [
   "yubao-60824-v-2330"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「老百姓」。",
  "donor": "老百姓",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵pe²¹ɕĩ¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2332",
  "wordIds": [
   "yubao-60824-v-2332"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「主人家」。",
  "donor": "主人家",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu⁵⁵zẽ²¹ka²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2333",
  "wordIds": [
   "yubao-60824-v-2333"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「兵」。",
  "donor": "兵",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pĩ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2336",
  "wordIds": [
   "yubao-60824-v-2336"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「敌人」。",
  "donor": "敌人",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti¹³zẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2338",
  "wordIds": [
   "yubao-60824-v-2338"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「裁判」。",
  "donor": "裁判",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzai²¹pʰã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2341",
  "wordIds": [
   "yubao-60824-v-2341"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「证人」。",
  "donor": "证人",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ³⁵zẽ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2345",
  "wordIds": [
   "yubao-60824-v-2345"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「皇帝」。",
  "donor": "皇帝",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuã¹³ti³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2349",
  "wordIds": [
   "yubao-60824-v-2349"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「篾匠」。",
  "donor": "篾匠",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mie²¹tɕiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2350",
  "wordIds": [
   "yubao-60824-v-2350"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「铁匠」。",
  "donor": "铁匠",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰie²¹tɕiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2354",
  "wordIds": [
   "yubao-60824-v-2354"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「叛徒」。",
  "donor": "叛徒",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰã³⁵du²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2356",
  "wordIds": [
   "yubao-60824-v-2356"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「私生子」。",
  "donor": "私生子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³³sẽ³³tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2359",
  "wordIds": [
   "yubao-60824-v-2359"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「长辈」。",
  "donor": "长辈",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsã⁵⁵pei¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2377",
  "wordIds": [
   "yubao-60824-v-2377"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「侄女」。",
  "donor": "侄女",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi¹³ny⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2382",
  "wordIds": [
   "yubao-60824-v-2382"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「祖宗」。",
  "donor": "祖宗",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʉ⁵⁵tsõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2385",
  "wordIds": [
   "yubao-60824-v-2385"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「男朋友」。",
  "donor": "男朋友",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nã²¹bõ¹³jiʉ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2386",
  "wordIds": [
   "yubao-60824-v-2386"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「女朋友」。",
  "donor": "女朋友",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ny⁵⁵bõ¹³jiʉ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2394",
  "wordIds": [
   "yubao-60824-v-2394"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「重孙」。",
  "donor": "重孙",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dzõ¹³suẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2399",
  "wordIds": [
   "yubao-60824-v-2399"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「亲家」。",
  "donor": "亲家",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ³⁵ka²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2419",
  "wordIds": [
   "yubao-60824-v-2419"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「肥料」。",
  "donor": "肥料",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuei²¹liau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2430",
  "wordIds": [
   "yubao-60824-v-2430"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「铲子」。",
  "donor": "铲子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰã⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2436",
  "wordIds": [
   "yubao-60824-v-2436"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「铡刀」。",
  "donor": "铡刀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsa¹³tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2454",
  "wordIds": [
   "yubao-60824-v-2454"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「马棚棚」。",
  "donor": "马棚棚",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mo¹³bõ³³bõ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2457",
  "wordIds": [
   "yubao-60824-v-2457"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「笼子」。",
  "donor": "笼子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lõ¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2458",
  "wordIds": [
   "yubao-60824-v-2458"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「猪槽」。",
  "donor": "猪槽",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsu³³dzau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2474",
  "wordIds": [
   "yubao-60824-v-2474"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「出租」。",
  "donor": "出租",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu¹³tsʉ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
 "id": "chinese-loan-yubao-60824-v-2483",
 "wordIds": [
  "yubao-60824-v-2483"
 ],
 "kind": "借词来源",
 "text": "可能借自湘语「火车」。",
 "donor": "火车",
 "donorVariety": "湘语",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "xo⁵⁵tsʰe³³",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "ma-car-dragonfly-2026-10-23"
},
 {
 "id": "chinese-loan-yubao-60824-v-2484",
 "wordIds": [
  "yubao-60824-v-2484"
 ],
 "kind": "借词来源",
 "text": "可能借自湘语「汽车」。",
 "donor": "汽车",
 "donorVariety": "湘语",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tɕʰi¹³tsʰe³³",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "ma-car-dragonfly-2026-10-23"
},
 {
  "id": "chinese-loan-yubao-60824-v-2486",
  "wordIds": [
   "yubao-60824-v-2486"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「渡船」。",
  "donor": "渡船",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu¹³dʑuã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2489",
  "wordIds": [
   "yubao-60824-v-2489"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「电话」。",
  "donor": "电话",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã¹³xua³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2490",
  "wordIds": [
   "yubao-60824-v-2490"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「机器」。",
  "donor": "机器",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi³³tɕʰi¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2506",
  "wordIds": [
   "yubao-60824-v-2506"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「乡政府」。",
  "donor": "乡政府",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã³³tsẽ¹³fu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2507",
  "wordIds": [
   "yubao-60824-v-2507"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「省」。",
  "donor": "省",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sẽ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2510",
  "wordIds": [
   "yubao-60824-v-2510"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「章子」。",
  "donor": "章子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsã³³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2511",
  "wordIds": [
   "yubao-60824-v-2511"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「私章」。",
  "donor": "私章",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³³tsã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2512",
  "wordIds": [
   "yubao-60824-v-2512"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「记号」。",
  "donor": "记号",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi¹³xau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2513",
  "wordIds": [
   "yubao-60824-v-2513"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「证据」。",
  "donor": "证据",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ¹³tɕy³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2514",
  "wordIds": [
   "yubao-60824-v-2514"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「黑板」。",
  "donor": "黑板",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xe¹³pã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2515",
  "wordIds": [
   "yubao-60824-v-2515"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「粉笔」。",
  "donor": "粉笔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fẽ⁵⁵pi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2520",
  "wordIds": [
   "yubao-60824-v-2520"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「小学」。",
  "donor": "小学",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵⁵ɕye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2522",
  "wordIds": [
   "yubao-60824-v-2522"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「大学」。",
  "donor": "大学",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta³⁵ɕye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2525",
  "wordIds": [
   "yubao-60824-v-2525"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「毕业」。",
  "donor": "毕业",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi²¹nie²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2539",
  "wordIds": [
   "yubao-60824-v-2539"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「琴」。",
  "donor": "琴",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑĩ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2549",
  "wordIds": [
   "yubao-60824-v-2549"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「木鱼」。",
  "donor": "木鱼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mo¹³ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2551",
  "wordIds": [
   "yubao-60824-v-2551"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「相片」。",
  "donor": "相片",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã¹³pʰiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2554",
  "wordIds": [
   "yubao-60824-v-2554"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「墨水」。",
  "donor": "墨水",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me¹³suei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2555",
  "wordIds": [
   "yubao-60824-v-2555"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「墨汁」。",
  "donor": "墨汁",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2556",
  "wordIds": [
   "yubao-60824-v-2556"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「糨糊」。",
  "donor": "糨糊",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³³fu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2557",
  "wordIds": [
   "yubao-60824-v-2557"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「地图」。",
  "donor": "地图",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³⁵du²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2558",
  "wordIds": [
   "yubao-60824-v-2558"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「图画」。",
  "donor": "图画",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "du²¹xua¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2564",
  "wordIds": [
   "yubao-60824-v-2564"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「减」。",
  "donor": "减",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2571",
  "wordIds": [
   "yubao-60824-v-2571"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「棋子」。",
  "donor": "棋子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑi²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2572",
  "wordIds": [
   "yubao-60824-v-2572"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「比赛」。",
  "donor": "比赛",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi⁵⁵sai¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2643",
  "wordIds": [
   "yubao-60824-v-2643"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「争」。",
  "donor": "争",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2644",
  "wordIds": [
   "yubao-60824-v-2644"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「吃亏」。",
  "donor": "吃亏",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³kʰuei³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2645",
  "wordIds": [
   "yubao-60824-v-2645"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「上当」。",
  "donor": "上当",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã¹³tã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2651",
  "wordIds": [
   "yubao-60824-v-2651"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「犯法」。",
  "donor": "犯法",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fuã³⁵fa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2652",
  "wordIds": [
   "yubao-60824-v-2652"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「赌博」。",
  "donor": "赌博",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu⁵⁵po²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2656",
  "wordIds": [
   "yubao-60824-v-2656"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「呛」。",
  "donor": "呛",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2668",
  "wordIds": [
   "yubao-60824-v-2668"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「弹」。",
  "donor": "弹",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2691",
  "wordIds": [
   "yubao-60824-v-2691"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「搬」。",
  "donor": "搬",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2706",
  "wordIds": [
   "yubao-60824-v-2706"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「卷」。",
  "donor": "卷",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕyã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2711",
  "wordIds": [
   "yubao-60824-v-2711"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「填」。",
  "donor": "填",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "diã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2713",
  "wordIds": [
   "yubao-60824-v-2713"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「用」。",
  "donor": "用",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiõ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2727",
  "wordIds": [
   "yubao-60824-v-2727"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「招待」。",
  "donor": "招待",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau³³tai¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2748",
  "wordIds": [
   "yubao-60824-v-2748"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「垫」。",
  "donor": "垫",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2787",
  "wordIds": [
   "yubao-60824-v-2787"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「照顾」。",
  "donor": "照顾",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau¹³ku³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2791",
  "wordIds": [
   "yubao-60824-v-2791"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「劳改」。",
  "donor": "劳改",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau¹³kai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2811",
  "wordIds": [
   "yubao-60824-v-2811"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钉」。",
  "donor": "钉",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tẽ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2831",
  "wordIds": [
   "yubao-60824-v-2831"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「放心」。",
  "donor": "放心",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fã¹³ɕĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2834",
  "wordIds": [
   "yubao-60824-v-2834"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「恼火」。",
  "donor": "恼火",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nau⁵⁵xo⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2839",
  "wordIds": [
   "yubao-60824-v-2839"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「可惜」。",
  "donor": "可惜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰo⁵⁵ɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2844",
  "wordIds": [
   "yubao-60824-v-2844"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「介绍」。",
  "donor": "介绍",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai¹³sau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2850",
  "wordIds": [
   "yubao-60824-v-2850"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「正」。",
  "donor": "正",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2851",
  "wordIds": [
   "yubao-60824-v-2851"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「反」。",
  "donor": "反",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fã⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2859",
  "wordIds": [
   "yubao-60824-v-2859"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「冷清」。",
  "donor": "冷清",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lẽ⁵⁵tɕʰĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2865",
  "wordIds": [
   "yubao-60824-v-2865"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「乱」。",
  "donor": "乱",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2875",
  "wordIds": [
   "yubao-60824-v-2875"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「纯」。",
  "donor": "纯",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suẽ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2878",
  "wordIds": [
   "yubao-60824-v-2878"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「强」。",
  "donor": "强",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑiã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2881",
  "wordIds": [
   "yubao-60824-v-2881"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「清楚」。",
  "donor": "清楚",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ³³tsʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2889",
  "wordIds": [
   "yubao-60824-v-2889"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「不要紧」。",
  "donor": "不要紧",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu²¹jau¹³tɕĩ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2890",
  "wordIds": [
   "yubao-60824-v-2890"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「方便」。",
  "donor": "方便",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fuã³³piã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2891",
  "wordIds": [
   "yubao-60824-v-2891"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「浪费」。",
  "donor": "浪费",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nã¹³fei³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2892",
  "wordIds": [
   "yubao-60824-v-2892"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「大意」。",
  "donor": "大意",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta¹³ji³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2894",
  "wordIds": [
   "yubao-60824-v-2894"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「聪明」。",
  "donor": "聪明",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰõ³³mĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2895",
  "wordIds": [
   "yubao-60824-v-2895"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「狡猾」。",
  "donor": "狡猾",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau⁵⁵xua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2911",
  "wordIds": [
   "yubao-60824-v-2911"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十一」。",
  "donor": "十一",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2913",
  "wordIds": [
   "yubao-60824-v-2913"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十三」。",
  "donor": "十三",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2914",
  "wordIds": [
   "yubao-60824-v-2914"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十四」。",
  "donor": "十四",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹si¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2915",
  "wordIds": [
   "yubao-60824-v-2915"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十五」。",
  "donor": "十五",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹wu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2916",
  "wordIds": [
   "yubao-60824-v-2916"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十六」。",
  "donor": "十六",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹lu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2917",
  "wordIds": [
   "yubao-60824-v-2917"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十七」。",
  "donor": "十七",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹tɕʰi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2918",
  "wordIds": [
   "yubao-60824-v-2918"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十八」。",
  "donor": "十八",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹pa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2919",
  "wordIds": [
   "yubao-60824-v-2919"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十九」。",
  "donor": "十九",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹tɕiʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2921",
  "wordIds": [
   "yubao-60824-v-2921"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「四十」。",
  "donor": "四十",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2922",
  "wordIds": [
   "yubao-60824-v-2922"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「五十」。",
  "donor": "五十",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu⁵⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2923",
  "wordIds": [
   "yubao-60824-v-2923"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「六十」。",
  "donor": "六十",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu²¹si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2924",
  "wordIds": [
   "yubao-60824-v-2924"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「七十」。",
  "donor": "七十",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2925",
  "wordIds": [
   "yubao-60824-v-2925"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「八十」。",
  "donor": "八十",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa²¹si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2926",
  "wordIds": [
   "yubao-60824-v-2926"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「九十」。",
  "donor": "九十",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiʉ⁵⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2927",
  "wordIds": [
   "yubao-60824-v-2927"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「一百零一」。",
  "donor": "一百零一",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji³⁵pe²¹nẽ²¹ji²¹",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2930",
  "wordIds": [
   "yubao-60824-v-2930"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「左右」。",
  "donor": "左右",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tso⁵⁵jiʉ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2933",
  "wordIds": [
   "yubao-60824-v-2933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十多个」。",
  "donor": "十多个",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹to³³ko¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2935",
  "wordIds": [
   "yubao-60824-v-2935"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「第三」。",
  "donor": "第三",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³⁵sã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2936",
  "wordIds": [
   "yubao-60824-v-2936"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「大致」。",
  "donor": "大致",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2937",
  "wordIds": [
   "yubao-60824-v-2937"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「一半」。",
  "donor": "一半",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji¹³pã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2940",
  "wordIds": [
   "yubao-60824-v-2940"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「间」。",
  "donor": "间",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2951",
  "wordIds": [
   "yubao-60824-v-2951"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「钱」。",
  "donor": "钱",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑiã²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2954",
  "wordIds": [
   "yubao-60824-v-2954"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「寸」。",
  "donor": "寸",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuẽ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2956",
  "wordIds": [
   "yubao-60824-v-2956"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「丈」。",
  "donor": "丈",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2973",
  "wordIds": [
   "yubao-60824-v-2973"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「到底」。",
  "donor": "到底",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tau¹³ti⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2974",
  "wordIds": [
   "yubao-60824-v-2974"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「差不多」。",
  "donor": "差不多",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa³³pu³³to³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2975",
  "wordIds": [
   "yubao-60824-v-2975"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「起码」。",
  "donor": "起码",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵ma⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2979",
  "wordIds": [
   "yubao-60824-v-2979"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「一直」。",
  "donor": "一直",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2991",
  "wordIds": [
   "yubao-60824-v-2991"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「难道」。",
  "donor": "难道",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nã¹³tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2992",
  "wordIds": [
   "yubao-60824-v-2992"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「究竟」。",
  "donor": "究竟",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiʉ¹³tɕĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2993",
  "wordIds": [
   "yubao-60824-v-2993"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「也许」。",
  "donor": "也许",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "je⁵⁵ɕy²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2994",
  "wordIds": [
   "yubao-60824-v-2994"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「一定」。",
  "donor": "一定",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji¹³tẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2995",
  "wordIds": [
   "yubao-60824-v-2995"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「暂时」。",
  "donor": "暂时",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsã³⁵si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2996",
  "wordIds": [
   "yubao-60824-v-2996"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「互相」。",
  "donor": "互相",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fu¹³ɕiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2997",
  "wordIds": [
   "yubao-60824-v-2997"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「居然」。",
  "donor": "居然",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕy³³zã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2999",
  "wordIds": [
   "yubao-60824-v-2999"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「像」。",
  "donor": "像",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiã¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w771",
  "wordIds": [
   "w771"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「共青团」。",
  "donor": "共青团",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ²⁴tɕʰiŋ⁵⁵tʰuɛn²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288913",
  "wordIds": [
   "stedt-rn-288913"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「共青团」。",
  "donor": "共青团",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kũ³⁵tɕʰĩ⁵⁵tʰuã²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1061",
  "wordIds": [
   "w1061"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「金銮宝殿」。",
  "donor": "金銮宝殿",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵lɔŋ²¹pau⁵⁵tiɛn²⁴",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1798",
  "wordIds": [
   "w1798"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「其他的」。",
  "donor": "其他的",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹tʰa⁵⁵ti⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2021",
  "wordIds": [
   "w2021"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「社会主义」。",
  "donor": "社会主义",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɤ²⁴fei⁵⁵tsu⁵⁵ȵi²⁴",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2082",
  "wordIds": [
   "w2082"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四个现代化」。",
  "donor": "四个现代化",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴kuɔ²⁴ɕiɛn²⁴tai⁵⁵fa²⁴",
    "span": [
     1,
     5
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2320",
  "wordIds": [
   "w2320"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「土地坛」。",
  "donor": "土地坛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵ti²⁴tʰaŋ²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2322",
  "wordIds": [
   "w2322"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「土家族」。",
  "donor": "土家族",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵tɕia⁵⁵tsu²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2662",
  "wordIds": [
   "w2662"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「责任制」。",
  "donor": "责任制",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɤ²¹zɜŋ²⁴tsɨ²⁴",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2670",
  "wordIds": [
   "w2670"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「真的话」。",
  "donor": "真的话",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ⁵⁵ti⁵⁵fa⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2645",
  "wordIds": [
   "w2645"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「早饭」。",
  "donor": "早饭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵¹fɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-375184",
  "wordIds": [
   "stedt-rn-375184"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「车轮子」。",
  "donor": "车轮子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰie⁵⁵luən²¹tsi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0727",
  "wordIds": [
   "yubao-60756-v-0727"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「圆珠笔」。",
  "donor": "圆珠笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑaŋ³³tsu³³pi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0727",
  "wordIds": [
   "yubao-60824-v-0727"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「圆珠笔」。",
  "donor": "圆珠笔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jyã¹³tsu³³pi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0687",
  "wordIds": [
   "yubao-60756-v-0687"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老虎钳子」。",
  "donor": "老虎钳子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵³xu³³tɕʰaŋ³³tsɿ³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1917",
  "wordIds": [
   "yubao-60756-v-1917"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老虎钳子」。",
  "donor": "老虎钳子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵xu⁵⁵tɕʰaŋ⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1917",
  "wordIds": [
   "yubao-60823-v-1917"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老虎钳子」。",
  "donor": "老虎钳子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵xu³³tɕʰiã³³tsɿ¹³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0565",
  "wordIds": [
   "yubao-60756-v-0565"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「灶神菩萨」。",
  "donor": "灶神菩萨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵seŋ⁵⁵pʰu³³sa³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0565",
  "wordIds": [
   "yubao-60823-v-0565"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「灶菩萨」。",
  "donor": "灶菩萨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau³³pʰu⁵⁵sa⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0544",
  "wordIds": [
   "yubao-60756-v-0544"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「双胞胎」。",
  "donor": "双胞胎",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suaŋ⁵⁵pau⁵⁵tʰɛ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0544",
  "wordIds": [
   "yubao-60824-v-0544"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「双生子」。",
  "donor": "双生子",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suã³³sẽ³³tsi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0072",
  "wordIds": [
   "yubao-60756-v-0072"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一辈子」。",
  "donor": "一辈子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³³pe³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0099",
  "wordIds": [
   "yubao-60756-v-0099"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大年初一」。",
  "donor": "大年初一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵ȵaŋ⁵⁵tsʰu³³ʑi³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0362",
  "wordIds": [
   "yubao-60756-v-0362"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「脚踏车」。",
  "donor": "脚踏车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕau³³tʰa³³tsʰe⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0641",
  "wordIds": [
   "yubao-60756-v-0641"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「弟媳妇」。",
  "donor": "弟媳妇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti⁵⁵ɕi⁵⁵xu⁵³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0655",
  "wordIds": [
   "yubao-60756-v-0655"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「重孙子」。",
  "donor": "重孙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɔŋ³³sun³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1077",
  "wordIds": [
   "yubao-60756-v-1077"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一百零五」。",
  "donor": "一百零五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³⁵pe⁵³leŋ³³u⁵³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1078",
  "wordIds": [
   "yubao-60756-v-1078"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一百五十」。",
  "donor": "一百五十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³⁵pe⁵³u⁵³sɿ³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1216",
  "wordIds": [
   "yubao-60756-v-1216"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「毛毛雨」。",
  "donor": "毛毛雨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau³³mau³³ʑi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1243",
  "wordIds": [
   "yubao-60756-v-1243"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「试验田」。",
  "donor": "试验田",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵ȵaŋ⁵⁵tʰiaŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1451",
  "wordIds": [
   "yubao-60756-v-1451"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「茉莉花」。",
  "donor": "茉莉花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɔ³³li⁵⁵xua⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1517",
  "wordIds": [
   "yubao-60756-v-1517"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「豆芽菜」。",
  "donor": "豆芽菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "təu⁵⁵ŋa⁵⁵tsʰɛ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1525",
  "wordIds": [
   "yubao-60756-v-1525"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「空心菜」。",
  "donor": "空心菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɔŋ⁵⁵ɕiŋ⁵⁵tsʰɛ⁵³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1596",
  "wordIds": [
   "yubao-60756-v-1596"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「眼镜蛇」。",
  "donor": "眼镜蛇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑaŋ⁵⁵tɕiŋ⁵⁵sə⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1638",
  "wordIds": [
   "yubao-60756-v-1638"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「滚屎虫」。",
  "donor": "滚屎虫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kun⁵⁵sɿ⁵⁵tsʰɔŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1654",
  "wordIds": [
   "yubao-60756-v-1654"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「娃娃鱼」。",
  "donor": "娃娃鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ua³³ua³³ʑi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1699",
  "wordIds": [
   "yubao-60756-v-1699"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「哈巴狗」。",
  "donor": "哈巴狗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xa⁵³pa³³kə³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2058",
  "wordIds": [
   "yubao-60756-v-2058"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻花糖」。",
  "donor": "麻花糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³³xua⁵⁵tʰaŋ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2107",
  "wordIds": [
   "yubao-60756-v-2107"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「后脑壳」。",
  "donor": "后脑壳",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xəu³³lau³³kʰɔ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2257",
  "wordIds": [
   "yubao-60756-v-2257"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「老花眼」。",
  "donor": "老花眼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lau⁵⁵xua³³ʑaŋ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2310",
  "wordIds": [
   "yubao-60756-v-2310"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小伙子」。",
  "donor": "小伙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau⁵⁵xɔ⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2380",
  "wordIds": [
   "yubao-60756-v-2380"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「外孙女」。",
  "donor": "外孙女",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uɛ³³sun³³ȵi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2386",
  "wordIds": [
   "yubao-60756-v-2386"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「女朋友」。",
  "donor": "女朋友",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵi⁵⁵pʰɔŋ⁵⁵ʑu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2920",
  "wordIds": [
   "yubao-60756-v-2920"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「二十一」。",
  "donor": "二十一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɚ³⁵sɿ³³ʑi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2927",
  "wordIds": [
   "yubao-60756-v-2927"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一百零一」。",
  "donor": "一百零一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³⁵pe⁵³leŋ³³ʑi⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0402",
  "wordIds": [
   "yubao-60823-v-0402"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「粽子粑粑」。",
  "donor": "粽子粑粑",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsũ¹³tsɿ⁵⁵pa⁵⁵pa³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1077",
  "wordIds": [
   "yubao-60823-v-1077"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一百零五」。",
  "donor": "一百零五",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi¹³pɤe³¹lɤ̃³³u⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1078",
  "wordIds": [
   "yubao-60823-v-1078"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一百五十」。",
  "donor": "一百五十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi¹³pɤe³¹u⁵⁵sɿ³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1412",
  "wordIds": [
   "yubao-60823-v-1412"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火麻草」。",
  "donor": "火麻草",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo³³ma⁵⁵tsʰau³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1439",
  "wordIds": [
   "yubao-60823-v-1439"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「车前草」。",
  "donor": "车前草",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɤe⁵⁵tɕʰiã³³tsʰau⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1643",
  "wordIds": [
   "yubao-60823-v-1643"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「螃蟹夹子」。",
  "donor": "螃蟹夹子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰã³³ka⁵⁵ka³³tsɿ⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1654",
  "wordIds": [
   "yubao-60823-v-1654"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「娃娃鱼」。",
  "donor": "娃娃鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ua³³ua⁵⁵ʑi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1945",
  "wordIds": [
   "yubao-60823-v-1945"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「收音机」。",
  "donor": "收音机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɤu⁵⁵ʑĩ⁵⁵tɕi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2928",
  "wordIds": [
   "yubao-60823-v-2928"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「百把个」。",
  "donor": "百把个",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɤe³³pa⁵⁵ko³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1077",
  "wordIds": [
   "yubao-60824-v-1077"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「一百零五」。",
  "donor": "一百零五",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji³⁵pe²¹lĩ²¹wu⁵⁵",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1292",
  "wordIds": [
   "yubao-60824-v-1292"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「锅烟煤」。",
  "donor": "锅烟煤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ko³³jiã³³mei³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1457",
  "wordIds": [
   "yubao-60824-v-1457"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「水葫芦」。",
  "donor": "水葫芦",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵fu¹³lu³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1517",
  "wordIds": [
   "yubao-60824-v-1517"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「豆芽菜」。",
  "donor": "豆芽菜",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʉ³⁵ŋa²¹tsʰai¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1525",
  "wordIds": [
   "yubao-60824-v-1525"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「空心菜」。",
  "donor": "空心菜",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ³³ɕĩ³³tsʰai¹³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1560",
  "wordIds": [
   "yubao-60824-v-1560"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「穿山甲」。",
  "donor": "穿山甲",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰyã³³sã³³ka³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1688",
  "wordIds": [
   "yubao-60824-v-1688"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「马鬃毛」。",
  "donor": "马鬃毛",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mo¹³tsõ³³mau³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1699",
  "wordIds": [
   "yubao-60824-v-1699"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「哈巴狗」。",
  "donor": "哈巴狗",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xa⁵⁵pa²¹kʉ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1811",
  "wordIds": [
   "yubao-60824-v-1811"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「大锅刷把」。",
  "donor": "大锅刷把",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʉ²¹kʉ²¹sua²¹pa²¹",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1863",
  "wordIds": [
   "yubao-60824-v-1863"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「子弹头子」。",
  "donor": "子弹头子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsi⁵⁵tã¹³dʉ¹³tsi³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1881",
  "wordIds": [
   "yubao-60824-v-1881"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「缝纫机」。",
  "donor": "缝纫机",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xõ¹³zẽ³³tɕi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1945",
  "wordIds": [
   "yubao-60824-v-1945"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「收音机」。",
  "donor": "收音机",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sʉ³³jĩ³³tɕi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2155",
  "wordIds": [
   "yubao-60824-v-2155"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「绒绒毛」。",
  "donor": "绒绒毛",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zõ²¹zõ³⁵mau²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2255",
  "wordIds": [
   "yubao-60824-v-2255"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「六指头」。",
  "donor": "六指头",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu²¹tsi²¹dʉ²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2400",
  "wordIds": [
   "yubao-60824-v-2400"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「亲家母」。",
  "donor": "亲家母",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ³⁵ka²¹mu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289554",
  "wordIds": [
   "stedt-rn-289554"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「洋芋」。",
  "donor": "洋芋",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiã²¹jy¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289814",
  "wordIds": [
   "stedt-rn-289814"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「铅笔」。",
  "donor": "铅笔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jyã¹³pi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290218",
  "wordIds": [
   "stedt-rn-290218"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「光荣」。",
  "donor": "光荣",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuã³³jyẽ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289457",
  "wordIds": [
   "stedt-rn-289457"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「六月」。",
  "donor": "六月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu²¹jye³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289459",
  "wordIds": [
   "stedt-rn-289459"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「八月」。",
  "donor": "八月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa²¹jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289454",
  "wordIds": [
   "stedt-rn-289454"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「三月」。",
  "donor": "三月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã³³jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289848",
  "wordIds": [
   "stedt-rn-289848"
  ],
  "kind": "借词来源",
  "text": "/tɕiaɨ¹³jyi³³/ 可能借自西南官话或湘语「教育」。",
  "donor": "教育",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiaɨ¹³jyi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289461",
  "wordIds": [
   "stedt-rn-289461"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「十月」。",
  "donor": "十月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si²¹jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289455",
  "wordIds": [
   "stedt-rn-289455"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「四月」。",
  "donor": "四月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si¹³jye³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289613",
  "wordIds": [
   "stedt-rn-289613"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「党员」。",
  "donor": "党员",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tã⁵⁵jyã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290109",
  "wordIds": [
   "stedt-rn-290109"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「动员」。",
  "donor": "动员",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tõ³⁵jyã³¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289452",
  "wordIds": [
   "stedt-rn-289452"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「正月」。",
  "donor": "正月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ³³jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-290119",
  "wordIds": [
   "stedt-rn-290119"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「斗争」。",
  "donor": "斗争",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu̵¹³tsẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289458",
  "wordIds": [
   "stedt-rn-289458"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「七月」。",
  "donor": "七月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289460",
  "wordIds": [
   "stedt-rn-289460"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「九月」。",
  "donor": "九月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiu̵⁵⁵jye³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0185",
  "wordIds": [
   "yubao-60756-v-0185"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「玉米」。",
  "donor": "玉米",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³³mi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0218",
  "wordIds": [
   "yubao-60756-v-0218"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「芋头」。",
  "donor": "芋头",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi⁵⁵tʰəu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0334",
  "wordIds": [
   "yubao-60756-v-0334"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「椅子」。",
  "donor": "椅子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi⁵³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0916",
  "wordIds": [
   "yubao-60756-v-0916"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「可以」。",
  "donor": "可以",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɔ⁵³ʑi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1074",
  "wordIds": [
   "yubao-60756-v-1074"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一百」。",
  "donor": "一百",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³⁵pe⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1076",
  "wordIds": [
   "yubao-60756-v-1076"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一万」。",
  "donor": "一万",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³³uaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1186",
  "wordIds": [
   "yubao-60756-v-1186"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「故意」。",
  "donor": "故意",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ku³³ʑi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1354",
  "wordIds": [
   "yubao-60756-v-1354"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初一」。",
  "donor": "初一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1651",
  "wordIds": [
   "yubao-60756-v-1651"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「金鱼」。",
  "donor": "金鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1765",
  "wordIds": [
   "yubao-60756-v-1765"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「衣柜」。",
  "donor": "衣柜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³⁵kui⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1771",
  "wordIds": [
   "yubao-60756-v-1771"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洗衣机」。",
  "donor": "洗衣机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵ʑi⁵⁵tɕi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1943",
  "wordIds": [
   "yubao-60756-v-1943"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「牙刷」。",
  "donor": "牙刷",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑa³³sua⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1944",
  "wordIds": [
   "yubao-60756-v-1944"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「牙膏」。",
  "donor": "牙膏",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑa³³kau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1964",
  "wordIds": [
   "yubao-60756-v-1964"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「单衣」。",
  "donor": "单衣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵⁵ʑi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2182",
  "wordIds": [
   "yubao-60756-v-2182"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「西医」。",
  "donor": "西医",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2827",
  "wordIds": [
   "yubao-60756-v-2827"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「满意」。",
  "donor": "满意",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "maŋ⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2905",
  "wordIds": [
   "yubao-60756-v-2905"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「光荣」。",
  "donor": "光荣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuaŋ⁵⁵ʑiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2911",
  "wordIds": [
   "yubao-60756-v-2911"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十一」。",
  "donor": "十一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2979",
  "wordIds": [
   "yubao-60756-v-2979"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一直」。",
  "donor": "一直",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³⁵tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2994",
  "wordIds": [
   "yubao-60756-v-2994"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一定」。",
  "donor": "一定",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³³teŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0370",
  "wordIds": [
   "yubao-60823-v-0370"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉衣」。",
  "donor": "棉衣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miã³³ʑi¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0398",
  "wordIds": [
   "yubao-60823-v-0398"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「油条」。",
  "donor": "油条",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiɤu³¹tʰiau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0417",
  "wordIds": [
   "yubao-60823-v-0417"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「酱油」。",
  "donor": "酱油",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³³ʑiɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0421",
  "wordIds": [
   "yubao-60823-v-0421"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「草烟」。",
  "donor": "草烟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰau⁵⁵ʑiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0572",
  "wordIds": [
   "yubao-60823-v-0572"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「运气」。",
  "donor": "运气",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑĩ¹³tɕʰi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1076",
  "wordIds": [
   "yubao-60823-v-1076"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一万」。",
  "donor": "一万",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi¹³uã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1323",
  "wordIds": [
   "yubao-60823-v-1323"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「汽油」。",
  "donor": "汽油",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³ʑiɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1340",
  "wordIds": [
   "yubao-60823-v-1340"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三月」。",
  "donor": "三月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵ʑie³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1341",
  "wordIds": [
   "yubao-60823-v-1341"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四月」。",
  "donor": "四月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ¹³ʑie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1342",
  "wordIds": [
   "yubao-60823-v-1342"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「五月」。",
  "donor": "五月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u⁵⁵ʑie³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1343",
  "wordIds": [
   "yubao-60823-v-1343"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「六月」。",
  "donor": "六月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³³ʑie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1344",
  "wordIds": [
   "yubao-60823-v-1344"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「七月」。",
  "donor": "七月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³ʑie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1345",
  "wordIds": [
   "yubao-60823-v-1345"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八月」。",
  "donor": "八月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa³³ʑie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1346",
  "wordIds": [
   "yubao-60823-v-1346"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「九月」。",
  "donor": "九月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɤu⁵⁵ʑie³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1347",
  "wordIds": [
   "yubao-60823-v-1347"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十月」。",
  "donor": "十月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³¹ʑie¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1354",
  "wordIds": [
   "yubao-60823-v-1354"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初一」。",
  "donor": "初一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵ʑi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1563",
  "wordIds": [
   "yubao-60823-v-1563"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「野牛」。",
  "donor": "野牛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑie⁵⁵niɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1651",
  "wordIds": [
   "yubao-60823-v-1651"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「金鱼」。",
  "donor": "金鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵ʑi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1652",
  "wordIds": [
   "yubao-60823-v-1652"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「带鱼」。",
  "donor": "带鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tai¹³ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1765",
  "wordIds": [
   "yubao-60823-v-1765"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「衣柜」。",
  "donor": "衣柜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi⁵⁵kui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1891",
  "wordIds": [
   "yubao-60823-v-1891"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「眼镜」。",
  "donor": "眼镜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiã⁵⁵tɕĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2016",
  "wordIds": [
   "yubao-60823-v-2016"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「猪腰子」。",
  "donor": "猪腰子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵³ʑiau⁵⁵tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2025",
  "wordIds": [
   "yubao-60823-v-2025"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「月饼」。",
  "donor": "月饼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑie³³pĩ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2181",
  "wordIds": [
   "yubao-60823-v-2181"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中医」。",
  "donor": "中医",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsũ⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2182",
  "wordIds": [
   "yubao-60823-v-2182"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「西医」。",
  "donor": "西医",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2769",
  "wordIds": [
   "yubao-60823-v-2769"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「烧窑」。",
  "donor": "烧窑",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sau⁵⁵ʑiau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2911",
  "wordIds": [
   "yubao-60823-v-2911"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十一」。",
  "donor": "十一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ¹³ʑi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2930",
  "wordIds": [
   "yubao-60823-v-2930"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「左右」。",
  "donor": "左右",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tso⁵⁵ʑiɤu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0194",
  "wordIds": [
   "yubao-60824-v-0194"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「绿豆」。",
  "donor": "绿豆",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lʉ¹³tʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0250",
  "wordIds": [
   "yubao-60824-v-0250"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「鲤鱼」。",
  "donor": "鲤鱼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li⁵⁵jy³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0323",
  "wordIds": [
   "yubao-60824-v-0323"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「枕头」。",
  "donor": "枕头",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsẽ⁵⁵dʉ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0332",
  "wordIds": [
   "yubao-60824-v-0332"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「抽屉」。",
  "donor": "抽屉",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰʉ³³di²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0382",
  "wordIds": [
   "yubao-60824-v-0382"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「扣子」。",
  "donor": "扣子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰʉ¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0399",
  "wordIds": [
   "yubao-60824-v-0399"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「豆浆」。",
  "donor": "豆浆",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʉ¹³tɕiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0476",
  "wordIds": [
   "yubao-60824-v-0476"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「左手」。",
  "donor": "左手",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tso⁵⁵sʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0477",
  "wordIds": [
   "yubao-60824-v-0477"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「右手」。",
  "donor": "右手",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jiʉ¹³sʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0478",
  "wordIds": [
   "yubao-60824-v-0478"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「拳头」。",
  "donor": "拳头",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑyã¹³dʉ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0572",
  "wordIds": [
   "yubao-60824-v-0572"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「运气」。",
  "donor": "运气",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jyã¹³tɕʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0725",
  "wordIds": [
   "yubao-60824-v-0725"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「铅笔」。",
  "donor": "铅笔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jyã²¹pi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1257",
  "wordIds": [
   "yubao-60824-v-1257"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「平原」。",
  "donor": "平原",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "bĩ¹³jyã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1276",
  "wordIds": [
   "yubao-60824-v-1276"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「洞口」。",
  "donor": "洞口",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tõ¹³kʰʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1338",
  "wordIds": [
   "yubao-60824-v-1338"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「闰月」。",
  "donor": "闰月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zuẽ³⁵jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1341",
  "wordIds": [
   "yubao-60824-v-1341"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「四月」。",
  "donor": "四月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "si³⁵jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1342",
  "wordIds": [
   "yubao-60824-v-1342"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「五月」。",
  "donor": "五月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu⁵⁵jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1343",
  "wordIds": [
   "yubao-60824-v-1343"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「六月」。",
  "donor": "六月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu²¹jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1346",
  "wordIds": [
   "yubao-60824-v-1346"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「九月」。",
  "donor": "九月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiʉ⁵⁵jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1350",
  "wordIds": [
   "yubao-60824-v-1350"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「每月」。",
  "donor": "每月",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei⁵⁵jye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1351",
  "wordIds": [
   "yubao-60824-v-1351"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「月初」。",
  "donor": "月初",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jye¹³tsʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1352",
  "wordIds": [
   "yubao-60824-v-1352"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「月底」。",
  "donor": "月底",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jye¹³ti⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1547",
  "wordIds": [
   "yubao-60824-v-1547"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「狗熊」。",
  "donor": "狗熊",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʉ⁵⁵ɕiõ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1633",
  "wordIds": [
   "yubao-60824-v-1633"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「臭虫」。",
  "donor": "臭虫",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰʉ³⁵dzõ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1735",
  "wordIds": [
   "yubao-60824-v-1735"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「榫头」。",
  "donor": "榫头",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suẽ⁵⁵dʉ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1745",
  "wordIds": [
   "yubao-60824-v-1745"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「圆木」。",
  "donor": "圆木",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jyã¹³mu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1748",
  "wordIds": [
   "yubao-60824-v-1748"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「楼板」。",
  "donor": "楼板",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lʉ¹³pã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1797",
  "wordIds": [
   "yubao-60824-v-1797"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「雨衣」。",
  "donor": "雨衣",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jy⁵⁵ji³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1852",
  "wordIds": [
   "yubao-60824-v-1852"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「墨斗」。",
  "donor": "墨斗",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me¹³tʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1890",
  "wordIds": [
   "yubao-60824-v-1890"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「手表」。",
  "donor": "手表",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sʉ⁵⁵piau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1946",
  "wordIds": [
   "yubao-60824-v-1946"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「手机」。",
  "donor": "手机",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sʉ³³tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1957",
  "wordIds": [
   "yubao-60824-v-1957"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「绸子」。",
  "donor": "绸子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰʉ²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1991",
  "wordIds": [
   "yubao-60824-v-1991"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「手套」。",
  "donor": "手套",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sʉ⁵⁵tʰau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2010",
  "wordIds": [
   "yubao-60824-v-2010"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「扣肉」。",
  "donor": "扣肉",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰʉ³⁵zu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2025",
  "wordIds": [
   "yubao-60824-v-2025"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「月饼」。",
  "donor": "月饼",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jye¹³pĩ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2030",
  "wordIds": [
   "yubao-60824-v-2030"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「豆豉」。",
  "donor": "豆豉",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʉ¹³si⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2056",
  "wordIds": [
   "yubao-60824-v-2056"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「豆腐渣」。",
  "donor": "豆腐渣",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʉ¹³fu⁵⁵tsa³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2152",
  "wordIds": [
   "yubao-60824-v-2152"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「手背」。",
  "donor": "手背",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sʉ⁵⁵pei¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2160",
  "wordIds": [
   "yubao-60824-v-2160"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「虎口」。",
  "donor": "虎口",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fu⁵⁵kʰʉ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2179",
  "wordIds": [
   "yubao-60824-v-2179"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「医院」。",
  "donor": "医院",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji³³jyã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2274",
  "wordIds": [
   "yubao-60824-v-2274"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「寿命」。",
  "donor": "寿命",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sʉ²¹mĩ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2306",
  "wordIds": [
   "yubao-60824-v-2306"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「光头」。",
  "donor": "光头",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuã¹³dʉ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2832",
  "wordIds": [
   "yubao-60824-v-2832"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「愿意」。",
  "donor": "愿意",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jyã¹³ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w725",
  "wordIds": [
   "w725"
  ],
  "kind": "借词来源",
  "text": "「甘蔗」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "甘蔗",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵tsa⁵⁵kɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1282",
  "wordIds": [
   "w1282"
  ],
  "kind": "借词来源",
  "text": "「南边」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "南边",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "laŋ²¹piɛn⁵⁵la⁵⁵pi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w1981",
  "wordIds": [
   "w1981"
  ],
  "kind": "借词来源",
  "text": "「辫子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "辫子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sa²⁴tɕʰi⁵⁵piɛn⁵⁵tsɨ⁵⁵",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w2135",
  "wordIds": [
   "w2135"
  ],
  "kind": "借词来源",
  "text": "「柿子」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "柿子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴tsɨ⁵⁵pu²⁴li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289576",
  "wordIds": [
   "stedt-rn-289576"
  ],
  "kind": "借词来源",
  "text": "「桃子」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "桃子",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "daɨ¹³tsi⁵⁵su³⁵bu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-364595",
  "wordIds": [
   "stedt-rn-364595"
  ],
  "kind": "借词来源",
  "text": "「杨柳」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "杨柳",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "jian²¹liu²¹kʰa²¹moŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288605",
  "wordIds": [
   "stedt-rn-288605"
  ],
  "kind": "借词来源",
  "text": "「杨柳」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "杨柳",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "jiã²¹liu⁵⁵kʰa²¹mũ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288615",
  "wordIds": [
   "stedt-rn-288615"
  ],
  "kind": "借词来源",
  "text": "「甘蔗」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "甘蔗",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kã⁵⁵tsa⁵⁵kẽ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288863",
  "wordIds": [
   "stedt-rn-288863"
  ],
  "kind": "借词来源",
  "text": "「公路」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "公路",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kũ⁵⁵lu³⁵la⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-387705",
  "wordIds": [
   "stedt-rn-387705"
  ],
  "kind": "借词来源",
  "text": "「百万」部分（第 2—3 音节）可能借自西南官话。",
  "donor": "百万",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "la³⁵pɯe²¹wan³⁵",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-387756",
  "wordIds": [
   "stedt-rn-387756"
  ],
  "kind": "借词来源",
  "text": "「千万」部分（第 2—3 音节）可能借自西南官话。",
  "donor": "千万",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "la³⁵tɕʰian⁵⁵wan³⁵",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289546",
  "wordIds": [
   "stedt-rn-289546"
  ],
  "kind": "借词来源",
  "text": "「柳树」部分（第 1—2 音节）可能借自西南官话或湘语。对应读音：/liu̵³³su²¹kʰo⁵⁵/。",
  "donor": "柳树",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "liu̵³³su²¹kʰo⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289427",
  "wordIds": [
   "stedt-rn-289427"
  ],
  "kind": "借词来源",
  "text": "「沙子」部分（第 2—3 音节）可能借自西南官话或湘语。",
  "donor": "沙子",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "lu̵³⁵sa⁵⁵tsi²¹",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288546",
  "wordIds": [
   "stedt-rn-288546"
  ],
  "kind": "借词来源",
  "text": "「毛兔」部分（第 1—2 音节）可能借自西南官话。对应读音：/mau²¹tʰo⁵⁵li⁵⁵/。",
  "donor": "毛兔",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mau²¹tʰo⁵⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-360263",
  "wordIds": [
   "stedt-rn-360263"
  ],
  "kind": "借词来源",
  "text": "「毛兔」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "毛兔",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mau²¹tʰo⁵⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289433",
  "wordIds": [
   "stedt-rn-289433"
  ],
  "kind": "借词来源",
  "text": "「南边」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "南边",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "nã³³piã³³ta²¹ze³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289569",
  "wordIds": [
   "stedt-rn-289569"
  ],
  "kind": "借词来源",
  "text": "「白菜」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "白菜",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "pɨe³³tsʰai¹³ʔa²¹ɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288628",
  "wordIds": [
   "stedt-rn-288628"
  ],
  "kind": "借词来源",
  "text": "「白菜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "白菜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "pɨe³⁵tsʰai³⁵xa⁵⁵tsʰe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-43363",
  "wordIds": [
   "stedt-rn-43363"
  ],
  "kind": "借词来源",
  "text": "「辫子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "辫子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sa³⁵ tɕʰi⁵⁵ piã⁵⁵ tsi⁵⁵",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288639",
  "wordIds": [
   "stedt-rn-288639"
  ],
  "kind": "借词来源",
  "text": "「柿子」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "柿子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "si³⁵tsi⁵⁵pu³⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289580",
  "wordIds": [
   "stedt-rn-289580"
  ],
  "kind": "借词来源",
  "text": "「柿子」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "柿子",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "si¹³tsi⁵⁵su³⁵bu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289404",
  "wordIds": [
   "stedt-rn-289404"
  ],
  "kind": "借词来源",
  "text": "「雹子」部分（第 4—5 音节）可能借自西南官话或湘语。",
  "donor": "雹子",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "su²¹su²¹lẽ¹³pʰaɨ¹³tsi³³",
    "span": [
     4,
     5
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289735",
  "wordIds": [
   "stedt-rn-289735"
  ],
  "kind": "借词来源",
  "text": "「拖拉机」部分（第 1—3 音节）可能借自西南官话或湘语。",
  "donor": "拖拉机",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tʰo³³la³³tɕi³³li²¹tsʰo²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288796",
  "wordIds": [
   "stedt-rn-288796"
  ],
  "kind": "借词来源",
  "text": "「拖拉机」部分（第 1—3 音节）可能借自西南官话。",
  "donor": "拖拉机",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tʰo⁵⁵la⁵⁵tɕi⁵⁵kʰa⁵⁵tʰe⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289790",
  "wordIds": [
   "stedt-rn-289790"
  ],
  "kind": "借词来源",
  "text": "「电灯」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "电灯",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tiã³³tẽ³³ku²¹su³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288854",
  "wordIds": [
   "stedt-rn-288854"
  ],
  "kind": "借词来源",
  "text": "「电灯」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "电灯",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tiã³⁵tẽ⁵⁵tʰe⁵⁵tʰe²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-367007",
  "wordIds": [
   "stedt-rn-367007"
  ],
  "kind": "借词来源",
  "text": "「黄瓜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "黄瓜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "wuan²¹kua²¹si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-288625",
  "wordIds": [
   "stedt-rn-288625"
  ],
  "kind": "借词来源",
  "text": "「黄瓜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "黄瓜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "wuã²¹ka²¹si²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-185103",
  "wordIds": [
   "stedt-rn-185103"
  ],
  "kind": "借词来源",
  "text": "「十日」部分（第 2—3 音节）可能借自西南官话。",
  "donor": "十日",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ɯ³⁵si⁵⁵zi²¹",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60757-v-0212",
  "wordIds": [
   "yubao-60757-v-0212"
  ],
  "kind": "借词来源",
  "text": "「黄瓜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "黄瓜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "uaŋ²²kua²²sɿ²²",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60757-v-1573",
  "wordIds": [
   "yubao-60757-v-1573"
  ],
  "kind": "借词来源",
  "text": "「啄木」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "啄木",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsua²⁴mu⁵⁵ka⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60757-v-2012",
  "wordIds": [
   "yubao-60757-v-2012"
  ],
  "kind": "借词来源",
  "text": "「腊肉」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "腊肉",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "la⁵⁵zu⁵⁵kʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60757-v-2570",
  "wordIds": [
   "yubao-60757-v-2570"
  ],
  "kind": "借词来源",
  "text": "「山歌」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "山歌",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "san⁵⁵kuo⁵⁵san⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60757-v-2770",
  "wordIds": [
   "yubao-60757-v-2770"
  ],
  "kind": "借词来源",
  "text": "「石灰」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "石灰",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sɿ²⁴xuei³³u²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0163",
  "wordIds": [
   "yubao-60756-v-0163"
  ],
  "kind": "借词来源",
  "text": "「李子」部分（第 2—3 音节）可能借自西南官话。",
  "donor": "李子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "me³³li⁵⁵tsɿ⁵⁵",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0173",
  "wordIds": [
   "yubao-60756-v-0173"
  ],
  "kind": "借词来源",
  "text": "「甘蔗」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "甘蔗",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵tsa³³keŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0320",
  "wordIds": [
   "yubao-60756-v-0320"
  ],
  "kind": "借词来源",
  "text": "「东西」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "东西",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɔŋ⁵⁵ɕi³³ ʑe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0436",
  "wordIds": [
   "yubao-60756-v-0436"
  ],
  "kind": "借词来源",
  "text": "「早饭」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "早饭",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵xuaŋ⁵³ka³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0451",
  "wordIds": [
   "yubao-60756-v-0451"
  ],
  "kind": "借词来源",
  "text": "「辫子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "辫子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sa³³tɕʰi³³piaŋ³³tsɿ³³",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0512",
  "wordIds": [
   "yubao-60756-v-0512"
  ],
  "kind": "借词来源",
  "text": "「中暑」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "中暑",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵su³³lu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0524",
  "wordIds": [
   "yubao-60756-v-0524"
  ],
  "kind": "借词来源",
  "text": "「吊针」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "吊针",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tiau⁵⁵tseŋ⁵⁵xa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0637",
  "wordIds": [
   "yubao-60756-v-0637"
  ],
  "kind": "借词来源",
  "text": "「姊妹」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "姊妹",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵³me³³ka³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0739",
  "wordIds": [
   "yubao-60756-v-0739"
  ],
  "kind": "借词来源",
  "text": "「唱歌」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "唱歌",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ³³kɔ³³ kɔ³⁵tsʰaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0747",
  "wordIds": [
   "yubao-60756-v-0747"
  ],
  "kind": "借词来源",
  "text": "「麻将」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "麻将",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma³³tɕaŋ³³xa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0748",
  "wordIds": [
   "yubao-60756-v-0748"
  ],
  "kind": "借词来源",
  "text": "「魔术」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "魔术",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mɔ³³su³³uaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0749",
  "wordIds": [
   "yubao-60756-v-0749"
  ],
  "kind": "借词来源",
  "text": "「故事」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "故事",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ku⁵⁵sɿ⁵⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1388",
  "wordIds": [
   "yubao-60756-v-1388"
  ],
  "kind": "借词来源",
  "text": "「桑树」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "桑树",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵su⁵³kʰa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1396",
  "wordIds": [
   "yubao-60756-v-1396"
  ],
  "kind": "借词来源",
  "text": "「青冈」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "青冈",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵⁵kaŋ³³kʰa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1573",
  "wordIds": [
   "yubao-60756-v-1573"
  ],
  "kind": "借词来源",
  "text": "「啄木」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "啄木",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsua³³mu⁵⁵kua⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1630",
  "wordIds": [
   "yubao-60756-v-1630"
  ],
  "kind": "借词来源",
  "text": "「蚂蟥」部分（第 2—3 音节）可能借自西南官话。",
  "donor": "蚂蟥",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kaŋ⁵⁵ma⁵⁵uaŋ³³",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1751",
  "wordIds": [
   "yubao-60756-v-1751"
  ],
  "kind": "借词来源",
  "text": "「门板」部分（第 2—3 音节）可能借自西南官话。",
  "donor": "门板",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰɔ⁵⁵meŋ⁵⁵paŋ⁵³",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1766",
  "wordIds": [
   "yubao-60756-v-1766"
  ],
  "kind": "借词来源",
  "text": "「桌子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "桌子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsɿ³³kɛ³⁵tsɔ³³tsɿ³³",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1809",
  "wordIds": [
   "yubao-60756-v-1809"
  ],
  "kind": "借词来源",
  "text": "「丝瓜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "丝瓜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵kua³³sɿ⁵³sɚ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1976",
  "wordIds": [
   "yubao-60756-v-1976"
  ],
  "kind": "借词来源",
  "text": "「领子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "领子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵³pa³³leŋ⁵³tsɿ³³",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2001",
  "wordIds": [
   "yubao-60756-v-2001"
  ],
  "kind": "借词来源",
  "text": "「珠子」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "珠子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsu⁵³tsɿ³³pu³³lɛ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2012",
  "wordIds": [
   "yubao-60756-v-2012"
  ],
  "kind": "借词来源",
  "text": "「腊肉」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "腊肉",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "la³³zu⁵⁵kʰu⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2042",
  "wordIds": [
   "yubao-60756-v-2042"
  ],
  "kind": "借词来源",
  "text": "「瓜子」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "瓜子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kua⁵⁵tsɿ³³pu³³lɛ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2051",
  "wordIds": [
   "yubao-60756-v-2051"
  ],
  "kind": "借词来源",
  "text": "「落花生」部分（第 1—3 音节）可能借自西南官话。",
  "donor": "落花生",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "lɔ³³xua³³seŋ⁵⁵sɿ³³sɿ³⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2066",
  "wordIds": [
   "yubao-60756-v-2066"
  ],
  "kind": "借词来源",
  "text": "「生饭」部分（第 2—3 音节）可能借自西南官话。",
  "donor": "生饭",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ³³seŋ³³xuaŋ³⁵",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2130",
  "wordIds": [
   "yubao-60756-v-2130"
  ],
  "kind": "借词来源",
  "text": "「鼻梁」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "鼻梁",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "e⁵⁵tɕʰi⁵⁵pi³³liaŋ³⁵",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2199",
  "wordIds": [
   "yubao-60756-v-2199"
  ],
  "kind": "借词来源",
  "text": "「手术」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "手术",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "səu⁵⁵su⁵³zɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2393",
  "wordIds": [
   "yubao-60756-v-2393"
  ],
  "kind": "借词来源",
  "text": "「姐妹」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "姐妹",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕe³⁵me⁵⁵ȵe³³na³³xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2395",
  "wordIds": [
   "yubao-60756-v-2395"
  ],
  "kind": "借词来源",
  "text": "「母子」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "母子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mu⁵³tsɿ³³ȵe³³na³³xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2396",
  "wordIds": [
   "yubao-60756-v-2396"
  ],
  "kind": "借词来源",
  "text": "「父女」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "父女",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xu³³ȵi³³ȵe³³na³³xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2404",
  "wordIds": [
   "yubao-60756-v-2404"
  ],
  "kind": "借词来源",
  "text": "「母女」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "母女",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mu³³ȵi³³ȵe³³na⁵⁵xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2530",
  "wordIds": [
   "yubao-60756-v-2530"
  ],
  "kind": "借词来源",
  "text": "「武术」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "武术",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "u⁵⁵su⁵³liaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2531",
  "wordIds": [
   "yubao-60756-v-2531"
  ],
  "kind": "借词来源",
  "text": "「弹弓」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "弹弓",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "taŋ³³kɔŋ³³xa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2570",
  "wordIds": [
   "yubao-60756-v-2570"
  ],
  "kind": "借词来源",
  "text": "「山歌」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "山歌",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "saŋ³⁵kɔ⁵³tsʰaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2770",
  "wordIds": [
   "yubao-60756-v-2770"
  ],
  "kind": "借词来源",
  "text": "「石灰」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "石灰",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sɿ³³xui⁵⁵u⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2821",
  "wordIds": [
   "yubao-60756-v-2821"
  ],
  "kind": "借词来源",
  "text": "「围裙」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "围裙",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ui³³tɕʰiŋ⁵⁵a³³tʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0102",
  "wordIds": [
   "yubao-60823-v-0102"
  ],
  "kind": "借词来源",
  "text": "「端午」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "端午",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tuã⁵⁵u³³kʰa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0104",
  "wordIds": [
   "yubao-60823-v-0104"
  ],
  "kind": "借词来源",
  "text": "「中秋」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "中秋",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsũ⁵⁵tɕʰiɤu³³kʰa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0155",
  "wordIds": [
   "yubao-60823-v-0155"
  ],
  "kind": "借词来源",
  "text": "「荷花」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "荷花",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xo³³xua⁵⁵kʰa⁵⁵pʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0168",
  "wordIds": [
   "yubao-60823-v-0168"
  ],
  "kind": "借词来源",
  "text": "「石榴」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "石榴",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sɿ³¹liɤu³¹pu¹³li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0190",
  "wordIds": [
   "yubao-60823-v-0190"
  ],
  "kind": "借词来源",
  "text": "「蚕豆」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "蚕豆",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰã³¹tɤu¹³pu³³li³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0192",
  "wordIds": [
   "yubao-60823-v-0192"
  ],
  "kind": "借词来源",
  "text": "「花生」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "花生",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xua⁵⁵sɤ̃⁵⁵pu¹³li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0194",
  "wordIds": [
   "yubao-60823-v-0194"
  ],
  "kind": "借词来源",
  "text": "「绿豆」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "绿豆",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "lu¹³tɤu⁵⁵pu⁵⁵li⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0198",
  "wordIds": [
   "yubao-60823-v-0198"
  ],
  "kind": "借词来源",
  "text": "「菠菜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "菠菜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "po⁵⁵tsʰai⁵⁵a⁵⁵tsʰɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0201",
  "wordIds": [
   "yubao-60823-v-0201"
  ],
  "kind": "借词来源",
  "text": "「韭菜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "韭菜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕiɤu⁵⁵tsʰai³³a⁵⁵tsʰɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0213",
  "wordIds": [
   "yubao-60823-v-0213"
  ],
  "kind": "借词来源",
  "text": "「丝瓜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "丝瓜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵kua³¹a⁵⁵tsʰɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0230",
  "wordIds": [
   "yubao-60823-v-0230"
  ],
  "kind": "借词来源",
  "text": "「鸽子」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "鸽子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ko³³tsɿ³¹nie¹³pi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0232",
  "wordIds": [
   "yubao-60823-v-0232"
  ],
  "kind": "借词来源",
  "text": "「爪子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "爪子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕi³³pʰa³¹tsua⁵⁵tsɿ³³",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0436",
  "wordIds": [
   "yubao-60823-v-0436"
  ],
  "kind": "借词来源",
  "text": "「早饭」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "早饭",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵xuã³¹ka¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0451",
  "wordIds": [
   "yubao-60823-v-0451"
  ],
  "kind": "借词来源",
  "text": "「辫子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "辫子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sa⁵⁵tɕʰi⁵⁵piã¹³tsɿ⁵⁵",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0524",
  "wordIds": [
   "yubao-60823-v-0524"
  ],
  "kind": "借词来源",
  "text": "「吊针」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "吊针",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tiau¹³tsɤ̃⁵⁵xa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0592",
  "wordIds": [
   "yubao-60823-v-0592"
  ],
  "kind": "借词来源",
  "text": "「木匠」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "木匠",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mu³³tɕiã⁵⁵zɿ⁵³ma³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0747",
  "wordIds": [
   "yubao-60823-v-0747"
  ],
  "kind": "借词来源",
  "text": "「麻将」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "麻将",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma³³tɕiã⁵⁵xa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1230",
  "wordIds": [
   "yubao-60823-v-1230"
  ],
  "kind": "借词来源",
  "text": "「荒山」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "荒山",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xuã⁵⁵sã³³zo³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1245",
  "wordIds": [
   "yubao-60823-v-1245"
  ],
  "kind": "借词来源",
  "text": "「荒山」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "荒山",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xuã⁵⁵sã³³kʰo³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1395",
  "wordIds": [
   "yubao-60823-v-1395"
  ],
  "kind": "借词来源",
  "text": "「水冬瓜」部分（第 1—3 音节）可能借自西南官话。",
  "donor": "水冬瓜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sui⁵⁵tũ³³kua³³kʰa³³mu³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1408",
  "wordIds": [
   "yubao-60823-v-1408"
  ],
  "kind": "借词来源",
  "text": "「松香」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "松香",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰũ³³ko³³sũ⁵⁵ɕiã⁵⁵",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1442",
  "wordIds": [
   "yubao-60823-v-1442"
  ],
  "kind": "借词来源",
  "text": "「菊花」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "菊花",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕi³³xua⁵⁵kʰa⁵⁵pʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1443",
  "wordIds": [
   "yubao-60823-v-1443"
  ],
  "kind": "借词来源",
  "text": "「桂花」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "桂花",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kui³³xua⁵⁵kʰa⁵⁵pʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1447",
  "wordIds": [
   "yubao-60823-v-1447"
  ],
  "kind": "借词来源",
  "text": "「水仙」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "水仙",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sui⁵⁵ɕiã³¹kʰa⁵⁵pʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1452",
  "wordIds": [
   "yubao-60823-v-1452"
  ],
  "kind": "借词来源",
  "text": "「金银」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "金银",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵nĩ³³kʰa⁵⁵pʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1472",
  "wordIds": [
   "yubao-60823-v-1472"
  ],
  "kind": "借词来源",
  "text": "「紫苏」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "紫苏",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵⁵su⁵⁵ɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1474",
  "wordIds": [
   "yubao-60823-v-1474"
  ],
  "kind": "借词来源",
  "text": "「马蓝」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "马蓝",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵lã³³ɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1498",
  "wordIds": [
   "yubao-60823-v-1498"
  ],
  "kind": "借词来源",
  "text": "「稗子」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "稗子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "pai¹³tsɿ⁵⁵ɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1525",
  "wordIds": [
   "yubao-60823-v-1525"
  ],
  "kind": "借词来源",
  "text": "「空心」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "空心",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kʰũ⁵⁵ɕĩ⁵⁵a⁵⁵tsʰɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1530",
  "wordIds": [
   "yubao-60823-v-1530"
  ],
  "kind": "借词来源",
  "text": "「苦菜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "苦菜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵⁵tsʰai³¹a⁵⁵tsʰɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1572",
  "wordIds": [
   "yubao-60823-v-1572"
  ],
  "kind": "借词来源",
  "text": "「金丝」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "金丝",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕĩ⁵⁵sɿ⁵⁵ɣɤe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1573",
  "wordIds": [
   "yubao-60823-v-1573"
  ],
  "kind": "借词来源",
  "text": "「啄木」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "啄木",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsua³³mu⁵⁵ka³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1593",
  "wordIds": [
   "yubao-60823-v-1593"
  ],
  "kind": "借词来源",
  "text": "「毒蛇」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "毒蛇",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tu¹³ɕie⁵⁵nie⁵⁵ɣo⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1629",
  "wordIds": [
   "yubao-60823-v-1629"
  ],
  "kind": "借词来源",
  "text": "「蚂蟥」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "蚂蟥",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sɿ³³kʰɤe⁵⁵ma⁵⁵uã³³",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1630",
  "wordIds": [
   "yubao-60823-v-1630"
  ],
  "kind": "借词来源",
  "text": "「蚂蟥」部分（第 4—5 音节）可能借自西南官话。",
  "donor": "蚂蟥",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kʰã³¹kʰu⁵⁵nie³¹ma⁵⁵uã⁵⁵",
    "span": [
     4,
     5
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1699",
  "wordIds": [
   "yubao-60823-v-1699"
  ],
  "kind": "借词来源",
  "text": "「哈巴」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "哈巴",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xa⁵⁵pa³³xa⁵⁵lie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1728",
  "wordIds": [
   "yubao-60823-v-1728"
  ],
  "kind": "借词来源",
  "text": "「碉楼」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "碉楼",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tiau⁵⁵lɤu³³tsʰo⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1835",
  "wordIds": [
   "yubao-60823-v-1835"
  ],
  "kind": "借词来源",
  "text": "「玻璃」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "玻璃",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "po⁵⁵li³¹xu³³tsʰɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1976",
  "wordIds": [
   "yubao-60823-v-1976"
  ],
  "kind": "借词来源",
  "text": "「领子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "领子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵³pa³³lɤ̃⁵⁵tsɿ³³",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1990",
  "wordIds": [
   "yubao-60823-v-1990"
  ],
  "kind": "借词来源",
  "text": "「棉帽」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "棉帽",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "miã³³mau³¹tie⁵⁵tsʰɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2010",
  "wordIds": [
   "yubao-60823-v-2010"
  ],
  "kind": "借词来源",
  "text": "「扣肉」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "扣肉",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kʰɤu¹³zu³³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2020",
  "wordIds": [
   "yubao-60823-v-2020"
  ],
  "kind": "借词来源",
  "text": "「粉条」部分（第 4—5 音节）可能借自西南官话。",
  "donor": "粉条",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³ka³³la³¹xuɤ̃⁵⁵tʰiau⁵⁵",
    "span": [
     4,
     5
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2029",
  "wordIds": [
   "yubao-60823-v-2029"
  ],
  "kind": "借词来源",
  "text": "「酸菜」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "酸菜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "suã⁵⁵tsʰai³¹a⁵⁵tsʰɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2051",
  "wordIds": [
   "yubao-60823-v-2051"
  ],
  "kind": "借词来源",
  "text": "「花生」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "花生",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xua⁵⁵sɤ̃⁵⁵sɤ⁵⁵sɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2219",
  "wordIds": [
   "yubao-60823-v-2219"
  ],
  "kind": "借词来源",
  "text": "「麻风」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "麻风",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma³³xũ³¹lai³³pʰie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2304",
  "wordIds": [
   "yubao-60823-v-2304"
  ],
  "kind": "借词来源",
  "text": "「凤凰」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "凤凰",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xũ¹³xuã³³nie¹³pi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2378",
  "wordIds": [
   "yubao-60823-v-2378"
  ],
  "kind": "借词来源",
  "text": "「外甥」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "外甥",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "uai¹³sɤ̃⁵⁵piɤu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2530",
  "wordIds": [
   "yubao-60823-v-2530"
  ],
  "kind": "借词来源",
  "text": "「武术」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "武术",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "u⁵⁵su³¹a¹³ɣɤe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2570",
  "wordIds": [
   "yubao-60823-v-2570"
  ],
  "kind": "借词来源",
  "text": "「山歌」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "山歌",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵ko³³tsʰã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2770",
  "wordIds": [
   "yubao-60823-v-2770"
  ],
  "kind": "借词来源",
  "text": "「石灰」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "石灰",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sɿ³³xui⁵⁵u¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2821",
  "wordIds": [
   "yubao-60823-v-2821"
  ],
  "kind": "借词来源",
  "text": "「围裙」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "围裙",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ui³³tɕʰĩ³¹pu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0684",
  "wordIds": [
   "yubao-60824-v-0684"
  ],
  "kind": "借词来源",
  "text": "「江湖」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "江湖",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕiã³³fu²¹bu²¹ɣe¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0746",
  "wordIds": [
   "yubao-60824-v-0746"
  ],
  "kind": "借词来源",
  "text": "「扑克」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "扑克",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "pʰo⁵⁵kʰei²¹bu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0747",
  "wordIds": [
   "yubao-60824-v-0747"
  ],
  "kind": "借词来源",
  "text": "「麻将」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "麻将",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma²¹tɕiã¹³bu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0748",
  "wordIds": [
   "yubao-60824-v-0748"
  ],
  "kind": "借词来源",
  "text": "「魔术」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "魔术",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mo²¹su²¹wã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0930",
  "wordIds": [
   "yubao-60824-v-0930"
  ],
  "kind": "借词来源",
  "text": "「玩笑」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "玩笑",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "wã²¹ɕiau¹³kʰai³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1395",
  "wordIds": [
   "yubao-60824-v-1395"
  ],
  "kind": "借词来源",
  "text": "「水冬瓜」部分（第 1—3 音节）可能借自西南官话或湘语。",
  "donor": "水冬瓜",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "suei⁵⁵tõ³³kua³³kʰo³⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1396",
  "wordIds": [
   "yubao-60824-v-1396"
  ],
  "kind": "借词来源",
  "text": "「青冈」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "青冈",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ³³ kã³³kʰo³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1573",
  "wordIds": [
   "yubao-60824-v-1573"
  ],
  "kind": "借词来源",
  "text": "「啄木」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "啄木",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsua¹³mu⁵⁵ko²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1597",
  "wordIds": [
   "yubao-60824-v-1597"
  ],
  "kind": "借词来源",
  "text": "「菜花」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "菜花",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰai¹³xua³⁵wã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2012",
  "wordIds": [
   "yubao-60824-v-2012"
  ],
  "kind": "借词来源",
  "text": "「腊肉」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "腊肉",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "la¹³zu³³suẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2016",
  "wordIds": [
   "yubao-60824-v-2016"
  ],
  "kind": "借词来源",
  "text": "「腰子」部分（第 2—3 音节）可能借自西南官话或湘语。",
  "donor": "腰子",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "si¹³jau⁵⁵tsi²¹",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2309",
  "wordIds": [
   "yubao-60824-v-2309"
  ],
  "kind": "借词来源",
  "text": "「年轻」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "年轻",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "niã¹³tɕʰĩ³³nia³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2364",
  "wordIds": [
   "yubao-60824-v-2364"
  ],
  "kind": "借词来源",
  "text": "「舅母」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "舅母",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕiʉ³⁵mu⁵⁵tɕʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2365",
  "wordIds": [
   "yubao-60824-v-2365"
  ],
  "kind": "借词来源",
  "text": "「舅母」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "舅母",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕiʉ³⁵mu⁵⁵sa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2435",
  "wordIds": [
   "yubao-60824-v-2435"
  ],
  "kind": "借词来源",
  "text": "「犁把」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "犁把",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "li¹³pa³³suei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2441",
  "wordIds": [
   "yubao-60824-v-2441"
  ],
  "kind": "借词来源",
  "text": "「晒谷」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "晒谷",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "sai³⁵ku³³bĩ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2626",
  "wordIds": [
   "yubao-60824-v-2626"
  ],
  "kind": "借词来源",
  "text": "「懒腰」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "懒腰",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "nã⁵⁵jau³³tsʰẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2770",
  "wordIds": [
   "yubao-60824-v-2770"
  ],
  "kind": "借词来源",
  "text": "「石灰」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "石灰",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "si¹³xuei³³ʉ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2816",
  "wordIds": [
   "yubao-60824-v-2816"
  ],
  "kind": "借词来源",
  "text": "「脾气」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "脾气",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "pi²¹tɕʰi³³fa³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2920",
  "wordIds": [
   "yubao-60824-v-2920"
  ],
  "kind": "借词来源",
  "text": "「十一」部分（第 2—3 音节）可能借自西南官话或湘语。",
  "donor": "十一",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ɣau³⁵si²¹ji²¹",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w375",
  "wordIds": [
   "w375"
  ],
  "kind": "借词来源",
  "text": "「茶子」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "茶子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰa²¹tsɨ²¹kʰa²¹mɔŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-w5480",
  "wordIds": [
   "w5480"
  ],
  "kind": "借词来源",
  "text": "「武艺」部分（第 1—2 音节）可能借自西南官话。",
  "donor": "武艺",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "wu⁵⁵ȵi²¹tsɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-stedt-rn-289799",
  "wordIds": [
   "stedt-rn-289799"
  ],
  "kind": "借词来源",
  "text": "「公路」部分（第 1—2 音节）可能借自西南官话或湘语。",
  "donor": "公路",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kõ³³lu²¹lo³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0147",
  "wordIds": [
   "yubao-60756-v-0147"
  ],
  "kind": "借词来源",
  "text": "「杨柳树」部分（第 1—3 音节）可能借自西南官话。",
  "donor": "杨柳树",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ʑaŋ³³liu⁵⁵su⁵⁵ka⁵³mu³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1986",
  "wordIds": [
   "yubao-60756-v-1986"
  ],
  "kind": "借词来源",
  "text": "「鞋后跟」部分（第 2—4 音节）可能借自西南官话。",
  "donor": "鞋后跟",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰɔ³³ɕe⁵⁵xəu³³keŋ³³",
    "span": [
     2,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2156",
  "wordIds": [
   "yubao-60756-v-2156"
  ],
  "kind": "借词来源",
  "text": "「汗毛洞」部分（第 1—3 音节）可能借自西南官话。",
  "donor": "汗毛洞",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "xaŋ⁵⁵mau⁵⁵tɔŋ⁵⁵ka⁵³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1985",
  "wordIds": [
   "yubao-60823-v-1985"
  ],
  "kind": "借词来源",
  "text": "「鞋底子」部分（第 2—4 音节）可能借自西南官话。",
  "donor": "鞋底子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "so³³ɕie³¹ti⁵⁵tsɿ³³",
    "span": [
     2,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1987",
  "wordIds": [
   "yubao-60824-v-1987"
  ],
  "kind": "借词来源",
  "text": "「鞋带子」部分（第 2—4 音节）可能借自西南官话或湘语。",
  "donor": "鞋带子",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "no¹³ɕie⁵⁵tai¹³tsi³³",
    "span": [
     2,
     4
    ]
   }
  ],
  "reviewBatch": "complete-components-4"
 }
]);
// Supplementary word and component analyses; exact forms preserve dialect scope.
EDITORIAL_NOTES.push(...[
 {
  "id": "chinese-loan-yubao-60824-v-0200",
  "wordIds": [
   "yubao-60824-v-0200"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「莴笋」。",
  "donor": "莴笋",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "o⁵⁵suei²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0473",
  "wordIds": [
   "yubao-60824-v-0473"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「肩膀」。",
  "donor": "肩膀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã³³po³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-127351",
  "wordIds": [
   "stedt-rn-127351"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「肩膀」。",
  "donor": "肩膀",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵ po²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2124",
  "wordIds": [
   "yubao-60824-v-2124"
  ],
  "kind": "借词来源",
  "text": "「眼眼」部分（第 3—4 音节）可能借自西南官话或湘语。",
  "donor": "眼眼",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsa¹³po⁵⁵ŋã⁵⁵ŋã²¹",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0890",
  "wordIds": [
   "yubao-60824-v-0890"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「悔」。",
  "donor": "悔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuei⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2838",
  "wordIds": [
   "yubao-60824-v-2838"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「悔」。",
  "donor": "悔",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuei⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0916",
  "wordIds": [
   "yubao-60824-v-0916"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「可以」。",
  "donor": "可以",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰo⁵⁵ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2754",
  "wordIds": [
   "yubao-60824-v-2754"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话或湘语「过滤」。",
  "donor": "过滤",
  "donorVariety": "西南官话或湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ko²¹ly¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2773",
  "wordIds": [
   "yubao-60824-v-2773"
  ],
  "kind": "借词来源",
  "text": "「绣」部分（第 3 音节）可能借自西南官话或湘语。",
  "donor": "绣",
  "donorVariety": "西南官话或湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsu³³pu³⁵xe¹³",
    "span": [
     3,
     3
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2773",
  "wordIds": [
   "yubao-60756-v-2773"
  ],
  "kind": "借词来源",
  "text": "「绣」部分（第 3 音节）可能借自西南官话。",
  "donor": "绣",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kʰa⁵³pʰu³³xə³³",
    "span": [
     3,
     3
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1974",
  "wordIds": [
   "yubao-60756-v-1974"
  ],
  "kind": "借词来源",
  "text": "「绣」部分（第 3 音节）可能借自西南官话。",
  "donor": "绣",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kʰa⁵³pʰu³³ɕu⁵⁵lɛ⁵⁵ɕi⁵⁵",
    "span": [
     3,
     3
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-w1721",
  "wordIds": [
   "w1721"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「皮」。",
  "donor": "皮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰi²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2618",
  "wordIds": [
   "yubao-60756-v-2618"
  ],
  "kind": "借词来源",
  "text": "「酿」部分（第 2 音节）可能借自西南官话。",
  "donor": "酿",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "zə⁵⁵liaŋ⁵⁵",
    "span": [
     2,
     2
    ]
   }
  ],
  "reviewBatch": "loan-supplement-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289703",
  "wordIds": [
   "stedt-rn-289703"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「袜」。",
  "donor": "袜",
  "donorVariety": "湘语",
  "evidenceStatus": "tentative",
  "borrowingPeriod": "undetermined",
  "scope": "whole",
  "reviewedForms": [{"ipa": "ʔo³⁵", "span": [1, 1]}],
  "reviewBatch": "loan-supplement-2026-10-23"
 }
]);
EDITORIAL_NOTES.push(...[
 {
  "id": "chinese-loan-stedt-rn-289482",
  "wordIds": [
   "stedt-rn-289482",
   "yubao-60824-v-0259"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「马」。",
  "donor": "马",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mo¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1792",
  "wordIds": [
   "yubao-60824-v-1792"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「钩子」。",
  "donor": "钩子",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai¹³tɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0052",
  "wordIds": [
   "yubao-60824-v-0052"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「砖」。",
  "donor": "砖",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕyã³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289676",
  "wordIds": [
   "stedt-rn-289676"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「砖」。",
  "donor": "砖",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕya³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-290190",
  "wordIds": [
   "stedt-rn-290190"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「真」。",
  "donor": "真",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕĩ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1685",
  "wordIds": [
   "yubao-60824-v-1685"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自湘语。",
  "donor": "马",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mo¹³bo¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1686",
  "wordIds": [
   "yubao-60824-v-1686"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自湘语。",
  "donor": "马",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mo¹³ni³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1687",
  "wordIds": [
   "yubao-60824-v-1687"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自湘语。",
  "donor": "马",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mo¹³bie²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2574",
  "wordIds": [
   "yubao-60824-v-2574"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自湘语。",
  "donor": "马",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mo²¹dʑi¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2358",
  "wordIds": [
   "yubao-60824-v-2358"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自湘语。",
  "donor": "马",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mo¹³a²¹dʑie¹³nia³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0929",
  "wordIds": [
   "yubao-60824-v-0929"
  ],
  "kind": "借词来源",
  "text": "「马屁股」部分（第 1—3 音节）可能借自湘语。",
  "donor": "马屁股",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "mo¹³pʰie¹³ku⁵⁵pʰe²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2768",
  "wordIds": [
   "yubao-60824-v-2768"
  ],
  "kind": "借词来源",
  "text": "「砖」部分（第 1 音节）可能借自湘语。",
  "donor": "砖",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕyã³³ʉ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2772",
  "wordIds": [
   "yubao-60824-v-2772"
  ],
  "kind": "借词来源",
  "text": "「穿」部分（第 3 音节）可能借自湘语。",
  "donor": "穿",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "a¹³ɣe⁵⁵tɕʰyã³³",
    "span": [
     3,
     3
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2479",
  "wordIds": [
   "yubao-60824-v-2479"
  ],
  "kind": "借词来源",
  "text": "「钩子」部分（第 2—3 音节）可能借自湘语。",
  "donor": "钩子",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³kai¹³tɕie⁵⁵",
    "span": [
     2,
     3
    ]
   }
  ],
  "reviewBatch": "xiang-confirmation-2026-10-23"
 }
]);
EDITORIAL_NOTES.push(...[
 {
  "id": "chinese-loan-yubao-60756-v-1875",
  "wordIds": [
   "yubao-60756-v-1875"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马鞭子」。",
  "donor": "马鞭子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵³pʰiaŋ³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0259",
  "wordIds": [
   "yubao-60756-v-0259"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马」。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1685",
  "wordIds": [
   "yubao-60756-v-1685"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵a⁵³pa³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1686",
  "wordIds": [
   "yubao-60756-v-1686"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵ȵi⁵⁵ka⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1687",
  "wordIds": [
   "yubao-60756-v-1687"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma³⁵pi⁵⁵pi³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1688",
  "wordIds": [
   "yubao-60756-v-1688"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³ɕi³³ka³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2574",
  "wordIds": [
   "yubao-60756-v-2574"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵tɕʰi⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-384224",
  "wordIds": [
   "stedt-rn-384224"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马」。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-359128",
  "wordIds": [
   "stedt-rn-359128"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³pa⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-359077",
  "wordIds": [
   "stedt-rn-359077"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³pi³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-359280",
  "wordIds": [
   "stedt-rn-359280"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³sie²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-359229",
  "wordIds": [
   "stedt-rn-359229"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³si³⁵ka⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-370922",
  "wordIds": [
   "stedt-rn-370922"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³tsʰo⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-359178",
  "wordIds": [
   "stedt-rn-359178"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³ȵi²¹ka²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288541",
  "wordIds": [
   "stedt-rn-288541"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马」。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0259",
  "wordIds": [
   "yubao-60823-v-0259"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马」。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1685",
  "wordIds": [
   "yubao-60823-v-1685"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵a⁵³pa³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1686",
  "wordIds": [
   "yubao-60823-v-1686"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵ni⁵³ka¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1687",
  "wordIds": [
   "yubao-60823-v-1687"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³pi¹³pi⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1688",
  "wordIds": [
   "yubao-60823-v-1688"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵ɕi¹³ka⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2574",
  "wordIds": [
   "yubao-60823-v-2574"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵tũ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-w1459",
  "wordIds": [
   "w1459"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马」。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "ma⁵³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-w1462",
  "wordIds": [
   "w1462"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵¹tɕi⁵¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2358",
  "wordIds": [
   "yubao-60823-v-2358"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵tɕie⁵³ma³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2358",
  "wordIds": [
   "yubao-60756-v-2358"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³tɕe³³xa³³ma³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1873",
  "wordIds": [
   "yubao-60823-v-1873"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³lũ³³tsʰɿ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1874",
  "wordIds": [
   "yubao-60823-v-1874"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵³ɣɤe¹³la⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1876",
  "wordIds": [
   "yubao-60823-v-1876"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵nie³³no⁵⁵tũ¹³tsʰɿ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1880",
  "wordIds": [
   "yubao-60756-v-1880"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵ɣə³³la³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2498",
  "wordIds": [
   "yubao-60823-v-2498"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马」。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-w1460",
  "wordIds": [
   "w1460"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「马鞍子」。",
  "donor": "马鞍子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵¹aŋ⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1878",
  "wordIds": [
   "yubao-60823-v-1878"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵nie³¹tsɿ⁵⁵kɤe³¹ɣɤe¹³la⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1879",
  "wordIds": [
   "yubao-60823-v-1879"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵nie³¹tʰa⁵⁵nie³¹ɣɤe¹³la⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1880",
  "wordIds": [
   "yubao-60823-v-1880"
  ],
  "kind": "借词来源",
  "text": "「马」部分（第 1 音节）可能借自西南官话。",
  "donor": "马",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵ɕi⁵⁵nie³¹ɣɤe¹³la⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1887",
  "wordIds": [
   "yubao-60824-v-1887"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语。",
  "donor": "",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰʉ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2442",
  "wordIds": [
   "yubao-60824-v-2442"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「风车」。",
  "donor": "风车",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fẽ³³tsʰe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0362",
  "wordIds": [
   "yubao-60824-v-0362"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「单车」。",
  "donor": "单车",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tã³³tsʰe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1281",
  "wordIds": [
   "yubao-60824-v-1281"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语「车路」。",
  "donor": "车路",
  "donorVariety": "湘语",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰe³³lu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-204483",
  "wordIds": [
   "stedt-rn-204483"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「汽车」。",
  "donor": "汽车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³⁵tsʰie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60757-v-2442",
  "wordIds": [
   "yubao-60757-v-2442"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「车子」。",
  "donor": "车子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɘ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0362",
  "wordIds": [
   "yubao-60823-v-0362"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「单车」。",
  "donor": "单车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tã⁵⁵tsʰɤ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2483",
  "wordIds": [
   "yubao-60823-v-2483"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火车」。",
  "donor": "火车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xo⁵⁵tsʰɤe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2484",
  "wordIds": [
   "yubao-60823-v-2484"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「汽车」。",
  "donor": "汽车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi¹³tsʰɤe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2442",
  "wordIds": [
   "yubao-60823-v-2442"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「风车」。",
  "donor": "风车",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xũ⁵⁵tsʰɤe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1887",
  "wordIds": [
   "yubao-60823-v-1887"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「车轴」。",
  "donor": "车轴",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɤe⁵⁵tsʰɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0678",
  "wordIds": [
   "yubao-60823-v-0678"
  ],
  "kind": "借词来源",
  "text": "「车」部分（第 6 音节）可能借自西南官话。",
  "donor": "车",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "luɤ̃³³tsɿ³¹na¹³pu⁵⁵nie⁵⁵tsʰɤ⁵⁵",
    "span": [
     6,
     6
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1855",
  "wordIds": [
   "yubao-60823-v-1855"
  ],
  "kind": "借词来源",
  "text": "「车子」部分（第 3—4 音节）可能借自西南官话。",
  "donor": "车子",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsʰɤ³³sa³¹tsʰɤe⁵⁵tsʰɿ⁵⁵",
    "span": [
     3,
     4
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289522",
  "wordIds": [
   "stedt-rn-289522"
  ],
  "kind": "借词来源",
  "text": "「蟜娘」部分（第 1—2 音节）可能借自湘语。",
  "donor": "蟜娘",
  "donorVariety": "湘语",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "dʑio²¹niã³⁵du̵²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "xiang-etymology-stedt-rn-289737",
  "wordIds": [
   "stedt-rn-289737"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语，借入年代未定。",
  "donorVariety": "湘语",
  "borrowingPeriod": "undetermined",
  "reviewedForms": [
   {
    "ipa": "tsʰo³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 },
 {
  "id": "phrase-structure-yubao-60823-v-2790",
  "wordIds": [
   "yubao-60823-v-2790"
  ],
  "kind": "结构分析",
  "text": "宾动短语：no⁵⁵「人」＋pu¹³「杀」。",
  "reviewBatch": "ma-car-dragonfly-2026-10-23"
 }
]);
EDITORIAL_NOTES.push({
 "id": "chinese-loan-yubao-60824-v-2903",
 "wordIds": [
  "yubao-60824-v-2903"
 ],
 "kind": "借词来源",
 "text": "当代湘语借词。",
 "donorVariety": "湘语",
 "borrowingPeriod": "contemporary",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "tsau³⁵nie²¹",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "xiang-contemporary-2026-10-23"
});
EDITORIAL_NOTES.push(...[
 {
  "id": "chinese-loan-w2258",
  "wordIds": [
   "w2258"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「提高」。",
  "donor": "提高",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰi²¹kau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289187",
  "wordIds": [
   "stedt-rn-289187"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「提高」。",
  "donor": "提高",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰi²¹kau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-181176",
  "wordIds": [
   "stedt-rn-181176"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「泉」。",
  "donor": "泉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰian²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2901",
  "wordIds": [
   "yubao-60756-v-2901"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「厉害」。",
  "donor": "厉害",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li³³xɛ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-w472",
  "wordIds": [
   "w472"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「除」。",
  "donor": "除",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2566",
  "wordIds": [
   "yubao-60756-v-2566"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「除」。",
  "donor": "除",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2566",
  "wordIds": [
   "yubao-60823-v-2566"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「除」。",
  "donor": "除",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2566",
  "wordIds": [
   "yubao-60824-v-2566"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「除」。",
  "donor": "除",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zu²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2550",
  "wordIds": [
   "yubao-60756-v-2550"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「照相」。按宾动语序重组为「相 照」，两个成分均为借词。",
  "donor": "照相",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ³⁵tsau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2550",
  "wordIds": [
   "yubao-60823-v-2550"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「照相」。按宾动语序重组为「相 照」，两个成分均为借词。",
  "donor": "照相",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã¹³tsau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2550",
  "wordIds": [
   "yubao-60824-v-2550"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「照相」。按宾动语序重组为「相 照」，两个成分均为借词。",
  "donor": "照相",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiã¹³tsau¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "loan-followup-2026-10-23"
 }
]);
// Reviewed source forms: complete loans and borrowed components.
EDITORIAL_NOTES.push(...[
 {
  "id": "chinese-loan-stedt-rn-290263",
  "wordIds": [
   "stedt-rn-290263"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亩」。",
  "donor": "亩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-290263--south",
  "wordIds": [
   "stedt-rn-290263--south"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「亩」。",
  "donor": "亩",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1578",
  "wordIds": [
   "w1578"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亩」。",
  "donor": "亩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu⁵¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2957",
  "wordIds": [
   "yubao-60823-v-2957"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亩」。",
  "donor": "亩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2518",
  "wordIds": [
   "w2518"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「修」。",
  "donor": "修",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiu⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2170",
  "wordIds": [
   "w2170"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「刷」。",
  "donor": "刷",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sua²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2950",
  "wordIds": [
   "yubao-60756-v-2950"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「厘」。",
  "donor": "厘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2950",
  "wordIds": [
   "yubao-60823-v-2950"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「厘」。",
  "donor": "厘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2950",
  "wordIds": [
   "yubao-60824-v-2950"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「厘」。",
  "donor": "厘",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0729",
  "wordIds": [
   "yubao-60824-v-0729"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「墨」。",
  "donor": "墨",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-290261",
  "wordIds": [
   "stedt-rn-290261"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「寸」。",
  "donor": "寸",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰẽ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-229065",
  "wordIds": [
   "stedt-rn-229065"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尺」。",
  "donor": "尺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰi³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-390713",
  "wordIds": [
   "stedt-rn-390713"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尺」。",
  "donor": "尺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰi³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2955",
  "wordIds": [
   "yubao-60824-v-2955"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「尺」。",
  "donor": "尺",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰi²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2736",
  "wordIds": [
   "w2736"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「州」。",
  "donor": "州",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsou⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-198516",
  "wordIds": [
   "stedt-rn-198516"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「庙」。",
  "donor": "庙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miau⁵³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1549",
  "wordIds": [
   "w1549"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「庙」。",
  "donor": "庙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miau²⁴",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "miau³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2149",
  "wordIds": [
   "w2149"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「搜」。",
  "donor": "搜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sou⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w703",
  "wordIds": [
   "w703"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「改」。",
  "donor": "改",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kai⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1012",
  "wordIds": [
   "w1012"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「教」。",
  "donor": "教",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1778",
  "wordIds": [
   "w1778"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「旗」。",
  "donor": "旗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w391",
  "wordIds": [
   "w391"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「槽」。",
  "donor": "槽",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰau²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1700",
  "wordIds": [
   "w1700"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「炮」。",
  "donor": "炮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰau⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1866",
  "wordIds": [
   "yubao-60756-v-1866"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「炮」。",
  "donor": "炮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰau³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1866",
  "wordIds": [
   "yubao-60824-v-1866"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「炮」。",
  "donor": "炮",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰau¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289428",
  "wordIds": [
   "stedt-rn-289428"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「煤」。",
  "donor": "煤",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "mɨe²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1519",
  "wordIds": [
   "w1519"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「煤」。",
  "donor": "煤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0054",
  "wordIds": [
   "yubao-60756-v-0054"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「煤」。",
  "donor": "煤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2639",
  "wordIds": [
   "w2639"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「照」。",
  "donor": "照",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1874",
  "wordIds": [
   "w1874"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「球」。",
  "donor": "球",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiu²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w596",
  "wordIds": [
   "w596"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电」。",
  "donor": "电",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1310",
  "wordIds": [
   "yubao-60823-v-1310"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「硝」。",
  "donor": "硝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1310",
  "wordIds": [
   "yubao-60824-v-1310"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「硝」。",
  "donor": "硝",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1308",
  "wordIds": [
   "yubao-60756-v-1308"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「碱」。",
  "donor": "碱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕaŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-378325",
  "wordIds": [
   "stedt-rn-378325"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「笔」。",
  "donor": "笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2516",
  "wordIds": [
   "yubao-60756-v-2516"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「笔」。",
  "donor": "笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2516",
  "wordIds": [
   "yubao-60824-v-2516"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「笔」。",
  "donor": "笔",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2541",
  "wordIds": [
   "yubao-60823-v-2541"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箫」。",
  "donor": "箫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2812",
  "wordIds": [
   "yubao-60824-v-2812"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「绞」。",
  "donor": "绞",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2750",
  "wordIds": [
   "w2750"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「转」。",
  "donor": "转",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuɛn⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2751",
  "wordIds": [
   "w2751"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「转」。",
  "donor": "转",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuɛn²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2726",
  "wordIds": [
   "w2726"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钟」。",
  "donor": "钟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tsoŋ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289425",
  "wordIds": [
   "stedt-rn-289425"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锡」。",
  "donor": "锡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289425--south",
  "wordIds": [
   "stedt-rn-289425--south"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「锡」。",
  "donor": "锡",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1300",
  "wordIds": [
   "yubao-60756-v-1300"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锡」。",
  "donor": "锡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1300",
  "wordIds": [
   "yubao-60823-v-1300"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锡」。",
  "donor": "锡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1300",
  "wordIds": [
   "yubao-60824-v-1300"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「锡」。",
  "donor": "锡",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2535",
  "wordIds": [
   "yubao-60756-v-2535"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锣」。",
  "donor": "锣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɔ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1075",
  "wordIds": [
   "yubao-60756-v-1075"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一千」。",
  "donor": "一千",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³³tɕʰaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1075",
  "wordIds": [
   "yubao-60823-v-1075"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一千」。",
  "donor": "一千",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi¹³tɕʰiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1074",
  "wordIds": [
   "yubao-60823-v-1074"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一百」。",
  "donor": "一百",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi¹³pɤe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2927",
  "wordIds": [
   "yubao-60823-v-2927"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一百零一」。",
  "donor": "一百零一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi¹³pɤe³¹lɤ̃³³ʑi³³",
    "span": [
     1,
     4
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2587",
  "wordIds": [
   "w2587"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一起」。",
  "donor": "一起",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²⁴tɕʰi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1191",
  "wordIds": [
   "yubao-60756-v-1191"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「一边」。",
  "donor": "一边",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi³³piaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2181",
  "wordIds": [
   "yubao-60756-v-2181"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中医」。",
  "donor": "中医",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2521",
  "wordIds": [
   "yubao-60824-v-2521"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「中学」。",
  "donor": "中学",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsõ³³ɕye²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2113",
  "wordIds": [
   "w2113"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「事情」。",
  "donor": "事情",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ²⁴tɕʰiŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289456",
  "wordIds": [
   "stedt-rn-289456"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「五月」。",
  "donor": "五月",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʔu⁵⁵jye³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288914",
  "wordIds": [
   "stedt-rn-288914"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「人民」。",
  "donor": "人民",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zĩ²¹mĩ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288872",
  "wordIds": [
   "stedt-rn-288872"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「价钱」。",
  "donor": "价钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕia³⁵tɕʰiã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w996",
  "wordIds": [
   "w996"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「价钱」。",
  "donor": "价钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕia²⁴tɕʰiɛn²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕia³⁵tɕʰian²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2229",
  "wordIds": [
   "yubao-60824-v-2229"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「伤口子」。",
  "donor": "伤口子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã³³kʰʉ⁵⁵tsi²¹",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1813",
  "wordIds": [
   "w1813"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「全部」。",
  "donor": "全部",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛn²¹pu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2757",
  "wordIds": [
   "w2757"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「准备」。",
  "donor": "准备",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsun⁵⁵pei²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2119",
  "wordIds": [
   "yubao-60756-v-2119"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「单眼皮」。",
  "donor": "单眼皮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "taŋ⁵⁵ʑaŋ⁵⁵pʰi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0595",
  "wordIds": [
   "yubao-60756-v-0595"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「厨师」。",
  "donor": "厨师",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu³³sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2120",
  "wordIds": [
   "yubao-60756-v-2120"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「双眼皮」。",
  "donor": "双眼皮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "suaŋ⁵⁵ʑaŋ⁵⁵pʰi⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2838",
  "wordIds": [
   "yubao-60756-v-2838"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「反悔」。",
  "donor": "反悔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ⁵⁵xui³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1372",
  "wordIds": [
   "yubao-60756-v-1372"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「反面」。",
  "donor": "反面",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ⁵⁵miaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289186",
  "wordIds": [
   "stedt-rn-289186"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「发展」。",
  "donor": "发展",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua³⁵tsã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1670",
  "wordIds": [
   "yubao-60756-v-1670"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「发情」。",
  "donor": "发情",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua³³tɕʰiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-127338",
  "wordIds": [
   "stedt-rn-127338"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「哑子」。",
  "donor": "哑子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "a⁵⁵ tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2546",
  "wordIds": [
   "yubao-60824-v-2546"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「哨子」。",
  "donor": "哨子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sau¹³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1225",
  "wordIds": [
   "w1225"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「喇叭」。",
  "donor": "喇叭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la⁵⁵pa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2547",
  "wordIds": [
   "yubao-60756-v-2547"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「喇叭」。",
  "donor": "喇叭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la⁵³pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2547",
  "wordIds": [
   "yubao-60823-v-2547"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「喇叭」。",
  "donor": "喇叭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la⁵⁵pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2547",
  "wordIds": [
   "yubao-60824-v-2547"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「喇叭」。",
  "donor": "喇叭",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la⁵⁵pa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2336",
  "wordIds": [
   "w2336"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「团圆」。",
  "donor": "团圆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰuɛn²¹jɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2337",
  "wordIds": [
   "w2337"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「团长」。",
  "donor": "团长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰuɛn²¹tsaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1819",
  "wordIds": [
   "w1819"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「圈圈」。",
  "donor": "圈圈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛn⁵⁵tɕʰiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-204126",
  "wordIds": [
   "stedt-rn-204126"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「垃圾」。",
  "donor": "垃圾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la²¹tɕi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0318",
  "wordIds": [
   "yubao-60756-v-0318"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「垃圾」。",
  "donor": "垃圾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la⁵⁵tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0318",
  "wordIds": [
   "yubao-60824-v-0318"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「垃圾」。",
  "donor": "垃圾",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la³³tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0729",
  "wordIds": [
   "yubao-60756-v-0729"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墨子」。",
  "donor": "墨子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2186",
  "wordIds": [
   "yubao-60756-v-2186"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「外伤」。",
  "donor": "外伤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uɛ³³saŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0658",
  "wordIds": [
   "yubao-60756-v-0658"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「外孙」。",
  "donor": "外孙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uɛ³³sun³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2561",
  "wordIds": [
   "w2561"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「夜饭」。",
  "donor": "夜饭",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jɤ²⁴fɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2101",
  "wordIds": [
   "yubao-60756-v-2101"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大肠」。",
  "donor": "大肠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵tsʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2227",
  "wordIds": [
   "w2227"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「太公」。",
  "donor": "太公",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰai²⁴kɔŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0643",
  "wordIds": [
   "yubao-60756-v-0643"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「姐夫」。",
  "donor": "姐夫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕe⁵³xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2397",
  "wordIds": [
   "yubao-60756-v-2397"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「婆家」。",
  "donor": "婆家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰɔ³³tɕa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2484",
  "wordIds": [
   "w2484"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「宵夜」。",
  "donor": "宵夜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵⁵jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2272",
  "wordIds": [
   "yubao-60756-v-2272"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小产」。",
  "donor": "小产",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau⁵⁵tsʰaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0881",
  "wordIds": [
   "yubao-60756-v-0881"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小心」。",
  "donor": "小心",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau⁵⁵ɕiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1059",
  "wordIds": [
   "yubao-60756-v-1059"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小气」。",
  "donor": "小气",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau³⁵tɕʰi⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2183",
  "wordIds": [
   "yubao-60756-v-2183"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小病」。",
  "donor": "小病",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau³⁵piŋ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2102",
  "wordIds": [
   "yubao-60756-v-2102"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小肠」。",
  "donor": "小肠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau⁵⁵tsʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1280",
  "wordIds": [
   "yubao-60756-v-1280"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小路」。",
  "donor": "小路",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau³⁵lu⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2322",
  "wordIds": [
   "yubao-60756-v-2322"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「屠夫」。",
  "donor": "屠夫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu³³xu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289620",
  "wordIds": [
   "stedt-rn-289620"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「工人」。",
  "donor": "工人",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ³³ze⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0706",
  "wordIds": [
   "yubao-60756-v-0706"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工钱」。",
  "donor": "工钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɔŋ⁵⁵tɕʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2324",
  "wordIds": [
   "yubao-60824-v-2324"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「强盗」。",
  "donor": "强盗",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑiã³³tau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0597",
  "wordIds": [
   "yubao-60756-v-0597"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「徒弟」。",
  "donor": "徒弟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu³³ti³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1867",
  "wordIds": [
   "w1867"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「情意」。",
  "donor": "情意",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ²¹ji²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2153",
  "wordIds": [
   "w2153"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「手脚」。",
  "donor": "手脚",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sou⁵⁵tɕiau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
 "id": "chinese-loan-w1725",
 "wordIds": [
  "w1725"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「批评」。",
 "donor": "批评",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "pʰi⁵⁵pʰiŋ²¹",
   "span": [
    1,
    2
   ]
  },
  {
   "ipa": "pʰi⁵⁵pʰĩ²¹",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-w2314",
  "wordIds": [
   "w2314"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「投生」。",
  "donor": "投生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰou²¹sɜŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1692",
  "wordIds": [
   "w1692"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「排长」。",
  "donor": "排长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰai²¹tsaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2668",
  "wordIds": [
   "w2668"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「政策」。",
  "donor": "政策",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ²⁴tsʰɤ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2675",
  "wordIds": [
   "w2675"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「整齐」。",
  "donor": "整齐",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ⁵⁵tɕʰi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2371",
  "wordIds": [
   "w2371"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「文化」。",
  "donor": "文化",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wɜŋ²¹fa²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2890",
  "wordIds": [
   "yubao-60756-v-2890"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「方便」。",
  "donor": "方便",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ⁵⁵piaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1697",
  "wordIds": [
   "w1697"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「旁人」。",
  "donor": "旁人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰaŋ²¹zɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288899",
  "wordIds": [
   "stedt-rn-288899"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「旗子」。",
  "donor": "旗子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1800",
  "wordIds": [
   "w1800"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「旗子」。",
  "donor": "旗子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹tsɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1789",
  "wordIds": [
   "w1789"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「旗杆」。",
  "donor": "旗杆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹kaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0585",
  "wordIds": [
   "yubao-60756-v-0585"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「朋友」。",
  "donor": "朋友",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰɔŋ³³ʑu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2459",
  "wordIds": [
   "yubao-60756-v-2459"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「木槽」。",
  "donor": "木槽",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu³³tsʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w965",
  "wordIds": [
   "w965"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「机会」。",
  "donor": "机会",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi⁵⁵fei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0171",
  "wordIds": [
   "yubao-60756-v-0171"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「核桃」。",
  "donor": "核桃",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xe³³tʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289201",
  "wordIds": [
   "stedt-rn-289201"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「检查」。",
  "donor": "检查",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵tsʰa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1272",
  "wordIds": [
   "yubao-60823-v-1272"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「沙漠」。",
  "donor": "沙漠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sa⁵⁵mo³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1272",
  "wordIds": [
   "yubao-60824-v-1272"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「沙漠」。",
  "donor": "沙漠",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sa³³mo²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2286",
  "wordIds": [
   "yubao-60756-v-2286"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「法术」。",
  "donor": "法术",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua³³su³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2286",
  "wordIds": [
   "yubao-60824-v-2286"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「法术」。",
  "donor": "法术",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua²¹su¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w935",
  "wordIds": [
   "w935"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火药」。",
  "donor": "火药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fɔ⁵⁵jau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1291",
  "wordIds": [
   "yubao-60824-v-1291"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「煤渣」。",
  "donor": "煤渣",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mei²¹tsa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1548",
  "wordIds": [
   "yubao-60824-v-1548"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「熊掌」。",
  "donor": "熊掌",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiõ¹³tsã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1564",
  "wordIds": [
   "yubao-60823-v-1564"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「牦牛」。",
  "donor": "牦牛",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mau³³niɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2458",
  "wordIds": [
   "yubao-60756-v-2458"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「猪槽」。",
  "donor": "猪槽",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵⁵tsʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1305",
  "wordIds": [
   "yubao-60823-v-1305"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「玛瑙」。",
  "donor": "玛瑙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma⁵⁵nau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w602",
  "wordIds": [
   "w602"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电话」。",
  "donor": "电话",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiɛn²⁴fa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1385",
  "wordIds": [
   "w1385"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「留情」。",
  "donor": "留情",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liu²¹tɕʰiŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0515",
  "wordIds": [
   "yubao-60823-v-0515"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「疤子」。",
  "donor": "疤子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1764",
  "wordIds": [
   "yubao-60756-v-1764"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「皮箱」。",
  "donor": "皮箱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰi³³ɕaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2020",
  "wordIds": [
   "w2020"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「社会」。",
  "donor": "社会",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɤ²⁴fei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1727",
  "wordIds": [
   "yubao-60823-v-1727"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「窑子」。",
  "donor": "窑子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiau⁵⁵tsɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-387911",
  "wordIds": [
   "stedt-rn-387911"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第一」。",
  "donor": "第一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³⁵ji³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w593",
  "wordIds": [
   "w593"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「第一」。",
  "donor": "第一",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti²⁴ji⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1913",
  "wordIds": [
   "yubao-60824-v-1913"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「筲箕」。",
  "donor": "筲箕",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sau³³tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1882",
  "wordIds": [
   "yubao-60756-v-1882"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箍子」。",
  "donor": "箍子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ku⁵⁵tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1882",
  "wordIds": [
   "yubao-60823-v-1882"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箍子」。",
  "donor": "箍子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ku⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1882",
  "wordIds": [
   "yubao-60824-v-1882"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「箍箍」。",
  "donor": "箍箍",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ku³³ku³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288819",
  "wordIds": [
   "stedt-rn-288819"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箩筐」。",
  "donor": "箩筐",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo²¹kʰuã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289687",
  "wordIds": [
   "stedt-rn-289687"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「篱笆」。",
  "donor": "篱笆",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li²¹pa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2023",
  "wordIds": [
   "yubao-60756-v-2023"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「粑粑」。",
  "donor": "粑粑",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa⁵⁵pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2023",
  "wordIds": [
   "yubao-60823-v-2023"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「粑粑」。",
  "donor": "粑粑",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa⁵⁵pa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2648",
  "wordIds": [
   "w2648"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「糟蹋」。",
  "donor": "糟蹋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵tʰa⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2026",
  "wordIds": [
   "yubao-60756-v-2026"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「素菜」。",
  "donor": "素菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su³³tsʰɛ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288851",
  "wordIds": [
   "stedt-rn-288851"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肥皂」。",
  "donor": "肥皂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuei²¹tsau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289787",
  "wordIds": [
   "stedt-rn-289787"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「肥皂」。",
  "donor": "肥皂",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fei¹³tsau⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "fei¹³tsaɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0355",
  "wordIds": [
   "yubao-60823-v-0355"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肥皂」。",
  "donor": "肥皂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xui³³tsau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2249",
  "wordIds": [
   "yubao-60756-v-2249"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「胎记」。",
  "donor": "胎记",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɛ⁵⁵tɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2271",
  "wordIds": [
   "yubao-60823-v-2271"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「脐带子」。",
  "donor": "脐带子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³tai¹³tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1267",
  "wordIds": [
   "w1267"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「腊月」。",
  "donor": "腊月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "la²⁴jɤ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289643",
  "wordIds": [
   "stedt-rn-289643"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「舅舅」。",
  "donor": "舅舅",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiu̵³⁵tɕiu̵²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕiʉ³⁵tɕiʉ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1072",
  "wordIds": [
   "w1072"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「舅舅」。",
  "donor": "舅舅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiu²⁴tɕiu⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕiu³⁵tɕiu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0632",
  "wordIds": [
   "yubao-60823-v-0632"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「舅舅」。",
  "donor": "舅舅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɤu¹³tɕiɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-189744",
  "wordIds": [
   "stedt-rn-189744"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苦荞」。",
  "donor": "苦荞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu²¹tɕʰiau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1737",
  "wordIds": [
   "w1737"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苹果」。",
  "donor": "苹果",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiŋ²¹kuɔ⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0160",
  "wordIds": [
   "yubao-60756-v-0160"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苹果」。",
  "donor": "苹果",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiŋ³³kɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0563",
  "wordIds": [
   "yubao-60756-v-0563"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「菩萨」。",
  "donor": "菩萨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰu³³sa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0563",
  "wordIds": [
   "yubao-60823-v-0563"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「菩萨」。",
  "donor": "菩萨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰu³³sa¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1416",
  "wordIds": [
   "yubao-60756-v-1416"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「葡萄」。",
  "donor": "葡萄",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰu³³tʰau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288574",
  "wordIds": [
   "stedt-rn-288574"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「螃蟹」。",
  "donor": "螃蟹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰã²¹ka²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1694",
  "wordIds": [
   "w1694"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「螃蟹」。",
  "donor": "螃蟹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰaŋ²¹ka⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0256",
  "wordIds": [
   "yubao-60756-v-0256"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「螃蟹」。",
  "donor": "螃蟹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰaŋ³³ka³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0256",
  "wordIds": [
   "yubao-60823-v-0256"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「螃蟹」。",
  "donor": "螃蟹",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰã³³ka⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1614",
  "wordIds": [
   "yubao-60756-v-1614"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「螳螂」。",
  "donor": "螳螂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰaŋ³³laŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1545",
  "wordIds": [
   "yubao-60824-v-1545"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「豹子」。",
  "donor": "豹子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau³³tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1790",
  "wordIds": [
   "w1790"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「起花」。",
  "donor": "起花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi²¹fa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-127380",
  "wordIds": [
   "stedt-rn-127380"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「跛子」。",
  "donor": "跛子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pai³³ tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w837",
  "wordIds": [
   "w837"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「还是」。",
  "donor": "还是",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xai²¹sɨ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2059",
  "wordIds": [
   "yubao-60823-v-2059"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「酥油茶」。",
  "donor": "酥油茶",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "su⁵⁵ʑiɤu³³tsʰa³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2381",
  "wordIds": [
   "yubao-60756-v-2381"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「重孙」。",
  "donor": "重孙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɔŋ³³sun⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-201321",
  "wordIds": [
   "stedt-rn-201321"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铲子」。",
  "donor": "铲子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰan²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1797",
  "wordIds": [
   "yubao-60756-v-1797"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「雨衣」。",
  "donor": "雨衣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑi⁵⁵ʑi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0703",
  "wordIds": [
   "yubao-60824-v-0703"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「零钱」。",
  "donor": "零钱",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lẽ¹³dʑiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1441",
  "wordIds": [
   "yubao-60823-v-1441"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「青苔」。",
  "donor": "青苔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ⁵⁵tʰai⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w743",
  "wordIds": [
   "w743"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「革命」。",
  "donor": "革命",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kɤ²¹miŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1382",
  "wordIds": [
   "w1382"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「领导」。",
  "donor": "领导",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liŋ⁵⁵tau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1653",
  "wordIds": [
   "yubao-60823-v-1653"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鲈鱼」。",
  "donor": "鲈鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu¹³ʑi¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0250",
  "wordIds": [
   "yubao-60756-v-0250"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鲤鱼」。",
  "donor": "鲤鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "li⁵⁵ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2908",
  "wordIds": [
   "yubao-60756-v-2908"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「齐心」。",
  "donor": "齐心",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³ɕiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2588",
  "wordIds": [
   "w2588"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「以前」。",
  "donor": "以前",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji⁵⁵tɕʰiɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1753",
  "wordIds": [
   "yubao-60756-v-1753"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「围墙」。",
  "donor": "围墙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ui³³tɕʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1756",
  "wordIds": [
   "yubao-60756-v-1756"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「土墙」。",
  "donor": "土墙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵tɕʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1752",
  "wordIds": [
   "yubao-60756-v-1752"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墙壁」。",
  "donor": "墙壁",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰaŋ³³pʰi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2254",
  "wordIds": [
   "yubao-60824-v-2254"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「左撇子」。",
  "donor": "左撇子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tso⁵⁵pʰiã¹³tsi³⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2324",
  "wordIds": [
   "yubao-60756-v-2324"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「强盗」。",
  "donor": "强盗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰaŋ³³tau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1885",
  "wordIds": [
   "yubao-60756-v-1885"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「槌子」。",
  "donor": "槌子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰui³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2486",
  "wordIds": [
   "yubao-60756-v-2486"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「渡船」。",
  "donor": "渡船",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu⁵⁵tsʰuaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2016",
  "wordIds": [
   "yubao-60756-v-2016"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「猪腰子」。",
  "donor": "猪腰子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɿ⁵⁵ʑau⁵⁵tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1507",
  "wordIds": [
   "yubao-60756-v-1507"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「苦荞」。",
  "donor": "苦荞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰu⁵⁵tɕʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0104",
  "wordIds": [
   "yubao-60756-v-0104"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「中秋」。",
  "donor": "中秋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔŋ⁵⁵tɕʰu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1053",
  "wordIds": [
   "w1053"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「京城」。",
  "donor": "京城",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiŋ⁵⁵tsʰɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w466",
  "wordIds": [
   "w466"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「从来」。",
  "donor": "从来",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɔŋ²¹lai²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0683",
  "wordIds": [
   "yubao-60756-v-0683"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「年成」。",
  "donor": "年成",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ȵaŋ³³tsʰeŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-189438",
  "wordIds": [
   "stedt-rn-189438"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「庄稼」。",
  "donor": "庄稼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsuan⁵⁵tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2786",
  "wordIds": [
   "yubao-60756-v-2786"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「报仇」。",
  "donor": "报仇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵⁵tsʰəu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2445",
  "wordIds": [
   "yubao-60823-v-2445"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「撮箕」。",
  "donor": "撮箕",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰo³³tɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1579",
  "wordIds": [
   "w1579"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「木匠」。",
  "donor": "木匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu²⁴tɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1002",
  "wordIds": [
   "w1002"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「检查」。",
  "donor": "检查",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛn⁵⁵tsʰa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1426",
  "wordIds": [
   "yubao-60756-v-1426"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「橙子」。",
  "donor": "橙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰeŋ³³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2895",
  "wordIds": [
   "yubao-60756-v-2895"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「狡猾」。",
  "donor": "狡猾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕau³⁵xua⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2460",
  "wordIds": [
   "w2460"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「现成」。",
  "donor": "现成",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn²⁴tsʰɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1331",
  "wordIds": [
   "yubao-60756-v-1331"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「秋天」。",
  "donor": "秋天",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰu⁵⁵tʰiaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1005",
  "wordIds": [
   "w1005"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「简介」。",
  "donor": "简介",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛn⁵¹kai²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0355",
  "wordIds": [
   "yubao-60756-v-0355"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「肥皂」。",
  "donor": "肥皂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xui³³tsʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2054",
  "wordIds": [
   "yubao-60756-v-2054"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「花椒」。",
  "donor": "花椒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua⁵⁵tɕau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0199",
  "wordIds": [
   "yubao-60756-v-0199"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「芹菜」。",
  "donor": "芹菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ³³tsʰɛ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1271",
  "wordIds": [
   "yubao-60824-v-1271"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「草原」。",
  "donor": "草原",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsau⁵⁵jyã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0395",
  "wordIds": [
   "yubao-60756-v-0395"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「饺子」。",
  "donor": "饺子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕau⁵³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1422",
  "wordIds": [
   "yubao-60756-v-1422"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「香蕉」。",
  "donor": "香蕉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ⁵⁵tɕau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2889",
  "wordIds": [
   "yubao-60756-v-2889"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「不要紧」。",
  "donor": "不要紧",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu³³ʑau³³tɕiŋ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2378",
  "wordIds": [
   "yubao-60756-v-2378"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「外甥女」。",
  "donor": "外甥女",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uɛ³³seŋ³³ȵi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1945",
  "wordIds": [
   "yubao-60756-v-1945"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「收音机」。",
  "donor": "收音机",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "səu³³ʑiŋ³³tɕi³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2385",
  "wordIds": [
   "yubao-60756-v-2385"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「男朋友」。",
  "donor": "男朋友",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "naŋ³³pʰɔŋ³³ʑu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0258",
  "wordIds": [
   "yubao-60824-v-0258"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「癞蛤蟆」。",
  "donor": "癞蛤蟆",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lɑi³⁵xa¹³ma³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1514",
  "wordIds": [
   "yubao-60756-v-1514"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蓖麻子」。",
  "donor": "蓖麻子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piŋ⁵⁵ma³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1664",
  "wordIds": [
   "yubao-60756-v-1664"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「钓鱼竿」。",
  "donor": "钓鱼竿",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiau⁵⁵ʑi⁵⁵kaŋ⁵³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w62",
  "wordIds": [
   "w62"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「上下」。",
  "donor": "上下",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "-saŋ²⁴ɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2926",
  "wordIds": [
   "yubao-60756-v-2926"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「九十」。",
  "donor": "九十",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕu⁵⁵sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1928",
  "wordIds": [
   "w1928"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「人头」。",
  "donor": "人头",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zɜŋ²¹tʰu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2469",
  "wordIds": [
   "yubao-60756-v-2469"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「价钱」。",
  "donor": "价钱",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕa⁵⁵tɕʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2366",
  "wordIds": [
   "yubao-60756-v-2366"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「兄弟」。",
  "donor": "兄弟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕɔŋ⁵⁵ti⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1362",
  "wordIds": [
   "w1362"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「凉鞋」。",
  "donor": "凉鞋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liɛn²¹xai²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1362",
  "wordIds": [
   "yubao-60756-v-1362"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「初九」。",
  "donor": "初九",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰu⁵⁵tɕu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2919",
  "wordIds": [
   "yubao-60756-v-2919"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十九」。",
  "donor": "十九",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ⁵⁵tɕu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2354",
  "wordIds": [
   "yubao-60756-v-2354"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「叛徒」。",
  "donor": "叛徒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰaŋ⁵⁵tʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-290104",
  "wordIds": [
   "stedt-rn-290104"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「团结」。",
  "donor": "团结",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "duã¹³tɕe²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2333",
  "wordIds": [
   "w2333"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「团结」。",
  "donor": "团结",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰuɛn²¹tɕiɛ²¹",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tʰuã²¹tɕe²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w531",
  "wordIds": [
   "w531"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大姐」。",
  "donor": "大姐",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta²¹tɕiɛ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2362",
  "wordIds": [
   "yubao-60756-v-2362"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大舅」。",
  "donor": "大舅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta³³tɕu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2329",
  "wordIds": [
   "w2329"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「头子」。",
  "donor": "头子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu²¹tsɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1966",
  "wordIds": [
   "yubao-60756-v-1966"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「夹衣」。",
  "donor": "夹衣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕa³³ʑi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0532",
  "wordIds": [
   "yubao-60756-v-0532"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「嫁妆」。",
  "donor": "嫁妆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕa³³tsuaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2363",
  "wordIds": [
   "yubao-60756-v-2363"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小舅」。",
  "donor": "小舅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau⁵⁵tɕu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0636",
  "wordIds": [
   "yubao-60756-v-0636"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「弟兄」。",
  "donor": "弟兄",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ti³³ɕɔŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w4720",
  "wordIds": [
   "w4720"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「批评」。",
  "donor": "批评",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰei⁵⁵pʰiŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1741",
  "wordIds": [
   "yubao-60756-v-1741"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「栏杆」。",
  "donor": "栏杆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "laŋ³³kʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1735",
  "wordIds": [
   "yubao-60756-v-1735"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「榫头」。",
  "donor": "榫头",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sun⁵⁵tʰəu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289409",
  "wordIds": [
   "stedt-rn-289409"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「池塘」。",
  "donor": "池塘",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰe³⁵dã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1866",
  "wordIds": [
   "w1866"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「清香」。",
  "donor": "清香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ⁵⁵ɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
 "id": "chinese-loan-w1702",
 "wordIds": [
  "w1702"
 ],
 "kind": "借词来源",
 "text": "可能借自西南官话「炮竹」。",
 "donor": "炮竹",
 "donorVariety": "西南官话",
 "scope": "whole",
 "reviewedForms": [
  {
   "ipa": "pʰau²⁴tsu⁵⁵",
   "span": [
    1,
    2
   ]
  }
 ],
 "reviewBatch": "coverage-pass-2026-10-23"
},
 {
  "id": "chinese-loan-yubao-60756-v-2346",
  "wordIds": [
   "yubao-60756-v-2346"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「王后」。",
  "donor": "王后",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xuaŋ³³xəu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2274",
  "wordIds": [
   "w2274"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「田坎」。",
  "donor": "田坎",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰiɛn²¹kʰaŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1782",
  "wordIds": [
   "yubao-60756-v-1782"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「电池」。",
  "donor": "电池",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiaŋ⁵⁵tsʰɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1755",
  "wordIds": [
   "yubao-60824-v-1755"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「砖墙」。",
  "donor": "砖墙",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsyã³³dʑiã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0066",
  "wordIds": [
   "yubao-60756-v-0066"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「磁铁」。",
  "donor": "磁铁",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɿ³³tʰie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2443",
  "wordIds": [
   "yubao-60756-v-2443"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「磙子」。",
  "donor": "磙子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kun⁵⁵tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0567",
  "wordIds": [
   "yubao-60756-v-0567"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「祠堂」。",
  "donor": "祠堂",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɿ³³tʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1039",
  "wordIds": [
   "w1039"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「结束」。",
  "donor": "结束",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛ²¹su²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2106",
  "wordIds": [
   "yubao-60824-v-2106"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「脑髓」。",
  "donor": "脑髓",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nau⁵⁵sui²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2538",
  "wordIds": [
   "yubao-60756-v-2538"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「腰鼓」。",
  "donor": "腰鼓",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑau⁵⁵ku³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w368",
  "wordIds": [
   "w368"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「茶罐」。",
  "donor": "茶罐",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa²¹kuɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2027",
  "wordIds": [
   "yubao-60756-v-2027"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「荤菜」。",
  "donor": "荤菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xun⁵⁵tsʰɛ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1527",
  "wordIds": [
   "yubao-60756-v-1527"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蕨菜」。",
  "donor": "蕨菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕe³³tsʰɛ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-43509",
  "wordIds": [
   "stedt-rn-43509"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「辫子」。",
  "donor": "辫子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pia¹³ tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1808",
  "wordIds": [
   "yubao-60824-v-1808"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「锅铲」。",
  "donor": "锅铲",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ko⁵⁵tsã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-183828",
  "wordIds": [
   "stedt-rn-183828"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「闰月」。",
  "donor": "闰月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zən⁵⁵jie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0201",
  "wordIds": [
   "yubao-60756-v-0201"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「韭菜」。",
  "donor": "韭菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕu³⁵tsʰɛ⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },

 {
  "id": "chinese-loan-stedt-rn-289805",
  "wordIds": [
   "stedt-rn-289805"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「飞机」。",
  "donor": "飞机",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fuei³³tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0393",
  "wordIds": [
   "yubao-60823-v-0393"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「馒头」。",
  "donor": "馒头",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mã³³tʰɤu¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2462",
  "wordIds": [
   "w2462"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「香蕉」。",
  "donor": "香蕉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵⁵tɕiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0605",
  "wordIds": [
   "yubao-60823-v-0605"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「驼子」。",
  "donor": "驼子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰo³³tsɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2254",
  "wordIds": [
   "yubao-60823-v-2254"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「左撇子」。",
  "donor": "左撇子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tso⁵⁵pʰiau³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w481",
  "wordIds": [
   "w481"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「传」。",
  "donor": "传",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰuɛn²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289825",
  "wordIds": [
   "stedt-rn-289825"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「球」。",
  "donor": "球",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiu̵³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2567",
  "wordIds": [
   "yubao-60823-v-2567"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「球」。",
  "donor": "球",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɤu⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1344",
  "wordIds": [
   "yubao-60756-v-1344"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「七月」。",
  "donor": "七月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi³³ʑe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1340",
  "wordIds": [
   "yubao-60756-v-1340"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「三月」。",
  "donor": "三月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵ʑe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1339",
  "wordIds": [
   "yubao-60756-v-1339"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「二月」。",
  "donor": "二月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɚ³⁵ʑe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288672",
  "wordIds": [
   "stedt-rn-288672"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「党员」。",
  "donor": "党员",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tã⁵⁵jiã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1345",
  "wordIds": [
   "yubao-60756-v-1345"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「八月」。",
  "donor": "八月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pa³³ʑe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1343",
  "wordIds": [
   "yubao-60756-v-1343"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「六月」。",
  "donor": "六月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³³ʑe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2771",
  "wordIds": [
   "yubao-60823-v-2771"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「刷墙」。",
  "donor": "刷墙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sua⁵⁵tɕʰiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289193",
  "wordIds": [
   "stedt-rn-289193"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「动员」。",
  "donor": "动员",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tũ³⁵jiã²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1931",
  "wordIds": [
   "yubao-60756-v-1931"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「匕首」。",
  "donor": "匕首",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pi⁵⁵səu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1347",
  "wordIds": [
   "yubao-60756-v-1347"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「十月」。",
  "donor": "十月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³³ʑe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w903",
  "wordIds": [
   "w903"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「反动」。",
  "donor": "反动",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fɛn⁵⁵tɔŋ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w911",
  "wordIds": [
   "w911"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「反正」。",
  "donor": "反正",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fɛn²¹tsɜŋ⁵¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2288",
  "wordIds": [
   "yubao-60756-v-2288"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「命运」。",
  "donor": "命运",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miŋ³³ʑiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2071",
  "wordIds": [
   "yubao-60756-v-2071"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「咸蛋」。",
  "donor": "咸蛋",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ³³taŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1341",
  "wordIds": [
   "yubao-60756-v-1341"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「四月」。",
  "donor": "四月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɿ³⁵ʑe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w810",
  "wordIds": [
   "w810"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「国家」。",
  "donor": "国家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuɔ²¹tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2504",
  "wordIds": [
   "yubao-60756-v-2504"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「国家」。",
  "donor": "国家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kui³³tɕa⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2345",
  "wordIds": [
   "yubao-60756-v-2345"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「国王」。",
  "donor": "国王",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kui³³uaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1821",
  "wordIds": [
   "w1821"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墙纸」。",
  "donor": "墙纸",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛn²¹tsɨ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0657",
  "wordIds": [
   "yubao-60756-v-0657"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「外甥」。",
  "donor": "外甥",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "uɛ³³seŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1546",
  "wordIds": [
   "yubao-60756-v-1546"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大熊猫」。",
  "donor": "大熊猫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta⁵⁵ɕɔŋ⁵⁵mau⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0529",
  "wordIds": [
   "yubao-60823-v-0529"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「媒人」。",
  "donor": "媒人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɤe³¹zɤ̃¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288942",
  "wordIds": [
   "stedt-rn-288942"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「工业」。",
  "donor": "工业",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kũ⁵⁵ne²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289869",
  "wordIds": [
   "stedt-rn-289869"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「工业」。",
  "donor": "工业",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kõ³³ne³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1209",
  "wordIds": [
   "yubao-60756-v-1209"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「影子」。",
  "donor": "影子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288755",
  "wordIds": [
   "stedt-rn-288755"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「手表」。",
  "donor": "手表",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "siu⁵⁵piau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-369132",
  "wordIds": [
   "stedt-rn-369132"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扣子」。",
  "donor": "扣子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɯ³⁵tsi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2605",
  "wordIds": [
   "w2605"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「拥护」。",
  "donor": "拥护",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jɔŋ⁵⁵xu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289203",
  "wordIds": [
   "stedt-rn-289203"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「斗争」。",
  "donor": "斗争",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiu³⁵tsẽ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0002",
  "wordIds": [
   "yubao-60756-v-0002"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「月亮」。",
  "donor": "月亮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑe³³liaŋ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1351",
  "wordIds": [
   "yubao-60756-v-1351"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「月初」。",
  "donor": "月初",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑe³³tsʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1352",
  "wordIds": [
   "yubao-60756-v-1352"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「月底」。",
  "donor": "月底",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑe³³ti⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2025",
  "wordIds": [
   "yubao-60756-v-2025"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「月饼」。",
  "donor": "月饼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑe³³piŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-202953",
  "wordIds": [
   "stedt-rn-202953"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「杯子」。",
  "donor": "杯子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɯi⁵⁵tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289579",
  "wordIds": [
   "stedt-rn-289579"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「桔子」。",
  "donor": "桔子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕi¹³tsi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288620",
  "wordIds": [
   "stedt-rn-288620"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉花」。",
  "donor": "棉花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me²¹xa²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1573",
  "wordIds": [
   "w1573"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「模范」。",
  "donor": "模范",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɔ²¹fɛn²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1417",
  "wordIds": [
   "yubao-60756-v-1417"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「樱桃」。",
  "donor": "樱桃",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiŋ⁵⁵tʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0098",
  "wordIds": [
   "yubao-60756-v-0098"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正月」。",
  "donor": "正月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ⁵⁵ʑe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2676",
  "wordIds": [
   "w2676"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正确」。",
  "donor": "正确",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɜŋ²⁴tɕʰiau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2195",
  "wordIds": [
   "yubao-60756-v-2195"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「毒药」。",
  "donor": "毒药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu³⁵ʑau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0050",
  "wordIds": [
   "yubao-60756-v-0050"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「水泥」。",
  "donor": "水泥",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sui⁵³ȵiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2048",
  "wordIds": [
   "yubao-60756-v-2048"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「油渣子」。",
  "donor": "油渣子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑu³³tsa³³tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1906",
  "wordIds": [
   "yubao-60756-v-1906"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「洗衣粉」。",
  "donor": "洗衣粉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕi⁵⁵ʑi⁵⁵xun⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0548",
  "wordIds": [
   "yubao-60756-v-0548"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「满月」。",
  "donor": "满月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "maŋ³⁵ʑe⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1270",
  "wordIds": [
   "yubao-60824-v-1270"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「瀑布」。",
  "donor": "瀑布",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu²¹pu²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w933",
  "wordIds": [
   "w933"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火枪」。",
  "donor": "火枪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fɔ⁵⁵tɕʰiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1778",
  "wordIds": [
   "yubao-60756-v-1778"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「灯芯」。",
  "donor": "灯芯",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "teŋ⁵⁵ɕiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1900",
  "wordIds": [
   "yubao-60823-v-1900"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「烟斗」。",
  "donor": "烟斗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiã⁵⁵tʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1900",
  "wordIds": [
   "yubao-60824-v-1900"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「烟斗」。",
  "donor": "烟斗",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jã³³tau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2060",
  "wordIds": [
   "yubao-60824-v-2060"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「牛奶」。",
  "donor": "牛奶",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "niʉ¹³lei⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w906",
  "wordIds": [
   "w906"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「犯人」。",
  "donor": "犯人",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fɛn²⁴zɜŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2039",
  "wordIds": [
   "yubao-60823-v-2039"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「白糖」。",
  "donor": "白糖",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɤe³³tʰã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1655",
  "wordIds": [
   "yubao-60823-v-1655"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「白鳝」。",
  "donor": "白鳝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pɤe³³sã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1891",
  "wordIds": [
   "yubao-60756-v-1891"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「眼镜」。",
  "donor": "眼镜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑaŋ³⁵tɕɚ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1242",
  "wordIds": [
   "yubao-60756-v-1242"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「秧田」。",
  "donor": "秧田",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑaŋ⁵⁵tʰiaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1447",
  "wordIds": [
   "w1447"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「罗盘」。",
  "donor": "罗盘",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luɔ²¹pʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2148",
  "wordIds": [
   "yubao-60756-v-2148"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「胸脯子」。",
  "donor": "胸脯子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕɔŋ⁵⁵pʰu³³tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1455",
  "wordIds": [
   "yubao-60824-v-1455"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「芦苇」。",
  "donor": "芦苇",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu¹³wei³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w908",
  "wordIds": [
   "w908"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「范围」。",
  "donor": "范围",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fɛn²⁴wei²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0425",
  "wordIds": [
   "yubao-60756-v-0425"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「茶叶子」。",
  "donor": "茶叶子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰa³³ʑe³³tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2193",
  "wordIds": [
   "yubao-60756-v-2193"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「草药」。",
  "donor": "草药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰau⁵⁵ʑau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1421",
  "wordIds": [
   "yubao-60823-v-1421"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「菠萝」。",
  "donor": "菠萝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "po⁵⁵lo³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1421",
  "wordIds": [
   "yubao-60824-v-1421"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「菠萝」。",
  "donor": "菠萝",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "po³³lo²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-363560",
  "wordIds": [
   "stedt-rn-363560"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蜈蚣」。",
  "donor": "蜈蚣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wu²¹koŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2236",
  "wordIds": [
   "yubao-60756-v-2236"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「血泡」。",
  "donor": "血泡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕe³³pʰau³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2099",
  "wordIds": [
   "yubao-60756-v-2099"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「血管」。",
  "donor": "血管",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕe³³kuaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2099",
  "wordIds": [
   "yubao-60823-v-2099"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「血管」。",
  "donor": "血管",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕie³³kuã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2201",
  "wordIds": [
   "yubao-60756-v-2201"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「补药」。",
  "donor": "补药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu³⁵ʑau⁵³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2513",
  "wordIds": [
   "yubao-60756-v-2513"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「证据」。",
  "donor": "证据",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ³³tɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0572",
  "wordIds": [
   "yubao-60756-v-0572"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「运气」。",
  "donor": "运气",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiŋ³³tɕʰi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1550",
  "wordIds": [
   "yubao-60756-v-1550"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「野猪」。",
  "donor": "野猪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑe⁵³tsu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1888",
  "wordIds": [
   "yubao-60756-v-1888"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铃子」。",
  "donor": "铃子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "leŋ³³tsɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1504",
  "wordIds": [
   "yubao-60823-v-1504"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「青稞」。",
  "donor": "青稞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰĩ⁵⁵kʰo⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1582",
  "wordIds": [
   "yubao-60756-v-1582"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鹦鹉」。",
  "donor": "鹦鹉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiŋ⁵⁵u⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1591",
  "wordIds": [
   "yubao-60823-v-1591"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麝香」。",
  "donor": "麝香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɤe¹³ɕiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2200",
  "wordIds": [
   "yubao-60756-v-2200"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「麻药」。",
  "donor": "麻药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ma³⁵ʑau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1965",
  "wordIds": [
   "yubao-60756-v-1965"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「长袖子」。",
  "donor": "长袖子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ³³ɕu³³tsɿ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1757",
  "wordIds": [
   "yubao-60756-v-1757"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「城墙」。",
  "donor": "城墙",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰeŋ³³tɕʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1967",
  "wordIds": [
   "yubao-60756-v-1967"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「短袖子」。",
  "donor": "短袖子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tuaŋ⁵⁵ɕu⁵⁵tsɿ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w430",
  "wordIds": [
   "w430"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「城」。",
  "donor": "城",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɜŋ²¹",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tsʰən²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2567",
  "wordIds": [
   "yubao-60756-v-2567"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「球」。",
  "donor": "球",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰu³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2812",
  "wordIds": [
   "yubao-60756-v-2812"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「绞」。",
  "donor": "绞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕau³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2883",
  "wordIds": [
   "yubao-60756-v-2883"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「准确」。",
  "donor": "准确",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsun⁵⁵tɕʰɚ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w895",
  "wordIds": [
   "w895"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「发觉」。",
  "donor": "发觉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fa⁵⁵tɕiau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0379",
  "wordIds": [
   "yubao-60756-v-0379"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「围巾」。",
  "donor": "围巾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ui³³tɕʰiŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0115",
  "wordIds": [
   "yubao-60823-v-0115"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「城里」。",
  "donor": "城里",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɤ̃³¹li¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1007",
  "wordIds": [
   "w1007"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「将军」。",
  "donor": "将军",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛn⁵⁵tɕiŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1855",
  "wordIds": [
   "w1855"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「情况」。",
  "donor": "情况",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiŋ²¹kʰuɛn²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1883",
  "wordIds": [
   "yubao-60756-v-1883"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「柴草」。",
  "donor": "柴草",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɛ³³tsʰau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1008",
  "wordIds": [
   "w1008"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「江山」。",
  "donor": "江山",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛn⁵⁵saŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0347",
  "wordIds": [
   "yubao-60756-v-0347"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火柴」。",
  "donor": "火柴",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ⁵⁵tsʰɛ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1014",
  "wordIds": [
   "w1014"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「觉悟」。",
  "donor": "觉悟",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiau²¹wu²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1747",
  "wordIds": [
   "yubao-60756-v-1747"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墙板」。",
  "donor": "墙板",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰaŋ³³pʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1814",
  "wordIds": [
   "w1814"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「枪杆子」。",
  "donor": "枪杆子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiɛn⁵⁵kɛn⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w793",
  "wordIds": [
   "w793"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「关键」。",
  "donor": "关键",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuɛn⁵⁵tɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-195711",
  "wordIds": [
   "stedt-rn-195711"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「军队」。",
  "donor": "军队",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕioŋ⁵⁵tui²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-226005",
  "wordIds": [
   "stedt-rn-226005"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「正确」。",
  "donor": "正确",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsan³⁵tɕʰie²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w390",
  "wordIds": [
   "w390"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「长香」。",
  "donor": "长香",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ²¹ɕiɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w790",
  "wordIds": [
   "w790"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「官」。",
  "donor": "官",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuɛn⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w441",
  "wordIds": [
   "w441"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尺」。",
  "donor": "尺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɨ²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2955",
  "wordIds": [
   "yubao-60756-v-2955"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尺」。",
  "donor": "尺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɿ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2955",
  "wordIds": [
   "yubao-60823-v-2955"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「尺」。",
  "donor": "尺",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɿ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289683",
  "wordIds": [
   "stedt-rn-289683"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「庙」。",
  "donor": "庙",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miaɨ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1310",
  "wordIds": [
   "yubao-60756-v-1310"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「硝」。",
  "donor": "硝",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2541",
  "wordIds": [
   "yubao-60756-v-2541"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「箫」。",
  "donor": "箫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕau⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2469",
  "wordIds": [
   "w2469"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乡长」。",
  "donor": "乡长",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵⁵tsaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1363",
  "wordIds": [
   "w1363"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亮火」。",
  "donor": "亮火",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liɛn²⁴fɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0573",
  "wordIds": [
   "yubao-60756-v-0573"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「保佑」。",
  "donor": "保佑",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pau⁵³ʑu³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w795",
  "wordIds": [
   "w795"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「光明」。",
  "donor": "光明",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuɛn⁵⁵miŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2074",
  "wordIds": [
   "yubao-60756-v-2074"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「凉粉」。",
  "donor": "凉粉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "liaŋ³³xun³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0744",
  "wordIds": [
   "yubao-60823-v-0744"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「划拳」。",
  "donor": "划拳",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xua³³tɕʰiã¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0097",
  "wordIds": [
   "yubao-60756-v-0097"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「半夜」。",
  "donor": "半夜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ³³ʑe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2839",
  "wordIds": [
   "yubao-60756-v-2839"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「可惜」。",
  "donor": "可惜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɔ⁵⁵ɕe³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0006",
  "wordIds": [
   "yubao-60824-v-0006"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「台风」。",
  "donor": "台风",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dai¹³fẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0477",
  "wordIds": [
   "yubao-60756-v-0477"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「右手」。",
  "donor": "右手",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑu³³səu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0120",
  "wordIds": [
   "yubao-60756-v-0120"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「右边」。",
  "donor": "右边",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑu³³piaŋ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288674",
  "wordIds": [
   "stedt-rn-288674"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「同志」。",
  "donor": "同志",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰũ²¹tsi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1998",
  "wordIds": [
   "w1998"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「商量」。",
  "donor": "商量",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "saŋ⁵⁵liɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w920",
  "wordIds": [
   "w920"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「回信」。",
  "donor": "回信",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fei²¹ɕiŋ²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-206778",
  "wordIds": [
   "stedt-rn-206778"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「国家」。",
  "donor": "国家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuai³⁵tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289837",
  "wordIds": [
   "stedt-rn-289837"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「国家」。",
  "donor": "国家",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuei¹³tɕia³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w3682",
  "wordIds": [
   "w3682"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「国家」。",
  "donor": "国家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuai²¹tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w3695",
  "wordIds": [
   "w3695"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「国家」。",
  "donor": "国家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuei²¹tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2504",
  "wordIds": [
   "yubao-60823-v-2504"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「国家」。",
  "donor": "国家",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kuai³³tɕia⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2522",
  "wordIds": [
   "yubao-60823-v-2522"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「大学」。",
  "donor": "大学",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ta¹³ɕiau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2483",
  "wordIds": [
   "w2483"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「学校」。",
  "donor": "学校",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau²¹ɕiau²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2335",
  "wordIds": [
   "yubao-60823-v-2335"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「学生」。",
  "donor": "学生",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau³³sɤ̃⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w989",
  "wordIds": [
   "w989"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「家属」。",
  "donor": "家属",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕia⁵⁵tsʰu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2482",
  "wordIds": [
   "w2482"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小学」。",
  "donor": "小学",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵⁵ɕiau²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2520",
  "wordIds": [
   "yubao-60823-v-2520"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「小学」。",
  "donor": "小学",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiau⁵⁵ɕiau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0219",
  "wordIds": [
   "yubao-60823-v-0219"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「山药」。",
  "donor": "山药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sã⁵⁵ʑiau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2930",
  "wordIds": [
   "yubao-60756-v-2930"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「左右」。",
  "donor": "左右",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsɔ⁵⁵ʑu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2129",
  "wordIds": [
   "w2129"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「思想」。",
  "donor": "思想",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɨ⁵⁵ɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0673",
  "wordIds": [
   "yubao-60756-v-0673"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「扁担」。",
  "donor": "扁担",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "piaŋ³⁵tʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0002",
  "wordIds": [
   "yubao-60823-v-0002"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「月亮」。",
  "donor": "月亮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑie³³liã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2549",
  "wordIds": [
   "yubao-60756-v-2549"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「木鱼」。",
  "donor": "木鱼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mu³³ʑɚ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2046",
  "wordIds": [
   "yubao-60756-v-2046"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「板油」。",
  "donor": "板油",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "paŋ⁵⁵ʑu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0323",
  "wordIds": [
   "yubao-60756-v-0323"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「枕头」。",
  "donor": "枕头",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tseŋ⁵⁵tʰəu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0167",
  "wordIds": [
   "yubao-60823-v-0167"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「柿子」。",
  "donor": "柿子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɿ¹³tsɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2537",
  "wordIds": [
   "w2537"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「样子」。",
  "donor": "样子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jɛn²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0894",
  "wordIds": [
   "yubao-60756-v-0894"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「欺负」。",
  "donor": "欺负",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵xu³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2195",
  "wordIds": [
   "yubao-60823-v-2195"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「毒药」。",
  "donor": "毒药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tu³³ʑiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1323",
  "wordIds": [
   "yubao-60756-v-1323"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「汽油」。",
  "donor": "汽油",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵ʑu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0398",
  "wordIds": [
   "yubao-60756-v-0398"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「油条」。",
  "donor": "油条",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑu³³tʰiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1324",
  "wordIds": [
   "yubao-60756-v-1324"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「油漆」。",
  "donor": "油漆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑu³³tɕʰi³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0187",
  "wordIds": [
   "yubao-60756-v-0187"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「油菜」。",
  "donor": "油菜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑu³³tsʰɛ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1650",
  "wordIds": [
   "yubao-60823-v-1650"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「泥鳅」。",
  "donor": "泥鳅",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "nie³³tɕʰiɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1320",
  "wordIds": [
   "yubao-60756-v-1320"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火灾」。",
  "donor": "火灾",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xɔ⁵⁵tsɛ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2407",
  "wordIds": [
   "yubao-60756-v-2407"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「点播」。",
  "donor": "点播",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tiaŋ⁵⁵pɔ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0055",
  "wordIds": [
   "yubao-60756-v-0055"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「煤油」。",
  "donor": "煤油",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me³³ʑu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2078",
  "wordIds": [
   "yubao-60756-v-2078"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「皮肤」。",
  "donor": "皮肤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰi³³xu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1723",
  "wordIds": [
   "yubao-60756-v-1723"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「磨坊」。",
  "donor": "磨坊",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɔ⁵⁵xuaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2536",
  "wordIds": [
   "w2536"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「秧子」。",
  "donor": "秧子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jɛn⁵⁵tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2515",
  "wordIds": [
   "yubao-60756-v-2515"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「粉笔」。",
  "donor": "粉笔",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xun⁵⁵pi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0216",
  "wordIds": [
   "yubao-60824-v-0216"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「红薯」。",
  "donor": "红薯",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xõ²¹su²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0297",
  "wordIds": [
   "yubao-60824-v-0297"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「胡同」。",
  "donor": "胡同",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fu¹³tõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1455",
  "wordIds": [
   "yubao-60756-v-1455"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「芦苇」。",
  "donor": "芦苇",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³³ui⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289628",
  "wordIds": [
   "stedt-rn-289628"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「英雄」。",
  "donor": "英雄",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "jĩ³³ɕiõ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0190",
  "wordIds": [
   "yubao-60756-v-0190"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蚕豆」。",
  "donor": "蚕豆",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰaŋ³³tɚ³⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2201",
  "wordIds": [
   "yubao-60823-v-2201"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「补药」。",
  "donor": "补药",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pu⁵⁵ʑiau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2823",
  "wordIds": [
   "yubao-60756-v-2823"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「认得」。",
  "donor": "认得",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "zeŋ⁵⁵tɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2030",
  "wordIds": [
   "yubao-60756-v-2030"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「豆豉」。",
  "donor": "豆豉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "təu³³sɿ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0390",
  "wordIds": [
   "yubao-60756-v-0390"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「面粉」。",
  "donor": "面粉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miaŋ³³xun³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0736",
  "wordIds": [
   "yubao-60824-v-0736"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「风筝」。",
  "donor": "风筝",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "fẽ³³tsẽ³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0416",
  "wordIds": [
   "yubao-60756-v-0416"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「香油」。",
  "donor": "香油",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ⁵⁵ʑu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0260",
  "wordIds": [
   "yubao-60823-v-0260"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「驴子」。",
  "donor": "驴子",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu³³tsɿ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-0260",
  "wordIds": [
   "yubao-60824-v-0260"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「驴子」。",
  "donor": "驴子",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lu²¹tsi²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2360",
  "wordIds": [
   "w2360"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「黄瓜」。",
  "donor": "黄瓜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wɛn²¹kua²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1649",
  "wordIds": [
   "yubao-60824-v-1649"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「黄鳝」。",
  "donor": "黄鳝",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "wã²¹se²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-453984",
  "wordIds": [
   "stedt-rn-453984"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「篾匠」。",
  "donor": "篾匠",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miɛ²⁴tɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-189642",
  "wordIds": [
   "stedt-rn-189642"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「青稞」。",
  "donor": "青稞",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰin⁵⁵kʰo⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2313",
  "wordIds": [
   "w2313"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「同志」。",
  "donor": "同志",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔŋ²¹tsɨ²⁴",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2192",
  "wordIds": [
   "yubao-60756-v-2192"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「药酒」。",
  "donor": "药酒",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑau³³tɕu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1566",
  "wordIds": [
   "yubao-60823-v-1566"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「骆驼」。",
  "donor": "骆驼",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo³¹tʰo¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w570",
  "wordIds": [
   "w570"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「鼎罐」。",
  "donor": "鼎罐",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɜŋ⁵⁵kuɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1581",
  "wordIds": [
   "yubao-60756-v-1581"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「孔雀」。",
  "donor": "孔雀",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "kʰɔŋ³⁵tɕʰɚ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0332",
  "wordIds": [
   "yubao-60823-v-0332"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「抽屉」。",
  "donor": "抽屉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰui⁵⁵tʰie⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2338",
  "wordIds": [
   "yubao-60756-v-2338"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「裁判」。",
  "donor": "裁判",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɛ³³pʰaŋ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289347",
  "wordIds": [
   "stedt-rn-289347"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亩」。",
  "donor": "亩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɨu⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2957",
  "wordIds": [
   "yubao-60756-v-2957"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亩」。",
  "donor": "亩",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "məu³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1490",
  "wordIds": [
   "w1490"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墨」。",
  "donor": "墨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɯe³⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "mɤ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-348002",
  "wordIds": [
   "stedt-rn-348002"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「煤」。",
  "donor": "煤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɯe²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0054",
  "wordIds": [
   "yubao-60823-v-0054"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「煤」。",
  "donor": "煤",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɤe³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289830",
  "wordIds": [
   "stedt-rn-289830"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「钟」。",
  "donor": "钟",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsõ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1419",
  "wordIds": [
   "w1419"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锣」。",
  "donor": "锣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "luɔ²⁴",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "lo³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2535",
  "wordIds": [
   "yubao-60823-v-2535"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锣」。",
  "donor": "锣",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "lo¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2050",
  "wordIds": [
   "w2050"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「圣旨」。",
  "donor": "圣旨",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "sɜŋ²⁴tsɨ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2015",
  "wordIds": [
   "yubao-60756-v-2015"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「坨坨肉」。",
  "donor": "坨坨肉",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰɔ³³tʰɔ³³zu⁵⁵",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1852",
  "wordIds": [
   "yubao-60823-v-1852"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「墨斗」。",
  "donor": "墨斗",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mɤe³³tɤu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2461",
  "wordIds": [
   "w2461"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「宣传」。",
  "donor": "宣传",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵⁵tsʰuɛn²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1350",
  "wordIds": [
   "yubao-60756-v-1350"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「每月」。",
  "donor": "每月",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "me⁵⁵ʑe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1505",
  "wordIds": [
   "yubao-60823-v-1505"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「燕麦」。",
  "donor": "燕麦",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ʑiã¹³mɤe⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2212",
  "wordIds": [
   "yubao-60824-v-2212"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「穴位」。",
  "donor": "穴位",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕye²¹wei¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-399335",
  "wordIds": [
   "stedt-rn-399335"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「便宜」。",
  "donor": "便宜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰian²¹ji²¹",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0698",
  "wordIds": [
   "yubao-60756-v-0698"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「便宜」。",
  "donor": "便宜",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "pʰiaŋ³³ʑi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0719",
  "wordIds": [
   "yubao-60756-v-0719"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「教室」。",
  "donor": "教室",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕau⁵⁵sɿ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-0417",
  "wordIds": [
   "yubao-60756-v-0417"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「酱油」。",
  "donor": "酱油",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕaŋ⁵⁵ʑu⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2452",
  "wordIds": [
   "w2452"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「乡」。",
  "donor": "乡",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɛn⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2957",
  "wordIds": [
   "yubao-60824-v-2957"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「亩」。",
  "donor": "亩",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "mʉ⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-290244--south",
  "wordIds": [
   "stedt-rn-290244--south"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「亿」。",
  "donor": "亿",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2574",
  "wordIds": [
   "w2574"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「亿」。",
  "donor": "亿",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ji²⁴",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "ji³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2508",
  "wordIds": [
   "yubao-60756-v-2508"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「县」。",
  "donor": "县",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕaŋ³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-181992",
  "wordIds": [
   "stedt-rn-181992"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锈」。",
  "donor": "锈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiu⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1297",
  "wordIds": [
   "yubao-60756-v-1297"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锈」。",
  "donor": "锈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕu³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1297",
  "wordIds": [
   "yubao-60823-v-1297"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「锈」。",
  "donor": "锈",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiɤu¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1297",
  "wordIds": [
   "yubao-60824-v-1297"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「锈」。",
  "donor": "锈",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ɕiʉ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1298",
  "wordIds": [
   "yubao-60824-v-1298"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「起锈」。",
  "donor": "起锈",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰi⁵⁵ɕiʉ¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289800",
  "wordIds": [
   "stedt-rn-289800"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「桥」。",
  "donor": "桥",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "dʑiaɨ³³",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "dʑiau³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1825",
  "wordIds": [
   "w1825"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桥」。",
  "donor": "桥",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiau²¹",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1282",
  "wordIds": [
   "yubao-60756-v-1282"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桥」。",
  "donor": "桥",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰau³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1282",
  "wordIds": [
   "yubao-60823-v-1282"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「桥」。",
  "donor": "桥",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕʰiau³³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1290",
  "wordIds": [
   "yubao-60824-v-1290"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「渣渣」。",
  "donor": "渣渣",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsa³³tsa³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w464",
  "wordIds": [
   "w464"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铳」。",
  "donor": "铳",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰɔŋ²⁴",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tsʰoŋ³⁵",
    "span": [
     1,
     1
    ]
   },
   {
    "ipa": "tsʰuŋ²⁴",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288806",
  "wordIds": [
   "stedt-rn-288806"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「铳」。",
  "donor": "铳",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰũ³⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-289745",
  "wordIds": [
   "stedt-rn-289745"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「铳」。",
  "donor": "铳",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰõ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1865",
  "wordIds": [
   "yubao-60824-v-1865"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「铳」。",
  "donor": "铳",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tsʰõ¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1861",
  "wordIds": [
   "yubao-60756-v-1861"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火炮」。",
  "donor": "火炮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu⁵⁵pʰɔ⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1861",
  "wordIds": [
   "yubao-60823-v-1861"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火炮」。",
  "donor": "火炮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu⁵⁵pʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1865",
  "wordIds": [
   "yubao-60823-v-1865"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「火炮」。",
  "donor": "火炮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "xu⁵⁵pʰau⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1866",
  "wordIds": [
   "yubao-60823-v-1866"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「土炮」。",
  "donor": "土炮",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tʰu⁵⁵pʰau³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1608",
  "wordIds": [
   "yubao-60756-v-1608"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「蜈蚣虫」。",
  "donor": "蜈蚣虫",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "u³³kɔŋ³³tsʰɔŋ³³",
    "span": [
     1,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-stedt-rn-288850",
  "wordIds": [
   "stedt-rn-288850"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「剪剪」。",
  "donor": "剪剪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiã⁵⁵tɕiã⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1006",
  "wordIds": [
   "w1006"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「剪剪」。",
  "donor": "剪剪",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "tɕiɛn⁵⁵tɕiɛn⁵⁵",
    "span": [
     1,
     2
    ]
   },
   {
    "ipa": "tɕian⁵⁵tɕian⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-2906",
  "wordIds": [
   "yubao-60824-v-2906"
  ],
  "kind": "借词来源",
  "text": "可能借自湘语或西南官话「孤单」。",
  "donor": "孤单",
  "donorVariety": "湘语或西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "ku³³tã³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },

 {
  "id": "chinese-loan-yubao-60756-v-1298",
  "wordIds": [
   "yubao-60756-v-1298"
  ],
  "kind": "借词来源",
  "text": "「锈」部分（第1音节）可能借自西南官话。",
  "donor": "锈",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ɕu³⁵ɕau⁵⁵",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1298",
  "wordIds": [
   "yubao-60823-v-1298"
  ],
  "kind": "借词来源",
  "text": "「锈」部分（第1音节）可能借自西南官话。",
  "donor": "锈",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ɕiɤu³³ɣo¹³",
    "span": [
     1,
     1
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1283",
  "wordIds": [
   "yubao-60756-v-1283"
  ],
  "kind": "借词来源",
  "text": "「桥」部分（第2音节）可能借自西南官话。",
  "donor": "桥",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ŋɛ³³tɕʰau⁵⁵",
    "span": [
     2,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1283",
  "wordIds": [
   "yubao-60823-v-1283"
  ],
  "kind": "借词来源",
  "text": "「桥」部分（第3音节）可能借自西南官话。",
  "donor": "桥",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "ɣa¹³pa³¹tɕʰiau⁵⁵",
    "span": [
     3,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60824-v-1283",
  "wordIds": [
   "yubao-60824-v-1283"
  ],
  "kind": "借词来源",
  "text": "「桥」部分（第2音节）可能借自湘语或西南官话。",
  "donor": "桥",
  "donorVariety": "湘语或西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "lu³³dʑiau³³",
    "span": [
     2,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-2056",
  "wordIds": [
   "yubao-60756-v-2056"
  ],
  "kind": "借词来源",
  "text": "「渣」部分（第2音节）可能借自西南官话。",
  "donor": "渣",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tie⁵³tsa³³",
    "span": [
     2,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2056",
  "wordIds": [
   "yubao-60823-v-2056"
  ],
  "kind": "借词来源",
  "text": "「渣」部分（第2音节）可能借自西南官话。",
  "donor": "渣",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tie⁵⁵tsa³³",
    "span": [
     2,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60757-v-2056",
  "wordIds": [
   "yubao-60757-v-2056"
  ],
  "kind": "借词来源",
  "text": "「渣」部分（第2音节）可能借自西南官话。",
  "donor": "渣",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tiɘ⁵⁵tsa⁵⁵",
    "span": [
     2,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w2748",
  "wordIds": [
   "w2748"
  ],
  "kind": "借词来源",
  "text": "「铳」部分（第3音节）可能借自西南官话。",
  "donor": "铳",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "tsua²¹tsɨ²¹tsʰɔŋ²⁴",
    "span": [
     3,
     3
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-w1365",
  "wordIds": [
   "w1365"
  ],
  "kind": "借词来源",
  "text": "「枪」部分（第2音节）可能借自西南官话。",
  "donor": "枪",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "liɛn²¹tɕʰiɛn⁵⁵",
    "span": [
     2,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60756-v-1418",
  "wordIds": [
   "yubao-60756-v-1418"
  ],
  "kind": "借词来源",
  "text": "「枇杷」部分（第1—2音节）可能借自西南官话。",
  "donor": "枇杷",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "pʰi³³pʰa³³ɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1418",
  "wordIds": [
   "yubao-60823-v-1418"
  ],
  "kind": "借词来源",
  "text": "「枇杷」部分（第1—2音节）可能借自西南官话。",
  "donor": "枇杷",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "pʰi³³pʰa³¹ɕi¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-1455",
  "wordIds": [
   "yubao-60823-v-1455"
  ],
  "kind": "借词来源",
  "text": "「芦苇」部分（第1—2音节）可能借自西南官话。",
  "donor": "芦苇",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "lu³³ui³³ɕi⁵⁵",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60757-v-2823",
  "wordIds": [
   "yubao-60757-v-2823"
  ],
  "kind": "借词来源",
  "text": "「认得」部分（第1—2音节）可能借自西南官话。",
  "donor": "认得",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "zən²⁴tə⁵⁵ɕi³³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-2839",
  "wordIds": [
   "yubao-60823-v-2839"
  ],
  "kind": "借词来源",
  "text": "「可惜」部分（第1—2音节）可能借自西南官话。",
  "donor": "可惜",
  "donorVariety": "西南官话",
  "scope": "component",
  "reviewedForms": [
   {
    "ipa": "kʰo⁵⁵ɕie³¹nie¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 },
 {
  "id": "chinese-loan-yubao-60823-v-0186",
  "wordIds": [
   "yubao-60823-v-0186"
  ],
  "kind": "借词来源",
  "text": "可能借自西南官话「棉花」。",
  "donor": "棉花",
  "donorVariety": "西南官话",
  "scope": "whole",
  "reviewedForms": [
   {
    "ipa": "miãxua¹³",
    "span": [
     1,
     2
    ]
   }
  ],
  "reviewBatch": "coverage-pass-2026-10-23"
 }
]);

// Index source IDs once; list filtering visits every merged entry.
const editorialNotesByWordId=new Map();
for(const note of EDITORIAL_NOTES)for(const id of note.wordIds||[]){
 if(!editorialNotesByWordId.has(id))editorialNotesByWordId.set(id,[]);
 editorialNotesByWordId.get(id).push(note);
}
function editorialNotesFor(w){
 const ids=new Set([w.id,...(w.mergedWordIds||[]),...(w.attestations||[]).map(a=>a.id)]);
 return [...(w.editorialNotes||[]),...[...ids].flatMap(id=>editorialNotesByWordId.get(id)||[])].filter((n,i,a)=>a.findIndex(x=>x.id===n.id)===i);
}
const modernChineseLoanCache=new WeakMap();
function loanIPAForms(value){
 // Keep tone and nasalization distinctions. Only separators and spaces are removed.
 return normalizeIPA(value).split(/[~～/／;；]/u).map(s=>s.replace(/[\s|｜◦]/gu,'').normalize('NFC')).filter(Boolean);
}
function modernChineseLoanInfo(w){
 if(w._loan)return w._loan;
 if(modernChineseLoanCache.has(w))return modernChineseLoanCache.get(w);
 const notes=editorialNotesFor(w).filter(n=>n.id?.startsWith('chinese-loan-'));
 let scope='';
 if(notes.length){
  const forms=[...new Set(wordIPA(w).flatMap(loanIPAForms))];
  const whole=new Set(notes.filter(n=>n.scope==='whole').flatMap(n=>(n.reviewedForms||[]).flatMap(f=>loanIPAForms(f.ipa))));
  const component=new Set(notes.filter(n=>n.scope==='component').flatMap(n=>(n.reviewedForms||[]).flatMap(f=>loanIPAForms(f.ipa))));
  // A merged entry is hideable only when every recorded variant is fully covered.
  scope=forms.length&&forms.every(f=>whole.has(f))?'whole':
   !forms.some(f=>whole.has(f))&&forms.some(f=>component.has(f))?'component':'mixed';
 }
 const info={scope};modernChineseLoanCache.set(w,info);return info;
}
const MODERN_LOAN_LABELS={whole:'新借',component:'半借',mixed:'含新借词形'};
const MODERN_LOAN_DESCRIPTIONS={whole:'可能整词借自汉语',component:'部分音节可能借自汉语',mixed:'部分词形可能借自汉语'};
function modernChineseLoanBadge(w){
 const {scope}=modernChineseLoanInfo(w);if(!scope)return '';
 return `<span class="loan-badge" data-loan-scope="${scope}">${MODERN_LOAN_LABELS[scope]}</span>`;
}
function modernChineseLoanAccessibleSuffix(w){
 const {scope}=modernChineseLoanInfo(w);return scope?'，'+MODERN_LOAN_DESCRIPTIONS[scope]:'';
}
function editorialNotesHTML(w){
 const notes=editorialNotesFor(w);if(!notes.length)return '';
 return `<section class="editorial-notes"><h3>编者注</h3>${notes.map(n=>`<p>${n.kind?`<strong>${E(n.kind)}</strong>　`:''}${E(n.text)}</p>${n.literalMeaning?`<p>字面义：${E(n.literalMeaning)}</p>`:''}${n.originalMeaning?`<p>来源释义：${E(n.originalMeaning)}</p>`:''}`).join('')}</section>`;
}
