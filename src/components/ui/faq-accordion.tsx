"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  /** Two-column layout matching Care Giver `faq.html`. */
  columns?: 1 | 2;
  searchable?: boolean;
  searchPlaceholder?: string;
};

export function FaqAccordion({
  items,
  columns = 1,
  searchable = false,
  searchPlaceholder = "Search questions",
}: FaqAccordionProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized),
    );
  }, [items, query]);

  const midpoint = Math.ceil(filtered.length / 2);
  const columnsData =
    columns === 2
      ? [filtered.slice(0, midpoint), filtered.slice(midpoint)]
      : [filtered];

  return (
    <div>
      {searchable ? (
        <div className="mx-auto mb-10 max-w-xl">
          <label className="sr-only" htmlFor="faq-search">
            {searchPlaceholder}
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full border border-line bg-white px-5 py-3.5 text-sm text-ink placeholder:text-body/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
          />
        </div>
      ) : null}

      <div className={columns === 2 ? "grid gap-8 lg:grid-cols-2" : undefined}>
        {columnsData.map((columnItems, columnIndex) => (
          <div key={columnIndex} className="space-y-0">
            {columnItems.map((item) => (
              <details key={item.question} className="group border-b border-line bg-white">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-display text-base text-ink marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink">
                  {item.question}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-tan-ink transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-body">{item.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 text-center text-sm text-body">No questions match your search.</p>
      ) : null}
    </div>
  );
}
