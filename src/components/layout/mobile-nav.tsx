"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { mainNavEntries, secondaryNav } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { BrandWordmark } from "./brand-wordmark";

export function MobileNav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const base = `/${locale}`;
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(open, panelRef, { restoreFocusRef: triggerRef });

  function isActive(href: string): boolean {
    const target = `${base}${href}`;
    if (href === "") return pathname === base || pathname === `${base}/`;
    return pathname === target || pathname.startsWith(`${target}/`);
  }

  function toggle(key: string) {
    setExpanded((current) => (current === key ? null : key));
  }

  return (
    <div className="lg:hidden">
      <Sheet
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setExpanded(null);
        }}
      >
        <SheetTrigger
          render={
            <button
              ref={triggerRef}
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
              aria-label={t("openMenu")}
              aria-expanded={open}
              aria-controls="mobile-menu"
            />
          }
        >
          <Menu size={20} />
        </SheetTrigger>
        <SheetContent side="right" className="w-[min(100%,20rem)] overflow-y-auto bg-white p-0">
          <div ref={panelRef}>
            <SheetHeader className="border-b border-line px-5 py-4">
              <SheetTitle className="text-left">
                <BrandWordmark size="sm" />
              </SheetTitle>
            </SheetHeader>
            <nav id="mobile-menu" className="flex flex-col p-5" aria-label="Mobile">
              <ul className="flex flex-col">
                {mainNavEntries.map((entry) => {
                  if (entry.kind === "link") {
                    const href = `${base}${entry.href}`;
                    return (
                      <li key={entry.key} className="border-b border-line/70">
                        <SheetClose
                          render={
                            <Link
                              href={href}
                              aria-current={isActive(entry.href) ? "page" : undefined}
                              className={cn(
                                "block py-3 text-[0.95rem] font-semibold transition-colors hover:text-coral",
                                isActive(entry.href) ? "text-coral" : "text-ink",
                              )}
                            />
                          }
                        >
                          {t(entry.key)}
                        </SheetClose>
                      </li>
                    );
                  }

                  const sectionOpen = expanded === entry.key;
                  const sectionActive =
                    isActive(entry.href) || entry.items.some((item) => isActive(item.href));

                  return (
                    <li key={entry.key} className="border-b border-line/70">
                      <button
                        type="button"
                        onClick={() => toggle(entry.key)}
                        aria-expanded={sectionOpen}
                        className={cn(
                          "flex w-full items-center justify-between py-3 text-start text-[0.95rem] font-semibold transition-colors hover:text-coral",
                          sectionActive ? "text-coral" : "text-ink",
                        )}
                      >
                        {t(entry.key)}
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={cn("transition-transform", sectionOpen && "rotate-180")}
                        />
                      </button>
                      {sectionOpen ? (
                        <ul className="mb-2 ms-3 border-s border-line/80 ps-3">
                          {entry.items.map((item) => (
                            <li key={item.key}>
                              <SheetClose
                                render={
                                  <Link
                                    href={`${base}${item.href}`}
                                    aria-current={isActive(item.href) ? "page" : undefined}
                                    className={cn(
                                      "block py-2.5 text-sm font-medium transition-colors hover:text-coral",
                                      isActive(item.href) ? "text-coral" : "text-body",
                                    )}
                                  />
                                }
                              >
                                {t(`menuItems.${item.key}`)}
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}

                {secondaryNav.map((item) => (
                  <li key={item.key} className="border-b border-line/70">
                    <SheetClose
                      render={
                        <Link
                          href={`${base}${item.href}`}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={cn(
                            "block py-3 text-[0.95rem] font-semibold transition-colors hover:text-coral",
                            isActive(item.href) ? "text-coral" : "text-ink",
                          )}
                        />
                      }
                    >
                      {t(item.key)}
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <SheetClose
                render={
                  <Link
                    href={`${base}/contact`}
                    className="mt-6 block bg-tan px-6 py-3.5 text-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light"
                  />
                }
              >
                {t("requestCare")}
              </SheetClose>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
