"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { PageHeader } from "@/components/PageHeader";
import { TransactionHistory } from "@/components/TransactionHistory";

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-5 pb-[134px]">

        <PageHeader title="Activities" />

        <TransactionHistory />

      </div>

      <BottomNav />
    </div>
  );
}
