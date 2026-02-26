"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionHistory } from "@/components/TransactionHistory";
import { BottomNav } from "@/components/BottomNav";
import { getInitials } from "@/lib/user-utils";
import { ArrowRightLeft, Plus, Bell } from "lucide-react";

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  const displayName =
    currentUser.firstName && currentUser.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : currentUser.email.split("@")[0];

  const initials =
    currentUser.firstName && currentUser.lastName
      ? getInitials(currentUser.firstName, currentUser.lastName)
      : currentUser.email.charAt(0).toUpperCase();

  return (
    /* Page background: very subtle lime tint at top fading to white (Figma css-4szs8t) */
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(246,255,196,0.9) 0%, rgba(255,255,255,1) 48px)",
      }}
    >
      {/* max-w-md container, px-5 = 20px (Figma: padding 0 20px), pb-[134px] for floating nav */}
      <div className="max-w-md mx-auto px-5 pb-[134px]">

        {/* Header — height 76px, gap-3 = 12px, py-4 */}
        <div className="flex items-center justify-between py-4 h-[76px]">
          <Link href="/settings" className="flex items-center gap-3">
            {/* Avatar — 44×44px, border-radius 40px */}
            {currentUser.profilePicture ? (
              currentUser.profilePicture.startsWith("data:") ? (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="w-11 h-11 rounded-[40px] object-cover"
                  style={{ boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)" }}
                />
              ) : (
                <img
                  src={`/avatars/${currentUser.profilePicture}.svg`}
                  alt="Avatar"
                  className="w-11 h-11 rounded-[40px]"
                  style={{ boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)" }}
                />
              )
            ) : (
              <div
                className="w-11 h-11 rounded-[40px] bg-primary text-primary-foreground flex items-center justify-center text-base font-medium"
                style={{ boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)" }}
              >
                {initials}
              </div>
            )}
            {/* Name — 16px medium (Figma css-b2oziz: font-size 16px, line-height 20px) */}
            <span className="font-medium text-base text-foreground leading-5">{displayName}</span>
          </Link>

          {/* Bell button — 44×44px, #F9FAFB bg, white border, large soft shadow (Figma SVG filter) */}
          <button
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#030712] dark:text-foreground hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "#F9FAFB",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)",
            }}
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="mt-2">
          <BalanceCard />
        </div>

        {/* Action Buttons — h-14 (56px), rounded-full (9999px), text-lg (18px), gap-3 (12px) */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Link
            href="/transfer"
            className="flex items-center justify-center gap-3 h-14 bg-foreground text-background rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <ArrowRightLeft className="w-5 h-5" />
            Transfer
          </Link>
          <Link
            href="/top-up"
            className="flex items-center justify-center gap-3 h-14 bg-foreground text-background rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Add Funds
          </Link>
        </div>

        {/* Activities Section — gap-16px between header and list (Figma css-57omnr) */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {/* Title — 16px semibold (Figma css-hz2zk3) */}
            <h2 className="text-base font-semibold text-foreground">Activities</h2>
            {/* View all — 16px medium, #81b700 (Figma css-y7193a) */}
            <Link
              href="/transactions"
              className="text-base font-medium text-[#81b700] dark:text-[#A6E500]"
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
