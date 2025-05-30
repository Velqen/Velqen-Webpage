"use client";

import React from "react";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import aboutUsText from "@/data/aboutUsText";

const Page = () => {
  const { isSmallDevice } = useDeviceSize();

  return isSmallDevice ? (
    <div className="flex justify-center min-h-screen relative font-(family-name:--font-merriweather) mt-10">
      <div className="flex flex-col items-center w-[80%]">
        <div className="relative mt-20">
          <Image
            src="/bubble_no_bg.png"
            alt="About Us"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <h1
            className="absolute top-32 left-1/2 transform -translate-x-1/2 bennett-gradient-text text-7xl whitespace-nowrap
                        overflow-visible"
          >
            {aboutUsText.title}
          </h1>
        </div>
        <div className="flex flex-col max-w-[600px] text-lg leading-relaxed text-bennett-gray mt-12 space-y-8">
          {aboutUsText.description.map((text, idx) => (
            <p key={idx}>{text}</p> // line changed to dynamically render
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center min-h-screen relative font-(family-name:--font-merriweather) mt-16">
      <div className="flex flex-col items-center w-[80%]">
        <div className="relative mt-20">
          <Image
            src="/bubble_no_bg.png"
            alt="About Us"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <h1
            className="absolute top-32 left-1/2 transform -translate-x-1/2 bennett-gradient-text text-9xl whitespace-nowrap
                       overflow-visible"
          >
            {aboutUsText.title}
          </h1>
        </div>
        <div className="flex flex-col max-w-[600px] text-lg leading-relaxed text-bennett-gray mt-12 space-y-8">
          {aboutUsText.description.map((text, idx) => (
            <p key={idx}>{text}</p> // line changed to dynamically render
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
