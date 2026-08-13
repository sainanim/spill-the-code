"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatCents } from "@/lib/money";

interface CheckoutSuccess {
  orderCode: string;
  totalCents: number;
  customerEmailSent: boolean;
  etransferEmail: string;
}

export default function CheckoutPage() {
  const { resolvedItems, totalCents, clearCart, hydrated } = useCart();
  const [clientRequestId, setClientRequestId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    honeypot: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState<CheckoutSuccess | null>(null);

  // Generated once per checkout attempt so duplicate submissions (e.g. a retried
  // request) share the same id — visible in both emails and the order log, so a
  // human reconciling orders can recognize a duplicate at a glance.
  useEffect(() => {
    setClientRequestId(crypto.randomUUID());
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
          honeypot: formData.honeypot,
          clientRequestId,
          items: resolvedItems.map((item) => ({ offeringId: item.id, quantity: item.quantity })),
        }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        // Cart is cleared only on confirmed success — never optimistically,
        // so a failed submission never silently loses the order.
        setSuccess(data);
        clearCart();
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[var(--background-primary)] pb-16 px-4">
        <div className="container mx-auto max-w-lg text-center bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-3">Order received!</h1>
          <p className="text-[var(--text-secondary)] mb-6">
            Please e-transfer <strong>{formatCents(success.totalCents)}</strong>
            {success.etransferEmail && (
              <>
                {" "}
                to <strong>{success.etransferEmail}</strong>
              </>
            )}{" "}
            and include reference code <strong>{success.orderCode}</strong> in the message.
            We&apos;ll follow up by email to coordinate scheduling.
          </p>
          {!success.customerEmailSent && (
            <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm mb-6">
              We received your order, but couldn&apos;t send a confirmation email to your inbox — please
              save your reference code: <strong>{success.orderCode}</strong>.
            </p>
          )}
          <Link href="/" className="text-[var(--color-primary)] font-medium hover:underline">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  // The persisted cart hasn't been read yet — render a neutral shell instead
  // of flashing "Your cart is empty" at someone who navigated here directly.
  if (!hydrated) {
    return (
      <main
        className="min-h-screen bg-[var(--background-primary)] pb-16 px-4"
        aria-busy="true"
      />
    );
  }

  if (resolvedItems.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--background-primary)] pb-16 px-4">
        <div className="container mx-auto max-w-lg text-center bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-3">Your cart is empty</h1>
          <p className="text-[var(--text-secondary)] mb-6">
            Add a course or summer camp option before checking out.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/courses" className="text-[var(--color-primary)] font-medium hover:underline">
              Browse Courses
            </Link>
            <Link href="/summer-camps" className="text-[var(--color-primary)] font-medium hover:underline">
              Browse Summer Camps
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background-primary)] pb-16 px-4">
      <div className="container mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h1 className="text-xl font-bold text-[var(--color-primary)] mb-4">Order Summary</h1>
          <div className="space-y-3 mb-4">
            {resolvedItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm gap-2">
                <span className="text-[var(--text-primary)]">
                  {item.shortLabel}{" "}
                  <span className="text-[var(--text-secondary)]">× {item.quantity}</span>
                  {item.isPlaceholderPrice && (
                    <span className="block text-xs text-[var(--text-secondary)]">
                      Estimated — final pricing TBD
                    </span>
                  )}
                </span>
                <span className="font-medium whitespace-nowrap">{formatCents(item.lineTotalCents)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-[var(--text-primary)] border-t pt-3">
            <span>Total</span>
            <span>{formatCents(totalCents)}</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold text-[var(--color-primary)]">Your Details</h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Phone <span className="text-[var(--text-secondary)] font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Notes <span className="text-[var(--text-secondary)] font-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Anything that will help us set this up — child's age, preferred schedule, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
            />
          </div>

          {/* Honeypot: invisible to real users, tripped only by bots that fill every field. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {errorMessage && <p className="text-red-600 text-sm text-center">{errorMessage}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[var(--color-accent)] text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : `Submit Order — ${formatCents(totalCents)}`}
          </button>
        </form>
      </div>
    </main>
  );
}
