"use client";

import React from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import SlantingCards from "../../../components/SlantingCards/SlantingCards";
import Particles from "../../../components/Animations/Particles";
import { Lightbulb, Target, Rocket } from "lucide-react";
const features = [
  {
    title: "Financial Jargons",
    description:
      "Financial apps are full of jargon and buzzwords, and you feel lost in translation.",
    Icon: Lightbulb, // ✅ Use imported icon
  },
  {
    title: "Overwhelming Dashboards",
    description:
      "It feels like flying a spaceship with buttons and controls everywhere.",
    Icon: Rocket, // ✅ Use imported icon
  },
  {
    title: "Unnecessary Features",
    description:
      "You feel like the apps are stuffing unnecessary features down your throat.",
    Icon: Target, // ✅ Use imported icon
  },
];

export default function HomePainPoints() {
  const { isSmallDevice } = useDeviceSize();

  return (
    <>
      <div
        style={{
          width: "100%",
          height: isSmallDevice ? "1000px" : "1100px",
          position: "relative",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={1000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />{" "}
      </div>{" "}
      <section
        className={`${
          isSmallDevice ? "py-12 text-start" : "py-32 text-center"
        }  absolute left-1/2 transform -translate-x-1/2 pointer-events-none w-full`}
      >
        {/* Title */}
        <h2
          className={`${
            isSmallDevice ? "text-5xl" : "text-6xl mb-24"
          } xl:text-7xl text-white font-semibold  p-8`}
        >
          Why Velqen
        </h2>
        {/* Features grid */}
        <div
          className={`${
            isSmallDevice ? "grid-cols-1 " : "grid-cols-2 max-w-[1500px]"
          } grid xl:grid-cols-3 mx-auto`}
        >
          {" "}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`m-8 text-left flex flex-col items-start pt-8
              ${
                !isSmallDevice && index !== 0
                  ? "border-l border-gray-700  pl-10" // ✅ vertical line for desktop
                  : ""
              } 
              ${
                isSmallDevice
                  ? "border-t border-gray-700" // ✅ horizontal line for mobile
                  : " gap-8"
              }`}
            >
              <feature.Icon className="w-10 h-10 text-white mb-4 md:mb-14" />
              <h3 className="text-2xl xl:text-3xl  text-white">
                {feature.title}
              </h3>
              <p className="text-velqen-light-gray text-lg xl:text-xl">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="mt-12">{!isSmallDevice && <SlantingCards />}</div> */}
        {/* <div className="mt-12">
          <div className="max-w-[1300px] mx-auto px-4">
            <div
              className={`${
                isSmallDevice ? "" : ""
              } w-full relative rounded-xl overflow-hidden`}
            >
              <Image
                src="/home/Frame 1.png"
                alt="Velqen Agent Architecture"
                className="w-full h-auto object-contain"
                width={8000} // or any value that matches the max display width
                height={8000} // height will be auto due to h-auto
              />
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
}
