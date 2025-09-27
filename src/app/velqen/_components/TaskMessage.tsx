// velqen/_components/TaskMessage.tsx
"use client";

import React from "react";
import { ProcessedContent } from "@/types/chat";
import ChatExtractionResponse from "./ChatExtractionResponse";
import ChatClassificationResponse from "./ChatClassificationResponse";
import InvoiceGenerationResponse from "./InvoiceGenerationResponse/InvoiceGenerationResponse";
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
  console.log("TaskMessage tasks:", tasks);

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
    const records =
      Array.isArray(processedContent) && Array.isArray(processedContent[0])
        ? (processedContent as string[][])
        : undefined;
    return (
      <ChatClassificationResponse tasks={tasks} processedContent={records} />
    );
  } else if (tasks === "InvoiceGeneration") {
    return (
      <InvoiceGenerationResponse
        tasks={tasks}
        processedContent={processedContent}
      />
    );
  }
};

export default TaskMessage;
