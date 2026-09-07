import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const TO_EMAIL = "info@novaturkedu.com";

export interface ApplyFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality?: string;
  degree: string;
  language?: string;
  program?: string;
  fieldOfInterest?: string;
  educationalBackground?: string;
  question?: string;
}

function buildEmailHtml(body: ApplyFormPayload): string {
  const rows = [
    ["First Name", body.firstName],
    ["Last Name", body.lastName],
    ["Email", body.email],
    ["Phone", body.phone],
    ["Nationality", body.nationality ?? "—"],
    ["Degree", body.degree],
    ["Language", body.language ?? "—"],
    ["Program", body.program ?? "—"],
    ["Field of Interest", body.fieldOfInterest ?? "—"],
    ["Educational Background", body.educationalBackground ?? "—"],
    ["Question / Message", body.question ?? "—"],
  ];
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;color:#0B1C2D;">${label}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">${value}</td></tr>`
    )
    .join("");
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;">
  <h2 style="color:#0B1C2D;">New application – The Anglo Consultants</h2>
  <p style="color:#555;">A new application form has been submitted.</p>
  <table style="width:100%;border-collapse:collapse;">
    ${tableRows}
  </table>
  <p style="margin-top:24px;color:#888;font-size:12px;">Sent from The Anglo Consultants website.</p>
</body>
</html>`;
}

function getTransporter() {
  // Use SMTP for info@novaturkedu.com (or any custom-domain email)
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
    });
  }
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (gmailUser && gmailPass) {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: gmailUser, pass: gmailPass },
    });
  }
  return null;
}

export async function POST(request: Request) {
  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json(
      {
        error:
          "Email not configured. Set SMTP_HOST, SMTP_USER (e.g. info@novaturkedu.com), and SMTP_PASSWORD in .env.local",
      },
      { status: 500 }
    );
  }

  let body: ApplyFormPayload;
  try {
    body = (await request.json()) as ApplyFormPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.firstName?.trim() || !body.lastName?.trim() || !body.email?.trim() || !body.degree?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields: firstName, lastName, email, degree." },
      { status: 400 }
    );
  }

  const fromAddress = process.env.SMTP_USER ?? process.env.GMAIL_USER ?? "info@novaturkedu.com";

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: TO_EMAIL,
      replyTo: body.email,
      subject: `Application: ${body.firstName} ${body.lastName} – ${body.program || body.degree}`,
      html: buildEmailHtml(body),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
