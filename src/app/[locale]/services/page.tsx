import { CallToAction } from "@/components/ui/call-to-action";
import { PageHero } from "@/components/layout/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import { ServiceCard } from "@/components/ui/service-card";
import type { Locale } from "@/i18n/routing";
import { getServices } from "@/lib/cms";
import { getCategoryLabel, serviceCategories, type ServiceCategory } from "@/lib/services-config";
import { cn } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return { title: t("metaTitle") };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;
  const services = await getServices(lang);
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  const grouped = (Object.keys(serviceCategories) as ServiceCategory[])
    .map((category) => ({
      category,
      items: services.filter((service) => service.category === category),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <>
      <PageHero locale={locale} eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      {grouped.map(({ category, items }, index) => (
        <section
          key={category}
          className={cn("py-16 lg:py-20", index % 2 === 0 ? "bg-white" : "bg-mist")}
        >
          <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
            <SectionTitle
              align="center"
              title={getCategoryLabel(category, locale)}
              subtitle={serviceCategories[category].description[locale === "fr" ? "fr" : "en"]}
            />

            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((service) => (
                <li key={service.slug}>
                  <ServiceCard locale={locale} service={service} ctaLabel={t("learnMore")} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CallToAction locale={locale} />
    </>
  );
}
