"use client";

import type { BrandData } from "@/lib/cms";
import { mainNav } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/ui/search-modal";
import { Phone, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

type SiteHeaderProps = {
  locale: string;
  brand: BrandData;
};

export function SiteHeader({ locale, brand }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const base = `/${locale}`;
  const isHome = pathname === base || pathname === `${base}/`;
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");
  const hasPhone = phoneDigits.length > 3;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header
        className={cn(
          "site-header",
          isHome && !scrolled && "site-header--transparent",
          scrolled && "site-header--scrolled",
        )}
      >
        <div className="container header-inner">
          <Link href={base} className="brand brand--jarkabi">
            <span className="brand-mark" aria-hidden="true">JK</span>
            <span className="brand-text">
              <strong>JARKABI</strong>
              <span>HOME CARE</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main">
            <ul>
              {mainNav.map((item) => {
                if (item.key === "home") return null;
                const href = `${base}${item.href}`;
                const active =
                  pathname === href ||
                  (item.href !== "" && pathname.startsWith(`${href}/`)) ||
                  pathname === href;
                return (
                  <li key={item.key}>
                    <Link href={href} className={active ? "active" : undefined}>
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-search-btn"
              aria-label={t("search")}
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>
            <LocaleSwitcher />
            {hasPhone ? (
              <a className="header-phone" href={`tel:${phoneDigits}`}>
                <Phone size={16} aria-hidden="true" />
                <span className="phone-text">{brand.primaryPhone}</span>
              </a>
            ) : null}
            <Link className="button button-accent" href={`${base}/contact`}>
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
