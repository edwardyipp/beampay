/**
 * Maps currency code to symbol
 */
export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    SGD: "S$",
    AUD: "A$",
    JPY: "¥",
    IDR: "Rp",
  };

  return symbols[currency] || currency;
}

/**
 * Maps currency code to name
 */
export function getCurrencyName(currency: string): string {
  const names: Record<string, string> = {
    USD: "United States Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    SGD: "Singapore Dollar",
    AUD: "Australian Dollar",
    JPY: "Japanese Yen",
    IDR: "Indonesian Rupiah",
  };

  return names[currency] || currency;
}

/**
 * Converts USD to IDR (mocked exchange rate)
 */
export function convertUsdToIdr(usdAmount: number): number {
  const exchangeRate = 15800; // 1 USD = 15,800 IDR (approximate, static for demo)
  return usdAmount * exchangeRate;
}

/**
 * Formats currency amount with symbol
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);

  // Format with appropriate decimal places
  if (currency === "JPY") {
    // Japanese Yen doesn't use decimals
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }

  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
