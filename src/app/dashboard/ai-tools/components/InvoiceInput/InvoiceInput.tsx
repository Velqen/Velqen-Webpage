import React, { useEffect } from "react";
import { useInvoiceExtraction } from "@/hooks/useInvoiceExtraction";
import { UploadCloud } from "lucide-react";

type InvoiceInputProps = {
  onFileSelect: (file: File) => void;
};

const InvoiceInput = ({ onFileSelect }: InvoiceInputProps) => {
  const { selectedFile, fileInputRef, handleFileChange, handleDrop } =
    useInvoiceExtraction();

  useEffect(() => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  }, [selectedFile, onFileSelect]);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-velqen-black p-10 rounded-lg shadow-[12px_12px_0px_0px_#000000]">
        <div
          className="w-[350px] h-[150px] xl:w-[700px] xl:h-[200px] border-dashed border-2 border-white rounded-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-velqen-orange transition"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud
            className="text-white mb-4"
            size={48}
            strokeWidth={1.5}
          />
          <p className="text-whiite text-base">
            {selectedFile ? (
              <>
                📄 <strong>{selectedFile.name}</strong> selected
              </>
            ) : (
              <>Click to upload or drag & drop</>
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
      </div>
    </div>
  );
};

export default InvoiceInput;
