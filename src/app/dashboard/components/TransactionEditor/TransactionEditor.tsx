"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RecordItem } from "@/types/transactions";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TransactionEditor() {
  const [data, setData] = useState<RecordItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<RecordItem | null>(null);

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

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/dashboardTransactions");
      const sortedData = res.data.data.sort(
        (a: RecordItem, b: RecordItem) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setData(sortedData);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

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
      // ✅ Call PUT on existing API with ID
      await axios.put("/api/dashboardTransactions", editedRow);

      // ✅ Refresh data after saving
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
    <div className="block w-full overflow-x-auto p-4">
      {" "}
      <table className="min-w-full table-auto border text-sm bg-black border-white">
        <thead className=" text-white">
          <tr>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Merchant</th>
            <th className="px-3 py-2 text-left">Description</th>
            <th className="px-3 py-2 text-left">Main Category</th>
            <th className="px-3 py-2 text-left">Sub Category</th>
            <th className="px-3 py-2 text-right">Amount (RM)</th>
            <th className="px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, i) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + i; // 🔁 recalculate here too
            const isEditing = globalIndex === editingIndex;
            return (
              <tr key={`${row.date}-${i}`} className="border-t text-white">
                <td className="px-3 py-2">{row.date}</td>
                <td className="px-3 py-2">
                  {isEditing ? (
                    <input
                      name="merchant_name"
                      value={editedRow?.merchant_name || ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full bg-velqen-gray "
                    />
                  ) : (
                    row.merchant_name
                  )}
                </td>
                <td className="px-3 py-2">
                  {isEditing ? (
                    <input
                      name="transaction_description"
                      value={editedRow?.transaction_description || ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full bg-velqen-gray"
                    />
                  ) : (
                    row.transaction_description
                  )}
                </td>
                <td className="px-3 py-2">
                  {isEditing ? (
                    <input
                      name="main_category"
                      value={editedRow?.main_category || ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full bg-velqen-gray"
                    />
                  ) : (
                    row.main_category
                  )}
                </td>
                <td className="px-3 py-2">
                  {isEditing ? (
                    <input
                      name="sub_category"
                      value={editedRow?.sub_category || ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full bg-velqen-gray"
                    />
                  ) : (
                    row.sub_category
                  )}
                </td>
                <td className="px-3 py-2 text-right">
                  {isEditing ? (
                    <input
                      type="number"
                      name="amount_rm"
                      value={editedRow?.amount_rm || 0}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-24 text-right bg-velqen-gray"
                    />
                  ) : (
                    <span
                      className={
                        row.amount_rm < 0 ? "text-red-500" : "text-green-300"
                      }
                    >
                      {Number(row.amount_rm).toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-center">
                  {isEditing ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={saveEdit}
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(i)}
                      className="px-2 py-1 velqen-gradient-bg text-black rounded velqen-gradient-bg-hover"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
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
