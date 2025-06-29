// hooks/useInvoiceExtraction.ts
import { useState, useRef } from "react";

export function useInvoiceExtraction() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<unknown>(null); 
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
    if (
    file &&
    (file.type === "application/pdf" || file.type.startsWith("image/"))
  ) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (fileOverride?: File | React.MouseEvent) => {
    const fileToUpload =
    fileOverride instanceof File ? fileOverride : selectedFile;
    if (!fileToUpload || isUploading) return;
    setIsUploading(true);

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
      setIsUploading(false);
    }
  };

  return {
    selectedFile,
    previewUrl,
    isUploading,
    result,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleUpload,
  };
}
