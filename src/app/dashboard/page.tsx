"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseBrowser";

const Page = () => {
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      try {
        const { data, error } = await supabase
          .from("transaction_records")
          .select("*")
          .eq("user_email", session.user.email?.toLowerCase());

        if (error) throw error;

        setUserData(data || []);
      } catch (err) {
        const typedErr = err as { message?: string };
        console.error("❌ Supabase fetch error:", typedErr.message);
        setError("Failed to fetch your data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (status === "loading") return <div>Loading session...</div>;
  if (status === "unauthenticated")
    return <div>Please log in to view your dashboard.</div>;

  return (
    <div className="p-4 my-52 space-y-4">
      <h1 className="text-2xl font-semibold">
        Welcome back, {session?.user?.name || "Friend"} 👋
      </h1>

      {loading ? (
        <p>Loading your data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : userData.length > 0 ? (
        <div className="space-y-2">
          {userData.map((record, idx) => (
            <div key={idx} className="border p-3 rounded shadow">
              <p>
                <strong>Date:</strong> {record.date}
              </p>
              <p>
                <strong>Amount (RM):</strong> {record.amount_rm}
              </p>
              <p>
                <strong>Main Category:</strong> {record.main_category}
              </p>
              <p>
                <strong>Sub Category:</strong> {record.sub_category}
              </p>
              <p>
                <strong>Description:</strong> {record.transaction_description}
              </p>
              <p>
                <strong>Merchant:</strong> {record.merchant_name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Page;
