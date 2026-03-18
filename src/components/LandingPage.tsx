"use client";

import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Mail } from "lucide-react";

export function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background visual — abstract wallet illustration */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Glowing orb effect */}
        <div
          className="absolute w-[340px] h-[340px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, oklch(0.93 0.26 122.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Card stack visual */}
        <div className="relative w-[280px] h-[180px]">
          {/* Back card */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              transform: "rotate(-6deg) translateY(-8px) scale(0.95)",
            }}
          />
          {/* Middle card */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #333 0%, #222 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              transform: "rotate(-2deg) translateY(-4px) scale(0.98)",
            }}
          />
          {/* Front card — lime gradient like BalanceCard */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col justify-between p-5"
            style={{
              background:
                "linear-gradient(135deg, #D9FF51 0%, #81B700 100%)",
              boxShadow: "0 20px 60px rgba(129, 183, 0, 0.25)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[#1a2e00] font-bold text-sm tracking-wide">
                BeamPay
              </span>
              <div className="flex gap-1">
                <div className="w-6 h-4 rounded-sm bg-[#1a2e00]/20" />
                <div className="w-4 h-4 rounded-full bg-[#1a2e00]/20" />
              </div>
            </div>
            <div>
              <p className="text-[#1a2e00]/60 text-xs font-medium">Balance</p>
              <p className="text-[#1a2e00] font-bold text-2xl">$2,450.00</p>
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-8 rounded-full bg-[#1a2e00]/20" />
              <div className="h-1.5 w-8 rounded-full bg-[#1a2e00]/20" />
              <div className="h-1.5 w-8 rounded-full bg-[#1a2e00]/20" />
              <div className="h-1.5 w-12 rounded-full bg-[#1a2e00]/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="px-6 pb-10">
        {/* Tagline */}
        <div className="mb-8">
          <p className="text-[#999] text-base leading-relaxed">
            Your digital wallet for instant transfers,
            <br />
            easy top-ups, and secure payments.
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-tight">
            <span
              style={{
                background: "linear-gradient(90deg, #D9FF51, #A6E500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pay anyone, instantly.
            </span>
          </h1>
        </div>

        {/* CTA — pill button */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/login")}
            className="w-full h-14 rounded-full bg-white text-[#0a0a0a] font-semibold text-lg flex items-center justify-center gap-2.5 transition-all duration-150 hover:scale-[1.01] hover:opacity-90 hover:shadow-lg active:scale-95 active:opacity-80 active:shadow-none"
          >
            <Mail className="w-5 h-5" />
            Sign in with Email
          </button>
          <p className="text-center text-[#666] text-xs">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/login?signup=true")}
              className="text-white font-medium hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
