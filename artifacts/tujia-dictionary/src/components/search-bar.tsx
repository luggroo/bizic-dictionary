import React, { useState } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  size?: "default" | "lg";
  initialQuery?: string;
}

export function SearchBar({ size = "default", initialQuery = "" }: SearchBarProps) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      setLocation('/search');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full flex shadow-sm rounded-md group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
      <div className="relative flex-grow flex items-center">
        <Search className={`absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors ${size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'}`} />
        <Input
          type="search"
          placeholder="Search Tujia, English, Chinese..."
          className={`pl-12 bg-background border-r-0 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 ${size === 'lg' ? 'h-14 text-lg' : 'h-10'}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" size={size} className="rounded-l-none border-l-0 px-8">
        Search
      </Button>
    </form>
  );
}
