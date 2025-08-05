"use client";
import { InvGenFieldProps } from "@/types/invgen";
import React, { useState } from "react";

interface InvGenChatProps {
  onExtracted: (data: InvGenFieldProps) => void;
}

const InvGenChat = ({ onExtracted }: InvGenChatProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/invoiceGeneratorChatBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data: InvGenFieldProps = await res.json();

      // Optionally clear input
      onExtracted(data);
      setInput("");
    } catch (err) {
      console.error("⚠️ Chatbot API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 rounded-xl text-white flex flex-col">
      <textarea
        className="w-full p-2 rounded bg-gray-800 border border-gray-700 resize-none text-white"
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message and press Enter..."
      />

      <button
        onClick={handleSend}
        className="mt-2 bg-velqen-orange hover:bg-orange-500 transition px-4 py-2 rounded text-sm"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default InvGenChat;
