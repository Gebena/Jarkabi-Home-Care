import { PageHero } from "@/components/layout/page-hero";
import type { Locale } from "@/i18n/routing";
import { getCitiesByProvince, getProvinces } from "@/lib/cms";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; province: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { province, locale } = await params;
  const provinces = await getProvinces(locale as Locale);
  const item = provinces.find((p) => p.slug === province);
  return { title: item?.name ?? "Locations" };
}

export default async function ProvinceLocationsPage({ params }: Props) {
  const { locale, province } = await params;
  setRequestLocale(locale);
  const provinces = await getProvinces(locale as Locale);
  const item = provinces.find((p) => p.slug === province);

  if (!item) notFound();

  const cities = await getCitiesByProvince(province, locale as Locale);
  const activeCities = cities.filter((c) => c.status === "active");

  return (
    <>
      <PageHero
        eyebrow="Province"
        title={item.name}
        lead={`Status: ${item.status.replace("_", " ")}`}
      />
      <section className="section">
        <div className="container content-stack">
          {activeCities.length > 0 ? (
            <article className="content-card">
              <h2>Active communities</h2>
              <ul className="city-list">
                {activeCities.map((city) => (
                  <li key={city.slug}>
                    <Link href={`/${locale}/locations/${province}/${city.slug}`}>
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ) : (
            <article className="content-card">
              <h2>Expansion</h2>
              <p>This province is not currently marked as active. Join our expansion notification list on the contact page.</p>
            </article>
          )}
          <Link href={`/${locale}/contact`} className="button button-primary">
            Request Care
          </Link>
        </div>
      </section>
    </>
  );
}
