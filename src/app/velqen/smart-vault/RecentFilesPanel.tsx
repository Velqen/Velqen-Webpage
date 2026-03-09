import { Loader2, CheckCircle2, AlertCircle, File, Database } from "lucide-react";
import { FileStatus } from "./useSmartVault";

type RecentFilesPanelProps = {
  files: FileStatus[];
};

export function RecentFilesPanel({ files }: RecentFilesPanelProps) {
  return (
    <div className="sticky top-8 bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
        <div className="w-2 h-2 rounded-full bg-velqen-green animate-pulse"></div>
      </div>

      {files.length === 0 ? (
        <EmptyState />
      ) : (
        <FileList files={files} />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
        <File className="text-velqen-light-gray" size={32} />
      </div>
      <p className="text-sm text-velqen-light-gray">No files uploaded yet</p>
      <p className="text-xs text-velqen-gray mt-1">Drop files to get started</p>
    </div>
  );
}

function FileList({ files }: { files: FileStatus[] }) {
  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {files.map((file, idx) => (
        <FileCard key={idx} file={file} />
      ))}
    </div>
  );
}

function FileCard({ file }: { file: FileStatus }) {
  const statusConfig = {
    complete: {
      bgClass: "bg-velqen-green/20 text-velqen-green",
      icon: <CheckCircle2 size={14} className="text-velqen-green" />,
      text: "Complete",
      textColor: "text-velqen-green",
    },
    processing: {
      bgClass: "bg-velqen-orange/20 text-velqen-orange",
      icon: <Loader2 size={14} className="animate-spin text-velqen-orange" />,
      text: "Processing...",
      textColor: "text-velqen-orange",
    },
    error: {
      bgClass: "bg-red-500/20 text-red-400",
      icon: <AlertCircle size={14} className="text-red-400" />,
      text: "Failed",
      textColor: "text-red-400",
    },
  };

  const status = statusConfig[file.status];

  return (
    <div className="group relative overflow-hidden bg-gray-900/90 rounded-2xl border border-gray-800 hover:border-gray-700 p-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${status.bgClass}`}
        >
          {file.icon}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate mb-1 text-white">{file.name}</h4>
          <p className="text-xs text-velqen-light-gray mb-2">{file.type}</p>

          <div className="flex items-center gap-2">
            {status.icon}
            <span className={`text-xs ${status.textColor} font-medium`}>
              {status.text}
            </span>
          </div>
        </div>
      </div>

      {file.status === "processing" && <ProgressBar />}

      {file.status === "complete" && file.classified && (
        <div className="mt-3 pt-3 border-t border-gray-800 space-y-1.5">
          <DetailRow label="Description" value={file.classified.Transaction_Description as string} />
          <DetailRow label="Amount" value={file.classified.Amount_RM != null ? `RM ${file.classified.Amount_RM}` : undefined} />
          <DetailRow label="Merchant" value={file.classified.Merchant_Name as string} />
          <DetailRow label="Category" value={file.classified.Main_Category as string} />
          <DetailRow label="Subcategory" value={file.classified.Sub_Category as string} />

          {file.stored && (
            <div className="flex items-center gap-1.5 mt-2">
              <Database size={12} className="text-velqen-green" />
              <span className="text-xs text-velqen-green font-medium">Saved to database</span>
            </div>
          )}
        </div>
      )}

      {file.status === "error" && file.error && (
        <p className="mt-2 text-xs text-red-400 truncate">{file.error}</p>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-xs">
      <span className="text-velqen-gray">{label}</span>
      <span className="text-velqen-light-gray font-medium truncate ml-2 max-w-[60%] text-right">{value}</span>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="mt-3 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full bg-velqen-orange animate-pulse rounded-full w-2/3"></div>
    </div>
  );
}
