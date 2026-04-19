"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { AgentAvatar } from "@/components/AgentAvatar/AgentAvatar";

type Insight = { headline: string; actions: string[] };

type Debtor = { name: string; amount: number; days_overdue: number };
type Creditor = { name: string; amount: number };

type Snapshot = {
  total_in: number; total_out: number; total_owed: number;
  total_owing: number; overdue_count: number; summary: string; updated_at: string;
  top_debtors: Debtor[];
  top_creditors: Creditor[];
};

function parseInsight(summary: string): Insight | null {
  try {
    const parsed = JSON.parse(summary);
    if (parsed.headline && Array.isArray(parsed.actions)) return parsed;
  } catch {}
  return null;
}

export default function MoneyMoodPage() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch("/api/insights/latest")
      .then((r) => r.json())
      .then((snap) => {
        setSnapshot(snap.snapshot || null);
        setLoading(false);
      });
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetch("/api/insights/refresh", { method: "POST" })
      .then((r) => r.json())
      .then((d) => { setSnapshot({ ...d, updated_at: new Date().toISOString() }); setRefreshing(false); });
  };

  const totalIn    = snapshot?.total_in    ?? 0;
  const totalOut   = snapshot?.total_out   ?? 0;
  const net = totalIn - totalOut;
  const isUp = net >= 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-gray-500" size={22} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 sm:px-8 md:px-16 py-10">

      <AgentAvatar
        name="Mona"
        tagline={isUp ? "Business is looking good." : "Watch your spending."}
        gradient="from-emerald-700 via-violet-700 to-indigo-800"
        avatarStyle="adventurer"
        mouth="variant22"
        size="lg"
      />

      {/* AI Action Plan — hero card */}
      {snapshot?.summary ? (
        (() => {
          const insight = parseInsight(snapshot.summary);
          return (
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-50 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 -z-10 scale-105" />
              <div className="rounded-3xl p-[1.5px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
                <div className="rounded-[calc(1.5rem-1.5px)] bg-[#0f0a1a] px-5 sm:px-8 py-6 sm:py-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={13} className="text-fuchsia-400" />
                    <p className="text-xs uppercase tracking-widest text-fuchsia-400 font-semibold">CFO Action Plan</p>
                  </div>
                  {insight ? (
                    <>
                      <p className="text-white text-sm sm:text-base font-semibold leading-snug mb-5">
                        {insight.headline}
                      </p>
                      <ol className="space-y-3">
                        {insight.actions.map((action, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300 text-xs font-bold flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{action}</p>
                          </li>
                        ))}
                      </ol>
                    </>
                  ) : (
                    <p className="text-white text-sm sm:text-base leading-relaxed">{snapshot.summary}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        <p className="text-sm text-gray-500 text-center">No snapshot yet — click Refresh to generate your first insight</p>
      )}

      {/* Three simple stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <Tile
          label={isUp ? "🟢 You made" : "🔴 You lost"}
          value={`RM ${Math.abs(net).toLocaleString()}`}
          sub={isUp ? "after all expenses" : "more than you earned"}
          color={isUp ? "emerald" : "red"}
        />
        {/* Top debtors card */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-yellow-400 font-semibold">Owe you</p>
          {(snapshot?.top_debtors ?? []).length > 0 ? (
            (snapshot!.top_debtors).map((d, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="text-white text-sm truncate">{d.name}</span>
                <span className="text-yellow-300 text-sm font-semibold whitespace-nowrap">RM {d.amount.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No outstanding debtors</p>
          )}
        </div>
        {/* Top creditors card */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold">You owe</p>
          {(snapshot?.top_creditors ?? []).length > 0 ? (
            snapshot!.top_creditors.map((c, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="text-white text-sm truncate">{c.name}</span>
                <span className="text-orange-300 text-sm font-semibold whitespace-nowrap">RM {c.amount.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No outstanding bills</p>
          )}
        </div>
      </div>

      {/* Refresh */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition disabled:opacity-40"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Updating..." : "Refresh Insights"}
        </button>
        {snapshot?.updated_at && (
          <p className="text-xs text-gray-600">Last updated {new Date(snapshot.updated_at).toLocaleString()}</p>
        )}
      </div>

    </div>
  );
}

function Tile({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const bg: Record<string, string> = {
    emerald: "bg-emerald-400/10 border-emerald-400/20",
    red:     "bg-red-400/10 border-red-400/20",
    yellow:  "bg-yellow-400/10 border-yellow-400/20",
    orange:  "bg-orange-400/10 border-orange-400/20",
  };
  const text: Record<string, string> = {
    emerald: "text-emerald-400", red: "text-red-400", yellow: "text-yellow-400", orange: "text-orange-400",
  };
  return (
    <div className={`rounded-2xl border p-6 text-center ${bg[color]}`}>
      <p className="text-xs text-white mb-2">{label}</p>
      <p className={`text-2xl font-light ${text[color]}`}>{value}</p>
      <p className="text-xs text-gray-300 mt-1">{sub}</p>
    </div>
  );
}
