"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateEmail, validatePassword } from "@/lib/validators";
import { generateVerificationCode } from "@/lib/auth-utils";
import { parseNameFromEmail } from "@/lib/user-utils";
import { ArrowLeft, Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SignupFlowProps {
  onSwitchToLogin: () => void;
}

function getPasswordStrength(password: string): {
  level: number;
  label: string;
  color: string;
} {
  if (password.length === 0) return { level: 0, label: "", color: "" };
  if (password.length < 6)
    return { level: 1, label: "Weak", color: "bg-red-500" };

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const variety = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
    Boolean
  ).length;

  if (password.length >= 12 && variety >= 3)
    return { level: 4, label: "Strong", color: "bg-green-500" };
  if (password.length >= 8 && variety >= 2)
    return { level: 3, label: "Good", color: "bg-primary" };
  return { level: 2, label: "Fair", color: "bg-amber-500" };
}

export function SignupFlow({ onSwitchToLogin }: SignupFlowProps) {
  const { signup } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [emailShake, setEmailShake] = useState(false);

  // Step 1: Email
  const [email, setEmail] = useState("");

  // Step 2: Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 3: Email Verification
  const [verificationCode] = useState(generateVerificationCode());
  const [enteredCode, setEnteredCode] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus on step change
  useEffect(() => {
    if (step === 3) {
      setTimeout(() => codeInputRefs[0].current?.focus(), 150);
    }
  }, [step]);

  // Auto-advance on verification code completion
  const autoAdvanceVerification = useCallback(
    (code: string[]) => {
      const fullCode = code.join("");
      if (fullCode.length === 6) {
        if (fullCode === verificationCode) {
          setTimeout(() => handleAccountSetup(), 300);
        } else {
          toast.error("Invalid verification code. Please try again.");
        }
      }
    },
    [verificationCode]
  );

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newCode = [...enteredCode];
    newCode[index] = value;
    setEnteredCode(newCode);
    if (value && index < 5) {
      codeInputRefs[index + 1].current?.focus();
    }
    if (value) {
      autoAdvanceVerification(newCode);
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !enteredCode[index] && index > 0) {
      codeInputRefs[index - 1].current?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    const digits = pasted.replace(/\D/g, "").slice(0, 6);
    if (digits.length === 0) return;

    const newCode = [...enteredCode];
    for (let i = 0; i < 6; i++) {
      newCode[i] = digits[i] || "";
    }
    setEnteredCode(newCode);

    // Focus the next empty field or the last filled one
    const nextEmpty = newCode.findIndex((d) => !d);
    const focusIndex = nextEmpty === -1 ? 5 : nextEmpty;
    codeInputRefs[focusIndex].current?.focus();

    if (digits.length === 6) {
      autoAdvanceVerification(newCode);
    }
  };

  const validateStep1 = () => {
    if (!validateEmail(email)) {
      setEmailShake(true);
      setTimeout(() => setEmailShake(false), 500);
      toast.error("Please enter a valid email");
      return false;
    }
    // Check if email is already registered
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: { email: string }) => u.email === email)) {
      setEmailShake(true);
      setTimeout(() => setEmailShake(false), 500);
      toast.error("This email is already registered. Try signing in instead.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.error || "Invalid password");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const code = enteredCode.join("");
    if (code !== verificationCode) {
      toast.error("Invalid verification code");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      if (!validateStep3()) return;
      handleAccountSetup();
      return;
    }
    setDirection("forward");
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection("back");
      setStep(step - 1);
    }
  };

  const handleAccountSetup = async () => {
    // Double-check email isn't taken (could have been registered in another tab)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: { email: string }) => u.email === email)) {
      toast.error("This email is already registered. Try signing in instead.");
      setDirection("back");
      setStep(1);
      return;
    }

    setIsSettingUp(true);

    // Parse name from email
    const { firstName, lastName } = parseNameFromEmail(email);

    // Simulate processing delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const success = await signup(
        firstName,
        lastName,
        email,
        password,
        "USD"
      );

      if (!success) {
        setIsSettingUp(false);
        setDirection("back");
        setStep(1);
      }
      // On success, AuthContext handles redirect to /dashboard
    } catch {
      toast.error("Failed to create account");
      setIsSettingUp(false);
    }
  };

  const stepTitles: Record<number, string> = {
    1: "What's your email?",
    2: "Create a password",
    3: "Verify your email",
  };

  const stepDescriptions: Record<number, string> = {
    1: "We'll use this to sign you in",
    2: "Make it strong and memorable",
    3: "Enter the code to confirm your email",
  };

  const inputClasses = "";

  const codeInputClasses =
    "w-14 h-16 text-center text-2xl font-bold rounded-xl";

  const strength = getPasswordStrength(password);

  // Account setup animation overlay
  if (isSettingUp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/10 animate-ping" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-lg font-semibold">Setting up your account...</p>
            <p className="text-foreground/50">This won&apos;t take long</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header with back button and progress */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon-md"
            onClick={step === 1 ? onSwitchToLogin : handleBack}
            aria-label="Go back"
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* Segmented progress bar */}
          <div className="flex-1 flex gap-1.5">
            {[1, 2, 3].map((s, i) => (
              <div
                key={s}
                className="flex-1 h-1 rounded-full overflow-hidden bg-foreground/10"
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: s <= step ? "100%" : "0%",
                    background:
                      s <= step
                        ? "linear-gradient(90deg, var(--color-neon-300), var(--color-neon-400))"
                        : "transparent",
                    transition: `width 500ms cubic-bezier(0.32, 0.72, 0, 1) ${i * 50}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 overflow-hidden">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
          {/* Step title */}
          <div className="mt-6 mb-8">
            <h1
              key={`title-${step}`}
              className="tracking-tight mb-1"
            >
              {stepTitles[step]}
            </h1>
            <p className="text-muted-foreground">
              {stepDescriptions[step]}
            </p>
          </div>

          {/* Step content */}
          <div
            key={step}
            className="flex-1 flex flex-col"
            style={{
              animation:
                direction === "forward"
                  ? "slideInRight 0.3s cubic-bezier(0.32, 0.72, 0, 1)"
                  : "slideInLeft 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            {/* Step 1: Email */}
            {step === 1 && (
              <div className="space-y-5 flex-1 flex flex-col">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/80">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoFocus
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                    required
                    className={`${inputClasses} ${emailShake ? "animate-shake" : ""}`}
                  />
                </div>
                <div className="flex-1" />
                <div className="pb-8 space-y-4">
                  <Button
                    onClick={handleNext}
                    className="w-full"
                    size="lg"
                  >
                    Continue
                  </Button>
                  <p className="text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Button
                      type="button"
                      variant="link"
                      size="md"
                      onClick={onSwitchToLogin}
                      className="p-0 h-auto font-medium"
                    >
                      Log in
                    </Button>
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <div className="space-y-5 flex-1 flex flex-col">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground/80">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoFocus
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className={`${inputClasses} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" />
                      )}
                    </button>
                  </div>
                  {/* Password strength bar */}
                  {password.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className="flex-1 h-1 rounded-full bg-foreground/10 overflow-hidden"
                          >
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                level <= strength.level
                                  ? strength.color
                                  : "bg-transparent"
                              }`}
                              style={{
                                width:
                                  level <= strength.level ? "100%" : "0%",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <p
                        className={`text-sm transition-colors duration-200 ${
                          strength.level <= 1
                            ? "text-red-400"
                            : strength.level === 2
                              ? "text-amber-400"
                              : strength.level === 3
                                ? "text-primary/80"
                                : "text-green-400"
                        }`}
                      >
                        {strength.label}
                      </p>
                    </div>
                  )}
                  {/* Password requirements */}
                  <div className="space-y-1 pt-1">
                    <p className={`text-sm flex items-center gap-1.5 transition-colors ${password.length >= 6 ? "text-green-400" : "text-foreground/30"}`}>
                      <span className={`inline-block w-1 h-1 rounded-full ${password.length >= 6 ? "bg-green-400" : "bg-white/30"}`} />
                      At least 6 characters
                    </p>
                    <p className={`text-sm flex items-center gap-1.5 transition-colors ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-green-400" : "text-foreground/30"}`}>
                      <span className={`inline-block w-1 h-1 rounded-full ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? "bg-green-400" : "bg-white/30"}`} />
                      Upper &amp; lowercase letters
                    </p>
                    <p className={`text-sm flex items-center gap-1.5 transition-colors ${/\d/.test(password) ? "text-green-400" : "text-foreground/30"}`}>
                      <span className={`inline-block w-1 h-1 rounded-full ${/\d/.test(password) ? "bg-green-400" : "bg-white/30"}`} />
                      A number
                    </p>
                    <p className={`text-sm flex items-center gap-1.5 transition-colors ${/[^A-Za-z0-9]/.test(password) ? "text-green-400" : "text-foreground/30"}`}>
                      <span className={`inline-block w-1 h-1 rounded-full ${/[^A-Za-z0-9]/.test(password) ? "bg-green-400" : "bg-white/30"}`} />
                      A special character
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-foreground/80"
                  >
                    Confirm password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Type it again"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      required
                      minLength={6}
                      className={`${inputClasses} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" />
                      )}
                    </button>
                  </div>
                  {password.length >= 6 &&
                    confirmPassword.length > 0 &&
                    password === confirmPassword && (
                      <p className="text-sm text-green-400 flex items-center gap-1 animate-in fade-in duration-200">
                        <Check className="w-3 h-3" /> Passwords match
                      </p>
                    )}
                </div>
                <div className="flex-1" />
                <div className="pb-8 space-y-3">
                  <Button
                    onClick={handleNext}
                    className="w-full"
                    size="lg"
                  >
                    Continue
                  </Button>
                  <p className="text-center text-muted-foreground leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <span className="text-primary/70">Terms of Service</span>{" "}
                    and{" "}
                    <span className="text-primary/70">Privacy Policy</span>
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Email Verification */}
            {step === 3 && (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="text-center space-y-3">
                  <p className="text-foreground/60">
                    We sent a code to{" "}
                    <span className="text-foreground font-medium">{email}</span>
                  </p>
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2.5">
                    <span className="text-sm text-foreground/50">Demo code:</span>
                    <span className="text-lg font-bold tracking-[0.2em] text-primary">
                      {verificationCode}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-center block mb-3 text-foreground/80">
                    Enter verification code
                  </Label>
                  <div className="flex justify-center gap-2.5">
                    {enteredCode.map((digit, index) => (
                      <Input
                        key={index}
                        ref={codeInputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        onPaste={index === 0 ? handleCodePaste : undefined}
                        className={codeInputClasses}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1" />
                <div className="pb-8">
                  <Button
                    onClick={handleNext}
                    className="w-full"
                    size="lg"
                  >
                    Verify Email
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-6px);
          }
          40% {
            transform: translateX(6px);
          }
          60% {
            transform: translateX(-4px);
          }
          80% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
}
