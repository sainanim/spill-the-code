import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Attendance | Spill the Code",
};

export default function AttendanceHomePage() {
  return (
    <main className="min-h-screen bg-[var(--background-primary)] px-4 pt-32 pb-20">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-[var(--text-primary)]">Attendance</h1>
        <p className="mb-8 text-[var(--text-secondary)]">
          Sign in with your Student ID, or register to get one.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/attendance/signin"
            className="rounded-lg bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Sign in
          </Link>
          <Link
            href="/attendance/register"
            className="rounded-lg border-2 border-[var(--color-primary)] px-6 py-3 font-semibold text-[var(--color-primary)] transition hover:bg-[var(--background-secondary)]"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
