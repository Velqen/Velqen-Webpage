// components/FadingGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

interface FadingGridProps {
  displayCols: number;
  displayRows: number;
}

const FadingGrid: React.FC<FadingGridProps> = ({
  displayCols,
  displayRows,
}) => {
  const totalBoxes = displayCols * displayRows;
  const [grayIndexes, setGrayIndexes] = useState<number[]>([]);
  const { isSmallDevice } = useDeviceSize();
  // 🔧 Updated logic in useEffect
  useEffect(() => {
    const indexes: number[] = [];
    const centerX = Math.floor(displayCols / 2); // ✅ ensures integer centre
    const centerY = Math.floor(displayRows / 2);
    const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);

    while (indexes.length < 40) {
      // ⬅️ Increase number for more grey
      const x = Math.floor(Math.random() * displayCols);
      const y = Math.floor(Math.random() * displayRows);
      const index = y * displayCols + x;

      if (indexes.includes(index)) continue;

      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const bias = 1 - dist / maxDist;

      if (Math.random() < Math.pow(bias, 2)) {
        indexes.push(index);
      }
    }

    setGrayIndexes(indexes);
  }, [displayCols, displayRows]); // ⬅️ update dependency

  const getOpacity = (index: number) => {
    const x = index % displayCols;
    const y = Math.floor(index / displayCols);
    const centerX = Math.floor(displayCols / 2); // ✅ ensures integer centre
    const centerY = Math.floor(displayRows / 2);

    const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const shrinkFactor = isSmallDevice ? 0.12 : 0.065;
    const raw = 1 - dist * shrinkFactor;
    return Math.pow(Math.max(raw, 0), 2.5);
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none z-0"
      style={{
        transform: "translate(-50%, -50%)", // ✅ center grid exactly
        display: "grid",
        gridTemplateColumns: `repeat(${displayCols}, 1fr)`,
        gap: "0px",
        width: `${displayCols * 40}px`,
        height: `${displayRows * 40}px`,
      }}
    >
      {Array.from({ length: totalBoxes }).map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: grayIndexes.includes(i)
              ? "rgba(30, 30, 30, 0.20)"
              : "",
            border: "1px solid rgba(0, 0, 0, 0.20)",
            opacity: getOpacity(i),
            aspectRatio: "1",
            width: "100%",
          }}
        />
      ))}
    </div>
  );
};

export default FadingGrid;
