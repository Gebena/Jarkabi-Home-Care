import { PageHero } from "@/components/layout/page-hero";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Accessibility" };

export default async function AccessibilityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero title="Accessibility Statement" lead="Target: WCAG 2.2 AA. [REVIEW REQUIRED]" />
      <section className="section">
        <div className="container content-card legal-content">
          <p>Editable accessibility statement covering keyboard navigation, contrast, screen readers, and senior-friendly interfaces.</p>
        </div>
      </section>
    </>
  );
}
