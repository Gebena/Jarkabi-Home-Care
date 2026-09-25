import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { caregiverGalleryImages } from "@/lib/caregiver-assets";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galleryPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tNav] = await Promise.all([
    getTranslations({ locale, namespace: "galleryPage" }),
    getTranslations({ locale, namespace: "nav" }),
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

      <PageSection tone="mist">
        <SectionTitle align="center" title={t("sectionTitle")} subtitle={t("sectionLead")} />
        <div className="mt-12">
          <GalleryGrid
            images={[...caregiverGalleryImages]}
            altPrefix={t("imageAlt")}
            closeLabel={t("lightboxClose")}
            previousLabel={t("lightboxPrevious")}
            nextLabel={t("lightboxNext")}
          />
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
