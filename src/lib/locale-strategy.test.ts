import { describe, expect, it } from "vitest";
import {
  fullLocales,
  indexableLocales,
  isFullLocale,
  isPartialLocale,
  partialLocales,
} from "./locale-strategy";

describe("locale strategy", () => {
  it("treats en and fr as full locales", () => {
    expect(fullLocales).toEqual(["en", "fr"]);
    expect(isFullLocale("en")).toBe(true);
    expect(isFullLocale("fr")).toBe(true);
    expect(isFullLocale("ti")).toBe(false);
  });

  it("treats community locales as partial", () => {
    expect(partialLocales).toEqual(["ti", "byn", "tig", "ar", "am", "zh", "pa", "es"]);
    expect(isPartialLocale("ar")).toBe(true);
    expect(isPartialLocale("en")).toBe(false);
  });

  it("indexes only full locales for SEO", () => {
    expect(indexableLocales()).toEqual(["en", "fr"]);
  });
});
