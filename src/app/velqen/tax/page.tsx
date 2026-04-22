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
  tax_saved: number;
  tax_payable: number;
  potential_incentives: number;
};

type CompilationItem = { name: string; total: number; deductible: number; pct: number; tax_saved: number };
type CompilationData = { items: CompilationItem[]; total_tax_saved: number };

function parseCompilation(raw: string): CompilationData | null {
  try {
    const parsed = JSON.parse(raw);
    if (parsed.items && Array.isArray(parsed.items)) return parsed;
  } catch {}
  return null;
}

function CompilationTable({ data }: { data: CompilationData }) {
  return (
    <div className="flex flex-col gap-3">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left pb-2 font-normal text-gray-400">Expense</th>
            <th className="text-right pb-2 font-semibold text-violet-400">Tax Saved</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="py-2 text-gray-300">
                {item.name}
                <span className="text-gray-600 text-xs ml-1.5">({item.pct}% deductible)</span>
              </td>
              <td className={`py-2 text-right font-semibold ${item.tax_saved > 0 ? "text-violet-400" : "text-gray-600"}`}>
                {item.tax_saved > 0 ? `RM ${item.tax_saved.toLocaleString()}` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-white/20">
            <td className="pt-3 text-sm font-semibold text-white">Total</td>
            <td className="pt-3 text-right text-lg font-bold text-violet-300">
              RM {data.total_tax_saved.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

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

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 px-4 sm:px-8 md:px-16 py-10">

      <AgentAvatar
        name="Rex"
        tagline="I handle the tax stuff. You run the business."
        avatarStyle="adventurer-masculine"
        seed="Marcus"
        size="lg"
      />

      {loading && <Loader2 className="animate-spin text-gray-500" size={22} />}

      {/* Stat tiles */}
      {snapshot && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-center">
            <p className="text-xs text-white mb-2">🟢 Tax You Saved</p>
            <p className="text-2xl font-light text-emerald-400">RM {snapshot.tax_saved.toLocaleString()}</p>
            <p className="text-xs text-gray-300 mt-1">through deductible expenses</p>
          </div>
          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-6 text-center">
            <p className="text-xs text-white mb-2">🧾 Tax Payable</p>
            <p className="text-2xl font-light text-violet-400">RM {snapshot.tax_payable.toLocaleString()}</p>
            <p className="text-xs text-gray-300 mt-1">at 24% corporate tax rate</p>
          </div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-6 text-center">
            <p className="text-xs text-white mb-2">💡 Potential Incentives</p>
            <p className="text-2xl font-light text-amber-400">RM {snapshot.potential_incentives.toLocaleString()}</p>
            <p className="text-xs text-gray-300 mt-1">govt grants you may qualify for</p>
          </div>
        </div>
      )}

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
                    {content ? (
                      col.id === "compilation" ? (
                        (() => {
                          const cd = parseCompilation(content);
                          return cd
                            ? <CompilationTable data={cd} />
                            : <MarkdownResult content={content} />;
                        })()
                      ) : (
                        <MarkdownResult content={content} />
                      )
                    ) : (
                      <p className="text-gray-500 text-sm">No data yet — click Refresh to generate</p>
                    )}
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
