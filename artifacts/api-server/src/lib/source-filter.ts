export const SOURCE_FAMILIES: Record<string, { label: string; patterns: string[] }> = {
  brassett: {
    label: "Brassett",
    patterns: ["brassett 04 tujia", "brassett 06 tujia"],
  },
  "tian-86": {
    label: "Tian 86",
    patterns: ["tian 86"],
  },
  "sun-h-91-zmyy": {
    label: "Sun H 91 ZMYY",
    patterns: ["sun h 91 zmyy"],
  },
  "huang-and-dai-92-tbl": {
    label: "Huang and Dai 92 TBL",
    patterns: ["huang and dai 92 tbl"],
  },
  "chen-86-tubq": {
    label: "Chen 86 TuBQ",
    patterns: ["chen 86 tubq"],
  },
  "chen-86-tumq": {
    label: "Chen 86 TuMQ",
    patterns: ["chen 86 tumq"],
  },
};

/**
 * Returns true when the raw DB source string belongs to the given filter family key.
 * This is the single source of truth for matching — the SQL route uses the same patterns.
 */
export function sourceMatchesFamily(
  filterKey: string,
  rawSource: string | null | undefined
): boolean {
  const family = SOURCE_FAMILIES[filterKey];
  if (!family) return false;
  const lower = (rawSource ?? "").trim().toLowerCase();
  return family.patterns.some((pattern) => lower.includes(pattern));
}

/**
 * Returns the ILIKE patterns for a given family key, ready for use in SQL.
 * e.g. ["%brassett 04 tujia%", "%brassett 06 tujia%"]
 */
export function sourceSqlPatterns(filterKey: string): string[] {
  const family = SOURCE_FAMILIES[filterKey];
  if (!family) return [];
  return family.patterns.map((p) => `%${p}%`);
}
