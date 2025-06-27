// lib/exportInvoiceCSV.ts

export function downloadRecordsAsCSV(records: Array<Record<string, unknown>>) {
  if (!records.length) {
    alert("No data to export.");
    return;
  }
  const headers = Array.from(
    records.reduce((keys: Set<string>, record) => {
      Object.keys(record).forEach((key) => keys.add(key));
      return keys;
    }, new Set<string>())
  );

  const rows = records.map((record) =>
    headers.map((header) => {
      const val = record[header];
      if (val === undefined || val === null) return "";
      if (typeof val === "object") return JSON.stringify(val).replace(/\r?\n|\r/g, " ");
      return String(val).replace(/\r?\n|\r/g, " ");
    })
  );

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data.csv";
  link.click();

  URL.revokeObjectURL(url);
}
