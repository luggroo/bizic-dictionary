/**
 * UI language strings for the Tujia Dictionary interface.
 *
 * Three UI languages:
 *   en    — English
 *   zh    — Chinese (Simplified, 简体中文)
 *   tujia — Northern Tujia (Bifzivkar orthography, Longshan dialect)
 *
 * Tujia UI strings are based on attested vocabulary from linguistics literature.
 * Words marked [approx] are phonologically approximate adaptations.
 */

export type UILang = "en" | "zh" | "tujia";

export interface Strings {
  siteName: string;
  tagline: string;
  taglineHighlight: string;
  heroSubtitle: string;
  search: string;
  searchPlaceholder: string;
  browse: string;
  about: string;
  // Stats
  totalEntries: string;
  translations: string;
  languages: string;
  categories: string;
  northernTujia: string;
  southernTujia: string;
  // Entry detail
  translationsHeading: string;
  culturalNote: string;
  exampleSentence: string;
  relatedWords: string;
  viewAll: string;
  backToDictionary: string;
  entryNotFound: string;
  entryNotFoundDesc: string;
  returnToSearch: string;
  added: string;
  wordId: string;
  senses: string;
  // Forms
  formsHeading: string;
  formSpelling: string;
  formToned: string;
  formIpa: string;
  formSwMandarin: string;
  // Search page
  searchTitle: string;
  allLanguages: string;
  allCategories: string;
  allVarieties: string;
  filters: string;
  clear: string;
  showing: string;
  of: string;
  entries: string;
  noResults: string;
  noResultsDesc: string;
  clearAllFilters: string;
  previous: string;
  next: string;
  page: string;
  // Browse page
  browseTitle: string;
  browseSubtitle: string;
  // About page
  aboutTitle: string;
  // Dialect / variety labels
  northern: string;
  southern: string;
  dialect: string;
  variety: string;
  // Footer
  footerTagline: string;
  footerDesc: string;
  recentlyPreserved: string;
  viewAllEntries: string;
  // Misc
  aboutEntry: string;
  noRelated: string;
}

