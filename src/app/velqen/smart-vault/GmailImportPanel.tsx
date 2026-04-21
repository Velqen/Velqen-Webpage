"use client";

import { useState } from "react";
import { Mail, Paperclip, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { FileStatus } from "./useSmartVault";

type Attachment = {
  attachmentId: string;
  filename: string;
  size: number;
  mimeType: string;
};

type EmailItem = {
  id: string;
  subject: string;
  from: string;
  date: string;
  attachments: Attachment[];
};

type Props = {
  onImported: (files: FileStatus[]) => void;
};

function formatDate(raw: string) {
  try {
    return new Date(raw).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return raw;
  }
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function GmailImportPanel({ onImported }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [importing, setImporting] = useState<Record<string, boolean>>({});

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gmail/fetch-emails");
      const data = await res.json();
      setEmails(data.emails ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next && emails.length === 0) fetchEmails();
  };

  const importAttachment = async (
    email: EmailItem,
    attachment: Attachment,
    documentType: "invoice" | "bill"
  ) => {
    const key = `${email.id}-${attachment.attachmentId}`;
    setImporting((prev) => ({ ...prev, [key]: true }));

    // Add processing placeholder immediately
    onImported([{
      name: attachment.filename,
      status: "processing",
      mode: documentType === "invoice" ? "received" : "paid",
      icon: attachment.filename.endsWith(".pdf") ? "PDF" : "IMG",
    }]);

    try {
      const res = await fetch("/api/smartVault/from-gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: email.id,
          attachmentId: attachment.attachmentId,
          filename: attachment.filename,
          documentType,
        }),
      });
      const data = await res.json();

      const result = data.results?.find(
        (r: { fileName: string }) => r.fileName === attachment.filename
      );

      onImported([{
        name: attachment.filename,
        status: result?.status === "success" ? "complete" : "error",
        mode: documentType === "invoice" ? "received" : "paid",
        icon: attachment.filename.endsWith(".pdf") ? "PDF" : "IMG",
        transaction_id: result?.data?.transaction_id,
        classified: result?.data?.classified,
        stored: result?.data?.stored,
        error: result?.error ?? (res.ok ? undefined : data.error),
      }]);
    } catch {
      onImported([{
        name: attachment.filename,
        status: "error",
        mode: documentType === "invoice" ? "received" : "paid",
        icon: attachment.filename.endsWith(".pdf") ? "PDF" : "IMG",
        error: "Import failed",
      }]);
    } finally {
      setImporting((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-white/10 flex items-center justify-center">
            <Mail size={15} className="text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">Import from Gmail</p>
            <p className="text-xs text-gray-400">Fetch invoice & receipt emails</p>
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>

      {open && (
        <div className="border-t border-white/10 px-5 py-4 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={18} className="animate-spin text-blue-400" />
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs text-gray-400">No invoice emails found</p>
              <button
                onClick={fetchEmails}
                className="mt-3 text-xs text-blue-400 hover:text-blue-300 transition"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{emails.length} email{emails.length !== 1 ? "s" : ""} found</span>
                <button onClick={fetchEmails} className="text-xs text-blue-400 hover:text-blue-300 transition">
                  Refresh
                </button>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {emails.map((email) => (
                  <EmailRow
                    key={email.id}
                    email={email}
                    importing={importing}
                    onImport={importAttachment}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function EmailRow({
  email,
  importing,
  onImport,
}: {
  email: EmailItem;
  importing: Record<string, boolean>;
  onImport: (email: EmailItem, attachment: Attachment, type: "invoice" | "bill") => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const senderName = email.from.replace(/<.*>/, "").trim() || email.from;

  return (
    <div className="bg-gray-900/60 border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-start gap-3 p-3 hover:bg-white/5 transition text-left"
      >
        <Mail size={13} className="text-gray-500 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{email.subject}</p>
          <p className="text-xs text-gray-500 truncate">{senderName} · {formatDate(email.date)}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Paperclip size={11} className="text-gray-500" />
          <span className="text-xs text-gray-500">{email.attachments.length}</span>
          {expanded ? <ChevronUp size={12} className="text-gray-600" /> : <ChevronDown size={12} className="text-gray-600" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/5 px-3 py-2 space-y-2">
          {email.attachments.map((att) => {
            const key = `${email.id}-${att.attachmentId}`;
            const isImporting = importing[key];
            const isPdf = att.filename.toLowerCase().endsWith(".pdf");
            const isImage = /\.(jpe?g|png)$/i.test(att.filename);
            const supported = isPdf || isImage;

            return (
              <div key={att.attachmentId} className="flex items-center gap-2">
                <Paperclip size={11} className="text-gray-600 shrink-0" />
                <span className="text-xs text-gray-300 truncate flex-1">{att.filename}</span>
                <span className="text-xs text-gray-600 shrink-0">{formatSize(att.size)}</span>
                {supported ? (
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => onImport(email, att, "bill")}
                      disabled={isImporting}
                      className="text-xs px-2 py-1 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition disabled:opacity-40"
                    >
                      {isImporting ? <Loader2 size={10} className="animate-spin" /> : "Bill"}
                    </button>
                    <button
                      onClick={() => onImport(email, att, "invoice")}
                      disabled={isImporting}
                      className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition disabled:opacity-40"
                    >
                      {isImporting ? <Loader2 size={10} className="animate-spin" /> : "Invoice"}
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-gray-600 shrink-0">unsupported</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
