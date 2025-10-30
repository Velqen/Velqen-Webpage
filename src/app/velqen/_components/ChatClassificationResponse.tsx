"use client";

import React, { useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";
import useTransactions from "@/hooks/useTransactions";
import ClassificationCard from "./ClassificationCard";

interface ChatClassificationResponseProps {
  tasks?: string;
  processedContent?: string[][];
}

const ChatClassificationResponse: React.FC<ChatClassificationResponseProps> = ({
  tasks,
  processedContent,
}) => {
  const { setCsvData, downloadCsv } = useTransactionClassification();
  const { addTransaction } = useTransactions();
  useEffect(() => {
    if (processedContent) {
      setCsvData(processedContent);
    }
  }, [processedContent, setCsvData]);

  const handleUploadToDB = async () => {
    if (!processedContent || processedContent.length === 0) return;

    const rows = processedContent.slice(1); // skip header
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

    try {
      await addTransaction(recordItems);
      alert("Upload successful!");
    } catch {
      alert("Upload failed.");
    }
  };
  return (
    <div className="px-4 py-2 rounded-2xl text-base break-words  flex flex-col space-y-2">
      <div>{tasks}</div>
      {processedContent && <ClassificationCard processedContent={processedContent} />}
      <div className="flex space-x-2">
        <button
          onClick={downloadCsv}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FiDownload className="mr-1" /> Download
        </button>
        <button
          onClick={handleUploadToDB}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Upload to DB
        </button>
      </div>
    </div>
  );
};

export default ChatClassificationResponse;
