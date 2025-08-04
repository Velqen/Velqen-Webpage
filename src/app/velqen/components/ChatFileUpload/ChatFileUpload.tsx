"use client";
import React from "react";
import { Paperclip } from "lucide-react";
import { useInvoiceExtraction } from "@/hooks/useInvoiceExtraction";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";
import { ProcessedContent } from "@/types/chat";

interface ChatFileUploadProps {
  onExtracted: (payload: {
    tasks: string;
    processedContent: ProcessedContent;
  }) => void;
}

const ChatFileUpload = ({ onExtracted }: ChatFileUploadProps) => {
  const { fileInputRef, handleExtractionFileChange, handleExtractionUpload } =
    useInvoiceExtraction();

  const {
    csvData,
    status,
    isUploading,
    previewHeaders,
    previewRows,
    handleClassificationUpload,
    setStatus,
    setClassificationFile,
    downloadCsv,
  } = useTransactionClassification({
    csvDataInput: [],
  });

  return (
    <>
      <button
        type="button"
        title="Attach file"
        onClick={() => fileInputRef.current?.click()}
        className="p-3 text-white rounded-full hover:bg-velqen-gray"
      >
        <Paperclip size={20} />
      </button>
      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept="application/pdf,image/*,text/csv"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const isPdfOrImage =
            file.type === "application/pdf" || file.type.startsWith("image/");
          const isCsv = file.type === "text/csv";
          if (isPdfOrImage) {
            handleExtractionFileChange(e);
            const response = await handleExtractionUpload(file);
            console.log("Extraction Response:", response);
            onExtracted({
              tasks: "DocumentExtraction",
              processedContent: response,
            });
          } else if (isCsv) {
            const csvResponse = await handleClassificationUpload(file);
            console.log("CSV Response:", csvResponse);
            onExtracted({
              tasks: "RecordClassification",
              processedContent: csvResponse,
            });
          } else {
            alert("Only images and PDFs are supported.");
          }
        }}
      />
    </>
  );
};

export default ChatFileUpload;
