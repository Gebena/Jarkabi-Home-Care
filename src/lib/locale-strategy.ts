import { type Locale, locales } from "@/i18n/routing";

/** Locales with complete professional site copy (launch-ready). */
export const fullLocales = ["en", "fr"] as const satisfies readonly Locale[];

export type FullLocale = (typeof fullLocales)[number];

/** Community locales with partial message files — English fills gaps via `i18n/request.ts`. */
export const partialLocales = ["ti", "byn", "tig", "ar", "am"] as const satisfies readonly Locale[];

export type PartialLocale = (typeof partialLocales)[number];

export function isFullLocale(locale: string): locale is FullLocale {
  return (fullLocales as readonly string[]).includes(locale);
}

export function isPartialLocale(locale: string): locale is PartialLocale {
  return (partialLocales as readonly string[]).includes(locale);
}

/** Locales included in sitemap and hreflang until community translations are complete. */
export function indexableLocales(): readonly Locale[] {
  return fullLocales;
}

/** Validates any configured locale string. */
export function isConfiguredLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}
