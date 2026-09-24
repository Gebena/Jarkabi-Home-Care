import type { BrandData } from "@/lib/cms";
import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import Link from "next/link";

type TopBarProps = {
  locale: string;
  brand: BrandData;
};

export async function TopBar({ locale, brand }: TopBarProps) {
  const t = await getTranslations("topbar");
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");

  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        <span className="top-bar-tagline">{t("tagline")}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {phoneDigits.length > 3 ? (
            <a href={`tel:${phoneDigits}`}>
              <Phone size={14} aria-hidden="true" />
              {brand.primaryPhone}
            </a>
          ) : (
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          )}
          <Link className="top-bar-cta" href={`/${locale}/contact`}>
            {t("cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
