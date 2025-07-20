// components/HomeProductDesc.tsx
"use client";

import { Feather, BrainCircuit } from "lucide-react";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const HomeProductDesc = () => {
  const { isSmallDevice } = useDeviceSize();
  return (
    <>
      <div
        className={`${
          isSmallDevice ? "w-full" : "h-[850px] pr-16"
        } flex justify-center`}
      >
        <Image
          src="/assets/phone2.2.png"
          alt="Phone UI"
          width={5000}
          height={5000}
          className="object-contain w-auto"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className={`${isSmallDevice ? "text-4xl" : "text-7xl"} font-bold`}>
          Try <span className="velqen-gradient-text">Velqen</span> Now
        </h1>

        <div className="flex flex-col gap-8 mt-12 text-left max-w-[600px]">
          {/* Simplicity */}
          <div>
            <div className="flex items-center gap-4">
              <Feather className="w-12 h-12 flex-shrink-0" />
              <h2 className="text-3xl font-semibold">
                Your One True Finance Assistant
              </h2>
            </div>
            <p className="text-velqen-gray text-xl ml-16 mt-1">
              Say goodbye to clunky dashboards & features you'll never touch.
              Just talk and our chatbot handles the rest.
            </p>
          </div>

          {/* AI Intelligence */}
          <div>
            <div className="flex items-center gap-4">
              <BrainCircuit className="w-12 h-12 flex-shrink-0" />
              <h2 className="text-3xl font-semibold">All in One AI</h2>
            </div>
            <p className="text-velqen-gray text-xl ml-16 mt-1">
              Access the latest AI automation & tools, all in one place.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeProductDesc;
