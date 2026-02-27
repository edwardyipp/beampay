"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { EditProfileForm } from "@/components/EditProfileForm";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { ManageCardsSection } from "@/components/ManageCardsSection";
import { DeleteAccountSection } from "@/components/DeleteAccountSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/user-utils";
import { Bell } from "lucide-react";

export default function SettingsPage() {
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

  const displayName =
    currentUser.firstName && currentUser.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : currentUser.email.split("@")[0];

  const initials =
    currentUser.firstName && currentUser.lastName
      ? getInitials(currentUser.firstName, currentUser.lastName)
      : currentUser.email.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-5 pb-[134px]">

        {/* Header */}
        <div className="flex items-center justify-between py-4 h-[76px]">
          <div className="flex items-center gap-3">
            {currentUser.profilePicture ? (
              currentUser.profilePicture.startsWith("data:") ? (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="w-11 h-11 rounded-[40px] object-cover"
                  style={{ boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)" }}
                />
              ) : (
                <img
                  src={`/avatars/${currentUser.profilePicture}.svg`}
                  alt="Avatar"
                  className="w-11 h-11 rounded-[40px]"
                  style={{ boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)" }}
                />
              )
            ) : (
              <div
                className="w-11 h-11 rounded-[40px] bg-primary text-primary-foreground flex items-center justify-center text-base font-medium"
                style={{ boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)" }}
              >
                {initials}
              </div>
            )}
            <span className="font-medium text-base text-foreground leading-5">{displayName}</span>
          </div>

          <button
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#030712] dark:text-foreground hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "#F9FAFB",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)",
            }}
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account preferences and security
            </p>
          </div>

          <Separator />

          {/* Edit Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your name and email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditProfileForm />
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChangePasswordForm />
            </CardContent>
          </Card>

          {/* Manage Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Payment Cards</CardTitle>
              <CardDescription>
                View and manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ManageCardsSection />
            </CardContent>
          </Card>

          {/* Delete Account */}
          <Card>
            <CardContent className="pt-6">
              <DeleteAccountSection />
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
