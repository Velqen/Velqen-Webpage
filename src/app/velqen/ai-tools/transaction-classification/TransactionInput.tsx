// components/TransactionInput.tsx
import React, { useEffect } from "react";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";
import { UploadCloud } from "lucide-react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

type TransactionInputProps = {
  onTransactionSelect?: (file: File) => void;
  csvData?: string[][];
};

const TransactionInput = ({
  csvData: inputCsvData,
  onTransactionSelect,
}: TransactionInputProps) => {
  const { isSmallDevice } = useDeviceSize();
  const { classificationFile, fileInputRef, handleFileChange, handleDrop } =
    useTransactionClassification();

  useEffect(() => {
    if (classificationFile && onTransactionSelect) {
      onTransactionSelect(classificationFile); // ✅ Renamed usage
    }
  }, [classificationFile, onTransactionSelect]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-velqen-black rounded-lg shadow-[12px_12px_0px_0px_#000000]">
        <div
          className={`${
            isSmallDevice
              ? "w-[300px] h-[120px] p-4 m-4"
              : "w-[350px] h-[150px] p-6 m-10"
          } xl:w-[700px] xl:h-[200px] border-dashed border-2 border-white rounded-lg flex flex-col justify-center items-center text-center cursor-pointer hover:border-velqen-orange transition`}
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
            {classificationFile ? (
              <>
                📊 <strong>{classificationFile.name}</strong> selected
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
