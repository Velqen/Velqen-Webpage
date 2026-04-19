"use client";

import { useState } from "react";

export function useAgentStream(endpoint: string) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (prompt: string) => {
    setResult("");
    setLoading(true);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_input: prompt }),
    });

    if (!res.body) { setLoading(false); return; }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const token = line.slice(6);
          if (token === "[DONE]") { setLoading(false); return; }
          setResult((prev) => prev + token);
        }
      }
    }
    setLoading(false);
  };

  return { result, loading, run };
}
