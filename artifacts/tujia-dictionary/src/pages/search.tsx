import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { type EntrySummary, useListLanguages, useListCategories, useListDialects } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { SearchBar } from "@/components/search-bar";
import { EntryCard } from "@/components/entry-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X, Search as SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n-context";

const SOURCE_OPTIONS = [
  { key: "brassett", label: "Brassett" },
  { key: "tian-86", label: "Tian 86" },
  { key: "sun-h-91-zmyy", label: "Sun H 91 ZMYY" },
  { key: "huang-and-dai-92-tbl", label: "Huang and Dai 92 TBL" },
  { key: "chen-86-tubq", label: "Chen 86 TuBQ" },
  { key: "chen-86-tumq", label: "Chen 86 TuMQ" },
] as const;

export default function Search() {
  const searchString = useSearch();
  const searchParams = useMemo(() => new URLSearchParams(searchString), [searchString]);
  const q = searchParams.get("q") || "";
  const { t } = useI18n();

  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [searchMode] = useState<string>(searchParams.get("mode") || "tujia-to-gloss");
  const [category, setCategory] = useState<string>(searchParams.get("category") || "");
  const [variety, setVariety] = useState<string>(searchParams.get("variety") || "");
  const [dialect, setDialect] = useState<string>(searchParams.get("dialect") || "");
  const source = searchParams.get("source") || "";
  
  const [, setLocation] = useLocation();

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [q, searchMode, category, variety, dialect, source]);

  const { data: categories } = useListCategories();
  const { data: dialectsList } = useListDialects();
  
  const availableDialects = useMemo(() => {
    if (!dialectsList || !variety || variety === "all") return [];
    return dialectsList.filter(d => d.variety === variety && d.dialect).map(d => d.dialect) as string[];
  }, [dialectsList, variety]);

  const [data, setData] = useState<{ entries: EntrySummary[]; total: number; page: number; limit: number; totalPages: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (searchMode.includes("gloss-to-tujia")) params.set("language", "zh");
        if (category) params.set("category", category);
        if (variety) params.set("variety", variety);
        if (dialect) params.set("dialect", dialect);
        if (source) params.set("source", source);
        params.set("page", String(page));
        params.set("limit", "12");
        const response = await fetch(`/api/entries?${params.toString()}`, { signal: controller.signal });
        setData(await response.json());
      } finally {
        setIsLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [q, searchMode, category, variety, dialect, source, page]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchString);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // If changing variety, clear dialect
    if (key === "variety") {
      params.delete("dialect");
      setDialect("");
    }

    params.delete("page"); // Reset to page 1
    setLocation(`/search?${params.toString()}`);
    
    if (key === "category") setCategory(value === "all" ? "" : value);
    if (key === "variety") setVariety(value === "all" ? "" : value);
    if (key === "dialect") setDialect(value === "all" ? "" : value);
  };

  const clearFilters = () => {
    setLocation("/search");
    setCategory("");
    setVariety("");
    setDialect("");
  };

  const sourceOptions = SOURCE_OPTIONS;
  const sourceLabel = sourceOptions.find((s) => s.key === source)?.label ?? source;

  const hasActiveFilters = q || searchMode !== "tujia-to-gloss" || category || variety || dialect || source;

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border/40 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-6">
            <h1 className="text-3xl font-serif text-foreground mb-4">{t.searchTitle}</h1>
            <SearchBar size="lg" initialQuery={q} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center text-sm font-medium text-muted-foreground mr-2">
                <SlidersHorizontal className="w-4 h-4 mr-2" /> {t.searchTitle}
              </div>

              <Select value={category || "all"} onValueChange={(v) => handleFilterChange("category", v)}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder={t.allCategories} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allCategories}</SelectItem>
                  {categories?.map(c => (
                    <SelectItem key={c.category} value={c.category}>
                      {c.category} ({c.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={variety || "all"} onValueChange={(v) => handleFilterChange("variety", v)}>
                <SelectTrigger className="w-[160px] bg-background">
                  <SelectValue placeholder={t.allVarieties} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allVarieties}</SelectItem>
                  <SelectItem value="northern">{t.northernTujia}</SelectItem>
                  <SelectItem value="southern">{t.southernTujia}</SelectItem>
                </SelectContent>
              </Select>

              {variety && variety !== "all" && availableDialects.length > 0 && (
                <Select value={dialect || "all"} onValueChange={(v) => handleFilterChange("dialect", v)}>
                  <SelectTrigger className="w-[160px] bg-background">
                    <SelectValue placeholder="All Dialects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dialects</SelectItem>
                    {availableDialects.map(d => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select value={source || "all"} onValueChange={(v) => handleFilterChange("source", v)}>
                <SelectTrigger className="w-[220px] bg-background">
                  <SelectValue placeholder={t.allSources} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allSources}</SelectItem>
                  {sourceOptions.map((s) => (
                    <SelectItem key={s.key} value={s.key}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4 mr-1" /> {t.clear}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-8 flex-1">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : data?.entries.length === 0 ? (
          <div className="text-center py-20 animate-in fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground mb-4">
              <SearchIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif text-foreground mb-2">{t.noResults}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t.noResultsDesc}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" className="mt-6" onClick={clearFilters}>
                {t.clearAllFilters}
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
              <span>{t.showing} <strong className="text-foreground">{data?.entries.length}</strong> {t.of} <strong className="text-foreground">{data?.total}</strong> {t.entries}</span>
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {q && <Badge variant="secondary">"{q}"</Badge>}
                  <Badge variant="secondary">
                    {searchMode === "tujia-to-gloss" ? t.searchModeTujiaToGloss : t.searchModeGlossToTujia}
                  </Badge>
                  {category && <Badge variant="secondary">Cat: {category}</Badge>}
                  {variety && <Badge variant="secondary">{variety === "northern" ? t.northern : t.southern}</Badge>}
                  {dialect && <Badge variant="secondary">{dialect}</Badge>}
                  {source && <Badge variant="secondary">{sourceLabel}</Badge>}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.entries.map((entry, i) => (
                <div key={entry.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}>
                  <EntryCard entry={entry} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <Button 
                  variant="outline" 
                  disabled={page <= 1}
                  onClick={() => {
                    const params = new URLSearchParams(searchString);
                    params.set("page", (page - 1).toString());
                    setLocation(`/search?${params.toString()}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> {t.previous}
                </Button>
                <span className="text-sm font-medium text-muted-foreground">
                  {t.page} {page} {t.of} {data.totalPages}
                </span>
                <Button 
                  variant="outline" 
                  disabled={page >= data.totalPages}
                  onClick={() => {
                    const params = new URLSearchParams(searchString);
                    params.set("page", (page + 1).toString());
                    setLocation(`/search?${params.toString()}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {t.next} <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
