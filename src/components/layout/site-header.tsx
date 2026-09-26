"use client";

import { HeaderLocationSelector } from "@/components/layout/header-location-selector";
import { MainNavDropdown } from "@/components/layout/main-nav-dropdown";
import { SearchModal } from "@/components/ui/search-modal";
import { isDisplayablePhone } from "@/lib/brand";
import type { BrandData, ProvinceData } from "@/lib/cms";
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

/** Care Giver Home Page 01 header: white, sticky, serif wordmark, inline nav, tan CTA. */
export function SiteHeader({ locale, brand, provinces }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const base = `/${locale}`;
  const hasPhone = isDisplayablePhone(brand.primaryPhone);
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          "sticky top-0 z-50 border-b border-line/70 bg-white transition-shadow duration-300",
          scrolled && "shadow-[0_2px_18px_rgba(67,38,58,0.10)]",
        )}
      >
        <div className="mx-auto flex h-[4.75rem] w-[min(1240px,calc(100%-2rem))] items-center justify-between gap-4 lg:h-[5.25rem]">
          <Link href={base} aria-label="Jarkabi Home Care — home">
            <BrandWordmark size="md" />
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
                  className={cn(
                    "whitespace-nowrap text-[0.9rem] font-semibold transition-colors hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tan-ink",
                    active ? "text-coral" : "text-ink",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}

            <HeaderLocationSelector locale={locale} provinces={provinces} />
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label={t("search")}
              onClick={() => setSearchOpen(true)}
              className="hidden h-9 w-9 place-items-center rounded-sm border border-line text-ink transition-colors hover:border-tan hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink sm:grid"
            >
              <Search size={17} aria-hidden="true" />
            </button>

            <TextSizeControl className="hidden xl:flex" />

            <LocaleSwitcher />

            {hasPhone ? (
              <a
                href={`tel:${phoneDigits}`}
                className="hidden items-center gap-2 text-sm font-semibold text-plum transition-colors hover:text-tan-ink lg:flex"
              >
                <Phone size={15} aria-hidden="true" />
                <span>{brand.primaryPhone}</span>
              </a>
            ) : null}

            <Link
              href={`${base}/request-care`}
              className="hidden whitespace-nowrap bg-tan px-6 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum md:inline-block"
            >
              {t("requestCare")}
            </Link>

            <MobileNav locale={locale} provinces={provinces} />
          </div>
        </div>
      </header>

      <SearchModal locale={locale} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
