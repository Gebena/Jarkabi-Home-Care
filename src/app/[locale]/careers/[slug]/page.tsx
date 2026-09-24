import { JobApplicationForm } from "@/components/forms/job-application-form";
import { PageHero } from "@/components/layout/page-hero";
import type { Locale } from "@/i18n/routing";
import { getCareer } from "@/lib/cms";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const job = await getCareer(slug, locale as Locale);
  return { title: job?.title ? String(job.title) : "Careers" };
}

export default async function CareerDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const job = await getCareer(slug, locale as Locale);

  if (!job) notFound();

  const title = String(job.title);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={title}
        lead={String(job.summary ?? "")}
      />
      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-sidebar">
            <p><strong>Profession:</strong> {String(job.profession ?? "—")}</p>
            <p><strong>Employment type:</strong> {String(job.employmentType ?? "—")}</p>
            <p className="legal-note">[REVIEW REQUIRED] Employment privacy notice before production.</p>
          </aside>
          <JobApplicationForm locale={locale} jobTitle={title} />
        </div>
      </section>
    </>
  );
}
