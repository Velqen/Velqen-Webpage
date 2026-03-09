"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, CheckCircle, XCircle, Loader2 } from "lucide-react";

type ExtractedData = {
  Product_Description: string;
  Amount_RM: string | number;
  Receiver_Name: string;
  Date: string;
};

type ClassifiedData = {
  Transaction_Description: string;
  Amount_RM: string | number;
  Merchant_Name: string;
  Date: string;
  Main_Category: string;
  Sub_Category: string;
  Detailed_Category: string;
};

type FileResultData = {
  extracted: ExtractedData;
  classified: ClassifiedData;
  stored: boolean;
};

type FileResult = {
  fileName: string;
  fileType: string;
  status: "success" | "error";
  data: FileResultData | null;
  error: string | null;
};

function StepBadge({
  step,
  label,
  done,
}: {
  step: number;
  label: string;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
          done
            ? "bg-velqen-orange border-velqen-orange text-black"
            : "border-gray-600 text-gray-500"
        }`}
      >
        {step}
      </div>
      <span className={done ? "text-white font-medium" : "text-gray-500"}>
        {label}
      </span>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between text-sm py-1 border-b border-gray-700 last:border-0">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium max-w-[55%] text-right break-words">
        {value ?? "—"}
      </span>
    </div>
  );
}

function FileResultCard({ result }: { result: FileResult }) {
  const success = result.status === "success" && result.data;

  return (
    <div className="bg-velqen-black rounded-2xl border border-gray-800 shadow-[8px_8px_0px_0px_#000000] p-5 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-white font-semibold truncate max-w-[75%]">
          {result.fileName}
        </p>
        {success ? (
          <CheckCircle size={20} className="text-velqen-orange shrink-0" />
        ) : (
          <XCircle size={20} className="text-red-500 shrink-0" />
        )}
      </div>

      {!success ? (
        <p className="text-red-400 text-sm">{result.error ?? "Unknown error"}</p>
      ) : (
        <>
          {/* Step indicators */}
          <div className="flex gap-6">
            <StepBadge step={1} label="Extract" done={!!result.data?.extracted} />
            <StepBadge
              step={2}
              label="Classify"
              done={!!result.data?.classified?.Main_Category}
            />
            <StepBadge step={3} label="Store" done={!!result.data?.stored} />
          </div>

          {/* Step 1: Extracted */}
          <div>
            <p className="text-xs uppercase tracking-widest text-velqen-orange mb-2">
              1 · Extracted Fields
            </p>
            <div className="bg-[#111] rounded-lg p-3">
              <FieldRow
                label="Description"
                value={result.data!.extracted.Product_Description}
              />
              <FieldRow
                label="Amount (RM)"
                value={result.data!.extracted.Amount_RM}
              />
              <FieldRow
                label="Receiver"
                value={result.data!.extracted.Receiver_Name}
              />
              <FieldRow label="Date" value={result.data!.extracted.Date} />
            </div>
          </div>

          {/* Step 2: Classified */}
          <div>
            <p className="text-xs uppercase tracking-widest text-velqen-orange mb-2">
              2 · Classification
            </p>
            <div className="bg-[#111] rounded-lg p-3">
              <FieldRow
                label="Main Category"
                value={result.data!.classified.Main_Category}
              />
              <FieldRow
                label="Sub Category"
                value={result.data!.classified.Sub_Category}
              />
              <FieldRow
                label="Detailed Category"
                value={result.data!.classified.Detailed_Category}
              />
            </div>
          </div>

          {/* Step 3: Stored */}
          <div>
            <p className="text-xs uppercase tracking-widest text-velqen-orange mb-2">
              3 · Stored to Database
            </p>
            <div className="bg-[#111] rounded-lg p-3 flex items-center gap-2">
              {result.data!.stored ? (
                <>
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-green-400 text-sm">
                    Transaction saved successfully
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={16} className="text-red-400" />
                  <span className="text-red-400 text-sm">
                    Failed to save transaction
                  </span>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const SmartVaultPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<FileResult[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setResults([]);
    }
  };

  const readEntry = (entry: FileSystemEntry): Promise<File[]> =>
    new Promise((resolve) => {
      if (entry.isFile) {
        (entry as FileSystemFileEntry).file((f) => resolve([f]));
      } else if (entry.isDirectory) {
        const reader = (entry as FileSystemDirectoryEntry).createReader();
        const collected: File[] = [];
        const readBatch = () => {
          reader.readEntries(async (entries) => {
            if (entries.length === 0) {
              resolve(collected);
            } else {
              const nested = await Promise.all(entries.map(readEntry));
              collected.push(...nested.flat());
              readBatch();
            }
          });
        };
        readBatch();
      } else {
        resolve([]);
      }
    });

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const entries = Array.from(e.dataTransfer.items)
      .map((item) => item.webkitGetAsEntry())
      .filter(Boolean) as FileSystemEntry[];
    const nested = await Promise.all(entries.map(readEntry));
    const dropped = nested.flat();
    if (dropped.length > 0) {
      setFiles(dropped);
      setResults([]);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setResults([]);

    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file, file.name);
      }

      const res = await fetch("/api/smartVault", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.results) {
        setResults(json.results);
      }
    } catch {
      // network error — show a single error card
      setResults(
        files.map((f) => ({
          fileName: f.name,
          fileType: "invoice",
          status: "error",
          data: null,
          error: "Network error. Please try again.",
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Smart Vault</h1>
        <p className="text-gray-400 text-sm mt-1">
          Upload invoices and let Velqen automatically extract, classify, and
          store each transaction.
        </p>
      </div>

      {/* Upload zone */}
      <div
        className="border-dashed border-2 border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-velqen-orange transition bg-velqen-black"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <UploadCloud size={40} className="text-white mb-3" strokeWidth={1.5} />

        {files.length === 0 ? (
          <>
            <p className="text-white text-sm">
              Drop a file, multiple files, or a folder here
            </p>
            <p className="text-gray-500 text-xs mt-1 mb-4">
              PDF, JPG, JPEG, PNG supported
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-1 max-h-36 overflow-y-auto w-full px-4 mb-4">
            {files.map((f) => (
              <p key={f.name} className="text-white text-sm truncate">
                📄 {f.name}
              </p>
            ))}
          </div>
        )}

        {/* Browse links */}
        <p className="text-xs text-gray-600">
          or browse:{" "}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            className="text-gray-400 hover:text-velqen-orange underline underline-offset-2 transition"
          >
            files
          </button>
          {" · "}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); folderInputRef.current?.click(); }}
            className="text-gray-400 hover:text-velqen-orange underline underline-offset-2 transition"
          >
            folder
          </button>
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={folderInputRef}
          type="file"
          accept="application/pdf,image/*"
          onChange={handleFileChange}
          className="hidden"
          {...({ webkitdirectory: "" } as object)}
        />
      </div>

      {/* Process button */}
      <button
        onClick={handleProcess}
        disabled={files.length === 0 || loading}
        className="self-start flex items-center gap-2 bg-velqen-orange text-black font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Processing…" : "Process Files"}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map((r) => (
            <FileResultCard key={r.fileName} result={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartVaultPage;
