"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                BeamPay
              </Link>
              <span className="text-sm text-gray-500 dark:text-gray-400">Documentation</span>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Introduction */}
          <div>
            <h1 className="text-4xl font-bold mb-4 dark:text-white">BeamPay Documentation</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              A minimal, user-friendly digital wallet built with Next.js. Users can sign up, top up their balance via credit card, send money, manage saved cards, and view their full transaction history.
            </p>
          </div>

          <Separator />

          {/* Team & Stakeholders */}
          <section>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Team & Stakeholders</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Design Lead</CardTitle>
                  <CardDescription>Project oversight and design direction</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium dark:text-gray-200">Edward</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>UX/UI Design Team</CardTitle>
                  <CardDescription>User experience and visual design</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-lg font-medium dark:text-gray-200">Fenny</li>
                    <li className="text-lg font-medium dark:text-gray-200">Herdian</li>
                    <li className="text-lg font-medium dark:text-gray-200">Anggun</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Tech Stack */}
          <section>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Technology Stack</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Planning & Development</CardTitle>
                  <CardDescription>AI-assisted coding</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium dark:text-gray-200">Claude Code</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    AI pair programmer for rapid prototyping and implementation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visual Design</CardTitle>
                  <CardDescription>Design tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium dark:text-gray-200">Figma</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Collaborative interface design and prototyping
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Development Framework</CardTitle>
                  <CardDescription>Core technologies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium dark:text-gray-200">Next.js 14</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    React framework with TypeScript, Tailwind CSS, and shadcn/ui
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Version Control</CardTitle>
                  <CardDescription>Code management</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium dark:text-gray-200">GitHub</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Source code repository and collaboration platform
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deployment & CI/CD</CardTitle>
                  <CardDescription>Hosting platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium dark:text-gray-200">Vercel</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Automatic deployments on every commit to main branch
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>State Management</CardTitle>
                  <CardDescription>Data persistence</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium dark:text-gray-200">React Context + localStorage</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Client-side state with browser storage for data persistence
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Project Timeline */}
          <section>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Project Timeline</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Phase 1: MVP Development</span>
                    <span className="text-sm font-normal text-green-600 dark:text-green-400">✓ Completed</span>
                  </CardTitle>
                  <CardDescription>Core wallet functionality</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Authentication system (signup, login, logout)</li>
                    <li>• Balance management and display</li>
                    <li>• Top-up functionality with credit card input</li>
                    <li>• Send money to other users</li>
                    <li>• Transaction history</li>
                    <li>• Settings page (edit profile, change password, manage cards)</li>
                    <li>• Account deletion with confirmation</li>
                    <li>• Saved cards management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Phase 2: Enhanced Features</span>
                    <span className="text-sm font-normal text-green-600 dark:text-green-400">✓ Completed</span>
                  </CardTitle>
                  <CardDescription>Onboarding and security improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Rebranded to "BeamPay" with gradient logo</li>
                    <li>• 5-step onboarding flow (email, password, name, verification, PIN)</li>
                    <li>• Dark mode support with theme toggle</li>
                    <li>• 4-digit PIN verification for sensitive actions</li>
                    <li>• Security information page post-signup</li>
                    <li>• Profile picture upload and avatar library (8 avatars)</li>
                    <li>• Multi-currency support with USD as default</li>
                    <li>• IDR conversion display on balance card</li>
                    <li>• Dedicated transactions page</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Phase 3: UI/UX Refinements</span>
                    <span className="text-sm font-normal text-blue-600 dark:text-blue-400">Current</span>
                  </CardTitle>
                  <CardDescription>Layout and navigation improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Changed default theme to light mode</li>
                    <li>• Added footer with Design System and Documentation links</li>
                    <li>• Fixed dark mode contrast issues on Balance Card</li>
                    <li>• Made avatar/name clickable to navigate to Settings</li>
                    <li>• Renamed "Send Money" to "Transfer"</li>
                    <li>• Renamed "Recent Transactions" to "Activities"</li>
                    <li>• Separated Top Up and Transfer into dedicated pages</li>
                    <li>• Replaced dashboard forms with action buttons</li>
                    <li>• Removed currency selection step (USD only for now)</li>
                    <li>• Added autofocus to form inputs for better UX</li>
                    <li>• Created comprehensive documentation page</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Features */}
          <section>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>• Multi-step signup flow with email verification</p>
                  <p>• Password-based login</p>
                  <p>• Profile picture customization (upload or avatar library)</p>
                  <p>• 4-digit security PIN for sensitive actions</p>
                  <p>• Persistent sessions via localStorage</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wallet Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>• Balance display with USD and IDR conversion</p>
                  <p>• Top-up via credit card (mocked)</p>
                  <p>• Transfer funds to other users</p>
                  <p>• Saved cards management</p>
                  <p>• Real-time balance updates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>• Complete transaction history</p>
                  <p>• Chronological order (newest first)</p>
                  <p>• Type indicators (Top Up / Transfer)</p>
                  <p>• Date and time stamps</p>
                  <p>• Status badges</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>• PIN verification modal with lockout system</p>
                  <p>• Required for transfers, settings changes, deletions</p>
                  <p>• Password strength validation</p>
                  <p>• Security information page</p>
                  <p>• Account deletion with confirmation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>• Edit profile (name, email)</p>
                  <p>• Change password</p>
                  <p>• Manage saved cards</p>
                  <p>• Theme toggle (light/dark mode)</p>
                  <p>• Account deletion</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>UI/UX</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>• Responsive design (mobile-first)</p>
                  <p>• Dark mode support with system detection</p>
                  <p>• Toast notifications for user feedback</p>
                  <p>• Form autofocus for better flow</p>
                  <p>• Accessible components from shadcn/ui</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Getting Started */}
          <section>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Getting Started</h2>
            <Card>
              <CardHeader>
                <CardTitle>Local Development</CardTitle>
                <CardDescription>Run BeamPay on your local machine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2 dark:text-gray-200">1. Install dependencies</p>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm">
                      npm install
                    </code>
                  </div>
                  <div>
                    <p className="font-medium mb-2 dark:text-gray-200">2. Run the development server</p>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm">
                      npm run dev
                    </code>
                  </div>
                  <div>
                    <p className="font-medium mb-2 dark:text-gray-200">3. Open in your browser</p>
                    <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm">
                      http://localhost:3000
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Architecture */}
          <section>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Project Architecture</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm font-mono text-gray-700 dark:text-gray-300">
                    <li>/ - Entry point (auth gate)</li>
                    <li>/login - Sign in / Sign up</li>
                    <li>/dashboard - Main wallet view</li>
                    <li>/top-up - Top up page</li>
                    <li>/transfer - Transfer page</li>
                    <li>/transactions - Full transaction history</li>
                    <li>/settings - Account settings</li>
                    <li>/security-info - Security information</li>
                    <li>/design-system - UI components showcase</li>
                    <li>/documentation - This page</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm font-mono text-gray-700 dark:text-gray-300">
                    <li>Navbar - Top navigation</li>
                    <li>Footer - Bottom links</li>
                    <li>BalanceCard - Balance display</li>
                    <li>TopUpForm - Add funds</li>
                    <li>SendForm - Transfer money</li>
                    <li>TransactionHistory - Activity list</li>
                    <li>PinVerificationModal - Security PIN</li>
                    <li>SignupFlow - 5-step onboarding</li>
                    <li>ThemeToggle - Light/dark mode</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Context Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li><span className="font-mono">AuthContext</span> - Authentication state, login, signup, logout</li>
                    <li><span className="font-mono">WalletContext</span> - Balance, transactions, saved cards</li>
                    <li><span className="font-mono">ThemeContext</span> - Dark/light mode state</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Persistence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    All data is stored in browser localStorage, keyed per user:
                  </p>
                  <ul className="space-y-2 text-sm font-mono text-gray-700 dark:text-gray-300">
                    <li>users - User accounts</li>
                    <li>wallet-{"{userId}"} - Wallet data</li>
                    <li>current-user - Active session</li>
                    <li>theme-{"{userId}"} - Theme preference</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Design Reference */}
          <section>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Design Reference</h2>
            <Card>
              <CardHeader>
                <CardTitle>Design Inspiration</CardTitle>
                <CardDescription>Clean, trust-forward fintech aesthetic</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  The UI is inspired by{" "}
                  <a
                    href="https://localpay.asia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    localpay.asia
                  </a>
                  , emphasizing clarity and trust.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Colors</h4>
                    <p className="text-sm">White/light-gray base with blue/teal primary accent</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Layout</h4>
                    <p className="text-sm">Generous whitespace, card-based sections with subtle shadows</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Typography</h4>
                    <p className="text-sm">Clean sans-serif with clear hierarchy via size and weight</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Responsive</h4>
                    <p className="text-sm">Mobile-first design, adapts gracefully to all screen sizes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Future Roadmap */}
          <section>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Future Roadmap</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post-MVP Enhancements</CardTitle>
                  <CardDescription>Planned features for future releases</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Real backend integration (replace localStorage with API)</li>
                    <li>• Actual payment gateway integration (e.g., Stripe)</li>
                    <li>• Database for persistent server-side storage</li>
                    <li>• Email verification with real email service</li>
                    <li>• Password reset functionality</li>
                    <li>• Two-factor authentication (2FA)</li>
                    <li>• Social login (Google, Apple, Facebook)</li>
                    <li>• Multi-currency support beyond USD</li>
                    <li>• Transaction search and filters</li>
                    <li>• Export transaction history (CSV, PDF)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mobile Native Apps</CardTitle>
                  <CardDescription>iOS and Android applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Port to React Native / Expo for native mobile experiences. Component logic, context, and types are designed to facilitate this migration.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estimated: 2-3 weeks for complete mobile port
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
