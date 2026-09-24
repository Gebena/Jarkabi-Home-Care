import { PageHero } from "@/components/layout/page-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { CtaSection } from "@/components/sections/cta-section";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "How Care Works" };

export default async function HowCareWorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="How Care Works"
        title="A clear, reassuring path to care at home"
        lead="From first conversation through ongoing review — every step is designed to be understandable for families and referral partners."
      />
      <ProcessSection />
      <section className="section muted-section">
        <div className="container content-stack">
          <article className="content-card">
            <h2>Family communication</h2>
            <p>Regular updates and responsive coordination — content editable in CMS. [PLACEHOLDER]</p>
          </article>
          <article className="content-card">
            <h2>Supervision & review</h2>
            <p>Clinical oversight and quality improvement processes. [REVIEW REQUIRED]</p>
          </article>
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
