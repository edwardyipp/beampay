"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionHistory } from "@/components/TransactionHistory";
import { BottomNav } from "@/components/BottomNav";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Plus } from "lucide-react";
import { useWebHaptics } from "web-haptics/react";

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { trigger } = useWebHaptics();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  const isLight = mounted && resolvedTheme === "light";

  return (
    /* Page background: very subtle lime tint at top fading to white (light mode only) */
    <div
      className="min-h-screen bg-background"
      style={isLight ? {
        backgroundImage:
          "linear-gradient(to bottom, rgba(246,255,196,0.9) 0%, rgba(255,255,255,1) 48px)",
      } : undefined}
    >
      {/* max-w-md container, px-5 = 20px (Figma: padding 0 20px), pb-[134px] for floating nav */}
      <div className="max-w-md mx-auto px-5 pb-[134px]">

        <PageHeader showThemeToggle />

        {/* Balance Card */}
        <div className="mt-2">
          <BalanceCard />
        </div>

        {/* Action Buttons — h-14 (56px), rounded-full (9999px), text-lg (18px), gap-3 (12px) */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => { trigger("success"); router.push("/transfer"); }}
          >
            <ArrowRightLeft />
            Transfer
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => { trigger("success"); router.push("/top-up"); }}
          >
            <Plus />
            Add Funds
          </Button>
        </div>

        {/* Activities Section — gap-16px between header and list (Figma css-57omnr) */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {/* Title — 16px semibold (Figma css-hz2zk3) */}
            <h2 className="text-base font-semibold text-foreground">Activities</h2>
            {/* View all — 16px medium, #81b700 (Figma css-y7193a) */}
            <Link
              href="/transactions"
              className="text-base font-medium text-neon-700 dark:text-primary"
            >
              View all
            </Link>
          </div>
          <TransactionHistory limit={5} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
