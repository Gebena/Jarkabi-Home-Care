"use client";

import { localeLabels, type Locale } from "@/i18n/routing";
import { isPartialLocale } from "@/lib/locale-strategy";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PartialLocaleBannerProps = {
  locale: string;
};

export function PartialLocaleBanner({ locale }: PartialLocaleBannerProps) {
  const pathname = usePathname();
  const t = useTranslations("localeBanner");

  if (!isPartialLocale(locale)) {
    return null;
  }

  const segments = pathname.split("/");
  const pathWithoutLocale = segments.slice(2).join("/");
  const suffix = pathWithoutLocale ? `/${pathWithoutLocale}` : "";
  const languageName = localeLabels[locale as Locale];

  return (
    <div
      role="status"
      className="partial-locale-banner border-b border-line bg-mist px-4 py-3 text-sm text-ink"
    >
      <div className="mx-auto flex w-[min(1240px,calc(100%-2rem))] flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Languages size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-tan-ink" />
          <div>
            <p className="font-semibold">{t("title")}</p>
            <p className="mt-1 leading-relaxed text-body">
              {t("body", { language: languageName })}
            </p>
          </div>
        </div>
        <p className="shrink-0 text-sm sm:text-right">
          <span className="font-semibold text-ink">{t("switchFull")}</span>{" "}
          <Link
            href={`/en${suffix}`}
            className="font-semibold text-coral underline underline-offset-4 transition-colors hover:text-tan-ink"
          >
            {localeLabels.en}
          </Link>
          {" · "}
          <Link
            href={`/fr${suffix}`}
            className="font-semibold text-coral underline underline-offset-4 transition-colors hover:text-tan-ink"
          >
            {localeLabels.fr}
          </Link>
        </p>
      </div>
    </div>
  );
}
