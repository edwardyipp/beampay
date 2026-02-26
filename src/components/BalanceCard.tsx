"use client";

import { useTheme } from "next-themes";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { getCurrencySymbol, convertUsdToIdr } from "@/lib/currency-utils";

export function BalanceCard() {
  const { balance } = useWallet();
  const { currentUser } = useAuth();
  const { resolvedTheme } = useTheme();

  const userCurrency = currentUser?.currency || "USD";
  const currencySymbol = getCurrencySymbol(userCurrency);
  const idrAmount = convertUsdToIdr(balance);
  const isIDRUser = userCurrency === "IDR";
  const isDark = resolvedTheme === "dark";

  // Small label shown above the main balance (matches Figma: IDR on top, USD below)
  const secondaryLabel = isIDRUser
    ? `$${balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : `${idrAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} IDR`;

  // Large primary balance
  const mainBalance = isIDRUser
    ? `${idrAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} IDR`
    : `${currencySymbol}${balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

  // Light mode: Figma exact diagonal gradient. Dark mode: neon lime gradient.
  const outerStyle = isDark
    ? {
        background:
          "linear-gradient(to bottom right, oklch(0.85 0.26 122.4), oklch(0.3 0.18 122.4))",
      }
    : {
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(236,255,168,0.85) 45%, rgba(227,255,125,0.925) 70%, rgba(217,255,81,1) 100%)",
        backgroundColor: "#c6fe1e",
        boxShadow: "-2px 6px 40px 0px rgba(0,0,0,0.15)",
      };

  return (
    <div
      className="rounded-[18px] p-[1px] min-h-[254px]"
      style={outerStyle}
    >
      <div className="rounded-[17px] min-h-[252px] flex flex-col justify-between overflow-hidden">
        {/* Logo — top right, 16px padding */}
        <div className="flex justify-end p-4">
          <img
            src="/beampay-logo.svg"
            alt="BeamPay"
            className="w-[100px]"
            style={{
              filter: isDark ? "brightness(0) invert(1)" : "brightness(0)",
              opacity: isDark ? 0.45 : 0.35,
            }}
          />
        </div>

        {/* Balance — bottom left, 16px padding */}
        <div className="p-4 flex flex-col items-start">
          {/* Small secondary label: IDR for non-IDR users, USD for IDR users */}
          <p
            className="text-base font-normal"
            style={{ color: isDark ? "oklch(0.85 0.26 122.4)" : "#618b00" }}
          >
            {secondaryLabel}
          </p>
          {/* Large primary balance */}
          <p
            className="font-semibold"
            style={{
              fontSize: "48px",
              lineHeight: "56px",
              color: isDark ? "oklch(0 0 0)" : "#2a2b2e",
            }}
          >
            {mainBalance}
          </p>
        </div>
      </div>
    </div>
  );
}
