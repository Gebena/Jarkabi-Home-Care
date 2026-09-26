"use client";

import type { NavLink } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type MainNavDropdownProps = {
  label: string;
  menuLabel: string;
  items: NavLink[];
  base: string;
  pathname: string;
  translate: (key: string) => string;
  isActive: boolean;
  overlay?: boolean;
};

export function MainNavDropdown({
  label,
  menuLabel,
  items,
  base,
  pathname,
  translate,
  isActive,
  overlay = false,
}: MainNavDropdownProps) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        id={`${menuId}-trigger`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap text-[0.9rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tan-ink",
          overlay
            ? isActive
              ? "text-tan hover:text-tan-light"
              : "text-white/92 hover:text-tan-light"
            : isActive
              ? "text-coral hover:text-coral"
              : "text-ink hover:text-coral",
        )}
      >
        {label}
        <ChevronDown size={14} aria-hidden="true" className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <ul
          id={menuId}
          role="menu"
          aria-label={menuLabel}
          className="absolute left-0 top-full z-50 mt-2 min-w-[14rem] border border-line bg-white py-2 shadow-elevated"
        >
          {items.map((item) => {
            const href = `${base}${item.href}`;
            const active =
              item.href.includes("#")
                ? pathname === `${base}/about`
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={item.key} role="none">
                <Link
                  href={href}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-mist hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-tan-ink",
                    active ? "text-coral" : "text-ink",
                  )}
                >
                  {translate(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
