"use client";
import React, { forwardRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  csvData: string[][];
};

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

export type ReportGeneratorHandle = {
  generatePDF: () => void;
};

const ReportGenerator = forwardRef<ReportGeneratorHandle, Props>(
  ({ csvData }, ref) => {
    if (csvData.length === 0) {
      return <p className="text-velqen-gray">No CSV data uploaded yet.</p>;
    }

    const generatePDF = () => {
      const doc: jsPDFWithAutoTable = new jsPDF();
      doc.setFontSize(18);
      doc.text("Income Statement", 14, 22);

      const headers = csvData[0];
      const rows = csvData.slice(1);
      const subCategoryIndex = headers.indexOf("Sub_Category");
      const amountIndex = headers.indexOf("Amount_RM");

      // Split into Income & Expenses
      const incomeRows = rows.filter(
        (row) => row[subCategoryIndex] === "Income"
      );
      const expenseRows = rows.filter(
        (row) => row[subCategoryIndex] === "Expenses"
      );

      // Sum of amounts
      const sumAmounts = (data: string[][]) =>
        data
          .reduce((sum, row) => sum + parseFloat(row[amountIndex] || "0"), 0)
          .toFixed(2);

      const incomeTotal = sumAmounts(incomeRows);
      const expenseTotal = sumAmounts(expenseRows);

      // Income table
      doc.setFontSize(14);
      doc.text("Income", 14, 32);
      autoTable(doc, {
        startY: 36,
        head: [headers],
        body: incomeRows,
        didDrawCell: (data) => {
          // ✅ Corrected to use incomeRows
          if (
            data.row.index === incomeRows.length - 1 &&
            data.column.index === 0
          ) {
            const y = data.cell.y + data.cell.height + 10;
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(`Total Income: RM ${incomeTotal}`, 14, y);
          }
        },
      });

      // Expense table
      const finalY = (doc.lastAutoTable?.finalY || 0) + 40;
      doc.text("Expenses", 14, finalY);
      autoTable(doc, {
        startY: finalY + 4,
        head: [headers],
        body: expenseRows,
        didDrawCell: (data) => {
          // ✅ Use didDrawCell instead of didDrawPage
          if (
            data.row.index === expenseRows.length - 1 &&
            data.column.index === 0
          ) {
            const y = data.cell.y + data.cell.height + 10;
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(`Total Expenses: RM ${expenseTotal}`, 14, y);
          }
        },
      });

      const summaryY = (doc.lastAutoTable?.finalY || 0) + 20;
      const profitLossValue =
        parseFloat(incomeTotal) - parseFloat(expenseTotal);
      const profitLoss = profitLossValue.toFixed(2);
      const isProfit = profitLossValue >= 0;

      doc.setFontSize(16);
      doc.setTextColor(
        isProfit ? 0 : 200,
        isProfit ? 150 : 0,
        isProfit ? 0 : 0
      ); // green or red
      doc.text(
        `${isProfit ? "Profit" : "Loss"}: RM ${profitLoss}`,
        14,
        summaryY
      );

      // Reset colour (optional)
      doc.setTextColor(0, 0, 0);

      // --- Assets & Liabilities Section ---
      doc.addPage();
      doc.setFontSize(18);
      doc.text("Balance Sheet", 14, 22);
      const assetRows = rows.filter(
        (row) => row[subCategoryIndex] === "Assets"
      );
      const liabilityRows = rows.filter(
        (row) => row[subCategoryIndex] === "Liabilities"
      );

      const assetTotal = sumAmounts(assetRows);
      const liabilityTotal = sumAmounts(liabilityRows);

      const sectionStartY = 35;
      doc.setFontSize(14);
      doc.text("Assets", 14, sectionStartY);

      autoTable(doc, {
        startY: sectionStartY + 4,
        head: [headers],
        body: assetRows,
        didDrawCell: (data) => {
          if (
            data.row.index === assetRows.length - 1 &&
            data.column.index === 0
          ) {
            const y = data.cell.y + data.cell.height + 10;
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(`Total Assets: RM ${assetTotal}`, 14, y);
          }
        },
      });

      const afterAssetsY = (doc.lastAutoTable?.finalY || 0) + 30;
      doc.text("Liabilities", 14, afterAssetsY);

      autoTable(doc, {
        startY: afterAssetsY + 4,
        head: [headers],
        body: liabilityRows,
        didDrawCell: (data) => {
          if (
            data.row.index === liabilityRows.length - 1 &&
            data.column.index === 0
          ) {
            const y = data.cell.y + data.cell.height + 10;
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(`Total Liabilities: RM ${liabilityTotal}`, 14, y);
          }
        },
      });
      doc.save("financial_report.pdf");
    };
    useImperativeHandle(ref, () => ({
      generatePDF,
    }));

    return null; // No button or UI here
  }
);
ReportGenerator.displayName = "ReportGenerator";
export default ReportGenerator;
