"use client";

import { HeaderLocationSelector } from "@/components/layout/header-location-selector";
import { MainNavDropdown } from "@/components/layout/main-nav-dropdown";
import { SearchModal } from "@/components/ui/search-modal";
import { isDisplayablePhone, napDisplayValue } from "@/lib/brand";
import type { BrandData, ProvinceData } from "@/lib/cms";
import { isHomePath } from "@/lib/header-overlay";
import { aboutSubNav, mainNav, navDropdownKeys } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { Phone, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandWordmark } from "./brand-wordmark";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { TextSizeControl } from "./text-size-control";

type SiteHeaderProps = {
  locale: string;
  brand: BrandData;
  provinces: ProvinceData[];
};

function isAboutNavActive(base: string, pathname: string) {
  const aboutPaths = aboutSubNav.map((item) => `${base}${item.href.split("#")[0]}`);
  return aboutPaths.some(
    (href) => pathname === href || (href !== base && pathname.startsWith(`${href}/`)),
  );
}

/**
 * Care Giver Home Page 01 header: transparent over the homepage hero, solid white
 * with shadow on scroll and on inner pages.
 */
export function SiteHeader({ locale, brand, provinces }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const base = `/${locale}`;
  const isHome = isHomePath(pathname, locale);
  const overlay = isHome && !scrolled;
  const hasPhone = isDisplayablePhone(brand.primaryPhone);
  const phoneDigits = napDisplayValue(brand.primaryPhone).replace(/\D/g, "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = (active: boolean) =>
    cn(
      "whitespace-nowrap text-[0.9rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tan-ink",
      overlay
        ? active
          ? "text-tan hover:text-tan-light"
          : "text-white/92 hover:text-tan-light"
        : active
          ? "text-coral"
          : "text-ink hover:text-coral",
    );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-plum focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          overlay
            ? "border-b border-transparent bg-transparent"
            : cn(
                "border-b border-line/70 bg-white",
                scrolled && "shadow-[0_2px_18px_rgba(67,38,58,0.10)]",
              ),
        )}
      >
        <div className="mx-auto flex h-[4.75rem] w-[min(1240px,calc(100%-2rem))] items-center justify-between gap-4 lg:h-[5.25rem]">
          <Link href={base} aria-label="Jarkabi Home Care — home">
            <BrandWordmark size="md" tone={overlay ? "light" : "dark"} />
          </Link>

          <nav className="hidden items-center gap-6 xl:gap-7 lg:flex" aria-label="Main">
            {mainNav.map((item) => {
              if (navDropdownKeys.has(item.key)) {
                return (
                  <MainNavDropdown
                    key={item.key}
                    label={t(item.key)}
                    menuLabel={t("aboutMenu")}
                    items={aboutSubNav}
                    base={base}
                    pathname={pathname}
                    translate={t}
                    isActive={isAboutNavActive(base, pathname)}
                    overlay={overlay}
                  />
                );
              }

              const href = `${base}${item.href}`;
              const active =
                item.href === ""
                  ? pathname === base || pathname === `${base}/`
                  : pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={item.key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={navLinkClass(active)}
                >
                  {t(item.key)}
                </Link>
              );
            })}

            <HeaderLocationSelector locale={locale} provinces={provinces} overlay={overlay} />
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label={t("search")}
              onClick={() => setSearchOpen(true)}
              className={cn(
                "hidden h-9 w-9 place-items-center rounded-sm border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink sm:grid",
                overlay
                  ? "border-white/40 text-white hover:border-white hover:text-tan-light"
                  : "border-line text-ink hover:border-tan hover:text-tan-ink",
              )}
            >
              <Search size={17} aria-hidden="true" />
            </button>

            <TextSizeControl className="hidden xl:flex" overlay={overlay} />

            <LocaleSwitcher overlay={overlay} />

            {hasPhone ? (
              <a
                href={`tel:${phoneDigits}`}
                className={cn(
                  "hidden items-center gap-2 text-sm font-semibold transition-colors lg:flex",
                  overlay ? "text-white hover:text-tan-light" : "text-plum hover:text-tan-ink",
                )}
              >
                <Phone size={15} aria-hidden="true" />
                <span>{napDisplayValue(brand.primaryPhone)}</span>
              </a>
            ) : null}

            <Link
              href={`${base}/request-care`}
              className="hidden whitespace-nowrap bg-tan px-6 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum md:inline-block"
            >
              {t("requestCare")}
            </Link>

            <MobileNav locale={locale} provinces={provinces} overlay={overlay} />
          </div>
        </div>
      </header>

      <SearchModal locale={locale} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
