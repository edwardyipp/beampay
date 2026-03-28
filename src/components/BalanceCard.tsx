"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { getCurrencySymbol, convertUsdToIdr } from "@/lib/currency-utils";
import { cn } from "@/lib/utils";

const MAX_TILT = 14;
const GYRO_MAX = 8;
const SCALE_ACTIVE = 1.025;
const PERSPECTIVE = 900;

type DOEWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

interface BalanceCardProps {
  /** When true, displays placeholder data — no context providers needed */
  demo?: boolean;
  demoBalance?: number;
  demoCurrency?: string;
  className?: string;
}

/** Public API — routes to ConnectedBalanceCard (context) or BalanceCardCore (demo) */
export function BalanceCard({ demo, demoBalance, demoCurrency, className }: BalanceCardProps = {}) {
  if (demo) {
    return <BalanceCardCore balance={demoBalance ?? 1250} userCurrency={demoCurrency ?? "USD"} className={className} />;
  }
  return <ConnectedBalanceCard className={className} />;
}

/** Reads from WalletContext/AuthContext then delegates to BalanceCardCore */
function ConnectedBalanceCard({ className }: { className?: string }) {
  const { balance } = useWallet();
  const { currentUser } = useAuth();
  return <BalanceCardCore balance={balance} userCurrency={currentUser?.currency || "USD"} className={className} />;
}

/** Presentational card with 3D tilt — no context dependency */
function BalanceCardCore({ balance, userCurrency, className }: { balance: number; userCurrency: string; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const betaBaseRef = useRef<number | null>(null);
  const gyroCleanupRef = useRef<(() => void) | null>(null);

  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  const [active, setActive] = useState(false);

  // ── Currency / balance ──────────────────────────────────────────────────────
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

  // ── Tilt helpers ──────────────────────────────────────────────────────────
  const applyPointerTilt = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
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

  // ── Gyroscope ───────────────────────────────────────────────────────────────
  const startGyro = useCallback(() => {
    if (gyroCleanupRef.current) return;
    const handler = (e: DeviceOrientationEvent) => {
      if (activeRef.current) return;
      const gamma = e.gamma ?? 0;
      const beta  = e.beta  ?? 0;
      if (betaBaseRef.current === null) {
        betaBaseRef.current = beta;
        return;
      }
      betaBaseRef.current = betaBaseRef.current * 0.98 + beta * 0.02;
      const rotY = Math.max(-GYRO_MAX, Math.min(GYRO_MAX, gamma * 0.55));
      const rotX = Math.max(-GYRO_MAX, Math.min(GYRO_MAX, -(beta - betaBaseRef.current) * 0.65));
      setTilt({ rotX, rotY, glareX: 50 + rotY * 2.5, glareY: 50 - rotX * 2.5 });
    };
    window.addEventListener("deviceorientation", handler);
    gyroCleanupRef.current = () => window.removeEventListener("deviceorientation", handler);
  }, []);

  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") return;
    const DOE = DeviceOrientationEvent as DOEWithPermission;
    if (typeof DOE.requestPermission !== "function") startGyro();
    return () => { gyroCleanupRef.current?.(); gyroCleanupRef.current = null; };
  }, [startGyro]);

  // ── Mouse handlers ──────────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafRef.current !== null) return;
      const { clientX, clientY } = e;
      rafRef.current = requestAnimationFrame(() => { rafRef.current = null; applyPointerTilt(clientX, clientY); });
    },
    [applyPointerTilt]
  );
  const handleMouseEnter = useCallback(() => { activeRef.current = true; setActive(true); }, []);
  const handleMouseLeave = useCallback(() => { activeRef.current = false; setActive(false); resetTilt(); }, [resetTilt]);

  // ── Touch handlers ──────────────────────────────────────────────────────────
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      activeRef.current = true;
      setActive(true);
      applyPointerTilt(touch.clientX, touch.clientY);
      const DOE = DeviceOrientationEvent as DOEWithPermission;
      if (typeof DOE.requestPermission === "function" && !gyroCleanupRef.current) {
        DOE.requestPermission().then((state) => { if (state === "granted") startGyro(); }).catch(() => {});
      }
    },
    [applyPointerTilt, startGyro]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (rafRef.current !== null) return;
      const touch = e.touches[0];
      const { clientX, clientY } = touch;
      rafRef.current = requestAnimationFrame(() => { rafRef.current = null; applyPointerTilt(clientX, clientY); });
    },
    [applyPointerTilt]
  );
  const handleTouchEnd = useCallback(() => { activeRef.current = false; setActive(false); resetTilt(); }, [resetTilt]);

  // ── Derived styles ──────────────────────────────────────────────────────────
  const transformStyle: React.CSSProperties = {
    transform: `perspective(${PERSPECTIVE}px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${active ? SCALE_ACTIVE : 1}, ${active ? SCALE_ACTIVE : 1}, 1)`,
    transition: active
      ? "none"
      : "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
    willChange: "transform",
    transformStyle: "preserve-3d",
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
      className={cn("rounded-[18px] p-[1px] aspect-[1.586] cursor-default", className)}
      style={{ ...outerStyle, ...transformStyle }}
    >
      <div className="rounded-[17px] h-full flex flex-col justify-between relative"
           style={{ transformStyle: "preserve-3d" }}>
        <div style={glareStyle} aria-hidden />

        {/* Logo — top right */}
        <div className="flex justify-end p-6" style={{ position: "relative", zIndex: 2, transform: "translateZ(40px)" }}>
          <img
            src="/beampay-logo.svg"
            alt="BeamPay"
            className="w-[100px]"
            style={{ filter: "brightness(0)", opacity: 0.35 }}
          />
        </div>

        {/* Balance — bottom left */}
        <div className="pl-[28px] pb-[22px] flex flex-col items-start" style={{ position: "relative", zIndex: 2, transform: "translateZ(60px)" }}>
          <p className="text-base font-normal" style={{ color: "#618b00" }}>
            {secondaryLabel}
          </p>
          <p className="font-semibold" style={{ fontSize: "48px", lineHeight: "56px", color: "#2a2b2e" }}>
            {mainBalance}
          </p>
        </div>
      </div>
    </div>
  );
}
