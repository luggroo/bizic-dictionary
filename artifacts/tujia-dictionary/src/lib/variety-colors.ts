export function varietyColor(variety: string): string {
  return variety === "southern" ? "var(--color-southern)" : "var(--color-northern, var(--primary))";
}

export function varietyBgClass(variety: string): string {
  return variety === "southern"
    ? "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800"
    : "bg-primary/10 text-primary border-primary/20";
}

export function varietyDotClass(variety: string): string {
  return variety === "southern" ? "bg-rose-500" : "bg-primary";
}
