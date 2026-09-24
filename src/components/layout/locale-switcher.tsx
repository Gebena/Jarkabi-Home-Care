"use client";

import { localeLabels, type Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: string) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
  }

  return (
    <div className="locale-switcher" role="group" aria-label="Language">
      <select
        value={locale}
        onChange={(event) => switchLocale(event.target.value)}
        aria-label="Select language"
        className="locale-select"
      >
        {Object.entries(localeLabels).map(([code, label]) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
    </div>
  );
}
