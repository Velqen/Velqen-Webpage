import { ArrowUpFromLine } from "lucide-react";

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
    label: "Money Out",
    sublabel: "Receipts, bills, purchases",
    gradient: "from-red-800 via-rose-800 to-orange-900",
    glow: "bg-red-700",
    dragBg: "bg-red-500/10",
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
    accent: "text-red-400",
  },
  received: {
    label: "Money In",
    sublabel: "Invoices you sent to clients",
    gradient: "from-emerald-800 via-teal-800 to-cyan-900",
    glow: "bg-emerald-700",
    dragBg: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    accent: "text-emerald-400",
  },
};

export function DropZone({ mode, isDragging, onDrop, onDragOver, onDragLeave, onFileInput }: DropZoneProps) {
  const c = CONFIG[mode];

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className="relative"
    >
      <div className={`absolute inset-0 rounded-3xl blur-3xl opacity-20 ${c.glow} -z-10 scale-105`} />
      <div className={`rounded-3xl p-[1.5px] bg-gradient-to-br ${c.gradient}`}>
        <label className={`cursor-pointer block rounded-[calc(1.5rem-1.5px)] bg-[#0f0a1a] px-4 py-10 text-center transition ${isDragging ? c.dragBg : "hover:bg-white/5"}`}>
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={onFileInput} className="hidden" />
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-4 ${c.iconBg}`}>
            <ArrowUpFromLine size={20} className={c.iconColor} />
          </div>
          <p className={`text-3xl font-bold ${c.accent} mb-1`}>{c.label}</p>
          <p className="text-sm text-gray-400 leading-relaxed">{c.sublabel}</p>
          <p className="text-sm text-gray-600 mt-3">Drop files or click to upload</p>
        </label>
      </div>
    </div>
  );
}
