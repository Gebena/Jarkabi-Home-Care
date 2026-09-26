import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceDetailSections } from "@/components/sections/service-detail-sections";
import { CallToAction } from "@/components/ui/call-to-action";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import type { Locale } from "@/i18n/routing";
import { provincesSeed } from "@/lib/brand";
import {
  getRelatedServices,
  getService,
  getServiceAvailability,
  getServices,
  getCitiesByProvince,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; province: string; city: string; service: string }>;
};

const activeProvinces = new Set(
  provincesSeed.filter((p) => p.status === "active").map((p) => p.slug),
);

export async function generateStaticParams() {
  const services = await getServices("en");
  const params: Array<{ province: string; city: string; service: string }> = [];

  for (const province of provincesSeed.filter((p) => p.status === "active")) {
    for (const city of ["ottawa", "kanata", "nepean", "barrhaven", "orleans"]) {
      for (const service of services) {
        params.push({ province: province.slug, city, service: service.slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, province, city, service: serviceSlug } = await params;
  if (!activeProvinces.has(province)) return {};

  const service = await getService(serviceSlug, locale as Locale);
  if (!service) return {};

  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);
  const title = `${service.title} in ${cityLabel}`;
  const description = `${service.summary} Available in ${cityLabel}, ${province}.`;

  return buildPageMetadata({
    locale,
    path: `/${province}/${city}/${serviceSlug}`,
    title,
    description,
  });
}

export default async function LocalServicePage({ params }: Props) {
  const { locale, province, city, service: serviceSlug } = await params;
  setRequestLocale(locale);

  if (!activeProvinces.has(province)) notFound();

  const lang = locale as Locale;
  const cities = await getCitiesByProvince(province, lang);
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData || cityData.status !== "active") notFound();

  const [service, availability, allServices, t] = await Promise.all([
    getService(serviceSlug, lang),
    getServiceAvailability(),
    getServices(lang),
    getTranslations({ locale, namespace: "serviceDetail" }),
  ]);

  if (!service) notFound();

  const isAvailable = availability.some(
    (row) =>
      row.serviceSlug === service.slug &&
      row.provinceSlug === province &&
      row.status === "active" &&
      (!row.citySlug || row.citySlug === city),
  );

  if (!isAvailable) notFound();

  const relatedServices = await getRelatedServices(lang, service.slug, service.category);
  const cityLabel = cityData.name;
  const path = `/${province}/${city}/${serviceSlug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ title: service.title, summary: service.summary, slug: service.slug, locale }),
          breadcrumbJsonLd([
            { name: "Home", href: `/${locale}` },
            { name: cityLabel, href: `/${locale}/locations/${province}/${city}` },
            { name: service.title, href: `/${locale}${path}` },
          ]),
        ]}
      />
      <PageHero
        locale={locale}
        eyebrow={`${cityLabel}, Ontario`}
        title={`${service.title} in ${cityLabel}`}
        lead={service.summary}
        breadcrumbs={[{ label: cityLabel, href: `/${locale}/locations/${province}/${city}` }]}
      />
      <BlockRenderer
        blocks={service.blocks as never}
        locale={locale}
        services={allServices}
        learnMoreLabel={t("learnMore")}
      />
      <ServiceDetailSections
        locale={locale}
        service={service}
        availability={availability}
        relatedServices={relatedServices}
        labels={{
          whoFor: t("whoFor"),
          whoForBody: t("whoForBody"),
          howWeHelp: t("howWeHelp"),
          howWeHelpBody: t("howWeHelpBody"),
          howCareBegins: t("howCareBegins"),
          howCareBeginsBody: t("howCareBeginsBody"),
          locations: t("locations"),
          locationsEmpty: t("locationsEmpty"),
          related: t("related"),
          learnMore: t("learnMore"),
        }}
      />
      <CallToAction locale={locale} />
    </>
  );
}
