// components/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // optional utility function
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { DashboardSidebarItems } from "../DashboardSidebarItems/DashboardSidebarItems";

const navItems = [
  { name: "Smart Vault", href: "/velqen/smart-vault" },
  { name: "Money Mood", href: "/velqen/finance" },
  { name: "Tax Assistant", href: "/velqen/tax" },
  { name: "Assistant", href: "/velqen" },
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

        <SidebarFooter pathname={pathname} />
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
      <SidebarFooter pathname={pathname} />
    </aside>
  );
}

function SidebarFooter({ pathname }: { pathname: string }) {
  const { data: session } = useSession();
  const user = session?.user;
  const initials = (user?.name ?? user?.email ?? "?").trim().charAt(0).toUpperCase();
  const active = pathname === "/velqen/profile";

  return (
    <Link
      href="/velqen/profile"
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded border-t border-white/10 pt-3 text-white hover:bg-white/5 transition",
        active ? "bg-white/10" : ""
      )}
    >
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name ?? "User"}
          width={32}
          height={32}
          className="rounded-full flex-shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-fuchsia-500/30 flex items-center justify-center text-sm font-semibold flex-shrink-0">
          {initials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm truncate">{user?.name ?? user?.email ?? "Profile"}</p>
        {user?.name && user.email && (
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        )}
      </div>
      <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
    </Link>
  );
}
