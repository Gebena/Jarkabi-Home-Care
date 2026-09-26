/** True when pathname is the locale homepage (hero overlay header). */
export function isHomePath(pathname: string, locale: string): boolean {
  const base = `/${locale}`;
  return pathname === base || pathname === `${base}/`;
}
