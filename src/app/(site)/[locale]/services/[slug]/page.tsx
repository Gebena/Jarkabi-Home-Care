import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { ServiceDetailSections } from "@/components/sections/service-detail-sections";
import { ServiceSidebar } from "@/components/services/service-sidebar";
import type { Locale } from "@/i18n/routing";
import {
  getRelatedServices,
  getService,
  getServiceAvailability,
  getServices,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { resolveServiceSlug, serviceSlugRedirects } from "@/lib/services-config";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const services = await getServices("en");
  const legacy = Object.keys(serviceSlugRedirects).map((slug) => ({ slug }));
  return [...services.map((service) => ({ slug: service.slug })), ...legacy];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = await getService(slug, locale as Locale);
  if (!service) return { title: slug.replace(/-/g, " ") };
  return buildPageMetadata({
    locale,
    path: `/services/${resolveServiceSlug(slug)}`,
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.summary,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;

  if (serviceSlugRedirects[slug]) {
    redirect(`/${locale}/services/${resolveServiceSlug(slug)}`);
  }

  const [service, availability, allServices, t, tNav] = await Promise.all([
    getService(slug, lang),
    getServiceAvailability(),
    getServices(lang),
    getTranslations({ locale, namespace: "serviceDetail" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  if (!service) notFound();

  const relatedServices = await getRelatedServices(lang, service.slug, service.category);

  const servicePath = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ title: service.title, summary: service.summary, slug: service.slug, locale }),
          breadcrumbJsonLd([
            { name: "Home", href: `/${locale}` },
            { name: "Services", href: `/${locale}/services` },
            { name: service.title, href: `/${locale}${servicePath}` },
          ]),
        ]}
      />
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={service.title}
        lead={service.summary}
        breadcrumbs={[{ label: tNav("services"), href: `/${locale}/services` }]}
      />
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))] py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12 lg:py-20">
        <div className="min-w-0">
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
            embedded
          />
        </div>

        <ServiceSidebar
          locale={locale}
          services={allServices}
          activeSlug={service.slug}
          contactLabel={t("contactCta")}
        />
      </div>
      <CallToAction locale={locale} />
    </>
  );
}
