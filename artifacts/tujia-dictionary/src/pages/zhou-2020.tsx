import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { useI18n } from "@/lib/i18n-context";
import { ExternalLink, BookOpen, Map, FileText, AlertCircle, Search, X } from "lucide-react";

type LinkedEntry = {
  entryId: number;
  tujiaWord: string;
  variety: string;
  dialect: string;
  source: string;
};

type ZhouRow = {
  groupId: number;
  wiktionaryNo: number | null;
  wiktionaryNoStr: string | null;
  protoForm: string | null;
  glossEn: string;
  glossZh: string | null;
  reflexes: {
    tasha?: string | null;
    laxidong?: string | null;
    xianren?: string | null;
    xiaolongre?: string | null;
    cebu?: string | null;
    caji_adi?: string | null;
  };
  linkedEntries: LinkedEntry[];
};

async function fetchZhou2020(): Promise<{ rows: ZhouRow[] }> {
  const res = await fetch(`${import.meta.env.BASE_URL}api/zhou-2020`);
  if (!res.ok) throw new Error("Failed to load Zhou (2020)");
  return res.json();
}

const NORTHERN_DIALECTS = [
  { key: "tasha", label: "Tasha", labelZh: "他砂" },
  { key: "laxidong", label: "Laxidong", labelZh: "拉西峒" },
  { key: "xianren", label: "Xianren", labelZh: "仙仁" },
  { key: "xiaolongre", label: "Xiaolongre", labelZh: "小龙热" },
] as const;

const SOUTHERN_DIALECTS = [
  { key: "cebu", label: "Cebu", labelZh: "下都" },
  { key: "caji_adi", label: "Caji-adi", labelZh: "下且己" },
] as const;

const ALL_DIALECTS = [...NORTHERN_DIALECTS, ...SOUTHERN_DIALECTS];

function AccessCard({ href, title, titleZh, icon: Icon, desc, descZh }: {
  href: string;
  title: string;
  titleZh: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  descZh: string;
}) {
  const { lang } = useI18n();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-card hover:bg-muted/40 transition-colors group"
    >
      <Icon className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
      <div className="min-w-0">
        <div className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
          {lang === "zh" ? titleZh : title}
          <ExternalLink className="w-3.5 h-3.5 opacity-50" />
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{lang === "zh" ? descZh : desc}</div>
      </div>
    </a>
  );
}

function ReflexCell({ value }: { value: string | null | undefined }) {
  if (!value) return <td className="px-2 py-2 text-center text-muted-foreground/30 text-xs">—</td>;
  return (
    <td className="px-2 py-2 text-xs text-foreground/80 align-top leading-relaxed max-w-[110px]">
      {value}
    </td>
  );
}

