import React from "react";
import { Link, useParams } from "wouter";
import { useGetEntry, useGetRelatedEntries, getGetEntryQueryKey, getGetRelatedEntriesQueryKey } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookMarked, BookOpen, Globe2, Quote, Volume2 } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { varietyBgClass, varietyColor } from "@/lib/variety-colors";
import { detectNotation, NOTATION_LABEL } from "@/lib/notation";
import { hasAudioAsset } from "@/lib/audio";

interface Translation {
  id: number;
  languageCode: string;
  languageName: string;
  languageNativeName: string;
  flag: string;
  text: string;
  romanization?: string | null;
  notes?: string | null;
}

function getChineseTranslations(translations: Translation[], partOfSpeech?: string | null) {
  const zh = translations.filter((t) => t.languageCode === "zh");
  if (zh.length === 0) return [];
  const pos = (partOfSpeech ?? "").trim().toLowerCase();
  if (!pos) return zh;
  const preferred = zh.filter((t) => {
    const text = t.text.trim();
    const notes = (t.notes ?? "").trim().toLowerCase();
    if (pos.includes("adj")) return text === "瘦" || notes.includes("adj");
    if (pos.includes("noun")) return text !== "瘦肉";
    if (pos.includes("verb")) return notes.includes("verb") || notes.includes("v.");
    return false;
  });
  return preferred.length > 0 ? preferred : zh;
}

interface CognateGroup {
  groupId: number;
  wiktionaryNo?: number | null;
  protoForm?: string | null;
  glossEn: string;
  glossZh?: string | null;
}

interface LanguageGroup {
  languageCode: string;
  languageName: string;
  languageNativeName: string;
  flag: string;
  senses: Array<{ id: number; text: string; romanization?: string | null; notes?: string | null }>;
}

function groupByLanguage(translations: Translation[]): LanguageGroup[] {
  const map = new Map<string, LanguageGroup>();
  for (const t of translations) {
    if (!map.has(t.languageCode)) {
      map.set(t.languageCode, {
        languageCode: t.languageCode,
        languageName: t.languageName,
        languageNativeName: t.languageNativeName,
        flag: t.flag,
        senses: [],
      });
    }
    map.get(t.languageCode)!.senses.push({
      id: t.id,
      text: t.text,
      romanization: t.romanization,
      notes: t.notes,
    });
  }
  return Array.from(map.values());
}

