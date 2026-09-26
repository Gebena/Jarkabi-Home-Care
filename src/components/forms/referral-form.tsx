"use client";

import { referralSchema, type ReferralInput } from "@/lib/validations/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

const referrerTypeOptions = [
  { value: "Hospital", labelKey: "referrerHospital" },
  { value: "Physician", labelKey: "referrerPhysician" },
  { value: "Nurse", labelKey: "referrerNurse" },
  { value: "Social Worker", labelKey: "referrerSocialWorker" },
  { value: "Case Manager", labelKey: "referrerCaseManager" },
  { value: "Community Organization", labelKey: "referrerCommunityOrganization" },
  { value: "Retirement Residence", labelKey: "referrerRetirementResidence" },
  { value: "Other", labelKey: "referrerOther" },
] as const;

export function ReferralForm({ locale }: { locale: string }) {
  const t = useTranslations("referralForm");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReferralInput>({
    resolver: zodResolver(referralSchema),
    defaultValues: { locale, province: "Ontario" },
  });

  async function onSubmit(values: ReferralInput) {
    setStatus("idle");
    const response = await fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset({ locale, province: "Ontario" });
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
      {status === "error" ? (
        <p className="form-error" role="alert">
          {t("error")}
        </p>
      ) : null}
      <div className="form-grid">
        <label>
          {t("organizationName")}
          <input
            {...register("organizationName")}
            aria-invalid={Boolean(errors.organizationName)}
          />
          {errors.organizationName ? (
            <span className="field-error">{errors.organizationName.message}</span>
          ) : null}
        </label>
        <label>
          {t("contactName")}
          <input {...register("contactName")} aria-invalid={Boolean(errors.contactName)} />
          {errors.contactName ? (
            <span className="field-error">{errors.contactName.message}</span>
          ) : null}
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
          {t("province")}
          <input {...register("province")} aria-invalid={Boolean(errors.province)} />
          {errors.province ? <span className="field-error">{errors.province.message}</span> : null}
        </label>
        <label>
          {t("city")}
          <input {...register("city")} aria-invalid={Boolean(errors.city)} />
          {errors.city ? <span className="field-error">{errors.city.message}</span> : null}
        </label>
        <label>
          {t("referrerType")}
          <select {...register("referrerType")} defaultValue="" aria-invalid={Boolean(errors.referrerType)}>
            <option value="" disabled>
              {t("referrerTypePlaceholder")}
            </option>
            {referrerTypeOptions.map(({ value, labelKey }) => (
              <option key={value} value={value}>
                {t(labelKey)}
              </option>
            ))}
          </select>
          {errors.referrerType ? (
            <span className="field-error">{errors.referrerType.message}</span>
          ) : null}
        </label>
      </div>
      <label>
        {t("clientSummary")}
        <textarea {...register("clientSummary")} rows={4} aria-invalid={Boolean(errors.clientSummary)} />
        {errors.clientSummary ? (
          <span className="field-error">{errors.clientSummary.message}</span>
        ) : null}
      </label>
      <label>
        {t("notes")}
        <textarea {...register("notes")} rows={3} aria-invalid={Boolean(errors.notes)} />
        {errors.notes ? <span className="field-error">{errors.notes.message}</span> : null}
      </label>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
