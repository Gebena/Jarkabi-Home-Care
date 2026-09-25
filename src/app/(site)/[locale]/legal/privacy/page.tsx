import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { PageHero } from "@/components/layout/page-hero";
import { DraftNotice } from "@/components/ui/draft-notice";
import type { Locale } from "@/i18n/routing";
import { getLegalPage } from "@/lib/cms";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legalPages" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const legal = await getLegalPage("privacy", locale as Locale);

  const title = legal?.title ? String(legal.title) : tFooter("privacy");
  const legalLinks = [
    { label: tFooter("privacy"), href: `/${locale}/legal/privacy`, active: true },
    { label: tFooter("terms"), href: `/${locale}/legal/terms` },
    { label: tFooter("accessibility"), href: `/${locale}/legal/accessibility` },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        title={title}
        lead={t("privacyLead")}
        crumbLabel={tFooter("privacy")}
      />

      <LegalPageLayout
        locale={locale}
        navTitle={t("sidebarTitle")}
        links={legalLinks}
        widgetTitle={t("sidebarWidgetTitle")}
        widgetButton={t("sidebarWidgetButton")}
      >
        {legal?.reviewRequired === false ? null : <DraftNotice>{t("draftNotice")}</DraftNotice>}
        <p className="mt-8 text-base leading-relaxed text-body">{t("privacyBody")}</p>
      </LegalPageLayout>
    </>
  );
}
