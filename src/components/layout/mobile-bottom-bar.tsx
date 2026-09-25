"use client";

import type { BrandData } from "@/lib/cms";
import { telHref } from "@/lib/brand-nap";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type MobileBottomBarProps = {
  locale: string;
  brand: BrandData;
};

export function MobileBottomBar({ locale, brand }: MobileBottomBarProps) {
  const t = useTranslations("mobile");
  const phoneLink = telHref(brand.primaryPhone);

  return (
    <div className="mobile-bottom-bar" role="navigation" aria-label="Quick actions">
      {phoneLink ? (
        <a className="mobile-bar-btn" href={phoneLink}>
          <Phone size={18} aria-hidden="true" />
          {t("call")}
        </a>
      ) : null}
      <Link className="mobile-bar-btn mobile-bar-btn--primary" href={`/${locale}/contact`}>
        {t("requestCare")}
      </Link>
    </div>
  );
}
