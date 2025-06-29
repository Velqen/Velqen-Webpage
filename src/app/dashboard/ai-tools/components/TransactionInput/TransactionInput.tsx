// components/TransactionInput.tsx
import React, { useEffect } from "react";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";
import { UploadCloud } from "lucide-react";

type TransactionInputProps = {
  onTransactionSelect?: (file: File) => void;
  csvData?: string[][];
};

const TransactionInput = ({
  csvData: inputCsvData,
  onTransactionSelect,
}: TransactionInputProps) => {
  const { file, fileInputRef, handleFileChange, handleDrop } =
    useTransactionClassification();

  useEffect(() => {
    if (file && onTransactionSelect) {
      onTransactionSelect(file); // ✅ Renamed usage
    }
  }, [file, onTransactionSelect]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-velqen-black p-10 rounded-lg shadow-[12px_12px_0px_0px_#000000]">
        <div
          className="w-[350px] h-[150px] xl:w-[700px] xl:h-[200px] border-dashed border-2 border-whiite rounded-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-velqen-orange transition"
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
            {file ? (
              <>
                📊 <strong>{file.name}</strong> selected
              </>
            ) : inputCsvData?.length ? (
              <>✅ Data received from InvoiceExtraction</>
            ) : (
              <>Click to upload or drag & drop your CSV file</>
            )}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv" // ✅ Changed line for CSV support
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionInput;
