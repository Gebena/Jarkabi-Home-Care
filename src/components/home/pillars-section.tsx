import { pillarImages } from "@/lib/site-images";
import { useTranslations } from "next-intl";
import Image from "next/image";

/**
 * Care Giver Home Page 01 places three edge-to-edge colour blocks — teal, brick
 * and blue — directly beneath the intro band, each a photograph under a heavy
 * flat colour wash with a centred serif heading.
 */
export function PillarsSection() {
  const t = useTranslations("pillars");

  const pillars = [
    { title: t("oneTitle"), body: t("oneBody"), wash: "bg-care-teal/90" },
    { title: t("twoTitle"), body: t("twoBody"), wash: "bg-care-brick/90" },
    { title: t("threeTitle"), body: t("threeBody"), wash: "bg-care-ocean/90" },
  ];

  return (
    <section className="bg-mist pb-16 lg:pb-20">
      <div className="mx-auto grid w-[min(1240px,calc(100%-2rem))] sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, i) => (
          <article
            key={pillar.title}
            className="relative isolate flex min-h-[15rem] flex-col items-center justify-center overflow-hidden px-8 py-14 text-center"
          >
            <Image
              src={pillarImages[i].src}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="absolute inset-0 -z-20 object-cover"
            />
            <div aria-hidden="true" className={`absolute inset-0 -z-10 ${pillar.wash}`} />

            <h3 className="font-display text-2xl text-white lg:text-3xl">{pillar.title}</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/90">{pillar.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
