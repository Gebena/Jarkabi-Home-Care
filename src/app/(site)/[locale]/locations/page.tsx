import { PageHero } from "@/components/layout/page-hero";
import { CanadaMap } from "@/components/locations/canada-map";
import { LocationsIntroBand } from "@/components/locations/locations-intro-band";
import { PageSection } from "@/components/ui/page-section";
import { ottawaCities } from "@/lib/brand";
import type { Locale } from "@/i18n/routing";
import { getProvinces } from "@/lib/cms";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locationsPage" });
  return { title: t("title"), description: t("lead") };
}

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const provinces = await getProvinces(locale as Locale);
  const t = await getTranslations({ locale, namespace: "locationsPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const base = `/${locale}`;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={tNav("locations")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={tNav("locations")}
      />

      <LocationsIntroBand title={t("introTitle")} lead={t("introLead")} />

      <PageSection>
        <CanadaMap provinces={provinces} locale={locale} />
      </PageSection>

      <PageSection tone="mist">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="border border-line bg-white p-8 lg:p-10">
            <h2 className="font-display text-xl text-ink">{t("ottawaTitle")}</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {ottawaCities.map((city) => (
                <li key={city}>
                  <Link
                    href={`${base}/locations/ontario/${city}`}
                    className="inline-block border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-tan hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                  >
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-body">{t("ottawaNote")}</p>
          </div>

          <div className="border border-line bg-white p-8 lg:p-10">
            <h2 className="font-display text-xl text-ink">{t("growingTitle")}</h2>
            <p className="mt-6 text-base leading-relaxed text-body">{t("growingBody")}</p>
            <p className="mt-4 text-sm leading-relaxed text-body">{t("coverageNote")}</p>
            <Link
              href={`${base}/growing-across-canada`}
              className="mt-6 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
            >
              {t("growingLink")}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </PageSection>
    </>
  );
}
