"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useChatBotPro } from "@/hooks/useChatBotPro";
import { greetings } from "@/data/chatInitialMessages";
import ChatInputBar from "./components/ChatInputBar/ChatInputBar";
import ChatMessages from "./_components/ChatMessages";

const AIChatPro = () => {
  const { isSmallDevice } = useDeviceSize();
  const [input, setInput] = useState("");
  const {
    messages,
    isLoading,
    tasks,
    processedContent,
    handleSubmit,
    setTasks,
    setProcessedContent,
  } = useChatBotPro();
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
            <h1 className="text-3xl font-semibold  mb-2">{greeting} </h1>
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
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          isSmallDevice={isSmallDevice}
          messagesEndRef={messagesEndRef}
        />

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
