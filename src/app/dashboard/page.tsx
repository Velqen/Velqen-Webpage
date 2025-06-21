// app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import TransactionAmountOverview from "@/app/dashboard/components/TransactionAmountOverview/TransactionAmountOverview";

const Page = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <div className="p-6 ">
      {/* ✅ Fix: use `userName` here after defining it */}
      <h1 className="text-2xl font-semibold text-white">
        Welcome back, {userName || "Friend"} 👋
      </h1>

      <TransactionAmountOverview />
    </div>
  );
};

export default Page;
