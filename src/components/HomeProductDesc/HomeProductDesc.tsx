// components/HomeProductDesc.tsx
"use client";

import { Wallet, Layers3 } from "lucide-react";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const HomeProductDesc = () => {
  const { isSmallDevice } = useDeviceSize();
  return (
    <>
      <div className="flex flex-col gap-4 max-w-[850px]">
        <h1
          className={`${
            isSmallDevice ? "text-5xl" : "text-6xl"
          } xl:text-7xl font-bold`}
        >
          Redefining Your Assistant with{" "}
          <span className="velqen-gradient-text">Velqen.</span>
          {/* Try <span className="velqen-gradient-text">Velqen</span> Now */}
        </h1>

        <div className="flex flex-col gap-8 mt-12 text-left max-w-[600px]">
          {/* Simplicity */}
          <div>
            <div className="flex items-center gap-4">
              <Wallet className="w-12 h-12 flex-shrink-0" />
              <h2 className="text-2xl xl:text-3xl font-semibold">
                Your One True Finance Assistant
              </h2>
            </div>
            <p className="text-velqen-black text-xl ml-16 mt-1">
              Say goodbye to clunky dashboards & features you&#39;ll never
              touch.
            </p>
          </div>

          {/* AI Intelligence */}
          <div>
            <div className="flex items-center gap-4">
              <Layers3 className="w-12 h-12 flex-shrink-0" />
              <h2 className="text-2xl xl:text-3xl font-semibold">
                All in One AI
              </h2>
            </div>
            <p className="text-velqen-black text-xl ml-16 mt-1">
              Access the latest AI automation & tools, all in one place.
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${
          isSmallDevice ? "" : "min-w-[300px]"
        } flex justify-center`}
      >
        <Image
          src="/assets/phone2.2.png"
          alt="Phone UI"
          width={5000}
          height={5000}
          className="w-full h-auto object-contain"
        />
      </div>
    </>
  );
};

export default HomeProductDesc;
