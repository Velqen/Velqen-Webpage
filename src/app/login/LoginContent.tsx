"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, FileText, BarChart2, RefreshCw, Zap } from "lucide-react";
import Link from "next/link";
import Particles from "@/components/Animations/Particles";

const features = [
  {
    icon: FileText,
    label: "Invoice Extraction",
    desc: "Scan & extract key fields from any invoice instantly",
  },
  {
    icon: BarChart2,
    label: "Transaction Classification",
    desc: "Auto-categorise transactions with trained ML models",
  },
  {
    icon: RefreshCw,
    label: "Record Reconciliation",
    desc: "Match and reconcile records across documents",
  },
  {
    icon: Zap,
    label: "Smart Vault",
    desc: "Upload, process & store documents in one step",
  },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <main className="min-h-screen bg-black flex overflow-hidden">
      {/* ── LEFT: Brand panel (desktop only) ── */}
      <div className="hidden lg:flex flex-col w-[58%] relative overflow-hidden bg-[#060606]">
        {/* Particle field */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={130}
            particleSpread={10}
            speed={0.05}
            particleColors={["#fd491c", "#ffa618", "#ffffff", "#ff7340"]}
            alphaParticles
            particleBaseSize={70}
            sizeRandomness={0.9}
            cameraDistance={22}
          />
        </div>

        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Orange radial glow */}
        <div
          className="absolute z-0 pointer-events-none"
          style={{
            top: "40%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(253,73,28,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12 justify-between">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/Velqen_no_bg_logo.png"
                alt="Velqen"
                width={36}
                height={36}
                priority
              />
              <span className="text-white text-lg font-bold tracking-tight">
                Velqen
              </span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-gray-500 hover:text-white text-sm transition-colors duration-200"
            >
              <ArrowLeft size={13} />
              Back to home
            </Link>
          </div>

          {/* Hero copy */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-velqen-orange font-semibold mb-5">
              AI-powered finance
            </p>
            <h1 className="text-[2.8rem] leading-[1.15] font-bold text-white mb-4">
              Your financial data,
              <br />
              <span className="velqen-gradient-text">
                intelligently automated.
              </span>
            </h1>
            <p className="text-gray-500 text-base mb-12 max-w-md leading-relaxed">
              Extract, classify, and manage invoices and transactions — all
              in one unified workspace.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-5">
              {features.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4 group">
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-velqen-orange/30 group-hover:bg-white/[0.07] transition-all duration-200">
                    <Icon size={14} className="text-velqen-orange" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium leading-tight">
                      {label}
                    </p>
                    <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom legal */}
          <div className="flex gap-5 text-xs text-gray-700">
            <Link
              href="/privacy-policy"
              className="hover:text-gray-400 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-gray-400 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Sign-in card ── */}
      <div className="flex flex-1 items-center justify-center p-6 relative bg-[#0a0a0a]">
        {/* Mobile: back link */}
        <Link
          href="/"
          className="lg:hidden absolute top-5 left-5 flex items-center gap-1.5 text-gray-500 hover:text-white text-sm transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <div className="w-full max-w-[340px] flex flex-col items-center">
          {/* Mobile: logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <Image
              src="/Velqen_no_bg_logo.png"
              alt="Velqen"
              width={30}
              height={30}
              priority
            />
            <span className="text-white text-lg font-bold tracking-tight">
              Velqen
            </span>
          </div>

          {/* Card */}
          <div className="w-full rounded-2xl bg-[#1a1a1a] border border-white/[0.12] p-8 shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)]">
            {/* Orange accent bar */}
            <div className="w-8 h-[2px] rounded-full mb-7 bg-gradient-to-r from-[#fd491c] to-[#ffa618]" />

            <h2 className="text-[1.6rem] font-bold text-white leading-tight mb-1">
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Sign in to access your Velqen dashboard
            </p>

            {/* Google sign-in button */}
            <button
              onClick={() => signIn("google", { callbackUrl })}
              className="group w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-medium px-5 py-[11px] rounded-xl text-sm transition-all duration-150 shadow-sm"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-gray-700 text-[11px] tracking-wide uppercase">
                Secure sign in
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {["End-to-end encrypted", "No passwords stored"].map((t) => (
                <span
                  key={t}
                  className="text-[10px] text-gray-600 bg-white/[0.03] border border-white/[0.06] rounded-full px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Terms */}
            <p className="text-center text-[11px] text-gray-700 mt-6 leading-relaxed">
              By signing in, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="text-gray-500 hover:text-white transition-colors underline underline-offset-2"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-white transition-colors underline underline-offset-2"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Mobile footer links */}
          <div className="lg:hidden flex gap-5 text-xs text-gray-700 mt-8">
            <Link
              href="/privacy-policy"
              className="hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-gray-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
