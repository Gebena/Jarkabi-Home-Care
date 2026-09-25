import { CareerDetailSidebar } from "@/components/careers/career-detail-sidebar";
import { JobApplicationForm } from "@/components/forms/job-application-form";
import { PageHero } from "@/components/layout/page-hero";
import { JsonLd, jobPostingJsonLd } from "@/components/seo/json-ld";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
import { getCareer } from "@/lib/cms";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const tCareers = await getTranslations({ locale, namespace: "careersPage" });
  const title = String(job.title);

  return (
    <>
      <JsonLd
        data={jobPostingJsonLd({
          title,
          summary: String(job.summary ?? ""),
          slug,
          locale,
          employmentType: String(job.employmentType ?? "PART_TIME"),
        })}
      />
      <PageHero
        locale={locale}
        eyebrow={tCareers("eyebrow")}
        title={title}
        lead={String(job.summary ?? "")}
        breadcrumbs={[{ label: tCareers("crumb"), href: `/${locale}/careers` }]}
      />
      <PageSection tone="mist">
        <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
          <CareerDetailSidebar
            locale={locale}
            professionLabel={tCareers("professionLabel")}
            profession={String(job.profession ?? "—")}
            employmentTypeLabel={tCareers("employmentTypeLabel")}
            employmentType={String(job.employmentType ?? "—")}
            privacyNote={tCareers("applicationPrivacy")}
            widgetTitle={tCareers("sidebarWidgetTitle")}
            widgetButton={tCareers("sidebarWidgetButton")}
          />

          <div className="min-w-0 border border-line bg-white p-8 lg:p-10">
            <JobApplicationForm locale={locale} jobTitle={title} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
