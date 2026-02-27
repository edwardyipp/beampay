"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { TransactionHistory } from "@/components/TransactionHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/user-utils";
import { Bell } from "lucide-react";

export default function TransactionsPage() {
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
      <div className="max-w-md mx-auto px-5 pb-[134px]">

        {/* Header */}
        <div className="flex items-center justify-between py-4 h-[76px]">
          <Link href="/settings" className="flex items-center gap-3">
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
            <span className="font-medium text-base text-foreground leading-5">{displayName}</span>
          </Link>

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

        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              Complete history of your top-ups and transfers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionHistory />
          </CardContent>
        </Card>

      </div>

      <BottomNav />
    </div>
  );
}
