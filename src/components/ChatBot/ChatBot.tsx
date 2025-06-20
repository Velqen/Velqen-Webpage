"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useChatBot } from "@/hooks/useChatBot";

const ChatBot = () => {
  const { isSmallDevice } = useDeviceSize();
  const [input, setInput] = useState("");
  const { messages, isLoading, handleSubmit } = useChatBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    await handleSubmit(input); // ✅ send only the input string
    setInput(""); // ✅ clear input after sending
  };

  // Handle input focus
  // const handleFocus = () => {
  //   if (isSmallDevice) {
  //     originalPositionRef.current = window.scrollY;
  //     setIsInputFocused(true);
  //   }
  // };

  // Handle input blur
  // const handleBlur = () => {
  //   if (isSmallDevice) {
  //     setTimeout(() => {
  //       setIsInputFocused(false);
  //       if (originalPositionRef.current !== null) {
  //         window.scrollTo(0, originalPositionRef.current);
  //       }
  //       scrollToBottom();
  //     }, 100);
  //   } else {
  //     scrollToBottom();
  //   }
  // };

  return (
    <div className="fixed inset-0 flex justify-center z-50 pt-24">
      {/* Wrapper with 80% width & full height column */}
      <div
        className={`${
          isSmallDevice ? "w-full" : "w-[60%]"
        } flex flex-col h-full`}
      >
        {/* Chat Area */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-0">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-base break-words ${
                  msg.sender === "user" ? "velqen-gradient-bg text-white" : ""
                }`}
              >
                {msg.text}
              </div>
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

        {/* Input Form - conditionally position fixed on small devices when focused */}
        <form
          onSubmit={onSubmit}
          className={`${
            isSmallDevice ? "fixed bottom-0 left-0 right-0 z-50" : ""
          } p-4 flex gap-2 mb-7`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full text-base outline-none focus:ring-2 focus:ring-velqen-orange"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 velqen-gradient-bg velqen-gradient-bg-hover text-white rounded-full text-base disabled:opacity-50"
          >
            {isLoading ? "…" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
