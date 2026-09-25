"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type GalleryGridProps = {
  images: string[];
  altPrefix?: string;
};

/**
 * Care Giver `gallery.html` — masonry-style grid with a simple lightbox.
 */
export function GalleryGrid({ images, altPrefix = "Gallery image" }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close]);

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-plum/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute end-4 top-4 border border-white/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
          >
            Close
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
