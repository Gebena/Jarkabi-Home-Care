import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "ti", "byn", "tig", "ar", "am"] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["ar"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ti: "ትግርኛ",
  byn: "ብሊን",
  tig: "ትግረ",
  ar: "العربية",
  am: "አማርኛ",
};

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "always",
});
