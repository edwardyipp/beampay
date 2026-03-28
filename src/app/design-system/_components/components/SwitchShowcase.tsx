"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";

export function SwitchShowcase() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <SectionWrapper
      id="switch"
      title="Switch"
      description="Binary on/off toggle. Two sizes: default and sm. Used for settings, preferences, and feature toggles."
    >
      {/* States */}
      <DemoCard label="States & Sizes">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col items-center gap-3">
              <Switch />
              <span className="text-xs text-muted-foreground">Off (default)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Switch defaultChecked />
              <span className="text-xs text-muted-foreground">On (default)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Switch disabled />
              <span className="text-xs text-muted-foreground">Disabled Off</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Switch disabled defaultChecked />
              <span className="text-xs text-muted-foreground">Disabled On</span>
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-8 items-end">
            <div className="flex flex-col items-center gap-3">
              <Switch size="default" defaultChecked />
              <span className="text-xs text-muted-foreground">default size</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Switch size="sm" defaultChecked />
              <span className="text-xs text-muted-foreground">sm size</span>
            </div>
          </div>
        </div>
      </DemoCard>

      <Separator />

      {/* With labels — settings usage */}
      <DemoCard label="Settings Usage">
        <div className="max-w-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground mt-0.5">Receive alerts for transactions</p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground mt-0.5">Switch between light and dark</p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          <div className="flex items-center justify-between opacity-50">
            <div>
              <p className="text-sm font-medium text-foreground">Marketing Emails</p>
              <p className="text-xs text-muted-foreground mt-0.5">Controlled by account settings</p>
            </div>
            <Switch
              checked={marketing}
              onCheckedChange={setMarketing}
              disabled
            />
          </div>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
