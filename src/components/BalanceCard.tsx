"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { getCurrencySymbol, convertUsdToIdr } from "@/lib/currency-utils";

const MAX_TILT = 14;  // degrees — pointer / touch
const GYRO_MAX = 8;   // degrees — ambient gyroscope
const SCALE_ACTIVE = 1.025;
const PERSPECTIVE = 900; // px

// iOS 13+ DeviceOrientationEvent type with requestPermission
type DOEWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export function BalanceCard() {
  const { balance } = useWallet();
  const { currentUser } = useAuth();

  // ── Refs ────────────────────────────────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  // Mirror of `active` for use inside non-React event listeners (avoids stale closure)
  const activeRef = useRef(false);
  // Slow EMA baseline for device beta — absorbs static holding angle, responds to quick tilts
  const betaBaseRef = useRef<number | null>(null);
  // Cleanup fn for the deviceorientation listener
  const gyroCleanupRef = useRef<(() => void) | null>(null);

  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  const [active, setActive] = useState(false); // pointer hover OR touch active

  // ── Currency / balance ──────────────────────────────────────────────────────
  const userCurrency = currentUser?.currency || "USD";
  const currencySymbol = getCurrencySymbol(userCurrency);
  const idrAmount = convertUsdToIdr(balance);
  const isIDRUser = userCurrency === "IDR";

  const secondaryLabel = isIDRUser
    ? `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${idrAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} IDR`;

  const mainBalance = isIDRUser
    ? `${idrAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} IDR`
    : `${currencySymbol}${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // ── Card background ─────────────────────────────────────────────────────────
  const outerStyle = {
    backgroundImage:
      "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(236,255,168,0.7) 45%, rgba(227,255,125,0.8) 70%, rgba(217,255,81,0.9) 100%), url('/bg-mesh-01.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#c6fe1e",
    boxShadow: active
      ? "-4px 14px 56px 0px rgba(0,0,0,0.22)"
      : "-2px 6px 40px 0px rgba(0,0,0,0.15)",
  };

  // ── Shared helpers ──────────────────────────────────────────────────────────
  /** Convert an absolute client coordinate into a tilt + glare state update. */
  const applyPointerTilt = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;  // [-1, 1]
    const ny = ((clientY - rect.top) / rect.height) * 2 - 1;  // [-1, 1]
    setTilt({
      rotX: -ny * MAX_TILT,
      rotY: nx * MAX_TILT,
      glareX: ((clientX - rect.left) / rect.width) * 100,
      glareY: ((clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const resetTilt = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  }, []);

  // ── Gyroscope (DeviceOrientation) ───────────────────────────────────────────
  /**
   * Attach the deviceorientation listener.
   * Safe to call multiple times — the gyroCleanupRef guard prevents duplicates.
   */
  const startGyro = useCallback(() => {
    if (gyroCleanupRef.current) return;

    const handler = (e: DeviceOrientationEvent) => {
      // Let pointer/touch interaction take full priority
      if (activeRef.current) return;

      const gamma = e.gamma ?? 0; // left-right tilt: –90 → +90 (0 = upright)
      const beta  = e.beta  ?? 0; // forward-back tilt: 0 → 180 (≈75–90 = normal portrait hold)

      // EMA baseline — slowly tracks the user's resting hold angle
      // so delta ≈ 0 when still and responds to quick tilts
      if (betaBaseRef.current === null) {
        betaBaseRef.current = beta;
        return; // skip first frame (no delta yet)
      }
      betaBaseRef.current = betaBaseRef.current * 0.98 + beta * 0.02;

      const rotY = Math.max(-GYRO_MAX, Math.min(GYRO_MAX, gamma * 0.55));
      const rotX = Math.max(-GYRO_MAX, Math.min(GYRO_MAX, -(beta - betaBaseRef.current) * 0.65));

      setTilt({
        rotX,
        rotY,
        glareX: 50 + rotY * 2.5,
        glareY: 50 - rotX * 2.5,
      });
    };

    window.addEventListener("deviceorientation", handler);
    gyroCleanupRef.current = () =>
      window.removeEventListener("deviceorientation", handler);
  }, []);

  // Android: start gyro automatically (no permission required)
  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") return;
    const DOE = DeviceOrientationEvent as DOEWithPermission;
    if (typeof DOE.requestPermission !== "function") {
      startGyro();
    }
    return () => {
      gyroCleanupRef.current?.();
      gyroCleanupRef.current = null;
    };
  }, [startGyro]);

  // ── Mouse handlers ──────────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafRef.current !== null) return;
      const { clientX, clientY } = e;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        applyPointerTilt(clientX, clientY);
      });
    },
    [applyPointerTilt]
  );

  const handleMouseEnter = useCallback(() => {
    activeRef.current = true;
    setActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    activeRef.current = false;
    setActive(false);
    resetTilt();
  }, [resetTilt]);

  // ── Touch handlers ──────────────────────────────────────────────────────────
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      activeRef.current = true;
      setActive(true);
      applyPointerTilt(touch.clientX, touch.clientY);

      // iOS 13+: request DeviceOrientation permission on the first user gesture
      const DOE = DeviceOrientationEvent as DOEWithPermission;
      if (
        typeof DOE.requestPermission === "function" &&
        !gyroCleanupRef.current
      ) {
        DOE.requestPermission()
          .then((state) => {
            if (state === "granted") startGyro();
          })
          .catch(() => {
            /* permission denied — no gyro, touch-only */
          });
      }
    },
    [applyPointerTilt, startGyro]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (rafRef.current !== null) return;
      const touch = e.touches[0];
      const { clientX, clientY } = touch;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        applyPointerTilt(clientX, clientY);
      });
    },
    [applyPointerTilt]
  );

  const handleTouchEnd = useCallback(() => {
    activeRef.current = false;
    setActive(false);
    resetTilt();
  }, [resetTilt]);

  // ── Derived styles ──────────────────────────────────────────────────────────
  const transformStyle: React.CSSProperties = {
    transform: `perspective(${PERSPECTIVE}px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${active ? SCALE_ACTIVE : 1}, ${active ? SCALE_ACTIVE : 1}, 1)`,
    // During active interaction: no CSS transition — rAF drives updates at native 60fps.
    // Applying a CSS transition here would make the browser interpolate ~600 intermediate
    // states/sec (60 rAF updates × 0.1s ease), causing stutter on mid-range phones.
    // On release: spring-back cubic-bezier easing snaps the card back smoothly.
    transition: active
      ? "none"
      : "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
    willChange: "transform",
    transformStyle: "preserve-3d",
    // Prevent accidental text / logo selection while dragging on mobile
    userSelect: "none",
    WebkitUserSelect: "none",
  };

  const glareStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "17px",
    pointerEvents: "none",
    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)`,
    opacity: active ? 0.22 : 0,
    transition: active ? "opacity 0.1s" : "opacity 0.4s",
    zIndex: 1,
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="rounded-[18px] p-[1px] min-h-[254px] cursor-default"
      style={{ ...outerStyle, ...transformStyle }}
    >
      <div className="rounded-[17px] min-h-[252px] flex flex-col justify-between relative"
           style={{ transformStyle: "preserve-3d" }}>
        {/* Glare overlay — tracks pointer/touch position */}
        <div style={glareStyle} aria-hidden />

        {/* Logo — top right, 16px padding */}
        <div className="flex justify-end p-6" style={{ position: "relative", zIndex: 2, transform: "translateZ(40px)" }}>
          <img
            src="/beampay-logo.svg"
            alt="BeamPay"
            className="w-[100px]"
            style={{
              filter: "brightness(0)",
              opacity: 0.35,
            }}
          />
        </div>

        {/* Balance — bottom left, 16px padding */}
        <div className="pl-[28px] pb-[22px] flex flex-col items-start" style={{ position: "relative", zIndex: 2, transform: "translateZ(60px)" }}>
          <p
            className="text-base font-normal"
            style={{ color: "#618b00" }}
          >
            {secondaryLabel}
          </p>
          <p
            className="font-semibold"
            style={{
              fontSize: "48px",
              lineHeight: "56px",
              color: "#2a2b2e",
            }}
          >
            {mainBalance}
          </p>
        </div>
      </div>
    </div>
  );
}
