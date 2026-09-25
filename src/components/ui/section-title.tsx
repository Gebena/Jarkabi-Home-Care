import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * `blush` renders plum type rather than Care Giver's white, which only reaches
 * about 1.9:1 against the rose band.
 */
type Tone = "dark" | "light" | "blush";

type SectionTitleProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
};

const toneStyles: Record<Tone, { heading: string; subtitle: string; rule: string }> = {
  dark: { heading: "", subtitle: "text-body", rule: "bg-tan" },
  light: { heading: "text-white", subtitle: "text-white/80", rule: "bg-white/70" },
  blush: { heading: "text-plum", subtitle: "text-plum", rule: "bg-white" },
};

/**
 * Care Giver's heading pattern: a serif title with a muted subtitle finished by a
 * short rule. Centred variants put the rule beneath the title instead.
 */
export function SectionTitle({
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: SectionTitleProps) {
  const centered = align === "center";
  const styles = toneStyles[tone];

  return (
    <div className={cn(centered && "mx-auto max-w-3xl text-center", className)}>
      <h2 className={cn("font-display text-2xl sm:text-3xl lg:text-[2.35rem]", styles.heading)}>
        {title}
      </h2>

      {centered ? (
        <span aria-hidden="true" className={cn("mx-auto mt-4 block h-0.5 w-12", styles.rule)} />
      ) : null}

      {subtitle ? (
        <div className={cn("mt-3 flex items-center gap-4", centered && "justify-center")}>
          <p className={cn("text-sm", styles.subtitle)}>{subtitle}</p>
          {centered ? null : (
            <span aria-hidden="true" className={cn("h-0.5 w-10 shrink-0", styles.rule)} />
          )}
        </div>
      ) : null}
    </div>
  );
}
