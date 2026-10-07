import { NextResponse } from "next/server";

// Emails RSVP and Memory Book submissions to the tribute inbox via Resend.
// Required env var (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   – API key from https://resend.com/api-keys
// Optional:
//   CONTACT_TO_EMAIL   – inbox that receives submissions (defaults to the tribute Gmail)
//   CONTACT_FROM_EMAIL – verified sender, e.g. "Rick's Memorial <noreply@rickladow.info>"
//                        (defaults to Resend's test sender, which can only deliver to the
//                        email address that owns the Resend account)

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "ricksmemorialtribute11726@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Rick's Memorial <onboarding@resend.dev>";

const LIMITS = { name: 200, email: 254, count: 10, relationship: 200, message: 5000 };

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function renderHtml(title: string, rows: [string, string][]): string {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#806555;vertical-align:top;white-space:nowrap"><strong>${escapeHtml(
          label
        )}</strong></td><td style="padding:6px 0;color:#1F1814;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return `<div style="font-family:Georgia,serif;max-width:600px"><h2 style="color:#1F1814">${escapeHtml(
    title
  )}</h2><table style="border-collapse:collapse;font-size:15px">${body}</table></div>`;
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field; bots usually do.
  if (clean(data.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email is not configured yet." }, { status: 500 });
  }

  const type = data.type;
  let subject: string;
  let html: string;
  let text: string;
  let replyTo: string | undefined;

  if (type === "rsvp") {
    const name = clean(data.name, LIMITS.name);
    const email = clean(data.email, LIMITS.email);
    const count = clean(data.count, LIMITS.count) || "1";
    const note = clean(data.note, LIMITS.message);
    if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (email && !isEmail(email)) {
      return NextResponse.json({ error: "Please check your email address." }, { status: 400 });
    }
    const rows: [string, string][] = [
      ["Name(s)", name],
      ["Email", email || "(not provided)"],
      ["Number attending", count],
      ["Note for family", note || "(none)"],
    ];
    subject = `RSVP for Rick's Memorial – ${name} (${count})`;
    html = renderHtml("New RSVP", rows);
    text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    replyTo = email || undefined;
  } else if (type === "memory") {
    const name = clean(data.name, LIMITS.name);
    const relationship = clean(data.relationship, LIMITS.relationship) || "Friend";
    const message = clean(data.message, LIMITS.message);
    if (!name || !message) {
      return NextResponse.json({ error: "Please add your name and a message." }, { status: 400 });
    }
    const rows: [string, string][] = [
      ["From", name],
      ["Relationship", relationship],
      ["Memory", message],
    ];
    subject = `Memory Book – a message from ${name}`;
    html = renderHtml("New Memory Book entry", rows);
    text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  } else {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return NextResponse.json({ error: "We couldn't send that right now." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return NextResponse.json({ error: "We couldn't send that right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
