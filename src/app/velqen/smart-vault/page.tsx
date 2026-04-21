"use client";

import { useSmartVault } from "./useSmartVault";
import { PageHeader } from "./PageHeader";
import { DropZone } from "./DropZone";
import { RecentFilesPanel } from "./RecentFilesPanel";
import { GmailImportPanel } from "./GmailImportPanel";

export default function SmartVaultPage() {
  const { isDraggingPaid, isDraggingReceived, files, addFiles, paidHandlers, receivedHandlers, handleConfirm } = useSmartVault();

  return (
    <div className="min-h-screen px-6 sm:px-10 py-8 flex flex-col gap-6">
      <PageHeader />

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left — upload methods */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            <DropZone mode="paid"     isDragging={isDraggingPaid}     {...paidHandlers} />
            <DropZone mode="received" isDragging={isDraggingReceived} {...receivedHandlers} />
          </div>
          <GmailImportPanel onImported={addFiles} />
        </div>

        {/* Right — live activity */}
        <div className="w-full lg:w-1/2">
          <RecentFilesPanel files={files} onConfirm={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
