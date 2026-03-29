"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";

type Invoice = { balance: number; status: string };
type Bill = { balance: number; status: string };

type Snapshot = {
  total_in: number; total_out: number; total_owed: number;
  total_owing: number; overdue_count: number; summary: string; updated_at: string;
};

export default function MoneyMoodPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/zoho/ar").then((r) => r.json()),
      fetch("/api/zoho/ap").then((r) => r.json()),
      fetch("/api/insights/latest").then((r) => r.json()),
    ]).then(([ar, ap, snap]) => {
      setInvoices(ar.invoices || []);
      setBills(ap.bills || []);
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
  const totalOwed  = snapshot?.total_owed  ?? invoices.reduce((s, i) => s + i.balance, 0);
  const totalOwing = snapshot?.total_owing ?? bills.reduce((s, b) => s + b.balance, 0);
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
    <div className="h-[calc(100vh-1px)] flex flex-col items-center justify-center gap-8 px-16">

      {/* Mood headline */}
      <div className="text-center">
        <p className="text-6xl mb-4">{isUp ? "😊" : "😟"}</p>
        <h1 className="text-5xl font-semibold text-white tracking-tight">
          {isUp ? "Business is good" : "Watch your spending"}
        </h1>
      </div>

      {/* AI Summary — hero card */}
      {snapshot?.summary ? (
        <div className="relative max-w-xl w-full mx-auto">
          {/* strong glow */}
          <div className="absolute inset-0 rounded-3xl blur-3xl opacity-60 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 -z-10 scale-105" />
          {/* card with vivid gradient border */}
          <div className="rounded-3xl p-[1.5px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-[#0f0a1a] px-7 py-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={13} className="text-fuchsia-400" />
                <p className="text-xs uppercase tracking-widest text-fuchsia-400 font-semibold">AI insight</p>
              </div>
              <p className="text-white text-base leading-relaxed">{snapshot.summary}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No snapshot yet — click Refresh to generate your first insight</p>
      )}

      {/* Three simple stats */}
      <div className="grid grid-cols-3 gap-5 w-full max-w-2xl">
        <Tile
          label={isUp ? "🟢 You made" : "🔴 You lost"}
          value={`RM ${Math.abs(net).toLocaleString()}`}
          sub={isUp ? "after all expenses" : "more than you earned"}
          color={isUp ? "emerald" : "red"}
        />
        <Tile
          label="People owe you"
          value={`RM ${totalOwed.toLocaleString()}`}
          sub={`${invoices.length} unpaid`}
          color="yellow"
        />
        <Tile
          label="You owe"
          value={`RM ${totalOwing.toLocaleString()}`}
          sub={`${bills.length} unpaid`}
          color="orange"
        />
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
