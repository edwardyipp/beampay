"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
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
import { Logo } from "@/components/Logo";
import { SignupFlow } from "@/components/SignupFlow";
import { LauncherScreen } from "@/components/LauncherScreen";
import { toast } from "sonner";

type LoginPagePhase = "launcher" | "login" | "signup";

export default function LoginPage() {
  const { login } = useAuth();
  const [phase, setPhase] = useState<LoginPagePhase>("launcher");
  const [isLoading, setIsLoading] = useState(false);

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
    toast.info("Password reset is not available in this demo. Try creating a new account or contact support.");
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <SignupFlow onSwitchToLogin={() => setPhase("login")} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Logo className="text-3xl" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Please wait..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setPhase("signup")}
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
