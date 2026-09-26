import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fundingPage" });
  return buildPageMetadata({
    locale,
    path: "/funding",
    title: t("metaTitle"),
    description: t("lead"),
  });
}

export default async function FundingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "fundingPage" });
  const sections = t.raw("sections") as Array<{ title: string; body: string }>;

  return (
    <>
      <PageHero locale={locale} eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} crumbLabel={t("eyebrow")} />
      <PageSection>
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section) => (
            <article key={section.title}>
              <SectionTitle title={section.title} />
              <p className="mt-4 text-lg leading-relaxed text-body">{section.body}</p>
            </article>
          ))}
          <p className="rounded-sm border border-line bg-blush-soft p-5 text-sm leading-relaxed text-body">
            {t("reviewNotice")}
          </p>
        </div>
      </PageSection>
      <CallToAction locale={locale} />
    </>
  );
}
