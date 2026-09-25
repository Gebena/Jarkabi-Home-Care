import { isRtlLocale, mirrorObjectPosition } from "@/lib/direction";
import { pageBannerImage } from "@/lib/site-images";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  /** Omitted for the current page, which renders as plain text. */
  href?: string;
};

type PageHeroProps = {
  locale: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  /**
   * Trail *above* this page. "Home" is prepended and the page itself appended,
   * so a services detail page only passes the Services link.
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Short name for the final crumb. Page titles are full sentences on several
   * pages, and "Home / Home care that adapts to your family" is not a trail.
   */
  crumbLabel?: string;
};

/**
 * Care Giver's inner-page banner: a photograph under a plum wash, a serif title
 * and the breadcrumb trail beneath it. Every page below the homepage opens with
 * this, which is what makes the inner pages feel like the homepage.
 */
export async function PageHero({
  locale,
  eyebrow,
  title,
  lead,
  breadcrumbs,
  crumbLabel,
}: PageHeroProps) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const rtl = isRtlLocale(locale);
  const position = rtl ? mirrorObjectPosition(pageBannerImage.position) : pageBannerImage.position;

  const trail: BreadcrumbItem[] = [
    { label: t("home"), href: `/${locale}` },
    ...(breadcrumbs ?? []),
    { label: crumbLabel ?? title },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-plum py-16 text-center md:py-24">
      <Image
        src={pageBannerImage.src}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: position }}
        className={cn(
          "absolute inset-0 -z-10 object-cover",
          Boolean(pageBannerImage.flip) !== rtl && "scale-x-[-1]",
        )}
      />
      {/* Opaque enough that white type clears AA over every part of the frame. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-plum/90" />

      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        {eyebrow ? (
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-tan">{eyebrow}</p>
        ) : null}

        <h1 className="mx-auto mt-3 max-w-4xl font-display text-3xl text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>

        {lead ? (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">{lead}</p>
        ) : null}

        <nav aria-label="Breadcrumb" className="mt-6">
          <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            {trail.map((item, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <ChevronRight
                      size={12}
                      aria-hidden="true"
                      className={cn("text-white/45", rtl && "scale-x-[-1]")}
                    />
                  ) : null}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="rounded-xs transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tan"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined} className="text-tan">
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
}
