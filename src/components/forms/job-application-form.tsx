"use client";

import { jobApplicationSchema, type JobApplicationInput } from "@/lib/validations/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type JobApplicationFormProps = {
  locale: string;
  jobTitle: string;
};

export function JobApplicationForm({ locale, jobTitle }: JobApplicationFormProps) {
  const t = useTranslations("jobApplicationForm");
  const resumeRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: { locale, jobTitle, province: "Ontario" },
  });

  async function onSubmit(values: JobApplicationInput) {
    setStatus("idle");
    const formData = new FormData();
    formData.set("applicantName", values.applicantName);
    formData.set("email", values.email);
    formData.set("phone", values.phone);
    formData.set("jobTitle", values.jobTitle);
    formData.set("province", values.province);
    if (values.city) formData.set("city", values.city);
    if (values.coverLetter) formData.set("coverLetter", values.coverLetter);
    formData.set("locale", values.locale || locale);

    const resume = resumeRef.current?.files?.[0];
    if (resume) formData.set("resume", resume);

    const response = await fetch("/api/job-application", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset({ locale, jobTitle, province: "Ontario" });
    if (resumeRef.current) resumeRef.current.value = "";
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
      <input type="hidden" {...register("jobTitle")} />
      <input type="hidden" {...register("locale")} />
      <div className="form-grid">
        <label>
          {t("applicantName")}
          <input
            {...register("applicantName")}
            aria-invalid={Boolean(errors.applicantName)}
          />
          {errors.applicantName ? (
            <span className="field-error">{errors.applicantName.message}</span>
          ) : null}
        </label>
        <label>
          {t("email")}
          <input {...register("email")} type="email" aria-invalid={Boolean(errors.email)} />
          {errors.email ? <span className="field-error">{errors.email.message}</span> : null}
        </label>
        <label>
          {t("phone")}
          <input {...register("phone")} type="tel" aria-invalid={Boolean(errors.phone)} />
          {errors.phone ? <span className="field-error">{errors.phone.message}</span> : null}
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
      </div>
      <label>
        {t("coverLetter")}
        <textarea {...register("coverLetter")} rows={5} aria-invalid={Boolean(errors.coverLetter)} />
        {errors.coverLetter ? (
          <span className="field-error">{errors.coverLetter.message}</span>
        ) : null}
      </label>
      <label>
        {t("resume")}
        <input ref={resumeRef} name="resume" type="file" accept=".pdf,.doc,.docx" />
      </label>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
