"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupFlow } from "@/components/SignupFlow";
import { LauncherScreen } from "@/components/LauncherScreen";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

type LoginPagePhase = "launcher" | "login" | "signup";

export default function LoginPage() {
  const { login } = useAuth();
  const [phase, setPhase] = useState<LoginPagePhase>("launcher");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info(
      "Password reset is not available in this demo. Try creating a new account or contact support."
    );
  };

  if (phase === "launcher") {
    return (
      <LauncherScreen
        onCreateAccount={() => setPhase("signup")}
        onLogin={() => setPhase("login")}
      />
    );
  }

  if (phase === "signup") {
    return <SignupFlow onSwitchToLogin={() => setPhase("login")} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <button
          onClick={() => setPhase("launcher")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
          {/* Title section */}
          <div className="mt-4 mb-10">
            <h1 className="text-[28px] font-bold tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-[#888] text-[15px]">
              Sign in to access your wallet
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 flex-1">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80 text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white/[0.07] border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80 text-sm">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-[#D9FF51]/70 hover:text-[#D9FF51] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 bg-white/[0.07] border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#D9FF51]/50 focus:ring-[#D9FF51]/20 pr-11"
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-[#D9FF51] text-[#0a0a0a] font-semibold hover:bg-[#c5eb3a] transition-colors text-[15px]"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="py-8 text-center">
            <p className="text-[#666] text-sm">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setPhase("signup")}
                className="text-[#D9FF51] font-medium hover:underline"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
