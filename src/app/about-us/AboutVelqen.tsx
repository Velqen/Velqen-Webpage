"use client";

import React from "react";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import aboutUsText from "@/data/aboutUsText";

const AboutVelqen = () => {
  const { isSmallDevice } = useDeviceSize();

  return isSmallDevice ? (
    <div className="flex justify-center min-h-screen relative font-(family-name:--font-merriweather) my-10">
      <div className="flex flex-col items-center w-[80%]">
        <div className="relative mt-20 h-[300px] w-[300px]">
          <Image
            src="/about-us/bubble_no_bg.png"
            alt="About Us"
            fill
            className="rounded-xl object-cover"
            style={{ zIndex: 0 }}
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 velqen-gradient-text text-8xl whitespace-nowrap z-10">
            {aboutUsText.title}
          </h1>
        </div>

        <div className="flex flex-col max-w-[600px] text-lg leading-relaxed text-black mt-12 space-y-8">
          {aboutUsText.description.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center min-h-screen relative font-(family-name:--font-merriweather) my-16 ">
      <div className="flex flex-col items-center w-[80%]">
        <div className="relative mt-20">
          <Image
            src="/about-us/bubble_no_bg.png"
            alt="About Us"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <h1 className="absolute top-24 left-1/2 transform -translate-x-1/2 velqen-gradient-text text-[140px] whitespace-nowrap overflow-visible">
            {aboutUsText.title}
          </h1>
        </div>
        <div className="flex flex-col max-w-[600px] text-xl leading-relaxed text-black mt-12 space-y-8">
          {aboutUsText.description.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutVelqen;
