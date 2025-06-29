import { MinimalRecord } from "@/types/transactions";

export function extractMinimalRecords(result: unknown): MinimalRecord[] {
  const r = result as Record<string, unknown>; // ✅ no need to shape, just index

  const amount = parseFloat(r["amount_rm"] as string);
  const validAmount = isNaN(amount) ? 0 : +amount.toFixed(2);

  const transaction_description =
    (r["transaction_description"] as string) || "No description"; // ✅ Line changed

  const date = (r["date"] as string) || new Date().toISOString().split("T")[0];
  const merchant =
    (r["merchant_name"] as string) ||
    (r["customer_name"] as string) ||
    "Unknown";

  return [
    {
      transaction_description,
      amount_rm: validAmount,
      date,
      merchant_name: merchant,
    },
  ];
}
