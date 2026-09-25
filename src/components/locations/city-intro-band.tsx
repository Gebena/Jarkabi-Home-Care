import { caregiverBackgrounds } from "@/lib/caregiver-assets";
import { locationImages } from "@/lib/site-images";
import Image from "next/image";

type CityIntroBandProps = {
  cityName: string;
  title: string;
  lead: string;
};

/** Ocean band with a single location print — city landing pages. */
export function CityIntroBand({ cityName, title, lead }: CityIntroBandProps) {
  return (
    <section className="relative overflow-hidden bg-care-ocean py-14 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-right-top bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${caregiverBackgrounds.locationTexture})` }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-care-ocean/90" />
      <div className="relative mx-auto grid w-[min(1240px,calc(100%-2rem))] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <div className="text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-tan">{cityName}</p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">{lead}</p>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[14rem] overflow-hidden border-[10px] border-white shadow-elevated">
          <Image
            src={locationImages[0].src}
            alt=""
            fill
            sizes="14rem"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
