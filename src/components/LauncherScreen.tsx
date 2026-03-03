"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LauncherScreenProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}

type LauncherPhase = "splash" | "scene";

const LAUNCHER_IMAGES = [
  "/launcher/background-sky.png",
  "/launcher/object-market.png",
  "/launcher/object-boat.png",
];

export function LauncherScreen({ onCreateAccount, onLogin }: LauncherScreenProps) {
  const [phase, setPhase] = useState<LauncherPhase>("splash");
  const [imagesReady, setImagesReady] = useState(false);
  const [splashMinElapsed, setSplashMinElapsed] = useState(false);

  // Minimum 2s splash duration
  useEffect(() => {
    const timer = setTimeout(() => setSplashMinElapsed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Preload scene images during splash
  useEffect(() => {
    let loaded = 0;
    LAUNCHER_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === LAUNCHER_IMAGES.length) setImagesReady(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === LAUNCHER_IMAGES.length) setImagesReady(true);
      };
      img.src = src;
    });
  }, []);

  // Advance from splash once both conditions met
  useEffect(() => {
    if (splashMinElapsed && imagesReady) {
      setPhase("scene");
    }
  }, [splashMinElapsed, imagesReady]);


  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* ===== Splash Background (fades out, logo moves separately) ===== */}
      <div
        className={cn(
          "absolute inset-0 z-40 bg-background transition-opacity duration-700",
          phase === "splash" ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* ===== Logo — stays visible, floats up to sky center ===== */}
      <div
        className={cn(
          "absolute inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-1000 ease-out",
          phase === "splash"
            ? "top-1/2 -translate-y-1/2"
            : "top-[15%] -translate-y-1/2"
        )}
      >
        <img
          src="/logo-beampay-dark.svg"
          alt="BeamPay"
          className="w-48 h-auto"
        />
      </div>

      {/* ===== Animated Scene (mounts after splash to trigger CSS animations) ===== */}
      {phase !== "splash" && (
        <>
          {/* Sky background — zooms from 1.2 to 1.0 */}
          <div
            className="absolute inset-0 z-0 launcher-sky"
            style={{
              backgroundImage: "url('/launcher/background-sky.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Market — slides up from below, fills viewport height */}
          <div className="absolute inset-0 z-10 launcher-market flex justify-center items-end">
            <img
              src="/launcher/object-market.png"
              alt=""
              className="h-full w-auto max-w-none"
              draggable={false}
            />
          </div>

          {/* Boat — slides up from below (staggered), proportional to market */}
          <div className="absolute inset-0 z-20 launcher-boat flex justify-center items-end">
            <img
              src="/launcher/object-boat.png"
              alt=""
              className="h-full w-auto max-w-none"
              draggable={false}
            />
          </div>

          {/* ===== CTA Overlay — slides up with the boat ===== */}
          <div className="absolute inset-x-0 bottom-0 z-30 launcher-cta">
            <div className="h-[45vh] flex flex-col justify-end items-center pb-12 px-6"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.85) 50%, white 65%)",
              }}
            >
              <div className="w-full max-w-md space-y-3">
                <Button
                  onClick={onCreateAccount}
                  className="w-full h-12 text-base font-semibold rounded-full"
                >
                  Create new account
                </Button>
                <button
                  onClick={onLogin}
                  className="w-full h-12 text-base font-medium text-foreground hover:underline"
                >
                  I already have account
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
