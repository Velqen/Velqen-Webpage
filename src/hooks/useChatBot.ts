// hooks/useChatBot.ts
import { useState, useCallback } from "react";
import type { Message } from "@/types/chat";
import { initialMessages } from "@/data/chatInitialMessages";

export function useChatBot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages); // ✅ line changed
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (userInput: string) => {
    const userMessage: Message = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]); // ✅ line changed

    setIsLoading(true);

    try {
      const res = await fetch("/api/chatBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await res.json();
      const botMessage: Message = {
        sender: "bot",
        text: res.ok ? data.response : `Error: ${data.error || "Unknown"}`,
      };

      setMessages((prev) => [...prev, botMessage]); // ✅ line changed
    } catch {
      const errorMessage: Message = {
        sender: "bot",
        text: "Error: Could not reach API.",
      };
      setMessages((prev) => [...prev, userMessage, errorMessage]); // ✅ line changed
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, handleSubmit };
}
