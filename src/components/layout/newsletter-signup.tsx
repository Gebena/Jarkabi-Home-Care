"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

type NewsletterSignupProps = {
  locale: string;
  className?: string;
};

/**
 * Care Giver `.newsletter-widget` — email field and tan SUBSCRIBE button on plum.
 */
export function NewsletterSignup({ locale, className }: NewsletterSignupProps) {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), locale }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={cn(className)}>
      <h2 className="font-display text-lg text-white">{t("newsletterTitle")}</h2>
      <span aria-hidden="true" className="mt-3 block h-0.5 w-9 bg-tan" />
      <p className="mt-5 text-sm leading-relaxed text-white/70">{t("newsletterLead")}</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          {t("newsletterPlaceholder")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error" || status === "success") setStatus("idle");
          }}
          placeholder={t("newsletterPlaceholder")}
          className="w-full border border-white/25 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-tan focus:outline-none focus:ring-1 focus:ring-tan"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-w-[9.5rem] items-center justify-center bg-tan px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? t("newsletterSubmitting") : t("newsletterSubscribe")}
        </button>
      </form>

      {status === "success" ? (
        <p role="status" className="mt-3 text-sm text-tan-light">
          {t("newsletterSuccess")}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {t("newsletterError")}
        </p>
      ) : null}
    </div>
  );
}
