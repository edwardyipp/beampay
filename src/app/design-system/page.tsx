"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, ArrowDownLeft, X, Eye, EyeOff, Check, Moon, Sun } from "lucide-react";

function PasswordStrengthDemo() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getStrength = (pw: string) => {
    if (pw.length === 0) return { level: 0, label: "", color: "" };
    if (pw.length < 6) return { level: 1, label: "Weak", color: "bg-red-500" };
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasNumber = /\d/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    const variety = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    if (pw.length >= 12 && variety >= 3) return { level: 4, label: "Strong", color: "bg-green-500" };
    if (pw.length >= 8 && variety >= 2) return { level: 3, label: "Good", color: "bg-[#D9FF51]" };
    return { level: 2, label: "Fair", color: "bg-amber-500" };
  };

  const strength = getStrength(password);

  return (
    <div className="bg-[#0a0a0a] rounded-xl p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="demo-pw" className="text-white/80 text-sm">Password</Label>
        <div className="relative">
          <Input
            id="demo-pw"
            type={showPassword ? "text" : "password"}
            placeholder="Try typing a password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-card/[0.07] border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
          >
            {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
        </div>
        {password.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div key={level} className="flex-1 h-1 rounded-full bg-card/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${level <= strength.level ? strength.color : "bg-transparent"}`}
                    style={{ width: level <= strength.level ? "100%" : "0%" }}
                  />
                </div>
              ))}
            </div>
            <p className={`text-xs ${strength.level <= 1 ? "text-red-400" : strength.level === 2 ? "text-amber-400" : strength.level === 3 ? "text-[#D9FF51]/80" : "text-green-400"}`}>
              {strength.label}
            </p>
          </div>
        )}
        <div className="space-y-1 pt-1">
          <p className={`text-xs flex items-center gap-1.5 ${password.length >= 6 ? "text-green-400" : "text-white/30"}`}>
            <span className={`inline-block w-1 h-1 rounded-full ${password.length >= 6 ? "bg-green-400" : "bg-card/30"}`} />
            At least 6 characters
          </p>
          <p className={`text-xs flex items-center gap-1.5 ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-green-400" : "text-white/30"}`}>
            <span className={`inline-block w-1 h-1 rounded-full ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? "bg-green-400" : "bg-card/30"}`} />
            Upper &amp; lowercase letters
          </p>
          <p className={`text-xs flex items-center gap-1.5 ${/\d/.test(password) ? "text-green-400" : "text-white/30"}`}>
            <span className={`inline-block w-1 h-1 rounded-full ${/\d/.test(password) ? "bg-green-400" : "bg-card/30"}`} />
            A number
          </p>
          <p className={`text-xs flex items-center gap-1.5 ${/[^A-Za-z0-9]/.test(password) ? "text-green-400" : "text-white/30"}`}>
            <span className={`inline-block w-1 h-1 rounded-full ${/[^A-Za-z0-9]/.test(password) ? "bg-green-400" : "bg-card/30"}`} />
            A special character
          </p>
        </div>
      </div>
    </div>
  );
}

function VerificationCodeDemo() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <div className="bg-[#0a0a0a] rounded-xl p-6 space-y-4">
      <div className="text-center space-y-2">
        <p className="text-sm text-white/60">Enter verification code</p>
      </div>
      <div className="flex justify-center gap-2.5">
        {code.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-14 h-16 text-center text-2xl font-bold bg-card/[0.07] border-white/10 text-white rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20"
          />
        ))}
      </div>
      <p className="text-xs text-white/40 text-center">Supports paste: try pasting 6 digits</p>
    </div>
  );
}

function PinInputDemo() {
  const [pin, setPin] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

  return (
    <div className="bg-card rounded-xl p-6 border space-y-4">
      <div className="text-center space-y-1">
        <p className="text-sm font-medium">Security PIN</p>
        <p className="text-xs text-muted-foreground">4-digit PIN for transactions</p>
      </div>
      <div className="flex justify-center gap-3">
        {pin.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-14 h-14 text-center text-2xl font-bold"
          />
        ))}
      </div>
    </div>
  );
}

