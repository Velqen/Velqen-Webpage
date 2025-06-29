"use client";

import React, { useState } from "react";
import InvoiceInput from "../components/InvoiceInput/InvoiceInput";
import InvoiceDashboard from "../components/InvoiceDashboard/InvoiceDashboard";
import InvoiceViewer from "../components/InvoiceViewer/InvoiceViewer";
import InvoiceActions from "../components/InvoiceActions/InvoiceActions";

const Page = () => {
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
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
