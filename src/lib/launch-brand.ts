import { defaultBrand, isBrandPlaceholder } from "@/lib/brand";

/** Vercel / local env keys for launch NAP — set in production before go-live. */
export const launchBrandEnvKeys = {
  primaryPhone: "JARKABI_PRIMARY_PHONE",
  tollFreePhone: "JARKABI_TOLL_FREE_PHONE",
  ottawaOfficeAddress: "JARKABI_OTTAWA_OFFICE_ADDRESS",
  businessHours: "JARKABI_BUSINESS_HOURS",
} as const;

function fromEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  if (!value || isBrandPlaceholder(value)) return undefined;
  return value;
}

type BrandFields = {
  primaryPhone?: string;
  tollFreePhone?: string;
  ottawaOfficeAddress?: string;
  businessHours?: string;
};

/** Apply launch env overrides on top of CMS or default brand values. */
export function applyLaunchBrandOverrides<T extends BrandFields>(brand: T): T {
  const next = { ...brand };
  const phone = fromEnv(launchBrandEnvKeys.primaryPhone);
  const tollFree = fromEnv(launchBrandEnvKeys.tollFreePhone);
  const address = fromEnv(launchBrandEnvKeys.ottawaOfficeAddress);
  const hours = fromEnv(launchBrandEnvKeys.businessHours);

  if (phone) next.primaryPhone = phone;
  if (tollFree) next.tollFreePhone = tollFree;
  if (address) next.ottawaOfficeAddress = address;
  if (hours) next.businessHours = hours;

  return next;
}

export function launchBrandSeedDefaults() {
  return applyLaunchBrandOverrides({ ...defaultBrand });
}

export function launchBrandConfigured(): {
  phone: boolean;
  address: boolean;
  database: boolean;
} {
  return {
    phone: Boolean(fromEnv(launchBrandEnvKeys.primaryPhone)),
    address: Boolean(fromEnv(launchBrandEnvKeys.ottawaOfficeAddress)),
    database: Boolean(process.env.DATABASE_URI?.trim()?.startsWith("postgresql")),
  };
}
