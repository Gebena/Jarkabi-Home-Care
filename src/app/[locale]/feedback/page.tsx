import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "feedbackPage" });
  return buildPageMetadata({
    locale,
    path: "/feedback",
    title: t("metaTitle"),
    description: t("lead"),
  });
}

export default async function FeedbackPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "feedbackPage" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const steps = t.raw("steps") as string[];

  return (
    <>
      <PageHero locale={locale} eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} crumbLabel={t("eyebrow")} />
      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionTitle title={t("processTitle")} />
            <ol className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-4 text-base leading-relaxed text-body">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-plum text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-body">{t("responseNote")}</p>
            <Link
              href={`/${locale}/legal/feedback-policy`}
              className="mt-4 inline-block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
            >
              {tFooter("feedbackPolicy")}
            </Link>
          </div>
          <div className="border border-line bg-white p-8">
            <SectionTitle title={t("formTitle")} />
            <p className="mt-3 text-base text-body">{t("formLead")}</p>
            <div className="mt-8">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      </PageSection>
      <CallToAction locale={locale} />
    </>
  );
}
