"use client";

import { RecordItem } from "@/types/transactions";
import React from "react";
import { Pencil, Check, X } from "lucide-react";

type Props = {
  row: RecordItem;
  index: number;
  isEditing: boolean;
  editedRow: RecordItem | null;
  setEditedRow: React.Dispatch<React.SetStateAction<RecordItem | null>>;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onSave: () => void;
  onCancel: () => void;
  onStartEdit: (index: number) => void;
};

export default function TransactionRow({
  row,
  index,
  isEditing,
  editedRow,
  setEditedRow,
  onSave,
  onCancel,
  onStartEdit,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editedRow) return;
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  return (
    <tr
      className="border-t border-velqen-gray text-velqen-light-gray"
      key={`${row.date}-${index}`}
    >
      <td className="px-3 py-4">{row.date}</td>
      <td className="px-3 py-4">
        {isEditing ? (
          <input
            name="merchant_name"
            value={editedRow?.merchant_name || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full bg-velqen-gray"
          />
        ) : (
          row.merchant_name
        )}
      </td>
      <td className="px-3 py-4">
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
      <td className="px-3 py-4">
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
      <td className="px-3 py-4">
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
      <td className="px-3 py-4">
        {isEditing ? (
          <input
            name="detailed_category"
            value={editedRow?.detailed_category || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full bg-velqen-gray"
          />
        ) : (
          row.detailed_category
        )}
      </td>
      <td className="px-3 py-4 text-right">
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
            className={row.amount_rm < 0 ? "text-red-500" : "text-green-300"}
          >
            {Number(row.amount_rm).toFixed(2)}
          </span>
        )}
      </td>
      <td className="px-3 py-4 text-center">
        {isEditing ? (
          <div className="flex gap-2 justify-center">
            <button
              onClick={onSave}
              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={onCancel}
              className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onStartEdit(index)}
            className="px-2 py-1 rounded "
          >
            <Pencil className="w-5 h-5 text-velqen-orange hover:text-velqen-light-orange" />
          </button>
        )}
      </td>
    </tr>
  );
}
