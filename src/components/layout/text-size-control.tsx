"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const STORAGE_KEY = "jarkabi-text-scale";
const LEVELS = [
  { id: "default", label: "A", scale: 1 },
  { id: "large", label: "A+", scale: 1.125 },
  { id: "xlarge", label: "A++", scale: 1.25 },
] as const;

/** Master prompt §10 — visible text-size control for older and low-vision visitors. */
export function TextSizeControl({
  className,
  overlay = false,
}: {
  className?: string;
  overlay?: boolean;
}) {
  const [active, setActive] = useState<(typeof LEVELS)[number]["id"]>("default");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as (typeof LEVELS)[number]["id"] | null;
    if (saved && LEVELS.some((level) => level.id === saved)) {
      setActive(saved);
      applyScale(saved);
    }
  }, []);

  function applyScale(id: (typeof LEVELS)[number]["id"]) {
    const level = LEVELS.find((entry) => entry.id === id) ?? LEVELS[0];
    document.documentElement.style.setProperty("--text-scale", String(level.scale));
    localStorage.setItem(STORAGE_KEY, id);
    setActive(id);
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border p-0.5",
        overlay ? "border-white/35 bg-white/10 backdrop-blur-sm" : "border-line bg-white",
        className,
      )}
      role="group"
      aria-label="Text size"
    >
      {LEVELS.map((level) => (
        <button
          key={level.id}
          type="button"
          aria-pressed={active === level.id}
          onClick={() => applyScale(level.id)}
          className={cn(
            "min-w-[2rem] rounded-sm px-1.5 py-1 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-tan-ink",
            active === level.id
              ? overlay
                ? "bg-tan text-plum"
                : "bg-plum text-white"
              : overlay
                ? "text-white hover:bg-white/15"
                : "text-ink hover:bg-mist",
          )}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
