"use client";

import React, { useState } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import TransactionClassification from "@/components/TransactionClassification/TransactionClassification";

const Page = () => {
  const { isSmallDevice } = useDeviceSize();
  const [, setClassifiedCsv] = useState<string[][]>([]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        id="transaction-classification"
        className={` ${
          isSmallDevice ? "w-[90%]" : "w-[80%]"
        }  flex flex-col justify-center items-center py-24`}
      >
        <h1
          className={` ${
            isSmallDevice ? "text-4xl" : "text-7xl"
          }  py-4  text-center`}
        >
          Transaction Classification
        </h1>
        <p
          className={` ${
            isSmallDevice ? "text-xl pb-10" : "text-2xl pb-14"
          } text-center text-velqen-gray`}
        >
          Understand where your money&#39;s going using AI.
        </p>
        <TransactionClassification
          onCsvParsed={(data) => {
            setClassifiedCsv(data);
          }}
        />
      </div>
    </div>
  );
};

export default Page;
