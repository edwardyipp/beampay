"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SettingsPageWrapper } from "@/components/SettingsPageWrapper";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const themeOptions = [
  { value: "light", label: "Light", description: "Classic light theme", icon: Sun },
  { value: "dark", label: "Dark", description: "Easy on the eyes", icon: Moon },
  { value: "system", label: "System", description: "Match your device", icon: Monitor },
] as const;

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SettingsPageWrapper title="Appearance" backHref="/settings">
      <div>
        <h2 className="text-base font-semibold text-foreground">Theme</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose your preferred color theme</p>
        <div className="mt-4 space-y-1">
          {themeOptions.map(({ value, label, description, icon: Icon }) => {
            const isSelected = mounted && theme === value;
            return (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className="flex items-center gap-3 w-full py-3 rounded-xl hover:bg-muted transition-colors text-left"
              >
                <div className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center",
                  isSelected ? "bg-primary/15" : "bg-muted"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  isSelected ? "border-primary" : "border-muted-foreground/30"
                )}>
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </SettingsPageWrapper>
  );
}
