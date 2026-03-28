"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { getCurrencySymbol, convertUsdToIdr } from "@/lib/currency-utils";
import { cn } from "@/lib/utils";
import { useWebHaptics } from "web-haptics/react";

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
  /** When true, shows the card back face (logo). Flip to false to animate to front. */
  showBack?: boolean;
  /** When true, tapping/clicking the card triggers a 360° horizontal spin. */
  tappable?: boolean;
}

/** Public API — routes to ConnectedBalanceCard (context) or BalanceCardCore (demo) */
export function BalanceCard({ demo, demoBalance, demoCurrency, className, showBack, tappable }: BalanceCardProps = {}) {
  if (demo) {
    return <BalanceCardCore balance={demoBalance ?? 1250} userCurrency={demoCurrency ?? "USD"} className={className} showBack={showBack} tappable={tappable} />;
  }
  return <ConnectedBalanceCard className={className} showBack={showBack} tappable={tappable} />;
}

/** Reads from WalletContext/AuthContext then delegates to BalanceCardCore */
function ConnectedBalanceCard({ className, showBack, tappable }: { className?: string; showBack?: boolean; tappable?: boolean }) {
  const { balance } = useWallet();
  const { currentUser } = useAuth();
  return <BalanceCardCore balance={balance} userCurrency={currentUser?.currency || "USD"} className={className} showBack={showBack} tappable={tappable} />;
}

/** Presentational card with 3D tilt and flip — no context dependency */
function BalanceCardCore({ balance, userCurrency, className, showBack = false, tappable = false }: { balance: number; userCurrency: string; className?: string; showBack?: boolean; tappable?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const betaBaseRef = useRef<number | null>(null);
  const gyroCleanupRef = useRef<(() => void) | null>(null);

  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  const [active, setActive] = useState(false);

  // ── Flip scale — zooms in on back face, zooms out to 1 on flip ─────────────
  const [flipScale, setFlipScale] = useState(showBack ? 0.85 : 1);

  useEffect(() => {
    if (showBack) {
      const t = setTimeout(() => setFlipScale(1.4), 50);
      return () => clearTimeout(t);
    } else {
      setFlipScale(1);
    }
  }, [showBack]);

  // ── Tap-to-spin (launcher page) ────────────────────────────────────────────
  const { trigger } = useWebHaptics();
  const [spinDelta, setSpinDelta] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleCardClick = useCallback(() => {
    if (!tappable || showBack) return;
    trigger("success");
    setIsSpinning(true);
    setSpinDelta((prev) => prev + 360);
    setTimeout(() => setIsSpinning(false), 1300);
  }, [tappable, showBack, trigger]);

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
  const frontBackground = {
    backgroundImage:
      "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(236,255,168,0.7) 45%, rgba(227,255,125,0.8) 70%, rgba(217,255,81,0.9) 100%), url('/bg-mesh-01.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#c6fe1e",
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

  // ── Mouse handlers (disabled when showing back) ──────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (showBack || rafRef.current !== null) return;
      const { clientX, clientY } = e;
      rafRef.current = requestAnimationFrame(() => { rafRef.current = null; applyPointerTilt(clientX, clientY); });
    },
    [applyPointerTilt, showBack]
  );
  const handleMouseEnter = useCallback(() => {
    if (showBack) return;
    activeRef.current = true; setActive(true);
  }, [showBack]);
  const handleMouseLeave = useCallback(() => {
    if (showBack) return;
    activeRef.current = false; setActive(false); resetTilt();
  }, [resetTilt, showBack]);

  // ── Touch handlers (disabled when showing back) ──────────────────────────────
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (showBack) return;
      const touch = e.touches[0];
      activeRef.current = true;
      setActive(true);
      applyPointerTilt(touch.clientX, touch.clientY);
      const DOE = DeviceOrientationEvent as DOEWithPermission;
      if (typeof DOE.requestPermission === "function" && !gyroCleanupRef.current) {
        DOE.requestPermission().then((state) => { if (state === "granted") startGyro(); }).catch(() => {});
      }
    },
    [applyPointerTilt, startGyro, showBack]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (showBack || rafRef.current !== null) return;
      const touch = e.touches[0];
      const { clientX, clientY } = touch;
      rafRef.current = requestAnimationFrame(() => { rafRef.current = null; applyPointerTilt(clientX, clientY); });
    },
    [applyPointerTilt, showBack]
  );
  const handleTouchEnd = useCallback(() => {
    if (showBack) return;
    activeRef.current = false; setActive(false); resetTilt();
  }, [resetTilt, showBack]);

  // ── Derived styles ──────────────────────────────────────────────────────────
  const frontTransform: React.CSSProperties = {
    transform: `perspective(${PERSPECTIVE}px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${active ? SCALE_ACTIVE : 1}, ${active ? SCALE_ACTIVE : 1}, 1)`,
    transition: active
      ? "none"
      : "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
    willChange: "transform",
    transformStyle: "preserve-3d" as const,
    boxShadow: active
      ? "-4px 14px 56px 0px rgba(0,0,0,0.22)"
      : "-2px 6px 40px 0px rgba(0,0,0,0.15)",
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
      onClick={handleCardClick}
      className={cn("aspect-[1.586]", tappable && !showBack ? "cursor-pointer" : "cursor-default", className)}
      style={{ perspective: "1200px", userSelect: "none", WebkitUserSelect: "none" }}
    >
      {/* Flip card — rotates to reveal front/back */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateY(${(showBack ? 180 : 0) + spinDelta}deg) scale(${flipScale})`,
          transition: showBack
            ? "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
            : isSpinning
              ? "transform 1.3s cubic-bezier(0.4, 0.0, 0.2, 1)"
              : "transform 0.9s cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      >
        {/* ── Front face ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "17px",
            padding: "1px",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            ...frontBackground,
            ...frontTransform,
          }}
        >
          <div
            className="rounded-[17px] h-full flex flex-col justify-between relative"
            style={{ transformStyle: "preserve-3d" }}
          >
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

        {/* ── Back face ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "17px",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "var(--background)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo-beampay-neon.svg"
            alt="BeamPay"
            className="w-32 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
