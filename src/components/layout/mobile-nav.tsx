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
import type { ProvinceData } from "@/lib/cms";
import { aboutSubNav, mainNav, navDropdownKeys, secondaryNav } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { BrandWordmark } from "./brand-wordmark";

type MobileNavProps = {
  locale: string;
  provinces: ProvinceData[];
  overlay?: boolean;
};

export function MobileNav({ locale, provinces, overlay = false }: MobileNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const selectId = useId();
  const base = `/${locale}`;

  const servable = useMemo(
    () => provinces.filter((p) => p.status === "active" || p.status === "coming_soon"),
    [provinces],
  );
  const [provinceSlug, setProvinceSlug] = useState(servable[0]?.slug ?? "");

  const flatNav = mainNav.flatMap((item) => {
    if (navDropdownKeys.has(item.key)) {
      return aboutSubNav.map((child) => ({ ...child, indent: true, group: item.key }));
    }
    return [{ ...item, indent: false, group: undefined as string | undefined }];
  });

  const extraNav = secondaryNav.filter(
    (item) => !flatNav.some((entry) => entry.key === item.key),
  );

  return (
    <div className="xl:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-sm border",
                overlay
                  ? "border-white/40 text-white hover:border-white"
                  : "border-line text-ink",
              )}
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
            {servable.length > 0 ? (
              <form
                className="mb-4 border-b border-line/70 pb-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (provinceSlug) router.push(`/${locale}/locations/${provinceSlug}`);
                }}
              >
                <label htmlFor={selectId} className="text-xs font-bold uppercase tracking-[0.14em] text-plum">
                  {t("locationSelector")}
                </label>
                <select
                  id={selectId}
                  value={provinceSlug}
                  onChange={(event) => {
                    const next = event.target.value;
                    setProvinceSlug(next);
                    if (next) router.push(`/${locale}/locations/${next}`);
                  }}
                  className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-sm font-semibold text-ink"
                >
                  {servable.map((province) => (
                    <option key={province.slug} value={province.slug}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </form>
            ) : null}

            <ul className="flex flex-col">
              {[...flatNav, ...extraNav.map((item) => ({ ...item, indent: false, group: undefined }))].map(
                (item) => {
                  const href = `${base}${item.href}`;
                  const pathOnly = href.split("#")[0];
                  const active =
                    item.href === ""
                      ? pathname === base || pathname === `${base}/`
                      : pathname === href || pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);

                  return (
                    <li key={`${item.group ?? "root"}-${item.key}`} className="border-b border-line/70">
                      <SheetClose
                        render={
                          <Link
                            href={href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "block py-3 text-[0.95rem] font-semibold transition-colors hover:text-coral",
                              item.indent ? "pl-4 text-[0.9rem]" : "",
                              active ? "text-coral" : "text-ink",
                            )}
                          />
                        }
                      >
                        {t(item.key)}
                      </SheetClose>
                    </li>
                  );
                },
              )}
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
