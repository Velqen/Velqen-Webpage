import { ProcessedContent } from "@/types/chat";
import React from "react";
import InvGenDownload from "./InvGenDownload";
import InvoicePreview from "./InvoicePreview";

interface InvoiceGenerationResponseProps {
  tasks?: string;
  processedContent?: ProcessedContent;
}

const InvoiceGenerationResponse: React.FC<InvoiceGenerationResponseProps> = ({
  processedContent,
}) => {
  console.log("InvoiceGenerationResponse component triggered");
  // Extract invoice fields from processedContent

  return (
    <div>
      {processedContent ? (
        <>
          <InvoicePreview processedContent={processedContent} />
          {/* Download button for invoice PDF */}
          <div className="mt-4">
            <InvGenDownload />
          </div>
        </>
      ) : (
        <p>No processed content available.</p>
      )}
    </div>
  );
};

export default InvoiceGenerationResponse;
