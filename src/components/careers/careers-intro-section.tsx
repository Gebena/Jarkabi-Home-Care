import { caregiverBackgrounds } from "@/lib/caregiver-assets";
import { careersPageImages } from "@/lib/site-images";
import { Check } from "lucide-react";
import Image from "next/image";

type CareersIntroSectionProps = {
  introTitle: string;
  introBody: string;
  benefits: string[];
};

/**
 * Care Giver careers intro — plum panel, overlapping team photo, benefit checklist.
 */
export function CareersIntroSection({
  introTitle,
  introBody,
  benefits,
}: CareersIntroSectionProps) {
  return (
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
            <ul className="mt-8 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/90">
                  <Check
                    size={18}
                    aria-hidden="true"
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-tan"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full self-center overflow-hidden lg:-ml-16 lg:my-12 lg:aspect-auto lg:min-h-[28rem] lg:self-stretch">
          <Image
            src={careersPageImages.intro.src}
            alt={careersPageImages.intro.alt}
            fill
            sizes="(max-width: 1024px) 92vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
