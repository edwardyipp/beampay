"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/PageHeader";

interface SettingsPageWrapperProps {
  title: string;
  backHref: string;
  children: React.ReactNode;
}

export function SettingsPageWrapper({ title, backHref, children }: SettingsPageWrapperProps) {
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
      <div className="max-w-md mx-auto px-5 pb-10">
        <PageHeader title={title} backHref={backHref} />
        <div className="animate-in slide-in-from-right duration-200">
          {children}
        </div>
      </div>
    </div>
  );
}
