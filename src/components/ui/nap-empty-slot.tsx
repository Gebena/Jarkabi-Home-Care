import { cn } from "@/lib/utils";

/** Reserved vertical space for phone or address until values are supplied. */
export function NapEmptySlot({
  label,
  inverted = false,
}: {
  label: string;
  inverted?: boolean;
}) {
  return (
    <span
      aria-label={label}
      className={cn(
        "inline-block min-h-[1.25em] min-w-[10rem] border-b border-dotted",
        inverted ? "border-white/35" : "border-current/25",
      )}
    >
      {"\u00A0"}
    </span>
  );
}
