// hooks/useChatBotPro.ts
import { useState, useCallback } from "react";
import type { Message } from "@/types/chat";
import { initialMessagesPro } from "@/data/chatInitialMessages";
import { ProcessedContent } from "@/types/chat";

export function useChatBotPro() {
  const [messages, setMessages] = useState<Message[]>(initialMessagesPro); // ✅ line changed
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState("");
  const [processedContent, setProcessedContent] = useState<ProcessedContent>("");

  const handleSubmit = useCallback(async (userInput: string) => {
    const userMessage: Message = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]); // ✅ line changed

    setIsLoading(true);

    try {
      const res = await fetch("/api/chatBotPro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          user_input: userInput,
          tasks,
          processedContent,
         }),
      });

      const data = await res.json();
      const botMessage: Message = {
        sender: "bot",
        text: res.ok ? data.response : `Error: ${data.error || "Unknown"}`,
      };

      setMessages((prev) => [...prev, botMessage]); 

      if (tasks && processedContent) {
      const tasksMessage: Message = {
        sender: "bot",
        text: "",
        isTask: true,
        processedContent: processedContent,
        tasks: tasks,
      };
      setMessages((prev) => [...prev, tasksMessage]);
    }
    } catch {
      const errorMessage: Message = {
        sender: "bot",
        text: "Error: Could not reach API.",
      };
      setMessages((prev) => [...prev, userMessage, errorMessage]); 
    } finally {
      setIsLoading(false);
      setTasks("");              
      setProcessedContent("");
    }
  },  [tasks, processedContent]);

  return {   
    messages,
    isLoading,
    handleSubmit,
    tasks,            
    processedContent,     
    setTasks,            
    setProcessedContent,  
  };
}
