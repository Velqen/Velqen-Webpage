"use client";

import Link from "next/link";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ChevronDownIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { isSmallDevice } = useDeviceSize();
  const [open, setOpen] = useState(false);
  const { status, data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (open && isSmallDevice) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isSmallDevice]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        dropdownRef.current instanceof HTMLElement &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }
  return isSmallDevice ? (
    <nav className="absolute top-0 left-0 w-full z-500 p-4">
      <div className="flex justify-between items-center">
        {/* Site Name */}
        <div className="font-bold text-2xl">Velqen</div>

        {/* Hamburger Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="z-60"
        >
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Dropdown menu below navbar */}
      {open && (
        <div className="absolute top-full left-0 w-[calc(100vw-3rem)] h-[calc(100vh-7rem)] bg-[rgba(255,255,255,0.85)] backdrop-blur-md flex flex-col items-center gap-6 py-6 z-40 mx-[1.5rem] my-[1.5rem] rounded-lg">
          <Link href="/" onClick={() => setOpen(false)} className="text-xl">
            Home
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="text-xl"
          >
            Dashboard
          </Link>
          <Link
            href="/ai-chatbot"
            onClick={() => setOpen(false)}
            className="text-xl"
          >
            AI Chat
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)} className="text-xl">
            Blog
          </Link>
          <Link
            href="/about-us"
            onClick={() => setOpen(false)}
            className="text-xl"
          >
            About Us
          </Link>

          <div className="mt-6">
            {status === "authenticated" && session?.user?.name ? (
              <div className="flex flex-col items-center gap-2">
                <UserIcon className="w-5 h-5 text-gray-600" />
                <span className="text-base font-semibold velqen-gradient-text">
                  {session.user.name}
                </span>
                <button
                  onClick={
                    () => signOut({ callbackUrl: "/" }) // ✅ line changed
                  }
                  className="text-sm px-4 py-2 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  signIn(undefined, { callbackUrl: window.location.href })
                }
                className="flex items-center gap-2 mt-2 px-4 py-2 rounded-md hover:bg-velqen-light-gray text-lg"
              >
                <UserIcon className="w-5 h-5 text-gray-600" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  ) : (
    <nav className="absolute top-0 left-0 z-500 flex w-full justify-center">
      <div className="w-[80%] flex items-center justify-between py-4">
        {/* Left: Site name */}
        <div className="flex-1 text-left font-bold text-2xl ">Velqen</div>
        {/* Center: Home link */}
        <div className="flex justify-center bg-white p-3 text-lg rounded-md shadow-sm border border-velqen-light-gray gap-8">
          <Link href="/" className="">
            Home
          </Link>
          <Link href="/dashboard" className="">
            Dashboard
          </Link>
          <Link href="/ai-chatbot" className="">
            AI Chat
          </Link>
          <Link href="/blog" className="">
            Blog
          </Link>
          <Link href="/about-us" className="">
            About Us
          </Link>
        </div>
        {/* Right */}
        <div className="flex-1 flex justify-end">
          {status === "authenticated" && session?.user?.name && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-medium  hover:bg-velqen-light-gray shadow"
              >
                <UserIcon className="w-5 h-5 text-gray-600" />

                {session.user.name}
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-36 rounded-md velqen-gradient-bg velqen-gradient-bg-hover shadow-lg z-20">
                  <button
                    onClick={
                      () => signOut({ callbackUrl: "/" }) // ✅ line changed
                    }
                    className="text-sm px-4 py-2 rounded text-white"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {status === "unauthenticated" && (
            <button
              onClick={() =>
                signIn(undefined, { callbackUrl: window.location.href })
              }
              className="flex items-center gap-2 mt-2 px-4 py-2 rounded-md hover:bg-velqen-light-gray text-lg"
            >
              <UserIcon className="w-5 h-5 text-gray-600" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
