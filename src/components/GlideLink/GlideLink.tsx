import React from "react";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { Rocket } from "lucide-react";

const GlideLink = () => {
  const { isSmallDevice } = useDeviceSize();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="mx-auto py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Card 1 - OCR Invoice Extraction */}
        <div
          className=" rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-6 transition-all duration-300 ease-in-out"
          onClick={() => scrollToSection("invoice-extraction")}
        >
          <div
            className={`relative w-full ${
              isSmallDevice ? "h-[250px]" : "h-[240px]"
            }`}
          >
            <Image
              src="/assets/invoice_link.png"
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
          onClick={() => scrollToSection("transaction-classification")}
        >
          <div
            className={`relative w-full ${
              isSmallDevice ? "h-[250px]" : "h-[240px]"
            }`}
          >
            <Image
              src="/assets/csv_link2.jpg"
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
          onClick={() => scrollToSection("record-reconciliation")}
        >
          <div
            className={`relative w-full ${
              isSmallDevice ? "h-[250px]" : "h-[240px]"
            }`}
          >
            <Image
              src="/assets/reconciler_link.png"
              alt="AI Record Reconciliation"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="p-6">
            <h3 className="text-2xl text-gray-900 mb-2">
              Record Reconciliation
            </h3>
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
