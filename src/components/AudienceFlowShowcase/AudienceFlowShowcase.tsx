"use client";

import { useEffect, useRef, useState } from "react";
import { audienceFlowSteps } from "@/data/audienceFlowSteps"; // ✅ import here
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function AudienceFlowShowcase() {
  const { isSmallDevice } = useDeviceSize();

  const steps = audienceFlowSteps; // ✅ call directly here

  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return isSmallDevice ? (
    <>
      <div className="flex w-full text-center justify-center items-center mt-44 text-5xl font-bold">
        The Perfect Solution
      </div>
      <div className="mx-auto py-20 px-6 space-y-28">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Image */}
            <div className="w-full mb-5">
              <Image
                src={step.image}
                alt={step.title}
                className="w-full h-auto object-contain"
                width={800} // or any value that matches the max display width
                height={0} // height will be auto due to h-auto
              />
            </div>
            {/* Text content */}
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 text-xl">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      <div className="flex w-full justify-center items-center text-center mt-44 text-6xl xl:text-7xl font-bold">
        <div className="max-w-[700px] xl:max-w-[850px]">
          Crafted with <span className="velqen-gradient-text">Simpllicity</span>
          , Made for You
        </div>
      </div>
      <div className="flex flex-row w-9xl mx-auto gap-8 px-4 xl:px-28">
        {/* Sticky Image Side */}
        <div className="w-[60%] h-screen sticky top-0 flex items-center justify-center">
          <div className="relative w-full xl:w-[90%] h-full">
            {/* ✅ Set height for Image */}
            <Image
              src={steps[activeIndex].image}
              alt={steps[activeIndex].title}
              fill // ✅ Makes the image fill the parent div
              className="object-contain transition-all duration-500 ease-in-out"
              priority
            />
          </div>
        </div>

        {/* Scrollable Steps */}
        <div className="w-[50%] flex flex-col pl-2 xl:pl-12">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-index={i}
              className="space-y-4 min-h-screen flex flex-col justify-center py-20 w-[85%]"
            >
              <h3 className="text-5xl xl:text-6xl font-semibold">
                {step.title}
              </h3>
              <p className="text-gray-600 text-2xl">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
