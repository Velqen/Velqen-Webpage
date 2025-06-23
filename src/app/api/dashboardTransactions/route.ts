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

  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("transaction_records")
    .insert([
      {
        ...body,
        user_email: token.email,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error); // 👈 add this
    console.error("Submitted body:", body); // 👈 add this too
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Transaction added", data }, { status: 201 });
}
