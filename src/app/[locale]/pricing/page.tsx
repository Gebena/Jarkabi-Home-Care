import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
import { getPricingRates } from "@/lib/cms";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const rates = await getPricingRates(locale as Locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={tNav("funding")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("title")}
      />
      <PageSection>
        <p className="max-w-3xl text-base leading-relaxed text-body">{t("disclaimer")}</p>

        {rates.length === 0 ? (
          <p className="mt-8 border border-line bg-white p-6 text-sm text-body">{t("empty")}</p>
        ) : (
          <div className="mt-10 overflow-x-auto border border-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-line bg-mist">
                <tr>
                  <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("service")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("location")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("weekday")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("weekend")}</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("minimum")}</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">{rate.serviceTitle}</td>
                    <td className="px-4 py-3">{rate.locationLabel}</td>
                    <td className="px-4 py-3">{rate.weekdayRate || "—"}</td>
                    <td className="px-4 py-3">{rate.weekendRate || "—"}</td>
                    <td className="px-4 py-3">{rate.minimumVisit || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-8 text-sm text-body">{t("contactNote")}</p>
      </PageSection>
    </>
  );
}
