import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token?.email) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const backendURL = process.env.BACKEND_API_URL;
    if (!backendURL) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const backendFormData = new FormData();
    for (const file of files) {
      backendFormData.append("files", file, file.name);
    }
    backendFormData.append("user_email", token.email);

    const response = await fetch(`${backendURL}/smart-vault/`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error("Smart Vault processing failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("Smart Vault API Error:", err);
    const message = err instanceof Error ? err.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
