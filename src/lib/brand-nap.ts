import type { BrandData } from "@/lib/cms";
import { defaultBrand } from "@/lib/brand";

/** Bracketed CMS placeholders like `[PRIMARY PHONE]` — never publish as real NAP. */
export function isBrandPlaceholder(value: string | undefined | null): boolean {
  if (!value?.trim()) return true;
  return /^\[.*\]$/.test(value.trim());
}

/** North-American dialable digits, or null when phone is missing or placeholder. */
export function dialablePhoneDigits(phone: string): string | null {
  if (isBrandPlaceholder(phone)) return null;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}

export function telHref(phone: string): string | null {
  const digits = dialablePhoneDigits(phone);
  return digits ? `tel:${digits}` : null;
}

export function hasRealAddress(address: string): boolean {
  return !isBrandPlaceholder(address);
}

/**
 * Vercel env overrides let owners wire NAP before editing Payload Brand Settings.
 * JARKABI_PRIMARY_PHONE, JARKABI_TOLL_FREE_PHONE, JARKABI_OTTAWA_OFFICE_ADDRESS
 */
export function applyBrandEnvOverrides(brand: BrandData): BrandData {
  return {
    ...brand,
    primaryPhone: process.env.JARKABI_PRIMARY_PHONE?.trim() || brand.primaryPhone,
    tollFreePhone: process.env.JARKABI_TOLL_FREE_PHONE?.trim() || brand.tollFreePhone,
    ottawaOfficeAddress:
      process.env.JARKABI_OTTAWA_OFFICE_ADDRESS?.trim() || brand.ottawaOfficeAddress,
  };
}

export function resolveBrandFromDefaults(partial?: Partial<BrandData>): BrandData {
  return applyBrandEnvOverrides({ ...defaultBrand, ...partial });
}
