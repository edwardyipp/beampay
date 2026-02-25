# BeamPay — AI Assistant Guide

## Project Overview

BeamPay is a frontend-only digital wallet MVP built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. All data is persisted in browser `localStorage` — there is no backend, database, or external API. Every payment, auth, and email flow is simulated/mocked.

The app allows users to register, top up a balance, send money to other registered users, manage saved cards, and configure account settings — all within a single-page-app shell with dark mode support.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 + CSS variables |
| UI Primitives | shadcn/ui (Radix UI), New York style |
| Icons | Lucide React |
| Theming | next-themes |
| Notifications | Sonner (toast system) |
| State | React Context API |
| Persistence | Browser `localStorage` |

---

## Repository Layout

```
src/
├── app/                  # Next.js App Router — one file per route
│   ├── layout.tsx        # Root layout: providers, fonts, metadata
│   ├── page.tsx          # Auth gate: redirects to /login or /dashboard
│   ├── login/page.tsx    # Login + signup (renders SignupFlow)
│   ├── dashboard/page.tsx
│   ├── top-up/page.tsx
│   ├── transfer/page.tsx
│   ├── transactions/page.tsx
│   ├── settings/page.tsx
│   ├── security-info/page.tsx
│   ├── design-system/page.tsx
│   └── documentation/page.tsx
├── components/
│   ├── ui/               # shadcn/ui primitives (DO NOT edit manually)
│   │   ├── button.tsx, card.tsx, dialog.tsx, input.tsx, ...
│   └── *.tsx             # Feature components (edit freely)
├── context/
│   ├── AuthContext.tsx   # User auth state + CRUD helpers
│   ├── WalletContext.tsx # Balance, transactions, saved cards
│   └── ThemeContext.tsx  # Dark/light mode via next-themes
├── lib/
│   ├── validators.ts     # PIN, email, password validation rules
│   ├── auth-utils.ts     # generateVerificationCode()
│   ├── currency-utils.ts # getCurrencySymbol, formatCurrency, USD→IDR
│   ├── user-utils.ts     # getInitials, getFullName
│   └── utils.ts          # cn() Tailwind class merge helper
└── types/
    └── index.ts          # All shared TypeScript interfaces
```

---

## Data Model

### `localStorage` Keys

| Key | Contents |
|---|---|
| `users` | `User[]` — all registered accounts |
| `currentUserId` | `string` — active session user ID |
| `wallet_${userId}` | `WalletData` — balance, transactions, cards |
| `security-info-dismissed-${userId}` | `string` — flag to skip security info page |

### Core Types (`src/types/index.ts`)

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;       // stored in plain text (MVP only)
  pin: string;            // 4-digit string
  emailVerified: boolean;
  currency: string;       // "USD" | "EUR" | "GBP" | "SGD" | "AUD" | "JPY"
  profilePicture?: string; // "avatar-1".."avatar-8" or base64 data URI
  marketingConsent?: boolean;
  legalConsentDate?: string;
}

interface Transaction {
  id: string;
  type: "topup" | "send";
  amount: number;
  description: string;
  date: string;           // ISO 8601
  status: "completed";
}

interface SavedCard {
  id: string;
  lastFour: string;
  expiry: string;
  label: string;
}

