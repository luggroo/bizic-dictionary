import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useI18n } from "@/lib/i18n-context";
import type { UILang } from "@/lib/i18n";

const LANG_OPTIONS: { value: UILang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];

function LangSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center rounded-lg border border-border/60 overflow-hidden text-xs font-medium">
      {LANG_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setLang(value)}
          className={`px-2.5 py-1 transition-colors ${
            lang === value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
          aria-label={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { href: "/search", label: t.search },
    { href: "/browse", label: t.browse },
    { href: "/about", label: t.about },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <div className="noise-bg" />

      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        {/* Xilankapu decorative border strip */}
        <div className="xilankapu-strip" aria-hidden="true" />

        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <span className="font-serif text-xl font-semibold text-primary">{t.siteName}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <nav className="flex items-center gap-6">
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
            <LangSwitcher />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <LangSwitcher />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
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

      {/* Xilankapu footer accent */}
      <div className="xilankapu-strip" aria-hidden="true" />

      <footer className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif text-lg text-primary mb-4">{t.footerTagline}</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {t.footerDesc}
          </p>
        </div>
      </footer>
    </div>
  );
}
