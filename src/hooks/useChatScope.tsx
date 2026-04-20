"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ChatFocus } from "./useChatMessages";

export type ChatAgent = {
  name: string;
  avatarSeed?: string;
  avatarStyle?: "lorelei" | "micah" | "adventurer" | "adventurer-feminine" | "adventurer-masculine";
  mouth?: string;
};

type ScopeBase = { endpoint: string; defaultFocus: ChatFocus; agent: ChatAgent };

type ChatScopeCtx = {
  base: ScopeBase | null;
  override: ChatFocus | null;
  isOpen: boolean;
  setBase: (b: ScopeBase | null) => void;
  setOverride: (f: ChatFocus | null) => void;
  setOpen: (o: boolean) => void;
};

const Ctx = createContext<ChatScopeCtx | null>(null);

export function ChatScopeProvider({ children }: { children: ReactNode }) {
  const [base, setBaseState] = useState<ScopeBase | null>(null);
  const [override, setOverrideState] = useState<ChatFocus | null>(null);
  const [isOpen, setOpen] = useState(false);

  const setBase = useCallback((b: ScopeBase | null) => {
    setBaseState(b);
    setOverrideState(null);
  }, []);

  const setOverride = useCallback((f: ChatFocus | null) => {
    setOverrideState(f);
  }, []);

  return (
    <Ctx.Provider value={{ base, override, isOpen, setBase, setOverride, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useChatPanel() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChatPanel must be used inside ChatScopeProvider");
  return ctx;
}

export function useChatScope({
  endpoint,
  defaultFocus,
  agent,
}: {
  endpoint: string;
  defaultFocus: ChatFocus;
  agent: ChatAgent;
}) {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChatScope must be used inside ChatScopeProvider");

  const focusKey = `${defaultFocus.type}:${defaultFocus.id}:${defaultFocus.label ?? ""}`;
  const agentKey = `${agent.name}:${agent.avatarSeed ?? ""}:${agent.avatarStyle ?? ""}:${agent.mouth ?? ""}`;
  useEffect(() => {
    ctx.setBase({ endpoint, defaultFocus, agent });
    return () => ctx.setBase(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, focusKey, agentKey]);

  return {
    override: ctx.override,
    setOverride: ctx.setOverride,
    open: () => ctx.setOpen(true),
  };
}
