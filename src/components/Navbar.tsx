"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { getInitials } from "@/lib/user-utils";

export function Navbar() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  const displayName = currentUser.firstName && currentUser.lastName
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : currentUser.email.split("@")[0];

  const initials = currentUser.firstName && currentUser.lastName
    ? getInitials(currentUser.firstName, currentUser.lastName)
    : currentUser.email.charAt(0).toUpperCase();

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard">
              <Logo className="text-xl" />
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Transactions
              </Link>
              <Link
                href="/settings"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Settings
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Profile Picture - Clickable to Settings */}
            <Link href="/settings" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              {currentUser.profilePicture ? (
                currentUser.profilePicture.startsWith("data:") ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={`/avatars/${currentUser.profilePicture}.svg`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {initials}
                </div>
              )}
              <div className="hidden sm:block text-sm text-muted-foreground">
                <span className="font-medium">{displayName}</span>
              </div>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Sign Out Button */}
            <Button variant="outline" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
