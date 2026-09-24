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
import { mainNav } from "@/lib/nav-config";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function MobileNav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const base = `/${locale}`;

  return (
    <div className="mobile-nav">
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="mobile-nav-toggle"
              aria-label={t("openMenu")}
            />
          }
        >
          <Menu size={20} />
        </SheetTrigger>
        <SheetContent side="right" className="mobile-nav-sheet w-[min(100%,20rem)]">
          <SheetHeader>
            <SheetTitle className="text-left font-display text-lg text-primary">
              Jarkabi Home Care
            </SheetTitle>
          </SheetHeader>
          <nav id="mobile-menu" className="mobile-nav-panel" aria-label="Mobile">
            <ul>
              {mainNav.map((item) => (
                <li key={item.key}>
                  <SheetClose
                    render={
                      <Link href={`${base}${item.href}`} className="mobile-nav-link" />
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
                  className="button button-accent button-full"
                  href={`${base}/contact`}
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
