"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";


export default function IntegrationsPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userEmail = session?.user?.email;

  const [zohoConnected, setZohoConnected] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const [justConnected, setJustConnected] = useState(false);

  useEffect(() => {
    if (searchParams.get("zoho") === "connected") {
      setJustConnected(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!userEmail) return;
    checkZohoStatus();
  }, [userEmail]);

  const checkZohoStatus = async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/zoho/status");
      const data = await res.json();
      setZohoConnected(data.connected);
    } catch {
      setZohoConnected(false);
    } finally {
      setChecking(false);
    }
  };

  const handleConnect = () => {
    window.location.href = `${BACKEND_URL}/api/v1/zoho/connect?user_email=${encodeURIComponent(userEmail!)}`;
  };

  return (
    <div className="p-6 px-10 max-w-3xl">
      <h1 className="text-2xl font-semibold text-white mb-1">Integrations</h1>
      <p className="text-gray-400 text-sm mb-8">
        Connect your accounting software to let Velqen read and sync your financial data.
      </p>

      {justConnected && (
        <div className="mb-6 flex items-center gap-2 bg-green-900/30 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg">
          <CheckCircle size={16} />
          Zoho Books connected successfully.
        </div>
      )}

      {/* Zoho Books Card */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#111] rounded-lg flex items-center justify-center border border-white/10">
            {/* Zoho logo placeholder */}
            <span className="text-orange-400 font-bold text-sm">Z</span>
          </div>
          <div>
            <h2 className="text-white font-medium">Zoho Books</h2>
            <p className="text-gray-400 text-sm">
              Sync invoices, bills, GL, payments and bank transactions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {checking ? (
            <Loader2 size={18} className="text-gray-400 animate-spin" />
          ) : zohoConnected ? (
            <>
              <span className="flex items-center gap-1.5 text-green-400 text-sm">
                <CheckCircle size={15} />
                Connected
              </span>
              <button
                onClick={checkZohoStatus}
                className="text-xs text-gray-500 hover:text-gray-300 transition"
              >
                Refresh
              </button>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                <XCircle size={15} />
                Not connected
              </span>
              <button
                onClick={handleConnect}
                disabled={!userEmail}
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                Connect
                <ExternalLink size={13} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Placeholder cards for future integrations */}
      <div className="mt-4 bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex items-center justify-between gap-4 opacity-40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#111] rounded-lg flex items-center justify-center border border-white/10">
            <span className="text-blue-400 font-bold text-sm">X</span>
          </div>
          <div>
            <h2 className="text-white font-medium">Xero</h2>
            <p className="text-gray-400 text-sm">Coming soon</p>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex items-center justify-between gap-4 opacity-40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#111] rounded-lg flex items-center justify-center border border-white/10">
            <span className="text-green-400 font-bold text-sm">Q</span>
          </div>
          <div>
            <h2 className="text-white font-medium">QuickBooks</h2>
            <p className="text-gray-400 text-sm">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
