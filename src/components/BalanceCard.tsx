"use client";

import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrencySymbol, convertUsdToIdr, formatCurrency } from "@/lib/currency-utils";

export function BalanceCard() {
  const { balance } = useWallet();
  const { currentUser } = useAuth();

  // Get user's currency symbol (default to USD)
  const userCurrency = currentUser?.currency || "USD";
  const currencySymbol = getCurrencySymbol(userCurrency);

  // Calculate IDR equivalent (assuming balance is in USD)
  const idrAmount = convertUsdToIdr(balance);

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white dark:from-blue-700 dark:to-blue-900">
      <CardHeader>
        <CardTitle className="text-sm font-medium opacity-90">
          Total Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Primary Balance */}
          <div className="text-4xl font-bold">
            {currencySymbol}{balance.toFixed(2)}
          </div>

          {/* IDR Equivalent (if user currency is not IDR) */}
          {userCurrency !== "IDR" && (
            <div className="text-sm opacity-80">
              ≈ Rp {idrAmount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
            </div>
          )}

          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
            Available
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