export default function EntryDetail() {
  const { id } = useParams();
  const entryId = parseInt(id || "0", 10);
  const { t } = useI18n();

  const { data: entry, isLoading, error } = useGetEntry(entryId, {
    query: { enabled: !!entryId, queryKey: getGetEntryQueryKey(entryId) },
  });

  const notation = entry ? detectNotation(entry.tujiaWord) : null;
  const cognates = ((entry as typeof entry & { cognates?: CognateGroup[] })?.cognates ?? []) as CognateGroup[];
  const hasAudio = entry ? hasAudioAsset(entry.id, entry.tujiaWord) : false;

  const { data: relatedEntries, isLoading: isRelatedLoading } = useGetRelatedEntries(entryId, {
    query: { enabled: !!entryId && !!entry?.category, queryKey: getGetRelatedEntriesQueryKey(entryId) },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-24 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-1/2" />
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <Separator className="my-8" />
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !entry) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 max-w-4xl text-center">
          <h2 className="text-2xl font-serif text-destructive mb-4">{t.entryNotFound}</h2>
          <p className="text-muted-foreground mb-8">{t.entryNotFoundDesc}</p>
          <Link href="/search">
            <Button>{t.returnToSearch}</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const languageGroups = groupByLanguage(entry.translations);
  const chineseTranslations = getChineseTranslations(entry.translations, entry.partOfSpeech);
  const hasForms = entry.forms && (entry.forms.spelling || entry.forms.toned || entry.forms.ipa || entry.forms.swMandarin);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/search" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> {t.backToDictionary}
        </Link>

        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                  {entry.tujiaWord}
                </h1>
                {hasAudio && (
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-card text-primary shadow-sm" title="Audio available" aria-label="Audio available">
                    <Volume2 className="h-4 w-4" />
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                {entry.variety && (
                  <Badge variant="outline" className={`${varietyBgClass(entry.variety)} font-medium px-3 py-1.5 text-sm`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${varietyColor(entry.variety)}`} />
                    {entry.variety === "southern" ? t.southernTujia : t.northernTujia}
                    {entry.dialect ? ` · ${entry.dialect}` : ""}
                  </Badge>
                )}
                {entry.partOfSpeech && <Badge variant="secondary">{entry.partOfSpeech}</Badge>}
                {entry.category && <Badge variant="outline">{entry.category}</Badge>}
                {notation && <span className={notation === "ipa" ? "notation-ipa" : "notation-pinyin"}>{NOTATION_LABEL[notation].short}</span>}
              </div>
              {chineseTranslations.length > 0 && (
                <div className="space-y-2 text-base sm:text-lg text-muted-foreground mb-6">
                  <p>汉语：{chineseTranslations.map((translation) => translation.text).join("；")}</p>
                </div>
              )}
            </div>

            {hasForms && (
              <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "50ms", animationFillMode: "both" }}>
                <h2 className="text-xl font-serif text-foreground flex items-center border-b pb-2 mb-6">
                  <Globe2 className="w-5 h-5 mr-3 text-muted-foreground" /> {t.formsHeading}
                </h2>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {entry.forms.spelling && (
                    <div className="bg-card rounded-xl p-4 border shadow-sm">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{t.formSpelling}</p>
                      <p className="text-lg font-medium">{entry.forms.spelling}</p>
                    </div>
                  )}
                  {entry.forms.toned && (
                    <div className="bg-card rounded-xl p-4 border shadow-sm">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{t.formToned}</p>
                      <p className="text-lg font-medium">{entry.forms.toned}</p>
                    </div>
                  )}
                  {entry.forms.ipa && (
                    <div className="bg-card rounded-xl p-4 border shadow-sm">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{t.formIpa}</p>
                      <p className="text-lg font-mono text-foreground/90">{entry.forms.ipa}</p>
                    </div>
                  )}
                  {entry.forms.swMandarin && (
                    <div className="bg-card rounded-xl p-4 border shadow-sm">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{t.formSwMandarin}</p>
                      <p className="text-xl font-medium">{entry.forms.swMandarin}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
              <h2 className="text-xl font-serif text-foreground flex items-center border-b pb-2">
                <BookOpen className="w-5 h-5 mr-3 text-muted-foreground" /> {t.translationsHeading}
              </h2>
              <div className="grid gap-4">
                {languageGroups.map((group) => (
                  <div key={group.languageCode} className="bg-card border rounded-xl overflow-hidden transition-colors hover:border-primary/20">
                    <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/50">
                      <span className="text-xl">{group.flag}</span>
                      <div>
                        <span className="text-sm font-semibold text-foreground">{group.languageName}</span>
                        <span className="text-xs text-muted-foreground ml-2">{group.languageNativeName}</span>
                      </div>
                      {group.senses.length > 1 && <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{group.senses.length} {t.senses}</span>}
                    </div>
                    <div className="divide-y divide-border/40">
                      {group.senses.map((sense, idx) => (
                        <div key={sense.id} className="px-5 py-4 flex gap-4 items-start">
                          {group.senses.length > 1 && <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">{idx + 1}</span>}
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <p className="text-lg sm:text-xl text-foreground font-medium">{sense.text}</p>
                            {sense.romanization && <p className="text-sm text-primary/80 font-mono">{sense.romanization}</p>}
                            {sense.notes && <p className="text-sm text-muted-foreground border-l-2 border-border pl-3 italic">{sense.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(entry.exampleSentence || entry.exampleTranslation) && (
              <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
                <div className="flex items-start gap-4">
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-primary/40 shrink-0 rotate-180" />
                  <div className="space-y-3 sm:space-y-4 min-w-0">
                    {entry.exampleSentence && <p className="text-xl sm:text-2xl font-serif text-foreground leading-relaxed">{entry.exampleSentence}</p>}
                    {entry.exampleTranslation && <p className="text-base sm:text-lg text-muted-foreground">{entry.exampleTranslation}</p>}
                  </div>
                </div>
              </div>
            )}

            {entry.culturalNote && (
              <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
                <h2 className="text-xl font-serif text-foreground flex items-center border-b pb-2 mb-4">
                  <BookOpen className="w-5 h-5 mr-3 text-muted-foreground" /> {t.culturalNote}
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{entry.culturalNote}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
            <div className="bg-muted/20 rounded-xl p-5 border">
              <h3 className="font-serif text-lg text-foreground mb-4">{t.aboutEntry}</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">{t.added}</dt><dd className="font-medium text-foreground">{new Date(entry.createdAt).toLocaleDateString()}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{t.wordId}</dt><dd className="font-mono text-xs text-muted-foreground">{entry.id}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">{t.languages}</dt><dd className="font-medium text-foreground">{languageGroups.length}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Total {t.senses}</dt><dd className="font-medium text-foreground">{entry.translations.length}</dd></div>
                {notation && <div className="flex justify-between items-center"><dt className="text-muted-foreground">{t.notation}</dt><dd><span className={notation === "ipa" ? "notation-ipa" : "notation-pinyin"} title={NOTATION_LABEL[notation].title}>{NOTATION_LABEL[notation].short}</span></dd></div>}
              </dl>
              {entry.source && (
                <div className="mt-5 pt-4 border-t border-border/40">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><BookMarked className="w-3.5 h-3.5" /> Source</p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">{entry.source}</p>
                </div>
              )}
            </div>

            {cognates.length > 0 && (
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-serif text-lg text-foreground mb-4">Cognates</h3>
                <div className="space-y-3">
                  {cognates.map((c) => (
                    <div key={c.groupId} className="rounded-lg border bg-muted/20 p-3">
                      <div className="text-sm font-medium text-foreground">{c.protoForm ?? `#${c.wiktionaryNo ?? c.groupId}`}</div>
                      <div className="text-xs text-muted-foreground mt-1">{c.glossEn}{c.glossZh ? ` · ${c.glossZh}` : ""}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {entry.category && (
              <div>
                <h3 className="font-serif text-lg text-foreground mb-4 flex items-center justify-between">
                  {t.relatedWords}
                  <Link href={`/search?category=${encodeURIComponent(entry.category)}`} className="text-xs text-primary hover:underline font-sans">{t.viewAll}</Link>
                </h3>
                {isRelatedLoading ? (
                  <div className="space-y-3"><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /></div>
                ) : relatedEntries && relatedEntries.length > 0 ? (
                  <div className="space-y-3">
                    {relatedEntries.filter((e) => e.id !== entry.id).slice(0, 5).map((related) => (
                      <Link key={related.id} href={`/entry/${related.id}`}>
                        <div className="group p-4 rounded-xl border bg-card hover:border-primary/30 transition-colors cursor-pointer block">
                          <h4 className="font-serif text-lg font-medium group-hover:text-primary transition-colors">{related.tujiaWord}</h4>
                          {related.primaryTranslations["en"] && <p className="text-sm text-muted-foreground mt-0.5 truncate">{related.primaryTranslations["en"]}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground italic">{t.noRelated}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
