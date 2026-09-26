import { LegalPageContent } from "@/components/legal/legal-page-content";
import { locales } from "@/i18n/routing";
import {
  isLegalPageSlug,
  LEGAL_PAGE_SLUGS,
  LEGAL_PAGES,
  legalPagePath,
  type LegalPageSlug,
} from "@/lib/legal-pages";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    LEGAL_PAGE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLegalPageSlug(slug)) {
    return { title: "Legal" };
  }

  const config = LEGAL_PAGES[slug];
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const tLegal = await getTranslations({ locale, namespace: "legalPages" });
  const title = tFooter(config.footerKey);
  const description = tLegal(`${config.i18nKey}Lead` as "privacyLead");

  return buildPageMetadata({
    locale,
    path: legalPagePath(slug),
    title,
    description,
  });
}

export default async function LegalDocumentPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isLegalPageSlug(slug)) {
    notFound();
  }

  return <LegalPageContent locale={locale} slug={slug as LegalPageSlug} />;
}
