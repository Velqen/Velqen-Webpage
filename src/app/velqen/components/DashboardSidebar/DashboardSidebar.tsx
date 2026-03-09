// components/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // optional utility function
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { DashboardSidebarItems } from "../DashboardSidebarItems/DashboardSidebarItems";

const navItems = [
  { name: "Assistant", href: "/velqen" },
  { name: "Overview", href: "/velqen/transaction-overview" },
  { name: "Transactions", href: "/velqen/transactions" },
  // { name: "AI Assistant", href: "/dashboard/ai-assistant" },
  {
    name: "AI Tools",
    children: [
      {
        name: "Invoice Extractor",
        href: "/velqen/ai-tools/invoice-extraction",
      },
      {
        name: "Transaction Classifier",
        href: "/velqen/ai-tools/transaction-classification",
      },
      // {
      //   name: "Record Reconciler",
      //   href: "/velqen/ai-tools/record-reconciliation",
      // },
      {
        name: "Invoice Generator",
        href: "/velqen/ai-tools/invoice-generator",
      },
      {
        name: "Smart Vault",
        href: "/velqen/ai-tools/smart-vault",
      },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isSmallDevice } = useDeviceSize();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return isSmallDevice ? (
    <>
      {/* 🟠 Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          "fixed z-50 p-2 rounded-full bg-velqen-black border  transition-all",
          "hover:bg-gray-300 hover:text-black",
          "top-3 -translate-y-1",
          sidebarOpen ? "left-64" : "left-2"
        )}
      >
        {sidebarOpen ? (
          <ChevronLeft size={20} className="text-white" />
        ) : (
          <ChevronRight size={20} className="text-white" />
        )}
      </button>

      {/* 🟣 Sidebar */}
      <aside
        className={cn(
          "w-64 h-[100dvh] bg-velqen-black border-r px-4 py-6 flex flex-col justify-between fixed top-0 left-0 z-40 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col flex-grow space-y-4">
          <div className="flex justify-center p-2 h-[90px]">
            <Image
              src="/Velqen_no_bg_logo.png"
              alt="Logo"
              width={1200}
              height={4000}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-xl text-white font-bold mb-6">Dashboard</h2>

          <DashboardSidebarItems
            navItems={navItems}
            pathname={pathname}
            openDropdowns={openDropdowns}
            toggleDropdown={toggleDropdown}
            onLinkClick={
              isSmallDevice ? () => setSidebarOpen(false) : undefined
            }
          />
        </div>

        <div>
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded text-white hover:bg-gray-200 transition hover:text-black",
              pathname === "/" ? "bg-gray-300 font-medium" : ""
            )}
          >
            <ArrowLeft size={18} />
            Home
          </Link>
        </div>
      </aside>
    </>
  ) : (
    <aside className="fixed top-0 left-0 h-screen w-64 min-h-screen bg-velqen-black border-r px-4 py-6 flex flex-col justify-between">
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex justify-center p-6 h-[110px]">
          <Image
            src="/Velqen_no_bg_logo.png"
            alt="Logo"
            width={1200}
            height={4000}
            className="object-contain"
            priority
          />
        </div>
        <h2 className="text-xl text-white font-bold mb-6">Dashboard</h2>

        <DashboardSidebarItems
          navItems={navItems}
          pathname={pathname}
          openDropdowns={openDropdowns}
          toggleDropdown={toggleDropdown}
          onLinkClick={isSmallDevice ? () => setSidebarOpen(false) : undefined}
        />
      </div>
      <div>
        {" "}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded text-white hover:bg-gray-200 transition hover:text-black",
            pathname === "/" ? "bg-gray-300 font-medium" : ""
          )}
        >
          <ArrowLeft size={18} />
          Home
        </Link>
      </div>
    </aside>
  );
}
