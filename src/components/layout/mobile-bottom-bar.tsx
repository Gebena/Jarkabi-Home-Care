"use client";

import { isDisplayablePhone } from "@/lib/brand";
import type { BrandData } from "@/lib/cms";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type MobileBottomBarProps = {
  locale: string;
  brand: BrandData;
};

export function MobileBottomBar({ locale, brand }: MobileBottomBarProps) {
  const t = useTranslations("mobile");
  const showPhone = isDisplayablePhone(brand.primaryPhone);
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");

  return (
    <div className="mobile-bottom-bar" role="navigation" aria-label="Quick actions">
      {showPhone ? (
        <a className="mobile-bar-btn" href={`tel:${phoneDigits}`}>
          <Phone size={18} aria-hidden="true" />
          {t("call")}
        </a>
      ) : null}
      <Link className="mobile-bar-btn mobile-bar-btn--primary" href={`/${locale}/request-care`}>
        {t("requestCare")}
      </Link>
    </div>
  );
}
