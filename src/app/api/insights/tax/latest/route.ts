import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const res = await fetch(`${process.env.BACKEND_API_URL}/insights/tax/latest?user_email=${encodeURIComponent(token.email)}`);
  return NextResponse.json(await res.json());
}
