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
        <h2 className="text-4xl py-10 bennett-gradient-text">
          Chat with Bennett
        </h2>

        <ChatBot />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-4xl py-4 bennett-gradient-text">
          Transaction Classification
        </h1>
        <p className="text-center text-xl text-bennett-gray pb-14">
          Classify your bank transactions automatically using AI for a faster,
          smarter, and stress-free workflow.
        </p>
        <TransactionClassification />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-4xl py-4 bennett-gradient-text">
          Invoice Extraction
        </h1>
        <p className="text-center text-xl text-bennett-gray pb-14">
          Use AI to pull key details from invoices without manual effort.
        </p>
        <InvoiceExtraction />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <h1 className="text-4xl py-4 bennett-gradient-text">
          Record Reconciliation
        </h1>
        <p className="text-center text-xl text-bennett-gray pb-14">
          Reconcile your financial records with AI for quicker, simpler
          matching.
        </p>
        <RecordReconciliation />
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col justify-center items-center pt-28">
      <div className="flex flex-col justify-center items-center max-w-[1200px] w-[80%]">
        <h2 className="text-7xl py-10 bennett-gradient-text">
          Chat with Bennett
        </h2>
        <ChatBot />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-52">
        <h1 className="text-7xl py-4 bennett-gradient-text">
          Transaction Classification
        </h1>
        <p className="text-center text-2xl text-bennett-gray pb-14">
          Classify your bank transactions automatically using AI for a faster,
          smarter, and stress-free workflow.
        </p>
        <TransactionClassification />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-52">
        <h1 className="text-7xl py-4 bennett-gradient-text">
          Invoice Extraction
        </h1>
        <p className="text-center text-2xl text-bennett-gray pb-14">
          Use AI to pull key details from invoices without manual effort.
        </p>
        <InvoiceExtraction />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-52">
        <h1 className="text-7xl py-4 bennett-gradient-text">
          Record Reconciliation
        </h1>
        <p className="text-center text-2xl text-bennett-gray pb-14">
          Reconcile your financial records with AI for quicker, simpler
          matching.
        </p>
        <RecordReconciliation />
      </div>
    </div>
  );
}
