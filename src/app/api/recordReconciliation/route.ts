// app/api/recordReconciliation/route.ts
import { NextRequest } from "next/server";

const RECORD_RECONCILER_URL = process.env.RECORD_RECONCILER_URL

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const res = await fetch(`${RECORD_RECONCILER_URL}/record-reconciler`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
