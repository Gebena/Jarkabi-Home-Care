import { PageHero } from "@/components/layout/page-hero";
import { DraftNotice } from "@/components/ui/draft-notice";
import { PageSection } from "@/components/ui/page-section";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Terms of Use" };

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legalPages" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  return (
    <>
      <PageHero
        locale={locale}
        title={tFooter("terms")}
        lead={t("termsLead")}
        crumbLabel={tFooter("terms")}
      />

      <PageSection>
        <div className="mx-auto max-w-3xl">
          <DraftNotice>{t("draftNotice")}</DraftNotice>
          <p className="mt-8 text-base leading-relaxed text-body">{t("termsBody")}</p>
        </div>
      </PageSection>
    </>
  );
}
