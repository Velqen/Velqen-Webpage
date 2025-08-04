"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReportGenerator = dynamic(
  () => import("../ReportGenerator/ReportGenerator").then((mod) => mod.default),
  { ssr: false }
);

import { ReportGeneratorHandle } from "../ReportGenerator/ReportGenerator";
import { useDeviceSize } from "@/hooks/useDeviceSize";

type Props = {
  csvData: string[][];
};

const ReportSection = ({ csvData }: Props) => {
  const reportRef = useRef<ReportGeneratorHandle>(null);
  const { isSmallDevice } = useDeviceSize();
  const [clicked, setClicked] = useState(false);

  const handleDownloadClick = () => {
    setClicked(true);
    if (csvData.length > 0) {
      reportRef.current?.generatePDF();
    }
  };
  return (
    <section className="w-full">
      <div className="w-full">
        <div
          className={`${
            isSmallDevice ? "gap-6" : "gap-20"
          } flex flex-col md:flex-row justify-between items-center w-full`}
        >
          {/* Left side: Heading & Button */}
          <div className="md:w-1/3 text-center md:text-left">
            <h2 className="text-4xl font-bold text-black mb-4">
              Generate Your Financial Report
            </h2>
            <p className="text-lg text-velqen-gray mb-6">
              Create a professional summary of your assets & liabilities in one
              click.
            </p>

            <div>
              <button
                onClick={handleDownloadClick}
                className="px-6 py-2 bg-velqen-green text-white rounded-md hover:bg-velqen-green-hover transition"
              >
                Download PDF
              </button>

              {clicked && csvData.length === 0 && (
                <p className="mt-2 text-sm">
                  Please classify your transactions first.
                </p>
              )}

              {csvData.length > 0 && <ReportGenerator ref={reportRef} />}
            </div>
          </div>

          <div className={` relative w-full md:w-2/ flex items-center`}>
            <Image
              src="/assets/report.jpg"
              alt="Financial Report"
              width={1600}
              height={1000}
              className="object-contain border-4 border-velqen-gray rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
