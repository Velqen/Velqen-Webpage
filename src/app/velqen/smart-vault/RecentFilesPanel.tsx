import { Loader2, CheckCircle2, AlertCircle, File, Database, TrendingUp, TrendingDown, Send, TriangleAlert } from "lucide-react";
import { FileStatus } from "./useSmartVault";

type RecentFilesPanelProps = {
  files: FileStatus[];
  onConfirm: (fileName: string) => void;
};

export function RecentFilesPanel({ files, onConfirm }: RecentFilesPanelProps) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Activity</h3>
        {files.length > 0 && (
          <span className="text-xs text-gray-300">{files.length} file{files.length !== 1 ? "s" : ""}</span>
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
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center mb-3">
        <File size={18} className="text-gray-600" />
      </div>
      <p className="text-xs text-gray-300">No files yet</p>
    </div>
  );
}

const DOC_BADGE: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  invoice: { label: "Invoice", cls: "text-emerald-400 bg-emerald-400/10",  icon: <TrendingUp size={10} /> },
  bill:    { label: "Bill",    cls: "text-red-400 bg-red-400/10",          icon: <TrendingDown size={10} /> },
  expense: { label: "Expense", cls: "text-orange-400 bg-orange-400/10",    icon: <TrendingDown size={10} /> },
  unknown: { label: "Unknown", cls: "text-gray-400 bg-gray-400/10",        icon: null },
};

function FileCard({ file, onConfirm }: { file: FileStatus; onConfirm: (name: string) => void }) {
  const c = file.classified as Record<string, string | number | null | undefined> | undefined;
  const docType = (c?.document_type ?? "unknown") as string;
  const badge = DOC_BADGE[docType] ?? DOC_BADGE.unknown;
  const isIncome = docType === "invoice";

  return (
    <div className="bg-gray-900/60 border border-white/5 rounded-xl p-4 space-y-3">

      {/* File name + status */}
      <div className="flex items-center gap-2">
        <StatusIcon status={file.status} />
        <span className="text-xs text-white truncate flex-1">{file.name}</span>
      </div>

      {file.status === "processing" && (
        <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-orange-500 animate-pulse rounded-full" />
        </div>
      )}

      {file.status === "complete" && c && (
        <>
          {/* Type + Amount */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${badge.cls}`}>
              {badge.icon}{badge.label}
            </span>
            {c.amount_rm != null && (
              <span className={`text-sm font-semibold ${isIncome ? "text-emerald-400" : "text-red-400"}`}>
                {isIncome ? "+" : "-"}RM {Number(c.amount_rm).toLocaleString()}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-1.5 text-xs">
            {c.merchant_name   && <Row label="From / To"   value={c.merchant_name as string} />}
            {c.date            && <Row label="Date"         value={c.date as string} />}
            {c.invoice_number  && <Row label="Ref"          value={c.invoice_number as string} />}
            {c.sub_category    && <Row label="Category"     value={c.sub_category as string} />}
            {c.detailed_category && <Row label="Account"   value={c.detailed_category as string} />}
          </div>

          {/* Confidence — hidden for now, re-enable when review queue is built
          {confidence != null && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    confidence >= 0.8 ? "bg-emerald-400" : confidence >= 0.5 ? "bg-yellow-400" : "bg-red-400"
                  }`}
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{Math.round(confidence * 100)}%</span>
            </div>
          )} */}

          {/* Footer */}
          {/* Zoho flags */}
          {file.zoho_flags && file.zoho_flags.length > 0 && (
            <div className="space-y-1">
              {file.zoho_flags.map((flag, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-yellow-400">
                  <TriangleAlert size={10} className="shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Zoho error */}
          {file.zoho_error && (
            <div className="flex items-start gap-1.5 text-xs text-red-400">
              <AlertCircle size={10} className="shrink-0 mt-0.5" />
              <span>{file.zoho_error}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            {file.stored && (
              <div className="flex items-center gap-1">
                <Database size={10} className="text-gray-300" />
                <span className="text-xs text-gray-300">Saved</span>
              </div>
            )}
            {file.zoho_posted ? (
              <div className="flex items-center gap-1 ml-auto">
                <CheckCircle2 size={11} className="text-emerald-400" />
                <span className="text-xs text-emerald-400">Posted to Zoho</span>
              </div>
            ) : (
              <button
                onClick={() => onConfirm(file.name)}
                disabled={file.zoho_posting}
                className="ml-auto flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/20 transition disabled:opacity-40"
              >
                {file.zoho_posting
                  ? <><Loader2 size={10} className="animate-spin" />Posting…</>
                  : <><Send size={10} />Post to Zoho</>}
              </button>
            )}
          </div>
        </>
      )}

      {file.status === "error" && (
        <p className="text-xs text-red-400">{file.error ?? "Processing failed"}</p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-200 shrink-0">{label}</span>
      <span className="text-white text-right truncate">{value}</span>
    </div>
  );
}

function StatusIcon({ status }: { status: FileStatus["status"] }) {
  if (status === "complete")   return <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />;
  if (status === "processing") return <Loader2 size={13} className="animate-spin text-orange-400 shrink-0" />;
  return <AlertCircle size={13} className="text-red-400 shrink-0" />;
}
