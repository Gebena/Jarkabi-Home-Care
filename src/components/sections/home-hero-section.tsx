import type { BrandData } from "@/lib/cms";
import { heroImage } from "@/lib/service-images";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

type HomeHeroSectionProps = {
  locale: string;
  brand: BrandData;
};

export async function HomeHeroSection({ locale, brand }: HomeHeroSectionProps) {
  const t = await getTranslations("hero");
  const base = `/${locale}`;
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");
  const hasPhone = phoneDigits.length > 3;

  return (
    <div className="hero-wrap">
      <section className="hero-section hero-home-one">
        <div className="hero-backdrop" aria-hidden="true">
          <div className="hero-photo" style={{ backgroundImage: `url("${heroImage}")` }} />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content hero-home-one-content">
          <div className="hero-copy">
            {hasPhone ? (
              <a className="hero-call-pill" href={`tel:${phoneDigits}`}>
                <Phone size={14} aria-hidden="true" />
                {t("callAnytime")} {brand.primaryPhone}
              </a>
            ) : null}
            <h1>{t("headline")}</h1>
            <p className="hero-subheadline">{t("subheadline")}</p>
            <p className="hero-location-note">{t("locationNote")}</p>
            <div className="hero-actions">
              <Link className="button button-primary button-lg" href={`${base}/contact`}>
                {t("primaryCta")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="button button-outline-light button-lg" href={`${base}/services`}>
                {t("secondaryCta")}
              </Link>
            </div>
          </div>

          <aside className="hero-side-panel" aria-label={t("panelLabel")}>
            <p className="hero-side-panel-eyebrow">{t("panelLabel")}</p>
            <h2>{t("panelTitle")}</h2>
            <ul className="hero-side-panel-list">
              <li>
                <span>{t("panelItem1Label")}</span>
                <strong>{t("panelItem1Value")}</strong>
              </li>
              <li>
                <span>{t("panelItem2Label")}</span>
                <strong>{t("panelItem2Value")}</strong>
              </li>
              <li>
                <span>{t("panelItem3Label")}</span>
                <strong>{t("panelItem3Value")}</strong>
              </li>
            </ul>
            <Link className="button button-secondary button-full" href={`${base}/contact`}>
              {t("panelCta")}
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
