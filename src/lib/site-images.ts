/**
 * Jarkabi Home Care — photography set.
 *
 * Care Giver's photography direction is warm, naturally lit, candid senior care:
 * caregivers with seniors, family interaction, older adults at home, companionship,
 * mobility assistance, nursing support and personal care. Every photograph below
 * follows that direction.
 *
 * The Care Giver demo photographs themselves are not redistributable under the
 * Envato licence, so this set is commissioned imagery held in
 * `public/images/photography`. See `docs/licensed-assets.md` for provenance and
 * for the plan to replace it with photography of real Jarkabi clients and staff.
 *
 * Two rules when editing:
 *  1. Run `npm run verify:images` — the site previously shipped a 404 hero and an
 *     opera house on a service card because nobody checked.
 *  2. Look at the photograph at the crop the slot actually uses before trusting a
 *     description of it, and write alt text from what you see.
 */

const DIR = "/images/photography";

type Photo = {
  src: string;
  alt: string;
};

/**
 * `position` is a CSS object-position and `flip` mirrors the frame. Both belong
 * to the photograph rather than the component: a wash that covers the left of a
 * band only works if the subject happens to sit on the right, and which way a
 * given frame needs nudging is a fact about the frame.
 *
 * Every frame in this set was composed with its subject to the right of centre,
 * so nothing currently needs `flip` — it stays because the inner-page banner and
 * the call to action both mirror themselves under RTL locales.
 */
type PositionedPhoto = Photo & { position: string; flip?: boolean };

function local(file: string, alt: string): Photo {
  return { src: `${DIR}/${file}.webp`, alt };
}

/**
 * Every photograph in the set, described as it actually appears. Alt text is
 * written from the frame, not from the prompt that produced it.
 */
const library = {
  heroCareConversation: local(
    "jarkabi-hero-care-conversation",
    "A care worker sitting close beside a smiling older man in his living room, her hand on his shoulder",
  ),
  heroKitchenTea: local(
    "jarkabi-hero-kitchen-tea",
    "A care worker pouring tea for an older woman at her kitchen counter, both laughing",
  ),
  heroGardenWalk: local(
    "jarkabi-hero-garden-walk",
    "A care worker walking an older woman along a garden path, steadying her walking frame",
  ),
  albumOnTheSofa: local(
    "jarkabi-pillar-enrich",
    "An older woman and a younger woman looking through a photo album together on a sofa",
  ),
  wateringHerbs: local(
    "jarkabi-pillar-empower",
    "An older man watering herbs on his kitchen windowsill while a care worker stands with him",
  ),
  boardGame: local(
    "jarkabi-pillar-engage",
    "An older woman and a care worker laughing over a board game at a living room table",
  ),
  teaConversation: local(
    "jarkabi-why-tea-conversation",
    "An older woman talking with a care worker across a table set with a teapot and fruit",
  ),
  handsHeld: local(
    "jarkabi-cta-hands",
    "An older woman smiling as someone holds her hands across a table",
  ),
  bannerTexture: local(
    "jarkabi-page-banner-texture",
    "An older person's hands resting on a knitted blanket beside a mug of tea",
  ),
  doorstepWelcome: local(
    "jarkabi-location-home-visit",
    "A care worker arriving at a front door and being greeted by an older woman",
  ),
  coupleAtHome: local(
    "jarkabi-location-couple-home",
    "An older couple laughing together over a photo album in their living room",
  ),
  blogFamilyPlanning: local(
    "jarkabi-blog-family-planning",
    "A daughter and her older mother talking over a notebook at the dining table",
  ),
  blogHomeSafety: local(
    "jarkabi-blog-home-safety",
    "A care worker fitting a grab rail in a doorway while an older man looks on",
  ),
  blogNutrition: local(
    "jarkabi-blog-nutrition",
    "An older woman and a care worker chopping vegetables together at a kitchen counter",
  ),
  servicePersonalCare: local(
    "svc-personal-care",
    "A care worker helping an older woman fasten her cardigan in her sunlit living room",
  ),
  serviceSeniorHomeCare: local(
    "svc-senior-home-care",
    "An older woman with a cup of tea under a blanket in her armchair while a care worker tidies behind her",
  ),
  serviceCompanionCare: local(
    "svc-companion-care",
    "An older man laughing over a cup of tea beside a companion on a garden bench",
  ),
  serviceRegisteredNursing: local(
    "svc-registered-nursing",
    "A nurse in scrubs taking an older man's blood pressure at his dining table",
  ),
  serviceDementiaSupport: local(
    "svc-dementia-support",
    "A care worker and an older woman looking through a box of old photographs together",
  ),
  serviceRespiteCare: local(
    "svc-respite-care",
    "A family member handing over to a care worker at the front door, an older relative seated inside",
  ),
  servicePostHospitalCare: local(
    "svc-post-hospital-care",
    "A care worker supporting an older man as he rises from his armchair, his walking stick beside him",
  ),
  servicePalliativeCare: local(
    "svc-palliative-care",
    "A care worker sitting quietly at an older woman's bedside, holding her hand",
  ),
} as const;

/**
 * Hero slides. The slider pairs these with whatever hero copy exists, so adding
 * photography here is a one-line change.
 */
export const heroSlides: PositionedPhoto[] = [
  { ...library.heroCareConversation, position: "50% 45%" },
  { ...library.heroKitchenTea, position: "55% 45%" },
  { ...library.heroGardenWalk, position: "55% 40%" },
];

/** Three colour-overlaid pillar blocks: Enrich / Empower / Engage. */
export const pillarImages: Photo[] = [
  library.albumOnTheSofa,
  library.wateringHerbs,
  library.boardGame,
];

/**
 * "Here For You Always" — the overlapping photograph carrying the video play
 * button. A tall slot, so it wants a frame whose subjects sit near the centre.
 */
export const whyChooseUsImage: PositionedPhoto = {
  ...library.teaConversation,
  position: "50% 40%",
};

/** Full-bleed mid-page call-to-action banner. */
export const ctaImage: PositionedPhoto = {
  ...library.handsHeld,
  position: "55% 40%",
};

/**
 * Banner behind every inner page title. It sits under a heavy plum wash, so it
 * reads as texture rather than as a subject — which is what lets one photograph
 * serve every page without looking repetitive.
 */
export const pageBannerImage: PositionedPhoto = {
  ...library.bannerTexture,
  position: "50% 55%",
};

/** Location finder collage — two tilted prints behind the province picker. */
export const locationImages: Photo[] = [library.doorstepWelcome, library.coupleAtHome];

/**
 * Square service card imagery, keyed by service slug. Every service has its own
 * photograph so no two cards in a row repeat.
 */
export const serviceImages: Record<string, Photo> = {
  "personal-care": library.servicePersonalCare,
  "senior-home-care": library.serviceSeniorHomeCare,
  "companion-care": library.serviceCompanionCare,
  "registered-nursing": library.serviceRegisteredNursing,
  "dementia-support": library.serviceDementiaSupport,
  "respite-care": library.serviceRespiteCare,
  "post-hospital-care": library.servicePostHospitalCare,
  "palliative-care": library.servicePalliativeCare,
};

export const serviceFallbackImage: Photo = library.serviceSeniorHomeCare;

/** Blog / resource card imagery, used when a post has no cover image. */
export const blogFallbackImages: Photo[] = [
  library.blogFamilyPlanning,
  library.blogHomeSafety,
  library.blogNutrition,
];

/* ── Shared by inner pages ── */

export const aboutImages = {
  main: library.teaConversation,
  small1: library.albumOnTheSofa,
  small2: library.boardGame,
};