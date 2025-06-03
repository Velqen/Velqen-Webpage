// app/api/recordReconciliation/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const res = await fetch("http://localhost:5003/record-reconciler", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
