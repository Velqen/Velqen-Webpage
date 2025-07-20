"use client";

import React from "react";
import RecordReconciliation from "@/components/RecordReconciliation/RecordReconciliation";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const page = () => {
  const { isSmallDevice } = useDeviceSize();

  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div
        id="record-reconciliation"
        className={` ${
          isSmallDevice ? "w-[90%]" : "w-[80%]"
        }  flex flex-col justify-center items-center py-24`}
      >
        <h1
          className={` ${
            isSmallDevice ? "text-4xl" : "text-7xl"
          }  py-4  text-center`}
        >
          Record Reconciliation
        </h1>
        <p
          className={` ${
            isSmallDevice ? "text-xl pb-10" : "text-2xl pb-14"
          } text-center text-velqen-gray`}
        >
          Spot missed payments or duplicate charges automatically with AI.
        </p>
        <RecordReconciliation />
      </div>
    </div>
  );
};

export default page;
