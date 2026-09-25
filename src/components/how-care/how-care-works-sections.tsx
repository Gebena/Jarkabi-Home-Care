import { howCareWorksImages } from "@/lib/site-images";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PhotoBand = {
  title: string;
  body: string;
  image: { src: string; alt: string };
  listItems?: string[];
};

type HowCareWorksSectionsProps = {
  meetingTitle: string;
  meetingTagline: string;
  meetingIntro: string;
  meetingTopicsTitle: string;
  meetingTopics: string[];
  bands: PhotoBand[];
};

/**
 * Care Giver how-care-works inner page — alternating photographic bands.
 */
export function HowCareWorksSections({
  meetingTitle,
  meetingTagline,
  meetingIntro,
  meetingTopicsTitle,
  meetingTopics,
  bands,
}: HowCareWorksSectionsProps) {
  const allBands: PhotoBand[] = [
    {
      title: meetingTitle,
      body: meetingIntro,
      image: howCareWorksImages.meeting,
      listItems: meetingTopics,
    },
    ...bands,
  ];

  return (
    <>
      {allBands.map((band, index) => {
        const imageFirst = index % 2 === 0;
        const tone = index % 2 === 1 ? "bg-mist" : "bg-white";

        return (
          <section key={band.title} className={cn("py-16 lg:py-20", tone)}>
            <div className="mx-auto grid w-[min(1240px,calc(100%-2rem))] items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]",
                  !imageFirst && "lg:order-2",
                )}
              >
                <Image
                  src={band.image.src}
                  alt={band.image.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>

              <div className={cn(!imageFirst && "lg:order-1")}>
                {index === 0 ? (
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-tan-ink">
                    {meetingTagline}
                  </p>
                ) : null}
                <h2 className="font-display text-2xl text-ink sm:text-[1.75rem]">{band.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-body">{band.body}</p>
                {band.listItems ? (
                  <>
                    <h3 className="mt-8 font-display text-lg text-ink">{meetingTopicsTitle}</h3>
                    <ul className="mt-4 space-y-3 border-s-2 border-tan ps-5">
                      {band.listItems.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-body">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
