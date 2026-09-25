import { describe, expect, it } from "vitest";
import {
  careRequestSchema,
  contactSchema,
  jobApplicationSchema,
  referralSchema,
} from "./forms";

describe("form validation schemas", () => {
  it("accepts a valid care request", () => {
    const result = careRequestSchema.safeParse({
      name: "Jane Doe",
      phone: "613-555-0100",
      email: "jane@example.com",
      province: "Ontario",
      city: "Ottawa",
      postalCode: "K1A 0A1",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid contact email", () => {
    const result = contactSchema.safeParse({
      name: "Jane Doe",
      phone: "613-555-0100",
      email: "not-an-email",
      subject: "Question",
      message: "I would like more information about home care.",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid referral", () => {
    const result = referralSchema.safeParse({
      organizationName: "Ottawa Hospital",
      contactName: "Alex Smith",
      phone: "613-555-0101",
      email: "alex@example.com",
      province: "Ontario",
      referrerType: "Hospital",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a valid job application", () => {
    const result = jobApplicationSchema.safeParse({
      applicantName: "Sam Lee",
      email: "sam@example.com",
      phone: "613-555-0102",
      jobTitle: "Personal Support Worker",
      province: "Ontario",
    });
    expect(result.success).toBe(true);
  });
});
