"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { ChevronRight, Home, LogOut, Plug } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  const initials = (user?.name ?? user?.email ?? "?").trim().charAt(0).toUpperCase();

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-16 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-1">Profile</h1>
      <p className="text-gray-400 text-sm mb-8">Manage your account and integrations.</p>

      {/* User card */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 flex items-center gap-4 mb-6">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User"}
            width={56}
            height={56}
            className="rounded-full"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-fuchsia-500/30 flex items-center justify-center text-xl font-semibold text-white">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-white font-medium truncate">{user?.name ?? user?.email ?? "Signed in"}</p>
          {user?.name && user.email && (
            <p className="text-gray-400 text-sm truncate">{user.email}</p>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden mb-6">
        <LinkRow
          href="/velqen/integrations"
          icon={<Plug size={18} className="text-orange-400" />}
          title="Integrations"
          sub="Connect Zoho Books and other accounting tools"
        />
        <div className="border-t border-white/10" />
        <LinkRow
          href="/"
          icon={<Home size={18} className="text-violet-300" />}
          title="Home"
          sub="Back to the marketing site"
        />
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/20 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}

function LinkRow({
  href,
  icon,
  title,
  sub,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition"
    >
      <div className="w-10 h-10 rounded-lg bg-[#111] border border-white/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="text-gray-400 text-xs mt-0.5 truncate">{sub}</p>
      </div>
      <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
    </Link>
  );
}
