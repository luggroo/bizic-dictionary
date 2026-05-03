/**
 * Populate cognate_groups and entry_cognate_groups from Wiktionary Proto-Tujia data.
 *
 * Source: https://en.wiktionary.org/wiki/Appendix:Proto-Tujia_reconstructions
 * (Zhou 2020, Proto-Bizic thesis)
 *
 * Matching strategy:
 *   1. English gloss exact/ILIKE match
 *   2. Pronunciation-aware fuzzy match using normalized forms and edit distance
 */

import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const COGNATE_GROUPS = [
  [1, "look", "看", "*bɑ¹ᴸ"],
  [2, "to burn", "燃燒", "*dɑ¹ᴹ"],
  [3, "to pound", "舂", "*dɑ⁴"],
  [4, "to drip", "撒、滴", "*dɑ¹ᴴ"],
  [5, "to wear", "穿", "*dɑ⁴"],
  [6, "to grip", "握", "*ǳɑ¹ᴹ"],
  [7, "to step on", "踩", "*ʥɑ⁴"],
  [8, "to bite", "咬、吃", "*gɑ³"],
  [9, "crow", "烏鴉", "*gɑ²"],
  [10, "to marry", "娶、取", "*ɣɑ²"],
  [11, "to write", "寫", "*ɣɑ³"],
  [12, "to go pass", "過", "*ɣɑ³"],
  [13, "to feed", "餵", "*ɣɑ¹ᴸ"],
  [14, "firewood", "柴", "*kʰɑ²"],
  [15, "to lick", "舔", "*lɑ⁴"],
  [16, "to sew", "縫", "*lɑ²"],
  [17, "road", "路", "*lɑ¹ᴹ"],
  [18, "son-in-law", "女婿", "*mɑ⁴"],
  [19, "I", "我", "*ŋɑ¹ᴹ"],
  [20, "to cut with knife", "割", "*ŋɑ¹ᴸ"],
  [21, "small", "小", "*sɑ¹ᴹ"],
  [22, "to split", "劈", "*sɑ¹ᴴ"],
  [23, "silkworm", "蠶", "*sɑ¹ᴹ"],
  [24, "to float", "浮", "*tʰɑ²"],
  [25, "good", "好", "*ʦʰɑ⁴"],
  [26, "to wash", "洗", "*zɑ²"],
  [27, "negative imperative", "禁止", "*tæ¹ᴴ"],
  [28, "to pull", "拔", "*ʦʰæ²"],
  [29, "to rise", "漲", "*dɑC²"],
  [30, "to chop", "剁", "*dɑC¹ᴸ"],
  [31, "to beg", "乞討", "*gɑC⁴"],
  [32, "pronoun third singular", "他", "*kɑC¹ᴹ"],
  [33, "to break", "斷", "*kʰɑC²"],
  [34, "to boil", "煮", "*lɑC³"],
  [35, "person", "人", "*ȵɑC¹ᴹ"],
  [36, "silver", "銀子", "*ŋɑC¹ᴹ"],
  [37, "to wash", "淘洗", "*ŋɑC¹ᴴ"],
  [38, "to release", "放", "*pʰɑC¹ᴴ"],
  [39, "earth", "地", "*ɹɑC¹ᴴ"],
  [40, "sheep", "羊", "*ɹɑC⁴"],
  [41, "house", "房子", "*ʦʰɑC¹ᴹ"],
  [42, "to carry on the back", "背", "*ʔɑC¹ᴹ"],
  [43, "bovine", "牛", "*ʔɑw⁴"],
  [44, "iron", "鐵", "*ɕe¹ᴹ"],
  [45, "to swing", "甩", "*ɕe²"],
  [46, "hand", "手", "*ʥe³"],
  [47, "to compel", "逼", "*pe?"],
  [48, "to scrape", "刮", "*pʰe¹ᴴ"],
  [49, "mouse", "鼠", "*ɹe²"],
  [50, "wine", "酒", "*ɹe⁴"],
  [51, "to swallow", "吞", "*ɹe⁴"],
  [52, "medicine", "藥", "*se²"],
  [53, "to die", "死", "*se⁴"],
  [54, "water", "水", "*ʦʰe²"],
  [55, "to arrive", "到", "*ʔe?"],
  [56, "Hmong", "苗族", "*be?"],
  [57, "sleep", "睡", "*ȵe⁴"],
  [58, "to laugh", "笑", "*ȵe¹ᴹ"],
  [59, "ripe", "熟", "*beC¹ᴹ"],
  [60, "to blow", "吹", "*meC³"],
  [61, "to steal", "偷", "*ɣɤ³"],
  [62, "to steal", "偷", "*xɤ?"],
  [63, "to carry", "搬", "*bɤ¹ᴹ"],
  [64, "to think", "想", "*dɤ³"],
  [65, "slow", "慢", "*dɤ¹ᴴ"],
  [66, "to break", "破、斷", "*dɤ²"],
  [67, "drunk", "醉", "*ʥɤ²"],
  [68, "to fear", "怕", "*gɤ¹ᴹ"],
  [69, "long", "長", "*ɣɤ²"],
  [70, "to give", "給、送", "*lɤ³"],
  [71, "to lay egg", "下蛋", "*lɤ¹ᴴ"],
  [72, "sky", "天", "*mɤ⁴"],
  [73, "to lie down", "趴著", "*pʰɤ²"],
  [74, "to wrap", "包", "*pʰɤ¹ᴴ"],
  [75, "to lower head", "低頭、躺", "*pʰɤ²"],
  [76, "grandson", "孫子", "*ɹɤ¹ᴹ"],
  [77, "feces", "屎", "*sɤ²"],
  [78, "to plant", "插、栽", "*sɤ¹ᴴ"],
  [79, "female genital", "女陰", "*tʰɤ²"],
  [80, "to pick flower", "摘", "*tʰɤ³"],
  [81, "rain", "雨", "*ʦɤ²"],
  [82, "to be willing", "肯", "*ʦʰɤ³"],
  [83, "to rain", "下雨", "*zɤ²"],
  [84, "soft", "柔軟", "*bɤC¹ᴴ"],
  [85, "similar", "像", "*ǳɤC²"],
  [86, "diluted", "稀", "*bi¹ᴴ"],
  [87, "flat", "平", "*bi¹ᴹ"],
  [88, "sharp", "鋒利", "*ɕi¹ᴸ"],
  [89, "to need", "需要、欠", "*di¹ᴸ"],
  [90, "sickness", "病", "*di⁴"],
  [91, "to become", "變成", "*ǳi?"],
  [92, "to walk", "走", "*ɣi⁴"],
  [93, "to sweep", "掃", "*ɣi²"],
  [94, "to cut with saw", "鋸", "*kʰi?"],
  [95, "hard", "堅硬", "*kʰi¹ᴸ"],
  [96, "fire", "火", "*mi¹ᴴ"],
  [97, "to spread out", "鋪開", "*mi²"],
  [98, "you", "你", "*ȵi¹ᴹ"],
  [99, "to lend", "借出", "*ŋi¹ᴴ"],
  [100, "five", "五", "*ŋi¹ᴹ"],
  [101, "to puke", "嘔吐", "*pʰi³"],
  [102, "to get", "得到", "*ti?"],
  [103, "scale", "秤", "*ʨʰi¹ᴹ"],
  [104, "jin", "斤", "*ʨʰi¹ᴹ"],
  [105, "paint", "漆", "*ʨʰi⁴"],
  [106, "to wait", "等待", "*tʰi¹ᴹ"],
  [107, "to rest", "休息", "*xi¹ᴹ"],
  [108, "to see", "看見", "*ʔi²"],
  [109, "have", "有", "*ʔi?"],
  [110, "to cry", "哭", "*ǳiC⁴"],
  [111, "tiger", "老虎", "*lie⁴"],
  [112, "to light up", "點燃", "*tʰie⁴"],
  [113, "to answer", "答應", "*tʰie³"],
  [114, "to grow fruit", "結果子", "*ǳɿ²"],
  [115, "pig", "豬", "*ǳɿ¹ᴸ"],
  [116, "rice", "飯", "*ǳɿ²"],
  [117, "to snow", "下雪", "*ǳɿ³"],
  [118, "net", "網", "*ɹɿ¹ᴴ"],
  [119, "to do", "做", "*ɹɿ¹ᴸ"],
  [120, "many", "多", "*ɹɿ²"],
  [121, "meat", "肉", "*sɿ²"],
  [122, "fat", "肥", "*sɿ⁴"],
  [123, "to send away", "送走", "*sɿ⁴"],
  [124, "to grow", "生長", "*sɿ²"],
  [125, "boat", "船", "*bu¹ᴸ"],
  [126, "to pound", "舂", "*bu³"],
  [127, "to stand", "站", "*ʥu¹ᴹ"],
  [128, "to crawl", "爬、上", "*gu²"],
  [129, "sell", "賣", "*lu²"],
  [130, "to lend out", "借出", "*lu⁴"],
  [131, "buy", "買", "*pʰu¹ᴴ"],
  [132, "daughter-in-law", "兒媳", "*pʰu⁴"],
  [133, "dragon", "龍", "*pʰu⁴"],
  [134, "light-weighted", "輕", "*ɹu¹ᴸ"],
  [135, "to crow", "啼", "*ɹu⁴"],
  [136, "to water plant", "澆", "*tu⁴"],
  [137, "to contain", "裝", "*ʨu¹ᴸ"],
  [138, "to pick up", "撿", "*tʰu¹ᴴ"],
  [139, "straight", "直", "*ʦʰu²"],
  [140, "swollen", "腫", "*xu²"],
  [141, "drill", "鑽子", "*ʔu¹ᴴ"],
  [142, "to measure", "量", "*ʔu¹ᴹ"],
  [143, "rice steamer", "甑子", "*buŋ¹ᴹ"],
  [144, "short", "短", "*ǳuŋ¹ᴸ"],
  [145, "rotten", "腐爛", "*luŋ¹ᴴ"],
  [146, "to feed", "飼養", "*nuŋ¹ᴹ"],
  [147, "year", "年", "*ȵuŋ²"],
  [148, "to cough", "咳嗽", "*ȵuŋ¹ᴴ"],
  [149, "to steam", "蒸", "*tuŋ¹ᴹ"],
  [150, "to open", "打開", "*tʰuŋ⁴"],
  [151, "to sit", "坐", "*ʔuŋ²"],
  [152, "to grow up", "長大", "*ʔuŋ⁴"],
  [153, "to fry", "油炸", "*bɯ¹ᴹ"],
  [154, "to soak", "浸泡", "*bɯ¹ᴸ"],
  [155, "heavy", "重", "*dɯ¹ᴸ"],
  [156, "to exit", "出", "*ǳɯ³"],
  [157, "zodiac", "屬豬", "*ǳɯ⁴"],
  [158, "drink", "喝", "*xɯ²"],
  [159, "to burn", "燒", "*ʔɯ³"],
  [1001, "male genital", "男生殖器", "*ɹiC²"],
  [1002, "what", "什麼", "*ʦʰV¹ᴴ"],
  [1003, "head", "頭", "*bɑ¹ᴴ"],
  [1004, "male", "公", "*bɑ¹ᴹ"],
  [1005, "dry", "乾", "*gɑ²"],
  [1006, "thick", "厚", "*lɑ¹ᴹ"],
  [1007, "mosquito", "蚊子", "*mɑ¹ᴹ"],
  [1008, "cloth", "布", "*nɑ¹ᴹ"],
  [1009, "black", "黑", "*nɑ⁴"],
  [1010, "fan", "扇子", "*nɑ?"],
  [1011, "to expose under sun", "曬", "*nɑ²"],
  [1012, "bad", "壞", "*ȵɑ⁴"],
  [1013, "song", "歌", "*pʰɑ¹ᴴ"],
  [1014, "old lady", "老太太", "*pʰɑ⁴"],
  [1015, "Chinese", "漢", "*pʰɑ¹ᴴ"],
  [1016, "hair", "頭髮", "*sɑ⁴"],
  [1017, "cedar tree", "杉樹", "*sɑ⁴"],
  [1018, "to weave", "織", "*tɑ¹ᴹ"],
  [1019, "sour", "酸", "*ʔɑ²"],
  [1020, "sun", "太陽", "*nɑw²"],
  [1021, "one", "一", "*næ⁴"],
  [1022, "night", "夜晚", "*næ?"],
  [1023, "right side", "右", "*tæ⁴"],
  [1024, "sparrow", "喜鵲", "*ʦʰæ²"],
  [1025, "round", "圓", "*bɑC¹ᴴ"],
  [1026, "eye", "眼睛", "*lɑC³"],
  [1027, "cat", "貓", "*mɑC²"],
  [1028, "three", "三", "*sɑC¹ᴹ"],
  [1029, "dew", "露水", "*sɑC¹ᴴ"],
  [1030, "at first", "先", "*be²"],
  [1031, "comb", "梳子", "*ɕe?"],
  [1032, "shoe", "鞋", "*ɕe³"],
  [1033, "direction", "方向", "*kʰe?"],
  [1034, "four", "四", "*ɹe¹ᴹ"],
  [1035, "wind", "風", "*ɹe⁴"],
  [1036, "y'all", "你們", "*se⁴"],
  [1037, "drum", "鼓", "*xe²"],
  [1038, "to ask", "問、告訴", "*ze?"],
  [1039, "blood", "血", "*me¹ᴸ"],
  [1040, "sound", "聲音", "*ɹe¹ᴴ"],
  [1041, "day", "一天", "*ȵe¹ᴹ"],
  [1042, "urine", "尿", "*ʦʰe¹ᴹ"],
  [1043, "some", "些", "*dɤ¹ᴸ"],
  [1044, "to be able to", "會", "*gɤ¹ᴸ"],
  [1045, "leaf", "葉子", "*ɣɤ¹ᴸ"],
  [1046, "monkey", "猴", "*ɣɤ²"],
  [1047, "smoke", "煙", "*kʰɤ¹ᴴ"],
  [1048, "horn", "角", "*kʰɤ¹ᴹ"],
  [1049, "belly", "肚子", "*mɤ?"],
  [1050, "two", "二", null],
  [1051, "seed", "種子", null],
  [1052, "boiling water", "開水", "*pʰɤ¹ᴹ"],
  [1053, "night", "夜", "*pʰɤ⁴"],
  [1054, "bowl", "碗", "*ʨʰɤ²"],
  [1055, "mouth", "嘴", "*zɤ⁴"],
  [1056, "bran", "糠", "*bi¹ᴸ"],
  [1057, "son", "兒子", "*bi⁴"],
  [1058, "help", "幫", "*ɕi¹ᴸ"],
  [1059, "green", "青", "*ɕi⁴"],
  [1060, "to hear", "聽見", "*ɕi¹ᴴ"],
  [1061, "tael", "兩", "*ǳi¹ᴹ"],
  [1062, "to fly", "飛", "*ʥi¹ᴹ"],
  [1063, "feet", "腳", "*ʥi²"],
  [1064, "skin", "皮", "*ki¹ᴸ"],
  [1065, "bitter", "苦", "*kʰi³"],
  [1066, "to hang", "掛", "*kʰi?"],
  [1067, "heart", "心", "*li¹ᴸ"],
  [1068, "two days later", "後天", "*mi³"],
  [1069, "all", "全部", "*ni¹ᴴ"],
  [1070, "female", "雌性", "*ȵi²"],
  [1071, "classifier for clothes", "件", "*pi²"],
  [1072, "divide", "分", "*pʰi²"],
  [1073, "salt", "鹽", "*si¹ᴴ"],
  [1074, "saliva", "涎水", "*si?"],
  [1075, "sheng unit", "升", "*si?"],
  [1076, "clothes", "衣服", "*ti?"],
  [1077, "bottom", "底下", "*ti²"],
  [1078, "nose", "鼻子", "*ʨi¹ᴴ"],
  [1079, "soy bean", "豆", "*ʨʰi²"],
  [1080, "pheasant", "野雞", "*ʨʰi¹ᴴ"],
  [1081, "sore", "毒包、瘡", "*ʦʰi⁴"],
  [1082, "written word", "字", "*ʦʰi¹ᴹ"],
  [1083, "ten", "十", "*xi⁴"],
  [1084, "village", "村莊", "*ʔi¹ᴴ"],
];

