import React, { useRef } from "react";
import { Sparkles } from "lucide-react";
import ReportGenerator, {
  ReportGeneratorHandle,
} from "@/components/ReportGenerator/ReportGenerator";

const ChatActionButton = () => {
  const reportRef = useRef<ReportGeneratorHandle>(null); // ✅ Ref to access generatePDF

  const handleClick = () => {
    reportRef.current?.generatePDF(); // ✅ Trigger the PDF generation
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        title="Generate AI Report"
        onClick={handleClick}
        className="p-3 text-white rounded-full hover:bg-velqen-gray"
      >
        <Sparkles size={20} />
      </button>
      <ReportGenerator ref={reportRef} />{" "}
      {/* ✅ Component mounted outside button */}
    </div>
  );
};

export default ChatActionButton;
