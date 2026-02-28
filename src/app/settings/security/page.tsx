"use client";

import { SettingsPageWrapper } from "@/components/SettingsPageWrapper";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";

export default function SecuritySettingsPage() {
  return (
    <SettingsPageWrapper title="Security" backHref="/settings">
      <div>
        <h2 className="text-base font-semibold text-foreground">Change Password</h2>
        <p className="text-sm text-muted-foreground mt-1">Update your password to keep your account secure</p>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </div>
    </SettingsPageWrapper>
  );
}
