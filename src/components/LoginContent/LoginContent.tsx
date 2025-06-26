"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

export default function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { isSmallDevice } = useDeviceSize();

  return isSmallDevice ? (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <a
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-white text-lg underline hover:text-velqen-orange"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Homepage
      </a>
      <Image
        src="/Velqen_no_bg_logo.png"
        alt="Velqen Logo"
        width={150}
        height={150}
        className="mb-4 rounded-full"
        priority
      />
      <h1 className="text-5xl font-bold mb-2 text-center">Welcome to Velqen</h1>
      <p className="text-gray-400 mb-6 text-xl text-center">
        Sign in to access your financial AI assistant
      </p>

      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition text-xl"
      >
        Sign in with Google
      </button>

      <footer className="text-lg text-gray-500 mt-8">
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
      </footer>
    </main>
  ) : (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <a
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-white text-lg underline hover:text-velqen-orange"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Homepage
      </a>
      <Image
        src="/Velqen_no_bg_logo.png"
        alt="Velqen Logo"
        width={200}
        height={200}
        className="mb-4 rounded-full"
        priority
      />
      <h1 className="text-5xl font-bold mb-2">Welcome to Velqen</h1>
      <p className="text-gray-400 mb-6 text-xl">
        Sign in to access your financial AI assistant
      </p>

      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition text-2xl"
      >
        Sign in with Google
      </button>

      <footer className="text-lg text-gray-500 mt-8">
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
      </footer>
    </main>
  );
}
