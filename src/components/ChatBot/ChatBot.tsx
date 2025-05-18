"use client";
import React, { useState } from "react";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/chatBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: input }),
      });
      const data = await res.json();

      if (res.ok) {
        setResponse(data.response);
      } else {
        setResponse("Error: " + (data.error || "Unknown"));
      }
    } catch (err) {
      setResponse("Error: Could not reach API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "8px", width: "80%" }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{ marginLeft: "8px", padding: "8px" }}
        >
          {isLoading ? "Sending…" : "Send"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "16px" }}>
          <strong>Bennett:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
