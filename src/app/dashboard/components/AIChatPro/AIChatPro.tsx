"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useChatBotPro } from "@/hooks/useChatBotPro";
import { Send } from "lucide-react";
import { greetings } from "@/data/chatInitialMessages";
import ReactMarkdown from "react-markdown";

const AIChatPro = () => {
  const { isSmallDevice } = useDeviceSize();
  const [input, setInput] = useState("");
  const { messages, isLoading, handleSubmit } = useChatBotPro();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [greeting, setGreeting] = useState("");

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.parentElement?.scrollTo({
        top: messagesEndRef.current.parentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim()) return;

    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    setInput(""); // ✅ clear input after sending
    await handleSubmit(input); // ✅ send only the input string
  };

  if (!hasUserInteracted) {
    // Initial centered layout (like ChatGPT)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`${isSmallDevice ? "w-full px-4" : "w-[600px]"}`}>
          {/* Welcome message or title could go here */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold  mb-2">{greeting} </h1>
          </div>

          {/* Centered Input Form */}
          <form onSubmit={onSubmit} className="relative w-full">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-16 border rounded-2xl text-base outline-none h-[150px] resize-none" // ⬅️ changed input → textarea, added resize-none
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute bottom-6 right-4 p-3 velqen-gradient-bg velqen-gradient-bg-hover text-white rounded-full disabled:opacity-50"
            >
              {isLoading ? "…" : <Send size={24} />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center pt-24">
      {/* Wrapper with 60% width & full height column */}
      <div
        className={`${
          isSmallDevice ? "w-full" : "w-[60%]"
        } flex flex-col max-h-screen h-[calc(100vh-6rem)]`}
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
                  msg.sender === "user" ? "bg-velqen-black text-white" : ""
                }`}
              >
                <div className="prose max-w-full">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
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
            isSmallDevice ? "fixed bottom-0 left-0 right-0 " : ""
          } p-4 flex gap-2 mb-7`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full text-base outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 velqen-gradient-bg velqen-gradient-bg-hover text-white rounded-full text-base disabled:opacity-50"
          >
            {isLoading ? "…" : <Send size={24} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatPro;
