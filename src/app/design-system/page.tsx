"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Foundation
import { ColorSection } from "./_components/foundations/ColorSection";
import { TypographySection } from "./_components/foundations/TypographySection";
import { IconographySection } from "./_components/foundations/IconographySection";
import { SpacingSection } from "./_components/foundations/SpacingSection";

// Components
import { ButtonShowcase } from "./_components/components/ButtonShowcase";
import { BadgeShowcase } from "./_components/components/BadgeShowcase";
import { InputShowcase } from "./_components/components/InputShowcase";
import { CardShowcase } from "./_components/components/CardShowcase";
import { DialogShowcase } from "./_components/components/DialogShowcase";
import { SelectShowcase } from "./_components/components/SelectShowcase";
import { CheckboxShowcase } from "./_components/components/CheckboxShowcase";
import { SwitchShowcase } from "./_components/components/SwitchShowcase";
import { SeparatorShowcase } from "./_components/components/SeparatorShowcase";
import { TabsShowcase } from "./_components/components/TabsShowcase";
import { ToastShowcase } from "./_components/components/ToastShowcase";

// Patterns
import { BalanceCardDemo } from "./_components/patterns/BalanceCardDemo";
import { BottomNavDemo } from "./_components/patterns/BottomNavDemo";
import { PageHeaderDemo } from "./_components/patterns/PageHeaderDemo";
import { PasswordStrengthDemo } from "./_components/patterns/PasswordStrengthDemo";
import { VerificationCodeDemo } from "./_components/patterns/VerificationCodeDemo";
import { PinInputDemo } from "./_components/patterns/PinInputDemo";
import { ProgressBarDemo } from "./_components/patterns/ProgressBarDemo";

export default function DesignSystemPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 h-16 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/logo-beampay-neon.svg"
                alt="BeamPay"
                width={96}
                height={20}
                className="h-5 w-auto"
              />
            </Link>
            <Separator orientation="vertical" className="h-4 bg-border" />
            <span className="text-sm text-muted-foreground font-medium tracking-wide">
              Design System
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-md"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {mounted ? (
                resolvedTheme === "dark" ? <Sun /> : <Moon />
              ) : (
                <div className="w-5 h-5" />
              )}
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="md">Back to App</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Tabs ───────────────────────────────────────────────── */}
      <Tabs defaultValue="foundation" className="block">
        {/* Sticky tab bar */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <TabsList className="rounded-full h-10 px-1">
              <TabsTrigger value="foundation" className="rounded-full px-4 sm:px-5">
                Foundation
              </TabsTrigger>
              <TabsTrigger value="components" className="rounded-full px-4 sm:px-5">
                Components
              </TabsTrigger>
              <TabsTrigger value="patterns" className="rounded-full px-4 sm:px-5">
                Patterns
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ── Foundation ─────────────────────────────────────── */}
        <TabsContent value="foundation">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">
            <ColorSection />
            <Separator />
            <TypographySection />
            <Separator />
            <IconographySection />
            <Separator />
            <SpacingSection />
          </div>
        </TabsContent>

        {/* ── Components ─────────────────────────────────────── */}
        <TabsContent value="components">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">
            <ButtonShowcase />
            <Separator />
            <BadgeShowcase />
            <Separator />
            <InputShowcase />
            <Separator />
            <CardShowcase />
            <Separator />
            <DialogShowcase />
            <Separator />
            <SelectShowcase />
            <Separator />
            <CheckboxShowcase />
            <Separator />
            <SwitchShowcase />
            <Separator />
            <SeparatorShowcase />
            <Separator />
            <TabsShowcase />
            <Separator />
            <ToastShowcase />
          </div>
        </TabsContent>

        {/* ── Patterns ───────────────────────────────────────── */}
        <TabsContent value="patterns">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">
            <BalanceCardDemo />
            <Separator />
            <BottomNavDemo />
            <Separator />
            <PageHeaderDemo />
            <Separator />
            <PasswordStrengthDemo />
            <Separator />
            <VerificationCodeDemo />
            <Separator />
            <PinInputDemo />
            <Separator />
            <ProgressBarDemo />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
