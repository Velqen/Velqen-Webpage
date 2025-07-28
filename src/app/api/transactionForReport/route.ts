// /api/transactionForReport/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("transaction_records")
    .select("*")
    .eq("user_email", token.email);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || !data.length) {
    return NextResponse.json([]);
  }

  // Convert to CSV-like array (string[][])
const csvData: string[][] = [
  [
    "Transaction Description",
    "Amount (RM)",
    "Date",
    "Merchant",
    "Main Category",
    "Sub Category",

  ],
  ...data.map((row) => [

    row.transaction_description,
    row.amount_rm.toFixed(2),
    row.date,
    row.merchant_name,
    row.main_category,
    row.sub_category,

  ]),
];


  return NextResponse.json(csvData); // <-- 🟩 Line changed: Return string[][]
}
