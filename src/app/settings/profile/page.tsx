"use client";

import { SettingsPageWrapper } from "@/components/SettingsPageWrapper";
import { EditProfileForm } from "@/components/EditProfileForm";

export default function ProfileSettingsPage() {
  return (
    <SettingsPageWrapper title="Profile" backHref="/settings">
      <div>
        <h2 className="text-base font-semibold text-foreground">Profile Information</h2>
        <p className="text-sm text-muted-foreground mt-1">Update your name and email address</p>
        <div className="mt-4">
          <EditProfileForm />
        </div>
      </div>
    </SettingsPageWrapper>
  );
}
