/** Public legal routes under `/[locale]/legal/[slug]`. */
export const LEGAL_PAGE_SLUGS = [
  "privacy",
  "terms",
  "accessibility",
  "cookies",
  "consent",
  "care-disclaimer",
  "employment-privacy",
  "referral-privacy",
  "feedback-policy",
] as const;

export type LegalPageSlug = (typeof LEGAL_PAGE_SLUGS)[number];

export type LegalPageConfig = {
  /** CMS `legal-pages.slug` value (matches URL segment). */
  cmsSlug: string;
  /** Prefix for `legalPages.*Lead` and `legalPages.*Body` message keys. */
  i18nKey: string;
  /** `footer.*` label key for titles and nav. */
  footerKey: string;
  variant: "standard" | "accessibility";
};

export const LEGAL_PAGES: Record<LegalPageSlug, LegalPageConfig> = {
  privacy: {
    cmsSlug: "privacy",
    i18nKey: "privacy",
    footerKey: "privacy",
    variant: "standard",
  },
  terms: {
    cmsSlug: "terms",
    i18nKey: "terms",
    footerKey: "terms",
    variant: "standard",
  },
  accessibility: {
    cmsSlug: "accessibility",
    i18nKey: "accessibility",
    footerKey: "accessibility",
    variant: "accessibility",
  },
  cookies: {
    cmsSlug: "cookies",
    i18nKey: "cookies",
    footerKey: "cookies",
    variant: "standard",
  },
  consent: {
    cmsSlug: "consent",
    i18nKey: "consent",
    footerKey: "consent",
    variant: "standard",
  },
  "care-disclaimer": {
    cmsSlug: "care-disclaimer",
    i18nKey: "careDisclaimer",
    footerKey: "careDisclaimer",
    variant: "standard",
  },
  "employment-privacy": {
    cmsSlug: "employment-privacy",
    i18nKey: "employmentPrivacy",
    footerKey: "employmentPrivacy",
    variant: "standard",
  },
  "referral-privacy": {
    cmsSlug: "referral-privacy",
    i18nKey: "referralPrivacy",
    footerKey: "referralPrivacy",
    variant: "standard",
  },
  "feedback-policy": {
    cmsSlug: "feedback-policy",
    i18nKey: "feedbackPolicy",
    footerKey: "feedbackPolicy",
    variant: "standard",
  },
};

export function isLegalPageSlug(value: string): value is LegalPageSlug {
  return (LEGAL_PAGE_SLUGS as readonly string[]).includes(value);
}

export function legalPagePath(slug: LegalPageSlug): string {
  return `/legal/${slug}`;
}
