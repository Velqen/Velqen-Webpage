"use client";

import React from "react";
import TransactionEditor from "../components/TransactionEditor/TransactionEditor";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const Transactions = () => {
  const { isSmallDevice } = useDeviceSize();

  return (
    <div className={` ${isSmallDevice ? "pt-14 " : ""} p-6 px-10`}>
      <div className="text-4xl mb-8 ">Editor</div>
      <TransactionEditor />
    </div>
  );
};

export default Transactions;
