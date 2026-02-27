"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { TopUpForm } from "@/components/TopUpForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopUpPage() {
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
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-[134px]">
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
      </main>
      <BottomNav />
    </div>
  );
}
