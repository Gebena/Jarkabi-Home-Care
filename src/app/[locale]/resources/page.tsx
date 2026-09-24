import { PageHero } from "@/components/layout/page-hero";
import type { Locale } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/cms";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Resources" };

const categories = [
  "Aging at Home",
  "Choosing Home Care",
  "Hospital Discharge",
  "Dementia",
  "Caregiver Support",
  "Home Safety",
  "Canadian Home-Care Information",
];

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getBlogPosts(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Educational resources for families and partners"
        lead="Articles, guides and province-specific information — published from the admin dashboard."
      />
      <section className="section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="card-grid">
              {posts.map((post) => (
                <article key={post.slug} className="content-card">
                  <p className="eyebrow">{post.category}</p>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <Link href={`/${locale}/resources/${post.slug}`} className="text-link">
                    Read article
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="card-grid">
              {categories.map((category) => (
                <article key={category} className="content-card">
                  <h2>{category}</h2>
                  <p>Articles will appear here when published in the CMS. [PLACEHOLDER]</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