function ProgressBarDemo() {
  const [step, setStep] = useState(2);

  return (
    <div className="bg-[#0a0a0a] rounded-xl p-6 space-y-4">
      <div className="flex gap-1.5">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-card/10">
            <div
              className="h-full rounded-full"
              style={{
                width: s <= step ? "100%" : "0%",
                background: s <= step ? "linear-gradient(90deg, #D9FF51, #A6E500)" : "transparent",
                transition: `width 500ms cubic-bezier(0.32, 0.72, 0, 1) ${i * 50}ms`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              s === step ? "bg-[#D9FF51] text-[#0a0a0a]" : "bg-card/10 text-white/60 hover:bg-card/20"
            }`}
          >
            Step {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/">
                <Image src="/logo-beampay-neon.svg" alt="BeamPay" width={100} height={22} />
              </Link>
              <span className="text-sm text-muted-foreground">Design System</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-muted transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-foreground" />
                ) : (
                  <Moon className="w-4 h-4 text-foreground" />
                )}
              </button>
              <Link href="/login">
                <Button variant="outline">
                  Back to App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Introduction */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Design System</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A comprehensive guide to the visual language, components, and patterns used throughout BeamPay.
              Inspired by <a href="https://localpay.asia/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">localpay.asia</a> — a clean, trust-forward fintech aesthetic.
            </p>
          </div>

          <Separator />

          {/* Colors */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
            <p className="text-muted-foreground mb-6">
              Our color scheme uses a white/light-gray base with blue/teal as the primary accent, creating a clean and trustworthy feel.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 bg-primary rounded-lg border shadow-sm"></div>
                <p className="font-medium text-sm">Primary</p>
                <p className="text-xs text-muted-foreground">Blue/Teal accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-card rounded-lg border shadow-sm"></div>
                <p className="font-medium text-sm">Background</p>
                <p className="text-xs text-muted-foreground">White</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-muted rounded-lg border shadow-sm"></div>
                <p className="font-medium text-sm">Surface</p>
                <p className="text-xs text-muted-foreground">Light Gray</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-foreground rounded-lg border shadow-sm"></div>
                <p className="font-medium text-sm">Text</p>
                <p className="text-xs text-muted-foreground">Dark</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Typography */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Typography</h2>
            <p className="text-muted-foreground mb-6">
              Clean, modern sans-serif with hierarchy through size and weight — not color clutter.
            </p>
            <div className="space-y-4 bg-card p-6 rounded-lg border">
              <div>
                <h1 className="text-4xl font-bold">Heading 1 - Bold, 36px</h1>
                <p className="text-sm text-muted-foreground mt-1">Used for page titles</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Heading 2 - Bold, 30px</h2>
                <p className="text-sm text-muted-foreground mt-1">Used for section headings</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Heading 3 - Semibold, 24px</h3>
                <p className="text-sm text-muted-foreground mt-1">Used for card titles</p>
              </div>
              <div>
                <p className="text-base">Body Text - Regular, 16px</p>
                <p className="text-sm text-muted-foreground mt-1">Default paragraph text</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Small Text - Regular, 14px</p>
                <p className="text-xs text-muted-foreground mt-1">Used for descriptions and metadata</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Buttons */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Buttons</h2>
            <p className="text-muted-foreground mb-6">
              BeamPay uses pill-shaped (rounded-full) buttons as the primary CTA style, matching the fintech premium aesthetic.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Actions (Pill)</CardTitle>
                  <CardDescription>Main CTA buttons — rounded-full, h-12, lime accent in dark contexts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-[#0a0a0a] rounded-xl p-6 space-y-3">
                    <Button className="w-full h-12 rounded-full bg-[#D9FF51] text-[#0a0a0a] font-semibold hover:bg-[#c5eb3a] text-[15px] active:scale-[0.98] transition-transform">
                      Continue
                    </Button>
                    <Button className="w-full h-12 rounded-full bg-[#D9FF51] text-[#0a0a0a] font-semibold hover:bg-[#c5eb3a] text-[15px]" disabled>
                      Disabled
                    </Button>
                    <Button className="w-full h-12 rounded-full bg-card/10 text-white font-semibold hover:bg-card/20 text-[15px]">
                      Secondary (Dark)
                    </Button>
                  </div>
                  <Button className="w-full h-12 rounded-full">
                    Primary (Light Theme)
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Utility Buttons</CardTitle>
                  <CardDescription>Outline, ghost, and destructive variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full rounded-full">Outline</Button>
                  <Button variant="secondary" className="w-full rounded-full">Secondary</Button>
                  <Button variant="ghost" className="w-full rounded-full">Ghost</Button>
                  <Button variant="destructive" className="w-full rounded-full">Destructive</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Form Elements */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Form Elements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dark Theme Inputs (Signup Flow)</CardTitle>
                  <CardDescription>Used in auth flows — rounded-xl, translucent bg, lime focus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-[#0a0a0a] rounded-xl p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dark-email" className="text-white/80 text-sm">Email address</Label>
                      <Input
                        id="dark-email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-12 bg-card/[0.07] border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(217,255,81,0.15)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dark-pw" className="text-white/80 text-sm">Password</Label>
                      <Input
                        id="dark-pw"
                        type="password"
                        placeholder="At least 6 characters"
                        className="h-12 bg-card/[0.07] border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(217,255,81,0.15)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dark-disabled" className="text-white/40 text-sm">Disabled</Label>
                      <Input
                        id="dark-disabled"
                        disabled
                        placeholder="Cannot edit"
                        className="h-12 bg-card/[0.03] border-white/5 text-white/30 placeholder:text-white/15 rounded-xl"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Light Theme Inputs (Settings)</CardTitle>
                  <CardDescription>h-12, rounded-xl — matches signup flow proportions via base input.tsx</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="light-name">First Name</Label>
                    <Input id="light-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="light-email">Email</Label>
                    <Input id="light-email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="light-amount">Amount</Label>
                    <Input id="light-amount" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="light-disabled">Disabled</Label>
                    <Input id="light-disabled" disabled placeholder="Cannot edit" />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Badges */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Badges</h2>
            <Card>
              <CardHeader>
                <CardTitle>Status Indicators</CardTitle>
                <CardDescription>Used for transaction status, card labels, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Success</Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Info</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Cards */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Cards</h2>
            <p className="text-muted-foreground mb-6">
              Cards are the primary container component, featuring rounded corners and subtle shadows.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>A simple card with header and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cards provide generous whitespace and clear separation between different sections of content.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#D9FF51] to-[#A6E500] text-[#0a0a0a] border-0">
                <CardHeader>
                  <CardTitle className="text-[#0a0a0a]">Balance Card</CardTitle>
                  <CardDescription className="text-[#0a0a0a]/60">Lime gradient with dark text — always light mode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$1,234.56</div>
                  <p className="text-sm text-[#0a0a0a]/50 mt-1">Rp 19,506,480</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Icons */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Icons</h2>
            <Card>
              <CardHeader>
                <CardTitle>Lucide Icons</CardTitle>
                <CardDescription>Consistent icon set used throughout the app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <ArrowDownLeft className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-center">Top Up</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-center">Send</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      <X className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-center">Delete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Spacing */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Spacing</h2>
            <Card>
              <CardHeader>
                <CardTitle>Layout Spacing</CardTitle>
                <CardDescription>Generous whitespace for a clean, uncluttered feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Between sections: 24px (space-y-6)</p>
                  <div className="h-6 bg-muted-foreground/20 rounded"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Between elements: 16px (space-y-4)</p>
                  <div className="h-4 bg-muted-foreground/20 rounded"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Between small items: 8px (space-y-2)</p>
                  <div className="h-2 bg-muted-foreground/20 rounded"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Card padding: 24px (p-6)</p>
                  <div className="h-8 bg-muted-foreground/20 rounded"></div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Signup Flow Patterns */}
          <section>
            <h2 className="text-3xl font-bold mb-2">Signup Flow Patterns</h2>
            <p className="text-muted-foreground mb-6">
              Interactive components from the 3-step signup flow: Email → Password → Verify Email.
              Built with a dark theme and neon lime accent for fintech premium feel.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password Strength + Requirements</CardTitle>
                  <CardDescription>4-segment strength bar with live checklist (try typing)</CardDescription>
                </CardHeader>
                <CardContent>
                  <PasswordStrengthDemo />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Code Input</CardTitle>
                  <CardDescription>6-digit auto-advancing inputs with paste support</CardDescription>
                </CardHeader>
                <CardContent>
                  <VerificationCodeDemo />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>PIN Input (Setup Modal)</CardTitle>
                  <CardDescription>4-digit PIN input used in PinSetupModal and PinVerificationModal</CardDescription>
                </CardHeader>
                <CardContent>
                  <PinInputDemo />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress Bar</CardTitle>
                  <CardDescription>3-segment animated progress with lime gradient (click to change)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressBarDemo />
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Design Principles */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Design Principles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Minimal & Clean</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Generous whitespace between elements</p>
                  <p>• Rounded corners on cards and buttons</p>
                  <p>• Subtle shadows for depth</p>
                  <p>• No visual clutter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trust-Forward</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Blue/teal accent colors for trust</p>
                  <p>• Clear, readable typography</p>
                  <p>• Professional but friendly tone</p>
                  <p>• Consistent interaction patterns</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Responsive</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Single column on mobile</p>
                  <p>• Multi-column on desktop</p>
                  <p>• Touch-friendly targets (min 44px)</p>
                  <p>• Scales gracefully</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accessible</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• High contrast text</p>
                  <p>• Keyboard navigation support</p>
                  <p>• Screen reader friendly</p>
                  <p>• Clear focus states</p>
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
