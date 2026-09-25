import { ReferralForm } from "@/components/forms/referral-form";
import { PageHero } from "@/components/layout/page-hero";
import { ReferralsIntroSection } from "@/components/referrals/referrals-intro-section";
import { ReferralsSidebar } from "@/components/referrals/referrals-sidebar";
import { PageSection } from "@/components/ui/page-section";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const sidebarLinks = [
    { label: tNav("howCareWorks"), href: `/${locale}/how-care-works` },
    { label: tNav("faq"), href: `/${locale}/faq` },
    { label: tNav("contact"), href: `/${locale}/contact` },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      <ReferralsIntroSection
        introTitle={t("introTitle")}
        introBody={t("introBody")}
        highlights={t.raw("introHighlights") as string[]}
      />

      <PageSection tone="mist">
        <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
          <ReferralsSidebar
            locale={locale}
            quickLinksTitle={t("sidebarTitle")}
            links={sidebarLinks}
            partnersTitle={t("partnersTitle")}
            partnersBody={t("partnersBody")}
            responseTitle={t("responseTitle")}
            responseBody={t("responseBody")}
            privacyTitle={t("privacyTitle")}
            privacyBody={t("privacyBody")}
            privacyLinkLabel={tFooter("privacy")}
            privacyHref={`/${locale}/legal/privacy`}
            widgetTitle={t("sidebarWidgetTitle")}
            widgetButton={t("sidebarWidgetButton")}
          />

          <div className="min-w-0 border border-line bg-white p-8 lg:p-10">
            <ReferralForm locale={locale} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
