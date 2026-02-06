/**
 * Validates a 4-digit PIN
 * Rejects sequential patterns and repeated digits
 */
export function validatePin(pin: string): { valid: boolean; error?: string } {
  // Check if PIN is exactly 4 digits
  if (!/^\d{4}$/.test(pin)) {
    return { valid: false, error: "PIN must be exactly 4 digits" };
  }

  const digits = pin.split("").map(Number);

  // Check for all same digits (0000, 1111, etc.)
  if (new Set(digits).size === 1) {
    return { valid: false, error: "PIN cannot be all same digits" };
  }

  // Check for sequential ascending (1234, 2345, etc.)
  const isAscending = digits.every((digit, i) => {
    if (i === 0) return true;
    return digit === digits[i - 1] + 1;
  });

  if (isAscending) {
    return { valid: false, error: "PIN cannot be sequential" };
  }

  // Check for sequential descending (4321, 3210, etc.)
  const isDescending = digits.every((digit, i) => {
    if (i === 0) return true;
    return digit === digits[i - 1] - 1;
  });

  if (isDescending) {
    return { valid: false, error: "PIN cannot be sequential" };
  }

  return { valid: true };
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }
  return { valid: true };
}
