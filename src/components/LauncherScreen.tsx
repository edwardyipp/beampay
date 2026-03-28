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
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* ===== Splash Logo ===== */}
      <div
        className={cn(
          "absolute inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700",
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
                background: `radial-gradient(circle, var(--color-neon-300) 0%, transparent 70%)`,
                filter: "blur(80px)",
              }}
            />

            {/* Floating BalanceCard */}
            <div className="relative w-full max-w-[340px] launcher-card-float">
              <BalanceCard demo demoBalance={2450} demoCurrency="USD" />
            </div>
          </div>

          {/* Bottom content — tagline + CTA */}
          <div className="flex flex-col items-center px-6 pb-10 launcher-cta-fade">
            <div className="w-full max-w-[340px]">
              {/* Tagline */}
              <div className="mb-8">
                <p className="text-muted-foreground text-base leading-relaxed">
                  Your digital wallet for instant transfers,
                  <br />
                  easy top-ups, and secure payments.
                </p>
                <h1 className="mt-2 text-4xl font-bold leading-tight">
                  <span
                    style={{
                      background: `linear-gradient(90deg, var(--color-neon-300), var(--color-neon-400))`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Pay anyone, instantly.
                  </span>
                </h1>
              </div>

              {/* CTA buttons */}
              <div className="w-full space-y-3">
                <Button
                  onClick={onCreateAccount}
                  size="lg"
                  className="w-full"
                >
                  Create new account
                </Button>
                <Button
                  onClick={onLogin}
                  variant="ghost"
                  size="md"
                  className="w-full"
                >
                  I already have account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
