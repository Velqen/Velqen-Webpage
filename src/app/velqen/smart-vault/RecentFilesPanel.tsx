import { Loader2, CheckCircle2, AlertCircle, File, Database, TrendingUp, TrendingDown, Send, TriangleAlert } from "lucide-react";
import { FileStatus } from "./useSmartVault";

type RecentFilesPanelProps = {
  files: FileStatus[];
  onConfirm: (fileName: string) => void;
};

export function RecentFilesPanel({ files, onConfirm }: RecentFilesPanelProps) {
  return (
    <div className="bg-[#0f0a1a] border border-white/10 rounded-3xl p-5 min-h-[300px]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white">Processed Documents</h3>
        {files.length > 0 && (
          <span className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2.5 py-0.5 rounded-full">
            {files.length} file{files.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {files.length === 0 ? <EmptyState /> : (
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {files.map((file, idx) => <FileCard key={idx} file={file} onConfirm={onConfirm} />)}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
        <File size={20} className="text-gray-600" />
      </div>
      <p className="text-sm text-gray-400 font-medium">No documents yet</p>
      <p className="text-xs text-gray-600 mt-1">Upload a receipt or invoice to get started</p>
    </div>
  );
}

const DOC_BADGE: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  invoice: { label: "Invoice",  cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: <TrendingUp size={10} /> },
  bill:    { label: "Bill",     cls: "text-red-400 bg-red-400/10 border-red-400/20",             icon: <TrendingDown size={10} /> },
  expense: { label: "Expense",  cls: "text-orange-400 bg-orange-400/10 border-orange-400/20",    icon: <TrendingDown size={10} /> },
  unknown: { label: "Unknown",  cls: "text-gray-400 bg-gray-400/10 border-gray-400/20",          icon: null },
};

function FileCard({ file, onConfirm }: { file: FileStatus; onConfirm: (name: string) => void }) {
  const c = file.classified as Record<string, string | number | null | undefined> | undefined;
  const docType = (c?.document_type ?? "unknown") as string;
  const badge = DOC_BADGE[docType] ?? DOC_BADGE.unknown;
  const isIncome = docType === "invoice";

  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-4 space-y-3">

      {/* File name + status */}
      <div className="flex items-center gap-2.5">
        <StatusIcon status={file.status} />
        <span className="text-base text-white truncate flex-1 font-medium">{file.name}</span>
      </div>

      {file.status === "processing" && (
        <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-fuchsia-500 animate-pulse rounded-full" />
        </div>
      )}

      {file.status === "complete" && c && (
        <>
          {/* Amount — big and prominent */}
          {c.amount_rm != null && (
            <div className={`text-2xl font-light ${isIncome ? "text-emerald-400" : "text-red-400"}`}>
              {isIncome ? "+" : "−"}RM {Number(c.amount_rm).toLocaleString()}
            </div>
          )}

          {/* Type badge + merchant */}
          <div className="flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-0.5 rounded-full border ${badge.cls}`}>
              {badge.icon}{badge.label}
            </span>
            {c.merchant_name && (
              <span className="text-sm text-gray-400 truncate">{c.merchant_name as string}</span>
            )}
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {c.date           && <Row label="Date"     value={c.date as string} />}
            {c.invoice_number && <Row label="Ref"      value={c.invoice_number as string} />}
            {c.sub_category   && <Row label="Category" value={c.sub_category as string} />}
            {c.detailed_category && <Row label="Account" value={c.detailed_category as string} />}
          </div>

          {/* Warnings */}
          {file.zoho_flags && file.zoho_flags.length > 0 && (
            <div className="space-y-1">
              {file.zoho_flags.map((flag, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-yellow-400 bg-yellow-400/5 rounded-lg px-2.5 py-1.5">
                  <TriangleAlert size={10} className="shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          )}
          {file.zoho_error && (
            <div className="flex items-start gap-1.5 text-xs text-red-400 bg-red-400/5 rounded-lg px-2.5 py-1.5">
              <AlertCircle size={10} className="shrink-0 mt-0.5" />
              <span>{file.zoho_error}</span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            {file.stored && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Database size={10} />
                <span>Saved</span>
              </div>
            )}
            {file.zoho_posted ? (
              <div className="flex items-center gap-1.5 ml-auto text-xs text-emerald-400">
                <CheckCircle2 size={12} />
                <span>Posted to Zoho</span>
              </div>
            ) : (
              <button
                onClick={() => onConfirm(file.name)}
                disabled={file.zoho_posting}
                className="ml-auto flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 transition disabled:opacity-40"
              >
                {file.zoho_posting
                  ? <><Loader2 size={10} className="animate-spin" />Posting…</>
                  : <><Send size={10} /></>}
              </button>
            )}
          </div>
        </>
      )}

      {file.status === "error" && (
        <p className="text-sm text-red-400 bg-red-400/5 rounded-lg px-3 py-2">{file.error ?? "Processing failed"}</p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-600 text-xs uppercase tracking-wider">{label}</span>
      <span className="text-gray-300 truncate">{value}</span>
    </div>
  );
}

function StatusIcon({ status }: { status: FileStatus["status"] }) {
  if (status === "complete")   return <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />;
  if (status === "processing") return <Loader2 size={16} className="animate-spin text-fuchsia-400 shrink-0" />;
  return <AlertCircle size={16} className="text-red-400 shrink-0" />;
}
