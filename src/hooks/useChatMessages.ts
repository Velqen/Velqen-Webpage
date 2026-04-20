import { useState, useCallback, useEffect } from "react";
import type { Message } from "@/types/chat";

export type ChatFocus = { type: string; id: string; label?: string };

export function useChatMessages(endpoint: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([]);
  }, [endpoint]);

  const handleSubmit = useCallback(
    async (userInput: string, focus?: ChatFocus) => {
      const userMessage: Message = { sender: "user", text: userInput };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_input: userInput, focus }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: res.ok ? data.response : `Error: ${data.error || "Unknown"}`,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error: Could not reach API." },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  return { messages, isLoading, handleSubmit };
}
