"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useChatBotPro } from "@/hooks/useChatBotPro";
import { greetings } from "@/data/chatInitialMessages";
import ReactMarkdown from "react-markdown";
import ChatInputBar from "../ChatInputBar/ChatInputBar";

const AIChatPro = () => {
  const { isSmallDevice } = useDeviceSize();
  const [input, setInput] = useState("");
  const { messages, isLoading, handleSubmit, setTasks, setProcessedContent } =
    useChatBotPro();
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
      <div className="flex items-center justify-center min-h-[100dvh]">
        <div className={`${isSmallDevice ? "w-full px-4" : "w-[600px]"}`}>
          {/* Welcome message or title could go here */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold  mb-2">{greeting} </h1>
          </div>

          {/* Centered Input Form */}
          <ChatInputBar
            input={input}
            setInput={setInput}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isSmallDevice={isSmallDevice}
            setTasks={setTasks}
            setProcessedContent={setProcessedContent}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center ">
      {/* Wrapper with 60% width & full height column */}
      <div
        className={`${
          isSmallDevice ? "w-full" : "w-[60%]"
        } flex flex-col h-[100dvh]`}
      >
        {/* Chat Area */}
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
        <ChatInputBar
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isSmallDevice={isSmallDevice}
          setTasks={setTasks}
          setProcessedContent={setProcessedContent}
        />
      </div>
    </div>
  );
};

export default AIChatPro;
