import { useState } from "react";

export type FileStatus = {
  name: string;
  status: "processing" | "complete" | "error";
  mode: "paid" | "received";
  icon: string;
  transaction_id?: number;
  classified?: Record<string, unknown>;
  stored?: boolean;
  error?: string;
  zoho_posted?: boolean;
  zoho_posting?: boolean;
  zoho_flags?: string[];
  zoho_error?: string;
};

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

export function useSmartVault() {
  const [isDraggingPaid, setIsDraggingPaid] = useState(false);
  const [isDraggingReceived, setIsDraggingReceived] = useState(false);
  const [files, setFiles] = useState<FileStatus[]>([]);

  const isValidFile = (file: File) => ALLOWED_TYPES.includes(file.type);

  const processFiles = async (filesToProcess: File[], mode: "paid" | "received") => {
    const validFiles = filesToProcess.filter(isValidFile);
    const invalidFiles = filesToProcess.filter(f => !isValidFile(f));

    const newFiles: FileStatus[] = [
      ...validFiles.map((file) => ({
        name: file.name, status: "processing" as const,
        mode, icon: file.name.endsWith(".pdf") ? "PDF" : "IMG",
      })),
      ...invalidFiles.map((file) => ({
        name: file.name, status: "error" as const,
        mode, icon: "FILE", error: "File type not supported",
      })),
    ];

    setFiles((prev) => [...newFiles, ...prev]);
    if (validFiles.length === 0) return;

    try {
      const formData = new FormData();
      validFiles.forEach((file) => formData.append("files", file));
      formData.append("document_type", mode === "paid" ? "bill" : "invoice");

      const response = await fetch("/api/smartVault", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFiles((prev) => prev.map((f) => {
        const result = data.results?.find((r: { fileName: string; status: string }) => r.fileName === f.name);
        if (!result) return f;
        return {
          ...f,
          status: result.status === "success" ? "complete" : "error",
          transaction_id: result.data?.transaction_id,
          classified: result.data?.classified,
          stored: result.data?.stored,
          error: result.error ?? undefined,
        };
      }));
    } catch {
      setFiles((prev) => prev.map((f) =>
        validFiles.some((vf) => vf.name === f.name) ? { ...f, status: "error" as const } : f
      ));
    }
  };

  const handleConfirm = async (fileName: string) => {
    const file = files.find((f) => f.name === fileName);
    if (!file?.transaction_id) return;

    setFiles((prev) => prev.map((f) => f.name === fileName ? { ...f, zoho_posting: true } : f));

    try {
      const res = await fetch("/api/zoho/post-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction_id: file.transaction_id }),
      });
      const result = await res.json();
      if (!res.ok) {
        setFiles((prev) => prev.map((f) => f.name === fileName ? { ...f, zoho_posting: false, zoho_error: result.detail } : f));
        return;
      }
      setFiles((prev) => prev.map((f) => f.name === fileName ? { ...f, zoho_posting: false, zoho_posted: true, zoho_flags: result.flags } : f));
    } catch {
      setFiles((prev) => prev.map((f) => f.name === fileName ? { ...f, zoho_posting: false, zoho_error: "Unexpected error" } : f));
    }
  };

  const makeDragHandlers = (mode: "paid" | "received") => {
    const setDragging = mode === "paid" ? setIsDraggingPaid : setIsDraggingReceived;
    return {
      onDrop: async (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        await processFiles(Array.from(e.dataTransfer.files), mode);
      },
      onDragOver: (e: React.DragEvent) => { e.preventDefault(); setDragging(true); },
      onDragLeave: () => setDragging(false),
      onFileInput: async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        await processFiles(Array.from(e.target.files), mode);
      },
    };
  };

  return {
    isDraggingPaid,
    isDraggingReceived,
    files,
    paidHandlers: makeDragHandlers("paid"),
    receivedHandlers: makeDragHandlers("received"),
    handleConfirm,
  };
}
