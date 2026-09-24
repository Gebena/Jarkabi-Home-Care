import { ReferralForm } from "@/components/forms/referral-form";
import { PageHero } from "@/components/layout/page-hero";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Professional Referrals" };

export default async function ReferralsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="Referrals"
        title="Refer a client with confidence"
        lead="For hospitals, physicians, nurses, social workers, case managers and community partners. Province-specific referral contacts configurable in admin."
      />
      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-sidebar">
            <h2>Referral partners</h2>
            <p>Hospital discharge planners, rehabilitation teams, retirement residences and community organizations. [PLACEHOLDER]</p>
            <p className="legal-note">[REVIEW REQUIRED] Referral privacy notice required before production.</p>
          </aside>
          <ReferralForm locale={locale} />
        </div>
      </section>
    </>
  );
}
