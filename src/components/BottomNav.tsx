"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border">
      <div className="max-w-md mx-auto flex items-end justify-around px-8 pb-6 pt-2">
        {/* Home */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-1 pt-2 ${
            pathname === "/dashboard"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[11px] font-medium">Home</span>
        </Link>

        {/* Pay - elevated button */}
        <Link href="/transfer" className="flex flex-col items-center -mt-5">
          <img
            src="/pay-button.svg"
            alt="Pay"
            className="w-[72px] h-auto"
          />
        </Link>

        {/* Activities */}
        <Link
          href="/transactions"
          className={`flex flex-col items-center gap-1 pt-2 ${
            pathname === "/transactions"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Clock className="w-6 h-6" />
          <span className="text-[11px] font-medium">Activities</span>
        </Link>
      </div>
    </nav>
  );
}
