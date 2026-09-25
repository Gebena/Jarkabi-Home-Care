"use client";

import { SearchModal } from "@/components/ui/search-modal";
import type { BrandData } from "@/lib/cms";
import { MainNav } from "@/components/layout/main-nav";
import { cn } from "@/lib/utils";
import { Phone, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandWordmark } from "./brand-wordmark";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

type SiteHeaderProps = {
  locale: string;
  brand: BrandData;
};

/** Care Giver Home Page 01 header: white, sticky, serif wordmark, inline nav, tan CTA. */
export function SiteHeader({ locale, brand }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const base = `/${locale}`;
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");
  const hasPhone = phoneDigits.length > 3;

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
          "sticky top-0 z-[100] overflow-visible border-b border-line/70 bg-white transition-shadow duration-300",
          scrolled && "shadow-[0_2px_18px_rgba(67,38,58,0.10)]",
        )}
      >
        <div className="mx-auto flex h-[4.75rem] w-[min(1240px,calc(100%-2rem))] items-center justify-between gap-4 lg:h-[5.25rem]">
          <Link href={base} aria-label="Jarkabi Home Care — home">
            <BrandWordmark size="md" />
          </Link>

          <nav aria-label="Main" className="min-w-0 flex-1 justify-center lg:flex">
            <MainNav locale={locale} />
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
              href={`${base}/contact`}
              className="hidden whitespace-nowrap bg-tan px-6 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum md:inline-block"
            >
              {t("requestCare")}
            </Link>

            <MobileNav locale={locale} />
          </div>
        </div>
      </header>

      <SearchModal locale={locale} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
