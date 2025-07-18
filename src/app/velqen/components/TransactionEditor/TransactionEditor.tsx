"use client";

import { useEffect, useState } from "react";
import { RecordItem } from "@/types/transactions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTransactions from "@/hooks/useTransactions";
import TransactionRow from "../TransactionRow/TransactionRow";
import NewTransactionRow from "../NewTransactionRow/NewTransactionRow";
import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function TransactionEditor() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<RecordItem | null>(null);
  const { data, fetchData, updateTransaction, addTransaction } =
    useTransactions();
  const { isSmallDevice } = useDeviceSize();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startEdit = (i: number) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + i; // ✅ map to global index
    setEditingIndex(globalIndex);
    setEditedRow({ ...data[globalIndex] });
  };

  const cancelEdit = () => {
    setEditedRow(null);
    setEditingIndex(null);
  };

  const saveEdit = async () => {
    if (editedRow == null || editingIndex == null) return;

    try {
      await updateTransaction(editedRow); // ✅ using hook
      await fetchData();
      cancelEdit();
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  return (
    <div className="w-full px-6 md:px-12 py-10 rounded-xl bg-velqen-black">
      <h1 className="text-2xl md:text-4xl font-bold mb-10 text-white">
        All Transactions
      </h1>
      <div
        className={` ${isSmallDevice ? "" : ""} block w-full overflow-x-auto`}
      >
        {" "}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full rounded-xl overflow-hidden">
            <table className="min-w-full table-auto text-md md:text-md rounded-xl bg-black">
              <thead className=" text-black bg-velqen-light-orange">
                <tr>
                  <th className="px-3 py-4 text-left">Date</th>
                  <th className="px-3 py-4 text-left">Merchant</th>
                  <th className="px-3 py-4 text-left">Description</th>
                  <th className="px-3 py-4 text-left">Main Category</th>
                  <th className="px-3 py-4 text-left">Sub Category</th>
                  <th className="px-3 py-4 text-left">Detailed Category</th>
                  <th className="px-3 py-4 text-right">Amount (RM)</th>
                  <th className="px-3 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, i) => {
                  const globalIndex = (currentPage - 1) * itemsPerPage + i;
                  const isEditing = globalIndex === editingIndex;
                  return (
                    <TransactionRow
                      key={row.id || `${row.date}-${i}`}
                      row={row}
                      index={globalIndex}
                      isEditing={isEditing}
                      editedRow={editedRow}
                      setEditedRow={setEditedRow}
                      setEditingIndex={setEditingIndex}
                      onSave={saveEdit}
                      onCancel={cancelEdit}
                      onStartEdit={startEdit}
                    />
                  );
                })}

                <NewTransactionRow
                  onAdd={async (row) => {
                    try {
                      await addTransaction(row); // ✅ useTransactions hook
                      await fetchData(); // ✅ refresh list with real backend id
                    } catch (err) {
                      console.error("Failed to add row:", err);
                    }
                  }}
                />
              </tbody>
            </table>
          </div>
        </div>
        {/* ✅ Pagination Controls */}
        <div className="flex justify-between items-center pt-4 text-white">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 flex items-center rounded disabled:opacity-50"
          >
            <ChevronLeft size={18} />
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 flex items-center rounded disabled:opacity-50"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
