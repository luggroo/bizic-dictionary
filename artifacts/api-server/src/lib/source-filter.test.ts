import { describe, it, expect } from "vitest";
import { sourceMatchesFamily, sourceSqlPatterns, SOURCE_FAMILIES } from "./source-filter.js";

// ---------------------------------------------------------------------------
// sourceMatchesFamily
// ---------------------------------------------------------------------------

describe("sourceMatchesFamily", () => {
  describe("brassett", () => {
    it("matches Brassett 04 Tujia exactly", () => {
      expect(sourceMatchesFamily("brassett", "Brassett 04 Tujia")).toBe(true);
    });

    it("matches Brassett 06 Tujia exactly", () => {
      expect(sourceMatchesFamily("brassett", "Brassett 06 Tujia")).toBe(true);
    });

    it("matches when embedded in a combined citation", () => {
      expect(
        sourceMatchesFamily("brassett", "Sun H 91 ZMYY / Brassett 04 Tujia")
      ).toBe(true);
    });

    it("is case-insensitive", () => {
      expect(sourceMatchesFamily("brassett", "BRASSETT 04 TUJIA")).toBe(true);
    });

    it("does not match an unrelated source", () => {
      expect(sourceMatchesFamily("brassett", "Tian 86")).toBe(false);
    });

    it("does not match null", () => {
      expect(sourceMatchesFamily("brassett", null)).toBe(false);
    });

    it("does not match undefined", () => {
      expect(sourceMatchesFamily("brassett", undefined)).toBe(false);
    });

    it("does not match empty string", () => {
      expect(sourceMatchesFamily("brassett", "")).toBe(false);
    });
  });

  describe("tian-86", () => {
    it("matches Tian 86", () => {
      expect(sourceMatchesFamily("tian-86", "Tian 86")).toBe(true);
    });

    it("is case-insensitive", () => {
      expect(sourceMatchesFamily("tian-86", "TIAN 86")).toBe(true);
    });

    it("does not match Brassett", () => {
      expect(sourceMatchesFamily("tian-86", "Brassett 04 Tujia")).toBe(false);
    });
  });

  describe("sun-h-91-zmyy", () => {
    it("matches Sun H 91 ZMYY", () => {
      expect(sourceMatchesFamily("sun-h-91-zmyy", "Sun H 91 ZMYY")).toBe(true);
    });

    it("matches when embedded in a combined citation", () => {
      expect(
        sourceMatchesFamily("sun-h-91-zmyy", "Sun H 91 ZMYY / Brassett 04 Tujia")
      ).toBe(true);
    });
  });

  describe("huang-and-dai-92-tbl", () => {
    it("matches Huang and Dai 92 TBL", () => {
      expect(
        sourceMatchesFamily("huang-and-dai-92-tbl", "Huang and Dai 92 TBL")
      ).toBe(true);
    });

    it("is case-insensitive", () => {
      expect(
        sourceMatchesFamily("huang-and-dai-92-tbl", "HUANG AND DAI 92 TBL")
      ).toBe(true);
    });
  });

  describe("chen-86-tubq", () => {
    it("matches Chen 86 TuBQ", () => {
      expect(sourceMatchesFamily("chen-86-tubq", "Chen 86 TuBQ")).toBe(true);
    });

    it("does not match Chen 86 TuMQ", () => {
      expect(sourceMatchesFamily("chen-86-tubq", "Chen 86 TuMQ")).toBe(false);
    });
  });

  describe("chen-86-tumq", () => {
    it("matches Chen 86 TuMQ", () => {
      expect(sourceMatchesFamily("chen-86-tumq", "Chen 86 TuMQ")).toBe(true);
    });

    it("does not match Chen 86 TuBQ", () => {
      expect(sourceMatchesFamily("chen-86-tumq", "Chen 86 TuBQ")).toBe(false);
    });
  });

  describe("no filter key", () => {
    it("returns false for an unknown key", () => {
      expect(sourceMatchesFamily("unknown-source", "Tian 86")).toBe(false);
    });

    it("returns false for an empty key", () => {
      expect(sourceMatchesFamily("", "Tian 86")).toBe(false);
    });
  });
});

// ---------------------------------------------------------------------------
// sourceSqlPatterns
// ---------------------------------------------------------------------------

describe("sourceSqlPatterns", () => {
  it("returns two ILIKE patterns for brassett", () => {
    const patterns = sourceSqlPatterns("brassett");
    expect(patterns).toHaveLength(2);
    expect(patterns[0]).toBe("%brassett 04 tujia%");
    expect(patterns[1]).toBe("%brassett 06 tujia%");
  });

  it("returns one pattern for tian-86", () => {
    const patterns = sourceSqlPatterns("tian-86");
    expect(patterns).toHaveLength(1);
    expect(patterns[0]).toBe("%tian 86%");
  });

  it("returns empty array for unknown key", () => {
    expect(sourceSqlPatterns("not-a-real-source")).toHaveLength(0);
  });

  it("every family has at least one pattern", () => {
    for (const key of Object.keys(SOURCE_FAMILIES)) {
      expect(sourceSqlPatterns(key).length).toBeGreaterThan(0);
    }
  });
});
