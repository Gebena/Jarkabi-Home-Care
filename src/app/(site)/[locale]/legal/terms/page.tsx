import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { PageHero } from "@/components/layout/page-hero";
import { DraftNotice } from "@/components/ui/draft-notice";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Terms of Use" };

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legalPages" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const legalLinks = [
    { label: tFooter("privacy"), href: `/${locale}/legal/privacy` },
    { label: tFooter("terms"), href: `/${locale}/legal/terms`, active: true },
    { label: tFooter("accessibility"), href: `/${locale}/legal/accessibility` },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        title={tFooter("terms")}
        lead={t("termsLead")}
        crumbLabel={tFooter("terms")}
      />

      <LegalPageLayout
        locale={locale}
        navTitle={t("sidebarTitle")}
        links={legalLinks}
        widgetTitle={t("sidebarWidgetTitle")}
        widgetButton={t("sidebarWidgetButton")}
      >
        <DraftNotice>{t("draftNotice")}</DraftNotice>
        <p className="mt-8 text-base leading-relaxed text-body">{t("termsBody")}</p>
      </LegalPageLayout>
    </>
  );
}
