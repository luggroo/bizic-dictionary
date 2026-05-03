import React from "react";
import { Link } from "wouter";
import { type EntrySummary } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { varietyBgClass, varietyDotClass } from "@/lib/variety-colors";
import { useI18n } from "@/lib/i18n-context";
import { BookMarked } from "lucide-react";
import { detectNotation, NOTATION_LABEL } from "@/lib/notation";

function getChinesePartOfSpeech(partOfSpeech?: string | null) {
  const pos = (partOfSpeech ?? "").trim().toLowerCase();
  if (!pos) return "";
  const map: Record<string, string> = {
    noun: "名词",
    n: "名词",
    nbp: "名词",
    nanim: "名词",
    nveg: "名词",
    nrel: "名词",
    "n+vt.": "名动词",
    "n/adv": "名词/副词",
    verb: "动词",
    v: "动词",
    "v.i.": "不及物动词",
    "v.t.": "及物动词",
    vi: "不及物动词",
    "vi.": "不及物动词",
    vt: "及物动词",
    "vt.": "及物动词",
    "itr.v.": "不及物动词",
    "be": "系词",
    "be v.": "系词",
    va: "动词",
    "va.": "动词",
    vc: "动词",
    "vc.": "动词",
    adj: "形容词",
    adv: "副词",
    "advd.": "程度副词",
    "advl.": "位置副词",
    "advm.": "方式副词",
    "advt.": "时间副词",
    pron: "代词",
    pronoun: "代词",
    prep: "介词",
    conjunction: "连词",
    conj: "连词",
    dem: "指示词",
    "intg": "疑问词",
    "expr.": "短语",
    "cl.": "量词",
    clf: "量词",
    num: "数词",
    numeral: "数词",
    "num+cl.": "数词+量词",
    particle: "助词",
    "neg.": "否定词",
    "nominal suffix": "名词后缀",
    "verbal suffix": "动词后缀",
    onom: "拟声词",
    "onom.": "拟声词",
  };
  return map[pos] ?? partOfSpeech ?? "";
}

export function EntryCard({ entry }: { entry: EntrySummary }) {
  const { t } = useI18n();
  const translations = Object.entries(entry.primaryTranslations);
  const chineseTranslations = entry.primaryTranslations.zh ? entry.primaryTranslations.zh.split("; ").map((text) => text.trim()).filter(Boolean) : [];
  const notation = detectNotation(entry.tujiaWord);
  const partOfSpeechZh = getChinesePartOfSpeech(entry.partOfSpeech);

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
                  {partOfSpeechZh ? `${partOfSpeechZh} · ${entry.partOfSpeech}` : entry.partOfSpeech}
                </Badge>
              )}
            </div>
          </div>

          {/* Translations */}
          <div className="space-y-3 mt-6">
            {chineseTranslations.length > 0 && (
              <div className="grid grid-cols-[2rem_1fr] gap-x-2 items-start">
                <span className="text-sm font-mono text-muted-foreground leading-relaxed">汉</span>
                <p className="text-sm font-mono text-foreground leading-relaxed">{chineseTranslations.join("；")}</p>
              </div>
            )}
            {translations.length > 0 ? (
              translations.filter(([lang]) => lang !== "zh").slice(0, 3).map(([lang, text]) => (
                <div key={lang} className="grid grid-cols-[2rem_1fr] gap-x-2 items-start">
                  <span className="text-sm font-mono text-muted-foreground uppercase leading-relaxed">
                    {lang}
                  </span>
                  <span className="text-sm font-mono text-foreground leading-relaxed">{text}</span>
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
