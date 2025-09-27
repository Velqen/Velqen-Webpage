"use client";

import { usePathname } from "next/navigation";
import NavBar from "../components/NavBar/NavBar";
import Footer from "./Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider/SmoothScrollProvider";

const BLACK_PAGES = ["/about-us"];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBlackPage = BLACK_PAGES.includes(pathname);

  return (
    <SmoothScrollProvider>
      <div
        className={
          isBlackPage
            ? "bg-black text-white min-h-screen"
            : "bg-white text-black min-h-screen"
        }
      >
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
