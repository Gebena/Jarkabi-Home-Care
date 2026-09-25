import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
  locale: string;
  slug: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  readLabel: string;
  category?: string | null;
  publishedAt?: string | null;
  /** Grid cards on the homepage; list cards on the resources index. */
  variant?: "grid" | "list";
};

/**
 * Care Giver news card — wide image, meta line, serif title, coral read link.
 */
export function BlogPostCard({
  locale,
  slug,
  title,
  excerpt,
  imageSrc,
  readLabel,
  category,
  publishedAt,
  variant = "grid",
}: BlogPostCardProps) {
  const href = `/${locale}/resources/${slug}`;
  const isList = variant === "list";

  return (
    <article
      className={cn(
        "group overflow-hidden bg-white",
        isList ? "border border-line" : "shadow-sm transition-shadow duration-300 hover:shadow-md",
      )}
    >
      <Link
        href={href}
        tabIndex={isList ? undefined : -1}
        aria-hidden={isList ? undefined : true}
        className={cn(
          "relative block overflow-hidden",
          isList ? "aspect-[16/7]" : "aspect-[3/2]",
        )}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes={isList ? "(max-width: 1024px) 92vw, 65vw" : "(max-width: 768px) 90vw, 30vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className={cn(isList ? "border-t border-line p-7" : "flex flex-1 flex-col p-6")}>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.14em] text-body">
          {publishedAt ? (
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          ) : category ? (
            <span>{category}</span>
          ) : null}
          {category && publishedAt ? <span>{category}</span> : null}
        </div>

        <h2
          className={cn(
            "font-display text-ink",
            isList ? "mt-4 text-xl" : "mt-3 text-lg",
          )}
        >
          <Link
            href={href}
            className="transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
          >
            {title}
          </Link>
        </h2>

        <p className={cn("text-sm leading-relaxed text-body", isList ? "mt-4" : "mt-2 flex-1")}>
          {excerpt}
        </p>

        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral transition-colors hover:text-tan-ink",
            isList ? "mt-5" : "mt-5",
          )}
        >
          {readLabel}
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
