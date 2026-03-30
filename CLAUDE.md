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
| Haptics | web-haptics (haptic feedback on interactions) |
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
│   ├── settings/
│   │   ├── page.tsx            # Settings hub (menu linking to sub-pages)
│   │   ├── profile/page.tsx    # Edit name (email is read-only)
│   │   ├── appearance/page.tsx # Theme selection (Light/Dark/System)
│   │   ├── security/page.tsx   # Change password
│   │   ├── payment/page.tsx    # Manage saved cards
│   │   └── close-account/page.tsx # Delete account
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
│   ├── user-utils.ts     # getInitials, getFullName, parseNameFromEmail
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
const { currentUser, login, signup, logout, updateProfile, changePassword, deleteAccount, setPin, updateProfilePicture } = useAuth();
```

- `currentUser` is `null` when logged out; pages redirect via `useRouter` if unauthenticated.
- `signup(firstName, lastName, email, password, currency)` — creates a new user with no PIN, profile picture, or marketing consent. PIN and profile picture are set later via dedicated methods.
- `changePassword(newPassword)` — updates the user's password. Takes only the new password; identity is confirmed separately via PIN verification before this is called.
- `setPin(pin)` — sets or updates the user's 4-digit PIN.
- `updateProfilePicture(picture)` — sets or updates the user's profile picture (avatar key or base64 data URI).
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

### LauncherScreen (`src/components/LauncherScreen.tsx`)

Initial screen rendered on `/login` before the user chooses to log in or sign up.

- Two phases: `loading` (2 s) → `main`
- `loading`: `BalanceCard` displays its back face (demo mode)
- `main`: Card flips to front face, glowing orb fades in behind it, tagline + CTA buttons fade in
- Tagline gradient uses `neon-700`→`neon-500` in light mode, `neon-300`→`neon-400` in dark mode
- CTA buttons: "Create account" (`primary`) → calls `onCreateAccount` prop; "I already have account" (`ghost`) → calls `onLogin` prop
- Haptic feedback is handled automatically by the `Button` component

Props: `onCreateAccount: () => void`, `onLogin: () => void`

### SignupFlow (`src/components/SignupFlow.tsx`)

Three-step registration wizard rendered on `/login`:

1. Email (validates format AND checks for duplicate registration on Continue)
2. Password creation (with strength bar + requirements checklist + inline legal consent text)
3. Email verification (6-digit code with paste support + auto-submit on correct code)

Post-verification: "Setting up your account..." full-screen animation plays, `handleAccountSetup` double-checks email uniqueness (sends user back to step 1 if taken), then `parseNameFromEmail()` extracts first/last name from the email local part. Account is created and user is redirected to `/dashboard`. All accounts default to `"USD"`. PIN defaults to empty string; profile picture is not set during signup.

### PageHeader (`src/components/PageHeader.tsx`)

Shared header used on all authenticated pages. Three modes:

- **Avatar mode** (default): Shows user avatar + display name, links to `/settings`. Used on `/dashboard`. Optionally shows a theme toggle button on the right when `showThemeToggle` is passed.
- **Title + back mode** (`title` + `backHref` props): Shows a back arrow button (rounded circle) + page title. Used on settings sub-pages.
- **Title mode** (`title` prop only): Shows a plain page title (e.g., "Settings", "Activities"). Used on `/transactions` and `/settings`.

Display name logic: shows `firstName` alone if `lastName` is empty (does not fall back to email). Initials logic follows the same pattern.

Props: `linkToSettings?: boolean`, `title?: string`, `backHref?: string`, `showThemeToggle?: boolean`.

### DrawerPage (`src/components/DrawerPage.tsx`)

Slide-up drawer wrapper for overlay-style pages. Used on `/transfer` and `/top-up`.

- Slides up from bottom with `animate-in slide-in-from-bottom` (tw-animate-css)
- Slides down on close with `animate-out slide-out-to-bottom`
- Dark backdrop overlay (click to close, `cursor-pointer`)
- Rounded top corners (`rounded-t-[20px]`), drag handle pill, title + close button (X icon, `cursor-pointer`)
- Scrollable content area (`h-[90vh]`)
- Close button calls `router.back()` — returns to the referring page
- No BottomNav (drawer overlays the previous page)

These routes use **Next.js Intercepting Routes** (`@drawer` parallel slot with `(.)transfer` and `(.)top-up`) so the current page stays visible behind the backdrop during soft navigation. The standalone `/transfer` and `/top-up` pages serve as fallback for direct URL access.

### BottomNav (`src/components/BottomNav.tsx`)

Floating pill navigation fixed to the bottom viewport. Present on `/dashboard` and `/transactions`. **Not present** on settings pages (hub or sub-pages) or drawer overlays.

| Tab | Icon | Route |
|-----|------|-------|
| Home | House | `/dashboard` |
| Pay (center) | ScanLine (HTML/CSS button) | `/transfer` |
| Activities | Clock | `/transactions` |

### PinVerificationModal (`src/components/PinVerificationModal.tsx`)

Reusable modal for PIN-gated actions (send money, delete account, etc.):

- 4 individual digit inputs with auto-advance
- 3 attempts allowed before a **5-minute lockout**
- Calls `onSuccess` callback when PIN matches `user.pin`

### PinSetupModal (`src/components/PinSetupModal.tsx`)

Triggered when a PIN-gated action is attempted and the user has no PIN set (`user.pin === ""`):

- "Set up your security PIN" dialog
- Create 4-digit PIN + Confirm PIN
- Same validation rules as PinVerificationModal (no sequential, no repeated)
- On success: saves PIN via `setPin()` context method, then proceeds with the original action
- Used as a guard in SendForm, DeleteAccountSection, and ChangePasswordForm (NOT used in EditProfileForm — email is read-only so no PIN-gated action exists there)

**ChangePasswordForm** (`src/components/ChangePasswordForm.tsx`) has a simplified flow: single "New Password" field (min 6 chars) → PIN verification → `changePassword(newPassword)`. The current password and confirm password fields were removed — PIN serves as the identity check.

### SettingsPageWrapper (`src/components/SettingsPageWrapper.tsx`)

Reusable wrapper for settings sub-pages. Provides auth check + redirect, `PageHeader` with title and `backHref`, slide-in animation (`animate-in slide-in-from-right duration-200`), and consistent layout (`max-w-md mx-auto px-5 pb-10`). No BottomNav.

### BalanceCard (`src/components/BalanceCard.tsx`)

Displays the user's balance in their selected currency plus an IDR equivalent (static rate: 1 USD = 15,800 IDR). Features a 3D tilt effect driven by pointer/touch position and device gyroscope (DeviceOrientation API). The logo and balance text use `translateZ()` to pop above the card surface. Uses `preserve-3d` on both the outer card and inner container. **Always uses light mode styling** (lime gradient, dark text) regardless of the active theme.

### Base UI Component Styles

The following shadcn/ui primitives have been customized from their defaults:

- **button.tsx**: `rounded-full` (pill shape), `font-semibold`, `cursor-pointer`, `active:scale-[0.98]` press feedback. Integrates `web-haptics` — triggers `"success"` haptic on click when `variant="primary"`. Default variant is `primary` (not `default`). Sizes: `xs`, `sm`, `md` (h-[42px], text-base/16px), `lg` (h-14), `icon-xs/sm/md/lg`. Variants: `primary`, `destructive`, `outline`, `secondary`, `ghost`, `link`. The `link` variant uses `text-neon-700 dark:text-primary` for light mode readability (bare `text-primary` is bright lime and near-invisible on white).
- **input.tsx**: `rounded-xl`, `h-12`, `px-4`, `bg-white` (light mode), `dark:bg-input/30` (dark mode), `transition-all duration-200`. Focus/hover borders: `neon-600` in light mode, `neon-300` in dark mode.

These are intentional overrides to match the BeamPay design language. When regenerating via `npx shadcn@latest add`, these customizations will be lost and must be re-applied.

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

### `src/lib/user-utils.ts`

```typescript
getInitials(user)              // "John Doe" → "JD"
getFullName(user)              // { firstName: "John", lastName: "Doe" } → "John Doe"
parseNameFromEmail(email)      // "john.doe@gmail.com" → { firstName: "John", lastName: "Doe" }
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
3. Add `<PageHeader title="Page Name" />` for the header and `<BottomNav />` for navigation.
4. Use the standard container: `<div className="max-w-md mx-auto px-5 pb-[134px]">`.

