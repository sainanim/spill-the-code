"use client";

import { useState } from "react";
import Link from "next/link";

interface RegisterResponse {
  success: boolean;
  message: string;
  studentId?: number;
}

export default function AttendanceRegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<RegisterResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // A <form> submits when Enter is pressed, so no separate keydown listener is needed.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      const result: RegisterResponse = await response.json();
      setStatus(result);
      if (result.success) {
        setFirstName("");
        setLastName("");
      }
    } catch {
      setStatus({ success: false, message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";

  return (
    <main className="min-h-screen bg-[var(--background-primary)] px-4 pt-32 pb-20">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-[var(--text-primary)]">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={inputClass}
              autoComplete="given-name"
              autoFocus
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={inputClass}
              autoComplete="family-name"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <Link
            href="/attendance"
            className="text-center text-sm font-medium text-[var(--text-secondary)] hover:underline"
          >
            Back
          </Link>
        </form>

        {status && (
          <p
            role="status"
            className={`mt-6 text-center font-medium ${status.success ? "text-green-600" : "text-red-600"}`}
          >
            {status.message}
          </p>
        )}
      </div>
    </main>
  );
}