function glossTerms(gloss) {
  return gloss
    .toLowerCase()
    .split(/[,/、，()（）]+/)
    .map((s) => s.trim().replace(/^to /, "").trim())
    .filter((s) => s.length > 1);
}

function normalizePronunciation(value) {
  return (value ?? "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[*()\[\]{}?.,;:!~'\"`]/g, "")
    .replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, "")
    .replace(/[ᴹᴸᴴ]/g, "")
    .replace(/-/g, "");
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

function pronunciationMatches(protoForm, candidateForms) {
  const proto = normalizePronunciation(protoForm);
  if (!proto) return false;
  const protoCore = proto.replace(/^[*]/, "");
  return candidateForms.some((candidate) => {
    const normalized = normalizePronunciation(candidate);
    if (!normalized) return false;
    const dist = levenshtein(protoCore, normalized);
    const maxLen = Math.max(protoCore.length, normalized.length);
    const ratio = maxLen === 0 ? 0 : dist / maxLen;
    return dist <= 2 || ratio <= 0.34;
  });
}

async function run() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    console.log("Inserting cognate groups…");
    for (const [no, glossEn, glossZh, protoForm] of COGNATE_GROUPS) {
      await client.query(
        `INSERT INTO cognate_groups (wiktionary_no, gloss_en, gloss_zh, proto_form)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (wiktionary_no) DO UPDATE
           SET gloss_en = EXCLUDED.gloss_en,
               gloss_zh = EXCLUDED.gloss_zh,
               proto_form = EXCLUDED.proto_form`,
        [no, glossEn, glossZh, protoForm ?? null],
      );
    }

    const { rows: groups } = await client.query(
      `SELECT id, wiktionary_no, gloss_en, proto_form FROM cognate_groups ORDER BY id`,
    );

    const { rows: candidateRows } = await client.query(
      `SELECT e.id, e.tujia_word, e.variety, e.dialect, e.ipa, e.tujia_toned, e.tujia_spelling, array_agg(DISTINCT t.text) FILTER (WHERE l.code = 'en') AS en_texts
       FROM entries e
       LEFT JOIN translations t ON t.entry_id = e.id
       LEFT JOIN languages l ON l.code = t.language_code
       GROUP BY e.id`,
    );

    let linked = 0;
    for (const group of groups) {
      const terms = glossTerms(group.gloss_en);
      const exactMatches = new Set();

      for (const row of candidateRows) {
        const enTexts = Array.isArray(row.en_texts) ? row.en_texts : [];
        const englishHit = terms.some((term) =>
          enTexts.some((text) => (text ?? "").toLowerCase() === term || (text ?? "").toLowerCase().includes(term)),
        );
        if (!englishHit) continue;
        exactMatches.add(row.id);
      }

      const pronunciationMatchesSet = new Set();
      if (group.proto_form) {
        for (const row of candidateRows) {
          const wordForms = [row.tujia_word, row.ipa, row.tujia_toned, row.tujia_spelling].filter(Boolean);
          if (pronunciationMatches(group.proto_form, wordForms)) pronunciationMatchesSet.add(row.id);
        }
      }

      const finalIds = new Set([...exactMatches, ...pronunciationMatchesSet]);
      for (const entryId of finalIds) {
        await client.query(
          `INSERT INTO entry_cognate_groups (entry_id, cognate_group_id)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [entryId, group.id],
        );
        linked++;
      }
    }

    await client.query("COMMIT");
    console.log(`Done. Linked ${linked} entry↔group pairs.`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
