"use client";
// ✅ Line changed

import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useInvoiceExtraction } from "@/hooks/useInvoiceExtraction";
import { downloadRecordsAsCSV } from "@/lib/exportInvoiceCSV";
import { MinimalRecord } from "@/types/transactions";
import { useEffect, useRef } from "react";
import { extractMinimalRecords } from "@/lib/extractMinimalRecords";
import { UploadCloud } from "lucide-react";

const InvoiceExtraction = ({
  onExtractedRecords,
}: {
  onExtractedRecords: (records: MinimalRecord[]) => void;
}) => {
  const { isSmallDevice } = useDeviceSize();
  const {
    selectedExtractionFile,
    previewUrl,
    isExtractionUploading,
    result,
    fileInputRef,
    handleExtractionFileChange,
    handleDrop,
    handleExtractionUpload,
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
      <div className="bg-velqen-black rounded-lg p-8">
        <div
          className="border-dashed border-2 border-white rounded-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-velqen-orange transition"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud
            className="text-white mb-4"
            size={48}
            strokeWidth={1.5}
          />
          <p className="text-white text-base">
            {selectedExtractionFile ? (
              <>
                📄 <strong>{selectedExtractionFile.name}</strong> selected
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
            onChange={handleExtractionFileChange}
            className="hidden"
          />
        </div>
      </div>
      {/* Upload area (always visible)*/}

      {/* Conditionally show everything else only if file is selected */}
      {selectedExtractionFile && (
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
              onClick={handleExtractionUpload}
              disabled={!selectedExtractionFile || isExtractionUploading}
            >
              {isExtractionUploading ? "Uploading..." : "📤 Upload & Process"}
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
                  <pre className="whitespace-pre-wrap text-sm">
                    {JSON.stringify(result, null, 2)}
                  </pre>
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
    <div className="py-6 w-full mx-auto ">
      {/* Upload area (always visible) */}
      <div
        className={`${
          selectedExtractionFile ? "mb-10 p-10" : "p-14"
        } bg-velqen-black rounded-lg `}
      >
        <div
          className={`${
            selectedExtractionFile ? "h-[200px]" : "h-[500px]" // ✅ Height changes conditionally
          } flex flex-col justify-center items-center text-center border-dashed border-2 border-white rounded-lg p-6 cursor-pointer hover:border-velqen-orange transition`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud
            className="text-white mb-4"
            size={48}
            strokeWidth={1.5}
          />
          <p className="text-white text-xl">
            {selectedExtractionFile ? (
              <>
                📄 <strong>{selectedExtractionFile.name}</strong> selected
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
            onChange={handleExtractionFileChange}
            className="hidden"
          />
        </div>
      </div>
      {/* ✅ Minimal change: add this condition */}
      {selectedExtractionFile && (
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left side: Preview & Upload */}
          <div className="flex-1">
            <iframe
              src={previewUrl || undefined} // ✅ Fix: convert `null` to `undefined`
              className="w-full h-[750px] border rounded"
              title="PDF Preview"
            />
            <button
              className="mt-4 w-full py-3 velqen-gradient-bg velqen-gradient-bg-hover text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition text-xl"
              onClick={handleExtractionUpload}
              disabled={!selectedExtractionFile || isExtractionUploading}
            >
              {isExtractionUploading ? "Uploading..." : "📤 Upload & Process"}
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
                  <pre className="whitespace-pre-wrap text-sm">
                    {JSON.stringify(result, null, 2)}
                  </pre>
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
