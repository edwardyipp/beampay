"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import { Trash2, AlertCircle } from "lucide-react";

export function DialogShowcase() {
  const [dialogNoClose, setDialogNoClose] = useState(false);

  return (
    <SectionWrapper
      id="dialog"
      title="Dialog & Alert Dialog"
      description="Dialog for forms and confirmations. AlertDialog for destructive or blocking decisions. Both use a centered overlay with backdrop blur."
    >
      {/* Standard Dialog */}
      <DemoCard label="Dialog — Standard">
        <div className="flex flex-wrap gap-3">
          {/* With close button (default) */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label>First Name</Label>
                  <Input defaultValue="John" />
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name</Label>
                  <Input defaultValue="Doe" />
                </div>
              </div>
              <DialogFooter showCloseButton>
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Without close button */}
          <Dialog open={dialogNoClose} onOpenChange={setDialogNoClose}>
            <DialogTrigger asChild>
              <Button variant="outline">No Close Button</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Action Required</DialogTitle>
                <DialogDescription>
                  You must complete this action before proceeding. This dialog has <code>showCloseButton=false</code>.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setDialogNoClose(false)}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </DemoCard>

      <Separator />

      {/* Alert Dialog */}
      <DemoCard label="Alert Dialog — Confirmations">
        <div className="flex flex-wrap gap-3">
          {/* Standard */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Standard Alert</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Small size */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Small (sm)</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete card?</AlertDialogTitle>
                <AlertDialogDescription>Remove this saved card from your account.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" size="sm">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* With media */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <Trash2 className="w-8 h-8 text-destructive" />
                </AlertDialogMedia>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  All your data will be permanently deleted. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DemoCard>

      {/* Custom AlertDialog */}
      <DemoCard label="Alert Dialog — Custom Action Variants">
        <div className="flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <AlertCircle className="w-4 h-4 mr-1.5" />
                Warning Dialog
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <AlertCircle className="w-8 h-8 text-amber-500" />
                </AlertDialogMedia>
                <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                <AlertDialogDescription>
                  You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Stay</AlertDialogCancel>
                <AlertDialogAction variant="outline">Leave anyway</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
