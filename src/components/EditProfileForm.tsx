"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PinVerificationModal } from "@/components/PinVerificationModal";

export function EditProfileForm() {
  const { currentUser, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [email, setEmail] = useState(currentUser?.email || "");

  // Store pending changes
  const [pendingFirstName, setPendingFirstName] = useState("");
  const [pendingLastName, setPendingLastName] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if email changed - requires PIN verification
    if (email !== currentUser?.email) {
      setPendingFirstName(firstName);
      setPendingLastName(lastName);
      setPendingEmail(email);
      setShowPinModal(true);
    } else {
      // Name change only - no PIN required
      await executeUpdate(firstName, lastName, email);
    }
  };

  const executeUpdate = async (first: string, last: string, em: string) => {
    setIsLoading(true);
    try {
      await updateProfile(first, last, em);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    executeUpdate(pendingFirstName, pendingLastName, pendingEmail);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {email !== currentUser?.email && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Changing your email requires PIN verification
            </p>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      <PinVerificationModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={handlePinSuccess}
        title="Verify your identity"
        description="Enter your PIN to change your email address"
      />
    </>
  );
}
