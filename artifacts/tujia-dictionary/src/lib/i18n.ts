/**
 * UI language strings for the Tujia Dictionary interface.
 *
 * Two UI languages:
 *   en — English
 *   zh — Chinese (Simplified, 简体中文)
 */

export type UILang = "en" | "zh";

export interface Strings {
  siteName: string;
  tagline: string;
  taglineHighlight: string;
  heroSubtitle: string;
  search: string;
  searchPlaceholder: string;
  browse: string;
  about: string;
  totalEntries: string;
  translations: string;
  languages: string;
  categories: string;
  northernTujia: string;
  southernTujia: string;
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
  formsHeading: string;
  formSpelling: string;
  formToned: string;
  formIpa: string;
  formSwMandarin: string;
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
  browseTitle: string;
  browseSubtitle: string;
  aboutTitle: string;
  northern: string;
  southern: string;
  dialect: string;
  variety: string;
  footerTagline: string;
  footerDesc: string;
  recentlyPreserved: string;
  viewAllEntries: string;
  aboutEntry: string;
  noRelated: string;
  notation: string;
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
    notation: "Notation",
  },
  zh: {
    siteName: "土家语词典",
    tagline: "把土家语",
    taglineHighlight: "留住。",
    heroSubtitle: "整理土家族词汇，记录它们在口耳之间的样子。",
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
    footerTagline: "留住土家语的声音",
    footerDesc: "一个记录、整理与传递土家语言文化的数字词典。",
    recentlyPreserved: "最新收录",
    viewAllEntries: "查看全部词条 →",
    aboutEntry: "关于此词条",
    noRelated: "未找到相关词汇。",
    notation: "标注方式",
  },
};

export default strings;
