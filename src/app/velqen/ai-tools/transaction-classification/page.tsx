"use client";

import React, { useEffect, useState } from "react";
import TransactionInput from "./TransactionInput";
import TransactionActions from "./TransactionActions";

const Page = () => {
  const [transactionData, setTransactionData] = useState<string[][] | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("invoice_result");
    if (stored) {
      const parsedResult = JSON.parse(stored);
      setTransactionData(parsedResult);
    }
  }, []);

  return (
    <div>
      <TransactionInput
        csvData={transactionData ?? undefined}
        onTransactionSelect={(file) => setSelectedFile(file)}
      />
      <div className="mt-8">
        <TransactionActions
          inputFile={selectedFile}
          csvData={transactionData ?? undefined}
        />
      </div>
      {/* <pre>{JSON.stringify(transactionData, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
