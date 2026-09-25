/**
 * Jarkabi Home Care — site photography registry.
 *
 * Production uses licensed Care Giver template images from
 * `public/images/caregiver-licensed/` (Envato Elements licence KVZ473J956).
 * Paths are composed through `caregiverImage()` in `caregiver-assets.ts`.
 *
 * Slot assignments mirror Care Giver Home Page 01 (`index.html`):
 *  - Hero slider: `main-slider/1–3.jpg`
 *  - Service carousel cards: `resource/service-4–7.jpg` (+ extended set for all 11 slugs)
 *  - "Here For You Always" panel: `resource/video-img.jpg`
 *  - Location finder prints: `resource/post-1.jpg`, `post-2.jpg`
 *  - About collage: `resource/care-1–3.jpg`
 *  - Blog fallbacks: `resource/news-1–3.jpg`
 *
 * Two rules when editing:
 *  1. Run `npm run verify:images` after changing paths.
 *  2. Decorative slots use `alt=""`; hero and about lead images carry descriptive alt text.
 */

import { caregiverImage } from "@/lib/caregiver-assets";

type Photo = {
  src: string;
  alt: string;
};

/**
 * `position` is a CSS object-position and `flip` mirrors the frame. Both belong
 * to the photograph rather than the component.
 */
type PositionedPhoto = Photo & { position: string; flip?: boolean };

function licensed(path: string, alt: string): Photo {
  return { src: caregiverImage(path), alt };
}

/** Licensed Care Giver frames keyed by template filename. */
const library = {
  heroSlide1: licensed(
    "main-slider/1.jpg",
    "A care worker with an older adult in a warm home setting",
  ),
  heroSlide2: licensed(
    "main-slider/2.jpg",
    "A caregiver supporting an older person during daily activities at home",
  ),
  heroSlide3: licensed(
    "main-slider/3.jpg",
    "Compassionate in-home care for a senior in their living room",
  ),
  pillarEnrich: licensed("resource/service-1.jpg", ""),
  pillarEmpower: licensed("resource/service-2.jpg", ""),
  pillarEngage: licensed("resource/service-3.jpg", ""),
  whyPanel: licensed("resource/video-img.jpg", "Care worker with an older adult at home"),
  ctaBackground: licensed("resource/quality-1.jpg", ""),
  pageBanner: licensed("resource/started.jpg", ""),
  locationPrint1: licensed("resource/post-1.jpg", ""),
  locationPrint2: licensed("resource/post-2.jpg", ""),
  blogNews1: licensed("resource/news-1.jpg", ""),
  blogNews2: licensed("resource/news-2.jpg", ""),
  blogNews3: licensed("resource/news-3.jpg", ""),
  aboutCare1: licensed("resource/care-1.jpg", "Care team member with a client at home"),
  aboutCare2: licensed("resource/care-2.jpg", ""),
  aboutCare3: licensed("resource/care-3.jpg", ""),
  mission: licensed("resource/mission.jpg", "Care coordinator meeting with a family at home"),
  contactOffice: licensed("resource/contact-1.jpg", "Jarkabi care team ready to help"),
  serviceElderly: licensed("resource/service-4.jpg", ""),
  serviceDaySupport: licensed("resource/service-5.jpg", ""),
  serviceRespite: licensed("resource/service-6.jpg", ""),
  servicePersonal: licensed("resource/service-7.jpg", ""),
  serviceAfterSurgery: licensed("resource/service-8.jpg", ""),
  serviceCompanion: licensed("resource/service-12.jpg", ""),
  serviceChronic: licensed("resource/service-14.jpg", ""),
  serviceEndOfLife: licensed("resource/service-17.jpg", ""),
  serviceSkilledNursing: licensed("resource/service-18.jpg", ""),
  serviceHospitalDischarge: licensed("resource/service-11.jpg", ""),
  serviceSpecialNeeds: licensed("resource/service-21.jpg", ""),
} as const;

