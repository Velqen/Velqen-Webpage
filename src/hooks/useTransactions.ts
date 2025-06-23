// hooks/useTransactions.ts
import { useCallback, useState } from "react";
import axios from "axios";
import { RecordItem } from "@/types/transactions";

export default function useTransactions() {
  const [data, setData] = useState<RecordItem[]>([]);

    const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("/api/databaseTransaction");
      const sortedData = res.data.data.sort(
        (a: RecordItem, b: RecordItem) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setData(sortedData);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  }, []);

  const updateTransaction = async (editedRow: RecordItem) => {
    try {
      await axios.put("/api/databaseTransaction", {
        ...editedRow,
        amount_rm: Number(editedRow.amount_rm), // 🛡️ ensure number
      });
    } catch (err) {
      console.error("Failed to update transaction:", err);
      throw err;
    }
  };

 const addTransaction = async (newRow: RecordItem | RecordItem[]) => {
  const rows = Array.isArray(newRow) ? newRow : [newRow]; // 🟩 support bulk or single

  const formattedRows = rows.map((row) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rowWithoutId = (({ id, ...rest }) => rest)(row);

    let parsedDate = rowWithoutId.date;
    if (typeof parsedDate === "string" && parsedDate.includes("/")) {
      const [day, month, year] = parsedDate.split("/");
      parsedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    return {
      ...rowWithoutId,
      date: parsedDate,
      amount_rm: Number(row.amount_rm),
    };
  });

  try {
    await axios.post("/api/databaseTransaction", {
      data: formattedRows, // 🟩 send all rows at once
    });
  } catch (err) {
    console.error("Failed to add transaction(s):", err);
    throw err;
  }
};


  return { data, setData, fetchData, updateTransaction, addTransaction };
}
