"use client";
// ✅ Line changed
import dynamic from "next/dynamic"; // ✅ Add this at the top

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false }); // ✅ This disables SSR

import React, { useState, useRef } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
const InvoiceExtraction = () => {
  const { isSmallDevice } = useDeviceSize();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    if (!selectedFile || isUploading) return; // ✅ Prevent double upload

    setIsUploading(true); // ✅ Start upload

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/invoiceUpload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false); // ✅ End upload
    }
  };

  return isSmallDevice ? (
    <div className="py-6 w-[100%] mx-auto pb-32">
      {/* Upload area (always visible)*/}
      <div
        className="border-dashed border-2 border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-bennett-orange transition"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-bennett-gray text-base">
          {selectedFile ? (
            <>
              📄 <strong>{selectedFile.name}</strong> selected
            </>
          ) : (
            <>
              Drag & drop your invoice PDF here or{" "}
              <span className="bennett-gradient-text underline">browse</span>
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
              className="mt-4 w-full py-3 bennett-gradient-bg bennett-gradient-bg-hover text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "📤 Upload & Process"}
            </button>
          </div>

          {/* Right side: Results */}
          <div className="flex-1">
            {result ? (
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
            ) : (
              <div className="p-4 border rounded text-bennett-gray text-base italic">
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
        } flex items-center justify-center border-dashed border-2 border-gray-400 rounded-lg p-6 cursor-pointer hover:border-bennett-orange transition mb-6`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-bennett-gray">
          {selectedFile ? (
            <>
              📄 <strong>{selectedFile.name}</strong> selected
            </>
          ) : (
            <>
              Drag & drop your invoice PDF here or{" "}
              <span className="bennett-gradient-text underline">browse</span>
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
              className="mt-4 w-full py-3 bennett-gradient-bg bennett-gradient-bg-hover text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition text-xl"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "📤 Upload & Process"}
            </button>
          </div>

          {/* Right side: Results */}
          <div className="flex-1">
            {result ? (
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
            ) : (
              <div className="p-4 border h-full rounded text-bennett-gray text-xl italic">
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
