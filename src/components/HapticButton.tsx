"use client";

import { useCallback } from "react";
import { useWebHaptics } from "web-haptics/react";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

/**
 * Button with haptic feedback on tap (mobile only).
 * Falls back silently on desktop where vibration API is unavailable.
 */
export function HapticButton({
  onClick,
  hapticPattern = "success",
  ...props
}: ComponentProps<typeof Button> & {
  hapticPattern?: string | number;
}) {
  const { trigger } = useWebHaptics();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      trigger(hapticPattern);
      onClick?.(e);
    },
    [trigger, hapticPattern, onClick]
  );

  return <Button onClick={handleClick} {...props} />;
}
