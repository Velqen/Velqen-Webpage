"use client";
export const dynamic = "force-dynamic";

import LoginContent from "@/components/LoginContent/LoginContent";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginContent />
    </Suspense>
  );
}
