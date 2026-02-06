"use client";

import { useWallet } from "@/context/WalletContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BalanceCard() {
  const { balance } = useWallet();

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
      <CardHeader>
        <CardTitle className="text-sm font-medium opacity-90">
          Total Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-4xl font-bold">
            ${balance.toFixed(2)}
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
            Available
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
