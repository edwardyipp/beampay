"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { PageHeader } from "@/components/PageHeader";
import { EditProfileForm } from "@/components/EditProfileForm";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { ManageCardsSection } from "@/components/ManageCardsSection";
import { DeleteAccountSection } from "@/components/DeleteAccountSection";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogOut, Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

          {/* Appearance */}
          <div>
            <h2 className="text-base font-semibold text-foreground">Appearance</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose your preferred color theme</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl py-3 px-2 border transition-colors",
                    mounted && theme === value
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
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
