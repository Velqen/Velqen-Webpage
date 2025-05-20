"use client";

import React from "react";
import Image from "next/image";

const Page = () => {
  return (
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
            className="absolute top-32 left-1/2 transform -translate-x-1/2 bennett-gradient-text text-9xl whitespace-nowrap
    overflow-visible"
          >
            Bennett
          </h1>
        </div>
        <div className="flex flex-col max-w-[600px] text-lg leading-relaxed text-bennett-gray mt-12 space-y-8">
          <p>
            Bennett is an AI assistant that handles your accounting chores,
            freeing you to focus on what truly matters.
          </p>
          <p>
            Just as AI was originally created to bridge the gap between humans
            and countless tasks, Bennett’s mission is to make finance and
            accounting accessible and effortless for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
