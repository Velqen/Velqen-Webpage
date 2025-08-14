"use client";

import { useState } from "react";

export default function WaitingListPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add email");

      setMessage(data.message);
      setEmail("");
    } catch (err: unknown) {
      // <-- change here
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-2 px-4 text-white">
      <div className="bg-velqen-black rounded-xl shadow-xl p-8 w-full max-w-[800px] text-center">
        <h1 className="text-2xl xl:text-4xl font-bold mb-6">
          🚀 Join Our Waiting List
        </h1>
        <p className="mb-6 text-gray-300">
          Be the first to get notified when our product launches.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="velqen-gradient-bg velqen-gradient-bg-hover transition-colors text-white px-4 py-2 rounded-md font-semibold w-32"
          >
            {loading ? "Submitting..." : "Join Now"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-green-400 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
