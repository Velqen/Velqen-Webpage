// components/ChatInputBar.tsx
"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import ChatFileUpload from "../ChatFileUpload/ChatFileUpload";
import ChatActionButton from "../ChatActionButton/ChatActionButton";
import { ProcessedContent } from "@/types/chat";
interface ChatInputBarProps {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSmallDevice: boolean;
  setTasks: (tasks: string) => void;
  setProcessedContent: (content: ProcessedContent) => void;
}

const ChatInputBar = ({
  input,
  setInput,
  onSubmit,
  isLoading,
  isSmallDevice,
  setTasks,
  setProcessedContent,
}: ChatInputBarProps) => {
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  return (
    <form
      onSubmit={onSubmit}
      className={`${isSmallDevice ? "p-6" : "mb-6"} relative w-full`}
    >
      <div className="relative w-full rounded-2xl bg-velqen-black">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-3 mb-12 text-base outline-none h-[150px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              if (isProcessingFile) {
                e.preventDefault(); // stop submission
                return;
              }
              e.preventDefault();
              onSubmit();
            }
          }}
        />
        <div className="flex justify-between p-4">
          <div className="flex">
            <ChatFileUpload
              onExtracted={({ tasks, processedContent }) => {
                setTasks(tasks);
                setProcessedContent(processedContent);
              }}
              setIsProcessingFile={setIsProcessingFile}
            />
            <ChatActionButton />
          </div>

          <button
            type="submit"
            disabled={isLoading || isProcessingFile}
            className={`${
              isSmallDevice ? "" : ""
            } p-3 velqen-gradient-bg velqen-gradient-bg-hover text-white rounded-full disabled:opacity-50`}
          >
            {isLoading ? "…" : <Send size={18} />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInputBar;
