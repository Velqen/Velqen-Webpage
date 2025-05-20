"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize"; // Using your existing hook

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatBot = () => {
  const { isSmallDevice } = useDeviceSize();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const originalPositionRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.parentElement?.scrollTo({
        top: messagesEndRef.current.parentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setIsLoading(true);
    const userInput = input;
    setInput("");

    // Restore position after sending on small devices
    if (isSmallDevice && originalPositionRef.current !== null) {
      setTimeout(() => {
        window.scrollTo(0, originalPositionRef.current || 0);
      }, 100);
    }

    try {
      const res = await fetch("/api/chatBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.ok ? data.response : `Error: ${data.error || "Unknown"}`,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Could not reach API." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input focus
  const handleFocus = () => {
    if (isSmallDevice) {
      originalPositionRef.current = window.scrollY;
      setIsInputFocused(true);
    }
  };

  // Handle input blur
  const handleBlur = () => {
    if (isSmallDevice) {
      setTimeout(() => {
        setIsInputFocused(false);
        if (originalPositionRef.current !== null) {
          window.scrollTo(0, originalPositionRef.current);
        }
        scrollToBottom();
      }, 100);
    } else {
      scrollToBottom();
    }
  };

  return (
    <div className="w-full bg-white mx-auto h-[600px] lg:h-[80vh] flex flex-col rounded-xl shadow-lg border border-gray-200">
      {/* Chat Area */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-base max-w-xs break-words ${
                msg.sender === "user" ? "bennett-gradient-bg text-white" : ""
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl text-bennett-gray text-base max-w-xs animate-pulse">
              Bennett is typing…
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form - conditionally position fixed on small devices when focused */}
      <form
        onSubmit={handleSubmit}
        className={`${
          isSmallDevice && isInputFocused
            ? "fixed bottom-0 left-0 right-0 bg-white z-50"
            : ""
        } p-4 flex gap-2 border-t`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full text-base outline-none focus:ring-2 focus:ring-bennett-orange"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bennett-gradient-bg bennett-gradient-bg-hover text-white rounded-full text-base disabled:opacity-50"
        >
          {isLoading ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
