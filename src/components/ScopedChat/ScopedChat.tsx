"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useChatPanel, type ChatAgent } from "@/hooks/useChatScope";
import { useDeviceSize } from "@/hooks/useDeviceSize";

function agentAvatarUrl(agent: ChatAgent) {
  const seed = encodeURIComponent(agent.avatarSeed ?? agent.name);
  const style = agent.avatarStyle ?? "adventurer";
  const base = `https://api.dicebear.com/9.x`;
  if (style === "adventurer-masculine") {
    return `${base}/adventurer/svg?seed=${seed}&backgroundColor=transparent&mouth=variant22&hair=short01,short02,short03,short04,short05,short06,short07,short08,short09,short10,short11,short12,short13,short14,short15,short16,short17,short18,short19&skinColor=f2d3b1`;
  }
  if (style === "adventurer-feminine") {
    return `${base}/adventurer/svg?seed=${seed}&backgroundColor=transparent&mouth=variant01,variant02,variant03,variant04&hair=long01,long02,long03,long04,long05,long06,long07,long08,long09,long10,long11,long12,long13,long14,long15,long16,long17,long18,long19,long20,long21,long22,long23,long24,long25,long26&eyebrows=variant10,variant11,variant12,variant13,variant14,variant15`;
  }
  const mouth = agent.mouth ? `&mouth=${agent.mouth}` : "";
  return `${base}/${style}/svg?seed=${seed}&backgroundColor=transparent${mouth}`;
}

const ScopedChat = () => {
  const { base, override, isOpen, setOpen, setOverride } = useChatPanel();
  const { isSmallDevice } = useDeviceSize();

  if (!base) return null;

  return (
    <>
      {!isOpen && (
        <LaunchButton
          isSmallDevice={isSmallDevice}
          agent={base.agent}
          onOpen={() => setOpen(true)}
        />
      )}
      {isOpen && (
        <ChatSurface
          isSmallDevice={isSmallDevice}
          agent={base.agent}
          endpoint={base.endpoint}
          defaultFocus={base.defaultFocus}
          overrideFocus={override}
          onClose={() => setOpen(false)}
          onClearOverride={() => setOverride(null)}
        />
      )}
    </>
  );
};

function LaunchButton({
  isSmallDevice,
  agent,
  onOpen,
}: {
  isSmallDevice: boolean;
  agent: ChatAgent;
  onOpen: () => void;
}) {
  if (isSmallDevice) {
    return (
      <button
        onClick={onOpen}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full velqen-gradient-bg shadow-lg flex items-center justify-center text-white"
        aria-label="Open chat"
      >
        <MessageCircle size={22} />
      </button>
    );
  }
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-black/70 border border-white/15 backdrop-blur hover:bg-black/80 transition shadow-lg"
    >
      <Image
        src={agentAvatarUrl(agent)}
        alt={agent.name}
        width={32}
        height={32}
        unoptimized
        className="rounded-full bg-fuchsia-500/20"
      />
      <span className="text-sm text-white">Ask {agent.name} about this page</span>
    </button>
  );
}

function ChatSurface({
  isSmallDevice,
  agent,
  endpoint,
  defaultFocus,
  overrideFocus,
  onClose,
  onClearOverride,
}: {
  isSmallDevice: boolean;
  agent: ChatAgent;
  endpoint: string;
  defaultFocus: { type: string; id: string; label?: string };
  overrideFocus: { type: string; id: string; label?: string } | null;
  onClose: () => void;
  onClearOverride: () => void;
}) {
  const [input, setInput] = useState("");
  const { messages, isLoading, handleSubmit } = useChatMessages(endpoint);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const focus = overrideFocus ?? defaultFocus;
  const isOverride = !!overrideFocus;

  useEffect(() => {
    messagesEndRef.current?.parentElement?.scrollTo({
      top: messagesEndRef.current.parentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const toSend = input;
    setInput("");
    await handleSubmit(toSend, focus);
  };

  const shell = isSmallDevice
    ? "fixed inset-x-0 bottom-0 z-50 h-[85vh] rounded-t-3xl"
    : "fixed top-0 right-0 z-50 h-full w-[420px] border-l border-white/10";

  return (
    <>
      {isSmallDevice && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          aria-hidden
        />
      )}
      <div className={`${shell} bg-[#0a0612] flex flex-col shadow-2xl`}>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <Image
              src={agentAvatarUrl(agent)}
              alt={agent.name}
              width={28}
              height={28}
              unoptimized
              className="rounded-full bg-fuchsia-500/20 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm text-white font-semibold">{agent.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {focus.label ?? `${focus.type} ${focus.id}`}
                {isOverride && (
                  <button
                    onClick={onClearOverride}
                    className="ml-2 text-fuchsia-300 hover:text-white"
                  >
                    clear
                  </button>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 && !isLoading && (
            <p className="text-xs text-gray-500 text-center pt-8">
              Ask anything about {focus.label ?? "this page"}.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-2xl text-sm max-w-[85%] break-words ${
                  m.sender === "user"
                    ? "velqen-gradient-bg text-white"
                    : "bg-white/10 text-gray-100"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-xs text-gray-400 animate-pulse">{agent.name} is typing…</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          className="p-3 border-t border-white/10 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-fuchsia-400/40"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 velqen-gradient-bg velqen-gradient-bg-hover text-white rounded-full text-sm disabled:opacity-40"
          >
            {isLoading ? "…" : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ScopedChat;
