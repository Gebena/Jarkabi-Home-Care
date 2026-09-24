"use client";

import { useState } from "react";

type JobApplicationFormProps = {
  locale: string;
  jobTitle: string;
};

export function JobApplicationForm({ locale, jobTitle }: JobApplicationFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("locale", locale);
    data.set("jobTitle", jobTitle);

    const response = await fetch("/api/job-application", {
      method: "POST",
      body: data,
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) form.reset();
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>Thank you. Our recruitment team will review your application.</h3>
      </div>
    );
  }

  return (
    <form className="care-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-grid">
        <label>Full name<input name="applicantName" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Phone<input name="phone" type="tel" required /></label>
        <label>Province<input name="province" required /></label>
        <label>City<input name="city" /></label>
      </div>
      <label>Cover letter<textarea name="coverLetter" rows={5} /></label>
      <label>
        Resume (PDF)
        <input name="resume" type="file" accept=".pdf,.doc,.docx" />
      </label>
      {status === "error" ? (
        <p className="form-error" role="alert">Unable to submit. Please try again.</p>
      ) : null}
      <button className="button button-primary" type="submit">Submit application</button>
    </form>
  );
}
