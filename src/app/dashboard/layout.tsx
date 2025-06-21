// app/dashboard/layout.tsx
"use client";

import DashboardSidebar from "@/app/dashboard/components/DashboardSidebar/DashboardSidebar";
import { useSession } from "next-auth/react";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading session...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        You must be signed in to view this page.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 bg-velqen-gray text-white min-w-0">
        {children}
      </main>
    </div>
  );
}
