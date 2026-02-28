# BeamPay

A minimal, user-friendly digital wallet built with Next.js. Users can sign up, top up their balance via credit card, send money, manage saved cards, and view their full transaction history. All payment and auth flows are mocked — no external services required.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + CSS variables |
| UI Components | shadcn/ui (Radix UI) |
| Theming | next-themes (light/dark/system) |
| State & Persistence | React Context + localStorage |
| Notifications | Sonner (toast) |
| Payment / Auth | Fully mocked (no backend) |

---

## shadcn/ui Components Used

The following shadcn/ui primitives are used throughout the app to keep the UI consistent, accessible, and easy to maintain — no custom UI components are built from scratch.

| Component | Where it's used |
|-----------|-----------------|
| `Button` | All primary and secondary actions |
| `Card` / `CardHeader` / `CardContent` | Section containers |
| `Input` | Text and number fields |
| `Label` | Form labels |
| `Badge` | Saved card chips, transaction status tags |
| `Separator` | Visual dividers between sections |
| `Toaster` (Sonner) | Global toast notifications |
| `Select` | Saved card dropdown in top-up form |
| `AlertDialog` | Confirmation dialog for account deletion |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — providers, fonts, metadata
│   ├── page.tsx                # Auth gate — redirects based on auth state
│   ├── login/page.tsx          # Sign In / Sign Up page
│   ├── dashboard/page.tsx      # Main wallet dashboard
│   ├── transfer/page.tsx       # Send money (DrawerPage overlay)
│   ├── top-up/page.tsx         # Add funds (DrawerPage overlay)
│   ├── transactions/page.tsx   # Full transaction history
│   ├── settings/
│   │   ├── page.tsx            # Settings hub (menu)
│   │   ├── profile/page.tsx    # Edit name and email
│   │   ├── appearance/page.tsx # Theme selection (Light/Dark/System)
│   │   ├── security/page.tsx   # Change password
│   │   ├── payment/page.tsx    # Manage saved cards
│   │   └── close-account/page.tsx # Delete account
│   └── security-info/page.tsx  # Post-login security reminders
├── components/
│   ├── ui/                     # shadcn/ui primitives (generated, do not edit)
│   ├── PageHeader.tsx          # Shared header (avatar/title/back modes)
│   ├── BottomNav.tsx           # Floating pill navigation
│   ├── BalanceCard.tsx         # 3D tilt balance card
│   ├── DrawerPage.tsx          # Slide-up drawer wrapper
│   ├── SignupFlow.tsx          # 5-step registration wizard
│   ├── SettingsPageWrapper.tsx # Shared wrapper for settings sub-pages
│   ├── TopUpForm.tsx           # Credit card form + amount
│   ├── SendForm.tsx            # Send money — recipient + amount
│   ├── PinVerificationModal.tsx # PIN entry modal (4 digits, 3 attempts)
│   ├── TransactionHistory.tsx  # Transaction list
│   ├── EditProfileForm.tsx     # Edit name and email
│   ├── ChangePasswordForm.tsx  # Change password
│   ├── ManageCardsSection.tsx  # View/delete saved cards
│   └── DeleteAccountSection.tsx # Delete account with confirmation
├── context/
│   ├── AuthContext.tsx         # Auth state + CRUD helpers
│   ├── WalletContext.tsx       # Wallet state + balance, transactions, cards
│   └── ThemeContext.tsx        # Dark/light mode via next-themes
├── lib/
│   ├── validators.ts           # PIN, email, password validation
│   ├── currency-utils.ts       # Currency formatting + USD→IDR conversion
│   └── utils.ts                # cn() Tailwind class merge helper
└── types/
    └── index.ts                # Shared TypeScript interfaces
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Auth gate — redirects to `/login` or `/dashboard` |
| `/login` | Sign in or sign up (5-step signup wizard) |
| `/dashboard` | Main wallet view with balance card, CTAs, activities |
| `/transfer` | Send money (slide-up drawer overlay) |
| `/top-up` | Add funds via card (slide-up drawer overlay) |
| `/transactions` | Full transaction history |
| `/settings` | Settings hub — links to sub-pages below |
| `/settings/profile` | Edit name and email |
| `/settings/appearance` | Theme selection (Light / Dark / System) |
| `/settings/security` | Change password |
| `/settings/payment` | Manage saved payment cards |
| `/settings/close-account` | Delete account |
| `/security-info` | Post-login security reminders |

---

## Features

### Authentication (Mocked)
- **Sign Up** — enter name, email, and password. Credentials are stored in `localStorage`. After signup, the user is automatically signed in and redirected to the dashboard.
- **Sign In** — validates email and password against `localStorage`. Redirects to dashboard on success.
- **Sign Out** — clears the active session and redirects to login. Wallet data persists for next login.

### Balance
- Displayed large and prominently at the top of the dashboard.
- Updates instantly after a top-up or send.
- Persists across page refreshes via `localStorage`.

