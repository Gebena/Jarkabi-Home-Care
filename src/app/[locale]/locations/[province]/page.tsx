import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
import { getCitiesByProvince, getProvinces } from "@/lib/cms";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const [cities, t, tNav] = await Promise.all([
    getCitiesByProvince(province, locale as Locale),
    getTranslations({ locale, namespace: "provincePage" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);
  const activeCities = cities.filter((c) => c.status === "active");

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t(`status.${item.status}`)}
        title={item.name}
        lead={t(`statusLead.${item.status}`, { province: item.name })}
        breadcrumbs={[{ label: tNav("locations"), href: `/${locale}/locations` }]}
      />

      <PageSection tone="mist">
        <div className="mx-auto max-w-3xl border border-line bg-white p-8 text-center lg:p-10">
          {activeCities.length > 0 ? (
            <>
              <h2 className="font-display text-xl text-ink">{t("activeTitle")}</h2>
              <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
                {activeCities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/${locale}/locations/${province}/${city.slug}`}
                      className="inline-block border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-tan hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2 className="font-display text-xl text-ink">{t("inactiveTitle")}</h2>
              <p className="mt-4 text-base leading-relaxed text-body">{t("inactiveBody")}</p>
            </>
          )}

          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-block bg-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
          >
            {tNav("requestCare")}
          </Link>
        </div>
      </PageSection>
    </>
  );
}
