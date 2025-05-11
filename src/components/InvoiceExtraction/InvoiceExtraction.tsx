"use client";

import React, { useState, useRef } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
const InvoiceExtraction = () => {
  const { isSmallDevice } = useDeviceSize();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/invoiceUpload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.data);
  };

  return isSmallDevice ? (
    <div className="p-6 w-[100%] mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Invoice Extraction
      </h1>

      {/* Upload area (always visible) */}
      <div
        className="border-dashed border-2 border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-gray-600">
          {selectedFile ? (
            <>
              📄 <strong>{selectedFile.name}</strong> selected
            </>
          ) : (
            <>
              Drag & drop your invoice PDF here or{" "}
              <span className="text-blue-600 underline">browse</span>
            </>
          )}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
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
              className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              📤 Upload & Process
            </button>
          </div>

          {/* Right side: Results */}
          <div className="flex-1">
            {result ? (
              <div className="p-4 bg-gray-100 rounded shadow h-full overflow-auto">
                <h2 className="text-lg font-semibold mb-2">
                  Extraction Result:
                </h2>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="p-4 border rounded text-gray-500 text-sm italic">
                Extraction result will appear here.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="p-6 w-[80%] mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Invoice Extraction
      </h1>

      {/* Upload area (always visible) */}
      <div
        className="border-dashed border-2 border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition mb-6"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-gray-600">
          {selectedFile ? (
            <>
              📄 <strong>{selectedFile.name}</strong> selected
            </>
          ) : (
            <>
              Drag & drop your invoice PDF here or{" "}
              <span className="text-blue-600 underline">browse</span>
            </>
          )}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* ✅ Minimal change: add this condition */}
      {selectedFile && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side: Preview & Upload */}
          <div className="flex-1">
            <iframe
              src={previewUrl || undefined} // ✅ Fix: convert `null` to `undefined`
              className="w-full h-[550px] border rounded"
              title="PDF Preview"
            />
            <button
              className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              📤 Upload & Process
            </button>
          </div>

          {/* Right side: Results */}
          <div className="flex-1">
            {result ? (
              <div className="p-4 bg-gray-100 rounded shadow h-full overflow-auto">
                <h2 className="text-lg font-semibold mb-2">
                  Extraction Result:
                </h2>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="p-4 border h-full rounded text-gray-500 text-sm italic">
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
