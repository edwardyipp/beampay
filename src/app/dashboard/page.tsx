"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { BalanceCard } from "@/components/BalanceCard";
import { TopUpForm } from "@/components/TopUpForm";
import { SendForm } from "@/components/SendForm";
import { TransactionHistory } from "@/components/TransactionHistory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Balance Card */}
          <BalanceCard />

          {/* Actions Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Up</CardTitle>
                <CardDescription>
                  Add funds to your wallet using a credit card
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopUpForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send Money</CardTitle>
                <CardDescription>
                  Transfer funds to another user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SendForm />
              </CardContent>
            </Card>
          </div>

          {/* Transaction History - Recent 3 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Your latest transactions
                  </CardDescription>
                </div>
                <Link
                  href="/transactions"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <TransactionHistory limit={3} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
