"use client";

import { SettingsPageWrapper } from "@/components/SettingsPageWrapper";
import { ManageCardsSection } from "@/components/ManageCardsSection";

export default function PaymentSettingsPage() {
  return (
    <SettingsPageWrapper title="Payment" backHref="/settings">
      <div>
        <h2 className="text-base font-semibold text-foreground">Saved Payment Cards</h2>
        <p className="text-sm text-muted-foreground mt-1">View and manage your saved payment methods</p>
        <div className="mt-4">
          <ManageCardsSection />
        </div>
      </div>
    </SettingsPageWrapper>
  );
}