interface WalletData {
  balance: number;
  transactions: Transaction[];
  savedCards: SavedCard[];
}
```

---

## State Management

### AuthContext

```typescript
const { user, login, signup, logout, updateProfile, changePassword, deleteAccount } = useAuth();
```

- `user` is `null` when logged out; pages redirect via `useRouter` if unauthenticated.
- `signup` accepts all `User` fields and writes to the `users` array in localStorage.
- A migration helper in the context upgrades Phase-1 user records that may lack newer fields.

### WalletContext

```typescript
const { walletData, topUp, send, deleteSavedCard } = useWallet();
```

- `topUp(amount, card?, saveCard?, cardDetails?)` — adds funds; simulates 1.5 s network delay.
- `send(recipientEmail, amount)` — validates sufficient balance, deducts from sender, credits recipient.
- All mutations immediately write back to `localStorage`.

### ThemeContext

Thin wrapper around `next-themes`. Components use Tailwind's `dark:` prefix for dark-mode styles.

---

## Key Components

### SignupFlow (`src/components/SignupFlow.tsx`)

Six-step registration wizard rendered on `/login`:

1. Email + marketing consent
2. Password creation
3. Name + legal consent
4. Email verification (mock 6-digit code via `generateVerificationCode()`)
5. Currency selection
6. Profile picture (avatar or upload) + 4-digit PIN creation

### PinVerificationModal (`src/components/PinVerificationModal.tsx`)

Reusable modal for PIN-gated actions (send money, delete account, etc.):

- 4 individual digit inputs with auto-advance
- 3 attempts allowed before a **5-minute lockout**
- Calls `onSuccess` callback when PIN matches `user.pin`

### BalanceCard (`src/components/BalanceCard.tsx`)

Displays the user's balance in their selected currency plus an IDR equivalent (static rate: 1 USD = 15,800 IDR).

---

## Utility Functions

### `src/lib/validators.ts`

```typescript
validatePin(pin)      // blocks sequential (1234) and repeated (0000) PINs
validateEmail(email)  // basic format check
validatePassword(pw)  // min 6 characters
```

### `src/lib/currency-utils.ts`

```typescript
getCurrencySymbol(code)         // "USD" → "$"
getCurrencyName(code)           // "USD" → "US Dollar"
convertUsdToIdr(amount)         // static 15,800 rate
formatCurrency(amount, code)    // locale-aware; no decimals for JPY
```

### `src/lib/utils.ts`

```typescript
cn(...inputs)   // Tailwind class merge (clsx + tailwind-merge)
```

---

## Development Workflow

### Commands

```bash
npm run dev    # Start dev server at http://localhost:3000
npm run build  # Type-check + production build
npm start      # Serve production build
npm run lint   # ESLint (next/core-web-vitals + TypeScript)
```

### Adding a New Page

1. Create `src/app/<route>/page.tsx`.
2. Wrap with auth check if the page requires login (copy the pattern from `/dashboard/page.tsx`).
3. Add a link in `Navbar.tsx` if needed.

### Adding a New shadcn/ui Component

```bash
npx shadcn@latest add <component>
```

This drops a file into `src/components/ui/`. Do **not** edit generated files by hand — re-run the command to regenerate after upstream updates.

### Adding a New Feature Component

Place in `src/components/`. Use the `cn()` helper for conditional Tailwind classes. Use the `useAuth()` / `useWallet()` hooks for data access.

---

## Coding Conventions

### TypeScript

- **Strict mode is on.** No implicit `any`, no unchecked nullable access.
- All shared interfaces live in `src/types/index.ts`. Do not define one-off inline types for data that crosses component boundaries.
- Use `const` assertions and discriminated unions where applicable.

### Styling

- **Tailwind CSS v4** — utility classes only; no custom CSS files.
- Use `cn()` from `src/lib/utils.ts` for conditional class merging.
- Dark-mode variants use the `dark:` prefix (class-based, not media-query).
- Follow the existing spacing/color scale — do not introduce arbitrary values unless necessary.
- **Always use CSS variable-based Tailwind classes** (`bg-background`, `bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `border-border`) instead of hardcoded palette classes (`bg-gray-900`, `text-gray-600`, `border-gray-700`). Hardcoded classes bypass the theme system and won't pick up dark mode colors.
- **Semantic colors are the exception**: red (`text-red-600`, `bg-red-600`), green (`text-green-600`, `bg-green-100`), blue (`bg-blue-100`, `text-blue-600`), amber — when used for transaction type indicators, destructive actions, or status icons — are intentional and should stay hardcoded.

### Components

- Functional components only; no class components.
- Props types are declared as `interface`, not `type`, and placed at the top of the file.
- Keep page components (`src/app/*/page.tsx`) thin — delegate logic to context hooks and separate components.
- Toast notifications use `import { toast } from "sonner"`.

### State & Side Effects

