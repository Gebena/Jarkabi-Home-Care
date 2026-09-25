"use client";

import { useFocusTrap } from "@/hooks/use-focus-trap";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement;
    } else {
      setQuery("");
    }
  }, [open]);

  useFocusTrap(open, panelRef, { initialFocusRef: inputRef, restoreFocusRef });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = searchLinks.filter((item) =>
    t(item.key).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-label={tSearch("title")}>
      <button type="button" className="search-modal-backdrop" aria-label="Close" onClick={onClose} />
      <div ref={panelRef} className="search-modal-panel">
        <div className="search-modal-header">
          <Search size={20} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tSearch("placeholder")}
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
