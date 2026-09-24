import { PageHero } from "@/components/layout/page-hero";
import type { Locale } from "@/i18n/routing";
import { getCareers } from "@/lib/cms";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Careers" };

const placeholderRoles = [
  "Personal Support Worker",
  "Health Care Aide",
  "Registered Nurse",
  "Registered Practical Nurse",
  "Care Coordinator",
  "Clinical Lead",
];

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jobs = await getCareers(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join a team built on dignity and professionalism"
        lead="Search by province, city and profession. Apply online with resume upload."
      />
      <section className="section">
        <div className="container content-stack">
          {jobs.length > 0 ? (
            <div className="card-grid">
              {jobs.map((job) => (
                <article key={job.slug} className="content-card">
                  <h2>{job.title}</h2>
                  <p>{job.summary}</p>
                  <p className="legal-note">{job.profession} · {job.employmentType}</p>
                  <Link href={`/${locale}/careers/${job.slug}`} className="text-link">
                    View & apply
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="card-grid">
              {placeholderRoles.map((role) => (
                <article key={role} className="content-card">
                  <h2>{role}</h2>
                  <p>Open positions publish from the admin dashboard. [PLACEHOLDER]</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
