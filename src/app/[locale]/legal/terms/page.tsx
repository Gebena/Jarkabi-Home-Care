import { PageHero } from "@/components/layout/page-hero";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Terms of Use" };

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero title="Terms of Use" lead="[REVIEW REQUIRED] — Professional legal review required before publication." />
      <section className="section">
        <div className="container content-card legal-content">
          <p>Editable terms template including care service disclaimer and website use terms.</p>
        </div>
      </section>
    </>
  );
}
