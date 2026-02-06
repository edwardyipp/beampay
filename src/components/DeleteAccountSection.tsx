"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PinVerificationModal } from "@/components/PinVerificationModal";

export function DeleteAccountSection() {
  const { deleteAccount } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDialog(false);
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    deleteAccount();
  };

  return (
    <>
      <div className="border-t dark:border-gray-700 pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Once you delete your account, there is no going back. This will permanently delete
              your account, wallet balance, transaction history, and saved cards.
            </p>
          </div>

          <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your data, including your
                  wallet balance, transaction history, and saved payment cards.

                  You will be asked to verify your PIN to confirm this action.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteClick}
                  className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  Continue to PIN Verification
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <PinVerificationModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={handlePinSuccess}
        title="Confirm Account Deletion"
        description="Enter your PIN to permanently delete your account"
      />
    </>
  );
}
