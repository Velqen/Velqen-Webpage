"use client";

import Link from "next/link";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Velqen", href: "/velqen" },
  { name: "AI Tools", href: "/ai-tools" },
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about-us" },
];

const DarkNavBar = () => {
  const { isSmallDevice } = useDeviceSize();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Define pages where you want DarkNavBar

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

  return isSmallDevice ? (
    <nav className="absolute top-0 left-0 w-full z-500 p-4">
      <div className="flex justify-between items-center">
        {/* Site Name */}
        <div className="h-12 w-auto">
          <Link href="/">
            <Image
              src="/Velqen_no_bg_logo.png"
              alt="Velqen Logo"
              className="h-full w-auto object-contain"
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
              className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Dropdown menu below navbar */}
      {open && (
        <div className="absolute top-full left-[-6px] w-[calc(100vw-0.5rem)] h-[calc(100vh-7rem)] bg-[rgba(255,255,255,0.1)] backdrop-blur-md flex flex-col items-left gap-6 py-6 px-6 z-40 mx-[0.7rem] my-[1.5rem] rounded-lg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-xl text-white border-b border-white/20 pb-2"
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-10">{/* Optional login/profile buttons */}</div>
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
              className="h-full w-auto object-contain"
              width={800}
              height={450}
            />
          </Link>
        </div>

        {/* Center: Home link */}
        <div className="flex justify-center bg-[rgba(255,255,255,0.1)] backdrop-blur-md p-3 text-lg rounded-md  gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-block overflow-hidden h-6 text-white"
            >
              <div className="transform group-hover:-translate-y-6 transition-transform duration-300">
                <span className="block h-6">{item.name}</span>
                <span className="block h-6">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
        {/* Right */}
        <div className="flex-shrink-0 flex justify-end w-[50px]"></div>
      </div>
    </nav>
  );
};

export default DarkNavBar;
