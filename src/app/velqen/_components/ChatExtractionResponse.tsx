"use client";

import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { ProcessedContent } from "@/types/chat";
import { downloadRecordsAsCSV } from "@/lib/exportInvoiceCSV";
import { extractMinimalRecords } from "@/lib/extractMinimalRecords";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";
import DocumentCard from "./DocumentCard";

interface ChatExtractionResponseProps {
  processedContent?: ProcessedContent;
  onSubmit?: () => void;
  setTasks?: (tasks: string) => void;
  setProcessedContent?: (content: ProcessedContent) => void;
  setInput: (val: string) => void;
}

const ChatExtractionResponse: React.FC<ChatExtractionResponseProps> = ({
  processedContent,
  onSubmit,
  setTasks,
  setProcessedContent,
  setInput,
}) => {
  const { handleClassificationUpload, addHeadersIfMissing } =
    useTransactionClassification();
  const [shouldAutoSubmit, setShouldAutoSubmit] = useState(false);
  useEffect(() => {
    if (shouldAutoSubmit && processedContent) {
      onSubmit?.();
      setShouldAutoSubmit(false); // reset
    }
  }, [shouldAutoSubmit, processedContent, onSubmit]);
  return (
    <div className="px-4 py-2 rounded-2xl text-base break-words flex flex-col space-y-2">
      <div>DocumentExtraction</div>
      {processedContent && <DocumentCard processedContent={processedContent} />}
      <div className="flex space-x-2">
        <button
          onClick={() => {
            if (processedContent) {
              // 🟩 minimal change: cast to Record<string, unknown>[] like InvoiceActions
              downloadRecordsAsCSV([
                processedContent as unknown as Record<string, unknown>,
              ]);
            }
          }}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FiDownload className="mr-1" /> Download
        </button>
        {onSubmit && (
          <button
            onClick={async () => {
              setTasks?.("RecordClassification"); // 🟩 set task explicitly
              if (!processedContent) return;

              // Convert to minimal CSV-like format
              const minimal = extractMinimalRecords(processedContent);
              const csvFormat = minimal.map((r) =>
                Object.values(r).map(String)
              );
              const csvWithHeaders = addHeadersIfMissing(csvFormat);

              const csvString = csvWithHeaders
                .map((row) => row.join(","))
                .join("\n");
              const blob = new Blob([csvString], { type: "text/csv" });
              const generatedFile = new File([blob], "generated.csv", {
                type: "text/csv",
              });
              const response = await handleClassificationUpload(generatedFile);
              // Set the task and the processed content in the new format
              setTasks?.("RecordClassification");
              setProcessedContent?.(response); // trigger the send action

              setInput("Classify them");
              setShouldAutoSubmit(true);
            }}
            className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Classify
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatExtractionResponse;
