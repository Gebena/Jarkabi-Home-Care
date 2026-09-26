import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import type { Locale } from "@/i18n/routing";
import { ServiceCard } from "@/components/ui/service-card";
import { getCitiesByProvince, getProvinces, getServicesForLocation } from "@/lib/cms";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
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

  const [services, t, tCity, tNav] = await Promise.all([
    getServicesForLocation(lang, province, city),
    getTranslations({ locale, namespace: "servicesPage" }),
    getTranslations({ locale, namespace: "cityPage" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={`${provinceData.name} · ${cityData.name}`}
        title={tCity("title", { city: cityData.name })}
        lead={tCity("lead", { city: cityData.name })}
        crumbLabel={cityData.name}
        breadcrumbs={[
          { label: tNav("locations"), href: `/${locale}/locations` },
          { label: provinceData.name, href: `/${locale}/locations/${province}` },
        ]}
      />

      <PageSection tone="mist">
        <SectionTitle align="center" title={tCity("servicesTitle")} />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} locale={locale} ctaLabel={t("learnMore")} />
            </li>
          ))}
        </ul>
      </PageSection>
      <CallToAction locale={locale} />
    </>
  );
}
