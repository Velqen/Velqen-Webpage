import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  csvData: string[][];
};

const ReportGenerator = ({ csvData }: Props) => {
  if (csvData.length === 0) {
    return <p className="text-gray-500">No CSV data uploaded yet.</p>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Financial Report", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [csvData[0]],
      body: csvData.slice(1),
    });

    doc.save("financial_report.pdf");
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        className="px-6 py-2 bg-bennett-green text-white rounded-md hover:bg-bennett-green-hover transition"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ReportGenerator;
