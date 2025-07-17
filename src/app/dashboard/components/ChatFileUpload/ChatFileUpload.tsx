"use client";
import React from "react";
import { Paperclip } from "lucide-react";
import { useInvoiceExtraction } from "@/hooks/useInvoiceExtraction";

interface ChatFileUploadProps {
  onExtracted: (payload: { tasks: string; processedContent: string }) => void;
}

const ChatFileUpload = ({ onExtracted }: ChatFileUploadProps) => {
  const { fileInputRef, handleExtractionFileChange, handleExtractionUpload } =
    useInvoiceExtraction();

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
        accept="application/pdf,image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const isAccepted =
            file.type === "application/pdf" || file.type.startsWith("image/");
          if (isAccepted) {
            handleExtractionFileChange(e);
            const response = await handleExtractionUpload(file);
            onExtracted({
              tasks: "DocumentExtraction",
              processedContent: response,
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
