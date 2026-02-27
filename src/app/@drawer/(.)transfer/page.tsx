"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DrawerPage } from "@/components/DrawerPage";
import { SendForm } from "@/components/SendForm";

export default function TransferDrawer() {
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
    <DrawerPage title="Transfer">
      <SendForm />
    </DrawerPage>
  );
}