- Global state lives in one of the three context files (`AuthContext`, `WalletContext`, `ThemeContext`). Avoid prop-drilling more than one level deep.
- `useEffect` dependencies must be complete (ESLint enforces this).
- No `useState` in page files if the same data is available from context.

### File Naming

- Pages: `page.tsx` (Next.js convention).
- Components: PascalCase (e.g., `SendForm.tsx`).
- Utilities/helpers: camelCase (e.g., `currency-utils.ts`).
- Types: `index.ts` inside `src/types/`.

---

## Dark Theme

The dark mode uses a **neon lime accent** palette (hue 122.4 in OKLCH). All CSS variables are defined in `src/app/globals.css`.

### Key dark-mode variables

| Variable | Value | Purpose |
|---|---|---|
| `--background` | `oklch(0.1 0.01 122.4)` | Deep black with subtle lime tint |
| `--card` | `oklch(0.15 0.01 122.4)` | Slightly lighter surface |
| `--primary` | `oklch(0.93 0.26 122.4)` | Neon lime ≈ RGB(209, 254, 23) |
| `--primary-foreground` | `oklch(0 0 0)` | Black text on neon lime |
| `--muted` | `oklch(0.2 0.02 122.4)` | De-emphasized surface |
| `--muted-foreground` | `oklch(0.7 0 0)` | De-emphasized text |
| `--border` | `oklch(1 0 0 / 0.15)` | Translucent white border |
| `--ring` | `oklch(0.93 0.26 122.4)` | Lime focus ring |

### Custom primary variations (dark only)

These are registered in `@theme inline` and available as Tailwind utilities:

| CSS variable | Tailwind class | Purpose |
|---|---|---|
| `--primary-light` | `bg-primary-light` / `text-primary-light` | Lighter lime for gradient endpoints |
| `--primary-dark` | `bg-primary-dark` / `text-primary-dark` | Darker lime for gradient starts |
| `--primary-ring` | `ring-primary-ring` | Lime focus ring |

### Branded gradient pattern

Branded text gradients (Logo, SignupFlow header) use:
```tsx
className="bg-gradient-to-r from-primary to-blue-600 dark:to-primary-light bg-clip-text text-transparent"
```
Light mode: dark gray → blue. Dark mode: neon lime → lighter lime.

The BalanceCard uses:
```tsx
className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-primary-dark dark:to-[oklch(0.3_0.18_122.4)] dark:text-primary-foreground"
```

---

## Important Constraints

1. **No backend.** All storage is `localStorage`. Do not introduce server actions, API routes, or database calls without explicitly noting it as an architectural upgrade.
2. **Passwords are stored in plain text.** This is intentional for the MVP demo — do not hash unless migrating to a real backend.
3. **PIN validation is client-side only.** The PIN stored in `user.pin` is compared directly in `PinVerificationModal`.
4. **No tests.** There is no test framework configured. If adding tests, set up Jest + React Testing Library and document it here.
5. **Static exchange rate.** `convertUsdToIdr` uses a hardcoded rate. Do not call an external API for currency conversion without updating this section.
6. **shadcn/ui files in `src/components/ui/` are generated.** Treat them as read-only; use the CLI to regenerate.

---

## Known Mocked / Simulated Behaviours

| Feature | How it's mocked |
|---|---|
| Email verification | `generateVerificationCode()` returns a code; it is shown in the UI and auto-validated |
| Card processing (top-up) | 1.5 s `setTimeout` simulates a payment gateway |
| Recipient lookup (send) | Scans the `users` array in localStorage |
| Profile picture upload | Converts file to base64 and stores in the user record |
| Security info dismissal | Flag written to `localStorage` on first dismiss |

---

## Future Upgrade Path (documented for context)

- Replace `localStorage` with a real database (PostgreSQL/Prisma suggested) and add Next.js API routes or a separate backend.
- Hash passwords with bcrypt before storing.
- Integrate a real payment provider (Stripe, Midtrans) for top-up flows.
- Add proper JWT/session auth (NextAuth.js is the natural fit).
- Connect a live currency exchange rate API.
- Add Jest + React Testing Library for unit/integration tests.
