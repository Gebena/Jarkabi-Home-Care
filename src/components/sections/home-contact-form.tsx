"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function HomeContactForm({ locale }: { locale: string }) {
  const t = useTranslations("contactCta");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/care-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          city: data.get("address"),
          province: "Ontario",
          postalCode: "K1A 0A1",
          notes: data.get("message"),
          locale,
          areaServed: true,
          relationship: "Homepage consultation",
          careType: "General inquiry",
        }),
      });

      if (!response.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>{t("success")}</h3>
      </div>
    );
  }

  return (
    <form className="home-contact-form" onSubmit={handleSubmit}>
      {status === "error" ? (
        <p className="form-error" role="alert">{t("error")}</p>
      ) : null}
      <div className="contact-form-row">
        <input name="name" type="text" placeholder={t("namePlaceholder")} required />
        <input name="phone" type="tel" placeholder={t("phoneFieldPlaceholder")} required />
      </div>
      <input name="email" type="email" placeholder={t("emailPlaceholder")} required />
      <input name="address" type="text" placeholder={t("addressPlaceholder")} />
      <textarea name="message" rows={4} placeholder={t("messagePlaceholder")} required />
      <button type="submit" className="button button-primary button-full" disabled={status === "loading"}>
        {status === "loading" ? t("submitting") : t("submit")}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
