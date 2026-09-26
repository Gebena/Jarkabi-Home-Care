import { sendCareTeamEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { mirrorFormSubmission } from "@/lib/supabase/forms";
import { jobApplicationSchema } from "@/lib/validations/forms";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`job-application:${ip}`, 5, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const form = await request.formData();
    const parsed = jobApplicationSchema.safeParse({
      applicantName: form.get("applicantName"),
      email: form.get("email"),
      phone: form.get("phone"),
      jobTitle: form.get("jobTitle"),
      province: form.get("province"),
      city: form.get("city"),
      coverLetter: form.get("coverLetter"),
      locale: form.get("locale"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation_failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const payload = await getPayloadClient();

    let resumeId: number | string | undefined;
    const resume = form.get("resume");

    if (resume instanceof File && resume.size > 0) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      const uploaded = await payload.create({
        collection: "media",
        data: { alt: `Resume — ${data.applicantName}` },
        file: {
          data: buffer,
          mimetype: resume.type || "application/pdf",
          name: resume.name,
          size: resume.size,
        },
      });
      resumeId = uploaded.id;
    }

    await payload.create({
      collection: "job-applications",
      data: {
        applicantName: data.applicantName,
        email: data.email,
        phone: data.phone,
        jobTitle: data.jobTitle,
        province: data.province,
        city: data.city,
        coverLetter: data.coverLetter,
        locale: data.locale || "en",
        resume: resumeId,
        status: "new",
      },
    });

    await mirrorFormSubmission({
      formType: "job_application",
      locale: data.locale,
      sourceIp: ip,
      payload: { ...data, resumeUploaded: Boolean(resumeId) },
    });

    await sendCareTeamEmail({
      subject: `New job application — ${data.applicantName}`,
      text: [
        `Applicant: ${data.applicantName}`,
        `Job: ${data.jobTitle}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Location: ${data.city || "—"}, ${data.province}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[job-application]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
