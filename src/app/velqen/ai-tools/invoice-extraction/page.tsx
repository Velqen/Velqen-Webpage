"use client";

import React, { useState } from "react";
import InvoiceInput from "./InvoiceInput";
import InvoiceDashboard from "./InvoiceDashboard";
import InvoiceViewer from "./InvoiceViewer";
import InvoiceActions from "./InvoiceActions";

const Page = () => {
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [invoiceResult, setInvoiceResult] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    setInvoiceFile(file);
  };

  return (
    <div>
      <InvoiceInput onFileSelect={handleFileSelect} />
      <div className="mt-8">
        <InvoiceActions
          file={invoiceFile}
          onExtract={(res) => setInvoiceResult(res)}
        />
      </div>
      {invoiceFile && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mt-4 bg-velqen-black rounded-3xl p-4">
          <InvoiceDashboard result={invoiceResult} />
          <InvoiceViewer file={invoiceFile} />
        </div>
      )}
    </div>
  );
};

export default Page;
