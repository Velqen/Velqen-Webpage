import React from "react";
import { ProcessedContent } from "@/types/chat";

interface InvoicePreviewProps {
  processedContent?: ProcessedContent;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ processedContent }) => {
  // Extract invoice fields from processedContent
  const {
    Amount_RM,
    Date: invoiceDate,
    Product_Description,
    Receiver_Name,
    Invoice_Number: invoiceNumber,
  } = processedContent && typeof processedContent === "object"
    ? (processedContent as any)
    : {};

  const today = new Date().toLocaleDateString();

  return (
    <div
      id="invoice-preview"
      className="bg-white text-black p-6 w-[794px] mx-auto border min-h-[1123px] overflow-visible"
      style={{ borderColor: "#d1d5db" }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#000000" }}>
            Velqen AI Invoice
          </h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            Generated: {today}
          </p>
        </div>
        <div className="text-right text-sm">
          <p>Invoice #: {invoiceNumber || "N/A"}</p>
          <p>Date: {invoiceDate || today}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-sm">Billed To:</p>
        <p className="text-md">{Receiver_Name || "N/A"}</p>
      </div>

      <table
        className="w-full mb-4 border-t border-b"
        style={{ borderColor: "#4b5563" }}
      >
        <thead>
          <tr className="text-left text-sm" style={{ color: "#4b5563" }}>
            <th className="py-2">Description</th>
            <th className="py-2 text-right">Amount (RM)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">{Product_Description || "—"}</td>
            <td className="py-2 text-right">
              {Amount_RM ? parseFloat(Amount_RM).toFixed(2) : "0.00"}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="text-right font-semibold text-md">
        <p>Total: RM {Amount_RM ? parseFloat(Amount_RM).toFixed(2) : "0.00"}</p>
      </div>

      <div className="mt-6 text-sm" style={{ color: "#4b5563" }}>
        <p>This invoice was generated using Velqen AI based on your input.</p>
      </div>
    </div>
  );
};

export default InvoicePreview;
