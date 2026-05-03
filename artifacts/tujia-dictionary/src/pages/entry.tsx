import React from "react";
import { Link, useParams } from "wouter";
import { useGetEntry, useGetRelatedEntries, getGetEntryQueryKey, getGetRelatedEntriesQueryKey } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookMarked, BookOpen, Globe2, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { varietyBgClass, varietyColor } from "@/lib/variety-colors";
import { detectNotation, NOTATION_LABEL } from "@/lib/notation";

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
  const hasForms = entry.forms && (entry.forms.spelling || entry.forms.toned || entry.forms.ipa || entry.forms.swMandarin);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/search"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> {t.backToDictionary}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-foreground mb-4 tracking-tight break-words">
                {entry.tujiaWord}
              </h1>
              
              {entry.variety && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <Badge 
                    className="text-sm px-3 py-1 bg-transparent border shadow-none"
                    style={{ color: varietyColor(entry.variety), borderColor: varietyColor(entry.variety) }}
                  >
                    {entry.variety === "southern" ? t.southernTujia : t.northernTujia}
                  </Badge>
                  {entry.dialect && (
                    <span className="text-muted-foreground text-sm font-medium">
                      · {entry.dialect} {t.dialect.toLowerCase()}
                    </span>
                  )}
                </div>
              )}
              
              {entry.toneMarks && (
                <p className="text-xl sm:text-2xl text-muted-foreground font-serif italic mb-6">
                  {entry.toneMarks}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {entry.partOfSpeech && (
                  <Badge variant="outline" className="text-sm px-3 py-1 font-medium bg-muted/30">
                    {entry.partOfSpeech}
                  </Badge>
                )}
                {entry.category && (
                  <Link href={`/search?category=${encodeURIComponent(entry.category)}`}>
                    <Badge variant="secondary" className="text-sm px-3 py-1 cursor-pointer hover:bg-secondary/20 transition-colors">
                      {entry.category}
                    </Badge>
                  </Link>
                )}
              </div>
            </div>

            {/* Forms Panel */}
            {hasForms && (
              <div
                className="space-y-4 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: "50ms", animationFillMode: "both" }}
              >
                <h2 className="text-xl font-serif text-foreground flex items-center border-b pb-2">
                  {t.formsHeading}
                </h2>
                <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 gap-4 snap-x">
                  {entry.forms.spelling && (
                    <div className="snap-start shrink-0 w-64 sm:w-auto bg-card rounded-xl p-4 border shadow-sm">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{t.formSpelling}</p>
                      <p className="text-lg font-medium">{entry.forms.spelling}</p>
                    </div>
                  )}
                  {entry.forms.toned && (
                    <div className="snap-start shrink-0 w-64 sm:w-auto bg-card rounded-xl p-4 border shadow-sm">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{t.formToned}</p>
                      <p className="text-lg font-medium">{entry.forms.toned}</p>
                    </div>
                  )}
                  {entry.forms.ipa && (
                    <div className="snap-start shrink-0 w-64 sm:w-auto bg-card rounded-xl p-4 border shadow-sm">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{t.formIpa}</p>
                      <p className="text-lg font-mono text-foreground/90">{entry.forms.ipa}</p>
                    </div>
                  )}
                  {entry.forms.swMandarin && (
                    <div className="snap-start shrink-0 w-64 sm:w-auto bg-card rounded-xl p-4 border shadow-sm">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{t.formSwMandarin}</p>
                      <p className="text-xl font-medium">{entry.forms.swMandarin}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Translations — grouped by language */}
            <div
              className="space-y-5 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: "100ms", animationFillMode: "both" }}
            >
              <h2 className="text-xl font-serif text-foreground flex items-center border-b pb-2">
                <Globe2 className="w-5 h-5 mr-3 text-muted-foreground" /> {t.translationsHeading}
              </h2>

              <div className="grid gap-4">
                {languageGroups.map((group) => (
                  <div
                    key={group.languageCode}
                    className="bg-card border rounded-xl overflow-hidden transition-colors hover:border-primary/20"
                  >
                    {/* Language header */}
                    <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/50">
                      <span className="text-xl">{group.flag}</span>
                      <div>
                        <span className="text-sm font-semibold text-foreground">{group.languageName}</span>
                        <span className="text-xs text-muted-foreground ml-2">{group.languageNativeName}</span>
                      </div>
                      {group.senses.length > 1 && (
                        <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {group.senses.length} {t.senses}
                        </span>
                      )}
                    </div>

                    {/* Senses list */}
                    <div className="divide-y divide-border/40">
                      {group.senses.map((sense, idx) => (
                        <div key={sense.id} className="px-5 py-4 flex gap-4 items-start">
                          {group.senses.length > 1 && (
                            <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                              {idx + 1}
                            </span>
                          )}
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <p className="text-lg sm:text-xl text-foreground font-medium">{sense.text}</p>
                            {sense.romanization && (
                              <p className="text-sm text-primary/80 font-mono">{sense.romanization}</p>
                            )}
                            {sense.notes && (
                              <p className="text-sm text-muted-foreground border-l-2 border-border pl-3 italic">
                                {sense.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Sentence */}
            {(entry.exampleSentence || entry.exampleTranslation) && (
              <div
                className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: "200ms", animationFillMode: "both" }}
              >
                <div className="flex items-start gap-4">
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-primary/40 shrink-0 rotate-180" />
                  <div className="space-y-3 sm:space-y-4 min-w-0">
                    {entry.exampleSentence && (
                      <p className="text-xl sm:text-2xl font-serif text-foreground leading-relaxed">
                        {entry.exampleSentence}
                      </p>
                    )}
                    {entry.exampleTranslation && (
                      <p className="text-base sm:text-lg text-muted-foreground">{entry.exampleTranslation}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Cultural Note */}
            {entry.culturalNote && (
              <div
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: "300ms", animationFillMode: "both" }}
              >
                <h2 className="text-xl font-serif text-foreground flex items-center border-b pb-2 mb-4">
                  <BookOpen className="w-5 h-5 mr-3 text-muted-foreground" /> {t.culturalNote}
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{entry.culturalNote}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div
            className="lg:col-span-1 space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: "400ms", animationFillMode: "both" }}
          >
            <div className="bg-muted/20 rounded-xl p-5 border">
              <h3 className="font-serif text-lg text-foreground mb-4">{t.aboutEntry}</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t.added}</dt>
                  <dd className="font-medium text-foreground">{new Date(entry.createdAt).toLocaleDateString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t.wordId}</dt>
                  <dd className="font-mono text-xs text-muted-foreground">{entry.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t.languages}</dt>
                  <dd className="font-medium text-foreground">{languageGroups.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total {t.senses}</dt>
                  <dd className="font-medium text-foreground">{entry.translations.length}</dd>
                </div>
                {notation && (
                  <div className="flex justify-between items-center">
                    <dt className="text-muted-foreground">{t.notation}</dt>
                    <dd>
                      <span
                        className={notation === "ipa" ? "notation-ipa" : "notation-pinyin"}
                        title={NOTATION_LABEL[notation].title}
                      >
                        {NOTATION_LABEL[notation].short}
                      </span>
                    </dd>
                  </div>
                )}
              </dl>

              {entry.source && (
                <div className="mt-5 pt-4 border-t border-border/40">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <BookMarked className="w-3.5 h-3.5" /> Source
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    {entry.source.split(" / ").map((src, i) => (
                      <span key={i} className="block">
                        {entry.source!.split(" / ").length > 1 && (
                          <span className="not-italic text-muted-foreground/60 mr-1">·</span>
                        )}
                        {src}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>

            {/* Related Entries */}
            {entry.category && (
              <div>
                <h3 className="font-serif text-lg text-foreground mb-4 flex items-center justify-between">
                  {t.relatedWords}
                  <Link
                    href={`/search?category=${encodeURIComponent(entry.category)}`}
                    className="text-xs text-primary hover:underline font-sans"
                  >
                    {t.viewAll}
                  </Link>
                </h3>
                {isRelatedLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : relatedEntries && relatedEntries.length > 0 ? (
                  <div className="space-y-3">
                    {relatedEntries
                      .filter((e) => e.id !== entry.id)
                      .slice(0, 5)
                      .map((related) => (
                        <Link key={related.id} href={`/entry/${related.id}`}>
                          <div className="group p-4 rounded-xl border bg-card hover:border-primary/30 transition-colors cursor-pointer block">
                            <h4 className="font-serif text-lg font-medium group-hover:text-primary transition-colors">
                              {related.tujiaWord}
                            </h4>
                            {related.primaryTranslations["en"] && (
                              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                                {related.primaryTranslations["en"]}
                              </p>
                            )}
                            {related.toneMarks && (
                              <p className="text-xs text-muted-foreground/60 font-mono mt-0.5 italic">
                                {related.toneMarks}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">{t.noRelated}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
