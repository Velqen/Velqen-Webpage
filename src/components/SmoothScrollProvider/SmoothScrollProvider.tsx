// components/SmoothScrollProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
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

    return () => lenis.destroy();
  }, [pathname]);

  return <>{children}</>; // Render children
}
