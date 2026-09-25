import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { ResourcesSidebar } from "@/components/resources/resources-sidebar";
import type { Locale } from "@/i18n/routing";
import { caregiverBlogImages } from "@/lib/caregiver-assets";
import { getBlogPost, getBlogPosts } from "@/lib/cms";
import { lexicalToParagraphs } from "@/lib/rich-text";
import { blogFallbackImages } from "@/lib/site-images";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
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
  const [post, posts, t] = await Promise.all([
    getBlogPost(slug, locale as Locale),
    getBlogPosts(locale as Locale),
    getTranslations({ locale, namespace: "resourcesPage" }),
  ]);

  if (!post) notFound();

  const body = "body" in post ? post.body : undefined;
  const paragraphs = body ? lexicalToParagraphs(body) : [];
  const content =
    paragraphs.length > 0 ? paragraphs : [String(post.excerpt ?? "")];

  const heroIndex = posts.findIndex((entry) => entry.slug === slug);
  const heroImage =
    ("image" in post && post.image) ||
    caregiverBlogImages[(heroIndex >= 0 ? heroIndex : 0) % caregiverBlogImages.length] ||
    blogFallbackImages[0].src;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={String(post.category ?? "Resource")}
        title={String(post.title)}
        lead={String(post.excerpt ?? "")}
        breadcrumbs={[{ label: t("crumb"), href: `/${locale}/resources` }]}
      />

      <PageSection>
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
          <article className="min-w-0">
            <div className="relative mb-10 aspect-[16/7] overflow-hidden">
              <Image
                src={heroImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 65vw"
                className="object-cover"
              />
            </div>

            <div className="max-w-3xl text-base leading-relaxed text-body">
              {content.map((paragraph) => (
                <p key={paragraph} className="mt-6 first:mt-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <ResourcesSidebar
            locale={locale}
            posts={posts.filter((entry) => entry.slug !== slug)}
            labels={{
              categoriesTitle: t("sidebarCategories"),
              recentTitle: t("sidebarRecent"),
              searchPlaceholder: t("sidebarSearch"),
              categories: t.raw("sidebarCategoryList") as string[],
            }}
          />
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
