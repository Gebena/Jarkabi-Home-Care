"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type GalleryGridProps = {
  images: string[];
  altPrefix?: string;
  closeLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
};

/**
 * Care Giver `gallery.html` — masonry-style grid with a polished lightbox.
 */
export function GalleryGrid({
  images,
  altPrefix = "Gallery image",
  closeLabel = "Close",
  previousLabel = "Previous image",
  nextLabel = "Next image",
}: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

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

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, showNext, showPrevious]);

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block aspect-square w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
            >
              <Image
                src={src}
                alt={`${altPrefix} ${index + 1}`}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged gallery image"
          className="fixed inset-0 z-50 flex items-center justify-center bg-plum/92 p-4"
          onClick={close}
        >
          <button
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
