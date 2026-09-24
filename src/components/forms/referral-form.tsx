"use client";

import { useState } from "react";

export function ReferralForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(data.entries()), locale }),
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>Thank you. Our referral team will follow up shortly.</h3>
      </div>
    );
  }

  return (
    <form className="care-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>Organization name<input name="organizationName" required /></label>
        <label>Your name<input name="contactName" required /></label>
        <label>Phone<input name="phone" type="tel" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Province<input name="province" required /></label>
        <label>City<input name="city" /></label>
        <label>
          Referrer type
          <select name="referrerType" required defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Hospital</option>
            <option>Physician</option>
            <option>Nurse</option>
            <option>Social Worker</option>
            <option>Case Manager</option>
            <option>Community Organization</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <label>Client summary<textarea name="clientSummary" rows={4} /></label>
      <label>Additional notes<textarea name="notes" rows={3} /></label>
      {status === "error" ? (
        <p className="form-error" role="alert">Unable to submit. Please call our care team.</p>
      ) : null}
      <button className="button button-primary" type="submit">Submit referral</button>
    </form>
  );
}
