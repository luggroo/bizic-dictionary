import React from "react";
import { Link } from "wouter";
import { type EntrySummary } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { varietyBgClass, varietyDotClass } from "@/lib/variety-colors";
import { useI18n } from "@/lib/i18n-context";
import { BookMarked } from "lucide-react";
import { detectNotation, NOTATION_LABEL } from "@/lib/notation";

export function EntryCard({ entry }: { entry: EntrySummary }) {
  const { t } = useI18n();
  const translations = Object.entries(entry.primaryTranslations);
  const chineseTranslations = entry.primaryTranslations.zh ? entry.primaryTranslations.zh.split(" | ") : [];
  const notation = detectNotation(entry.tujiaWord);

  return (
    <Link href={`/entry/${entry.id}`}>
      <Card className="h-full cursor-pointer hover:border-primary/30 hover:shadow-md transition-all duration-300 group overflow-hidden relative">
        {/* Left accent bar — deep blue for Northern, cyan for Southern */}
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-colors" />
        <CardContent className="p-6">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4 gap-3">
            <div className="min-w-0">
              <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {entry.tujiaWord}
              </h3>
              {/* Notation type label */}
              {notation && (
                <span
                  className={notation === "ipa" ? "notation-ipa mt-1.5 inline-block" : "notation-pinyin mt-1.5 inline-block"}
                  title={NOTATION_LABEL[notation].title}
                >
                  {NOTATION_LABEL[notation].short}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 items-end shrink-0">
              {entry.variety && (
                <Badge
                  variant="outline"
                  className={`text-xs font-normal flex items-center gap-1.5 ${varietyBgClass(entry.variety)}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${varietyDotClass(entry.variety)}`} />
                  {entry.variety === "southern" ? t.southern : t.northern}
                  {entry.dialect ? ` · ${entry.dialect}` : ""}
                </Badge>
              )}
              {entry.partOfSpeech && (
                <Badge variant="outline" className="bg-muted/50 text-xs font-normal capitalize">
                  {entry.partOfSpeech}
                </Badge>
              )}
              {entry.category && (
                <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground text-xs font-normal">
                  {entry.category}
                </Badge>
              )}
            </div>
          </div>

          {/* Translations */}
          <div className="space-y-3 mt-6">
            {chineseTranslations.length > 0 && (
              <div className="space-y-1.5">
                {chineseTranslations.map((text, index) => (
                  <p key={`${text}-${index}`} className="text-sm text-muted-foreground">
                    汉语{chineseTranslations.length > 1 ? ` ${index + 1}` : ""}：{text}
                  </p>
                ))}
              </div>
            )}
            {translations.length > 0 ? (
              translations.filter(([lang]) => lang !== "zh").slice(0, 3).map(([lang, text]) => (
                <div key={lang} className="flex items-start gap-3">
                  <span className="text-xs font-mono text-muted-foreground uppercase w-8 pt-0.5">
                    {lang}
                  </span>
                  <span className="text-foreground flex-1">{text}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">No translations available</p>
            )}
            {translations.filter(([lang]) => lang !== "zh").length > 3 && (
              <p className="text-xs text-muted-foreground pt-2">
                +{translations.filter(([lang]) => lang !== "zh").length - 3} more translations
              </p>
            )}
          </div>

          {/* Source citation */}
          {entry.source && (
            <div className="mt-5 pt-4 border-t border-border/40 flex items-center gap-1.5 text-xs text-muted-foreground/70">
              <BookMarked className="w-3 h-3 shrink-0" />
              <span className="truncate italic">{entry.source}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
