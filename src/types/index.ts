export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // stored in localStorage (mocked auth)
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
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, email: string) => Promise<boolean>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<boolean>;
  deleteAccount: () => void;
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
