"use client";

import React from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import SlantingCards from "../SlantingCards/SlantingCards";
import Image from "next/image";

const features = [
  {
    title: "Financial Jargons",
    description:
      "Financial apps are full of jargon and buzzwords, but you're not here to earn a finance degree.",
  },
  {
    title: "Overwhelming Dashboards",
    description:
      "Using financial dashboards feels like flying a spaceship with messy controls and buttons everywhere.",
  },
  {
    title: "Unnecessary Features",
    description:
      "You feel like the apps are stuffing unnecessary features down your throat.",
  },
];

export default function HomePainPoints() {
  const { isSmallDevice } = useDeviceSize();

  return (
    <section className={`${isSmallDevice ? "py-12" : "py-32"} text-center`}>
      {/* Title */}
      <h2
        className={`${
          isSmallDevice ? "text-5xl" : "text-6xl"
        } xl:text-7xl text-white font-semibold my-16`}
      >
        Why Velqen
      </h2>

      {/* Features grid */}
      <div
        className={`${
          isSmallDevice
            ? "grid-cols-1 max-w-[500px]"
            : "grid-cols-2 max-w-[1300px]"
        } grid gap-6 xl:grid-cols-3 mx-auto`}
      >
        {features.map((feature, index) => (
          <div key={index} className=" p-6 hover:shadow-lg transition-all">
            <h3
              className={`${
                isSmallDevice ? "text-xl" : "text-2xl"
              } xl:text-3xl font-bold mb-6 text-white`}
            >
              {feature.title}
            </h3>
            <p
              className={`${
                isSmallDevice ? "text-lg" : "text-xl"
              } text-velqen-light-gray`}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12">{!isSmallDevice && <SlantingCards />}</div>
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
  );
}
