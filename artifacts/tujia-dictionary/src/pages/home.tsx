import React from "react";
import { Link } from "wouter";
import { useGetDictionaryStats } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { SearchBar } from "@/components/search-bar";
import { EntryCard } from "@/components/entry-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BookA, Globe, Languages, Library } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function Home() {
  const { data: stats, isLoading } = useGetDictionaryStats();
  const { t } = useI18n();

  return (
    <Layout>
      <div className="w-full flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-7xl font-serif text-foreground tracking-tight">
              {t.tagline} <span className="text-primary italic">{t.taglineHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="max-w-2xl mx-auto mt-12">
              <SearchBar size="lg" />
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
              <Link href="/search" className="text-primary hover:underline text-sm font-medium">{t.viewAllEntries}</Link>
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
        <div className="text-primary/80 mb-2">
          {React.cloneElement(icon as React.ReactElement, { size: 28, strokeWidth: 1.5 })}
        </div>
        <div className="text-3xl font-serif text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{label}</div>
      </CardContent>
    </Card>
  );
}
