"use client";

import type { BrandData } from "@/lib/cms";
import { telHref } from "@/lib/brand-nap";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type SiteHeaderTopProps = {
  locale: string;
  brand: BrandData;
};

/**
 * Care Giver Home Page 01 `.header-top` — plum utility bar with phone,
 * secondary links, and language selector. Rendered above the white main nav.
 */
export function SiteHeaderTop({ locale, brand }: SiteHeaderTopProps) {
  const t = useTranslations("topbar");
  const base = `/${locale}`;
  const phoneLink = telHref(brand.primaryPhone);

  const utilityLinks = [
    { href: `${base}/about`, label: t("ourStory") },
    { href: `${base}/resources`, label: t("newsArticles") },
    { href: `${base}/careers`, label: t("franchiseOpportunity") },
  ];

  return (
    <div className="hidden border-b border-white/10 bg-plum-deep text-white/90 md:block">
      <div className="mx-auto flex h-10 w-[min(1240px,calc(100%-2rem))] items-center justify-between gap-4 text-[0.8125rem]">
        <div className="flex min-w-0 items-center gap-2">
          <Phone size={14} aria-hidden="true" className="shrink-0 text-white/80" />
          <span className="truncate text-white/85">{t("needHelp")}</span>
          {phoneLink ? (
            <a
              href={phoneLink}
              className="shrink-0 font-semibold text-tan transition-colors hover:text-tan-light"
            >
              {brand.primaryPhone}
            </a>
          ) : (
            <span className="shrink-0 font-semibold text-tan">{brand.primaryPhone}</span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <nav aria-label={t("utilityNav")} className="hidden lg:block">
            <ul className="flex items-center gap-3">
              {utilityLinks.map((link, index) => (
                <li key={link.href} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-white/35">
                      |
                    </span>
                  ) : null}
                  <Link
                    href={link.href}
                    className="whitespace-nowrap font-medium text-white/85 transition-colors hover:text-tan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LocaleSwitcher variant="topbar" />
        </div>
      </div>
    </div>
  );
}
