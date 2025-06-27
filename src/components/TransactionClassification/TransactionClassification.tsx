"use client";

import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import useTransactions from "@/hooks/useTransactions";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";

type Props = {
  onCsvParsed?: (data: string[][]) => void;
  csvData?: string[][];
};

export default function TransactionClassification(props: Props) {
  const [isUploadingToDB, setIsUploadingToDB] = useState(false);
  const { isSmallDevice } = useDeviceSize();
  const { addTransaction } = useTransactions();
  const { status: authStatus } = useSession();

  const {
    file,
    csvData,
    status,
    isUploading,
    previewHeaders,
    previewRows,
    handleFileChange,
    handleUpload,
    setStatus,
  } = useTransactionClassification({
    onCsvParsed: props.onCsvParsed,
    csvDataInput: props.csvData,
  });

  const effectiveCsvData = useMemo(() => {
    return csvData?.length ? csvData : [];
  }, [csvData]);

  useEffect(() => {
    if (effectiveCsvData.length > 0) {
      console.log("🧾 effectiveCsvData[0]:", effectiveCsvData[0]);
    }
  }, [effectiveCsvData]);

  // useEffect(() => {
  //   if (
  //     props.csvData &&
  //     props.csvData.length > 0 &&
  //     props.csvData[0][0] !== "Transaction_Description"
  //   ) {
  //     const headers = [
  //       "Transaction_Description",
  //       "Amount_RM",
  //       "Date",
  //       "Merchant_Name",
  //     ];
  //     const merged = [headers, ...props.csvData];
  //     setCsvData(merged);
  //     setStatus("✅ Data received from InvoiceExtraction");
  //   }
  // }, [props.csvData, setCsvData, setStatus]);

  const handleUploadToDB = async () => {
    if (authStatus !== "authenticated" || effectiveCsvData.length === 0) {
      setStatus("❌ Must be logged in & have data.");
      return;
    }

    setIsUploadingToDB(true);
    setStatus("Uploading...");

    try {
      const rows = effectiveCsvData.slice(1); // skip header

      const recordItems = rows.map((row) => ({
        id: "",
        transaction_description: row[0],
        amount_rm: parseFloat(row[1]),
        date: row[2],
        merchant_name: row[3],
        main_category: row[4],
        sub_category: row[5],
        detailed_category: row[6],
      }));

      await addTransaction(recordItems);
      setStatus("✅ Upload successful!");
    } catch {
      setStatus("❌ Upload failed.");
    } finally {
      setIsUploadingToDB(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full mx-auto">
      {/* Left Section */}
      <div className="md:w-1/3">
        <p className="mb-4 text-velqen-gray">
          Please upload a CSV file containing at least the following fields:
        </p>
        <ul className="mb-4 text-velqen-gray list-disc list-inside">
          <li>
            <code>Transaction_Description</code>
          </li>
          <li>
            <code>Amount_RM</code>
          </li>
          <li>
            <code>Merchant_Name</code>
          </li>
          <li>
            <code>Date</code>
          </li>
        </ul>
        <p className="text-velqen-gray">
          Transactions will be automatically categorised into: Main_Category,
          Sub_Category, Detailed_Category.
        </p>
      </div>

      {/* Right Upload Section */}
      <div className="md:w-2/3 max-w-7xl p-6 border border-velqen-gray rounded-lg shadow-lg bg-white">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-5 block w-full border border-velqen-gray rounded-md p-3 hover:border-velqen-orange"
        />

        <div
          className={`flex ${
            isSmallDevice ? "flex-col gap-2" : "flex-row gap-6"
          }`}
        >
          <button
            onClick={handleUpload}
            className="w-full velqen-gradient-bg velqen-gradient-bg-hover text-white py-3 rounded disabled:opacity-50 transition"
            disabled={
              (!file && (!effectiveCsvData || effectiveCsvData.length === 0)) ||
              isUploading
            }
          >
            Upload & Classify
          </button>
          <button
            onClick={handleUploadToDB}
            className="w-full bg-velqen-green hover:bg-velqen-green-hover text-white py-3 rounded disabled:opacity-50 transition"
            disabled={
              effectiveCsvData.length === 0 ||
              isUploading ||
              isUploadingToDB ||
              authStatus !== "authenticated" ||
              !previewHeaders.includes("Main_Category")
            }
          >
            Upload to Database
          </button>
        </div>

        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}

        {previewHeaders.length > 0 && previewRows.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {previewHeaders.map((header, idx) => (
                    <th
                      key={idx}
                      className="px-3 py-2 text-left text-sm font-medium text-velqen-gray border border-velqen-light-gray"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="px-3 py-2 text-sm text-velqen-gray border border-velqen-light-gray"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-velqen-gray text-center">
              Showing first {previewRows.length} rows
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
