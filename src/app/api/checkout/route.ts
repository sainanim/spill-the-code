import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { getOfferingById } from "@/lib/offerings";
import { formatCents } from "@/lib/money";
import { escapeHtml, sendMail } from "@/lib/mailer";

const MAX_LINE_ITEMS = 20;
const MAX_QUANTITY = 20;
const MAX_NAME_LENGTH = 200;
const MAX_NOTES_LENGTH = 2000;
const MAX_PHONE_LENGTH = 50;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 limit
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

interface RateLimitBucket {
  count: number;
  windowStart: number;
}

// Backed by Netlify Blobs so the count is shared across every function
// instance handling requests, instead of living in one instance's memory
// (which Netlify can throw away or run several of in parallel).
// Best-effort only: Blobs reads are eventually consistent and this
// read-modify-write isn't atomic, so a tight burst can slip past the cap.
async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const store = getStore("checkout-rate-limits");
    const key = ip.replace(/[^a-zA-Z0-9.:_-]/g, "_");
    const now = Date.now();
    const existing = await store.get(key, { type: "json" }) as RateLimitBucket | null;

    if (!existing || now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
      await store.setJSON(key, { count: 1, windowStart: now });
      return false;
    }

    const updatedCount = existing.count + 1;
    await store.setJSON(key, { count: updatedCount, windowStart: existing.windowStart });
    return updatedCount > RATE_LIMIT_MAX_REQUESTS;
  } catch (error) {
    // Fail open — a Blobs hiccup should never block a real customer's order.
    console.error("Rate limit check failed (allowing request):", error);
    return false;
  }
}

// Excludes ambiguous characters (0/O, 1/I/L) — customers retype this code
// into their e-transfer message. Crypto-random 6 chars keeps the chance of a
// same-day collision (which would overwrite an order record) negligible.
const ORDER_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function generateOrderCode(): string {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const randomPart = Array.from(bytes, (b) => ORDER_CODE_ALPHABET[b % ORDER_CODE_ALPHABET.length]).join("");
  return `STC-${datePart}-${randomPart}`;
}

interface ResolvedLine {
  offeringId: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

// Best-effort insurance copy only — never blocks the order. Stored in Netlify
// Blobs (not the local filesystem) so it actually survives past the single
// request that wrote it, instead of vanishing with the function instance.
async function saveOrderRecord(orderCode: string, record: unknown) {
  try {
    const store = getStore("orders");
    await store.setJSON(orderCode, record);
  } catch (error) {
    console.error("Failed to save order record (non-fatal):", error);
  }
}

interface CheckoutSuccessResponse {
  ok: true;
  orderCode: string;
  totalCents: number;
  customerEmailSent: boolean;
  etransferEmail: string;
}

function idempotencyKey(clientRequestId: string): string {
  return clientRequestId.replace(/[^a-zA-Z0-9_-]/g, "_");
}

// Dedupes retries of the same submission (network timeout → user resubmits):
// a successful order is remembered under its clientRequestId, and a repeat
// request gets the original response back instead of a second order and a
// second round of emails. Best-effort — a Blobs failure means we process
// normally, which at worst duplicates an order a human can reconcile.
async function findPreviousResponse(
  clientRequestId: string
): Promise<CheckoutSuccessResponse | null> {
  if (!clientRequestId) return null;
  try {
    const store = getStore("checkout-idempotency");
    return (await store.get(idempotencyKey(clientRequestId), {
      type: "json",
    })) as CheckoutSuccessResponse | null;
  } catch (error) {
    console.error("Idempotency lookup failed (treating as new request):", error);
    return null;
  }
}

async function rememberResponse(clientRequestId: string, response: CheckoutSuccessResponse) {
  if (!clientRequestId) return;
  try {
    const store = getStore("checkout-idempotency");
    await store.setJSON(idempotencyKey(clientRequestId), response);
  } catch (error) {
    console.error("Failed to store idempotency record (non-fatal):", error);
  }
}

export async function POST(req: NextRequest) {
  // x-nf-client-connection-ip is set by Netlify itself and can't be forged by
  // the client; x-forwarded-for (spoofable) is only a fallback for other hosts
  // and local dev, so the rate limit can't be bypassed with a fabricated header.
  const ip =
    req.headers.get("x-nf-client-connection-ip")?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (await isRateLimited(ip)) {
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
  const email =
    typeof data.email === "string" ? data.email.trim().slice(0, MAX_EMAIL_LENGTH) : "";
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

  const previousResponse = await findPreviousResponse(clientRequestId);
  if (previousResponse) {
    return NextResponse.json(previousResponse);
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
  // Any line that fails to resolve rejects the whole order rather than being
  // silently dropped: proceeding with a subset would charge the customer a
  // different total than their cart showed.
  const resolvedLines: ResolvedLine[] = [];
  for (const raw of rawItems) {
    const item = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
    const offeringId = typeof item.offeringId === "string" ? item.offeringId : "";
    const quantity = item.quantity;
    const offering = offeringId ? getOfferingById(offeringId) : undefined;
    if (
      !offering ||
      !Number.isInteger(quantity) ||
      (quantity as number) <= 0 ||
      (quantity as number) > MAX_QUANTITY
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Some items in your cart are no longer available. Please refresh the page and try again.",
        },
        { status: 400 }
      );
    }

    resolvedLines.push({
      offeringId,
      title: offering.title,
      quantity: quantity as number,
      unitPriceCents: offering.priceCents,
      lineTotalCents: offering.priceCents * (quantity as number),
    });
  }

  const totalCents = resolvedLines.reduce((sum, line) => sum + line.lineTotalCents, 0);
  const orderCode = generateOrderCode();
  const etransferTo = process.env.ETRANSFER_RECEIVER_EMAIL || process.env.EMAIL_RECEIVER || "";

  if (!etransferTo) {
    console.error("No EMAIL_RECEIVER/ETRANSFER_RECEIVER_EMAIL configured — cannot deliver order notification.");
    return NextResponse.json(
      { ok: false, message: "We couldn't process your order right now. Please try again or contact us directly." },
      { status: 500 }
    );
  }

  await saveOrderRecord(orderCode, {
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

  // etransferEmail is included so the success page can show where to send the
  // payment — otherwise a customer whose confirmation email failed would have
  // the amount and reference code but no destination address.
  const responsePayload: CheckoutSuccessResponse = {
    ok: true,
    orderCode,
    totalCents,
    customerEmailSent,
    etransferEmail: etransferTo,
  };
  await rememberResponse(clientRequestId, responsePayload);
  return NextResponse.json(responsePayload);
}