### Adding a New Settings Sub-Page

1. Create `src/app/settings/<name>/page.tsx`.
2. Wrap content with `<SettingsPageWrapper title="Page Title">` — this handles auth, header with back button, layout, and animation.
3. Add the menu item to the `menuItems` array in `src/app/settings/page.tsx`.

> **Note:** `Navbar.tsx` and `Footer.tsx` are legacy components used only on `/documentation`. The `/design-system` page uses its own header (SVG logo via next/image + theme toggle). All authenticated pages use `BottomNav` + `PageHeader`.

### Adding a New shadcn/ui Component

```bash
npx shadcn@latest add <component>
```

This drops a file into `src/components/ui/`. Generally do **not** edit generated files by hand — re-run the command to regenerate after upstream updates. **Exception:** `button.tsx` and `input.tsx` have custom style overrides; see "Base UI Component Styles" section.

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
- **Avoid bare `text-primary` on interactive text in light mode**: `--primary` is bright lime (`#D9FF51`) and is near-invisible on white. Use `text-neon-700 dark:text-primary` for inline links, `variant="link"` buttons, and any accent-colored text that must be readable in both modes.

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
| `--secondary` | `#213201` | Dark neon background (neon-950) |
| `--secondary-foreground` | `#D9FF51` | Bright lime text on secondary (neon-300) |

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

