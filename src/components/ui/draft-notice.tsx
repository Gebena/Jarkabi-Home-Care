import { Info } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Public, honest replacement for the "[REVIEW REQUIRED]" markers that used to
 * sit in page copy: it tells a reader the page is not final, rather than
 * leaking an internal workflow token into the sentence they are reading.
 */
export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <p
      role="note"
      className="flex items-start gap-3 border-s-2 border-tan bg-blush-soft px-5 py-4 text-sm leading-relaxed text-plum"
    >
      <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
      {children}
    </p>
  );
}
