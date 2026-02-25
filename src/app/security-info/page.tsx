"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function SecurityInfoPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleContinue = () => {
    if (currentUser && dontShowAgain) {
      localStorage.setItem(`security-info-dismissed-${currentUser.id}`, "true");
    }
    router.push("/dashboard");
  };

  if (!currentUser) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Your Security Matters</CardTitle>
            <CardDescription>
              BeamPay is designed with security at its core
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Security Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Secure Transaction Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  All your data and transactions are encrypted end-to-end, ensuring only you can access your information.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Security by Design</h3>
                <p className="text-sm text-muted-foreground">
                  Built with security best practices, including PIN verification for sensitive actions and secure session management.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fraud Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time fraud monitoring and suspicious activity detection to keep your account safe.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Security Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Never share your PIN or password with anyone
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Always log out on shared devices
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Verify recipient details before sending money
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Enable notifications to monitor account activity
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Contact support immediately if you notice suspicious activity
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Don't Show Again + Continue */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="dontShowAgain"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <label
                htmlFor="dontShowAgain"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Don't show this again
              </label>
            </div>
            <Button onClick={handleContinue} className="w-full" size="lg">
              I Understand
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
