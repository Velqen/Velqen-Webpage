"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const FadingGrid = dynamic(() => import("../FadingGrid/FadingGrid"), {
  ssr: false, // ✅ Prevent hydration mismatch
});

const HomeBanner = () => {
  return (
    <div className="relative h-[100dvh] text-black flex items-center justify-center overflow-hidden w-full bg-[var(--background)]">
      {/* Background Grid */}
      <FadingGrid displayCols={51} displayRows={25} />

      {/* Foreground Content */}
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-5xl md:text-7xl font-bold">
          <span className="">Simplicity</span> is Everything
        </h1>

        <p className="text-2xl md:text-4xl max-w-[1000px] text-velqen-gray">
          AI Financial Assistant in your Pocket
        </p>
        <Link href="/dashboard">
          <button className="group inline-block overflow-hidden h-[48px] w-[200px] relative rounded">
            <div className="absolute inset-0 transform group-hover:-translate-y-12 transition-transform duration-300">
              <span className="h-[48px] bg-black text-white px-6 py-2 text-lg md:text-2xl flex items-center justify-center">
                Dashboard
              </span>
              <span className="h-[48px] velqen-gradient-vertical-bg text-black px-6 py-2 text-lg md:text-2xl flex items-center justify-center">
                Dashboard
              </span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
