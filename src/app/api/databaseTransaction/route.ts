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

  return NextResponse.json({ data });
}

// ✅ PUT: Update a transaction by ID
export async function PUT(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...updateFields } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("transaction_records")
    .update(updateFields)
    .eq("id", id)
    .eq("user_email", token.email); // 🔒 secure by user

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Transaction updated successfully" });
}

// ✅ Post
export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const email = token.email;
  const body = await req.json();

  // Ensure user exists (no ID jumps)
  const { data: existingUser } = await supabaseAdmin
    .from("user_information")
    .select("id")
    .eq("user_email", email)
    .maybeSingle();

  if (!existingUser) {
    const { error: insertUserError } = await supabaseAdmin
      .from("user_information")
      .insert({ user_email: email });
    if (insertUserError) {
      console.error("❌ User insert error:", insertUserError);
      return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
  }

  // Normalise a single transaction row
  const normaliseRow = (item: Record<string, unknown>) => {
    const isoDate = item.date;
    return {
      ...item,
      user_email: email,
      date: isoDate,
      amount_rm: Number(item.amount_rm),
    };
  };

  // ✅ Bulk insert
  if (Array.isArray(body.data)) {
    const records = body.data.map(normaliseRow);

    const { error } = await supabaseAdmin
      .from("transaction_records")
      .insert(records);

    if (error) {
      console.error("❌ Bulk insert error:", error);
      return NextResponse.json({ error: "Bulk insert failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Transactions uploaded successfully" });
  }

  // ✅ Single row insert
  try {
    const single = normaliseRow(body);
    const { data, error } = await supabaseAdmin
      .from("transaction_records")
      .insert([single])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: "Transaction added", data }, { status: 201 });
  } catch (err) {
    console.error("❌ Single Insert Error:", err);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
}
