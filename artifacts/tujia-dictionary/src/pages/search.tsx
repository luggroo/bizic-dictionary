import React, { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useListEntries, useListLanguages, useListCategories } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { SearchBar } from "@/components/search-bar";
import { EntryCard } from "@/components/entry-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Search() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const q = searchParams.get("q") || "";
  
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [language, setLanguage] = useState<string>(searchParams.get("language") || "");
  const [category, setCategory] = useState<string>(searchParams.get("category") || "");
  
  const [, setLocation] = useLocation();

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [q, language, category]);

  const { data: languages } = useListLanguages();
  const { data: categories } = useListCategories();
  
  const { data, isLoading } = useListEntries({
    q: q || undefined,
    language: language || undefined,
    category: category || undefined,
    page,
    limit: 12,
  });

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchString);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to page 1
    setLocation(`/search?${params.toString()}`);
    
    if (key === "language") setLanguage(value === "all" ? "" : value);
    if (key === "category") setCategory(value === "all" ? "" : value);
  };

  const clearFilters = () => {
    setLocation("/search");
    setLanguage("");
    setCategory("");
  };

  const hasActiveFilters = q || language || category;

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border/40 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-6">
            <h1 className="text-3xl font-serif text-foreground mb-4">Dictionary Search</h1>
            <SearchBar size="lg" initialQuery={q} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center text-sm font-medium text-muted-foreground mr-2">
                <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
              </div>
              
              <Select value={language || "all"} onValueChange={(v) => handleFilterChange("language", v)}>
                <SelectTrigger className="w-[160px] bg-background">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages?.filter(l => !l.isBase).map(l => (
                    <SelectItem key={l.code} value={l.code}>
                      <span className="mr-2">{l.flag}</span> {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={category || "all"} onValueChange={(v) => handleFilterChange("category", v)}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map(c => (
                    <SelectItem key={c.category} value={c.category}>
                      {c.category} ({c.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4 mr-1" /> Clear
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
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif text-foreground mb-2">No entries found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any words matching your search criteria. Try using different keywords or removing filters.
            </p>
            {hasActiveFilters && (
              <Button variant="outline" className="mt-6" onClick={clearFilters}>
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
              <span>Showing <strong className="text-foreground">{data?.entries.length}</strong> of <strong className="text-foreground">{data?.total}</strong> entries</span>
              {hasActiveFilters && (
                <div className="flex gap-2">
                  {q && <Badge variant="secondary">"{q}"</Badge>}
                  {language && <Badge variant="secondary">Lang: {language}</Badge>}
                  {category && <Badge variant="secondary">Cat: {category}</Badge>}
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
                  <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                <span className="text-sm font-medium text-muted-foreground">
                  Page {page} of {data.totalPages}
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
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
