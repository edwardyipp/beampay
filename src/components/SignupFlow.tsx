"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { validateEmail, validatePassword, validatePin } from "@/lib/validators";
import { generateVerificationCode } from "@/lib/auth-utils";
import { ArrowLeft, Eye, EyeOff, Upload, Check } from "lucide-react";
import { toast } from "sonner";

interface SignupFlowProps {
  onSwitchToLogin: () => void;
}

export function SignupFlow({ onSwitchToLogin }: SignupFlowProps) {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1: Email + Marketing Consent
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Step 2: Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 3: Name + Legal Consent
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [legalConsent, setLegalConsent] = useState(false);

  // Step 4: Email Verification
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

  // Step 5: Profile Picture + PIN
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const pinInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const confirmPinInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus on step change
  useEffect(() => {
    if (step === 4) {
      setTimeout(() => codeInputRefs[0].current?.focus(), 150);
    }
    if (step === 5) {
      setTimeout(() => pinInputRefs[0].current?.focus(), 150);
    }
  }, [step]);

  // Auto-advance on verification code completion
  const autoAdvanceVerification = useCallback(
    (code: string[]) => {
      const fullCode = code.join("");
      if (fullCode.length === 6) {
        if (fullCode === verificationCode) {
          setTimeout(() => {
            setDirection("forward");
            setStep(5);
          }, 300);
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

  const handlePinChange = (
    index: number,
    value: string,
    isConfirm: boolean
  ) => {
    if (value && !/^\d$/.test(value)) return;
    if (isConfirm) {
      const newPin = [...confirmPin];
      newPin[index] = value;
      setConfirmPin(newPin);
      if (value && index < 3) {
        confirmPinInputRefs[index + 1].current?.focus();
      }
    } else {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      if (value && index < 3) {
        pinInputRefs[index + 1].current?.focus();
      } else if (value && index === 3) {
        // Auto-focus first confirm PIN input after filling last PIN digit
        setTimeout(() => confirmPinInputRefs[0].current?.focus(), 100);
      }
    }
  };

  const handlePinKeyDown = (
    index: number,
    e: React.KeyboardEvent,
    isConfirm: boolean
  ) => {
    const currentPin = isConfirm ? confirmPin : pin;
    const refs = isConfirm ? confirmPinInputRefs : pinInputRefs;
    if (e.key === "Backspace" && !currentPin[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const handleAvatarSelect = (avatarId: string) => {
    setProfilePicture(avatarId);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateStep1 = () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!marketingConsent) {
      toast.error("Please accept to receive updates");
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
    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Please enter your last name");
      return false;
    }
    if (!legalConsent) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    const code = enteredCode.join("");
    if (code !== verificationCode) {
      toast.error("Invalid verification code");
      return false;
    }
    return true;
  };

  const validateStep5 = () => {
    const pinStr = pin.join("");
    const confirmPinStr = confirmPin.join("");

    if (pinStr.length !== 4) {
      toast.error("Please enter a 4-digit PIN");
      return false;
    }

    const pinValidation = validatePin(pinStr);
    if (!pinValidation.valid) {
      toast.error(pinValidation.error || "Invalid PIN");
      return false;
    }

    if (pinStr !== confirmPinStr) {
      toast.error("PINs do not match");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    if (step === 4 && !validateStep4()) return;
    if (step === 5) {
      handleSubmit();
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

  const handleSubmit = async () => {
    if (!validateStep5()) return;

    setIsLoading(true);
    try {
      const legalConsentDate = new Date().toISOString();
      const success = await signup(
        firstName,
        lastName,
        email,
        password,
        pin.join(""),
        "USD",
        profilePicture || undefined,
        marketingConsent,
        legalConsentDate
      );

      if (!success) {
        setIsLoading(false);
      }
    } catch {
      toast.error("Failed to create account");
      setIsLoading(false);
    }
  };

  const stepTitles: Record<number, string> = {
    1: "What's your email?",
    2: "Create a password",
    3: "What's your name?",
    4: "Verify your email",
    5: "Finish setting up",
  };

  const stepDescriptions: Record<number, string> = {
    1: "We'll use this to sign you in",
    2: "Make it strong and memorable",
    3: "So people know who's sending them money",
    4: "Enter the code to confirm your email",
    5: "Choose an avatar and set your PIN",
  };

  const inputClasses =
    "h-12 bg-white/[0.07] border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20";

  const pinInputClasses =
    "w-14 h-14 text-center text-2xl font-bold bg-white/[0.07] border-white/10 text-white rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20";

  const codeInputClasses =
    "w-12 h-14 text-center text-xl font-bold bg-white/[0.07] border-white/10 text-white rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20";

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      {/* Header with back button and progress */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={step === 1 ? onSwitchToLogin : handleBack}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Segmented progress bar */}
          <div className="flex-1 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className="flex-1 h-1 rounded-full overflow-hidden bg-white/10"
              >
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: s <= step ? "100%" : "0%",
                    background:
                      s <= step
                        ? "linear-gradient(90deg, #D9FF51, #A6E500)"
                        : "transparent",
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
              className="text-[26px] font-bold tracking-tight mb-1"
            >
              {stepTitles[step]}
            </h1>
            <p className="text-[#888] text-[15px]">
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
                  ? "slideInRight 0.25s ease-out"
                  : "slideInLeft 0.25s ease-out",
            }}
          >
            {/* Step 1: Email + Marketing Consent */}
            {step === 1 && (
              <div className="space-y-5 flex-1 flex flex-col">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 text-sm">
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
                    className={inputClasses}
                  />
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={marketingConsent}
                    onCheckedChange={(checked) =>
                      setMarketingConsent(checked as boolean)
                    }
                    className="mt-0.5 border-white/20 data-[state=checked]:bg-[#D9FF51] data-[state=checked]:border-[#D9FF51] data-[state=checked]:text-[#0a0a0a]"
                  />
                  <label
                    htmlFor="marketing"
                    className="text-sm text-white/60 leading-relaxed"
                  >
                    I agree to receive updates and promotional emails from
                    BeamPay
                  </label>
                </div>
                <div className="flex-1" />
                <div className="pb-8 space-y-4">
                  <Button
                    onClick={handleNext}
                    className="w-full h-12 rounded-xl bg-[#D9FF51] text-[#0a0a0a] font-semibold hover:bg-[#c5eb3a] text-[15px]"
                  >
                    Continue
                  </Button>
                  <p className="text-center text-sm text-[#666]">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-[#D9FF51] font-medium hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <div className="space-y-5 flex-1 flex flex-col">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/80 text-sm">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white/80 text-sm"
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" />
                      )}
                    </button>
                  </div>
                  {password.length > 0 && password.length < 6 && (
                    <p className="text-xs text-[#D9FF51]/60">
                      {6 - password.length} more character
                      {6 - password.length !== 1 ? "s" : ""} needed
                    </p>
                  )}
                  {password.length >= 6 &&
                    confirmPassword.length > 0 &&
                    password === confirmPassword && (
                      <p className="text-xs text-green-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Passwords match
                      </p>
                    )}
                </div>
                <div className="flex-1" />
                <div className="pb-8">
                  <Button
                    onClick={handleNext}
                    className="w-full h-12 rounded-xl bg-[#D9FF51] text-[#0a0a0a] font-semibold hover:bg-[#c5eb3a] text-[15px]"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Name + Legal Consent */}
            {step === 3 && (
              <div className="space-y-5 flex-1 flex flex-col">
                <div className="flex gap-3">
                  <div className="space-y-2 flex-1">
                    <Label
                      htmlFor="firstName"
                      className="text-white/80 text-sm"
                    >
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      autoFocus
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label
                      htmlFor="lastName"
                      className="text-white/80 text-sm"
                    >
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="legal"
                    checked={legalConsent}
                    onCheckedChange={(checked) =>
                      setLegalConsent(checked as boolean)
                    }
                    className="mt-0.5 border-white/20 data-[state=checked]:bg-[#D9FF51] data-[state=checked]:border-[#D9FF51] data-[state=checked]:text-[#0a0a0a]"
                  />
                  <label
                    htmlFor="legal"
                    className="text-sm text-white/60 leading-relaxed"
                  >
                    I agree to BeamPay&apos;s{" "}
                    <span className="text-[#D9FF51]/80">Terms of Service</span>{" "}
                    and{" "}
                    <span className="text-[#D9FF51]/80">Privacy Policy</span>
                  </label>
                </div>
                <div className="flex-1" />
                <div className="pb-8">
                  <Button
                    onClick={handleNext}
                    className="w-full h-12 rounded-xl bg-[#D9FF51] text-[#0a0a0a] font-semibold hover:bg-[#c5eb3a] text-[15px]"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Email Verification */}
            {step === 4 && (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="text-center space-y-3">
                  <p className="text-sm text-white/60">
                    We sent a code to{" "}
                    <span className="text-white font-medium">{email}</span>
                  </p>
                  <div className="inline-flex items-center gap-2 bg-[#D9FF51]/10 border border-[#D9FF51]/20 rounded-lg px-4 py-2.5">
                    <span className="text-xs text-white/50">Demo code:</span>
                    <span className="text-lg font-bold tracking-[0.2em] text-[#D9FF51]">
                      {verificationCode}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-center block mb-3 text-white/80 text-sm">
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
                        className={codeInputClasses}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1" />
                <div className="pb-8">
                  <Button
                    onClick={handleNext}
                    className="w-full h-12 rounded-xl bg-[#D9FF51] text-[#0a0a0a] font-semibold hover:bg-[#c5eb3a] text-[15px]"
                  >
                    Verify Email
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Profile Picture + PIN */}
            {step === 5 && (
              <div className="space-y-7 flex-1 flex flex-col overflow-y-auto pb-4">
                {/* Profile picture section */}
                <div className="space-y-4">
                  <div className="flex justify-center">
                    {profilePicture ? (
                      profilePicture.startsWith("data:") ? (
                        <img
                          src={profilePicture}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover ring-2 ring-[#D9FF51]/30"
                        />
                      ) : (
                        <img
                          src={`/avatars/${profilePicture}.svg`}
                          alt="Avatar"
                          className="w-20 h-20 rounded-full ring-2 ring-[#D9FF51]/30"
                        />
                      )
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white/50 ring-2 ring-white/10">
                        {firstName.charAt(0)}
                        {lastName.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleAvatarSelect(`avatar-${num}`)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          profilePicture === `avatar-${num}`
                            ? "border-[#D9FF51] scale-110"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <img
                          src={`/avatars/avatar-${num}.svg`}
                          alt={`Avatar ${num}`}
                          className="w-full h-full rounded-full"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <label
                      htmlFor="upload"
                      className="inline-flex items-center gap-1.5 text-sm text-[#D9FF51]/70 hover:text-[#D9FF51] cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload photo
                    </label>
                    <Input
                      id="upload"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10" />

                {/* PIN section */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-white/80 text-sm">
                      Security PIN
                    </Label>
                    <p className="text-xs text-white/40 mt-0.5">
                      4-digit PIN for transactions and sensitive actions
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-white/50 mb-2 text-center">
                        Create PIN
                      </p>
                      <div className="flex justify-center gap-3">
                        {pin.map((digit, index) => (
                          <Input
                            key={index}
                            ref={pinInputRefs[index]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handlePinChange(index, e.target.value, false)
                            }
                            onKeyDown={(e) =>
                              handlePinKeyDown(index, e, false)
                            }
                            className={pinInputClasses}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-2 text-center">
                        Confirm PIN
                      </p>
                      <div className="flex justify-center gap-3">
                        {confirmPin.map((digit, index) => (
                          <Input
                            key={index}
                            ref={confirmPinInputRefs[index]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handlePinChange(index, e.target.value, true)
                            }
                            onKeyDown={(e) =>
                              handlePinKeyDown(index, e, true)
                            }
                            className={pinInputClasses}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1" />
                <div className="pb-8 pt-2">
                  <Button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-[#D9FF51] text-[#0a0a0a] font-semibold hover:bg-[#c5eb3a] text-[15px]"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide animations */}
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
      `}</style>
    </div>
  );
}
