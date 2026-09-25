import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  /** `light` is used on dark plum surfaces such as the footer. */
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const wordSize = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
} as const;

const markSize = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
} as const;

/**
 * Care Giver sets a large serif wordmark over a small letter-spaced descriptor
 * finished with a short tan rule. JARKABI stays visually dominant; HOME CARE
 * reads as the descriptor.
 */
export function BrandWordmark({ tone = "dark", size = "md", className }: BrandWordmarkProps) {
  const isLight = tone === "light";

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid shrink-0 place-items-center rounded-sm bg-tan font-display font-bold tracking-widest text-plum",
          markSize[size],
        )}
      >
        JK
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-wide",
            wordSize[size],
            isLight ? "text-white" : "text-plum",
          )}
        >
          JARKABI
        </span>
        <span className="mt-1 flex items-center gap-2">
          <span
            className={cn(
              "text-[0.6rem] font-semibold uppercase tracking-[0.22em]",
              isLight ? "text-white/70" : "text-body",
            )}
          >
            Home Care
          </span>
          <span aria-hidden="true" className="h-px w-5 bg-tan" />
        </span>
      </span>
    </span>
  );
}
