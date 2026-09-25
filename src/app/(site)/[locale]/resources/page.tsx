import { PageHero } from "@/components/layout/page-hero";
import { ResourcesSidebar } from "@/components/resources/resources-sidebar";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
import { caregiverBlogImages } from "@/lib/caregiver-assets";
import { getBlogPosts } from "@/lib/cms";
import { blogFallbackImages } from "@/lib/site-images";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
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
                      <article className="group overflow-hidden bg-white">
                        <Link
                          href={`/${locale}/resources/${post.slug}`}
                          className="relative block aspect-[16/7] overflow-hidden"
                        >
                          <Image
                            src={imageSrc}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 92vw, 65vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>

                        <div className="border border-line border-t-0 p-7">
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.14em] text-body">
                            {post.publishedAt ? (
                              <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString(locale, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </time>
                            ) : (
                              <span>{t("recent")}</span>
                            )}
                            {post.category ? <span>{post.category}</span> : null}
                          </div>

                          <h2 className="mt-4 font-display text-xl text-ink">
                            <Link
                              href={`/${locale}/resources/${post.slug}`}
                              className="transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                            >
                              {post.title}
                            </Link>
                          </h2>

                          <p className="mt-4 text-sm leading-relaxed text-body">{post.excerpt}</p>

                          <Link
                            href={`/${locale}/resources/${post.slug}`}
                            className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral transition-colors hover:text-tan-ink"
                          >
                            {t("read")}
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                      </article>
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
