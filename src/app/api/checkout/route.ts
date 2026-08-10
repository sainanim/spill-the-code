import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getOfferingById } from "@/lib/offerings";
import { formatCents } from "@/lib/money";
import { escapeHtml, sendMail } from "@/lib/mailer";

const MAX_LINE_ITEMS = 20;
const MAX_QUANTITY = 20;
const MAX_NAME_LENGTH = 200;
const MAX_NOTES_LENGTH = 2000;
const MAX_PHONE_LENGTH = 50;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
// Resets on cold start/restart — acceptable at this scale, see plan.
const rateLimitBuckets = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function generateOrderCode(): string {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `STC-${datePart}-${randomPart}`;
}

interface ResolvedLine {
  offeringId: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

async function appendOrderLog(record: unknown) {
  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "orders.log.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch (error) {
    // Best-effort insurance copy only — never blocks the order.
    console.error("Failed to write order log (non-fatal):", error);
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }
  const data = body as Record<string, unknown>;

  // Honeypot — real users never fill this; reject quietly without revealing why.
  if (typeof data.honeypot === "string" && data.honeypot.length > 0) {
    return NextResponse.json({ ok: false, message: "Unable to process order." }, { status: 400 });
  }

  const name = typeof data.name === "string" ? data.name.trim().slice(0, MAX_NAME_LENGTH) : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim().slice(0, MAX_PHONE_LENGTH) : "";
  const notes = typeof data.notes === "string" ? data.notes.trim().slice(0, MAX_NOTES_LENGTH) : "";
  const clientRequestId =
    typeof data.clientRequestId === "string" ? data.clientRequestId.slice(0, 100) : "";

  if (!name || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please provide a valid name and email." },
      { status: 400 }
    );
  }

  const rawItems = Array.isArray(data.items) ? data.items : [];
  if (rawItems.length === 0 || rawItems.length > MAX_LINE_ITEMS) {
    return NextResponse.json(
      { ok: false, message: "Your cart is empty or has too many items." },
      { status: 400 }
    );
  }

  // Re-resolve every id against the canonical offerings data — the request
  // never carries a price/title, so there is nothing here to tamper with.
  const resolvedLines: ResolvedLine[] = [];
  for (const raw of rawItems) {
    if (typeof raw !== "object" || raw === null) continue;
    const item = raw as Record<string, unknown>;
    const offeringId = typeof item.offeringId === "string" ? item.offeringId : "";
    const quantity = item.quantity;
    if (
      !offeringId ||
      !Number.isInteger(quantity) ||
      (quantity as number) <= 0 ||
      (quantity as number) > MAX_QUANTITY
    ) {
      continue;
    }

    const offering = getOfferingById(offeringId);
    if (!offering) continue; // stale/unknown id — silently dropped, same as the cart itself

    resolvedLines.push({
      offeringId,
      title: offering.title,
      quantity: quantity as number,
      unitPriceCents: offering.priceCents,
      lineTotalCents: offering.priceCents * (quantity as number),
    });
  }

  if (resolvedLines.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "None of the items in your cart are available anymore. Please refresh and try again.",
      },
      { status: 400 }
    );
  }

  const totalCents = resolvedLines.reduce((sum, line) => sum + line.lineTotalCents, 0);
  const orderCode = generateOrderCode();
  const etransferTo = process.env.ETRANSFER_RECEIVER_EMAIL || process.env.EMAIL_RECEIVER || "";

  await appendOrderLog({
    orderCode,
    clientRequestId,
    timestamp: new Date().toISOString(),
    ip,
    name,
    email,
    phone,
    notes,
    items: resolvedLines,
    totalCents,
  });

  const itemsHtml = resolvedLines
    .map(
      (line) =>
        `<tr><td>${escapeHtml(line.title)}</td><td style="text-align:center">${line.quantity}</td><td style="text-align:right">${formatCents(line.lineTotalCents)}</td></tr>`
    )
    .join("");

  const businessHtml = `
    <h2>New Cart Order — ${escapeHtml(orderCode)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${notes ? `<p><strong>Notes:</strong><br>${escapeHtml(notes).replace(/\n/g, "<br>")}</p>` : ""}
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <thead><tr><th>Item</th><th>Qty</th><th>Line Total</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <p><strong>Total: ${formatCents(totalCents)}</strong></p>
    <p>Reference code: <strong>${escapeHtml(orderCode)}</strong></p>
    ${clientRequestId ? `<p style="color:#999;font-size:12px;">Client request id: ${escapeHtml(clientRequestId)}</p>` : ""}
  `;

  if (!etransferTo) {
    console.error("No EMAIL_RECEIVER/ETRANSFER_RECEIVER_EMAIL configured — cannot deliver order notification.");
    return NextResponse.json(
      { ok: false, message: "We couldn't process your order right now. Please try again or contact us directly." },
      { status: 500 }
    );
  }

  try {
    await sendMail({
      to: etransferTo,
      subject: `New Order ${orderCode} — ${formatCents(totalCents)}`,
      html: businessHtml,
    });
  } catch (error) {
    console.error("Failed to send business order email:", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't process your order right now. Please try again or contact us directly." },
      { status: 500 }
    );
  }

  let customerEmailSent = true;
  try {
    const customerHtml = `
      <h2>Thanks for your order, ${escapeHtml(name)}!</h2>
      <p>Here's a summary of what you selected:</p>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        <thead><tr><th>Item</th><th>Qty</th><th>Line Total</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <p><strong>Total: ${formatCents(totalCents)}</strong></p>
      <p>Please e-transfer <strong>${formatCents(totalCents)}</strong> to <strong>${escapeHtml(
        etransferTo
      )}</strong> and include reference code <strong>${escapeHtml(orderCode)}</strong> in the message.</p>
      <p>We'll be in touch by email to coordinate scheduling. If you have any questions, just reply to this email.</p>
    `;
    await sendMail({
      to: email,
      subject: `Your Spill the Code order ${orderCode} — ${formatCents(totalCents)}`,
      html: customerHtml,
    });
  } catch (error) {
    console.error("Failed to send customer confirmation email:", error);
    customerEmailSent = false;
  }

  return NextResponse.json({ ok: true, orderCode, totalCents, customerEmailSent });
}
