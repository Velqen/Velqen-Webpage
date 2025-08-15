"use client";

import React, { useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { ProcessedContent } from "@/types/chat";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";

interface ChatClassificationResponseProps {
  tasks?: string;
  processedContent?: ProcessedContent;
}

const ChatClassificationResponse: React.FC<ChatClassificationResponseProps> = ({
  tasks,
  processedContent,
}) => {
  const { setCsvData, downloadCsv } = useTransactionClassification();

  useEffect(() => {
    if (processedContent) {
      setCsvData(processedContent as string[][]);
    }
  }, [processedContent, setCsvData]);
  return (
    <div className="px-4 py-2 rounded-2xl text-base break-words  flex flex-col space-y-2">
      <div>{tasks}</div>
      {processedContent && (
        <div>
          {typeof processedContent === "string" ? (
            processedContent
          ) : (
            <pre>{JSON.stringify(processedContent, null, 2)}</pre>
          )}
        </div>
      )}
      <div className="flex space-x-2">
        <button
          onClick={downloadCsv}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FiDownload className="mr-1" /> Download
        </button>
        {/* Add more buttons if needed */}
      </div>
    </div>
  );
};

export default ChatClassificationResponse;
