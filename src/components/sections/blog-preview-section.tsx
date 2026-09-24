import type { BlogPostData } from "@/lib/cms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { blogFallbackImages } from "@/lib/service-images";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type BlogPreviewSectionProps = {
  locale: string;
  posts: BlogPostData[];
};

function formatDateParts(dateStr: string) {
  try {
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString("en-CA", { month: "short" }),
    };
  } catch {
    return { day: "01", month: "Jan" };
  }
}

export async function BlogPreviewSection({ locale, posts }: BlogPreviewSectionProps) {
  const t = await getTranslations("blog");
  const base = `/${locale}`;

  const fallbackPosts = [
    { slug: "home-safety", title: t("fallback1Title"), excerpt: t("fallback1Excerpt"), publishedAt: "" },
    { slug: "choosing-care", title: t("fallback2Title"), excerpt: t("fallback2Excerpt"), publishedAt: "" },
    { slug: "family-guide", title: t("fallback3Title"), excerpt: t("fallback3Excerpt"), publishedAt: "" },
  ];

  const items = posts.length >= 3
    ? posts.slice(0, 3)
    : fallbackPosts;

  return (
    <section className="section muted-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("title")}</h2>
            <p className="section-lead">{t("subtitle")}</p>
          </div>
        </ScrollReveal>
        <div className="blog-grid">
          {items.map((post, index) => {
            const dateParts = post.publishedAt
              ? formatDateParts(post.publishedAt)
              : { day: "01", month: t("recent") };
            return (
              <ScrollReveal key={post.slug} delay={index * 80}>
                <article className="blog-card">
                  <div className="blog-card-image">
                    <img src={blogFallbackImages[index]} alt="" loading="lazy" />
                    <span className="blog-date-badge">
                      <span className="blog-date-day">{dateParts.day}</span>
                      <span className="blog-date-month">{dateParts.month}</span>
                    </span>
                  </div>
                  <div className="blog-card-body">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <Link href={`${base}/resources/${post.slug}`} className="text-link">
                      {t("readMore")}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link className="button button-secondary" href={`${base}/resources`}>
            {t("viewAll")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
