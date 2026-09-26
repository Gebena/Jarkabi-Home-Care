import { z } from "zod";

const phonePattern = /^[\d\s()+-]{7,20}$/;

export const careRequestSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  phone: z.string().trim().regex(phonePattern, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email"),
  province: z.string().trim().min(2).max(80),
  city: z.string().trim().min(2).max(80),
  postalCode: z.string().trim().min(3).max(12),
  relationship: z.string().trim().max(120).optional(),
  careType: z.string().trim().max(120).optional(),
  startDate: z.string().trim().max(40).optional(),
  hours: z.string().trim().max(80).optional(),
  preferredLanguage: z.string().trim().max(80).optional(),
  contactTime: z.string().trim().max(80).optional(),
  notes: z.string().trim().max(2000).optional(),
  urgentCare: z.boolean().optional(),
  consentContact: z.boolean().refine((value) => value === true, {
    message: "Consent is required to contact you about this request",
  }),
  consentMarketing: z.boolean().optional(),
  locale: z.string().trim().max(8).optional(),
  areaServed: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(phonePattern, "Enter a valid phone number"),
  email: z.string().trim().email(),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(2000),
  locale: z.string().trim().max(8).optional(),
});

export const referralSchema = z.object({
  organizationName: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(phonePattern),
  email: z.string().trim().email(),
  province: z.string().trim().min(2).max(80),
  city: z.string().trim().max(80).optional(),
  referrerType: z.string().trim().min(2).max(80),
  clientSummary: z.string().trim().max(2000).optional(),
  notes: z.string().trim().max(2000).optional(),
  locale: z.string().trim().max(8).optional(),
});

export const jobApplicationSchema = z.object({
  applicantName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phonePattern),
  jobTitle: z.string().trim().min(2).max(160),
  province: z.string().trim().min(2).max(80),
  city: z.string().trim().max(80).optional(),
  coverLetter: z.string().trim().max(2000).optional(),
  locale: z.string().trim().max(8).optional(),
});

export type CareRequestInput = z.infer<typeof careRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ReferralInput = z.infer<typeof referralSchema>;
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
