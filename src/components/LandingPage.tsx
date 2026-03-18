"use client";

import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Send, Shield } from "lucide-react";

export function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <Logo className="text-4xl" />
          <p className="mt-3 text-muted-foreground text-lg max-w-xs mx-auto">
            Send money instantly. Top up easily. All in one place.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid gap-4 w-full max-w-sm mb-10">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Instant Transfers</p>
              <p className="text-xs text-muted-foreground">Send money to anyone, anytime</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Easy Top-Up</p>
              <p className="text-xs text-muted-foreground">Add funds with any credit card</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">PIN Protected</p>
              <p className="text-xs text-muted-foreground">Secure every transaction with your PIN</p>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            className="w-full"
            size="lg"
            onClick={() => router.push("/login?signup=true")}
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8 pt-4 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} BeamPay. All rights reserved.
        </p>
      </div>
    </div>
  );
}
