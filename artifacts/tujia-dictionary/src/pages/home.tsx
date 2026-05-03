import React, { useState } from "react";
import { Link } from "wouter";
import { useGetDictionaryStats } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { SearchBar } from "@/components/search-bar";
import { EntryCard } from "@/components/entry-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BookA, Globe, Languages, Library, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";

const MODE_OPTIONS = [
  { value: "gloss-to-tujia", label: "汉语啰土话" },
  { value: "english-to-tujia", label: "英语啰土话" },
  { value: "tujia-to-gloss", label: "土话啰汉英" },
];

export default function Home() {
  const { data: stats, isLoading } = useGetDictionaryStats();
  const { t } = useI18n();
  const [modes, setModes] = useState<string[]>(["gloss-to-tujia", "english-to-tujia"]);

  const toggleMode = (value: string) => {
    setModes((current) => {
      if (current.includes(value)) {
        const next = current.filter((item) => item !== value);
        return next.length > 0 ? next : ["gloss-to-tujia", "english-to-tujia"];
      }
      return [...current, value];
    });
  };

  return (
    <Layout>
      <div className="w-full flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-7xl font-serif text-foreground tracking-tight">{t.siteName}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="max-w-2xl mx-auto mt-12 space-y-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {MODE_OPTIONS.map((option) => {
                  const active = modes.includes(option.value);
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={active ? "default" : "outline"}
                      onClick={() => toggleMode(option.value)}
                      className="rounded-full px-4"
                    >
                      <span className={`mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full border ${active ? "bg-primary-foreground text-primary" : "text-transparent"}`}>
                        <Check className="h-3 w-3" />
                      </span>
                      {option.label}
                    </Button>
                  );
                })}
              </div>
              <SearchBar size="lg" mode={modes} />
            </div>
            <div className="flex justify-center">
              <Link href="/zhou-2020" className="text-sm font-medium text-secondary hover:underline">
                Zhou (2020) / Proto Bizic
              </Link>
            </div>
            <div className="max-w-2xl mx-auto rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
              汉语译文在部分词条中可能仍有不准确之处。
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30 border-y">
          <div className="container mx-auto px-4 max-w-5xl">
            {isLoading || !stats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard icon={<BookA />} label={t.totalEntries} value={stats.totalEntries.toLocaleString()} />
                <StatCard icon={<Languages />} label={t.translations} value={stats.totalTranslations.toLocaleString()} />
                <StatCard icon={<Globe />} label={t.languages} value={stats.totalLanguages.toLocaleString()} />
                <StatCard icon={<Library />} label={t.categories} value={stats.totalCategories.toLocaleString()} />
              </div>
            )}
          </div>
        </section>

        {/* Recently Added */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-serif text-foreground">{t.recentlyPreserved}</h2>
              <Link href="/search" className="text-secondary hover:underline text-sm font-medium">{t.viewAllEntries}</Link>
            </div>
            
            {isLoading || !stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.recentEntries.map((entry, index) => (
                  <div key={entry.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}>
                    <EntryCard entry={entry} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="bg-background border-border/50 shadow-sm hover:border-primary/20 transition-colors">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
        <div className="text-secondary/80 mb-2">
          {icon}
        </div>
        <div className="text-3xl font-serif text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{label}</div>
      </CardContent>
    </Card>
  );
}
