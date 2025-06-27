// ✅ Line changed: Added `useEffect`
import { useEffect, useState, ChangeEvent } from "react";

type CsvUploadOptions = {
  onCsvParsed?: (data: string[][]) => void;
  csvDataInput?: string[][]; // ✅ New: external data passed directly
};

export function useTransactionClassification({
  onCsvParsed,
  csvDataInput,
}: CsvUploadOptions = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [status, setStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewHeaders, setPreviewHeaders] = useState<string[]>([]);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [hasProcessedInput, setHasProcessedInput] = useState(false); // ✅ avoid re-processing

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
    setIsUploading(true);
    setStatus("Uploading and classifying...");

    try {
      const formData = new FormData();

      if (file) {
        // ✅ Case 1: File selected manually
        formData.append("file", file);
      } else if (csvData.length > 0) {
        // ✅ Case 2: CSV data from props (InvoiceExtraction)
        const csvString = csvData.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        formData.append("file", new File([blob], "generated.csv", { type: "text/csv" }));
      } else {
        setStatus("❌ No file or CSV data to upload.");
        return;
      }

      const response = await fetch("api/transactionUpload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const blob = await response.blob();

      // Auto-download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "classified_transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      // Parse for preview
      const text = await blob.text();
      const lines = text.split("\n").filter((line) => line.trim() !== "");

      if (lines.length > 0) {
        const headers = lines[0].split(",");
        const rawRows = lines.slice(1, 6).map((line) => line.split(","));
        const fullCsv = [headers, ...lines.slice(1).map((line) => line.split(","))];

        setCsvData(fullCsv);
        setPreviewHeaders(headers);
        setPreviewRows(rawRows);
        onCsvParsed?.(fullCsv);
      }

      setStatus("✅ Classification complete.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ New: Auto-process passed-in CSV (e.g. from InvoiceExtraction)
  useEffect(() => {
    if (
      csvDataInput &&
      csvDataInput.length > 0 &&
      !hasProcessedInput
    ) {
      const hasHeaders = csvDataInput[0][0] === "Transaction_Description";
      const headers = [
        "Transaction_Description",
        "Amount_RM",
        "Date",
        "Merchant_Name",
      ];

      const finalCsv = hasHeaders ? csvDataInput : [headers, ...csvDataInput];

      setCsvData(finalCsv);

      const [finalHeaders, ...rows] = finalCsv;
      setPreviewHeaders(finalHeaders);
      setPreviewRows(rows.slice(0, 5));
      setStatus("✅ Data received from InvoiceExtraction");
      setHasProcessedInput(true);
    }
  }, [csvDataInput, hasProcessedInput]);
  
  
  
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
