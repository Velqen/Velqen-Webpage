import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const backendURL = process.env.BACKEND_API_URL;
  const res = await fetch(`${backendURL}/insights/refresh?user_email=${encodeURIComponent(token.email)}`, {
    method: "POST",
  });
  const data = await res.json();
  return NextResponse.json(data);
}
