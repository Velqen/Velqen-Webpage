// ✅ Line changed: Added `useEffect`
import { useEffect, useState, ChangeEvent, useRef } from "react";

type CsvUploadOptions = {
  onCsvParsed?: (data: string[][]) => void;
  csvDataInput?: string[][]; // ✅ New: external data passed directly
};

export function useTransactionClassification({
  onCsvParsed,
  csvDataInput,
}: CsvUploadOptions = {}) {
  const [classificationFile, setClassificationFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [status, setStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewHeaders, setPreviewHeaders] = useState<string[]>([]);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [hasProcessedInput, setHasProcessedInput] = useState(false); // ✅ avoid re-processing

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setClassificationFile(selectedFile);
      setStatus("");
      setPreviewHeaders([]);
      setPreviewRows([]);
    } else {
      setClassificationFile(null);
      setStatus("Please select a valid CSV file.");
      setPreviewHeaders([]);
      setPreviewRows([]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behaviour like opening the file
    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile && droppedFile.type === "text/csv") {
      setClassificationFile(droppedFile);                // ✅ Set the file
      setStatus("");                       // ✅ Reset status
      setPreviewHeaders([]);              // ✅ Clear preview headers
      setPreviewRows([]);                 // ✅ Clear preview rows
    } else {
      setClassificationFile(null);
      setStatus("Please select a valid CSV file.");  // ❌ Not a CSV
      setPreviewHeaders([]);
      setPreviewRows([]);
    }
  };

  const handleClassificationUpload = async (file?: File): Promise<string[][]> => {
    console.log("🚀 Starting classification upload...");
    setIsUploading(true);
    setStatus("Uploading and classifying...");
 
    try {
      const formData = new FormData();

      const fileToUse = file || classificationFile;

      if (fileToUse) {
        console.log("📁 using file:", fileToUse.name);
        formData.append("file", fileToUse); // ✅ use directly
      } 
      
      else if (csvData.length > 0) {
        // ✅ Case 2: CSV data from props (InvoiceExtraction)
        const csvString = csvData.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        formData.append("file", new File([blob], "generated.csv", { type: "text/csv" }));
      } else {
        setStatus("❌ No file or CSV data to upload.");
        return[];
      }

      const response = await fetch("/api/transactionUpload", {
        method: "POST",
        body: formData,
      });
      console.log("📡 Upload response:", response);
      if (!response.ok) throw new Error("Upload failed");

      const blob = await response.blob();

      // Auto-download
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "classified_transactions.csv");
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      // URL.revokeObjectURL(url);


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

        setStatus("✅ Classification complete.");
        return fullCsv; // ✅ Return full CSV here
      }

        return [];
      
    } catch (err) {
      console.error(err);
      setStatus("❌ Error during upload.");
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const downloadCsv = () => {
        if (csvData.length === 0) {
          setStatus("❌ No CSV data available for download.");
          return;
        }

        const csvString = csvData.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "classified_transactions.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        setStatus("✅ CSV downloaded.");
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
    classificationFile,
    csvData,
    status,
    isUploading,
    previewHeaders,
    previewRows,
    fileInputRef,
    handleFileChange,
    handleClassificationUpload,
    handleDrop,
    setCsvData,
    setStatus,
    setClassificationFile,
    downloadCsv,
  };
}
