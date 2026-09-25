import type { Metadata } from "next";

/** Set `GOOGLE_SITE_VERIFICATION` in Vercel to the meta tag content from Search Console. */
export function googleSiteVerificationMetadata(): Pick<Metadata, "verification"> {
  const token = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  if (!token) return {};
  return { verification: { google: token } };
}
