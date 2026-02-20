import { Upload } from "lucide-react";

type DropZoneProps = {
  isDragging: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function DropZone({
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInput,
}: DropZoneProps) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`
        relative overflow-hidden rounded-3xl transition-all duration-300
        ${
          isDragging
            ? "border-2 border-velqen-orange bg-velqen-orange/10 shadow-2xl shadow-velqen-orange/20"
            : "border-2 border-gray-800 hover:border-gray-700 bg-gray-900/50"
        }
      `}
    >
      <div className="absolute inset-0 bg-velqen-orange/5"></div>

      <div className="relative p-20 text-center">
        <div
          className={`
          mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
          ${
            isDragging
              ? "bg-velqen-orange shadow-lg shadow-velqen-orange/50 scale-110"
              : "bg-gray-800"
          }
        `}
        >
          <Upload className="text-white" size={36} />
        </div>

        <h2 className="text-3xl font-bold mb-3 text-white">
          {isDragging ? "Drop Files Here" : "Drop Files Anywhere"}
        </h2>
        <p className="text-velqen-light-gray mb-8 text-lg">
          PDF or Images — Instant AI extraction & classification
        </p>

        <label className="cursor-pointer group">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={onFileInput}
            className="hidden"
          />
          <span className="inline-flex items-center gap-2 px-8 py-4 velqen-gradient-bg velqen-gradient-bg-hover rounded-xl transition-all duration-300 font-semibold shadow-lg text-white group-hover:scale-105">
            <Upload size={20} />
            Browse Files
          </span>
        </label>

        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-velqen-light-gray">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-velqen-green"></div>
            Secure Upload
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-velqen-orange"></div>
            AI Powered
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-velqen-orange"></div>
            Instant Results
          </span>
        </div>
      </div>
    </div>
  );
}
