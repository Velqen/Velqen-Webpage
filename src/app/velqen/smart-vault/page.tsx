"use client";

import { useSmartVault } from "./useSmartVault";
import { PageHeader } from "./PageHeader";
import { DropZone } from "./DropZone";
import { FeatureCards } from "./FeatureCards";
import { RecentFilesPanel } from "./RecentFilesPanel";
import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function SmartVaultPage() {
  const { isSmallDevice } = useDeviceSize();
  const {
    isDragging,
    files,
    handleDrop,
    handleFileInput,
    handleDragOver,
    handleDragLeave,
  } = useSmartVault();

  return (
    <div className={`${isSmallDevice ? "pt-14 p-6" : "p-8"}`}>
      <div className="max-w-7xl mx-auto">
        <PageHeader />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DropZone
              isDragging={isDragging}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onFileInput={handleFileInput}
            />
            <FeatureCards />
          </div>

          <div className="lg:col-span-1">
            <RecentFilesPanel files={files} />
          </div>
        </div>
      </div>
    </div>
  );
}