The BalanceCard always uses its light mode lime gradient (inline CSS) regardless of theme — it does not change in dark mode.

### Theme switching

Users can toggle between light and dark mode via:
- **Dashboard**: Circle button (moon/sun icon) in the top-right of the `PageHeader` (`showThemeToggle` prop).
- **Settings > Appearance**: List-style selector with radio indicators (Light / Dark / System) at `/settings/appearance`.

Both use `useTheme()` from next-themes. The dashboard toggle uses `resolvedTheme` to also conditionally apply the lime background gradient only in light mode.

---

## Important Constraints

1. **No backend.** All storage is `localStorage`. Do not introduce server actions, API routes, or database calls without explicitly noting it as an architectural upgrade.
2. **Passwords are stored in plain text.** This is intentional for the MVP demo — do not hash unless migrating to a real backend.
3. **PIN validation is client-side only.** The PIN stored in `user.pin` is compared directly in `PinVerificationModal`.
4. **No tests.** There is no test framework configured. If adding tests, set up Jest + React Testing Library and document it here.
5. **Static exchange rate.** `convertUsdToIdr` uses a hardcoded rate. Do not call an external API for currency conversion without updating this section.
6. **shadcn/ui files in `src/components/ui/` are generated.** Treat them as read-only; use the CLI to regenerate. **Exception:** `button.tsx` and `input.tsx` have intentional style overrides (pill shape, taller height, etc.) — see "Base UI Component Styles" section. Re-apply those customizations after regenerating.

---

## Known Mocked / Simulated Behaviours

| Feature | How it's mocked |
|---|---|
| Email verification | `generateVerificationCode()` returns a code; it is shown in the UI and auto-validated |
| Card processing (top-up) | 1.5 s `setTimeout` simulates a payment gateway |
| Recipient lookup (send) | Scans the `users` array in localStorage |
| Profile picture upload | Converts file to base64 and stores in the user record |
| Security info dismissal | Flag written to `localStorage` on first dismiss |
| Email name parsing | `parseNameFromEmail()` extracts name from email local part; simulates enrichment API |

---

## Future Upgrade Path (documented for context)

- Replace `localStorage` with a real database (PostgreSQL/Prisma suggested) and add Next.js API routes or a separate backend.
- Hash passwords with bcrypt before storing.
- Integrate a real payment provider (Stripe, Midtrans) for top-up flows.
- Add proper JWT/session auth (NextAuth.js is the natural fit).
- Connect a live currency exchange rate API.
- Add Jest + React Testing Library for unit/integration tests.
