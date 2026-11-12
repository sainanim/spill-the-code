import { appendRows, ATTENDANCE_RANGE, ID_LOOKUP_RANGE, readRange } from "@/lib/googleSheets";

// Stops the same student from signing in twice within this window.
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

export async function POST(request: Request) {
  let id: string;
  try {
    const body = await request.json();
    id = String(body.id ?? "").trim();
  } catch {
    return Response.json({ success: false, message: "Invalid request" }, { status: 400 });
  }

  if (!id) {
    return Response.json({ success: false, message: "Invalid Student ID" });
  }

  try {
    // Look up the student's name from their ID
    const directory = await readRange(ID_LOOKUP_RANGE);
    const match = directory.find(([lookupId]) => lookupId === id);

    if (!match) {
      return Response.json({ success: false, message: "Invalid Student ID" });
    }

    const name = match[1];

    // Check whether they already signed in recently
    const attendance = await readRange(ATTENDANCE_RANGE);
    const now = Date.now();
    const alreadySignedIn = attendance.some(
      (row) => row[1] === id && now - Number(row[4]) < DUPLICATE_WINDOW_MS
    );

    if (alreadySignedIn) {
      return Response.json({ success: false, message: "Already signed in" });
    }

    const date = new Date(now);
    await appendRows(ATTENDANCE_RANGE, [
      [
        name,
        id,
        date.toLocaleDateString("en-CA", { timeZone: "America/Toronto" }),
        date.toLocaleTimeString("en-GB", { timeZone: "America/Toronto" }),
        now,
      ],
    ]);

    return Response.json({ success: true, message: `Attendance recorded! — ${name}` });
  } catch (error) {
    console.error("Attendance sign-in failed:", error);
    return Response.json(
      { success: false, message: "Google Sheets request failed" },
      { status: 502 }
    );
  }
}
