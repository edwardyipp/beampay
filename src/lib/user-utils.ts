/**
 * Extracts initials from first and last name
 */
export function getInitials(firstName: string, lastName: string): string {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
}

/**
 * Gets full name from first and last name
 */
export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

/**
 * Parses a display name from an email address.
 * e.g. "john.doe@gmail.com" → { firstName: "John", lastName: "Doe" }
 * Falls back to empty strings for unparseable emails.
 */
export function parseNameFromEmail(email: string): {
  firstName: string;
  lastName: string;
} {
  const local = email.split("@")[0] || "";
  // Split on common separators
  const parts = local
    .split(/[._-]/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !/^\d+$/.test(p));

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  return {
    firstName: capitalize(parts[0]),
    lastName: parts.length > 1 ? capitalize(parts[parts.length - 1]) : "",
  };
}
