// hooks/useInvoiceExtraction.ts
import { useState, useRef } from "react";

export function useInvoiceExtraction() {
  const [selectedExtractionFile, setExtractionSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [isExtractionUploading, setIsExtractionUploading] = useState(false);
  const [result, setResult] = useState<unknown>(null); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExtractionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExtractionSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (
    file &&
    (file.type === "application/pdf" || file.type.startsWith("image/"))
  ) {
      setExtractionSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleExtractionUpload = async (fileOverride?: File | React.MouseEvent) => {
    const fileToUpload =
    fileOverride instanceof File ? fileOverride : selectedExtractionFile;
    if (!fileToUpload || isExtractionUploading) return;
    setIsExtractionUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
 
      const res = await fetch("/api/invoiceUpload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.data);
      return data.data;
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsExtractionUploading(false);
    }
  };

  return {
    selectedExtractionFile,
    previewUrl,
    isExtractionUploading,
    result,
    fileInputRef,
    handleExtractionFileChange,
    handleDrop,
    handleExtractionUpload,
  };
}
