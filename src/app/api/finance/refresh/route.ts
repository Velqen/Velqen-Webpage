import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const backendURL = process.env.BACKEND_API_URL;
  try {
    const res = await fetch(`${backendURL}/finance/refresh?user_email=${encodeURIComponent(token.email)}`, {
      method: "POST",
    });
    const text = await res.text();
    if (!res.ok) {
      console.error("finance/refresh upstream error", res.status, text);
      return NextResponse.json({ upstream_status: res.status }, { status: 200 });
    }
    const data = text ? JSON.parse(text) : {};
    return NextResponse.json(data);
  } catch (e) {
    console.error("finance/refresh fetch failed", e);
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 200 });
  }
}
