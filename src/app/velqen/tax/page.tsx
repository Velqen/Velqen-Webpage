"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles, Receipt, Calculator, Lightbulb, RefreshCw } from "lucide-react";
import { MarkdownResult } from "@/components/MarkdownResult/MarkdownResult";
import { AgentAvatar } from "@/components/AgentAvatar/AgentAvatar";
import { useChatScope, useChatPanel } from "@/hooks/useChatScope";
import { useDeviceSize } from "@/hooks/useDeviceSize";

type TaxSnapshot = {
  compilation: string | null;
  estimation: string | null;
  advisory: string | null;
  updated_at: string;
};

type ColId = "compilation" | "estimation" | "advisory";

const COLUMNS = [
  { id: "compilation" as ColId, icon: Receipt,    title: "What can I deduct?",    sub: "Taxable vs deductible breakdown", gradient: "from-violet-800 via-violet-700 to-indigo-800", glow: "bg-violet-700"  },
  { id: "estimation"  as ColId, icon: Calculator, title: "How much tax do I owe?", sub: "Estimated tax bill",              gradient: "from-fuchsia-800 via-pink-800 to-rose-900",   glow: "bg-fuchsia-700" },
  { id: "advisory"    as ColId, icon: Lightbulb,  title: "Tax Advisory",           sub: "Grants & incentives you're missing", gradient: "from-amber-800 via-orange-800 to-rose-900", glow: "bg-amber-700"   },
];

export default function TaxPage() {
  const [snapshot, setSnapshot] = useState<TaxSnapshot | null>(null);
  const [loading, setLoading]   = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { override, setOverride } = useChatScope({
    endpoint: "/api/tax/chat",
    defaultFocus: { type: "tab", id: "tax", label: "Tax" },
    agent: { name: "Rex", avatarStyle: "adventurer-masculine", avatarSeed: "Marcus" },
  });
  const { isOpen } = useChatPanel();
  const { isSmallDevice } = useDeviceSize();
  const chatPushing = isOpen && !isSmallDevice;

  useEffect(() => {
    fetch("/api/tax/latest")
      .then((r) => r.json())
      .then((d) => { setSnapshot(d.snapshot || null); setLoading(false); });
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetch("/api/tax/refresh", { method: "POST" })
      .then((r) => r.json())
      .then((d) => { setSnapshot({ ...d, updated_at: new Date().toISOString() }); setRefreshing(false); });
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-gray-500" size={22} />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 px-4 sm:px-8 md:px-16 py-10">

      <AgentAvatar
        name="Rex"
        tagline="I handle the tax stuff. You run the business."
        avatarStyle="adventurer-masculine"
        seed="Marcus"
        size="lg"
      />

      {/* Three columns */}
      <div className={`grid gap-5 w-full ${chatPushing ? "grid-cols-1 max-w-2xl" : "grid-cols-1 lg:grid-cols-3 max-w-7xl"}`}>
        {COLUMNS.map((col) => {
          const content = snapshot?.[col.id];
          const active = override?.id === col.id;
          return (
            <button
              key={col.id}
              type="button"
              onClick={() => setOverride({ type: "card", id: col.id, label: col.title })}
              className={`relative flex flex-col text-left transition rounded-3xl ${
                active ? "ring-2 ring-fuchsia-400/70 ring-offset-2 ring-offset-velqen-gray" : "hover:brightness-110"
              }`}
            >
              <div className={`absolute inset-0 rounded-3xl blur-3xl opacity-30 ${col.glow} -z-10 scale-105`} />
              <div className={`rounded-3xl p-[1.5px] bg-gradient-to-br ${col.gradient} flex flex-col flex-1`}>
                <div className="rounded-[calc(1.5rem-1.5px)] bg-[#0f0a1a] px-5 sm:px-6 py-6 flex flex-col gap-4 flex-1">

                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${col.gradient} flex items-center justify-center flex-shrink-0`}>
                      <col.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={11} className="text-fuchsia-400" />
                        <p className="text-xs uppercase tracking-widest text-fuchsia-400 font-semibold">{col.title}</p>
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5">{col.sub}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {content
                      ? <MarkdownResult content={content} />
                      : <p className="text-gray-500 text-sm">No data yet — click Refresh to generate</p>
                    }
                  </div>

                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Refresh */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition disabled:opacity-40"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Updating..." : "Refresh Tax Data"}
        </button>
        {snapshot?.updated_at && (
          <p className="text-xs text-violet-300/70">Last updated {new Date(snapshot.updated_at).toLocaleString()}</p>
        )}
      </div>

    </div>
  );
}
