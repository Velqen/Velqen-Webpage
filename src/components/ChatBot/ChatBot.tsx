"use client";
import React, { useState, useRef, useEffect } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Improved focus handling
  useEffect(() => {
    const handleFocus = () => {
      // Small delay to ensure DOM is updated before scrolling
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setIsLoading(true);
    const userInput = input;
    setInput("");

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

  return (
    <div className="w-full mx-auto h-[600px] lg:h-[80vh] flex flex-col rounded-xl shadow-lg border border-gray-200">
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
                msg.sender === "user"
                  ? "bennett-gradient-bg text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-600 text-base max-w-xs animate-pulse">
              Bennett is typing…
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form - Fixed to bottom when keyboard is visible */}
      <form
        onSubmit={handleSubmit}
        className="p-4 flex gap-2 border-t sticky bottom-0 bg-white"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
