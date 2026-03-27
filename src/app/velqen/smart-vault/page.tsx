"use client";

import { useSmartVault } from "./useSmartVault";
import { PageHeader } from "./PageHeader";
import { DropZone } from "./DropZone";
import { RecentFilesPanel } from "./RecentFilesPanel";

export default function SmartVaultPage() {
  const { isDraggingPaid, isDraggingReceived, files, paidHandlers, receivedHandlers, handleConfirm } = useSmartVault();

  return (
    <div className="p-6 px-10 space-y-6">
      <PageHeader />
      <div className="grid grid-cols-2 gap-4">
        <DropZone mode="paid" isDragging={isDraggingPaid} {...paidHandlers} />
        <DropZone mode="received" isDragging={isDraggingReceived} {...receivedHandlers} />
      </div>
      <RecentFilesPanel files={files} onConfirm={handleConfirm} />
    </div>
  );
}
