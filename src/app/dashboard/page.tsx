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
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <Link href="/settings" className="flex items-center gap-3">
            {currentUser.profilePicture ? (
              currentUser.profilePicture.startsWith("data:") ? (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <img
                  src={`/avatars/${currentUser.profilePicture}.svg`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              )
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {initials}
              </div>
            )}
            <span className="font-medium text-foreground">{displayName}</span>
          </Link>

          <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="mt-2">
          <BalanceCard />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Link
            href="/transfer"
            className="flex items-center justify-center gap-2 h-14 bg-foreground text-background rounded-2xl font-semibold text-base hover:opacity-90 transition-opacity"
          >
            <ArrowRightLeft className="w-5 h-5" />
            Transfer
          </Link>
          <Link
            href="/top-up"
            className="flex items-center justify-center gap-2 h-14 bg-foreground text-background rounded-2xl font-semibold text-base hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Add Funds
          </Link>
        </div>

        {/* Activities Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Activities</h2>
            <Link
              href="/transactions"
              className="text-sm font-medium text-[#7cb300] dark:text-[#A6E500]"
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
