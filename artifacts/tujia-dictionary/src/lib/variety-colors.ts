export function varietyColor(variety: string): string {
  return variety === "southern" ? "var(--color-southern)" : "var(--color-northern, var(--primary))";
}

export function varietyBgClass(variety: string): string {
  return variety === "southern"
    ? "bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-200 dark:border-cyan-800"
    : "bg-primary/10 text-primary border-primary/20";
}

export function varietyDotClass(variety: string): string {
  return variety === "southern" ? "bg-cyan-500" : "bg-primary";
}
