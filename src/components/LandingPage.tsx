"use client";

import { useRouter } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";

export function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background visual — abstract wallet illustration */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Glowing orb effect */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-25 animate-pulse"
          style={{
            background:
              "radial-gradient(circle, oklch(0.93 0.26 122.4) 0%, transparent 70%)",
            filter: "blur(90px)",
            animationDuration: "4s",
          }}
        />

        {/* Card stack visual */}
        <div
          className="relative w-[280px] h-[180px]"
          style={{
            animation: "float 6s ease-in-out infinite",
          }}
        >
          {/* Back card */}
          <div
            className="absolute inset-0 rounded-2xl transition-transform duration-700"
            style={{
              background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              transform: "rotate(-6deg) translateY(-8px) scale(0.92)",
            }}
          />
          {/* Middle card */}
          <div
            className="absolute inset-0 rounded-2xl transition-transform duration-700"
            style={{
              background: "linear-gradient(135deg, #333 0%, #222 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              transform: "rotate(-3deg) translateY(-4px) scale(0.96)",
            }}
          />
          {/* Front card — lime gradient like BalanceCard */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col justify-between p-5"
            style={{
              background:
                "linear-gradient(135deg, #D9FF51 0%, #81B700 100%)",
              boxShadow:
                "0 20px 60px rgba(129, 183, 0, 0.3), 0 0 120px rgba(129, 183, 0, 0.1)",
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
      <div className="px-6 pb-10 space-y-8">
        {/* Tagline */}
        <div>
          <p className="text-[#888] text-[15px] leading-relaxed">
            Your digital wallet for instant transfers,
            <br />
            easy top-ups, and secure payments.
          </p>
          <h1 className="mt-2 text-[32px] font-bold leading-tight tracking-tight">
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

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/login")}
            className="w-full h-[52px] rounded-full bg-white text-[#0a0a0a] font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-150 hover:scale-[1.01] hover:opacity-90 hover:shadow-lg active:scale-[0.98] active:opacity-80 active:shadow-none"
          >
            <Mail className="w-[18px] h-[18px]" />
            Sign in with Email
          </button>
          <button
            onClick={() => router.push("/login?signup=true")}
            className="w-full h-[52px] rounded-full bg-transparent text-white font-semibold text-[15px] flex items-center justify-center gap-2 border border-white/20 transition-all duration-150 hover:bg-white/5 hover:border-white/30 active:scale-[0.98]"
          >
            Create an account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Float animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
