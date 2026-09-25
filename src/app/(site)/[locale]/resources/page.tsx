import { BlogPostCard } from "@/components/blog/blog-post-card";
import { PageHero } from "@/components/layout/page-hero";
import { ResourcesSidebar } from "@/components/resources/resources-sidebar";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
import { caregiverBlogImages } from "@/lib/caregiver-assets";
import { getBlogPosts } from "@/lib/cms";
import { blogFallbackImages } from "@/lib/site-images";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resourcesPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "resourcesPage" });
  const posts = await getBlogPosts(locale as Locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      <PageSection tone="mist">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
          <div className="min-w-0">
            {posts.length > 0 ? (
              <ul className="space-y-10">
                {posts.map((post, index) => {
                  const imageSrc =
                    post.image ??
                    caregiverBlogImages[index % caregiverBlogImages.length] ??
                    blogFallbackImages[index % blogFallbackImages.length].src;

                  return (
                    <li key={post.slug}>
                      <BlogPostCard
                        locale={locale}
                        slug={post.slug}
                        title={post.title}
                        excerpt={post.excerpt}
                        imageSrc={imageSrc}
                        readLabel={t("read")}
                        category={post.category}
                        publishedAt={post.publishedAt}
                        variant="list"
                      />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="border border-line bg-white p-10 text-center">
                <h2 className="font-display text-xl text-ink">{t("emptyTitle")}</h2>
                <p className="mt-4 text-base leading-relaxed text-body">{t("emptyBody")}</p>
                <Link
                  href={`/${locale}/contact`}
                  className="mt-7 inline-block bg-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
                >
                  {t("emptyCta")}
                </Link>
              </div>
            )}
          </div>

          <ResourcesSidebar
            locale={locale}
            posts={posts}
            labels={{
              categoriesTitle: t("sidebarCategories"),
              recentTitle: t("sidebarRecent"),
              searchPlaceholder: t("sidebarSearch"),
              widgetTitle: t("sidebarWidgetTitle"),
              widgetButton: t("sidebarWidgetButton"),
              categories: t.raw("sidebarCategoryList") as string[],
            }}
          />
        </div>
      </PageSection>
    </>
  );
}
