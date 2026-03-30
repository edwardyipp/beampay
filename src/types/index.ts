export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string; // stored in localStorage (mocked auth)
  pin: string; // 4-digit security PIN
  emailVerified: boolean; // Step 4 verification
  currency: string; // Step 5 selection (USD, EUR, etc.)
  profilePicture?: string; // Step 6 upload or avatar selection (base64 or avatar ID)
  marketingConsent?: boolean; // Step 1 checkbox
  legalConsentDate?: string; // Step 3 checkbox timestamp
}

export interface SavedCard {
  id: string;
  lastFour: string; // e.g. "3456"
  expiry: string; // e.g. "12/26"
  label: string; // e.g. "Visa ending in 3456"
}

export interface Transaction {
  id: string;
  type: "topup" | "send";
  amount: number;
  description: string; // e.g. "Top-up" or "Sent to john@email.com"
  date: string; // ISO date string
  status: "completed";
}

export interface WalletData {
  balance: number;
  transactions: Transaction[];
  savedCards: SavedCard[];
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    currency: string
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (firstName: string, lastName: string, email: string) => Promise<boolean>;
  changePassword: (newPassword: string) => Promise<boolean>;
  deleteAccount: () => void;
  setPin: (pin: string) => Promise<boolean>;
  updateProfilePicture: (picture: string) => Promise<boolean>;
}

export interface PinVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  description: string;
}

export interface PinSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  savedCards: SavedCard[];
  topUp: (amount: number, card?: SavedCard, saveCard?: boolean, cardDetails?: {
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => Promise<void>;
  send: (recipientEmail: string, amount: number) => Promise<void>;
  deleteSavedCard: (cardId: string) => void;
}
