"use client";

import { ChevronLeft, ChevronRight, Link2, Search } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryGridProps = {
  images: string[];
  altPrefix?: string;
  closeLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  expandLabel?: string;
};

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Care Giver `gallery.html` — three-column grid, terracotta slide-down overlay,
 * plum circular link + search icons, and a polished lightbox.
 */
export function GalleryGrid({
  images,
  altPrefix = "Gallery image",
  closeLabel = "Close",
  previousLabel = "Previous image",
  nextLabel = "Next image",
  expandLabel = "View larger image",
}: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = useCallback((index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
    triggerRef.current?.focus();
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, showNext, showPrevious]);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <li key={src} className="gallery-item">
            <button
              type="button"
              onClick={(event) => openLightbox(index, event.currentTarget)}
              aria-label={`${expandLabel} ${index + 1}`}
              className="group relative block w-full overflow-hidden text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
            >
              <figure className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={src}
                  alt={`${altPrefix} ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                />

                {/* Care Giver overlay — rgba(200,162,148,0.90) slides down on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-[rgba(200,162,148,0.9)] opacity-0 transition-all duration-700 ease-out -translate-y-full group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
                >
                  <div className="flex translate-y-12 items-center gap-2.5 opacity-0 transition-all duration-500 delay-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-plum-footer text-white transition-colors duration-500 group-hover:bg-white group-hover:text-neutral-600">
                      <Link2 size={20} strokeWidth={2} />
                    </span>
                    <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-plum-footer text-white transition-colors duration-500 group-hover:bg-white group-hover:text-neutral-600">
                      <Search size={20} strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </figure>
            </button>
          </li>
        ))}
      </ul>

      {activeIndex !== null ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged gallery image"
          className="fixed inset-0 z-50 flex items-center justify-center bg-plum/92 p-4"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            className="absolute end-4 top-4 border border-white/60 bg-plum/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {closeLabel}
          </button>

          <p className="absolute start-4 top-4 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
            {activeIndex + 1} / {images.length}
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label={previousLabel}
            className="absolute start-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/60 bg-plum/40 text-white transition-colors hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label={nextLabel}
            className="absolute end-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/60 bg-plum/40 text-white transition-colors hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          <div
            className="relative h-[min(80vh,720px)] w-[min(92vw,960px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${altPrefix} ${activeIndex + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
