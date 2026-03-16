"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

type BankAccount = {
  account_id: string;
  account_name: string;
  balance: number;
  currency_code: string;
};

type BankTransaction = {
  transaction_id: string;
  date: string;
  description: string;
  payee: string;
  debit_or_credit: string;
  amount: number;
  reference_number: string;
  status: string;
  transaction_type: string;
};

export default function BankReconPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingTx, setLoadingTx] = useState(false);

  useEffect(() => {
    fetch("/api/zoho/bank/accounts")
      .then((r) => r.json())
      .then((data) => {
        setAccounts(data.accounts || []);
        setLoadingAccounts(false);
      });
  }, []);

  const loadTransactions = async (account: BankAccount) => {
    setSelectedAccount(account);
    setLoadingTx(true);
    const res = await fetch(`/api/zoho/bank/transactions?account_id=${account.account_id}`);
    const data = await res.json();
    setTransactions(data.transactions || []);
    setLoadingTx(false);
  };

  const matched = transactions.filter((t) => t.status === "matched" || t.status === "categorized");
  const unmatched = transactions.filter((t) => t.status === "uncategorized");

  return (
    <div className="p-6 px-10 space-y-8">
      <h1 className="text-2xl font-semibold text-white">Bank Reconciliation</h1>

      {/* Bank Accounts */}
      {loadingAccounts ? (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 size={18} className="animate-spin" /> Loading accounts...
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap">
          {accounts.map((acc) => (
            <button
              key={acc.account_id}
              onClick={() => loadTransactions(acc)}
              className={`px-4 py-3 rounded-xl border text-sm transition ${
                selectedAccount?.account_id === acc.account_id
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-[#1a1a1a] border-white/10 text-gray-300 hover:border-white/30"
              }`}
            >
              <div className="font-medium">{acc.account_name}</div>
              <div className="text-xs opacity-70 mt-0.5">{acc.currency_code} {acc.balance?.toLocaleString()}</div>
            </button>
          ))}
        </div>
      )}

      {/* Transactions */}
      {selectedAccount && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Total Transactions</p>
              <p className="text-xl font-bold text-white">{transactions.length}</p>
            </div>
            <div className="bg-[#1a1a1a] border border-green-500/20 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Matched</p>
              <p className="text-xl font-bold text-green-400">{matched.length}</p>
            </div>
            <div className="bg-[#1a1a1a] border border-red-500/20 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Needs Review</p>
              <p className="text-xl font-bold text-red-400">{unmatched.length}</p>
            </div>
          </div>

          {/* Transactions Table */}
          {loadingTx ? (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 size={18} className="animate-spin" /> Loading transactions...
            </div>
          ) : (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="text-left px-4 py-3">Payee</th>
                    <th className="text-left px-4 py-3">Description</th>
                    <th className="text-left px-4 py-3">Reference</th>
                    <th className="text-right px-4 py-3">Amount</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-8">No transactions found</td>
                    </tr>
                  ) : (
                    transactions.map((tx) => {
                      const isCredit = tx.debit_or_credit === "debit"; // debit = money IN to bank account
                      const needsReview = tx.status === "uncategorized";
                      return (
                        <tr key={tx.transaction_id} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="px-4 py-3 text-gray-300">{tx.date}</td>
                          <td className="px-4 py-3 text-white">{tx.payee || "—"}</td>
                          <td className="px-4 py-3 text-gray-300">{tx.description}</td>
                          <td className="px-4 py-3 text-gray-400">{tx.reference_number || "—"}</td>
                          <td className={`px-4 py-3 text-right font-medium ${isCredit ? "text-green-400" : "text-red-400"}`}>
                            {isCredit ? "+" : "-"}RM {tx.amount?.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            {needsReview ? (
                              <span className="flex items-center gap-1 text-xs text-yellow-400">
                                <AlertCircle size={13} /> Review
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-green-400">
                                <CheckCircle size={13} /> Matched
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
