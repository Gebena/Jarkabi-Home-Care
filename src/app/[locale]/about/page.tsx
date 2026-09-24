import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "About" };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Rooted in respect, built for Canadian families"
        lead="Our mission, values and growth vision are fully editable from the administration dashboard. [REVIEW REQUIRED]"
      />
      <section className="section">
        <div className="container editorial-grid">
          <article className="content-card">
            <h2>Our Story</h2>
            <p>[FOUNDER NAME] and our leadership team are committed to compassionate home care beginning in Ottawa, Ontario — with a national platform designed to expand thoughtfully. [PLACEHOLDER]</p>
          </article>
          <article className="content-card">
            <h2>Our Mission</h2>
            <p>To help people live safely, independently and with dignity in the comfort of home — with professional care and personal connection.</p>
          </article>
          <article className="content-card">
            <h2>Our Vision</h2>
            <p>A trusted Canadian home-care organization that combines local heart with national capability, cultural responsiveness and clinical professionalism.</p>
          </article>
          <article className="content-card">
            <h2>Clinical Leadership</h2>
            <p>[CLINICAL DIRECTOR] · [CARE DIRECTOR] — profiles editable in admin. [PLACEHOLDER]</p>
          </article>
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
