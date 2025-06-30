"use client";
import React, { useState } from "react";
import InvGenChat from "../components/InvGenChat/InvGenChat";
import { InvGenFieldProps } from "@/types/invgen";
import InvGenPreview from "../components/InvGenPreview/InvGenPreview";
import InvGenDownload from "../components/InvGenDownload/InvGenDownload";

const Page = () => {
  const [invoiceData, setInvoiceData] = useState<InvGenFieldProps | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 p-6">
      {/* Left side (Chat + Fields) */}
      <div className="flex flex-col gap-4">
        <div className="bg-black p-4 rounded-xl">
          <h2 className="text-white font-semibold mb-2">Chatbot</h2>
          <InvGenChat onExtracted={(data) => setInvoiceData(data)} />
        </div>

        <div className="bg-black p-4 rounded-xl h-60">
          <h2 className="text-white font-semibold mb-2">Extracted Fields</h2>
          {/* Placeholder for invoice fields */}
          <p className="text-gray-400 text-sm">No data extracted yet.</p>
        </div>
      </div>

      {/* Right side (Invoice Preview) */}
      <div className="bg-black p-4 rounded-xl min-h-[400px]">
        <h2 className="text-white font-semibold mb-2">Invoice Preview</h2>
        {/* Placeholder for invoice preview */}
        <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
          <InvGenPreview invoiceFields={invoiceData} />
        </div>
        {invoiceData && <InvGenDownload />}
      </div>
    </div>
  );
};

export default Page;
