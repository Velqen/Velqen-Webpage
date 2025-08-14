// types/chat.ts
export type Message = {
  sender: "user" | "bot";
  text: string;
};

export type ProcessedContent = string | string[][];