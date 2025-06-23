"use client";

import { useEffect, useState } from "react";
import { RecordItem } from "@/types/transactions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTransactions from "@/hooks/useTransactions";
import TransactionRow from "../TransactionRow/TransactionRow";
import NewTransactionRow from "../NewTransactionRow/NewTransactionRow";

export default function TransactionEditor() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<RecordItem | null>(null);
  const { data, setData, fetchData, updateTransaction, addTransaction } =
    useTransactions();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editedRow) return;
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  return (
    <div className="block w-full overflow-x-auto">
      {" "}
      <table className="min-w-full table-auto text-sm bg-black">
        <thead className=" text-white">
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
  );
}
