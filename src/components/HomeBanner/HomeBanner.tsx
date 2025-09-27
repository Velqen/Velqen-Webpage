"use client";

import React from "react";
import dynamic from "next/dynamic";

// import WaitingListPage from "@/app/_components/WaitingList";
import { useDeviceSize } from "@/hooks/useDeviceSize";
// import Link from "next/link";
import RotatingText from "../Animations/RotatingText";
import WaitingListPage from "@/app/_components/WaitingList";

const FadingGrid = dynamic(() => import("../FadingGrid/FadingGrid"), {
  ssr: false, // ✅ Prevent hydration mismatch
});

const HomeBanner = () => {
  const { isSmallDevice } = useDeviceSize();

  return (
    <div className="relative h-[100dvh] text-black flex items-center justify-center overflow-hidden w-full bg-[var(--background)]">
      {/* Background Grid */}
      <FadingGrid displayCols={51} displayRows={25} />

      {/* Foreground Content */}
      <div className="relative z-10 text-center space-y-6 px-4 velqen">
        <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold  mb-10">
          <span className="md:inline-block md:mr-8">
            {" "}
            <RotatingText
              texts={["Simplicity", "Jargonless", "Cool", "Velqen"]}
              mainClassName="px-2 sm:px-2 md:px-3  text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />{" "}
          </span>
          is Everything
        </h1>

        <p className="text-3xl xl:text-4xl max-w-[1000px] text-velqen-gray">
          You don&#39;t need a degree to understand Finance
        </p>
        <WaitingListPage />
        {/* <div
          className={`${
            isSmallDevice
              ? "flex-col space-y-2"
              : "flex-row justify-center space-x-8"
          } flex`}
        >
          <Link href="/velqen">
            <button className="group inline-block overflow-hidden h-[46px] xl:h-[52px] w-[180px] xl:w-[200px] relative rounded">
              <div className="absolute inset-0 transform group-hover:-translate-y-full transition-transform duration-300 text-xl xl:text-2xl">
                <span className="h-full bg-black text-white px-6 py-2 flex items-center justify-center">
                  Get Started
                </span>
                <span className="h-full velqen-gradient-vertical-bg text-black px-6 py-2 flex items-center justify-center">
                  Get Started
                </span>
              </div>
            </button>
          </Link>
          <Link href="/ai-tools">
            <button className="group inline-block overflow-hidden h-[46px] xl:h-[52px] w-[180px] xl:w-[200px] relative rounded">
              <div className="absolute inset-0 transform group-hover:-translate-y-full transition-transform duration-300 text-xl xl:text-2xl">
                <span className="h-full bg-white border text-black px-6 py-2 flex items-center justify-center">
                  Free AI Tools
                </span>
                <span className="h-full velqen-gradient-vertical-bg text-black px-6 py-2 flex items-center justify-center">
                  Free AI Tools
                </span>
              </div>
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default HomeBanner;
