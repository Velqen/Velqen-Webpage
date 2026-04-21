import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (!token.accessToken) return NextResponse.json({ error: "No access token" }, { status: 400 });

  const { messageId, attachmentId, filename, documentType } = await req.json();

  const attachRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`,
    { headers: { Authorization: `Bearer ${token.accessToken}` } }
  );

  if (!attachRes.ok) {
    const text = await attachRes.text();
    return NextResponse.json({ error: "Failed to download attachment", body: text }, { status: 502 });
  }

  const { data: base64url } = await attachRes.json();
  // Gmail uses base64url — convert to standard base64
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const bytes = Buffer.from(base64, "base64");

  const ext = filename.split(".").pop()?.toLowerCase();
  const mimeType =
    ext === "pdf" ? "application/pdf" :
    ext === "png" ? "image/png" :
    "image/jpeg";

  const file = new File([bytes], filename, { type: mimeType });

  const backendURL = process.env.BACKEND_API_URL;
  if (!backendURL) return NextResponse.json({ error: "Backend URL not configured" }, { status: 500 });

  const formData = new FormData();
  formData.append("files", file, filename);
  formData.append("user_email", token.email);
  formData.append("document_type", documentType ?? "invoice");

  const response = await fetch(`${backendURL}/smart-vault/`, { method: "POST", body: formData });
  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: "Smart Vault processing failed", body: text }, { status: 502 });
  }

  return NextResponse.json(await response.json());
}
