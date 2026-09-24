"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

type SearchModalProps = {
  locale: string;
  open: boolean;
  onClose: () => void;
};

const searchLinks = [
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "resources", href: "/resources" },
  { key: "locations", href: "/locations" },
  { key: "careers", href: "/careers" },
] as const;

export function SearchModal({ locale, open, onClose }: SearchModalProps) {
  const t = useTranslations("nav");
  const tSearch = useTranslations("search");
  const [query, setQuery] = useState("");
  const base = `/${locale}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const filtered = searchLinks.filter((item) =>
    t(item.key).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-label={tSearch("title")}>
      <button type="button" className="search-modal-backdrop" aria-label="Close" onClick={onClose} />
      <div className="search-modal-panel">
        <div className="search-modal-header">
          <Search size={20} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tSearch("placeholder")}
            autoFocus
          />
          <button type="button" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>
        <ul className="search-modal-results">
          {(query ? filtered : searchLinks).map((item) => (
            <li key={item.key}>
              <Link href={`${base}${item.href}`} onClick={onClose}>
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
