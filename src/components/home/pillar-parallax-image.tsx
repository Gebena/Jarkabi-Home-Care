"use client";

import { ParallaxBackground } from "@/components/ui/parallax-background";
import { cn } from "@/lib/utils";

type PillarParallaxImageProps = {
  src: string;
  position?: string;
  className?: string;
};

/** Scroll parallax background for Enrich / Empower / Engage pillar blocks. */
export function PillarParallaxImage({ src, position = "50% 45%", className }: PillarParallaxImageProps) {
  return (
    <ParallaxBackground
      src={src}
      alt=""
      objectPosition={position}
      strength={0.1}
      className={cn("absolute inset-0 -z-20", className)}
    />
  );
}
