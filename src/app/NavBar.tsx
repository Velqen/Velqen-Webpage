"use client";

import Link from "next/link";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useEffect, useState } from "react";
const NavBar = () => {
  const { isSmallDevice } = useDeviceSize();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return isSmallDevice ? (
    <nav className="absolute top-0 left-0 w-full z-500 p-4">
      <div className="flex justify-between items-center">
        {/* Site Name */}
        <div className="font-bold text-2xl">Bennett</div>

        {/* Hamburger Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="z-60"
        >
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-6 bg-gray-800 transition-transform duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-gray-800 transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-gray-800 transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Dropdown menu below navbar */}
      {open && (
        <div className="absolute top-full left-0 w-[calc(100vw-3rem)] h-[calc(100vh-7rem)] bg-[rgba(128,128,128,0.08)] backdrop-blur-md flex flex-col items-center gap-6 py-6 z-40 mx-[1.5rem] my-[1.5rem] rounded-lg">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="bennett-gradient-text text-xl"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            onClick={() => setOpen(false)}
            className="bennett-gradient-text text-xl"
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  ) : (
    <nav className="z-500 flex w-full justify-center">
      <div className="w-[80%] flex items-center justify-between py-4">
        {/* Left: Site name */}
        <div className="flex-1 text-left font-bold text-2xl ">Bennett</div>
        {/* Center: Home link */}
        <div className="flex justify-center bg-gray-50 p-3 text-lg rounded-md shadow-sm border border-gray-100 gap-8">
          <Link href="/" className="bennett-gradient-text">
            Home
          </Link>
          <Link href="/about-us" className="bennett-gradient-text">
            About Us
          </Link>
        </div>
        {/* Right: Empty to balance */}
        <div className="flex-1"></div>
      </div>
    </nav>
  );
};

export default NavBar;
