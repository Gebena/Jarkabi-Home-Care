"use client";

import { mainNavEntries, type NavEntry } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type MainNavProps = {
  locale: string;
};

function isActive(pathname: string, base: string, href: string): boolean {
  const target = `${base}${href}`;
  if (href === "") return pathname === base || pathname === `${base}/`;
  return pathname === target || pathname.startsWith(`${target}/`);
}

function entryActive(pathname: string, base: string, entry: NavEntry): boolean {
  if (entry.kind === "link") return isActive(pathname, base, entry.href);
  if (isActive(pathname, base, entry.href)) return true;
  return entry.items.some((item) => isActive(pathname, base, item.href));
}

/**
 * Care Giver desktop navigation — hover dropdowns for About, Types Of Care,
 * and Knowledge Center with white panel + bordered list items.
 */
export function MainNav({ locale }: MainNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const base = `/${locale}`;
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpenKey(null), 120);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <ul className="hidden items-center gap-1 xl:flex xl:gap-2">
      {mainNavEntries.map((entry) => {
        if (entry.kind === "link") {
          const href = `${base}${entry.href}`;
          const active = isActive(pathname, base, entry.href);
          return (
            <li key={entry.key}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block whitespace-nowrap px-2 py-2 text-[0.9rem] font-semibold transition-colors hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tan-ink lg:px-3",
                  active ? "text-coral" : "text-ink",
                )}
              >
                {t(entry.key)}
              </Link>
            </li>
          );
        }

        const active = entryActive(pathname, base, entry);
        const open = openKey === entry.key;

        return (
          <li
            key={entry.key}
            className="relative"
            onMouseEnter={() => {
              clearCloseTimer();
              setOpenKey(entry.key);
            }}
            onMouseLeave={scheduleClose}
            onFocus={() => {
              clearCloseTimer();
              setOpenKey(entry.key);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                scheduleClose();
              }
            }}
          >
            <Link
              href={`${base}${entry.href}`}
              aria-current={active ? "page" : undefined}
              aria-haspopup="true"
              aria-expanded={open}
              className={cn(
                "inline-flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[0.9rem] font-semibold transition-colors hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tan-ink lg:px-3",
                active || open ? "text-coral" : "text-ink",
              )}
            >
              {t(entry.key)}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={cn("transition-transform duration-200", open && "rotate-180")}
              />
            </Link>

            <div
              className={cn(
                "absolute start-0 top-full z-50 min-w-[15.5rem] pt-2 transition-all duration-200",
                open
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0",
              )}
            >
              <ul className="border border-line bg-white py-1 shadow-[0_12px_40px_rgba(67,38,58,0.12)]">
                {entry.items.map((item) => {
                  const href = `${base}${item.href}`;
                  const itemActive = isActive(pathname, base, item.href);
                  return (
                    <li key={item.key} className="border-b border-line/80 last:border-b-0">
                      <Link
                        href={href}
                        aria-current={itemActive ? "page" : undefined}
                        className={cn(
                          "block px-5 py-3 text-[0.88rem] font-medium transition-colors hover:bg-mist hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-plum",
                          itemActive ? "bg-mist text-plum" : "text-ink",
                        )}
                      >
                        {t(`menuItems.${item.key}`)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
