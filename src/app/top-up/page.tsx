"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DrawerPage } from "@/components/DrawerPage";
import { TopUpForm } from "@/components/TopUpForm";

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
    <DrawerPage title="Add Funds">
      <TopUpForm />
    </DrawerPage>
  );
}
