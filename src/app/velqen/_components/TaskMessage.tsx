// velqen/_components/TaskMessage.tsx
"use client";

import React from "react";
import { FiDownload } from "react-icons/fi"; // example icon
import { Message as ChatMessage } from "@/types/chat";
import { ProcessedContent } from "@/types/chat";
import { downloadRecordsAsCSV } from "@/lib/exportInvoiceCSV";
interface TaskMessageProps {
  tasks?: string;
  processedContent?: ProcessedContent;
}

const TaskMessage: React.FC<TaskMessageProps> = ({
  tasks,
  processedContent,
}) => {
  // You can parse tasks or just render buttons/icons here

  if (tasks === "DocumentExtraction") {
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
          {/* Add more buttons if needed */}
        </div>
      </div>
    );
  } else if (tasks === "RecordClassification") {
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
          <button className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            <FiDownload className="mr-1" /> Download
          </button>
          {/* Add more buttons if needed */}
        </div>
      </div>
    );
  }
};

export default TaskMessage;
