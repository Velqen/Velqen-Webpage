"use client";
// ✅ Line changed
import dynamic from "next/dynamic"; // ✅ Add this at the top

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false }); // ✅ This disables SSR

import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useInvoiceExtraction } from "@/hooks/useInvoiceExtraction";
import { downloadRecordsAsCSV } from "@/lib/exportInvoiceCSV";
import { MinimalRecord } from "@/types/transactions";
import { useEffect, useRef } from "react";

const InvoiceExtraction = ({
  onExtractedRecords,
}: {
  onExtractedRecords: (records: MinimalRecord[]) => void;
}) => {
  const { isSmallDevice } = useDeviceSize();
  const {
    selectedFile,
    previewUrl,
    isUploading,
    result,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleUpload,
  } = useInvoiceExtraction();

  const prevRecordsRef = useRef<MinimalRecord[] | null>(null);

  useEffect(() => {
    if (!result) return;

    const records = extractMinimalRecords(result);

    const recordsString = JSON.stringify(records);
    const prevRecordsString = JSON.stringify(prevRecordsRef.current);

    if (records.length > 0 && recordsString !== prevRecordsString) {
      onExtractedRecords(records);
      prevRecordsRef.current = records;
    }
  }, [result, onExtractedRecords]);

  return isSmallDevice ? (
    <div className="w-[100%] mx-auto">
      {/* Upload area (always visible)*/}
      <div
        className="border-dashed border-2 border-velqen-gray rounded-lg p-6 text-center cursor-pointer hover:border-velqen-orange transition"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-velqen-gray text-base">
          {selectedFile ? (
            <>
              📄 <strong>{selectedFile.name}</strong> selected
            </>
          ) : (
            <>
              Drag & drop your invoice PDF here or{" "}
              <span className="velqen-gradient-text underline">browse</span>
            </>
          )}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Conditionally show everything else only if file is selected */}
      {selectedFile && (
        <div className="flex flex-col gap-6 mt-6">
          {/* Left side: Preview & Upload */}
          <div className="flex-1">
            <iframe
              src={previewUrl || undefined} // ✅ fix TypeScript error
              className="w-full h-[600px] mt-4 border rounded"
              title="PDF Preview"
            />
            <button
              className="mt-4 w-full py-3 velqen-gradient-bg velqen-gradient-bg-hover text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "📤 Upload & Process"}
            </button>
          </div>

          {/* Right side: Results */}
          <div className="flex-1">
            {result ? (
              <>
                <div className="p-4 bg-gray-100 rounded shadow h-full overflow-auto">
                  <h2 className="text-base font-semibold mb-2">
                    Extraction Result:
                  </h2>
                  <ReactJson
                    src={result}
                    collapsed={1}
                    enableClipboard={true}
                    displayDataTypes={false}
                    name={false}
                    style={{ fontSize: "0.85rem", wordBreak: "break-word" }}
                  />
                </div>
                <button
                  onClick={() => {
                    if (result) {
                      downloadRecordsAsCSV([result as Record<string, unknown>]); // cast result as single record wrapped in array
                    } else {
                      alert("No data to download.");
                    }
                  }}
                  className="mt-4 w-full py-3 bg-velqen-green hover:bg-velqen-green-hover text-white font-semibold rounded transition"
                >
                  📥 Download as CSV
                </button>
              </>
            ) : (
              <div className="p-4 border rounded text-velqen-gray text-base italic">
                Extraction result will appear here.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="py-6 w-full mx-auto">
      {/* Upload area (always visible) */}
      <div
        className={`${
          selectedFile ? "h-[200px]" : "h-[500px]" // ✅ Height changes conditionally
        } flex items-center justify-center border-dashed border-2 border-velqen-gray rounded-lg p-6 cursor-pointer hover:border-velqen-orange transition mb-6`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-velqen-gray text-xl">
          {selectedFile ? (
            <>
              📄 <strong>{selectedFile.name}</strong> selected
            </>
          ) : (
            <>
              Drag & drop your invoice PDF here or{" "}
              <span className="velqen-gradient-text underline">browse</span>
            </>
          )}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* ✅ Minimal change: add this condition */}
      {selectedFile && (
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left side: Preview & Upload */}
          <div className="flex-1">
            <iframe
              src={previewUrl || undefined} // ✅ Fix: convert `null` to `undefined`
              className="w-full h-[550px] border rounded"
              title="PDF Preview"
            />
            <button
              className="mt-4 w-full py-3 velqen-gradient-bg velqen-gradient-bg-hover text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition text-xl"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "📤 Upload & Process"}
            </button>
          </div>

          {/* Right side: Results */}
          <div className="flex-1">
            {result ? (
              <>
                <div className="p-4 bg-gray-100 rounded shadow h-full overflow-x-auto">
                  <h2 className="text-xl font-semibold mb-2">
                    Extraction Result:
                  </h2>
                  <ReactJson
                    src={result}
                    collapsed={1}
                    enableClipboard={true}
                    displayDataTypes={false}
                    name={false}
                    style={{ fontSize: "0.9rem", wordBreak: "break-word" }}
                  />
                </div>
                <button
                  onClick={() => {
                    if (result) {
                      downloadRecordsAsCSV([result as Record<string, unknown>]); // cast result as single record wrapped in array
                    } else {
                      alert("No data to download.");
                    }
                  }}
                  className="mt-4 w-full py-3 bg-velqen-green hover:bg-velqen-green-hover text-white font-semibold rounded transition text-xl"
                >
                  📥 Download as CSV
                </button>
              </>
            ) : (
              <div className="p-4 border h-full rounded text-velqen-gray text-xl italic">
                Extraction result will appear here.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceExtraction;

export function extractMinimalRecords(result: unknown): MinimalRecord[] {
  const r = result as Record<string, unknown>; // ✅ no need to shape, just index

  const amount = parseFloat(r["amount_rm"] as string);
  const validAmount = isNaN(amount) ? 0 : +amount.toFixed(2);

  const items = r["items"] as { description?: string }[] | undefined;
  const transaction_description = items?.[0]?.description || "No description";

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
