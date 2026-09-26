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
  heroSlide1: {
    src: "/images/photography/jarkabi-hero-care-conversation.webp",
    alt: "A care worker sitting close beside a smiling older man in his living room, her hand on his shoulder",
  },
  heroSlide2: {
    src: "/images/photography/jarkabi-hero-kitchen-tea.webp",
    alt: "A care worker pouring tea for an older woman at her kitchen counter, both laughing",
  },
  heroSlide3: {
    src: "/images/photography/jarkabi-hero-garden-walk.webp",
    alt: "A care worker walking an older woman along a garden path, steadying her walking frame",
  },
  pillarEnrich: licensed("resource/service-1.jpg", ""),
  pillarEmpower: licensed("resource/service-2.jpg", ""),
  pillarEngage: licensed("resource/service-3.jpg", ""),
  whyPanel: licensed("resource/video-img.jpg", "Care worker with an older adult at home"),
  ctaBackground: {
    src: "/images/photography/jarkabi-cta-hands.webp",
    alt: "An older woman smiling as someone holds her hands across a table",
  },
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

/** Hero slides — three premium senior/caregiver photographs for one hero slider. */
export const heroSlides: PositionedPhoto[] = [
  { ...library.heroSlide1, position: "50% 45%" },
  { ...library.heroSlide2, position: "55% 45%" },
  { ...library.heroSlide3, position: "55% 40%" },
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
  position: "50% 45%",
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

/** Referrals page — coordinator meeting photograph. */
export const referralsPageImages = {
  intro: licensed(
    "resource/meeting.jpg",
    "Care coordinator meeting with a family about home care",
  ),
} as const;

/** How care works — alternating narrative bands. */
export const howCareWorksImages = {
  meeting: library.mission,
  communication: library.aboutCare2,
  supervision: library.serviceSkilledNursing,
} as const;

/** Growing across Canada — intro landscape photograph. */
export const growingPageImages = {
  intro: library.ctaBackground,
} as const;

/** Team page — caregiver portrait for intro panel. */
export const teamPageImages = {
  intro: licensed("resource/team-2.jpg", "Jarkabi caregiver supporting a client at home"),
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
