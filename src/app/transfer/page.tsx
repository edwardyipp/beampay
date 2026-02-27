"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { SendForm } from "@/components/SendForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransferPage() {
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
            <CardTitle>Transfer</CardTitle>
            <CardDescription>
              Transfer funds to another user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SendForm />
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
}
