"use client";

import React from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import SlantingCards from "../SlantingCards/SlantingCards";

const features = [
  {
    title: "Speak Human",
    description:
      "No buzzwords, no jargon. Simple explanation beats complicated report every time.",
  },
  {
    title: "One click, peace of mind",
    description:
      "Your finances can finally work quietly under the hood without pushing tons of buttons.",
  },
  {
    title: "Make It Yours",
    description:
      "Forget one-size-fits-all. Shape the AI to match your exact workflow.",
  },
];

export default function HomeCoreFeatures() {
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
              } xl:text-3xl font-bold mb-2 text-white`}
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
              src="/home/features.png"
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
