import React from "react";
import { Layout } from "@/components/layout";
import { BookOpen, Globe2, Languages, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function About() {
  const { t } = useI18n();
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-6">{t.aboutTitle}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.footerDesc}
          </p>
        </header>

        <div className="space-y-16">
          <section className="prose prose-lg dark:prose-invert max-w-none font-serif text-foreground/90">
            <p className="lead text-2xl text-foreground font-medium">
              The Tujia language (Bizika) is a Sino-Tibetan language spoken by the Tujia people primarily in central China. Like many minority languages, it faces significant pressure from dominant languages and rapid modernization.
            </p>
            <p>
              This dictionary is built on the belief that a language is more than a tool for communication; it is a repository of cultural memory, ecological knowledge, and a unique worldview. When a language fades, we lose a distinct way of perceiving the universe.
            </p>
            <p>
              Our mission is to create a scholarly, accessible, and respectful digital archive that serves linguists studying Sino-Tibetan languages, heritage speakers seeking to connect with their roots, and anyone interested in linguistic diversity.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={<Shield />}
              title="Digital Preservation"
              description="Creating a permanent, high-quality digital record of Tujia vocabulary, complete with tonal markings and contextual usage notes."
            />
            <FeatureCard 
              icon={<Globe2 />}
              title="Multi-lingual Architecture"
              description="Designed from the ground up to support translations in multiple languages (currently Chinese, English, and Japanese) to maximize accessibility."
            />
            <FeatureCard 
              icon={<BookOpen />}
              title="Cultural Context"
              description="Words do not exist in a vacuum. We emphasize cultural notes and example sentences that capture the lived reality of the Tujia people."
            />
            <FeatureCard 
              icon={<Languages />}
              title="Scholarly Rigor"
              description="Built for linguistic accuracy, supporting complex phonetic transcriptions and precise part-of-speech categorization."
            />
          </section>

          <section className="bg-muted/30 p-8 md:p-12 rounded-2xl border">
            <h2 className="text-3xl font-serif text-foreground mb-6">The Architecture</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This dictionary utilizes a modern, extensible database architecture designed specifically for cross-linguistic mapping. The base language is Tujia, with translations treated as distinct entities linked to the root concept. This allows the dictionary to organically grow and incorporate new translation languages without restructuring the core data.
            </p>
            <div className="text-sm font-mono bg-background p-4 rounded border text-muted-foreground overflow-x-auto">
              {"Tujia Root Word ──┬──> Chinese Translation"}<br/>
              {"                  ├──> English Translation"}<br/>
              {"                  └──> Japanese Translation"}
            </div>
          </section>
        </div>

      </div>
    </Layout>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl border bg-card flex flex-col gap-4">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      </div>
      <h3 className="text-xl font-serif font-medium text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
