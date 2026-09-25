import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
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
        {posts.length > 0 ? (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <article className="group flex h-full flex-col bg-white">
                  <div className="relative aspect-3/2 overflow-hidden">
                    <Image
                      src={blogFallbackImages[index % blogFallbackImages.length].src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    {post.category ? (
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-tan-ink">
                        {post.category}
                      </p>
                    ) : null}

                    <h2 className="mt-3 font-display text-lg text-ink">
                      <Link
                        href={`/${locale}/resources/${post.slug}`}
                        className="transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{post.excerpt}</p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral">
                      {t("read")}
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-2xl border border-line bg-white p-10 text-center">
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
      </PageSection>
    </>
  );
}
