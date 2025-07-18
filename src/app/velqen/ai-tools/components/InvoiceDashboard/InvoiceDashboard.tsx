// components/InvoiceInput/InvoiceDashboard.tsx
import React from "react";
import { MinimalRecord } from "@/types/transactions";

type Props = {
  result?: MinimalRecord & Record<string, unknown>;
};

const InvoiceDashboard = ({ result }: Props) => {
  const coreFields = [
    { label: "Transaction Description", key: "transaction_description" },
    { label: "Amount (RM)", key: "amount_rm" },
    { label: "Date", key: "date" },
    { label: "Merchant Name", key: "merchant_name" },
  ];
  const coreKeys = coreFields.map((f) => f.key);
  return (
    <div className="space-y-6 p-10 bg-black text-white rounded-3xl">
      {/* Section 1: Core Fields */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Main Fields</h3>
        {coreFields.map(({ label, key }) => (
          <div key={key}>
            <label className="block text-sm mb-1">{label}</label>
            <input
              value={
                typeof result?.[key] === "string" ||
                typeof result?.[key] === "number"
                  ? result[key]
                  : ""
              }
              className="w-full px-3 py-2 rounded-full bg-velqen-gray text-white"
              disabled
            />
          </div>
        ))}
      </div>

      {/* Section 2: Additional Fields */}
      <div className="space-y-3 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold">Other Fields</h3>
        {Object.entries(result ?? {})
          .filter(([key]) => !coreKeys.includes(key))
          .map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm mb-1 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <input
                value={
                  typeof value === "string" || typeof value === "number"
                    ? value
                    : ""
                }
                className="w-full px-3 py-2 rounded-full bg-velqen-gray text-white"
                disabled
              />
            </div>
          ))}
      </div>

      <div className="flex justify-end gap-2 pt-6 border-t border-gray-700">
        <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
          Previous
        </button>
        <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceDashboard;
