"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Invoice = {
  invoice_id: string;
  invoice_number: string;
  customer_name: string;
  total: number;
  balance: number;
  due_date: string;
  status: string;
};

type Bill = {
  bill_id: string;
  bill_number: string;
  vendor_name: string;
  total: number;
  balance: number;
  due_date: string;
  status: string;
};

type Payment = {
  payment_id: string;
  party: string;
  type: "received" | "paid";
  amount: number;
  date: string;
  invoice_numbers: string;
  bill_numbers: string;
};

export default function FinancePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/zoho/ar").then((r) => r.json()),
      fetch("/api/zoho/ap").then((r) => r.json()),
      fetch("/api/zoho/payments").then((r) => r.json()),
    ]).then(([ar, ap, pay]) => {
      setInvoices(ar.invoices || []);
      setBills(ap.bills || []);
      setPayments(pay.payments || []);
      setLoading(false);
    });
  }, []);

  const totalAR = invoices.reduce((sum, i) => sum + i.balance, 0);
  const totalAP = bills.reduce((sum, b) => sum + b.balance, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-gray-400" size={28} />
      </div>
    );
  }

  return (
    <div className="p-6 px-10 space-y-10">
      <h1 className="text-2xl font-semibold text-white">Finance</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">Total AR Outstanding</p>
          <p className="text-2xl font-bold text-white">RM {totalAR.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">{invoices.length} invoices</p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">Total AP Outstanding</p>
          <p className="text-2xl font-bold text-white">RM {totalAP.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">{bills.length} bills</p>
        </div>
      </div>

      {/* AR Table */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-3">Accounts Receivable</h2>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left px-4 py-3">Invoice #</th>
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3">Due Date</th>
                <th className="text-right px-4 py-3">Balance</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">No outstanding invoices</td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.invoice_id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white">{inv.invoice_number}</td>
                    <td className="px-4 py-3 text-gray-300">{inv.customer_name}</td>
                    <td className="px-4 py-3 text-gray-300">{inv.due_date}</td>
                    <td className="px-4 py-3 text-right text-white font-medium">RM {inv.balance.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        inv.status === "overdue"
                          ? "bg-red-900/40 text-red-400"
                          : "bg-yellow-900/40 text-yellow-400"
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* AP Table */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-3">Accounts Payable</h2>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left px-4 py-3">Bill #</th>
                <th className="text-left px-4 py-3">Vendor</th>
                <th className="text-left px-4 py-3">Due Date</th>
                <th className="text-right px-4 py-3">Balance</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">No outstanding bills</td>
                </tr>
              ) : (
                bills.map((bill) => (
                  <tr key={bill.bill_id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white">{bill.bill_number}</td>
                    <td className="px-4 py-3 text-gray-300">{bill.vendor_name}</td>
                    <td className="px-4 py-3 text-gray-300">{bill.due_date}</td>
                    <td className="px-4 py-3 text-right text-white font-medium">RM {bill.balance.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        bill.status === "overdue"
                          ? "bg-red-900/40 text-red-400"
                          : "bg-yellow-900/40 text-yellow-400"
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payments Table */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-3">Recent Payments</h2>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left px-4 py-3">Party</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Reference</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-right px-4 py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">No payments recorded</td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.payment_id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-gray-300">{p.party}</td>
                    <td className="px-4 py-3 text-gray-300">{p.date}</td>
                    <td className="px-4 py-3 text-gray-400">{p.invoice_numbers || p.bill_numbers || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.type === "received" ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"}`}>
                        {p.type === "received" ? "Received" : "Paid out"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      <span className={p.type === "received" ? "text-green-400" : "text-red-400"}>
                        {p.type === "received" ? "+" : "-"}RM {p.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
