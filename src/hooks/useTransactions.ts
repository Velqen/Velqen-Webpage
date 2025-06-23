// hooks/useTransactions.ts
import { useState } from "react";
import axios from "axios";
import { RecordItem } from "@/types/transactions";

export default function useTransactions() {
  const [data, setData] = useState<RecordItem[]>([]);

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

  const updateTransaction = async (editedRow: RecordItem) => {
    try {
      await axios.put("/api/dashboardTransactions", {
        ...editedRow,
        amount_rm: Number(editedRow.amount_rm), // 🛡️ ensure number
      });
    } catch (err) {
      console.error("Failed to update transaction:", err);
      throw err;
    }
  };

  const addTransaction = async (newRow: RecordItem) => {
    try {
    const { id, ...newRowWithoutId } = newRow; 
      await axios.post("/api/dashboardTransactions", {
        ...newRowWithoutId,
        amount_rm: Number(newRow.amount_rm),
      });
    } catch (err) {
      console.error("Failed to add transaction:", err);
      throw err;
    }
  };

  return { data, setData, fetchData, updateTransaction, addTransaction };
}
