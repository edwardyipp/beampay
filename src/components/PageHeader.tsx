"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/user-utils";
import { cn } from "@/lib/utils";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface PageHeaderProps {
  linkToSettings?: boolean;
  title?: string;
  backHref?: string;
  showThemeToggle?: boolean;
}

export function PageHeader({ linkToSettings = true, title, backHref, showThemeToggle = false }: PageHeaderProps) {
  const { currentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!currentUser) return null;

  if (title && backHref) {
    return (
      <div className="flex items-center py-4 h-[76px]">
        <Link href={backHref} className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </div>
          <h1 className="font-semibold text-xl text-foreground tracking-tight">{title}</h1>
        </Link>
      </div>
    );
  }

  if (title) {
    return (
      <div className="flex items-center py-4 h-[76px]">
        <h1 className="font-semibold text-xl text-foreground tracking-tight">{title}</h1>
      </div>
    );
  }

  const displayName = currentUser.firstName
    ? currentUser.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : currentUser.firstName
    : currentUser.email.split("@")[0];

  const initials = currentUser.firstName
    ? currentUser.lastName
      ? getInitials(currentUser.firstName, currentUser.lastName)
      : currentUser.firstName.charAt(0).toUpperCase()
    : currentUser.email.charAt(0).toUpperCase();

  const avatarShadow = { boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)" };

  const avatar = currentUser.profilePicture ? (
    currentUser.profilePicture.startsWith("data:") ? (
      <img
        src={currentUser.profilePicture}
        alt="Profile"
        className="w-11 h-11 rounded-[40px] object-cover"
        style={avatarShadow}
      />
    ) : (
      <img
        src={`/avatars/${currentUser.profilePicture}.svg`}
        alt="Avatar"
        className="w-11 h-11 rounded-[40px]"
        style={avatarShadow}
      />
    )
  ) : (
    <div
      className="w-11 h-11 rounded-[40px] bg-primary text-primary-foreground flex items-center justify-center text-base font-medium"
      style={avatarShadow}
    >
      {initials}
    </div>
  );

  const nameLabel = (
    <span className="font-semibold text-xl text-foreground tracking-tight">
      {displayName}
    </span>
  );

  const wrapperClass = "flex items-center gap-3";

  const leftSection = linkToSettings ? (
    <Link href="/settings" className={wrapperClass}>
      {avatar}
      {nameLabel}
    </Link>
  ) : (
    <div className={wrapperClass}>
      {avatar}
      {nameLabel}
    </div>
  );

  const themeToggle = showThemeToggle && mounted ? (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-11 h-11 rounded-full bg-muted flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-foreground" />
      )}
    </button>
  ) : showThemeToggle ? (
    <div className="w-11 h-11" />
  ) : null;

  return (
    <div className="flex items-center justify-between py-4 h-[76px]">
      {leftSection}
      {themeToggle}
    </div>
  );
}
