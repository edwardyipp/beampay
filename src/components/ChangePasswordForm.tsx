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

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pendingCurrentPassword, setPendingCurrentPassword] = useState("");
  const [pendingNewPassword, setPendingNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Require PIN — setup first if not set
    setPendingCurrentPassword(currentPassword);
    setPendingNewPassword(newPassword);
    if (!currentUser?.pin) {
      setShowPinSetup(true);
    } else {
      setShowPinModal(true);
    }
  };

  const executePasswordChange = async () => {
    setIsLoading(true);
    try {
      const success = await changePassword(pendingCurrentPassword, pendingNewPassword);
      if (success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    executePasswordChange();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
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
        onSuccess={handlePinSuccess}
        title="Verify your identity"
        description="Enter your PIN to change your password"
      />
    </>
  );
}
