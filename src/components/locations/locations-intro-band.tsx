import { caregiverBackgrounds } from "@/lib/caregiver-assets";
import { LocationPhotoCollage } from "@/components/locations/location-photo-collage";

type LocationsIntroBandProps = {
  title: string;
  lead: string;
};

/** Ocean band with tilted location prints — Care Giver location finder styling. */
export function LocationsIntroBand({ title, lead }: LocationsIntroBandProps) {
  return (
    <section className="relative overflow-hidden bg-care-ocean py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-right-top bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${caregiverBackgrounds.locationTexture})` }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-care-ocean/90" />
      <div className="relative mx-auto grid w-[min(1240px,calc(100%-2rem))] items-center gap-12 lg:grid-cols-2">
        <LocationPhotoCollage />
        <div className="text-white">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.1rem]">{title}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85">{lead}</p>
        </div>
      </div>
    </section>
  );
}
