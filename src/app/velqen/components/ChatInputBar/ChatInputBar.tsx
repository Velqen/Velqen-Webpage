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
  // Auto-grow textarea logic
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  return (
    <form
      onSubmit={onSubmit}
      className={`${isSmallDevice ? "p-6" : "mb-6"} relative w-full`}
    >
      <div className="relative w-full rounded-2xl bg-velqen-black">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-3 mb-2 text-base outline-none min-h-[20px] max-h-[200px] resize-none"
          style={{ height: "20px" }}
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
        <div className="flex justify-between items-center p-2 gap-2">
          <div className="flex items-center gap-2">
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
            className={`p-3 velqen-gradient-bg velqen-gradient-bg-hover text-white rounded-full disabled:opacity-50`}
          >
            {isLoading ? "…" : <Send size={18} />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInputBar;