### Top Up
- User can enter full card details (card number, expiry, CVC) and an amount.
- Option to **select a previously saved card**, which skips manual card entry.
- Option to **save the card** after entering details — it is then available for future top-ups.
- A ~1.5s simulated loading delay runs on submit, then the balance increases and a success toast appears.

### Send Money
- User enters a **recipient email** and an **amount**.
- Validated: amount must be greater than 0 and not exceed the current balance.
- On success: balance decreases, a transaction is logged, and a success toast appears.
- On failure (e.g. insufficient balance): an error toast appears and nothing changes.

### Saved Cards
- Saved cards are displayed as badges/chips (e.g. "Visa ending in 3456").
- Cards can be selected in the top-up form to skip re-entering details.
- Each card can be individually deleted.

### Transaction History
- A chronological list of all top-ups and sends, newest first.
- Each entry shows: date, type (Top Up / Send), amount, recipient or source, and status.
- Shows a friendly empty state when no transactions exist yet.

### Notifications
- Uses shadcn/ui's Sonner toast system.
- Success toasts (green) for completed top-ups and sends.
- Error toasts (red) for validation failures and insufficient balance.
- Toasts auto-dismiss after ~3 seconds.

### Dark Mode
- Toggle between **light** and **dark** mode via the moon/sun button on the dashboard header.
- Full appearance settings at Settings > Appearance with three options: Light, Dark, System.
- Dark theme uses a **neon lime accent** palette on deep black backgrounds.
- Theme preference persists across sessions (stored by next-themes in localStorage).

### Account Settings
- Settings is a **hub page** linking to dedicated sub-pages, each with a back button.
- **Profile** — update name and email. PIN verification required for email changes.
- **Security** — change password. PIN verification always required.
- **Payment** — view and delete saved payment cards.
- **Close Account** — permanently delete your account and all associated data. Requires confirmation dialog + PIN verification. Irreversible.

---

## Data Model

All data is stored in `localStorage`, keyed per user.

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  pin: string;
  emailVerified: boolean;
  currency: string;
  profilePicture?: string;
}

interface SavedCard {
  id: string;
  lastFour: string;   // e.g. "3456"
  expiry: string;     // e.g. "12/26"
  label: string;      // e.g. "Visa ending in 3456"
}

interface Transaction {
  id: string;
  type: "topup" | "send";
  amount: number;
  description: string;   // e.g. "Top-up" or "Sent to john@email.com"
  date: string;          // ISO date string
  status: "completed";
}

interface WalletData {
  balance: number;
  transactions: Transaction[];
  savedCards: SavedCard[];
}
```

---

## Design Reference

The UI is inspired by [localpay.asia](https://localpay.asia/) — a clean, trust-forward fintech aesthetic.

- **Colors** — white/light-gray base with lime green accent in light mode; deep black with neon lime accent in dark mode
- **Layout** — generous whitespace, each section in its own rounded card with a subtle shadow
- **Balance** — the focal point, displayed large and bold at the top
- **Typography** — clean sans-serif, hierarchy driven by size and weight
- **Responsive** — single-column on mobile, spacious multi-section layout on desktop

---

## Timeline

Estimated breakdown by phase. Actual pace depends on review cycles and feedback loops.

| Phase | What's included | Estimate |
|-------|-----------------|----------|
| **Phase 1** | Project setup — Next.js, Tailwind, shadcn/ui init, types | 1 day |
| **Phase 2** | Auth flow — AuthContext, login/signup page, session handling | 2 days |
| **Phase 3** | Core wallet — WalletContext, BalanceCard, localStorage persistence | 1 day |
| **Phase 4** | Top-Up — TopUpForm, card input, saved card selection, save option | 2 days |
| **Phase 5** | Send — SendForm, validation, balance deduction | 1 day |
| **Phase 6** | Saved Cards — SavedCards component, delete, select in top-up | 1 day |
| **Phase 7** | Transaction History — TransactionHistory component, empty states | 1 day |
| **Phase 8** | Settings — EditProfileForm, ChangePasswordForm, ManageCardsSection, DeleteAccountSection | 2 days |
| **Phase 9** | Polish — Navbar (add settings link), responsive layout, transitions, UI review | 2 days |
| **Total** | MVP web app, fully functional | **~13 days** |

### Post-MVP (future)

| Phase | What's included | Estimate |
|-------|-----------------|----------|
| **Phase 10** | Port to React Native / Expo — iOS + Android | 2–3 weeks |
| **Phase 11** | Integrate real payment gateway (e.g. Stripe) | 1 week |
| **Phase 12** | Backend + database — replace localStorage with API | 2–3 weeks |

---

## Roadmap

| Phase | Platform | Notes |
|-------|----------|-------|
| MVP | Responsive Web App | Next.js — works on mobile browsers. This is where we are now. |
| Post-MVP | iOS + Android | Port to React Native / Expo. Primary users are on mobile. Component logic, context, and types are kept aligned intentionally to make this migration straightforward. |
