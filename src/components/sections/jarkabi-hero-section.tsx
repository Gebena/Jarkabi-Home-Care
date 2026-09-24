import type { BrandData } from "@/lib/cms";
import { heroImage } from "@/lib/service-images";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

type JarkabiHeroSectionProps = {
  locale: string;
  brand: BrandData;
};

/** Homepage hero — spec §24 */
export async function JarkabiHeroSection({ locale, brand }: JarkabiHeroSectionProps) {
  const t = await getTranslations("hero");
  const base = `/${locale}`;
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");
  const hasPhone = phoneDigits.length > 3;

  return (
    <section className="jarkabi-hero" aria-labelledby="hero-heading">
      <div className="jarkabi-hero-media" aria-hidden="true">
        <div className="jarkabi-hero-photo" style={{ backgroundImage: `url("${heroImage}")` }} />
        <div className="jarkabi-hero-overlay" />
      </div>
      <div className="container jarkabi-hero-inner">
        <div className="jarkabi-hero-copy">
          <p className="eyebrow eyebrow--light">{t("eyebrow")}</p>
          <h1 id="hero-heading">{t("headline")}</h1>
          <p className="jarkabi-hero-sub">{t("subheadline")}</p>
          <p className="jarkabi-hero-location">{t("locationNote")}</p>
          <div className="hero-actions">
            <Link className="button button-primary button-lg" href={`${base}/contact`}>
              {t("primaryCta")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link className="button button-outline-light button-lg" href={`${base}/services`}>
              {t("secondaryCta")}
            </Link>
            {hasPhone ? (
              <a className="button button-ghost-light button-lg" href={`tel:${phoneDigits}`}>
                <Phone size={16} aria-hidden="true" />
                {t("tertiaryCta")}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
