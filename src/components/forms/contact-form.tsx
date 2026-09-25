"use client";

import { contactSchema, type ContactInput } from "@/lib/validations/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { locale },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset({ locale });
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>{t("success")}</h3>
      </div>
    );
  }

  return (
    <form className="care-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {status === "error" ? <p className="form-error" role="alert">{t("error")}</p> : null}
      <div className="form-grid">
        <label>
          {t("name")}
          <input {...register("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name ? <span id="name-error" className="field-error">{errors.name.message}</span> : null}
        </label>
        <label>
          {t("phone")}
          <input {...register("phone")} type="tel" aria-invalid={Boolean(errors.phone)} />
          {errors.phone ? <span className="field-error">{errors.phone.message}</span> : null}
        </label>
        <label>
          {t("email")}
          <input {...register("email")} type="email" aria-invalid={Boolean(errors.email)} />
          {errors.email ? <span className="field-error">{errors.email.message}</span> : null}
        </label>
        <label>
          {t("subject")}
          <input {...register("subject")} aria-invalid={Boolean(errors.subject)} />
          {errors.subject ? <span className="field-error">{errors.subject.message}</span> : null}
        </label>
        <label className="full-width">
          {t("message")}
          <textarea {...register("message")} rows={5} aria-invalid={Boolean(errors.message)} />
          {errors.message ? <span className="field-error">{errors.message.message}</span> : null}
        </label>
      </div>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
