"use client";

import { useState, ChangeEvent } from "react";

export default function TransactionClassification() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  // Added for preview:
  const [previewHeaders, setPreviewHeaders] = useState<string[]>([]); // Added
  const [previewRows, setPreviewRows] = useState<string[][]>([]); // Added

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setStatus("");
      // Clear previous preview when a new file is selected:
      setPreviewHeaders([]); // Added
      setPreviewRows([]); // Added
    } else {
      setFile(null);
      setStatus("Please select a valid CSV file.");
      setPreviewHeaders([]); // Added
      setPreviewRows([]); // Added
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setStatus("Uploading and classifying...");

    try {
      const response = await fetch("api/transactionUpload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to classify transactions.");
      }

      // Fetch blob from response
      const blob = await response.blob();
      // Create a download link as before
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "classified_transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Added: parse blob text for preview
      const text = await blob.text(); // Added
      const lines = text.split("\n").filter((line) => line.trim() !== ""); // Added
      if (lines.length > 0) {
        // Added
        const headers = lines[0].split(","); // Added
        const rawRows = lines.slice(1, 6).map((line) => line.split(",")); // Added (first 5 rows)
        setPreviewHeaders(headers); // Added
        setPreviewRows(rawRows); // Added
      } // Added

      setStatus("Classification complete. Preview below or download file."); // Modified message to mention preview
    } catch (error: unknown) {
      let message = "Unknown error";
      if (error instanceof Error) {
        message = error.message;
      }
      setStatus(`Error: ${message}`);
      // Clear preview on error
      setPreviewHeaders([]); // Added
      setPreviewRows([]); // Added
    } finally {
      setIsUploading(false); // ✅ end loading
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full mx-auto">
      {/* Left Text Section */}
      <div className="md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">
          Upload Your CSV for Classification
        </h2>
        <p className="mb-4 text-gray-600">
          Please upload a CSV file containing at least the following fields:
        </p>
        <ul className="mb-4 text-gray-600 list-disc list-inside">
          <li>
            <code>description</code>
          </li>
          <li>
            <code>merchant_name</code>
          </li>
          <li>
            <code>amount</code>
          </li>
        </ul>
        <p className="text-gray-600">
          Transactions will be automatically categorised into five groups:
        </p>
        <p className="text-gray-600">
          Food & Drink, Income, Shopping, Transportation, Utilities
        </p>
      </div>

      {/* Right Upload Box */}
      <div className="md:w-2/3 max-w-7xl p-6 border rounded-lg shadow-lg bg-white">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-5 block w-full border border-bennett-gray rounded-md p-3 hover:border-bennett-orange"
        />

        <button
          onClick={handleUpload}
          className="w-full bennett-gradient-bg bennett-gradient-bg-hover text-white py-3 rounded disabled:opacity-50 transition"
          disabled={!file || isUploading}
        >
          Upload & Classify
        </button>

        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}

        {previewHeaders.length > 0 && previewRows.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {previewHeaders.map((header, idx) => (
                    <th
                      key={idx}
                      className="px-3 py-2 text-left text-sm font-medium text-bennett-gray border border-bennett-light-gray"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="px-3 py-2 text-sm text-bennett-gray border border-bennett-light-gray"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-bennett-gray text-center">
              Showing first {previewRows.length} rows
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
