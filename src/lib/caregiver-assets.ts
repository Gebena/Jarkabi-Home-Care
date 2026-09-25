/**
 * Licensed Care Giver template assets copied into `public/` for production use.
 * Source: `/templates/caregiver/` and `/templates/caregiver-icons-flat/`.
 * See `docs/licensed-assets.md` for provenance.
 */

const BASE = "/images/caregiver-licensed";

export const caregiverBackgrounds = {
  panelPattern: `${BASE}/backgrounds/pattern-1.png`,
  ctaTexture: `${BASE}/backgrounds/1.png`,
  locationTexture: `${BASE}/backgrounds/2.png`,
  pageBanner: `${BASE}/backgrounds/3.jpg`,
} as const;

/** Flaticon line icons used on Care Giver Home Page 01 "What is Home Care". */
export const caregiverTaskIcons = [
  "/icons/caregiver/189-hair.svg",
  "/icons/caregiver/186-elder.svg",
  "/icons/caregiver/180-medicine.svg",
  "/icons/caregiver/187-walk.svg",
  "/icons/caregiver/183-groceries.svg",
  "/icons/caregiver/188-deal.svg",
] as const;

export function caregiverImage(path: string): string {
  return `${BASE}/${path.replace(/^\//, "")}`;
}

/** Hero slider backgrounds — Care Giver `index.html` main slider. */
export const caregiverHeroSlides = [
  caregiverImage("main-slider/1.jpg"),
  caregiverImage("main-slider/2.jpg"),
  caregiverImage("main-slider/3.jpg"),
] as const;

/**
 * Gallery grid — Care Giver `gallery.html` (19 images).
 * Template package ships grey JPEG placeholders; production uses curated home-care
 * photography in `public/images/caregiver-licensed/gallery/*.webp`.
 */
export const caregiverGalleryImages = Array.from({ length: 19 }, (_, index) =>
  caregiverImage(`gallery/${index + 1}.webp`),
);

/** Team portraits from Care Giver `team.html` (four unique frames in the package). */
export const caregiverTeamImages = [
  caregiverImage("resource/team-1.jpg"),
  caregiverImage("resource/team-2.jpg"),
  caregiverImage("resource/team-3.jpg"),
  caregiverImage("resource/team-4.jpg"),
] as const;

/** Testimonial avatars from Care Giver `testimonial.html`. */
export const caregiverAuthorImages = [
  caregiverImage("resource/author-1.jpg"),
  caregiverImage("resource/author-2.jpg"),
] as const;

/** Blog listing / sidebar thumbnails from Care Giver `blog.html`. */
export const caregiverBlogImages = [
  caregiverImage("resource/news-4.jpg"),
  caregiverImage("resource/news-5.jpg"),
  caregiverImage("resource/news-6.jpg"),
  caregiverImage("resource/news-7.jpg"),
] as const;

export const caregiverBlogThumbs = [
  caregiverImage("resource/post-thumb-1.jpg"),
  caregiverImage("resource/post-thumb-2.jpg"),
  caregiverImage("resource/post-thumb-3.jpg"),
  caregiverImage("resource/post-thumb-4.jpg"),
] as const;

/** How-care-works meeting image from Care Giver `started.html`. */
export const caregiverMeetingImage = caregiverImage("resource/meeting.jpg");

/** Service sidebar contact widget background from Care Giver detail pages. */
export const caregiverContactWidgetImage = caregiverImage("resource/contact-2.jpg");

/** Per-service detail imagery — one entry per Care Giver demo HTML file. */
export const caregiverServiceDetailImages: Record<
  string,
  { hero?: string; inline: string }
> = {
  "elderly-care": {
    hero: caregiverImage("resource/service-15.jpg"),
    inline: caregiverImage("resource/service-16.jpg"),
  },
  "personal-care": { inline: caregiverImage("resource/service-16.jpg") },
  "respite-care": {
    hero: caregiverImage("resource/service-19.jpg"),
    inline: caregiverImage("resource/service-20.jpg"),
  },
  "skilled-nursing": { inline: caregiverImage("resource/service-18.jpg") },
  "day-support": {
    hero: caregiverImage("resource/service-10.jpg"),
    inline: caregiverImage("resource/service-11.jpg"),
  },
  "hospital-discharge": { inline: caregiverImage("resource/service-18.jpg") },
  "companion-care": {
    hero: caregiverImage("resource/service-12.jpg"),
    inline: caregiverImage("resource/service-13.jpg"),
  },
  "chronic-condition-care": { inline: caregiverImage("resource/service-14.jpg") },
  "after-surgery-care": {
    hero: caregiverImage("resource/service-8.jpg"),
    inline: caregiverImage("resource/service-9.jpg"),
  },
  "end-of-life-care": { inline: caregiverImage("resource/service-17.jpg") },
  "special-needs-care": {
    hero: caregiverImage("resource/service-21.jpg"),
    inline: caregiverImage("resource/service-11.jpg"),
  },
};
