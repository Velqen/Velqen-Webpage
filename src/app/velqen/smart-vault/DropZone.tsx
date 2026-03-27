import { Upload } from "lucide-react";

type DropZoneProps = {
  mode: "paid" | "received";
  isDragging: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CONFIG = {
  paid: {
    label: "Money I Paid",
    sublabel: "Receipts, supplier bills, purchases",
    examples: "e.g. office supplies, rent, utilities",
    accent: "border-red-500/40 hover:border-red-500/60",
    dragAccent: "border-red-500 bg-red-500/5",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    btnClass: "bg-red-500 hover:bg-red-600",
  },
  received: {
    label: "Money I Received",
    sublabel: "Invoices you sent to your clients",
    examples: "e.g. services rendered, product sales",
    accent: "border-emerald-500/40 hover:border-emerald-500/60",
    dragAccent: "border-emerald-500 bg-emerald-500/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    btnClass: "bg-emerald-600 hover:bg-emerald-700",
  },
};

export function DropZone({ mode, isDragging, onDrop, onDragOver, onDragLeave, onFileInput }: DropZoneProps) {
  const c = CONFIG[mode];

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`rounded-2xl border-2 border-dashed transition-all duration-200 ${
        isDragging ? c.dragAccent : `border-gray-700 ${c.accent} bg-[#111]`
      }`}
    >
      <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.iconBg}`}>
          <Upload size={18} className={c.iconColor} />
        </div>

        <p className="text-white font-semibold text-sm mb-0.5">{c.label}</p>
        <p className="text-xs text-gray-400 mb-0.5">{c.sublabel}</p>
        <p className="text-xs text-gray-600 mb-5">{c.examples}</p>

        <label className="cursor-pointer">
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={onFileInput} className="hidden" />
          <span className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg text-white transition-colors ${c.btnClass}`}>
            <Upload size={12} />
            Upload Files
          </span>
        </label>
      </div>
    </div>
  );
}
