"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { validateEmail, validatePassword, validatePin } from "@/lib/validators";
import { generateVerificationCode } from "@/lib/auth-utils";
import { getCurrencyName } from "@/lib/currency-utils";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

interface SignupFlowProps {
  onSwitchToLogin: () => void;
}

export function SignupFlow({ onSwitchToLogin }: SignupFlowProps) {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  // Step 5: Currency Selection
  const [currency, setCurrency] = useState("USD");
  const currencies = [
    { code: "USD", name: "United States Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
    { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  ];

  // Step 6: Profile Picture + PIN
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

  // Auto-focus first code input on step 4
  useEffect(() => {
    if (step === 4) {
      setTimeout(() => codeInputRefs[0].current?.focus(), 100);
    }
  }, [step]);

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newCode = [...enteredCode];
    newCode[index] = value;
    setEnteredCode(newCode);
    if (value && index < 5) {
      codeInputRefs[index + 1].current?.focus();
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

  const validateStep6 = () => {
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
    if (step === 6) {
      handleSubmit();
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep6()) return;

    setIsLoading(true);
    try {
      const legalConsentDate = new Date().toISOString();
      const success = await signup(
        firstName,
        lastName,
        email,
        password,
        pin.join(""),
        currency,
        profilePicture || undefined,
        marketingConsent,
        legalConsentDate
      );

      if (!success) {
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Failed to create account");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            BeamPay
          </span>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          {step === 1 && "Create your BeamPay account"}
          {step === 2 && "Create a secure password"}
          {step === 3 && "Tell us about yourself"}
          {step === 4 && "Verify your email"}
          {step === 5 && "Choose your currency"}
          {step === 6 && "Final steps"}
        </CardTitle>
        <CardDescription className="text-center">
          Step {step} of 6
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Step 1: Email + Marketing Consent */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="marketing"
                checked={marketingConsent}
                onCheckedChange={(checked) =>
                  setMarketingConsent(checked as boolean)
                }
              />
              <label
                htmlFor="marketing"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to receive updates and promotional emails from BeamPay
              </label>
            </div>
            <Button onClick={handleNext} className="w-full">
              Continue
            </Button>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        )}

        {/* Step 2: Password */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500">
                Must be at least 6 characters
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="w-full">
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Name + Legal Consent */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="legal"
                checked={legalConsent}
                onCheckedChange={(checked) =>
                  setLegalConsent(checked as boolean)
                }
              />
              <label
                htmlFor="legal"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to BeamPay's Terms of Service and Privacy Policy
              </label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="w-full">
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Email Verification */}
        {step === 4 && (
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-600">
              We've sent a verification code to <strong>{email}</strong>
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-600 mb-1">Your code:</p>
              <p className="text-2xl font-bold tracking-widest">
                {verificationCode}
              </p>
            </div>
            <div>
              <Label className="text-center block mb-2">
                Enter the code shown above
              </Label>
              <div className="flex justify-center gap-2">
                {enteredCode.map((digit, index) => (
                  <Input
                    key={index}
                    ref={codeInputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold"
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="w-full">
                Verify Email
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Currency Selection */}
        {step === 5 && (
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-600">
              This will be your wallet's default currency
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setCurrency(curr.code)}
                  className={`p-4 border-2 rounded-lg text-center hover:border-primary transition-colors ${
                    currency === curr.code
                      ? "border-primary bg-primary/5"
                      : "border-gray-200"
                  }`}
                >
                  <div className="text-3xl mb-2">{curr.flag}</div>
                  <div className="font-bold text-sm">{curr.code}</div>
                  <div className="text-xs text-gray-500">{curr.name}</div>
                  {currency === curr.code && (
                    <Check className="w-4 h-4 text-primary mx-auto mt-2" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="w-full">
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Profile Picture + PIN */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Choose a profile picture (optional)</Label>
              <div className="flex justify-center mb-4">
                {profilePicture ? (
                  profilePicture.startsWith("data:") ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={`/avatars/${profilePicture}.svg`}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full"
                    />
                  )
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400">
                    {firstName.charAt(0)}
                    {lastName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAvatarSelect(`avatar-${num}`)}
                    className={`w-full aspect-square rounded-full border-2 ${
                      profilePicture === `avatar-${num}`
                        ? "border-primary"
                        : "border-gray-200"
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
              <div>
                <Label
                  htmlFor="upload"
                  className="cursor-pointer text-sm text-primary hover:underline"
                >
                  Or upload your own image
                </Label>
                <Input
                  id="upload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Create your 4-digit security PIN</Label>
              <p className="text-xs text-gray-500">
                Required for transactions and sensitive actions
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
                    onKeyDown={(e) => handlePinKeyDown(index, e, false)}
                    className="w-14 h-14 text-center text-2xl font-bold"
                  />
                ))}
              </div>
              <Label className="block mt-4">Confirm PIN</Label>
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
                    onKeyDown={(e) => handlePinKeyDown(index, e, true)}
                    className="w-14 h-14 text-center text-2xl font-bold"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Choose a memorable 4-digit number
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
