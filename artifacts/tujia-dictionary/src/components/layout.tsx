import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/search", label: "Search" },
  { href: "/browse", label: "Browse" },
  { href: "/about", label: "About" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <div className="noise-bg" />
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <span className="font-serif text-xl font-semibold text-primary">Tujia Dictionary</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors hover:text-primary ${location === href ? "text-primary" : "text-muted-foreground"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile menu drawer */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-border/40 bg-background/95 backdrop-blur-md px-4 py-4 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 px-2 rounded-lg text-base font-medium transition-colors hover:bg-muted/50 hover:text-primary ${
                  location === href ? "text-primary bg-primary/5" : "text-muted-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t py-12 mt-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif text-lg text-primary mb-4">Preserving the Tujia Language</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            A respectful, scholarly digital preservation project for the Tujia language — an endangered Sino-Tibetan language spoken by the Tujia people of central China.
          </p>
        </div>
      </footer>
    </div>
  );
}
