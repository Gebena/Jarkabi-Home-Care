import { sendCareTeamEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`job-application:${ip}`, 5, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const form = await request.formData();
    const payload = await getPayloadClient();

    let resumeId: number | string | undefined;
    const resume = form.get("resume");

    if (resume instanceof File && resume.size > 0) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      const uploaded = await payload.create({
        collection: "media",
        data: { alt: `Resume — ${form.get("applicantName")}` },
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
        applicantName: String(form.get("applicantName") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        jobTitle: String(form.get("jobTitle") || ""),
        province: String(form.get("province") || ""),
        city: String(form.get("city") || ""),
        coverLetter: String(form.get("coverLetter") || ""),
        locale: String(form.get("locale") || "en"),
        resume: resumeId,
        status: "new",
      },
    });

    await sendCareTeamEmail({
      subject: `New job application — ${form.get("applicantName")}`,
      text: [
        `Applicant: ${form.get("applicantName")}`,
        `Job: ${form.get("jobTitle")}`,
        `Email: ${form.get("email")}`,
        `Phone: ${form.get("phone")}`,
        `Location: ${form.get("city")}, ${form.get("province")}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[job-application]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