export default function Zhou2020Page() {
  const { lang } = useI18n();
  const [search, setSearch] = useState("");
  const [showOnlyLinked, setShowOnlyLinked] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["zhou-2020"],
    queryFn: fetchZhou2020,
  });

  const allRows = data?.rows ?? [];

  const filteredRows = useMemo(() => {
    let rows = allRows;
    if (showOnlyLinked) rows = rows.filter((r) => r.linkedEntries.length > 0);
    if (!search.trim()) return rows;
    const q = search.trim().toLowerCase();
    return rows.filter(
      (r) =>
        r.protoForm?.toLowerCase().includes(q) ||
        r.glossEn.toLowerCase().includes(q) ||
        (r.glossZh ?? "").includes(q)
    );
  }, [allRows, search, showOnlyLinked]);

  const isZh = lang === "zh";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-7xl flex-1">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
            {isZh ? "周煜楼 (2020)：原始毕兹语研究" : "Zhou (2020): Proto-Bizic"}
          </h1>
          <p className="text-muted-foreground text-sm max-w-3xl">
            {isZh
              ? "周煜楼（Yulou Zhou）：《原始毕兹语：土家语历史音韵学研究》，斯坦福大学荣誉学士论文，2020年。"
              : "Yulou Zhou. \"Proto-Bizic: A Study of Tujia Historical Phonology.\" Stanford University Honors Thesis, 2020."}
          </p>
        </div>

        {/* ── Metadata grid ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* Abstract */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {isZh ? "摘要" : "Abstract"}
            </h2>
            <p className="text-sm text-foreground/85 leading-relaxed">
              {isZh
                ? "本研究重构了原始毕兹语（Bizic/土家语）的音韵系统，该语系属于藏缅语系，主要分布于湘西地区。研究使用北部土家语四个方言点和南部土家语两个方言点，重构了28个声母、15个韵母和6个声调，形成包含350个词条的词汇表。本文还讨论了毕兹语在藏缅语系中的系统归属。"
                : "This study reconstructs the phonology of Proto-Bizic, the lowest ancestor language of the Bizic (Tujia) languages, a branch of the Tibetan-Burman languages spoken mainly in Western Hunan. This reconstruction uses four data points of Northern Tujia (tji) and two data points of Southern Tujia (tjs). 28 initials, 15 finals, 6 tones are reconstructed in a lexicon of 350 items. This study also discusses Bizic's placement under Tibeto-Burman."}
            </p>
            <div className="mt-3 pt-3 border-t border-border/40 text-xs text-muted-foreground space-y-1">
              <div>{isZh ? "导师：Paul Kiparsky、Dominic Yu" : "Supervised by Paul Kiparsky and Dominic Yu"}</div>
              <div>{isZh ? "院系：斯坦福大学语言学系" : "Department of Linguistics, Stanford University"}</div>
            </div>
          </div>

          {/* Access links + Erratum */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {isZh ? "获取文献" : "Access"}
              </h2>
              <div className="space-y-2">
                <AccessCard
                  href="https://drive.google.com/file/d/1zjB6Hq_PHqqsid3Mw3guLfXJKDykEYom/view?usp=sharing"
                  title="Official submitted version"
                  titleZh="正式提交版本"
                  icon={FileText}
                  desc="Stanford thesis PDF"
                  descZh="斯坦福学位论文 PDF"
                />
                <AccessCard
                  href="https://drive.google.com/file/d/1KzWEWXuY4CoZ7iVeOYcukKF42nv7HM4x/view?usp=sharing"
                  title="Computer-friendly version"
                  titleZh="可读性更佳的版本"
                  icon={FileText}
                  desc="With typographical corrections"
                  descZh="含排版勘误修正"
                />
                <AccessCard
                  href="https://drive.google.com/drive/u/0/folders/1XSzB1leCy34pw92nJ_a_NJ2HO9ZHoFE3"
                  title="Maps and gloss table"
                  titleZh="地图与词汇表"
                  icon={Map}
                  desc="Google Drive folder with dialect maps"
                  descZh="包含方言地图的 Google Drive 文件夹"
                />
              </div>
            </div>

            {/* Erratum */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 p-4">
              <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {isZh ? "勘误" : "Erratum"}
              </h2>
              <ul className="text-xs text-amber-900 dark:text-amber-300 space-y-2 leading-relaxed">
                <li>
                  <span className="font-medium">{isZh ? "第14、125页" : "p. 14 & 125"}：</span>
                  {isZh
                    ? "关于打洞溪（永顺）的土家语社区描述有误。据张真海（南京大学）近期田野调查，打洞溪的语言实为与沅陵蝴蚂鬧方言相近的汉语方言。"
                    : "The description of a Tujia-speaking community at Dǎdòngxī (Yongshun) is incorrect. According to recent fieldwork by Zhang Zhenhai (Nanjing University), the language there is a Chinese dialect related to the Humanao (蝴蚂鬧) dialect of Yuanling."}
                </li>
                <li>
                  <span className="font-medium">{isZh ? "第112页" : "p. 112"}：</span>
                  {isZh
                    ? '\u201cNiso-Burmish\u201d应更正为\u201cBurmo-Qiangic\u201d。'
                    : '\u201cNiso-Burmish branch\u201d should read \u201cBurmo-Qiangic branch\u201d.'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Dialect key ── */}
        <div className="rounded-xl border border-border/60 bg-card p-4 mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {isZh ? "方言点说明" : "Dialect Data Points"}
          </h2>
          <div className="flex flex-wrap gap-4 text-xs">
            <div>
              <div className="font-medium text-blue-700 dark:text-blue-400 mb-1.5">
                {isZh ? "北部土家语" : "Northern Tujia"}
              </div>
              <div className="flex flex-wrap gap-2">
                {NORTHERN_DIALECTS.map((d) => (
                  <span key={d.key} className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {d.label}{isZh ? ` (${d.labelZh})` : ""}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium text-red-700 dark:text-red-400 mb-1.5">
                {isZh ? "南部土家语" : "Southern Tujia"}
              </div>
              <div className="flex flex-wrap gap-2">
                {SOUTHERN_DIALECTS.map((d) => (
                  <span key={d.key} className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800">
                    {d.label}{isZh ? ` (${d.labelZh})` : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isZh ? "搜索……" : "Filter by gloss or proto-form…"}
              className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showOnlyLinked}
              onChange={(e) => setShowOnlyLinked(e.target.checked)}
              className="rounded"
            />
            {isZh ? "仅显示已链接词条" : "Only linked entries"}
          </label>
          <div className="ml-auto text-xs text-muted-foreground">
            {isLoading
              ? (isZh ? "加载中…" : "Loading…")
              : `${filteredRows.length}${isZh ? " 条" : " items"}${filteredRows.length !== allRows.length ? ` / ${allRows.length}` : ""}`}
          </div>
        </div>

        {error && (
          <div className="text-destructive text-sm mb-4">
            {isZh ? "加载失败，请稍后再试。" : "Failed to load data. Please try again."}
          </div>
        )}

        {/* ── Reconstruction table ── */}
        <div className="rounded-xl border border-border/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60 border-b border-border/60">
                  <th className="px-3 py-2.5 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wide w-10 sticky left-0 bg-muted/60">#</th>
                  <th className="px-3 py-2.5 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wide min-w-[120px]">
                    {isZh ? "原始形式" : "Proto-Bizic"}
                  </th>
                  <th className="px-3 py-2.5 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wide min-w-[100px]">
                    {isZh ? "英文释义" : "English"}
                  </th>
                  <th className="px-3 py-2.5 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wide min-w-[80px]">
                    {isZh ? "汉文释义" : "Chinese"}
                  </th>
                  {/* Northern header */}
                  <th colSpan={4} className="px-2 py-2 text-center font-semibold text-xs text-blue-700 dark:text-blue-400 uppercase tracking-wide border-l border-blue-200 dark:border-blue-900">
                    {isZh ? "北部" : "Northern"}
                  </th>
                  {/* Southern header */}
                  <th colSpan={2} className="px-2 py-2 text-center font-semibold text-xs text-red-700 dark:text-red-400 uppercase tracking-wide border-l border-red-200 dark:border-red-900">
                    {isZh ? "南部" : "Southern"}
                  </th>
                  <th className="px-3 py-2.5 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                    {isZh ? "相关词条" : "Links"}
                  </th>
                </tr>
                <tr className="bg-muted/40 border-b border-border/60 text-xs">
                  <th className="sticky left-0 bg-muted/40" />
                  <th />
                  <th />
                  <th />
                  {NORTHERN_DIALECTS.map((d) => (
                    <th key={d.key} className="px-2 py-1.5 font-medium text-blue-700 dark:text-blue-400 text-center border-l border-blue-100 dark:border-blue-900/30 first:border-l-0">
                      {d.label}{isZh ? `（${d.labelZh}）` : ""}
                    </th>
                  ))}
                  {SOUTHERN_DIALECTS.map((d) => (
                    <th key={d.key} className="px-2 py-1.5 font-medium text-red-700 dark:text-red-400 text-center border-l border-red-100 dark:border-red-900/30 first:border-l-[2px] first:border-l-red-200 dark:first:border-l-red-900">
                      {d.label}{isZh ? `（${d.labelZh}）` : ""}
                    </th>
                  ))}
                  <th />
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={11} className="px-4 py-12 text-center text-muted-foreground text-sm">
                      {isZh ? "加载中……" : "Loading…"}
                    </td>
                  </tr>
                )}
                {!isLoading && filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-12 text-center text-muted-foreground text-sm">
                      {isZh ? "未找到匹配项" : "No entries match your filter."}
                    </td>
                  </tr>
                )}
                {filteredRows.map((row, idx) => {
                  const isEven = idx % 2 === 0;
                  const displayNo = row.wiktionaryNoStr ?? (row.wiktionaryNo !== null ? String(row.wiktionaryNo) : "—");
                  return (
                    <tr
                      key={row.groupId}
                      className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${isEven ? "" : "bg-muted/10"}`}
                    >
                      {/* No. */}
                      <td className={`px-3 py-2 text-xs text-muted-foreground/60 font-mono sticky left-0 ${isEven ? "bg-background" : "bg-muted/10"}`}>
                        {displayNo}
                      </td>
                      {/* Proto-form */}
                      <td className="px-3 py-2 font-mono text-sm text-primary font-medium whitespace-nowrap">
                        {row.protoForm ?? "—"}
                      </td>
                      {/* English gloss */}
                      <td className="px-3 py-2 text-sm">{row.glossEn}</td>
                      {/* Chinese gloss */}
                      <td className="px-3 py-2 text-sm text-muted-foreground">{row.glossZh ?? "—"}</td>
                      {/* Northern reflexes */}
                  {NORTHERN_DIALECTS.map((d) => (
                        <ReflexCell key={d.key} value={row.reflexes?.[d.key]} />
                      ))}
                      {/* Southern reflexes */}
                      {SOUTHERN_DIALECTS.map((d) => (
                        <ReflexCell key={d.key} value={row.reflexes?.[d.key]} />
                      ))}
                      {/* Linked entries */}
                      <td className="px-3 py-2">
                        {row.linkedEntries.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {row.linkedEntries.map((e) => (
                              <Link
                                key={e.entryId}
                                href={`/entry/${e.entryId}`}
                                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors font-mono"
                              >
                                {e.tujiaWord}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Source attribution ── */}
        <div className="mt-6 text-xs text-muted-foreground/60 text-center space-y-1">
          <p>
            {isZh
              ? "原始形式及方言数据来源："
              : "Proto-forms and reflex data from: "}
            <a
              href="https://en.wiktionary.org/wiki/Appendix:Proto-Tujia_reconstructions"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-muted-foreground"
            >
              Wiktionary: Appendix:Proto-Tujia reconstructions
            </a>
            {isZh ? "，" : " and "}
            <a
              href="https://github.com/luggroo/bizic"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-muted-foreground"
            >
              luggroo/bizic (GitHub)
            </a>
          </p>
        </div>

      </div>
    </Layout>
  );
}
