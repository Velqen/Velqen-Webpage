"use client";

import DashboardSidebar from "@/app/velqen/components/DashboardSidebar/DashboardSidebar";
import { useSession } from "next-auth/react";
import React from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { ChatScopeProvider, useChatPanel } from "@/hooks/useChatScope";
import ScopedChat from "@/components/ScopedChat/ScopedChat";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatScopeProvider>
      <DashboardShell>{children}</DashboardShell>
    </ChatScopeProvider>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { isSmallDevice } = useDeviceSize();
  const { isOpen, base } = useChatPanel();

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

  const chatOpenOnDesktop = isOpen && !isSmallDevice && !!base;

  return (
    <div className="flex min-h-[100dvh]">
      <DashboardSidebar />
      <main
        className={`${isSmallDevice ? "" : "ml-64"} ${
          chatOpenOnDesktop ? "mr-[420px]" : ""
        } flex-1 bg-velqen-gray text-white min-w-0 transition-[margin] duration-300`}
      >
        {children}
      </main>
      <ScopedChat />
    </div>
  );
}
