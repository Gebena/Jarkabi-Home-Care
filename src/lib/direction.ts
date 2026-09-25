import { rtlLocales, type Locale } from "@/i18n/routing";

export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

/**
 * Mirror the horizontal half of a CSS `object-position`.
 *
 * The full-bleed bands wash one side of the photograph and set the copy over
 * that wash. In a right-to-left locale the copy moves to the other side, so the
 * wash, the photograph's mirroring and its focal point all have to move with
 * it — otherwise Arabic runs over the subject's face.
 */
export function mirrorObjectPosition(position: string): string {
  const [x, y = "50%"] = position.split(/\s+/);
  const percent = /^(\d+(?:\.\d+)?)%$/.exec(x);
  if (!percent) return position;
  return `${100 - Number(percent[1])}% ${y}`;
}
