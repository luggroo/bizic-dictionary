export function varietyColor(variety: string): string {
  return variety === "southern" ? "var(--color-southern)" : "var(--color-northern, var(--primary))";
}

export function varietyBgClass(variety: string): string {
  return variety === "southern"
    ? "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-800"
    : "bg-primary/10 text-primary border-primary/20";
}

export function varietyDotClass(variety: string): string {
  return variety === "southern" ? "bg-teal-500" : "bg-primary";
}
