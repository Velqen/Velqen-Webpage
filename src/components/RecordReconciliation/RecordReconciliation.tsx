"use client";

import { useState } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

type MatchedPair = {
  bank_id: string;
  ledger_id: string;
};

type ReconciliationResult = {
  matched: MatchedPair[];
  unmatched_bank: Record<string, unknown>[];
  unmatched_ledger: Record<string, unknown>[];
};
function FileInput({
  label,
  file,
  onFileChange,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <label
        htmlFor={label}
        className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-3 py-2 hover:border-bennett-orange transition-colors"
      >
        {/* Icon (using SVG for upload) */}
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>

        <span className="truncate">
          {file ? file.name : "Select CSV file..."}
        </span>
      </label>
      <input
        id={label}
        type="file"
        accept=".csv"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />
    </div>
  );
}

export default function RecordReconciliation() {
  const [bankFile, setBankFile] = useState<File | null>(null);
  const [ledgerFile, setLedgerFile] = useState<File | null>(null);
  const [results, setResults] = useState<ReconciliationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isSmallDevice } = useDeviceSize();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);
    setLoading(true);

    if (!bankFile || !ledgerFile) {
      setError("Both files are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("bank", bankFile);
    formData.append("ledger", ledgerFile);

    try {
      const res = await fetch("/api/recordReconciliation", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to reconcile.");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-6 mb-32">
      <h1 className="text-2xl font-semibold mb-6">🧾 Record Reconciliation</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={
            isSmallDevice ? "flex flex-col gap-6" : "flex flex-row gap-6"
          }
        >
          <div className="flex-1">
            <FileInput
              label="Bank CSV File"
              file={bankFile}
              onFileChange={setBankFile}
            />
          </div>
          <div className="flex-1">
            <FileInput
              label="Ledger CSV File"
              file={ledgerFile}
              onFileChange={setLedgerFile}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={` ${
            isSmallDevice ? "w-full" : ""
          } bennett-gradient-bg bennett-gradient-bg-hover text-white py-3 px-6 rounded disabled:opacity-50`}
        >
          {loading ? "Reconciling..." : "Start Reconciliation"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}

      {results && (
        <div className="mt-8 space-y-8">
          <div>
            <h2 className="font-semibold text-lg">✅ Matched Records</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 max-h-48 overflow-auto">
              {results.matched.map((pair, idx) => (
                <li key={idx}>
                  Bank ID {pair.bank_id} ↔ Ledger ID {pair.ledger_id}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-yellow-700">
              ⚠️ Unmatched Bank Records
            </h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48 overflow-auto">
              {JSON.stringify(results.unmatched_bank, null, 2)}
            </pre>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-yellow-700">
              ⚠️ Unmatched Ledger Records
            </h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48 overflow-auto">
              {JSON.stringify(results.unmatched_ledger, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
