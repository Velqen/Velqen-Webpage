import { useState } from "react";

export type FileStatus = {
  name: string;
  status: "processing" | "complete" | "error";
  type: string;
  icon: string;
  size?: string;
  extracted?: Record<string, unknown>;
  classified?: Record<string, unknown>;
  stored?: boolean;
  error?: string;
};

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png"
];

export function useSmartVault() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileStatus[]>([]);

  const detectFileType = (fileName: string): { type: string; icon: string } => {
    const lower = fileName.toLowerCase();
    if (lower.endsWith(".pdf")) return { type: "Invoice", icon: "PDF" };
    if (lower.match(/\.(jpg|jpeg|png)$/)) return { type: "Invoice", icon: "IMG" };
    return { type: "Invalid", icon: "FILE" };
  };

  const isValidFile = (file: File): boolean => {
    return ALLOWED_TYPES.includes(file.type);
  };

  const processFiles = async (filesToProcess: File[]) => {
    // Filter valid files
    const validFiles = filesToProcess.filter(isValidFile);
    const invalidFiles = filesToProcess.filter(f => !isValidFile(f));

    // Add invalid files as errors immediately
    const invalidFileStatus: FileStatus[] = invalidFiles.map((file) => ({
      name: file.name,
      status: "error" as const,
      type: "Invalid",
      icon: "FILE",
    }));

    // Add valid files as "processing"
    const newFiles: FileStatus[] = validFiles.map((file) => {
      const { type, icon } = detectFileType(file.name);
      return {
        name: file.name,
        status: "processing" as const,
        type,
        icon,
      };
    });

    setFiles((prev) => [...newFiles, ...invalidFileStatus, ...prev]);

    if (validFiles.length === 0) return;

    try {
      const formData = new FormData();
      validFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/smartVault", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      // Update status based on results
      setFiles((prev) =>
        prev.map((f) => {
          const result = data.results?.find((r: any) => r.fileName === f.name);
          if (result) {
            return {
              ...f,
              status: result.status === "success" ? "complete" : "error",
              extracted: result.data?.extracted,
              classified: result.data?.classified,
              stored: result.data?.stored,
              error: result.error ?? undefined,
            };
          }
          return f;
        })
      );
    } catch (error) {
      console.error("Error:", error);
      // Mark all valid uploaded files as error
      setFiles((prev) =>
        prev.map((f) =>
          validFiles.some((file) => file.name === f.name)
            ? { ...f, status: "error" }
            : f
        )
      );
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    await processFiles(droppedFiles);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    await processFiles(selectedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return {
    isDragging,
    files,
    handleDrop,
    handleFileInput,
    handleDragOver,
    handleDragLeave,
  };
}
