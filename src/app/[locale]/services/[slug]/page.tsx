import { BlockRenderer } from "@/components/blocks/block-renderer";
import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import type { Locale } from "@/i18n/routing";
import { getServices } from "@/lib/cms";
import { getPayloadClient } from "@/lib/payload";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; slug: string }> };

const specialtySlugs = new Set([
  "nursing",
  "dementia-care",
  "post-hospital-care",
  "respite-care",
  "palliative-care",
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const services = await getServices(locale as Locale);
  const service = services.find((item) => item.slug === slug);
  return { title: service?.title ?? slug.replace(/-/g, " ") };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;
  const services = await getServices(lang);
  const service = services.find((item) => item.slug === slug);

  if (!service && !specialtySlugs.has(slug)) notFound();

  let blocks = null;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      locale: lang,
      where: { slug: { equals: slug } },
      limit: 1,
    });
    blocks = result.docs[0]?.blocks ?? null;
  } catch {
    blocks = null;
  }

  const title = service?.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const lead = service?.summary ?? "Editable clinical and service content. [REVIEW REQUIRED]";

  return (
    <>
      <PageHero eyebrow="Service" title={title} lead={lead} />
      <BlockRenderer blocks={blocks as never} locale={locale} />
      <section className="section">
        <div className="container content-stack">
          <article className="content-card">
            <h2>Who this service is for</h2>
            <p>Editable overview content managed in the CMS. [PLACEHOLDER]</p>
          </article>
          <article className="content-card">
            <h2>Available locations</h2>
            <p>Ottawa, Ontario — ACTIVE. Other provinces and cities display only when activated in admin.</p>
          </article>
          <article className="content-card">
            <h2>How care begins</h2>
            <p>Consultation, assessment, personalized care plan and ongoing review. [REVIEW REQUIRED for clinical claims]</p>
          </article>
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
