import { locationImages } from "@/lib/site-images";
import Image from "next/image";

/** Tilted location prints from Care Giver Home Page 01 location finder. */
export function LocationPhotoCollage() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-72 w-full max-w-md lg:h-80">
      <div className="absolute left-0 top-0 h-64 w-52 rotate-[-6deg] border-[10px] border-white shadow-elevated">
        <Image src={locationImages[0].src} alt="" fill sizes="13rem" className="object-cover" />
      </div>
      <div className="absolute left-44 top-10 h-64 w-52 rotate-[5deg] border-[10px] border-white shadow-elevated">
        <Image src={locationImages[1].src} alt="" fill sizes="13rem" className="object-cover" />
      </div>
    </div>
  );
}
