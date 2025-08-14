"use client";
export const dynamic = "force-dynamic";

import LoginContent from "@/app/login/LoginContent";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginContent />
    </Suspense>
  );
}
