import { PageHero } from "@/components/layout/page-hero";
import type { Locale } from "@/i18n/routing";
import { getLegalPage } from "@/lib/cms";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const legal = await getLegalPage("privacy", locale as Locale);

  return (
    <>
      <PageHero
        title={legal?.title ? String(legal.title) : "Privacy Policy"}
        lead="[REVIEW REQUIRED] — Professional legal review required before publication."
      />
      <section className="section">
        <div className="container content-card legal-content">
          <p>
            Editable privacy policy managed in the CMS legal-pages collection.
            Architecture supports PIPEDA, PHIPA where applicable, and province-specific compliance layers.
          </p>
          {legal?.reviewRequired ? (
            <p className="legal-note">This page is not yet approved for publication.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
