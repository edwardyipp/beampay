"use client";

import { SavedCards } from "./SavedCards";

export function ManageCardsSection() {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Manage your saved payment cards. These cards can be used for quick top-ups.
      </p>
      <SavedCards />
    </div>
  );
}
