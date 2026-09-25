"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";

type ParallaxBackgroundProps = {
  src: string;
  alt?: string;
  objectPosition?: string;
  className?: string;
  imageClassName?: string;
  /** Scroll parallax strength — Care Giver Revolution Slider uses ~10. */
  strength?: number;
  priority?: boolean;
  flip?: boolean;
};

/**
 * Background image with subtle scroll parallax, matching Care Giver hero and
 * inner-page banner movement (`data-bgparallax="10"` in the template).
 */
export function ParallaxBackground({
  src,
  alt = "",
  objectPosition = "50% 50%",
  className,
  imageClassName,
  strength = 0.12,
  priority = false,
  flip = false,
}: ParallaxBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const image = imageRef.current;
    if (!wrap || !image) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = 1 - (rect.top + rect.height * 0.5) / (viewport + rect.height);
      const clamped = Math.max(-0.25, Math.min(0.25, progress - 0.5));
      const offset = clamped * rect.height * strength;
      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          style={{ objectPosition }}
          className={cn("object-cover", flip && "scale-x-[-1]", imageClassName)}
        />
      </div>
    </div>
  );
}
