"use client";

import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { getCurrencySymbol, convertUsdToIdr } from "@/lib/currency-utils";

export function BalanceCard() {
  const { balance } = useWallet();
  const { currentUser } = useAuth();

  const userCurrency = currentUser?.currency || "USD";
  const currencySymbol = getCurrencySymbol(userCurrency);
  const idrAmount = convertUsdToIdr(balance);

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 min-h-[200px] flex flex-col justify-between"
      style={{
        background: `
          radial-gradient(ellipse at 5% 5%, #a8e500, transparent 55%),
          radial-gradient(ellipse at 95% 90%, #a8e500, transparent 50%),
          radial-gradient(ellipse 100% 60% at 60% 25%, rgba(255,255,245,0.9), transparent 55%),
          radial-gradient(ellipse 80% 50% at 30% 75%, rgba(250,248,225,0.85), transparent 50%),
          #d0e860
        `,
      }}
    >
      {/* BeamPay logo */}
      <div className="flex justify-end">
        <img
          src="/beampay-logo.svg"
          alt="BeamPay"
          className="h-[18px]"
          style={{ filter: "brightness(0)", opacity: 0.35 }}
        />
      </div>

      {/* Balance */}
      <div className="mt-auto pt-8">
        {userCurrency !== "IDR" && (
          <p className="text-sm font-medium mb-1" style={{ color: "rgba(70, 95, 10, 0.7)" }}>
            {idrAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            IDR
          </p>
        )}
        <p className="text-[40px] font-bold text-gray-900 tracking-tight leading-none">
          {currencySymbol}
          {balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
}
