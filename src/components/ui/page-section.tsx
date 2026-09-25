import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "white" | "mist" | "blush" | "plum";

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  blush: "bg-blush-soft",
  plum: "bg-plum text-white",
};

type PageSectionProps = {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
};

/**
 * The band an inner page is built from: Care Giver's vertical rhythm and the
 * same 1240px measure the homepage sections use, so alternating bands line up
 * across pages.
 */
export function PageSection({ children, tone = "white", id, className }: PageSectionProps) {
  return (
    <section id={id} className={cn("py-16 lg:py-20", tones[tone], className)}>
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">{children}</div>
    </section>
  );
}
