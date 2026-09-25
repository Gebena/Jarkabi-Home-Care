"use client";

import { mainNavEntries, type NavEntry } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type MainNavProps = {
  locale: string;
};

type OpenMenu = {
  key: string;
  top: number;
  left: number;
  minWidth: number;
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
 * Care Giver desktop navigation — dropdown parents toggle open (demo uses href="#"),
 * submenu links navigate. Menu panel portals to body so the hero cannot block clicks.
 */
export function MainNav({ locale }: MainNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const base = `/${locale}`;
  const [openMenu, setOpenMenu] = useState<OpenMenu | null>(null);
  const closeTimer = useRef<number | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 280);
  }, [clearCloseTimer]);

  const openForKey = useCallback(
    (key: string) => {
      const trigger = triggerRefs.current[key];
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      setOpenMenu({
        key,
        top: rect.bottom + 8,
        left: rect.left,
        minWidth: Math.max(rect.width, 248),
      });
    },
    [],
  );

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    function reposition() {
      if (openMenu) openForKey(openMenu.key);
    }
    function onDocClick(event: MouseEvent) {
      const target = event.target as Node;
      if (openMenu && !triggerRefs.current[openMenu.key]?.contains(target)) {
        const panel = document.getElementById(`nav-dropdown-${openMenu.key}`);
        if (!panel?.contains(target)) setOpenMenu(null);
      }
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, { passive: true });
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [openMenu, openForKey]);

  const openEntry = mainNavEntries.find(
    (entry) => entry.kind === "dropdown" && entry.key === openMenu?.key,
  );

  return (
    <>
      <ul className="hidden items-center gap-1 lg:flex lg:gap-2">
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
          const open = openMenu?.key === entry.key;

          return (
            <li
              key={entry.key}
              onMouseEnter={() => {
                clearCloseTimer();
                openForKey(entry.key);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                ref={(node) => {
                  triggerRefs.current[entry.key] = node;
                }}
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls={`nav-dropdown-${entry.key}`}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  if (open) setOpenMenu(null);
                  else openForKey(entry.key);
                }}
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
              </button>
            </li>
          );
        })}
      </ul>

      {openMenu && openEntry && openEntry.kind === "dropdown"
        ? createPortal(
            <div
              id={`nav-dropdown-${openEntry.key}`}
              className="fixed z-[300]"
              style={{ top: openMenu.top, left: openMenu.left, minWidth: openMenu.minWidth }}
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
            >
              <ul className="border border-line bg-white py-1 shadow-[0_12px_40px_rgba(67,38,58,0.12)]">
                {openEntry.items.map((item) => {
                  const href = `${base}${item.href}`;
                  const itemActive = isActive(pathname, base, item.href);
                  return (
                    <li key={item.key} className="border-b border-line/80 last:border-b-0">
                      <Link
                        href={href}
                        onClick={() => setOpenMenu(null)}
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
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
