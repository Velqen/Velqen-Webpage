"use client";

import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useSession } from "next-auth/react";
import { useState, ChangeEvent } from "react";
import useTransactions from "@/hooks/useTransactions";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";

type Props = {
  onCsvParsed?: (data: string[][]) => void; // ✅ New prop
};

export default function TransactionClassification({ onCsvParsed }: Props) {
  const [isUploadingToDB, setIsUploadingToDB] = useState(false);
  const { isSmallDevice } = useDeviceSize();
  const { addTransaction } = useTransactions();
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
  } = useTransactionClassification({ onCsvParsed });
  // Added for preview:

  const { data: session, status: authStatus } = useSession(); // ✅ Correct

  const handleUploadToDB = async () => {
    if (authStatus !== "authenticated" || csvData.length === 0) {
      setStatus("❌ Must be logged in & have data.");
      return;
    }

    setIsUploadingToDB(true);
    setStatus("Uploading...");

    try {
      const rows = csvData.slice(1); // skip header row

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

      await addTransaction(recordItems); // ✅ Replaces fetch
      setStatus("✅ Upload successful!");
    } catch {
      setStatus("❌ Upload failed.");
    } finally {
      setIsUploadingToDB(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full mx-auto">
      {/* Left Text Section */}
      <div className="md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">
          Upload Your CSV for Classification
        </h2>
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
          Transactions will be automatically categorised into categories groups:
        </p>
        <p className="text-velqen-gray">
          Main_Category, Sub_Category, Detailed_Category
        </p>
      </div>

      {/* Right Upload Box */}
      <div className="md:w-2/3 max-w-7xl p-6 border border-velqen-gray rounded-lg shadow-lg bg-white">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-5 block w-full border border-velqen-gray rounded-md p-3 hover:border-velqen-orange"
        />

        <div
          className={` ${
            isSmallDevice ? "flex-col gap-2" : "flex-row gap-6"
          }  flex`}
        >
          <button
            onClick={handleUpload}
            className="w-full velqen-gradient-bg velqen-gradient-bg-hover text-white py-3 rounded disabled:opacity-50 transition"
            disabled={!file || isUploading}
          >
            Upload & Classify
          </button>
          <button
            onClick={handleUploadToDB}
            className="w-full bg-velqen-green hover:bg-velqen-green-hover text-white py-3 rounded disabled:opacity-50 transition"
            disabled={
              !file ||
              csvData.length === 0 ||
              isUploading ||
              isUploadingToDB ||
              authStatus !== "authenticated"
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
