"use client";

import Link from "next/link";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DarkNavBar from "./DarkNavBar";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  // { name: "Velqen", href: "/velqen" },
  // { name: "AI Tools", href: "/ai-tools" },
  // { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about-us" },
];

const NavBar = () => {
  const { isSmallDevice } = useDeviceSize();
  const [open, setOpen] = useState(false);
  const { status, data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Define pages where you want DarkNavBar
  const darkPages = ["/about-us", "/velqen"];
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

  if (pathname?.startsWith("/velqen") || pathname === "/login") {
    return null;
  }
  if (darkPages.some((p) => pathname?.startsWith(p))) {
    return <DarkNavBar />;
  }
  return isSmallDevice ? (
    <nav className="absolute top-0 left-0 w-full z-500 p-4">
      <div className="flex justify-between items-center">
        {/* Site Name */}
        <div className="h-12 w-auto">
          <Link href="/">
            <Image
              src="/Velqen_no_bg_logo.png"
              alt="Velqen Logo"
              className="h-full w-auto object-contain " // ✅ Make it scale properly
              width={800}
              height={450}
            />
          </Link>
        </div>

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
        <div className="absolute top-full left-[-6px] w-[calc(100vw-0.5rem)] h-[calc(100vh-7rem)] bg-[rgba(255,255,255,0.95)] backdrop-blur-md flex flex-col items-left gap-6 py-6 px-6 z-40 mx-[0.7rem] my-[1.5rem] rounded-lg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-xl border-b border-b-velqen-light-gray pb-2"
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-10">
            {status === "authenticated" && session?.user?.name ? (
              <div className="flex flex-col items-left gap-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-base font-semibold velqen-gradient-text">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={
                    () => signOut({ callbackUrl: "/" }) // ✅ line changed
                  }
                  className="text-sm py-2 rounded self-start"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  signIn(undefined, { callbackUrl: window.location.href })
                }
                className="flex items-center gap-2 mt-2 py-2 rounded-md hover:bg-velqen-light-gray text-lg"
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
        <div className="flex-shrink-0 text-left h-14">
          <Link href="/">
            <Image
              src="/Velqen_no_bg_logo.png"
              alt="Velqen Logo"
              className="h-full w-auto object-contain" // ✅ Make it scale properly
              width={800}
              height={450}
            />
          </Link>
        </div>

        {/* Center: Home link */}
        <div className="flex justify-center bg-white p-3 text-lg rounded-md shadow-sm border border-velqen-light-gray gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-block overflow-hidden h-6"
            >
              <div className="transform group-hover:-translate-y-6 transition-transform duration-300">
                <span className="block h-6">{item.name}</span>
                <span className="block h-6">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
        {/* Right */}
        <div className="flex-shrink-0 flex justify-end w-[50px]">
          {/* {status === "authenticated" && session?.user?.name && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-medium  hover:bg-velqen-light-gray shadow"
              >
                <UserIcon className="w-5 h-5 text-gray-600" />

                {session.user.name}
                <ChevronDownIcon className="h-4 w-4 text-gray-600" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-36 rounded-md border border-velqen-orange bg-white hover:bg-velqen-light-gray shadow-lg z-20">
                  <button
                    onClick={
                      () => signOut({ callbackUrl: "/" }) // ✅ line changed
                    }
                    className="text-sm px-4 py-2 rounded text-gray-600"
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
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
