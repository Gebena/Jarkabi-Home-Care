"use client";

import { localeLabels, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

type LocaleSwitcherProps = {
  /** `topbar` matches the Care Giver plum header language control. */
  variant?: "default" | "topbar";
};

export function LocaleSwitcher({ variant = "default" }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const isTopbar = variant === "topbar";

  function switchLocale(nextLocale: string) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
  }

  return (
    <div
      className={cn(
        "locale-switcher",
        isTopbar && "relative border-0 bg-transparent",
      )}
      role="group"
      aria-label="Language"
    >
      <select
        value={locale}
        onChange={(event) => switchLocale(event.target.value)}
        aria-label="Select language"
        className={cn(
          "locale-select",
          isTopbar &&
            "max-w-none appearance-none bg-transparent py-0 pl-0 pr-5 text-[0.8125rem] font-semibold uppercase tracking-wide text-white hover:text-tan",
        )}
      >
        {Object.entries(localeLabels).map(([code, label]) => (
          <option key={code} value={code}>
            {isTopbar ? code.toUpperCase() : label}
          </option>
        ))}
      </select>
      {isTopbar ? (
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/80"
        />
      ) : null}
    </div>
  );
}
