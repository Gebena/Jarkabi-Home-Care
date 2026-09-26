"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, secondaryNav } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandWordmark } from "./brand-wordmark";

export function MobileNav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const base = `/${locale}`;

  return (
    <div className="xl:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-sm border border-line text-ink"
              aria-label={t("openMenu")}
            />
          }
        >
          <Menu size={20} />
        </SheetTrigger>
        <SheetContent side="right" className="w-[min(100%,20rem)] bg-white p-0">
          <SheetHeader className="border-b border-line px-5 py-4">
            <SheetTitle className="text-left">
              <BrandWordmark size="sm" />
            </SheetTitle>
          </SheetHeader>
          <nav id="mobile-menu" className="flex flex-col p-5" aria-label="Mobile">
            <ul className="flex flex-col">
              {[...mainNav, ...secondaryNav].map((item) => {
                const href = `${base}${item.href}`;
                const active =
                  item.href === ""
                    ? pathname === base || pathname === `${base}/`
                    : pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <li key={item.key} className="border-b border-line/70">
                    <SheetClose
                      render={
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "block py-3 text-[0.95rem] font-semibold transition-colors hover:text-coral",
                            active ? "text-coral" : "text-ink",
                          )}
                        />
                      }
                    >
                      {t(item.key)}
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
            <SheetClose
              render={
                <Link
                  href={`${base}/request-care`}
                  className="mt-6 block bg-tan px-6 py-3.5 text-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light"
                />
              }
            >
              {t("requestCare")}
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
