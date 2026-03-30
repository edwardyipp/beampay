"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PinVerificationModal } from "@/components/PinVerificationModal";
import { PinSetupModal } from "@/components/PinSetupModal";
import { toast } from "sonner";

export function ChangePasswordForm() {
  const { currentUser, changePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!currentUser?.pin) {
      setShowPinSetup(true);
    } else {
      setShowPinModal(true);
    }
  };

  const executePasswordChange = async () => {
    setIsLoading(true);
    try {
      await changePassword(newPassword);
      setNewPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />
          <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Changing..." : "Change Password"}
        </Button>
      </form>

      <PinSetupModal
        isOpen={showPinSetup}
        onClose={() => setShowPinSetup(false)}
        onSuccess={() => {
          setShowPinSetup(false);
          setShowPinModal(true);
        }}
      />

      <PinVerificationModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={() => {
          setShowPinModal(false);
          executePasswordChange();
        }}
        title="Verify your identity"
        description="Enter your PIN to change your password"
      />
    </>
  );
}