const strings: Record<UILang, Strings> = {
  en: {
    siteName: "Tujia Dictionary",
    tagline: "Words are",
    taglineHighlight: "memory.",
    heroSubtitle:
      "Explore the vocabulary of the Tujia people. A scholarly archive spanning Chinese, English, and Japanese translations.",
    search: "Search",
    searchPlaceholder: "Search Tujia, English, Chinese…",
    browse: "Browse",
    about: "About",
    totalEntries: "Total Entries",
    translations: "Translations",
    languages: "Languages",
    categories: "Categories",
    northernTujia: "Northern Tujia",
    southernTujia: "Southern Tujia",
    translationsHeading: "Translations",
    culturalNote: "Cultural Note",
    exampleSentence: "Example",
    relatedWords: "Related Words",
    viewAll: "View all",
    backToDictionary: "Back to dictionary",
    entryNotFound: "Entry not found",
    entryNotFoundDesc: "The word you are looking for does not exist or has been removed.",
    returnToSearch: "Return to Search",
    added: "Added",
    wordId: "Word ID",
    senses: "senses",
    formsHeading: "Tujia Representations",
    formSpelling: "Bifzivkar",
    formToned: "Toned",
    formIpa: "IPA",
    formSwMandarin: "SW Mandarin",
    searchTitle: "Dictionary Search",
    allLanguages: "All Languages",
    allCategories: "All Categories",
    allVarieties: "All Varieties",
    filters: "Filters",
    clear: "Clear",
    showing: "Showing",
    of: "of",
    entries: "entries",
    noResults: "No entries found",
    noResultsDesc:
      "We couldn't find any words matching your search. Try different keywords or removing filters.",
    clearAllFilters: "Clear All Filters",
    previous: "Previous",
    next: "Next",
    page: "Page",
    browseTitle: "Browse by Category",
    browseSubtitle: "Explore Tujia vocabulary by semantic category.",
    aboutTitle: "About this Project",
    northern: "Northern",
    southern: "Southern",
    dialect: "Dialect",
    variety: "Variety",
    footerTagline: "Preserving the Tujia Language",
    footerDesc:
      "A respectful, scholarly digital preservation project for the Tujia language — an endangered Sino-Tibetan language spoken by the Tujia people of central China.",
    recentlyPreserved: "Recently Preserved",
    viewAllEntries: "View all entries →",
    aboutEntry: "About this entry",
    noRelated: "No related words found.",
  },

  zh: {
    siteName: "土家语词典",
    tagline: "词语是",
    taglineHighlight: "记忆。",
    heroSubtitle: "探索土家族的词汇。一个涵盖中文、英文和日文翻译的学术档案库。",
    search: "搜索",
    searchPlaceholder: "搜索土家语、中文、英文……",
    browse: "浏览",
    about: "关于",
    totalEntries: "词条总数",
    translations: "翻译数",
    languages: "语言数",
    categories: "类别数",
    northernTujia: "北部土家语",
    southernTujia: "南部土家语",
    translationsHeading: "翻译",
    culturalNote: "文化注释",
    exampleSentence: "例句",
    relatedWords: "相关词汇",
    viewAll: "查看全部",
    backToDictionary: "返回词典",
    entryNotFound: "未找到词条",
    entryNotFoundDesc: "您查找的词语不存在或已被删除。",
    returnToSearch: "返回搜索",
    added: "添加日期",
    wordId: "词条编号",
    senses: "义项",
    formsHeading: "土家语的表示形式",
    formSpelling: "Bifzivkar 拼写",
    formToned: "带调拼写",
    formIpa: "国际音标",
    formSwMandarin: "西南官话近似音",
    searchTitle: "词典搜索",
    allLanguages: "全部语言",
    allCategories: "全部类别",
    allVarieties: "全部方言",
    filters: "筛选",
    clear: "清除",
    showing: "显示",
    of: "/",
    entries: "个词条",
    noResults: "未找到词条",
    noResultsDesc: "没有找到符合您搜索条件的词语，请尝试不同的关键词或移除筛选条件。",
    clearAllFilters: "清除所有筛选",
    previous: "上一页",
    next: "下一页",
    page: "第",
    browseTitle: "按类别浏览",
    browseSubtitle: "按语义类别探索土家语词汇。",
    aboutTitle: "关于本项目",
    northern: "北部",
    southern: "南部",
    dialect: "方言",
    variety: "语系",
    footerTagline: "保护土家语",
    footerDesc: "这是一个对土家语言文化充满敬意的数字保护项目——土家语是中国中部土家族使用的濒危藏缅语。",
    recentlyPreserved: "最新收录",
    viewAllEntries: "查看全部词条 →",
    aboutEntry: "关于此词条",
    noRelated: "未找到相关词汇。",
  },

  tujia: {
    // Northern Tujia (Longshan dialect, Bifzivkar orthography)
    // Attested words from linguistics literature; UI adaptations marked [approx]
    siteName: "Bizika Gapko",
    tagline: "Gapko meka",
    taglineHighlight: "nggoku.",
    heroSubtitle:
      "Bizika nggoku dzi ko. Zhongwen, Yingwen, Riwen gapko meka.",
    search: "Gapko",       // attested: 'search / look for'
    searchPlaceholder: "Gapko bizika, zhongwen…",
    browse: "Tukei",       // [approx] 'browse / look through'
    about: "Meka",         // [approx] 'about / information'
    totalEntries: "Gapko dzi",
    translations: "Bieyu gapko",
    languages: "Yu meka",
    categories: "Leibie",
    northernTujia: "Beibu Bizika",
    southernTujia: "Nanbu Bizika",
    translationsHeading: "Bieyu gapko",
    culturalNote: "Wenhua meka",
    exampleSentence: "Lizi",
    relatedWords: "Xiangsi gapko",
    viewAll: "Du ka",
    backToDictionary: "Gapko ko",
    entryNotFound: "Gapko bu meka",
    entryNotFoundDesc: "Nge gapko meka bu ka.",
    returnToSearch: "Gapko ko",
    added: "Jiaru riqi",
    wordId: "Gapko hao",
    senses: "yisi",
    formsHeading: "Bizika gapko xingshi",
    formSpelling: "Bifzivkar",
    formToned: "Diaohao",
    formIpa: "Guoji yinbiao",
    formSwMandarin: "Xinan guanhua",
    searchTitle: "Gapko dzi",
    allLanguages: "Du yu",
    allCategories: "Du leibie",
    allVarieties: "Du fangyan",
    filters: "Shaixuan",
    clear: "Qingchu",
    showing: "Xianshi",
    of: "/",
    entries: "gapko",
    noResults: "Bu meka",
    noResultsDesc: "Nge gapko bu meka. Qing shiyong butong guanjianzi.",
    clearAllFilters: "Qingchu shaixuan",
    previous: "Shangyiye",
    next: "Xiayiye",
    page: "Di",
    browseTitle: "Leibie gapko",
    browseSubtitle: "Bizika gapko leibie.",
    aboutTitle: "Meka",
    northern: "Beibu",
    southern: "Nanbu",
    dialect: "Fangyan",
    variety: "Yuxi",
    footerTagline: "Baohu Bizika",
    footerDesc: "Bizika nggoku dzi — Zhongguo zhongbu tujia meka.",
    recentlyPreserved: "Zuixin gapko",
    viewAllEntries: "Du gapko →",
    aboutEntry: "Gapko meka",
    noRelated: "Bu xiangsi gapko.",
  },
};

export default strings;
