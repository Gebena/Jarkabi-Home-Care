import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import type { Locale } from "@/i18n/routing";
import { getCitiesByProvince, getProvinces, getServices } from "@/lib/cms";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; province: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return { title: city.charAt(0).toUpperCase() + city.slice(1) };
}

export default async function CityLocationPage({ params }: Props) {
  const { locale, province, city } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;

  const provinces = await getProvinces(lang);
  const provinceData = provinces.find((p) => p.slug === province);
  if (!provinceData) notFound();

  const cities = await getCitiesByProvince(province, lang);
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData || cityData.status !== "active") notFound();

  const services = await getServices(lang);

  return (
    <>
      <PageHero
        eyebrow={`${provinceData.name} · ${cityData.name}`}
        title={`Home care in ${cityData.name}`}
        lead="Local services, contact information and team profiles are editable per city from the admin dashboard."
      />
      <section className="section">
        <div className="container">
          <h2>Available services</h2>
          <div className="card-grid">
            {services.map((service) => (
              <article key={service.slug} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link href={`/${locale}/services/${service.slug}`} className="text-link">
                  View service
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
