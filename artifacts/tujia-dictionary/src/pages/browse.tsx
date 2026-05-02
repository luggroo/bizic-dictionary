import React from "react";
import { Link } from "wouter";
import { useListCategories } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderTree, ChevronRight } from "lucide-react";

export default function Browse() {
  const { data: categories, isLoading } = useListCategories();

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border/40 py-12">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Browse Vocabulary</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the Tujia language thematically. Words are grouped by their domain and cultural context.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12 flex-1">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        ) : !categories || categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No categories available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link key={cat.category} href={`/search?category=${encodeURIComponent(cat.category)}`}>
                <Card className="h-full cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <FolderTree className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                          {cat.category}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {cat.count} {cat.count === 1 ? 'entry' : 'entries'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
