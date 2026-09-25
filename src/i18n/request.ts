import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import en from "../../messages/en.json";

type Messages = Record<string, unknown>;

/**
 * Translations for ti, byn, tig, ar and am cover only part of the site. Layering
 * them over English keeps every page renderable instead of emitting raw key paths
 * for whatever has not been translated yet.
 */
function withEnglishFallback(messages: Messages, fallback: Messages): Messages {
  const merged: Messages = { ...fallback };

  for (const [key, value] of Object.entries(messages)) {
    const base = fallback[key];

    if (isPlainObject(value) && isPlainObject(base)) {
      merged[key] = withEnglishFallback(value, base);
    } else if (value !== undefined && value !== "") {
      merged[key] = value;
    }
  }

  return merged;
}

function isPlainObject(value: unknown): value is Messages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  if (locale === routing.defaultLocale) {
    return { locale, messages: en as Messages };
  }

  try {
    const translated = (await import(`../../messages/${locale}.json`)).default as Messages;
    return { locale, messages: withEnglishFallback(translated, en as Messages) };
  } catch {
    return { locale, messages: en as Messages };
  }
});
