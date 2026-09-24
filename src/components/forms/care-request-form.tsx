"use client";

import { isOttawaAreaServed, provinceFromPostalCode } from "@/lib/location";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function CareRequestForm({ locale }: { locale: string }) {
  const t = useTranslations("form");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "not-served">("idle");
  const [areaServed, setAreaServed] = useState(true);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const postalCode = String(data.get("postalCode") || "");
    const city = String(data.get("city") || "");
    const province = String(data.get("province") || "");
    const detected = provinceFromPostalCode(postalCode);
    const served = isOttawaAreaServed(city, province || detected || "");

    setAreaServed(served);

    const response = await fetch("/api/care-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...Object.fromEntries(data.entries()),
        locale,
        areaServed: served,
      }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>{areaServed ? t("success") : `${t("notServed")} ${t("joinWaitlist")}.`}</h3>
        {!areaServed ? (
          <p>Your details have been saved. We will notify you when service becomes available in your area.</p>
        ) : null}
      </div>
    );
  }

  return (
    <form className="care-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          {t("name")}
          <input name="name" required />
        </label>
        <label>
          {t("phone")}
          <input name="phone" type="tel" required />
        </label>
        <label>
          {t("email")}
          <input name="email" type="email" required />
        </label>
        <label>
          {t("province")}
          <input name="province" defaultValue="Ontario" required />
        </label>
        <label>
          {t("city")}
          <input name="city" required />
        </label>
        <label>
          {t("postalCode")}
          <input name="postalCode" required />
        </label>
        <label>
          {t("relationship")}
          <input name="relationship" />
        </label>
        <label>
          {t("careType")}
          <input name="careType" />
        </label>
        <label>
          {t("startDate")}
          <input name="startDate" type="date" />
        </label>
        <label>
          {t("hours")}
          <input name="hours" />
        </label>
        <label>
          {t("language")}
          <input name="preferredLanguage" />
        </label>
        <label>
          {t("contactTime")}
          <input name="contactTime" />
        </label>
      </div>
      <label>
        {t("notes")}
        <textarea name="notes" rows={5} />
      </label>

      {status === "not-served" && (
        <p className="form-warning" role="alert">
          {t("notServed")} {t("joinWaitlist")}.
        </p>
      )}
      {status === "error" && (
        <p className="form-error" role="alert">Unable to submit. Please try again or call our care team.</p>
      )}

      <button className="button button-primary" type="submit">
        {areaServed === false && status === "idle" ? t("joinWaitlist") : t("submit")}
      </button>
    </form>
  );
}
