"use client";

import { fullLocales, partialLocales } from "@/lib/locale-strategy";
import { localeLabels, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LocaleSwitcher({ overlay = false }: { overlay?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("localeSwitcher");

  function switchLocale(nextLocale: string) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
  }

  return (
    <div
      className={cn("locale-switcher", overlay && "locale-switcher--overlay")}
      role="group"
      aria-label={t("ariaLabel")}
    >
      <select
        value={locale}
        onChange={(event) => switchLocale(event.target.value)}
        aria-label={t("ariaLabel")}
        aria-describedby="locale-switcher-hint"
        className={overlay ? "locale-select locale-select--overlay" : "locale-select"}
      >
        <optgroup label={t("fullSite")}>
          {fullLocales.map((code) => (
            <option key={code} value={code}>
              {localeLabels[code]}
            </option>
          ))}
        </optgroup>
        <optgroup label={t("partialSite")}>
          {partialLocales.map((code) => (
            <option key={code} value={code}>
              {localeLabels[code]}
            </option>
          ))}
        </optgroup>
      </select>
      <span id="locale-switcher-hint" className="sr-only">
        {t("partialHint")}
      </span>
    </div>
  );
}
