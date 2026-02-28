"use client";

import { SettingsPageWrapper } from "@/components/SettingsPageWrapper";
import { DeleteAccountSection } from "@/components/DeleteAccountSection";

export default function CloseAccountSettingsPage() {
  return (
    <SettingsPageWrapper title="Close Account" backHref="/settings">
      <DeleteAccountSection />
    </SettingsPageWrapper>
  );
}
