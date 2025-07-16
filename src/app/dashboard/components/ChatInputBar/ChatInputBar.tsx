// components/ChatInputBar.tsx
"use client";
import React from "react";
import { Send, Paperclip } from "lucide-react";
import { useInvoiceExtraction } from "@/hooks/useInvoiceExtraction";

interface ChatInputBarProps {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSmallDevice: boolean;
}

const ChatInputBar = ({
  input,
  setInput,
  onSubmit,
  isLoading,
  isSmallDevice,
}: ChatInputBarProps) => {
  const { fileInputRef, handleFileChange, handleUpload } =
    useInvoiceExtraction();

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
          <button
            type="button"
            title="Attach file"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-white rounded-full hover:bg-velqen-gray"
          >
            <Paperclip size={20} />
          </button>
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept="application/pdf,image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const isAccepted =
                file.type === "application/pdf" ||
                file.type.startsWith("image/");
              if (isAccepted) {
                handleFileChange(e); // ✅ set state & preview
                const response = await handleUpload(file); // ✅ upload
                console.log("📦 Upload response:", response); // ✅ log result
              } else {
                alert("Only images and PDFs are supported.");
              }
            }}
          />
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
