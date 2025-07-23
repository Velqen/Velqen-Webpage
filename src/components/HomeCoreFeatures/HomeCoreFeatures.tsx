"use client";

import Image from "next/image";
import React from "react";

const features = [
  {
    title: "Speak Human",
    description:
      "No buzzwords, no jargon. Velqen keeps everything in plain English so you know exactly what’s going on.",
  },
  {
    title: "Built Like a Chat App",
    description:
      "Feels like messaging a smart teammate. No messy UI, no unnecessary dashboards. Just the core interface you need.",
  },
  {
    title: "Make It Yours",
    description:
      "Start with a simple setup, then build your own tools on top. Velqen adapts to *your* way of working.",
  },
];

export default function HomeCoreFeatures() {
  return (
    <section className="py-12 text-center">
      {/* Title */}
      <h2 className="text-7xl text-white font-semibold mb-16">Why Velqen?</h2>

      {/* Features grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className=" p-6 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-velqen-light-gray">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-[800px] w-full relative rounded-xl overflow-hidden">
            <Image
              src="/home/features.png"
              alt="Velqen Agent Architecture"
              fill // ✅ fills the container based on height
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
