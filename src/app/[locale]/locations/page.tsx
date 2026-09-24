import { PageHero } from "@/components/layout/page-hero";
import { CanadaMap } from "@/components/locations/canada-map";
import { CanadaSvgMap } from "@/components/locations/canada-svg-map";
import { ottawaCities } from "@/lib/brand";
import type { Locale } from "@/i18n/routing";
import { getProvinces } from "@/lib/cms";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Locations" };

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const provinces = await getProvinces(locale as Locale);
  const base = `/${locale}`;

  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Growing across Canada with local care"
        lead="Select a province to explore service availability. We never imply coverage where none exists."
      />
      <section className="section">
        <div className="container">
          <CanadaSvgMap provinces={provinces} locale={locale} />
          <CanadaMap provinces={provinces} locale={locale} />
          <div className="content-card ottawa-launch">
            <h2>Ottawa launch communities (Ontario — ACTIVE)</h2>
            <ul className="city-list">
              {ottawaCities.map((city) => (
                <li key={city}>
                  <Link href={`${base}/locations/ontario/${city}`}>
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="legal-note">
              Gatineau is listed under Quebec when Quebec service launches — not grouped with Ontario.
            </p>
          </div>
          <div className="content-card">
            <h2>Growing Across Canada</h2>
            <p>
              We began with a commitment to caring for families locally in Ottawa and intend to thoughtfully expand into additional Canadian communities with local leadership and consistent quality standards.
            </p>
            <Link href={`${base}/growing-across-canada`} className="text-link">
              Learn about our expansion vision
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
