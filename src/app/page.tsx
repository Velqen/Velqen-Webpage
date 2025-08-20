"use client";

import AudienceFlowShowcase from "@/components/AudienceFlowShowcase/AudienceFlowShowcase";
import FloatingLogos from "@/components/FloatingLogos/FloatingLogos";
import HomeBanner from "@/components/HomeBanner/HomeBanner";
import HomeCoreFeatures from "@/components/HomeCoreFeatures/HomeCoreFeatures";
import HomePainPoint from "@/components/HomePainPoint/HomePainPoint";
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
            ? "w-[90%] flex-col justify-center items-center"
            : "w-[80%] flex-row items-center justify-center"
        } flex `}
      >
        <HomePainPoint />
      </div>
      {/* <div
        className={`${
          isSmallDevice
            ? "justify-center items-center"
            : "items-center justify-center mt-32"
        } w-full flex bg-velqen-black`}
      >
        <HomeCoreFeatures />
      </div>

      <div className="w-full">
        <AudienceFlowShowcase />
      </div> */}
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
