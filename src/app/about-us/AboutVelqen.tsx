"use client";

import React from "react";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import aboutUsText from "@/data/aboutUsText";
import Orb from "@/components/BGAnimations/Orb";

const AboutVelqen = () => {
  const { isSmallDevice } = useDeviceSize();

  return isSmallDevice ? (
    <div className="flex justify-center min-h-screen relative font-(family-name:--font-merriweather) py-10">
      <div className="flex flex-col items-center w-[80%]">
        {" "}
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Orb
            hoverIntensity={1.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl whitespace-nowrap z-10 ">
            {aboutUsText.title}
          </h1>
        </div>{" "}
        <div className="flex flex-col max-w-[600px] text-lg leading-relaxed text-white mt-12 space-y-8">
          {aboutUsText.description.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center min-h-screen relative font-(family-name:--font-merriweather) py-16 ">
      <div className="flex flex-col items-center w-[80%]">
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Orb
            hoverIntensity={1.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>{" "}
        <h1 className="absolute top-64 left-1/2 transform -translate-x-1/2 text-white text-[140px] whitespace-nowrap overflow-visible pointer-events-none">
          {aboutUsText.title}
        </h1>
        <div className="relative "></div>
        <div className="flex flex-col max-w-[600px] text-xl leading-relaxed text-white mt-12 space-y-8">
          {aboutUsText.description.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutVelqen;
