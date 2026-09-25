import type { BlogPostData } from "@/lib/cms";
import { blogFallbackImages } from "@/lib/site-images";
import { ArrowRight } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";

type BlogPreviewProps = {
  locale: string;
  posts: BlogPostData[];
};

/**
 * Care Giver Home Page 01 "News & Articles": three cards with a wide image, a
 * date line, a serif title and a coral "continue reading" link.
 */
export function BlogPreview({ locale, posts }: BlogPreviewProps) {
  const t = useTranslations("blog");
  const format = useFormatter();

  if (posts.length === 0) return null;

  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle align="center" title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <li key={post.slug} className="group flex flex-col bg-white">
              <Link
                href={`/${locale}/resources/${post.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block aspect-[3/2] overflow-hidden"
              >
                <Image
                  src={blogFallbackImages[i % blogFallbackImages.length].src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-body">
                  {post.category}
                  {post.publishedAt ? (
                    <>
                      {" · "}
                      <time dateTime={post.publishedAt}>
                        {format.dateTime(new Date(post.publishedAt), {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </>
                  ) : null}
                </p>

                <h3 className="mt-3 font-display text-lg">
                  <Link
                    href={`/${locale}/resources/${post.slug}`}
                    className="transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{post.excerpt}</p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral">
                  {t("readMore")}
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
