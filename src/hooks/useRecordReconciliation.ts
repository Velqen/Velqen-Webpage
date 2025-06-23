// hooks/useRecordReconciliation.ts
import { useState } from "react";

export type MatchedPair = {
  bank_id: string;
  ledger_id: string;
};

export type NLPMatchedPair = {
  bank_id: string;
  ledger_id: string;
  matched_fields: {
    amount?: boolean;
    date?: boolean;
    description?: boolean;
    [key: string]: boolean | undefined;
  };
};

export type ReconciliationResult = {
  matched_simple: MatchedPair[];
  matched_nlp: NLPMatchedPair[];
  unmatched_bank: Record<string, unknown>[];
  unmatched_ledger: Record<string, unknown>[];
};

export function useRecordReconciliation() {
  const [bankFile, setBankFile] = useState<File | null>(null);
  const [ledgerFile, setLedgerFile] = useState<File | null>(null);
  const [results, setResults] = useState<ReconciliationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);
    setLoading(true);

    if (!bankFile || !ledgerFile) {
      setError("Both files are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("bank", bankFile);
    formData.append("ledger", ledgerFile);

    try {
      const res = await fetch("/api/recordReconciliation", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to reconcile.");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your server.");
    } finally {
      setLoading(false);
    }
  };

  return {
    bankFile,
    ledgerFile,
    results,
    error,
    loading,
    setBankFile,
    setLedgerFile,
    handleSubmit,
  };
}
