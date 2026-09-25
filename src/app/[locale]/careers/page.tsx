import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import type { Locale } from "@/i18n/routing";
import { getCareers } from "@/lib/cms";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careersPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

/** Roles Jarkabi recruits for, shown whether or not a posting is open. */
const roles = [
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
  const t = await getTranslations({ locale, namespace: "careersPage" });
  const jobs = await getCareers(locale as Locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      {jobs.length > 0 ? (
        <PageSection tone="mist">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <li key={job.slug}>
                <article className="flex h-full flex-col border border-line bg-white p-7">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-tan-ink">
                    {job.profession} · {job.employmentType}
                  </p>
                  <h2 className="mt-3 font-display text-lg text-ink">{job.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{job.summary}</p>
                  <Link
                    href={`/${locale}/careers/${job.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                  >
                    {t("apply")}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </PageSection>
      ) : (
        <PageSection tone="mist">
          <div className="mx-auto max-w-2xl border border-line bg-white p-10 text-center">
            <h2 className="font-display text-xl text-ink">{t("emptyTitle")}</h2>
            <p className="mt-4 text-base leading-relaxed text-body">{t("emptyBody")}</p>
            <Link
              href={`/${locale}/contact`}
              className="mt-7 inline-block bg-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
            >
              {t("emptyCta")}
            </Link>
          </div>
        </PageSection>
      )}

      <PageSection>
        <SectionTitle align="center" title={t("rolesTitle")} />
        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {roles.map((role) => (
            <li
              key={role}
              className="border border-line px-5 py-2.5 text-sm font-medium text-ink"
            >
              {role}
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
