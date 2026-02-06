"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-gray-600 mt-1">
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
      </main>
      <Footer />
    </div>
  );
}
