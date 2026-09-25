"use client";

import { ContactSidebarWidget } from "@/components/ui/contact-sidebar-widget";
import type { BlogPostData } from "@/lib/cms";
import { caregiverBlogThumbs } from "@/lib/caregiver-assets";
import { blogFallbackImages } from "@/lib/site-images";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

type ResourcesSidebarProps = {
  locale: string;
  posts: BlogPostData[];
  labels: {
    categoriesTitle: string;
    recentTitle: string;
    searchPlaceholder: string;
    categories: string[];
    widgetTitle: string;
    widgetButton: string;
  };
};

/**
 * Care Giver `blog.html` sidebar — lined category list, recent posts with
 * thumbnails, and the teal contact widget.
 */
export function ResourcesSidebar({ locale, posts, labels }: ResourcesSidebarProps) {
  const [query, setQuery] = useState("");
  const recent = posts.slice(0, 4);

  const filteredCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return labels.categories;
    return labels.categories.filter((category) => category.toLowerCase().includes(normalized));
  }, [labels.categories, query]);

  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <div>
        <label className="sr-only" htmlFor="resource-sidebar-search">
          {labels.searchPlaceholder}
        </label>
        <input
          id="resource-sidebar-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.searchPlaceholder}
          className="w-full border border-demo-sidebar-border bg-white px-4 py-3 text-sm text-ink placeholder:text-body/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-demo-navy"
        />
      </div>

      <nav aria-label={labels.categoriesTitle}>
        <h2 className="font-display text-lg text-demo-navy">{labels.categoriesTitle}</h2>
        <ul className="mt-4">
          {filteredCategories.map((category) => (
            <li key={category} className="mb-px">
              <Link
                href={`/${locale}/resources`}
                className="block border border-demo-sidebar-border bg-demo-sidebar-bg px-5 py-3.5 text-sm font-medium text-demo-navy transition-colors hover:border-demo-navy hover:bg-demo-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-demo-navy"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {recent.length > 0 ? (
        <div>
          <h2 className="font-display text-lg text-demo-navy">{labels.recentTitle}</h2>
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
                      className="relative h-16 w-16 shrink-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-demo-navy"
                    >
                      <Image src={thumb} alt="" fill sizes="64px" className="object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        href={`/${locale}/resources/${post.slug}`}
                        className="line-clamp-2 font-display text-sm leading-snug text-demo-navy transition-colors hover:text-coral"
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

      <ContactSidebarWidget
        locale={locale}
        title={labels.widgetTitle}
        buttonLabel={labels.widgetButton}
      />
    </aside>
  );
}
