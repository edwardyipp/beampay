"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BalanceCard } from "@/components/BalanceCard";
import { cn } from "@/lib/utils";

interface LauncherScreenProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}

type LauncherPhase = "splash" | "main";

export function LauncherScreen({ onCreateAccount, onLogin }: LauncherScreenProps) {
  const [phase, setPhase] = useState<LauncherPhase>("splash");

  // Minimum 2s splash then transition to main
  useEffect(() => {
    const timer = setTimeout(() => setPhase("main"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* ===== Splash Logo ===== */}
      <div
        className={cn(
          "absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-700",
          phase === "splash" ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <img
          src="/logo-beampay-neon.svg"
          alt="BeamPay"
          className="w-48 h-auto"
        />
      </div>

      {/* ===== Main content ===== */}
      {phase !== "splash" && (
        <div className="absolute inset-0 flex flex-col">
          {/* Card area — centered with lime glow behind */}
          <div className="flex-1 relative flex items-center justify-center px-6">
            {/* Glowing orb */}
            <div
              className="absolute w-[380px] h-[380px] rounded-full opacity-25 launcher-glow"
              style={{
                background: "radial-gradient(circle, oklch(0.93 0.26 122.4) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />

            {/* Floating BalanceCard */}
            <div className="relative w-full max-w-[340px] launcher-card-float">
              <BalanceCard demo demoBalance={2450} demoCurrency="USD" />
            </div>
          </div>

          {/* Bottom content — tagline + CTA */}
          <div className="px-6 pb-10 launcher-cta-fade">
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

            {/* CTA buttons */}
            <div className="w-full max-w-md space-y-3">
              <Button
                onClick={onCreateAccount}
                className="w-full h-14 text-base font-semibold rounded-full bg-white text-[#0a0a0a] hover:bg-white/90"
              >
                Create new account
              </Button>
              <button
                onClick={onLogin}
                className="w-full h-12 text-base font-medium text-[#999] hover:text-white transition-colors"
              >
                I already have account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
