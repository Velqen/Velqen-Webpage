import React from "react";
import { ProcessedContent } from "@/types/chat";

interface DocumentCardProps {
  processedContent?: ProcessedContent;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ processedContent }) => {
  if (!processedContent) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-4 my-2 max-w-xl">
      {/* Card header */}
      <div className="font-semibold text-lg mb-2 text-gray-800">
        Extracted Document
      </div>
      {/* Card content */}
      {typeof processedContent === "string" ? (
        <div className="text-gray-700 whitespace-pre-line">
          {processedContent}
        </div>
      ) : (
        <div className="text-gray-700 text-sm">
          {Object.entries(processedContent).map(([key, value]) => (
            <div key={key} className="flex py-1">
              <span className="font-medium w-40 text-gray-600">{key}:</span>
              <span className="ml-2 break-all">{String(value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
