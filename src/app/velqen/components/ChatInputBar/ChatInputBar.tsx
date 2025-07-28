// components/ChatInputBar.tsx
"use client";
import React from "react";
import { Send } from "lucide-react";
import ChatFileUpload from "../ChatFileUpload/ChatFileUpload";
import ChatActionButton from "../ChatActionButton/ChatActionButton";

interface ChatInputBarProps {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSmallDevice: boolean;
  setTasks: (tasks: string) => void;
  setProcessedContent: (content: string) => void;
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
            />
            <ChatActionButton />
          </div>

          <button
            type="submit"
            disabled={isLoading}
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
