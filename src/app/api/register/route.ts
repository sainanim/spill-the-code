import { randomInt } from "crypto";
import { appendRows, ID_LOOKUP_RANGE, readRange } from "@/lib/googleSheets";

const MAX_NAME_LENGTH = 100;

export async function POST(request: Request) {
  let firstName: string;
  let lastName: string;
  try {
    const body = await request.json();
    firstName = String(body.firstName ?? "").trim();
    lastName = String(body.lastName ?? "").trim();
  } catch {
    return Response.json({ success: false, message: "Invalid request" }, { status: 400 });
  }

  if (!firstName || !lastName || firstName.length > MAX_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
    return Response.json({ success: false, message: "Invalid name" });
  }

  try {
    // Pick a 4-digit ID that isn't already taken
    const directory = await readRange(ID_LOOKUP_RANGE);
    const takenIds = new Set(directory.map(([id]) => id));

    let studentId: number | null = null;
    for (let attempt = 0; attempt < 50; attempt++) {
      const candidate = randomInt(1000, 10000);
      if (!takenIds.has(String(candidate))) {
        studentId = candidate;
        break;
      }
    }

    if (studentId === null) {
      return Response.json(
        { success: false, message: "Couldn't generate a free ID, please try again" },
        { status: 503 }
      );
    }

    await appendRows(ID_LOOKUP_RANGE, [[studentId, `${lastName}, ${firstName}`]]);

    return Response.json({
      success: true,
      studentId,
      message: `Your Student ID is ${studentId}`,
    });
  } catch (error) {
    console.error("Attendance registration failed:", error);
    return Response.json(
      { success: false, message: "Google Sheets request failed" },
      { status: 502 }
    );
  }
}
