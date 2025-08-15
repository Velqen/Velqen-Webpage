// components/ChatMessages.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Message as ChatMessage } from "@/types/chat";
import { ProcessedContent } from "@/types/chat";
import TaskMessage from "./TaskMessage";
interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  setInput: (val: string) => void;
  isSmallDevice: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onSendMessage?: () => void;
  setTasks: (tasks: string) => void;
  setProcessedContent: (content: ProcessedContent) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  setInput,
  isSmallDevice,
  messagesEndRef,
  onSendMessage,
  setTasks,
  setProcessedContent,
}) => {
  return (
    <div
      className={`${
        isSmallDevice ? "mt-8" : "mt-10"
      } flex-1 p-4 space-y-3 overflow-y-auto min-h-0`}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {" "}
          {msg.isTask ? (
            // ✅ Render TaskMessage if it's a task
            <TaskMessage
              tasks={msg.tasks}
              processedContent={msg.processedContent}
              onSubmit={onSendMessage}
              setTasks={setTasks}
              setProcessedContent={setProcessedContent}
              setInput={setInput}
            />
          ) : (
            <div
              className={`px-4 py-2 rounded-2xl text-base break-words ${
                msg.sender === "user" ? "bg-velqen-black text-white" : ""
              }`}
            >
              <div className="prose max-w-full">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="px-4 py-2 rounded-2xl text-velqen-gray text-base max-w-xs animate-pulse">
            velqen is typing…
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
