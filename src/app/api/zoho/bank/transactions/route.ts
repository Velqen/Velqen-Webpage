import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const accountId = req.nextUrl.searchParams.get("account_id");
  if (!accountId) return NextResponse.json({ error: "account_id required" }, { status: 400 });

  const backendURL = process.env.BACKEND_API_URL;
  const res = await fetch(`${backendURL}/zoho/bank/transactions?user_email=${encodeURIComponent(token.email)}&account_id=${accountId}`);
  const data = await res.json();
  return NextResponse.json(data);
}
