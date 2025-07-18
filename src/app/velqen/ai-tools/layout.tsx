// app/velqen/ai-tools/layout.tsx
"use client";

import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function AiToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSmallDevice } = useDeviceSize();

  return (
    <div className={` ${isSmallDevice ? "pt-14 " : ""} p-6 px-10`}>
      {children}
    </div>
  );
}
