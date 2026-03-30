"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { User, Shield, CreditCard, Trash2, LogOut, ChevronRight, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    href: "/settings/profile",
    icon: User,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    label: "Profile",
    description: "Name and email",
  },
  {
    href: "/settings/appearance",
    icon: Palette,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    label: "Appearance",
    description: "Theme and display",
  },
  {
    href: "/settings/security",
    icon: Shield,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    label: "Security",
    description: "Password and PIN",
  },
  {
    href: "/settings/payment",
    icon: CreditCard,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    label: "Payment",
    description: "Saved cards and methods",
  },
  {
    href: "/settings/close-account",
    icon: Trash2,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    label: "Close Account",
    description: "Permanently delete your account",
  },
] as const;

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-5 pb-10">
        <PageHeader title="Settings" backHref="/dashboard" />

        <div className="animate-in slide-in-from-right duration-200">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 py-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className={cn("w-11 h-11 rounded-full flex items-center justify-center", item.iconBg)}>
                    <Icon className={cn("w-5 h-5", item.iconColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <Button variant="outline" onClick={logout} size="lg" className="w-full">
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