/** Hero slides — Care Giver `main-slider/1–3.jpg`. */
export const heroSlides: PositionedPhoto[] = [
  { ...library.heroSlide1, position: "center center" },
  { ...library.heroSlide2, position: "center center" },
  { ...library.heroSlide3, position: "center center" },
];

/** Three colour-overlaid pillar blocks (also wired directly in `pillars-section.tsx`). */
export const pillarImages: Photo[] = [
  library.pillarEnrich,
  library.pillarEmpower,
  library.pillarEngage,
];

/** "Here For You Always" — overlapping photograph with video play button. */
export const whyChooseUsImage: PositionedPhoto = {
  ...library.whyPanel,
  position: "center center",
};

/** Full-bleed mid-page call-to-action banner photograph. */
export const ctaImage: PositionedPhoto = {
  ...library.ctaBackground,
  position: "center center",
};

/** Banner behind inner page titles — position metadata for parallax crops. */
export const pageBannerImage: PositionedPhoto = {
  ...library.pageBanner,
  position: "50% 55%",
};

/** Location finder collage — tilted prints behind the province picker. */
export const locationImages: Photo[] = [library.locationPrint1, library.locationPrint2];

/**
 * Square service card imagery keyed by slug. Carousel slots 4–7 match Care Giver
 * Home Page 01; remaining slugs use the closest matching demo detail frame.
 */
export const serviceImages: Record<string, Photo> = {
  "elderly-care": library.serviceElderly,
  "personal-care": library.servicePersonal,
  "respite-care": library.serviceRespite,
  "skilled-nursing": library.serviceSkilledNursing,
  "day-support": library.serviceDaySupport,
  "hospital-discharge": library.serviceHospitalDischarge,
  "companion-care": library.serviceCompanion,
  "chronic-condition-care": library.serviceChronic,
  "after-surgery-care": library.serviceAfterSurgery,
  "end-of-life-care": library.serviceEndOfLife,
  "special-needs-care": library.serviceSpecialNeeds,
  /** Legacy slugs */
  "senior-home-care": library.serviceElderly,
  "registered-nursing": library.serviceSkilledNursing,
  "dementia-support": library.serviceSpecialNeeds,
  "post-hospital-care": library.serviceHospitalDischarge,
  "palliative-care": library.serviceEndOfLife,
};

export const serviceFallbackImage: Photo = library.serviceElderly;

/** Blog / resource card imagery when a post has no cover image. */
export const blogFallbackImages: Photo[] = [
  library.blogNews1,
  library.blogNews2,
  library.blogNews3,
];

export const aboutImages = {
  main: library.aboutCare1,
  small1: library.aboutCare2,
  small2: library.aboutCare3,
  mission: library.mission,
};

/** Contact page office panel — Care Giver `contact.html`. */
export const contactPageImage: Photo = library.contactOffice;

/** Careers page — team photograph for intro panel. */
export const careersPageImages = {
  intro: licensed("resource/team-1.jpg", "Jarkabi care team member supporting a client at home"),
} as const;

/** Why Jarkabi — intro + featured alternating bands. */
export const whyPageImages = {
  intro: library.whyPanel,
  featured: [
    library.aboutCare1,
    library.servicePersonal,
    library.serviceElderly,
  ],
} as const;

/** Specialty narrative pages — licensed frames per Care Giver demo pages. */
export const specialtyPageImages = {
  nursing: [
    library.serviceSkilledNursing,
    library.serviceElderly,
    licensed("resource/meeting.jpg", ""),
  ],
  dementia: [
    library.serviceSpecialNeeds,
    library.serviceChronic,
    library.aboutCare2,
  ],
  caregivers: [
    library.aboutCare1,
    library.aboutCare3,
    licensed("resource/team-1.jpg", ""),
    licensed("resource/team-2.jpg", ""),
  ],
} as const;
