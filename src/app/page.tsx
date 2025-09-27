"use client";

import AudienceFlowShowcase from "@/components/AudienceFlowShowcase/AudienceFlowShowcase";
import HomeBanner from "@/components/HomeBanner/HomeBanner";
import HomeFeatures from "@/components/HomeFeatures/HomeFeatures";
import HomePainPoints from "@/components/HomePainPoints/HomePainPoints";
import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function Home() {
  const { isSmallDevice } = useDeviceSize();

  return (
    <div
      className={`${
        isSmallDevice ? "" : "pt-12"
      } min-h-screen w-full flex flex-col justify-center items-center`}
    >
      <HomeBanner />
      {/* <FloatingLogos /> */}
      <div
        className={`${
          isSmallDevice
            ? "justify-center items-center"
            : "items-center justify-center"
        } w-full flex bg-black relative min-h-[180dvh]`}
      >
        <HomePainPoints />
      </div>
      <div
        className={`${
          isSmallDevice
            ? "w-[90%] flex-col justify-center items-center"
            : "w-[80%] flex-row items-center justify-center"
        } flex  mt-32`}
      >
        <HomeFeatures />
      </div>

      <div className="w-full">
        <AudienceFlowShowcase />
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
