"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { PageHeader } from "@/components/PageHeader";
import { EditProfileForm } from "@/components/EditProfileForm";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { ManageCardsSection } from "@/components/ManageCardsSection";
import { DeleteAccountSection } from "@/components/DeleteAccountSection";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
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

        <PageHeader title="Settings" />

        <div className="space-y-6">
          {/* Profile Information */}
          <div>
            <h2 className="text-base font-semibold text-foreground">Profile Information</h2>
            <p className="text-sm text-muted-foreground mt-1">Update your name and email address</p>
            <div className="mt-4">
              <EditProfileForm />
            </div>
          </div>

          <Separator />

          {/* Change Password */}
          <div>
            <h2 className="text-base font-semibold text-foreground">Change Password</h2>
            <p className="text-sm text-muted-foreground mt-1">Update your password to keep your account secure</p>
            <div className="mt-4">
              <ChangePasswordForm />
            </div>
          </div>

          <Separator />

          {/* Saved Payment Cards */}
          <div>
            <h2 className="text-base font-semibold text-foreground">Saved Payment Cards</h2>
            <p className="text-sm text-muted-foreground mt-1">View and manage your saved payment methods</p>
            <div className="mt-4">
              <ManageCardsSection />
            </div>
          </div>

          <Separator />

          {/* Delete Account */}
          <DeleteAccountSection />

          <Separator />

          {/* Logout */}
          <Button variant="outline" onClick={logout} className="w-full">
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
