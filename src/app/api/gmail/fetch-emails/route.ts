import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

interface GmailPart {
  mimeType: string;
  filename: string;
  body: { attachmentId?: string; size?: number };
  parts?: GmailPart[];
}

function extractAttachments(parts: GmailPart[] = []) {
  const results: { attachmentId: string; filename: string; size: number; mimeType: string }[] = [];
  for (const part of parts) {
    if (part.body?.attachmentId && part.filename) {
      results.push({
        attachmentId: part.body.attachmentId,
        filename: part.filename,
        size: part.body.size ?? 0,
        mimeType: part.mimeType,
      });
    }
    if (part.parts) results.push(...extractAttachments(part.parts));
  }
  return results;
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (!token.accessToken) return NextResponse.json({ error: "No access token" }, { status: 400 });

  const q = encodeURIComponent(
    "has:attachment (subject:invoice OR subject:receipt OR subject:bill OR subject:statement)"
  );
  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=20&q=${q}`,
    { headers: { Authorization: `Bearer ${token.accessToken}` } }
  );

  if (!listRes.ok) {
    const text = await listRes.text();
    return NextResponse.json({ error: "Gmail list error", body: text }, { status: 502 });
  }

  const listData = await listRes.json();
  const ids: string[] = (listData.messages ?? []).map((m: { id: string }) => m.id);
  if (ids.length === 0) return NextResponse.json({ emails: [] });

  const messages = await Promise.all(
    ids.slice(0, 15).map(async (id) => {
      const res = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
        { headers: { Authorization: `Bearer ${token.accessToken}` } }
      );
      if (!res.ok) return null;
      const msg = await res.json();

      const headers: { name: string; value: string }[] = msg.payload?.headers ?? [];
      const get = (name: string) => headers.find((h) => h.name === name)?.value ?? "";

      const attachments = extractAttachments(msg.payload?.parts ?? []);
      if (attachments.length === 0) return null;

      return {
        id,
        subject: get("Subject") || "(no subject)",
        from: get("From"),
        date: get("Date"),
        attachments,
      };
    })
  );

  return NextResponse.json({ emails: messages.filter(Boolean) });
}
