"use client";

import { useState } from "react";
import Link from "next/link";

interface AttendanceResponse {
  success: boolean;
  message: string;
}

export default function AttendanceSignInPage() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState<AttendanceResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // A <form> submits when Enter is pressed, so no separate keydown listener is needed.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: studentId }),
      });
      const result: AttendanceResponse = await response.json();
      setStatus(result);
      if (result.success) setStudentId("");
    } catch {
      setStatus({ success: false, message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background-primary)] px-4 pt-32 pb-20">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-[var(--text-primary)]">Sign in</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Student ID"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
            className="rounded-lg border border-[var(--border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            autoFocus
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
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
