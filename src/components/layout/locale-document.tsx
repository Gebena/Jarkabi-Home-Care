"use client";

import { rtlLocales, type Locale } from "@/i18n/routing";
import { useEffect } from "react";

type LocaleDocumentProps = {
  locale: Locale;
};

/** Sets document lang/dir for accessibility and SEO (root layout owns <html>). */
export function LocaleDocument({ locale }: LocaleDocumentProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtlLocales.includes(locale) ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
