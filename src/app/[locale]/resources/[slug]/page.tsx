import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import type { Locale } from "@/i18n/routing";
import { getBlogPost } from "@/lib/cms";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getBlogPost(slug, locale as Locale);
  return { title: post?.title ? String(post.title) : "Resource" };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getBlogPost(slug, locale as Locale);

  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={String(post.category ?? "Resource")}
        title={String(post.title)}
        lead={String(post.excerpt ?? "")}
      />
      <section className="section">
        <div className="container content-card legal-content">
          <p>Article body managed in CMS. [Human translation required for non-EN/FR locales]</p>
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
