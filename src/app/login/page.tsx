"use client";
import Image from "next/image"; // ✅ Import Image
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <Image
        src="/Velqen_no_bg_logo.png"
        alt="Velqen Logo"
        width={100}
        height={100}
        className="mb-4 rounded-full"
        priority
      />
      <h1 className="text-3xl font-bold mb-2">Welcome to Velqen</h1>
      <p className="text-gray-400 mb-6 text-sm">
        Sign in to access your financial AI assistant
      </p>

      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
      >
        Sign in with Google
      </button>

      <footer className="text-xs text-gray-500 mt-8">
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
      </footer>
    </main>
  );
}
