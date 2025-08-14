"use client";

import React from "react";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useRouter, usePathname } from "next/navigation";

const GlideLink = () => {
  const { isSmallDevice } = useDeviceSize();

  const router = useRouter();
  const pathname = usePathname();
  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

  return (
    <div className="mx-auto py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Card 1 - OCR Invoice Extraction */}
        <div
          className=" rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-6 transition-all duration-300 ease-in-out"
          onClick={() => router.push(`${pathname}/doc-extraction`)}
        >
          <div
            className={`relative w-full ${
              isSmallDevice ? "h-[250px]" : "h-[240px]"
            }`}
          >
            <Image
              src="/ai-tools/invoice_link.png"
              alt="OCR Invoice Extraction"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="p-6">
            <h3 className="text-2xl text-gray-900 mb-2">Invoice Extraction</h3>
            <p className="text-velqen-gray flex items-center gap-2">
              {/* <Rocket className="w-4 h-4" /> Try it now */}
            </p>
          </div>
        </div>

        {/* Card 2 - AI Transaction Classification */}
        <div
          className=" rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-6 transition-all duration-300 ease-in-out"
          onClick={() => router.push(`${pathname}/doc-classification`)}
        >
          <div
            className={`relative w-full ${
              isSmallDevice ? "h-[250px]" : "h-[240px]"
            }`}
          >
            <Image
              src="/ai-tools/csv_link2.jpg"
              alt="AI Transaction Classification"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="p-6">
            <h3 className="text-2xl text-gray-900 mb-2">
              Transaction Classification
            </h3>
            <p className="text-velqen-gray flex items-center gap-2">
              {/* <Rocket className="w-4 h-4" /> Try it now */}
            </p>
          </div>
        </div>

        {/* Card 3 - AI Record Reconciliation */}
        <div
          className=" rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-6 transition-all duration-300 ease-in-out"
          onClick={() => router.push(`${pathname}/doc-reconciliation`)}
        >
          <div
            className={`relative w-full ${
              isSmallDevice ? "h-[250px]" : "h-[240px]"
            }`}
          >
            <Image
              src="/ai-tools/reconciler_link.png"
              alt="AI Record Reconciliation"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="p-6">
            <h3 className="text-2xl text-gray-900 mb-2">Invoice Genrator</h3>
            <p className="text-velqen-gray flex items-center gap-2">
              {/* <Rocket className="w-4 h-4" /> Try it now */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlideLink;
