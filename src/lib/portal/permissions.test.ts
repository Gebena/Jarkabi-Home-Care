import { describe, expect, it } from "vitest";
import { canAccess, canAccessPortalArea } from "@/lib/portal/permissions";

describe("portal permissions", () => {
  it("denies caregiver access to unassigned client care plans", () => {
    expect(
      canAccess(
        { role: "caregiver", userId: "cg-1", assignedClientIds: ["client-a"] },
        "care_plan",
        "read",
        "client-b",
      ),
    ).toBe(false);
  });

  it("allows assigned caregiver to read client care plan", () => {
    expect(
      canAccess(
        { role: "caregiver", userId: "cg-1", assignedClientIds: ["client-a"] },
        "care_plan",
        "read",
        "client-a",
      ),
    ).toBe(true);
  });

  it("allows client to read own invoices but not write", () => {
    const ctx = { role: "client" as const, userId: "u-1", clientId: "client-a" };
    expect(canAccess(ctx, "invoice", "read", "client-a")).toBe(true);
    expect(canAccess(ctx, "invoice", "write", "client-a")).toBe(false);
  });

  it("denies random client from reading another client's visits", () => {
    expect(
      canAccess(
        { role: "client", userId: "u-1", clientId: "client-a" },
        "visit",
        "read",
        "client-b",
      ),
    ).toBe(false);
  });

  it("allows care coordinator ops area and clinical reads", () => {
    expect(canAccessPortalArea("care_coordinator", "ops")).toBe(true);
    expect(canAccessPortalArea("care_coordinator", "clinical")).toBe(true);
    expect(canAccessPortalArea("caregiver", "clinical")).toBe(false);
  });

  it("restricts audit logs to administrators", () => {
    expect(
      canAccess({ role: "administrator", userId: "a-1" }, "audit_log", "read"),
    ).toBe(true);
    expect(canAccess({ role: "caregiver", userId: "cg-1" }, "audit_log", "read")).toBe(
      false,
    );
  });

  it("allows HR to read job applications", () => {
    expect(canAccess({ role: "hr", userId: "hr-1" }, "job_application", "read")).toBe(true);
    expect(canAccess({ role: "caregiver", userId: "cg-1" }, "job_application", "read")).toBe(
      false,
    );
  });
});
