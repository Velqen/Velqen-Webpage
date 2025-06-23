// Unused route
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email, data } = await req.json();
    console.log("📥 Received Email:", email);
    console.log("📥 Received CSV Data:", data);

    const [headersRaw, ...rows] = data;
    const headers = headersRaw.map((h: string) => h.toLowerCase());

    const formatted = rows.map((row: string[]) =>
      Object.fromEntries(row.map((val, i) => [headers[i], val]))
    );

    const records = formatted.map((item: Record<string, string>) => {
      const [day, month, year] = item.date.split("/");
      const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      return {
        ...item,
        date: isoDate,
        user_email: email,
      };
    });

    // ✅ First, ensure user exists in user_information
    const { error: userError } = await supabaseAdmin
      .from("user_information")
      .upsert({ user_email: email }, { onConflict: "user_email" });

    if (userError) throw userError;

    // ✅ Then insert transactions
    const { error: transactionError } = await supabaseAdmin
      .from("transaction_records")
      .insert(records);

    if (transactionError) throw transactionError;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}
