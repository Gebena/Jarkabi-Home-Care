import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
import { getBlogPost } from "@/lib/cms";
import { lexicalToParagraphs } from "@/lib/rich-text";
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

  const paragraphs = lexicalToParagraphs(post.body);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={String(post.category ?? "Resource")}
        title={String(post.title)}
        lead={String(post.excerpt ?? "")}
      />
      <PageSection>
        <div className="mx-auto max-w-3xl text-base leading-relaxed text-body">
          {(paragraphs.length > 0 ? paragraphs : [String(post.excerpt ?? "")]).map((paragraph) => (
            <p key={paragraph} className="mt-6 first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      </PageSection>
      <CallToAction locale={locale} />
    </>
  );
}
