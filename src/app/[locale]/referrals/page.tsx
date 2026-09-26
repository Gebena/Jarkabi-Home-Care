import { ReferralForm } from "@/components/forms/referral-form";
import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "referralsPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function ReferralsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "referralsPage" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      <PageSection tone="mist">
        <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-14">
          <aside className="space-y-8 border-s-2 border-tan ps-6">
            <div>
              <h2 className="font-display text-lg text-ink">{t("partnersTitle")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">{t("partnersBody")}</p>
            </div>
            <div>
              <h2 className="font-display text-lg text-ink">{t("responseTitle")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">{t("responseBody")}</p>
            </div>
            <div>
              <h2 className="font-display text-lg text-ink">{t("privacyTitle")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">{t("privacyBody")}</p>
              <Link
                href={`/${locale}/legal/referral-privacy`}
                className="mt-3 inline-block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
              >
                {tFooter("referralPrivacy")}
              </Link>
            </div>
          </aside>

          <div className="bg-white p-8 lg:p-10">
            <ReferralForm locale={locale} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
