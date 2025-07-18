"use client";

import HomeBanner from "@/components/HomeBanner/HomeBanner";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import Image from "next/image";

export default function Home() {
  const { isSmallDevice } = useDeviceSize();

  return (
    <div
      className={`${
        isSmallDevice ? "" : "pt-12"
      } min-h-screen w-full flex flex-col justify-center items-center`}
    >
      <HomeBanner />
      <div
        className={`${
          isSmallDevice
            ? "w-[90%] flex-col justify-center items-center"
            : "w-[80%] flex-row items-center justify-center"
        } flex `}
      >
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
        <h1 className={`${isSmallDevice ? "text-4xl" : "text-6xl"} font-bold`}>
          Try <span className=" velqen-gradient-text">Velqen</span> Now
        </h1>
      </div>
    </div>
  );
  // <div className="min-h-screen w-full flex flex-col justify-center items-center">
  //   <HomeBanner />

  //   <div className="w-full h-[850px] flex items-center justify-center py-16">
  //     <div className="w-[80%] flex flex-row items-center justify-between">
  //       <div className="flex justify-center mx-10 h-[1000px]">
  //         <Image
  //           src="/assets/phone2.2.png"
  //           alt="Phone UI"
  //           width={5000}
  //           height={5000}
  //           className="object-contain w-auto"
  //         />
  //       </div>

  //       <div className="flex flex-col justify-center items-start text-black pl-8">
  //         <h1 className="text-6xl font-bold leading-tight">
  //           Pick Your <span className="velqen-gradient-text">AI</span> Tool
  //         </h1>
  //       </div>
  //     </div>
  //   </div>
  // </div>
}
