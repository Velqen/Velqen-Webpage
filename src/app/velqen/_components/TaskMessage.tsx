// velqen/_components/TaskMessage.tsx
"use client";

import React, { useState } from "react";
import { FiDownload } from "react-icons/fi"; // example icon
import { Message as ChatMessage } from "@/types/chat";
import { ProcessedContent } from "@/types/chat";
import { downloadRecordsAsCSV } from "@/lib/exportInvoiceCSV";
import { extractMinimalRecords } from "@/lib/extractMinimalRecords";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";
import ChatExtractionResponse from "./ChatExtractionResponse";
import ChatClassificationResponse from "./ChatClassificationResponse";
interface TaskMessageProps {
  tasks?: string;
  processedContent?: ProcessedContent;
  onSubmit?: () => void;
  setTasks?: (tasks: string) => void;
  setProcessedContent?: (content: ProcessedContent) => void;
  setInput: (val: string) => void;
}

const TaskMessage: React.FC<TaskMessageProps> = ({
  tasks,
  processedContent,
  onSubmit,
  setTasks,
  setProcessedContent,
  setInput,
}) => {
  // You can parse tasks or just render buttons/icons here
  const { handleClassificationUpload, addHeadersIfMissing } =
    useTransactionClassification();
  if (tasks === "DocumentExtraction") {
    return (
      <ChatExtractionResponse
        processedContent={processedContent}
        onSubmit={onSubmit}
        setTasks={setTasks}
        setProcessedContent={setProcessedContent}
        setInput={setInput}
      />
    );
  } else if (tasks === "RecordClassification") {
    return (
      <ChatClassificationResponse
        tasks={tasks}
        processedContent={processedContent}
      />
    );
  }
};

export default TaskMessage;
