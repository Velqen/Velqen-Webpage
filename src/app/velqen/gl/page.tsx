"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const tabs = ["Journal Entries", "Balance Sheet", "P&L"];

type Journal = {
  journal_id: string;
  journal_number: string;
  date: string;
  notes: string;
  total: number;
  reference_number: string;
};

function BalanceSheetSection({ node, depth = 0 }: { node: any; depth?: number }) {
  if (!node) return null;
  const indent = depth * 16;

  return (
    <div>
      {node.name && (
        <div
          className={`flex justify-between py-1.5 px-4 text-sm ${
            depth === 0
              ? "font-semibold text-white border-t border-white/10 mt-2 pt-3"
              : depth === 1
              ? "font-medium text-gray-200"
              : "text-gray-400"
          }`}
          style={{ paddingLeft: `${16 + indent}px` }}
        >
          <span>{node.name}</span>
          {node.total !== undefined && node.total !== null && (
            <span className={node.total < 0 ? "text-red-400" : "text-white"}>
              RM {Math.abs(node.total).toLocaleString()}
            </span>
          )}
        </div>
      )}
      {node.total_label && (
        <div
          className="flex justify-between py-1.5 px-4 text-sm font-semibold text-orange-400 border-t border-white/5 mt-1"
          style={{ paddingLeft: `${16 + indent}px` }}
        >
          <span>{node.total_label}</span>
          <span>RM {Math.abs(node.total || 0).toLocaleString()}</span>
        </div>
      )}
      {node.account_transactions?.map((child: any, i: number) => (
        <BalanceSheetSection key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function GLPage() {
  const [activeTab, setActiveTab] = useState("Journal Entries");
  const [journals, setJournals] = useState<Journal[]>([]);
  const [trialBalance, setTrialBalance] = useState<any>(null);
  const [pnl, setPnl] = useState<any>(null);
  const [balanceSheet, setBalanceSheet] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (fetched[activeTab]) return;
    setFetched((prev) => ({ ...prev, [activeTab]: true }));

    setLoading(true);
    const fetchMap: Record<string, () => Promise<void>> = {
      "Journal Entries": async () => {
        const res = await fetch("/api/zoho/gl/journals");
        const data = await res.json();
        setJournals(data.journals || []);
      },
      "P&L": async () => {
        const res = await fetch("/api/zoho/gl/pnl");
        const data = await res.json();
        setPnl(data);
      },
      "Balance Sheet": async () => {
        const res = await fetch("/api/zoho/gl/balancesheet");
        const data = await res.json();
        setBalanceSheet(data.balance_sheet || []);
      },
    };

    fetchMap[activeTab]?.().finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <div className="p-6 px-10 space-y-6">
      <h1 className="text-2xl font-semibold text-white">General Ledger</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm transition ${
              activeTab === tab
                ? "text-white border-b-2 border-orange-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-gray-400" size={28} />
        </div>
      ) : (
        <>
          {/* Journal Entries */}
          {activeTab === "Journal Entries" && (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="text-left px-4 py-3">Journal #</th>
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="text-left px-4 py-3">Notes</th>
                    <th className="text-left px-4 py-3">Reference</th>
                    <th className="text-right px-4 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {journals.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-8">
                        No journal entries found
                      </td>
                    </tr>
                  ) : (
                    journals.map((j) => (
                      <tr key={j.journal_id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-white">{j.journal_number}</td>
                        <td className="px-4 py-3 text-gray-300">{j.date}</td>
                        <td className="px-4 py-3 text-gray-300">{j.notes || "—"}</td>
                        <td className="px-4 py-3 text-gray-400">{j.reference_number || "—"}</td>
                        <td className="px-4 py-3 text-right text-white font-medium">
                          RM {j.total?.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Balance Sheet */}
          {activeTab === "Balance Sheet" && (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden py-4">
              {balanceSheet.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No data</p>
              ) : (
                balanceSheet.map((section, i) => (
                  <BalanceSheetSection key={i} node={section} depth={0} />
                ))
              )}
            </div>
          )}

          {/* P&L */}
          {activeTab === "P&L" && (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden py-4">
              {!pnl?.profit_and_loss?.length ? (
                <p className="text-center text-gray-500 py-8">No data</p>
              ) : (
                <>
                  <div className="flex justify-between px-4 py-2 text-xs text-gray-500 border-b border-white/5 mb-2">
                    <span>Period: {pnl.page_context?.from_date} → {pnl.page_context?.to_date}</span>
                    <span>{pnl.page_context?.report_basis}</span>
                  </div>
                  {pnl.profit_and_loss.map((section: any, i: number) => (
                    <BalanceSheetSection key={i} node={section} depth={0} />
                  ))}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
