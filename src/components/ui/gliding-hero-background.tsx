"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type GlidingHeroSlide = {
  src: string;
  alt: string;
  position?: string;
  flip?: boolean;
};

type GlidingHeroBackgroundProps = {
  slides: GlidingHeroSlide[];
  activeIndex: number;
  rtl?: boolean;
};

const TRANSITION_MS = 1400;

/**
 * Care Giver Home Page 01 hero photography — two layered frames that glide on
 * slide change: a full-bleed depth layer and a right-weighted foreground panel.
 */
export function GlidingHeroBackground({
  slides,
  activeIndex,
  rtl = false,
}: GlidingHeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [previousIndex, setPreviousIndex] = useState(activeIndex);
  const [transitioning, setTransitioning] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (activeIndex === displayIndex) return;
    setPreviousIndex(displayIndex);
    setDisplayIndex(activeIndex);
    setTransitioning(true);
    const timer = window.setTimeout(() => setTransitioning(false), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, displayIndex]);

  useEffect(() => {
    if (reduceMotion) return;
    const root = containerRef.current;
    if (!root) return;

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: nx * 14, y: ny * 7 });
    };

    root.addEventListener("mousemove", onMove);
    return () => root.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  const depthSlide = slides[displayIndex];
  if (!depthSlide) return null;

  const depthStyle = reduceMotion
    ? undefined
    : { transform: `translate3d(${parallax.x * 0.35}px, ${parallax.y * 0.35}px, 0) scale(1.07)` };

  const glideStyle = reduceMotion
    ? undefined
    : { transform: `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.4}px, 0)` };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 will-change-transform" style={depthStyle}>
        <Image
          src={depthSlide.src}
          alt=""
          fill
          priority={activeIndex === 0}
          sizes="100vw"
          style={{ objectPosition: depthSlide.position ?? "center center" }}
          className={cn("object-cover transition-opacity duration-[1400ms]", depthSlide.flip && !rtl && "scale-x-[-1]")}
        />
      </div>

      <div
        className={cn(
          "absolute inset-y-0 w-[62%] overflow-hidden sm:w-[56%] lg:w-[50%]",
          rtl ? "left-0" : "right-0",
        )}
        style={glideStyle}
      >
        {transitioning && !reduceMotion ? (
          <>
            <div
              key={`out-${previousIndex}-${displayIndex}`}
              className={cn(
                "absolute inset-0",
                rtl ? "animate-hero-glide-out-rtl" : "animate-hero-glide-out",
              )}
            >
              <HeroGlideFrame slide={slides[previousIndex]!} rtl={rtl} />
            </div>
            <div
              key={`in-${displayIndex}-${previousIndex}`}
              className={cn(
                "absolute inset-0",
                rtl ? "animate-hero-glide-in-rtl" : "animate-hero-glide-in",
              )}
            >
              <HeroGlideFrame slide={slides[displayIndex]!} rtl={rtl} priority={activeIndex === 0} />
            </div>
          </>
        ) : (
          <div className="absolute inset-0">
            <HeroGlideFrame slide={slides[displayIndex]!} rtl={rtl} priority={activeIndex === 0} />
          </div>
        )}

        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 w-20 from-plum/75 to-transparent sm:w-24",
            rtl ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r",
          )}
        />
      </div>
    </div>
  );
}

function HeroGlideFrame({
  slide,
  rtl,
  priority = false,
}: {
  slide: GlidingHeroSlide;
  rtl: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={slide.src}
      alt=""
      fill
      priority={priority}
      sizes="(max-width: 1024px) 64vw, 52vw"
      style={{ objectPosition: slide.position ?? "center center" }}
      className={cn("object-cover", slide.flip && !rtl && "scale-x-[-1]")}
    />
  );
}
