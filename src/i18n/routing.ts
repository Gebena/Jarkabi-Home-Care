import { defineRouting } from "next-intl/routing";

/** Public site locales — eight languages, RTL for Arabic only. */
export const locales = ["en", "fr", "ti", "ar", "am", "zh", "es", "hi"] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["ar"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ti: "ትግርኛ",
  ar: "العربية",
  am: "አማርኛ",
  zh: "中文",
  es: "Español",
  hi: "हिन्दी",
};

/** Locales merged from en.json + community patches via `npm run sync:locales`. */
export const partialLocales: Locale[] = ["ti", "ar", "am", "zh", "es", "hi"];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "always",
});
