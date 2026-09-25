import type { BlogPostData } from "@/lib/cms";
import { caregiverBlogThumbs } from "@/lib/caregiver-assets";
import { blogFallbackImages } from "@/lib/site-images";
import Link from "next/link";
import Image from "next/image";

type ResourcesSidebarProps = {
  locale: string;
  posts: BlogPostData[];
  labels: {
    categoriesTitle: string;
    recentTitle: string;
    searchPlaceholder: string;
    categories: string[];
  };
};

/**
 * Care Giver `blog.html` / `blog-detail.html` sidebar — categories and recent posts.
 */
export function ResourcesSidebar({ locale, posts, labels }: ResourcesSidebarProps) {
  const recent = posts.slice(0, 4);

  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <div>
        <label className="sr-only" htmlFor="resource-sidebar-search">
          {labels.searchPlaceholder}
        </label>
        <input
          id="resource-sidebar-search"
          type="search"
          readOnly
          placeholder={labels.searchPlaceholder}
          className="w-full border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-body/70"
        />
      </div>

      <nav aria-label={labels.categoriesTitle}>
        <h2 className="font-display text-lg text-ink">{labels.categoriesTitle}</h2>
        <ul className="mt-4 border border-line bg-white">
          {labels.categories.map((category) => (
            <li key={category} className="border-b border-line last:border-b-0">
              <Link
                href={`/${locale}/resources`}
                className="block px-5 py-3 text-sm text-ink transition-colors hover:bg-mist hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-plum"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {recent.length > 0 ? (
        <div>
          <h2 className="font-display text-lg text-ink">{labels.recentTitle}</h2>
          <ul className="mt-4 space-y-5">
            {recent.map((post, index) => {
              const thumb =
                post.image ??
                caregiverBlogThumbs[index % caregiverBlogThumbs.length] ??
                blogFallbackImages[index % blogFallbackImages.length].src;
              return (
                <li key={post.slug}>
                  <article className="flex gap-4">
                    <Link
                      href={`/${locale}/resources/${post.slug}`}
                      className="relative h-16 w-16 shrink-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                    >
                      <Image src={thumb} alt="" fill sizes="64px" className="object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        href={`/${locale}/resources/${post.slug}`}
                        className="line-clamp-2 text-sm leading-snug text-ink transition-colors hover:text-plum"
                      >
                        {post.title}
                      </Link>
                      {post.publishedAt ? (
                        <time
                          dateTime={post.publishedAt}
                          className="mt-1 block text-xs text-body"
                        >
                          {new Date(post.publishedAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
