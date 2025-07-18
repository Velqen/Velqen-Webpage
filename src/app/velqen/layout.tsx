// app/dashboard/layout.tsx
"use client";

import DashboardSidebar from "@/app/velqen/components/DashboardSidebar/DashboardSidebar";
import { useSession } from "next-auth/react";
import React from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const { isSmallDevice } = useDeviceSize();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-velqen-gray text-white text-2xl">
        Loading session...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-velqen-gray text-white text-2xl">
        You must be signed in to view this page.
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh]">
      <DashboardSidebar />
      <main
        className={`${
          isSmallDevice ? "" : "ml-64"
        } flex-1 bg-velqen-gray text-white min-w-0`}
      >
        {children}
      </main>
    </div>
  );
}
