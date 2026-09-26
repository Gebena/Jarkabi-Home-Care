"use client";

import { isOttawaAreaServed, provinceFromPostalCode } from "@/lib/location";
import { careRequestSchema, type CareRequestInput } from "@/lib/validations/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const TOTAL_STEPS = 3;

const stepFields: Record<number, (keyof CareRequestInput)[]> = {
  1: ["name", "phone", "email", "province", "city", "postalCode"],
  2: [
    "relationship",
    "careType",
    "startDate",
    "hours",
    "preferredLanguage",
    "contactTime",
    "notes",
    "urgentCare",
  ],
  3: ["consentContact", "consentMarketing"],
};

function FieldError({ message }: { message?: string }) {
  return message ? <span className="field-error">{message}</span> : null;
}

export function CareRequestForm({ locale }: { locale: string }) {
  const t = useTranslations("form");
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [areaServed, setAreaServed] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CareRequestInput>({
    resolver: zodResolver(careRequestSchema),
    defaultValues: {
      locale,
      province: "Ontario",
      urgentCare: false,
      consentContact: false,
      consentMarketing: false,
    },
  });

  const values = watch();

  const served = useMemo(() => {
    const detected = provinceFromPostalCode(values.postalCode || "");
    return isOttawaAreaServed(values.city || "", values.province || detected || "");
  }, [values.city, values.postalCode, values.province]);

  async function goNext() {
    const valid = await trigger(stepFields[step]);
    if (!valid) return;

    if (step === 1) {
      setAreaServed(served);
    }

    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  async function onSubmit(data: CareRequestInput) {
    setStatus("idle");
    const detected = provinceFromPostalCode(data.postalCode);
    const servedNow = isOttawaAreaServed(data.city, data.province || detected || "");
    setAreaServed(servedNow);

    const response = await fetch("/api/care-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        locale,
        areaServed: servedNow,
      }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setStep(1);
    reset({
      locale,
      province: "Ontario",
      urgentCare: false,
      consentContact: false,
      consentMarketing: false,
    });
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>{areaServed ? t("success") : `${t("notServed")} ${t("joinWaitlist")}.`}</h3>
        {!areaServed ? <p>{t("waitlistSaved")}</p> : null}
      </div>
    );
  }

  return (
    <div className="care-request-form">
      <div
        role="alert"
        className="mb-6 flex items-start gap-3 border border-line bg-blush-soft p-4 text-sm text-ink"
      >
        <AlertTriangle className="mt-0.5 shrink-0 text-tan-ink" aria-hidden />
        <p>{t("emergencyNotice")}</p>
      </div>

      <nav aria-label={t("progressLabel")} className="form-steps">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className={`form-step${index === step ? " form-step--active" : ""}${index < step ? " form-step--done" : ""}`}
            aria-current={index === step ? "step" : undefined}
          >
            <span className="form-step__index" aria-hidden="true">
              {String(index).padStart(2, "0")}
            </span>
            <span className="form-step__label">{t(`step${index}Title` as "step1Title")}</span>
          </div>
        ))}
      </nav>

      <p className="mt-3 text-sm text-body">
        {t("stepProgress", { current: step, total: TOTAL_STEPS })}
      </p>

      <form className="care-form mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        {status === "error" ? (
          <p className="form-error" role="alert">
            {t("error")}
          </p>
        ) : null}

        {step === 1 ? (
          <div className="form-grid">
            <label>
              {t("name")}
              <input
                {...register("name")}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              <FieldError message={errors.name?.message} />
            </label>
            <label>
              {t("phone")}
              <input
                {...register("phone")}
                type="tel"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
              />
              <FieldError message={errors.phone?.message} />
            </label>
            <label>
              {t("email")}
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              <FieldError message={errors.email?.message} />
            </label>
            <label>
              {t("province")}
              <input {...register("province")} aria-invalid={Boolean(errors.province)} />
              <FieldError message={errors.province?.message} />
            </label>
            <label>
              {t("city")}
              <input {...register("city")} autoComplete="address-level2" aria-invalid={Boolean(errors.city)} />
              <FieldError message={errors.city?.message} />
            </label>
            <label>
              {t("postalCode")}
              <input
                {...register("postalCode")}
                autoComplete="postal-code"
                aria-invalid={Boolean(errors.postalCode)}
              />
              <FieldError message={errors.postalCode?.message} />
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <>
            {!served ? (
              <p className="form-warning" role="status">
                {t("notServed")} {t("joinWaitlist")}.
              </p>
            ) : null}
            <div className="form-grid">
              <label>
                {t("relationship")}
                <input {...register("relationship")} />
              </label>
              <label>
                {t("careType")}
                <input {...register("careType")} />
              </label>
              <label>
                {t("startDate")}
                <input {...register("startDate")} type="date" />
              </label>
              <label>
                {t("hours")}
                <input {...register("hours")} />
              </label>
              <label>
                {t("language")}
                <input {...register("preferredLanguage")} />
              </label>
              <label>
                {t("contactTime")}
                <input {...register("contactTime")} />
              </label>
            </div>
            <label className="full-width">
              {t("notes")}
              <textarea {...register("notes")} rows={5} />
            </label>
            <label className="checkbox-label">
              <input type="checkbox" {...register("urgentCare")} />
              <span>
                <strong>{t("urgentCare")}</strong>
                <span className="block text-sm text-body">{t("urgentCareHelp")}</span>
              </span>
            </label>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <div className="form-review" aria-live="polite">
              <h3 className="font-display text-lg">{t("reviewTitle")}</h3>
              <dl className="mt-4 grid gap-2 text-sm">
                <div>
                  <dt className="font-semibold text-ink">{t("name")}</dt>
                  <dd className="text-body">{values.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">{t("phone")}</dt>
                  <dd className="text-body">{values.phone}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">{t("email")}</dt>
                  <dd className="text-body">{values.email}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">{t("locationSummary")}</dt>
                  <dd className="text-body">
                    {values.city}, {values.province} {values.postalCode}
                  </dd>
                </div>
                {values.urgentCare ? (
                  <div>
                    <dt className="font-semibold text-ink">{t("urgentCare")}</dt>
                    <dd className="text-body">{t("urgentYes")}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <fieldset className="mt-6 border-0 p-0">
              <legend className="sr-only">{t("consentLegend")}</legend>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register("consentContact")}
                  aria-invalid={Boolean(errors.consentContact)}
                />
                <span>{t("consentContact")}</span>
              </label>
              <FieldError message={errors.consentContact?.message} />
              <label className="checkbox-label mt-3">
                <input type="checkbox" {...register("consentMarketing")} />
                <span>{t("consentMarketing")}</span>
              </label>
              <p className="mt-3 text-sm text-body">
                {t("consentPrivacy")}{" "}
                <Link href={`/${locale}/legal/privacy`} className="text-tan-ink underline">
                  {t("consentPrivacyLink")}
                </Link>{" "}
                {t("consentAnd")}{" "}
                <Link href={`/${locale}/legal/consent`} className="text-tan-ink underline">
                  {t("consentInfoLink")}
                </Link>
                .
              </p>
            </fieldset>
          </>
        ) : null}

        <div className="form-actions mt-6 flex flex-wrap gap-3">
          {step > 1 ? (
            <button className="button" type="button" onClick={goBack}>
              {t("back")}
            </button>
          ) : null}
          {step < TOTAL_STEPS ? (
            <button className="button button-primary" type="button" onClick={goNext}>
              {t("next")}
            </button>
          ) : (
            <button className="button button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? t("submitting")
                : served === false
                  ? t("joinWaitlist")
                  : t("submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
