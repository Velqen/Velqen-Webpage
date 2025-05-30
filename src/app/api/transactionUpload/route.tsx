import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ensures route is server-only

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const backendURL = process.env.TRANSACTION_CLASSIFICATION_URL;
    if (!backendURL) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const forwardForm = new FormData();
    forwardForm.append("file", file, file.name);

    const response = await fetch(`${backendURL}/classify-transaction`, {
      method: "POST",
      body: forwardForm,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to classify transaction" },
        { status: 500 }
      );
    }

    const blob = await response.blob();

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="classified_transactions.csv"',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
