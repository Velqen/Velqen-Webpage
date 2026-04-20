import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/tax/latest?user_email=${encodeURIComponent(token.email)}`);
    const text = await res.text();
    if (!res.ok) {
      console.error("tax/latest upstream error", res.status, text);
      return NextResponse.json({ snapshot: null, upstream_status: res.status }, { status: 200 });
    }
    const data = text ? JSON.parse(text) : { snapshot: null };
    return NextResponse.json(data);
  } catch (e) {
    console.error("tax/latest fetch failed", e);
    return NextResponse.json({ snapshot: null, error: "upstream_unreachable" }, { status: 200 });
  }
}
