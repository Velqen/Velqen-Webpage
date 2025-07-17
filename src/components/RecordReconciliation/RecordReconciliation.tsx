"use client";

import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useRecordReconciliation } from "@/hooks/useRecordReconciliation";
import { UploadCloud } from "lucide-react";
import { useRef } from "react";

function FileInput({
  label,
  file,
  onFileChange,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-2">{label}</label>{" "}
      {/* unchanged label */}
      {/* Updated UI design only */}
      <div className="bg-velqen-black rounded-lg p-8 mb-6">
        <div
          onClick={() => fileInputRef.current?.click()} // ← same trigger
          className="bg-velqen-black border-dashed border-2 border-white rounded-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-velqen-orange transition"
        >
          <UploadCloud
            className="text-white mb-4"
            size={48}
            strokeWidth={1.5}
          />

          <p className="text-white text-base">
            {file ? (
              <>
                📄 <strong>{file.name}</strong> selected
              </>
            ) : (
              <>
                Drag & drop your CSV file here or{" "}
                <span className="velqen-gradient-text underline">browse</span>
              </>
            )}
          </p>

          <input
            ref={fileInputRef}
            id={label} // ← unchanged ID
            type="file"
            accept=".csv"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default function RecordReconciliation() {
  const {
    bankFile,
    ledgerFile,
    results,
    error,
    loading,
    setBankFile,
    setLedgerFile,
    handleSubmit,
  } = useRecordReconciliation();
  const { isSmallDevice } = useDeviceSize();

  return (
    <div className="w-full mx-auto p-6 mb-10">
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
          } velqen-gradient-bg velqen-gradient-bg-hover text-white py-3 px-6 rounded disabled:opacity-50`}
        >
          {loading ? "Reconciling..." : "Start Reconciliation"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}

      {results && (
        <div className="mt-8 space-y-16">
          {/* Simple Reconciliation Matches */}
          <div>
            <h2 className="font-semibold text-lg">
              ✅ Complete Matched Records
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-1 max-h-48 overflow-auto">
              {results.matched_simple.map((pair, idx) => (
                <li key={idx}>
                  Bank ID {pair.bank_id} ↔ Ledger ID {pair.ledger_id}
                </li>
              ))}
            </ul>
          </div>

          {/* NLP Reconciliation Matches */}
          <div>
            <h2 className="font-semibold text-lg ">
              🤖 AI Matched Discrepancy Records
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-4 max-h-64 overflow-auto">
              {results.matched_nlp.map((pair, idx) => (
                <li key={idx}>
                  <span className="font-medium">
                    Bank ID {pair.bank_id} ↔ Ledger ID {pair.ledger_id}
                  </span>
                  <div className="ml-4 text-velqen-gray">
                    Close Match fields:&nbsp;
                    {Object.entries(pair.matched_fields)
                      .filter(([, matched]) => matched)
                      .map(([field]) => (
                        <span
                          key={field}
                          className="inline-block bg-velqen-light-orange text-velqen-orange px-2 py-0.5 rounded mr-2"
                        >
                          {field}
                        </span>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Unmatched Bank Records */}
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-lg ">
                ⚠️ Unmatched Bank Records
              </h2>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48 overflow-auto">
                {JSON.stringify(results.unmatched_bank, null, 2)}
              </pre>
            </div>
            {/* Unmatched Ledger Records */}
            <div>
              <h2 className="font-semibold text-lg ">
                ⚠️ Unmatched Ledger Records
              </h2>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48 overflow-auto">
                {JSON.stringify(results.unmatched_ledger, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
