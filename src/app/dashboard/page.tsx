"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionHistory } from "@/components/TransactionHistory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDownLeft, ArrowUpRight } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Balance Card */}
          <BalanceCard />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/top-up">
              <Button className="w-full h-16" size="lg">
                <ArrowDownLeft className="mr-2 h-5 w-5" />
                Top Up
              </Button>
            </Link>
            <Link href="/transfer">
              <Button className="w-full h-16" size="lg">
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Transfer
              </Button>
            </Link>
          </div>

          {/* Transaction History - Recent 3 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Activities</CardTitle>
                  <CardDescription>
                    Your latest activities
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
      <Footer />
    </div>
  );
}
