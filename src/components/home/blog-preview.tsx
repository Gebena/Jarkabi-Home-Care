import type { BlogPostData } from "@/lib/cms";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { caregiverBlogImages } from "@/lib/caregiver-assets";
import { blogFallbackImages } from "@/lib/site-images";
import { useTranslations } from "next-intl";
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

  if (posts.length === 0) return null;

  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle align="center" title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => {
            const imageSrc =
              post.image ??
              caregiverBlogImages[index % caregiverBlogImages.length] ??
              blogFallbackImages[index % blogFallbackImages.length].src;

            return (
              <li key={post.slug} className="flex flex-col">
                <BlogPostCard
                  locale={locale}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageSrc={imageSrc}
                  readLabel={t("readMore")}
                  category={post.category}
                  publishedAt={post.publishedAt}
                  variant="grid"
                />
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/resources`}
            className="inline-block border-2 border-plum px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-plum hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
