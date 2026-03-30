"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BalanceCard } from "@/components/BalanceCard";
import { cn } from "@/lib/utils";

interface LauncherScreenProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}

type LauncherPhase = "loading" | "main";

export function LauncherScreen({ onCreateAccount, onLogin }: LauncherScreenProps) {
  const [phase, setPhase] = useState<LauncherPhase>("loading");

  // After 2s flip the card and reveal the CTA
  useEffect(() => {
    const timer = setTimeout(() => setPhase("main"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 flex flex-col">
        {/* Card area — centered with lime glow behind */}
        <div className="flex-1 relative flex items-center justify-center px-4">
          {/* Glowing orb — only visible after flip */}
          <div
            className={cn(
              "absolute w-[380px] h-[380px] rounded-full launcher-glow",
              phase === "main" ? "opacity-25" : "opacity-0"
            )}
            style={{
              background: `radial-gradient(circle, var(--color-neon-300) 0%, transparent 70%)`,
              filter: "blur(80px)",
              transition: "opacity 0.8s ease",
            }}
          />

          {/* BalanceCard — shows back face during loading, flips on main */}
          <div className="relative w-full max-w-[340px]">
            <BalanceCard
              demo
              demoBalance={2450}
              demoCurrency="USD"
              showBack={phase === "loading"}
              tappable={phase === "main"}
            />
          </div>
        </div>

        {/* Bottom content — tagline + CTA, fades in after flip */}
        <div
          className={cn(
            "flex flex-col items-center px-4 pb-10",
            phase === "main" ? "launcher-cta-fade" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="w-full max-w-[340px]">
            {/* Tagline */}
            <div className="mb-8">
              <p className="text-muted-foreground text-base leading-relaxed">
                Your digital wallet for instant transfers,
                <br />
                easy top-ups, and secure payments.
              </p>
              <h1 className="mt-2 text-4xl font-bold leading-tight bg-gradient-to-r from-neon-700 to-neon-500 dark:from-neon-300 dark:to-neon-400 bg-clip-text text-transparent">
                Pay anyone, instantly.
              </h1>
            </div>

            {/* CTA buttons */}
            <div className="w-full space-y-3">
              <Button
                onClick={onCreateAccount}
                size="lg"
                className="w-full"
              >
                Create account
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
    </div>
  );
}
