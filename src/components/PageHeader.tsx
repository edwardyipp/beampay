"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/user-utils";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  linkToSettings?: boolean;
  title?: string;
}

export function PageHeader({ linkToSettings = true, title }: PageHeaderProps) {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  if (title) {
    return (
      <div className="flex items-center py-4 h-[76px]">
        <h1 className="font-semibold text-xl text-foreground tracking-tight">{title}</h1>
      </div>
    );
  }

  const displayName =
    currentUser.firstName && currentUser.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : currentUser.email.split("@")[0];

  const initials =
    currentUser.firstName && currentUser.lastName
      ? getInitials(currentUser.firstName, currentUser.lastName)
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

  return (
    <div className="flex items-center py-4 h-[76px]">
      {leftSection}
    </div>
  );
}
