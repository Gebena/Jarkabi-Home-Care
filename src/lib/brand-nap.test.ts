import { describe, expect, it, afterEach } from "vitest";
import {
  applyBrandEnvOverrides,
  dialablePhoneDigits,
  hasRealAddress,
  isBrandPlaceholder,
  telHref,
} from "./brand-nap";

describe("brand-nap", () => {
  afterEach(() => {
    delete process.env.JARKABI_PRIMARY_PHONE;
    delete process.env.JARKABI_OTTAWA_OFFICE_ADDRESS;
  });

  it("detects bracketed placeholders", () => {
    expect(isBrandPlaceholder("[PRIMARY PHONE]")).toBe(true);
    expect(isBrandPlaceholder("613-555-0100")).toBe(false);
  });

  it("returns tel href only for dialable numbers", () => {
    expect(telHref("[PRIMARY PHONE]")).toBeNull();
    expect(telHref("(613) 555-0100")).toBe("tel:6135550100");
    expect(dialablePhoneDigits("613")).toBeNull();
  });

  it("treats placeholder addresses as not real", () => {
    expect(hasRealAddress("[OTTAWA OFFICE ADDRESS]")).toBe(false);
    expect(hasRealAddress("123 Bank Street, Ottawa ON")).toBe(true);
  });

  it("applies env overrides over CMS values", () => {
    process.env.JARKABI_PRIMARY_PHONE = "613-555-0199";
    const brand = applyBrandEnvOverrides({
      agencyName: "Jarkabi Home Care",
      tagline: "Test",
      primaryPhone: "[PRIMARY PHONE]",
      tollFreePhone: "[TOLL-FREE PHONE]",
      email: "care@jarkabi.ca",
      websiteUrl: "https://jarkabi.ca",
      businessHours: "Mon–Fri",
      ottawaOfficeAddress: "[OTTAWA OFFICE ADDRESS]",
    });
    expect(brand.primaryPhone).toBe("613-555-0199");
    expect(telHref(brand.primaryPhone)).toBe("tel:6135550199");
  });
});
