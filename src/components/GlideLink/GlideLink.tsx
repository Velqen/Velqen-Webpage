import React from "react";
import Image from "next/image";

const GlideLink = () => {
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
    <div className="mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 - How to design a website */}
        <div
          className="bg-bennett-light-gray rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-6 transition-all duration-300 ease-in-out"
          onClick={() => scrollToSection("transaction-classification")}
        >
          <Image
            src="/assets/csv_link.png"
            alt="Website design mockup"
            className="object-cover w-[500px] h-[300px] rounded-lg" // ✅ Fixed units
            width={3000}
            height={3000}
          />

          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              AI Transaction Classification
            </h3>
            <p className="text-bennett-gray">👉 Click to Try</p>
          </div>
        </div>

        {/* Card 2 - How to monetize your website */}
        <div
          className="bg-bennett-light-gray rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-6 transition-all duration-300 ease-in-out"
          onClick={() => scrollToSection("invoice-extraction")}
        >
          <Image
            src="/assets/invoice_link.png"
            alt="Website monetization interface"
            className="object-cover w-[500px] h-[300px] rounded-lg" // ✅ Fixed units
            width={3000}
            height={3000}
          />

          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              OCR Invoice Extraction
            </h3>
            <p className="text-bennett-gray">👉 Click to Try</p>
          </div>
        </div>

        {/* Card 3 - Wix website examples */}
        <div
          className="bg-bennett-light-gray rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-6 transition-all duration-300 ease-in-out"
          onClick={() => scrollToSection("record-reconciliation")}
        >
          <Image
            src="/assets/reconciler_link.png"
            alt="Wix website examples"
            className="object-cover w-[500px] h-[300px] rounded-lg" // ✅ Fixed units
            width={3000}
            height={3000}
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              AI Record Reconciliation
            </h3>
            <p className="text-bennett-gray">👉 Click to Try</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlideLink;
