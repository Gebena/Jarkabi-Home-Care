import { heroImage } from "@/lib/service-images";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations("hero");
  const base = `/${locale}`;

  return (
    <div className="hero-wrap">
      <section className="hero-section">
        <div className="hero-backdrop" aria-hidden="true">
          <div
            className="hero-photo"
            style={{ backgroundImage: `url("${heroImage}")` }}
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="script-text">{t("scriptLine")}</p>
            <h1>{t("headline")}</h1>
            <p className="hero-subheadline">{t("subheadline")}</p>
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
        </div>
      </section>
    </div>
  );
}
