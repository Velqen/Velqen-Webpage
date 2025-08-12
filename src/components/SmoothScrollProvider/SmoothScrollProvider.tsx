// components/SmoothScrollProvider.tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function SmoothScrollProvider() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/velqen")) return;
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Clean up
  }, [pathname]);

  return null; // No visible UI needed
}
