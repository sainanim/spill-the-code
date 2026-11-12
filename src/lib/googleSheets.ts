import { GoogleAuth } from "google-auth-library";

// Sheet layout:
//   A:E -> attendance log (name, id, date, time, timestamp in ms)
//   H:I -> student directory (id, "Last, First")
export const ATTENDANCE_RANGE = "Sheet1!A:E";
export const ID_LOOKUP_RANGE = "Sheet1!H:I";

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

// Created once and reused across requests in the same function instance.
const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // Env vars store the key's line breaks as literal "\n" text, so turn them back into real newlines.
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

function getSpreadsheetId(): string {
  const id = process.env.SPREADSHEET_ID;
  if (!id) throw new Error("SPREADSHEET_ID is not set");
  return id;
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// Reads a range and returns its rows. Sheets returns every cell as a string,
// and leaves out `values` entirely when the range is empty.
export async function readRange(range: string): Promise<string[][]> {
  const res = await fetch(`${SHEETS_API}/${getSpreadsheetId()}/values/${range}`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Google Sheets read failed: ${res.status} ${await res.text()}`);
  }

  const data: { values?: string[][] } = await res.json();
  return data.values ?? [];
}

// Appends one or more rows to the end of a range.
export async function appendRows(range: string, rows: (string | number)[][]): Promise<void> {
  const res = await fetch(
    `${SHEETS_API}/${getSpreadsheetId()}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify({ values: rows }),
    }
  );

  if (!res.ok) {
    throw new Error(`Google Sheets append failed: ${res.status} ${await res.text()}`);
  }
}
