"use client";

import React, { useState } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";

const page = () => {
  const { isSmallDevice } = useDeviceSize();
  const [, setInvoiceCsv] = useState<string[][]>([]);
  return (
    <div className=" w-full flex flex-col justify-center items-center mt-32">
      <div
        id="invoice-extraction"
        className={` ${
          isSmallDevice ? "w-[90%]" : "w-[80%]"
        }  flex flex-col justify-center items-center py-24`}
      >
        <h1
          className={` ${
            isSmallDevice ? "text-4xl" : "text-7xl"
          }  py-4  text-center`}
        >
          Invoice Extraction
        </h1>
        <p
          className={` ${
            isSmallDevice ? "text-xl pb-10" : "text-2xl pb-14"
          } text-center text-velqen-gray `}
        >
          Use AI to pull key details from invoices.
        </p>
        <InvoiceExtraction
          onExtractedRecords={(records) => {
            const csvFormat = records.map((r) => Object.values(r).map(String));
            setInvoiceCsv(csvFormat);
          }}
        />
      </div>
    </div>
  );
};

export default page;
