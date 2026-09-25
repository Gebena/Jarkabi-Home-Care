import { caregiverBackgrounds } from "@/lib/caregiver-assets";
import { whyPageImages } from "@/lib/site-images";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Differentiator = { title: string; body: string };

type WhyJarkabiSectionsProps = {
  introTitle: string;
  introBody: string;
  gridTitle: string;
  items: Differentiator[];
};

/**
 * Care Giver "why us" inner page — plum intro panel, overlapping photograph,
 * three photographic bands, then a numbered differentiator grid.
 */
export function WhyJarkabiSections({
  introTitle,
  introBody,
  gridTitle,
  items,
}: WhyJarkabiSectionsProps) {
  const featured = items.slice(0, 3);
  const gridItems = items.slice(3);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto w-[min(1240px,calc(100%-2rem))] lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
          <div className="relative overflow-hidden bg-plum px-6 py-14 sm:px-10 lg:px-12 lg:py-20 lg:pr-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage: `url(${caregiverBackgrounds.panelPattern})`,
                backgroundRepeat: "repeat",
              }}
            />
            <div className="relative">
              <h2 className="font-display text-2xl text-white sm:text-3xl lg:text-[2.35rem]">
                {introTitle}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85">{introBody}</p>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full self-center overflow-hidden lg:-ml-16 lg:my-12 lg:aspect-auto lg:min-h-[28rem] lg:self-stretch">
            <Image
              src={whyPageImages.intro.src}
              alt={whyPageImages.intro.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {featured.map((item, index) => {
        const imageFirst = index % 2 === 0;
        const image = whyPageImages.featured[index];
        return (
          <section
            key={item.title}
            className={cn("py-16 lg:py-20", index % 2 === 1 ? "bg-mist" : "bg-white")}
          >
            <div className="mx-auto grid w-[min(1240px,calc(100%-2rem))] items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]",
                  !imageFirst && "lg:order-2",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className={cn(!imageFirst && "lg:order-1")}>
                <h2 className="font-display text-2xl text-ink sm:text-[1.75rem]">{item.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-body">{item.body}</p>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-mist py-16 lg:py-20">
        <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
          <h2 className="font-display text-2xl text-ink sm:text-3xl lg:text-[2.35rem]">
            {gridTitle}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((item) => (
              <li
                key={item.title}
                className="border border-line bg-white p-6 transition-shadow hover:shadow-card"
              >
                <h3 className="flex items-start gap-3 font-display text-lg text-plum">
                  <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-tan-ink" />
                  {item.title}
                </h3>
                <p className="mt-4 ps-7 text-sm leading-relaxed text-body">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
