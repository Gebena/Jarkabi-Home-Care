import { CallToAction } from "@/components/ui/call-to-action";
import { PageHero } from "@/components/layout/page-hero";
import { ServicesCategoryBand } from "@/components/services/services-category-band";
import { SectionTitle } from "@/components/ui/section-title";
import type { Locale } from "@/i18n/routing";
import { getServices } from "@/lib/cms";
import { getCategoryLabel, serviceCategories, type ServiceCategory } from "@/lib/services-config";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
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

      <section className="border-b border-line bg-white py-12 lg:py-14">
        <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
          <SectionTitle title={t("listingTitle")} subtitle={t("listingSubtitle")} />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/nursing`}
              className="border border-line px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-plum hover:text-plum"
            >
              {t("specialtyTitle")} — Nursing
            </Link>
            <Link
              href={`/${locale}/dementia-care`}
              className="border border-line px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-plum hover:text-plum"
            >
              Dementia Care
            </Link>
            <Link
              href={`/${locale}/caregivers`}
              className="border border-line px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-plum hover:text-plum"
            >
              {t("caregiversLink")}
            </Link>
          </div>
        </div>
      </section>

      {grouped.map(({ category, items }, index) => (
        <ServicesCategoryBand
          key={category}
          locale={locale}
          title={getCategoryLabel(category, locale)}
          subtitle={serviceCategories[category].description[locale === "fr" ? "fr" : "en"]}
          services={items}
          ctaLabel={t("learnMore")}
          tone={index % 2 === 0 ? "white" : "mist"}
        />
      ))}

      <CallToAction locale={locale} />
    </>
  );
}
