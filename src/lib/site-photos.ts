/**
 * Photography on file in `public/images/photography/` is approved for the site.
 * Set NEXT_PUBLIC_PHOTOS_STAGING=true only to re-enable the disclosure banner.
 */
export function photosAreStaging(): boolean {
  return process.env.NEXT_PUBLIC_PHOTOS_STAGING === "true";
}
