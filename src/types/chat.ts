// types/chat.ts
export type Message = {
  sender: "user" | "bot";
  text: string;
  isTask?: boolean;
  tasks?: string;             // optional, for TaskMessage
  processedContent?: ProcessedContent;
};

export type ProcessedContent = string | string[][];