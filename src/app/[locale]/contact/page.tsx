import { CareRequestForm } from "@/components/forms/care-request-form";
import { PageHero } from "@/components/layout/page-hero";
import { defaultBrand } from "@/lib/brand";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("form");

  return (
    <>
      <PageHero eyebrow="Contact" title={t("title")} lead={t("subtitle")} />
      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-sidebar">
            <h2>Reach our care team</h2>
            <p><strong>Email</strong><br /><a href={`mailto:${defaultBrand.email}`}>{defaultBrand.email}</a></p>
            <p><strong>Phone</strong><br />{defaultBrand.primaryPhone}</p>
            <p><strong>Office</strong><br />{defaultBrand.ottawaOfficeAddress}</p>
            <p><strong>Hours</strong><br />{defaultBrand.businessHours}</p>
          </aside>
          <CareRequestForm locale={locale} />
        </div>
      </section>
    </>
  );
}
