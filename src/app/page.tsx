"use client";

import ChatBot from "@/components/ChatBot/ChatBot";
import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";
import RecordReconciliation from "@/components/RecordReconciliation/RecordReconciliation";
import TransactionClassification from "@/components/TransactionClassification/TransactionClassification";
import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function Home() {
  const { isSmallDevice } = useDeviceSize();

  return isSmallDevice ? (
    <div className="min-h-screen w-full flex flex-col justify-center items-center pt-16">
      <div className="flex flex-col justify-center items-center w-[100%]">
        <h2 className="text-3xl py-10 bennett-gradient-text">
          Chat with Bennett
        </h2>
        <ChatBot />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-3xl py-10 bennett-gradient-text">
          Transaction Classification
        </h1>
        <TransactionClassification />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-3xl py-10 bennett-gradient-text">
          Invoice Extraction
        </h1>
        <InvoiceExtraction />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-3xl py-10 bennett-gradient-text">
          Record Reconciliation
        </h1>
        <RecordReconciliation />
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col justify-center items-center pt-28">
      <div className="flex flex-col justify-center items-center max-w-[1200px] w-[80%]">
        <h2 className="text-4xl py-10 bennett-gradient-text">
          Chat with Bennett
        </h2>
        <ChatBot />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-4xl py-10 bennett-gradient-text">
          Transaction Classification
        </h1>
        <TransactionClassification />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-4xl py-10 bennett-gradient-text">
          Invoice Extraction
        </h1>
        <InvoiceExtraction />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-4xl py-10 bennett-gradient-text">
          Record Reconciliation
        </h1>
        <RecordReconciliation />
      </div>
    </div>
  );
}
