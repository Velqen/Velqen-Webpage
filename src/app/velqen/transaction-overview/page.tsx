"use client";

import { useSession } from "next-auth/react";
import TransactionAmountOverview from "@/app/velqen/components/TransactionAmountOverview/TransactionAmountOverview";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const Page = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const { isSmallDevice } = useDeviceSize();

  return (
    <div className={` ${isSmallDevice ? "pt-14 " : ""} p-6 px-10`}>
      {/* ✅ Fix: use `userName` here after defining it */}
      <h1 className="text-2xl font-semibold text-white">
        Welcome back, {userName || "Friend"} 👋
      </h1>

      <TransactionAmountOverview />
    </div>
  );
};

export default Page;
