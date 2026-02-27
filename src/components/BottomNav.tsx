"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, ScanLine } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  return (
    /* pb-9 = 36px bottom padding (matches Figma's padding: 36px 16px around the pill) */
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-9">
      {/* Floating pill — bg-white light / bg-card dark, gap-[120px] between tabs */}
      <div
        className="relative flex items-center bg-white dark:bg-card rounded-[32px] p-1"
        style={{
          boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)",
          gap: "120px",
        }}
      >
        {/* Home tab — 92×54px pill */}
        <Link
          href="/dashboard"
          className={`w-[92px] h-[54px] rounded-full flex flex-col justify-center items-center gap-0.5 transition-colors ${
            pathname === "/dashboard"
              ? "text-[#030712] dark:text-foreground"
              : "text-[#9ca3af]"
          }`}
        >
          <Home className="w-[22px] h-[22px]" />
          <span className="text-[12px] font-medium">Home</span>
        </Link>

        {/* Activities tab — 92×54px pill */}
        <Link
          href="/transactions"
          className={`w-[92px] h-[54px] rounded-full flex flex-col justify-center items-center gap-0.5 transition-colors ${
            pathname === "/transactions"
              ? "text-[#030712] dark:text-foreground"
              : "text-[#9ca3af]"
          }`}
        >
          <Clock className="w-[22px] h-[22px]" />
          <span className="text-[12px] font-medium">Activities</span>
        </Link>

        {/* Pay button — elevated, absolutely centered, slightly above centre (top: calc(50% - 5px)) */}
        <Link
          href="/transfer"
          style={{
            position: "absolute",
            left: "50%",
            top: "calc(50% - 5px)",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <div className="pay-btn-wrapper">
            <div className="pay-btn-outer">
              <div className="pay-btn-inner">
                <ScanLine className="w-[32px] h-[32px]" />
                <span className="text-[12px] font-medium">Pay</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
