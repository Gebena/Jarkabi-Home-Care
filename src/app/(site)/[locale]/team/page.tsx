import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { TeamIntroSection } from "@/components/team/team-intro-section";
import { TeamGrid } from "@/components/team/team-grid";
import type { Locale } from "@/i18n/routing";
import { getTeamMembers } from "@/lib/cms";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teamPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tNav, members] = await Promise.all([
    getTranslations({ locale, namespace: "teamPage" }),
    getTranslations({ locale, namespace: "nav" }),
    getTeamMembers(locale as Locale),
  ]);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
        breadcrumbs={[{ label: tNav("about"), href: `/${locale}/about` }]}
      />

      <TeamIntroSection
        introTitle={t("introTitle")}
        introBody={t("introBody")}
        highlights={t.raw("introHighlights") as string[]}
      />

      <PageSection tone="mist">
        <SectionTitle align="center" title={t("sectionTitle")} subtitle={t("sectionLead")} />
        <div className="mt-12">
          <TeamGrid members={members} />
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
