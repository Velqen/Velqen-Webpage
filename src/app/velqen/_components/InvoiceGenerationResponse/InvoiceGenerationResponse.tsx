import { ProcessedContent } from "@/types/chat";
import React from "react";
import InvGenDownload from "./InvGenDownload";
import InvoicePreview from "./InvoicePreview";

interface InvoiceGenerationResponseProps {
  tasks?: string;
  processedContent?: ProcessedContent;
}

const InvoiceGenerationResponse: React.FC<InvoiceGenerationResponseProps> = ({
  tasks,
  processedContent,
}) => {
  console.log("InvoiceGenerationResponse component triggered");
  // Extract invoice fields from processedContent

  const today = new Date().toLocaleDateString();

  return (
    <div>
      {processedContent ? (
        <>
          <InvoicePreview processedContent={processedContent} />
          {/* Download button for invoice PDF */}
          <div className="mt-4">
            <InvGenDownload processedContent={processedContent} />
          </div>
        </>
      ) : (
        <p>No processed content available.</p>
      )}
    </div>
  );
};

export default InvoiceGenerationResponse;
