import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  /** `light` for navy / plum footer surfaces. */
  tone?: "dark" | "light";
  layout?: "stacked" | "horizontal";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const wordSize = {
  sm: "text-base tracking-[0.14em]",
  md: "text-xl tracking-[0.16em]",
  lg: "text-2xl tracking-[0.16em]",
} as const;

const descriptorSize = {
  sm: "text-[0.55rem] tracking-[0.42em]",
  md: "text-[0.62rem] tracking-[0.46em]",
  lg: "text-[0.68rem] tracking-[0.46em]",
} as const;

const symbolSize = {
  sm: 28,
  md: 36,
  lg: 44,
} as const;

/**
 * Master prompt §6 — stacked serif JARKABI wordmark, gold rule, HOME CARE descriptor,
 * and the Embrace symbol (stylized J holding a gold dot).
 */
export function BrandWordmark({
  tone = "dark",
  layout = "horizontal",
  size = "md",
  className,
}: BrandWordmarkProps) {
  const isLight = tone === "light";
  const navy = isLight ? "text-[#F6F1E8]" : "text-[#1C2B45]";
  const sage = isLight ? "text-[#B9CDBF]" : "text-[#4E6A58]";
  const rule = isLight ? "bg-[#C4A574]" : "bg-[#B08D57]";

  const symbol = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/embrace-symbol.svg"
      alt=""
      aria-hidden
      width={symbolSize[size]}
      height={Math.round(symbolSize[size] * 1.3)}
      className={cn("shrink-0", isLight && "brightness-0 invert")}
    />
  );

  const wordmark = (
    <span className="flex flex-col leading-none">
      <span className={cn("font-display font-semibold", wordSize[size], navy)}>JARKABI</span>
      <span className={cn("mt-1.5 h-px w-8", rule)} aria-hidden="true" />
      <span className={cn("mt-1.5 font-sans font-medium uppercase", descriptorSize[size], sage)}>
        Home Care
      </span>
    </span>
  );

  if (layout === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center gap-2 text-center", className)}>
        {symbol}
        {wordmark}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {symbol}
      <span className={cn("hidden h-10 w-px sm:block", rule)} aria-hidden="true" />
      {wordmark}
    </span>
  );
}
