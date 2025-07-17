// components/InvoiceInput/InvoiceActions.tsx
import React, { useState } from "react";
import { useInvoiceExtraction } from "@/hooks/useInvoiceExtraction";
import { downloadRecordsAsCSV } from "@/lib/exportInvoiceCSV";
import { useRouter } from "next/navigation";
import { extractMinimalRecords } from "@/lib/extractMinimalRecords";

type Props = {
  file: File | null;
  onExtract: (result: Record<string, unknown>) => void;
};

const InvoiceActions = ({ file, onExtract }: Props) => {
  const { handleExtractionUpload, result } = useInvoiceExtraction();
  const [isExtracting, setIsExtracting] = useState(false);
  const [warnMessage, setWarnMessage] = useState("");
  const router = useRouter();

  const extractAndSendBack = async () => {
    if (!file) {
      showTempWarning("⚠️ Please choose a file before extracting."); // 🟩 added this line
      return; // 🟩 early return if no file
    }
    setIsExtracting(true);
    const result = await handleExtractionUpload(file);
    if (result) {
      onExtract(result);
    }
    setIsExtracting(false);
  };

  const hasResult =
    result &&
    typeof result === "object" &&
    Object.keys(result).length > 0 &&
    Object.values(result).some((v) => v !== null && v !== "");

  const showTempWarning = (message: string) => {
    setWarnMessage(message);
    setTimeout(() => setWarnMessage(""), 4000);
  };

  return (
    <div>
      <div className="flex justify-end gap-4 p-4">
        <button
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
          disabled={isExtracting}
          onClick={extractAndSendBack}
        >
          Extract
        </button>
        <button
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => {
            if (hasResult) {
              showTempWarning("");
              downloadRecordsAsCSV([result as Record<string, unknown>]); // cast result as single record wrapped in array
            } else {
              showTempWarning(
                "⚠️ Please extract the invoice before downloading."
              );
            }
          }}
        >
          Download
        </button>
        <button
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => {
            if (hasResult) {
              showTempWarning("");
              const minimal = extractMinimalRecords(result);
              const csvFormat = minimal.map((r) =>
                Object.values(r).map(String)
              );
              sessionStorage.setItem(
                "invoice_result",
                JSON.stringify(csvFormat)
              );
              router.push("/dashboard/ai-tools/transaction-classification");
            } else {
              showTempWarning("⚠️ Please extract the invoice before sending.");
            }
          }}
        >
          Send to Classification
        </button>
      </div>
      {warnMessage && <p className="text-white mt-2">{warnMessage}</p>}
    </div>
  );
};

export default InvoiceActions;
