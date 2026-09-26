"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
  category?: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={`${item.question}-${index}`}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-ink transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  aria-hidden
                  className={cn("shrink-0 text-tan-ink transition-transform motion-reduce:transition-none", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-8 text-base leading-relaxed text-body"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
