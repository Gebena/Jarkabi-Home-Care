import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type FeatureCardProps = {
  title: ReactNode;
  body: ReactNode;
  icon?: LucideIcon;
  /** Small ordinal shown instead of an icon, as on the Care Giver process row. */
  index?: number;
  /**
   * Heading level for the card title. Defaults to 3, which is right when the
   * grid sits under a section heading; pass 2 when the cards are the first
   * headings after the page title, so the outline does not skip a level.
   */
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

/**
 * Care Giver's editorial card: a hairline box, a tan marker, a serif heading and
 * body copy. Used wherever an inner page lists reasons, values or steps.
 */
export function FeatureCard({
  title,
  body,
  icon: Icon,
  index,
  headingLevel = 3,
  className,
}: FeatureCardProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <article
      className={cn(
        "flex h-full flex-col border border-line bg-white p-7 transition-colors hover:border-tan",
        className,
      )}
    >
      {Icon ? (
        <span aria-hidden="true" className="mb-5 grid h-12 w-12 place-items-center bg-blush-soft text-tan-ink">
          <Icon size={22} strokeWidth={1.5} />
        </span>
      ) : null}

      {index !== undefined ? (
        <span aria-hidden="true" className="mb-4 font-display text-2xl text-tan-ink">
          {String(index).padStart(2, "0")}
        </span>
      ) : null}

      <Heading className="font-display text-lg text-ink">{title}</Heading>
      <p className="mt-3 text-sm leading-relaxed text-body">{body}</p>
    </article>
  );
}
