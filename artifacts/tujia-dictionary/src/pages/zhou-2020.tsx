import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n-context";

type ZhouRow = {
  groupId: number;
  wiktionaryNo: number | null;
  protoForm: string | null;
  glossEn: string;
  glossZh: string | null;
  entryId: number | null;
  tujiaWord: string | null;
  variety: string | null;
  dialect: string | null;
  source: string | null;
};

async function fetchZhou2020(): Promise<{ rows: ZhouRow[] }> {
  const res = await fetch(`${import.meta.env.BASE_URL}api/zhou-2020`);
  if (!res.ok) throw new Error("Failed to load Zhou (2020)");
  return res.json();
}

export default function Zhou2020Page() {
  const { t } = useI18n();
  const { data } = useQuery({ queryKey: ["zhou-2020"], queryFn: fetchZhou2020 });
  const rows = data?.rows ?? [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-6xl flex-1">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Zhou (2020)</h1>
          <p className="text-muted-foreground max-w-3xl">Proto Bizic forms with links to related lexical items.</p>
        </div>
        <div className="grid gap-4">
          {rows.map((row) => (
            <Card key={`${row.groupId}-${row.entryId ?? "none"}`} className="border-border/60">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="font-serif text-xl text-foreground">{row.protoForm ?? "—"}</div>
                  <div className="text-sm text-muted-foreground">{row.glossEn}{row.glossZh ? ` · ${row.glossZh}` : ""}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  #{row.wiktionaryNo ?? "—"}{row.source ? ` · ${row.source}` : ""}
                </div>
                <div className="flex flex-wrap gap-2">
                  {row.entryId ? (
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/entry/${row.entryId}`}>Related lexical item: {row.tujiaWord}</Link>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}