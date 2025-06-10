"use client";

import ChatBot from "@/components/ChatBot/ChatBot";
import GlideLink from "@/components/GlideLink/GlideLink";
import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";
import RecordReconciliation from "@/components/RecordReconciliation/RecordReconciliation";
import TransactionClassification from "@/components/TransactionClassification/TransactionClassification";
import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function Home() {
  const { isSmallDevice } = useDeviceSize();

  return isSmallDevice ? (
    <div className="min-h-screen w-full flex flex-col justify-center items-center pt-24">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl py-4 bennett-gradient-text">
          Pick Your AI Tool
        </h1>
        <GlideLink />
      </div>

      <div
        id="transaction-classification"
        className="w-[90%] flex flex-col justify-center items-center pt-32"
      >
        <h1 className="text-4xl py-4 bennett-gradient-text text-center">
          Transaction Classification
        </h1>
        <p className="text-center text-xl text-bennett-gray pb-10">
          Understand where your money's going using AI.
        </p>
        <TransactionClassification />
      </div>
      <div
        id="invoice-extraction"
        className="w-[90%] flex flex-col justify-center items-center pt-32"
      >
        <h1 className="text-4xl py-4 bennett-gradient-text text-center">
          Invoice Extraction
        </h1>
        <p className="text-center text-xl text-bennett-gray pb-10">
          Use AI to pull key details from invoices.
        </p>
        <InvoiceExtraction />
      </div>
      <div
        id="record-reconciliation"
        className="w-[90%] flex flex-col justify-center items-center pt-32"
      >
        <h1 className="text-4xl py-4 bennett-gradient-text text-center">
          Record Reconciliation
        </h1>
        <p className="text-center text-xl text-bennett-gray pb-10">
          Spot missed payments or duplicate charges automatically with AI.
        </p>
        <RecordReconciliation />
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col justify-center items-center pt-40">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <h1 className="text-7xl py-4 bennett-gradient-text">
          Pick Your AI Tool
        </h1>
        <GlideLink />
      </div>

      <div
        id="transaction-classification"
        className="w-[80%] flex flex-col justify-center items-center pt-52"
      >
        <h1 className="text-7xl py-4 bennett-gradient-text">
          Transaction Classification
        </h1>
        <p className="text-center text-2xl text-bennett-gray pb-14">
          Understand where your money's going using AI.
        </p>
        <TransactionClassification />
      </div>
      <div
        id="invoice-extraction"
        className="w-[80%] flex flex-col justify-center items-center pt-52"
      >
        <h1 className="text-7xl py-4 bennett-gradient-text">
          Invoice Extraction
        </h1>
        <p className="text-center text-2xl text-bennett-gray pb-14">
          Use AI to pull key details from invoices.
        </p>
        <InvoiceExtraction />
      </div>
      <div
        id="record-reconciliation"
        className="w-[80%] flex flex-col justify-center items-center pt-52"
      >
        <h1 className="text-7xl py-4 bennett-gradient-text">
          Record Reconciliation
        </h1>
        <p className="text-center text-2xl text-bennett-gray pb-14">
          Spot missed payments or duplicate charges automatically with AI.
        </p>
        <RecordReconciliation />
      </div>
    </div>
  );
}
