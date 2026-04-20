import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/tax/refresh?user_email=${encodeURIComponent(token.email)}`, {
      method: "POST",
    });
    const text = await res.text();
    if (!res.ok) {
      console.error("tax/refresh upstream error", res.status, text);
      return NextResponse.json({ compilation: null, estimation: null, advisory: null, upstream_status: res.status }, { status: 200 });
    }
    const data = text ? JSON.parse(text) : { compilation: null, estimation: null, advisory: null };
    return NextResponse.json(data);
  } catch (e) {
    console.error("tax/refresh fetch failed", e);
    return NextResponse.json({ compilation: null, estimation: null, advisory: null, error: "upstream_unreachable" }, { status: 200 });
  }
}
