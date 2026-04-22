import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { parseSSE } from "@/lib/sse";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  try {
    const { user_input, focus } = await req.json();

    const res = await fetch(`${process.env.BACKEND_API_URL}/finance/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email: token.email, user_input, focus, scope: "money-mood" }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("finance/chat upstream error", res.status, text);
      return NextResponse.json({ error: "upstream_error", upstream_status: res.status }, { status: 502 });
    }

    return NextResponse.json({ response: parseSSE(text) });
  } catch (e) {
    console.error("finance/chat fetch failed", e);
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 502 });
  }
}
