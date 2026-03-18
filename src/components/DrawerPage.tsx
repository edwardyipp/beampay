"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerPageProps {
  title: string;
  children: React.ReactNode;
}

export function DrawerPage({ title, children }: DrawerPageProps) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      router.back();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop — dark overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 duration-300 cursor-pointer",
          isClosing ? "animate-out fade-out" : "animate-in fade-in"
        )}
        onClick={handleClose}
      />

      {/* Drawer — slides up from bottom, 90vh */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 duration-300",
          isClosing
            ? "animate-out slide-out-to-bottom"
            : "animate-in slide-in-from-bottom"
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="bg-background rounded-t-[20px] max-w-md mx-auto h-[90vh] flex flex-col">
          {/* Drag handle (visual only) */}
          <div className="flex justify-center pt-3">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Header: title + close button */}
          <div className="flex items-center justify-between px-5 py-3">
            <h1 className="font-semibold text-xl text-foreground tracking-tight">
              {title}
            </h1>
            <button
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="px-5 pb-8 overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
