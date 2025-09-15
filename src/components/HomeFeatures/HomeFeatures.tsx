// components/HomeFeatures.tsx
"use client";

import { Wallet, Layers3 } from "lucide-react";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const HomeFeatures = () => {
  const { isSmallDevice } = useDeviceSize();
  return (
    <>
      <div className="flex flex-col gap-4 max-w-[850px]">
        <h1
          className={`${
            isSmallDevice ? "text-5xl" : "text-6xl"
          } xl:text-7xl font-bold`}
        >
          Redefine Your Finance with{" "}
          <span className="velqen-gradient-text">Velqen.</span>
          {/* Try <span className="velqen-gradient-text">Velqen</span> Now */}
        </h1>

        <div className="flex flex-col gap-8 mt-12 text-left max-w-[600px]">
          <div>
            <div className="flex items-center gap-4">
              <Wallet className="w-12 h-12 flex-shrink-0" />
              <h2 className="text-2xl xl:text-3xl font-semibold">
                The Assistant
              </h2>
            </div>
            <p className="text-velqen-black text-xl ml-16 mt-1">
              Start chatting and let Velqen do the tasks for you. Just like a
              real assistant
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <Layers3 className="w-12 h-12 flex-shrink-0" />
              <h2 className="text-2xl xl:text-3xl font-semibold">
                The Translator
              </h2>
            </div>
            <p className="text-velqen-black text-xl ml-16 mt-1">
              We explain your money just like a friend would, no jargons no
              bullshit.
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${
          isSmallDevice ? "" : "min-w-[300px] max-h-[750px]"
        } flex justify-center`}
      >
        <Image
          src="/home/phone.png"
          alt="Phone UI"
          width={5000}
          height={5000}
          className="w-full h-auto object-contain"
        />
      </div>
    </>
  );
};

export default HomeFeatures;
