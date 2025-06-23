// hooks/useTransactionClassification.ts
import { useState, useRef, ChangeEvent } from "react";

type CsvUploadOptions = {
  onCsvParsed?: (data: string[][]) => void;
};

export function useTransactionClassification({ onCsvParsed }: CsvUploadOptions = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [status, setStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewHeaders, setPreviewHeaders] = useState<string[]>([]);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setStatus("");
      setPreviewHeaders([]);
      setPreviewRows([]);
    } else {
      setFile(null);
      setStatus("Please select a valid CSV file.");
      setPreviewHeaders([]);
      setPreviewRows([]);
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

      if (!response.ok) throw new Error("Failed to classify transactions.");

      const blob = await response.blob();

      // Auto-download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "classified_transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Parse CSV
      const text = await blob.text();
      const lines = text.split("\n").filter((line) => line.trim() !== "");

      if (lines.length > 0) {
        const headers = lines[0].split(",");
        const rawRows = lines.slice(1, 6).map((line) => line.split(","));
        const fullCsv = [
          headers,
          ...lines.slice(1).map((line) => line.split(",")),
        ];
        setCsvData(fullCsv);
        onCsvParsed?.(fullCsv);
        setPreviewHeaders(headers);
        setPreviewRows(rawRows);
      }

      setStatus("Classification complete.");
    } catch (err) {
      setStatus("❌ Error during upload.");
      setPreviewHeaders([]);
      setPreviewRows([]);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    file,
    csvData,
    status,
    isUploading,
    previewHeaders,
    previewRows,
    handleFileChange,
    handleUpload,
    setCsvData,
    setStatus,
  };
}
