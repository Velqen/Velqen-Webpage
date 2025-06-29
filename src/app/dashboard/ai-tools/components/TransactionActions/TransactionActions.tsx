import { useEffect, useMemo, useState } from "react";
import { useTransactionClassification } from "@/hooks/useTransactionClassification";
import useTransactions from "@/hooks/useTransactions";

type Props = {
  inputFile: File | null;
  csvData?: string[][];
  onCsvParsed?: (data: string[][]) => void;
};

const TransactionActions = (props: Props) => {
  const {
    csvData,
    status,
    isUploading,
    previewHeaders,
    previewRows,
    handleUpload,
    setStatus,
    setFile,
  } = useTransactionClassification({
    onCsvParsed: props.onCsvParsed,
    csvDataInput: props.csvData,
  });
  const [isUploadingToDB, setIsUploadingToDB] = useState(false);
  const { addTransaction } = useTransactions();

  useEffect(() => {
    if (props.inputFile) {
      setFile(props.inputFile);
    }
  }, [setFile, props.inputFile]);

  const effectiveCsvData = useMemo(() => {
    if (!csvData || csvData.length === 0) return [];

    const headers = csvData[0].map((h) => h.trim().toLowerCase());

    const hasAllRequiredHeaders =
      headers.includes("main_category") &&
      headers.includes("sub_category") &&
      headers.includes("detailed_category");

    return hasAllRequiredHeaders ? csvData : [];
  }, [csvData]);

  const handleUploadToDB = async () => {
    if (!effectiveCsvData || effectiveCsvData.length === 0) {
      setStatus("❌ No data to upload.");
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
    <>
      {/* use activeFile or activeCSV accordingly */}
      <div>
        <div className="flex justify-end gap-4 p-4">
          <button
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
            onClick={handleUpload}
          >
            Classify Transaction
          </button>
          <button
            onClick={handleUploadToDB}
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
            disabled={
              !effectiveCsvData ||
              effectiveCsvData.length === 0 ||
              isUploading ||
              isUploadingToDB ||
              !previewHeaders.includes("Main_Category")
            }
          >
            Upload to Database
          </button>
        </div>
        <p className="text-white mt-2">{status}</p>

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
    </>
  );
};

export default TransactionActions;
