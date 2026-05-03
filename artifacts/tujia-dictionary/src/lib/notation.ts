/**
 * Detect whether a Tujia word uses IPA or Pinyin-based tone notation.
 *
 * Rule (per STEDT conventions):
 *   - Two consecutive Unicode superscript digits (²¹ ⁵⁵ ³³ etc.) → IPA tone contours
 *   - Single superscript digit OR ASCII digit directly after a letter (a¹ di1) → Tujia Pinyin
 *
 * Returns null when no tone markers are detected (unmarked entry).
 */

const SUPERSCRIPT_PAIR = /[⁰¹²³⁴⁵⁶⁷⁸⁹]{2}/;
const SUPERSCRIPT_ANY  = /[⁰¹²³⁴⁵⁶⁷⁸⁹]/;
const ASCII_TONE       = /[a-zA-Zɑ-ʐ]\d/;

export type NotationType = "ipa" | "pinyin" | null;

export function detectNotation(word: string): NotationType {
  if (!word) return null;
  if (SUPERSCRIPT_PAIR.test(word)) return "ipa";
  if (SUPERSCRIPT_ANY.test(word) || ASCII_TONE.test(word)) return "pinyin";
  return null;
}

export const NOTATION_LABEL: Record<"ipa" | "pinyin", { short: string; title: string }> = {
  ipa:    { short: "IPA",    title: "International Phonetic Alphabet — two-digit tone contours (e.g. ²¹ ⁵⁵)" },
  pinyin: { short: "Pinyin", title: "Tujia Pinyin romanization — single-digit tone numbers (e.g. ¹ or 1)" },
};
