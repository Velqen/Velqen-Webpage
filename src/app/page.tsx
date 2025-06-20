"use client";

import GlideLink from "@/components/GlideLink/GlideLink";
import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";
import RecordReconciliation from "@/components/RecordReconciliation/RecordReconciliation";
import ReportGenerator from "@/components/ReportSection/ReportSection";
import TransactionClassification from "@/components/TransactionClassification/TransactionClassification";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useState } from "react";

export default function Home() {
  const { isSmallDevice } = useDeviceSize();
  const [csvFromChild, setCsvFromChild] = useState<string[][]>([]);

  const handleCsvParsed = (data: string[][]) => {
    console.log("✅ Received CSV from TransactionClassification:", data);
    setCsvFromChild(data); // store it in state if needed
  };

  return isSmallDevice ? (
    <div className="min-h-screen w-full flex flex-col justify-center items-center pt-24">
      <div className="w-[90%] flex flex-col justify-center items-center">
        <h1 className="text-4xl py-4 font-bold">
          Pick Your <span className=" velqen-gradient-text">AI</span> Tool
        </h1>
        <GlideLink />
      </div>

      <div className="bg-background-sec w-full flex flex-col justify-center items-center mt-16">
        <div
          id="invoice-extraction"
          className="w-[90%] flex flex-col justify-center items-center py-24"
        >
          <h1 className="text-4xl py-4  text-center">Invoice Extraction</h1>
          <p className="text-center text-xl text-velqen-gray pb-10">
            Use AI to pull key details from invoices.
          </p>
          <InvoiceExtraction />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div
          id="transaction-classification"
          className="w-[90%] flex flex-col justify-center items-center py-24"
        >
          <h1 className="text-4xl py-4  text-center">
            Transaction Classification
          </h1>
          <p className="text-center text-xl text-velqen-gray pb-10">
            Understand where your money&#39;s going using AI.
          </p>
          <TransactionClassification onCsvParsed={handleCsvParsed} />
        </div>
      </div>

      <div className="bg-background-sec w-full flex flex-col justify-center items-center">
        <div
          id="record-reconciliation"
          className="w-[90%] flex flex-col justify-center items-center py-24"
        >
          <h1 className="text-4xl py-4  text-center">Record Reconciliation</h1>
          <p className="text-center text-xl text-velqen-gray pb-10">
            Spot missed payments or duplicate charges automatically with AI.
          </p>
          <RecordReconciliation />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div
          id="record-reconciliation"
          className="w-[90%] flex flex-col justify-center items-center py-24"
        >
          <ReportGenerator csvData={csvFromChild} />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col justify-center items-center pt-44">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <h1 className="text-7xl py-4 font-bold">
          Pick Your <span className=" velqen-gradient-text">AI</span> Tool
        </h1>
        <GlideLink />
      </div>

      <div className="bg-background-sec w-full flex flex-col justify-center items-center mt-32">
        <div
          id="invoice-extraction"
          className="w-[80%] flex flex-col justify-center items-center py-24"
        >
          <h1 className="text-7xl py-4  text-center">Invoice Extraction</h1>
          <p className="text-center text-2xl text-velqen-gray pb-14">
            Use AI to pull key details from invoices.
          </p>
          <InvoiceExtraction />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div
          id="transaction-classification"
          className="w-[80%] flex flex-col justify-center items-center py-24"
        >
          <h1 className="text-7xl py-4  text-center">
            Transaction Classification
          </h1>
          <p className="text-center text-2xl text-velqen-gray pb-14">
            Understand where your money&#39;s going using AI.
          </p>
          <TransactionClassification onCsvParsed={handleCsvParsed} />
        </div>
      </div>

      <div className="bg-background-sec w-full flex flex-col justify-center items-center ">
        <div
          id="record-reconciliation"
          className="w-[80%] flex flex-col justify-center items-center py-24"
        >
          <h1 className="text-7xl py-4  text-center">Record Reconciliation</h1>
          <p className="text-center text-2xl text-velqen-gray pb-14">
            Spot missed payments or duplicate charges automatically with AI.
          </p>
          <RecordReconciliation />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div
          id="transaction-classification"
          className="w-[80%] flex flex-col justify-center items-center py-24"
        >
          <ReportGenerator csvData={csvFromChild} />
        </div>
      </div>
    </div>
  );
}
