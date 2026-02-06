"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { User, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const sessionUserId = localStorage.getItem("currentUserId");
    if (sessionUserId) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: User) => u.id === sessionUserId);
      if (user) {
        setCurrentUser(user);
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if email already exists
      if (users.find((u: User) => u.email === email)) {
        toast.error("Email already exists");
        return false;
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        password, // In a real app, this would be hashed
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUserId", newUser.id);

      // Initialize empty wallet data for the new user
      const walletData = {
        balance: 0,
        transactions: [],
        savedCards: [],
      };
      localStorage.setItem(`wallet_${newUser.id}`, JSON.stringify(walletData));

      setCurrentUser(newUser);
      toast.success("Account created successfully!");
      router.push("/dashboard");
      return true;
    } catch (error) {
      toast.error("Failed to create account");
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: User) => u.email === email && u.password === password
      );

      if (!user) {
        toast.error("Invalid email or password");
        return false;
      }

      localStorage.setItem("currentUserId", user.id);
      setCurrentUser(user);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
      return true;
    } catch (error) {
      toast.error("Failed to log in");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUserId");
    setCurrentUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const updateProfile = async (
    name: string,
    email: string
  ): Promise<boolean> => {
    if (!currentUser) return false;

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if new email is taken by another user
      const emailTaken = users.find(
        (u: User) => u.email === email && u.id !== currentUser.id
      );
      if (emailTaken) {
        toast.error("Email already in use");
        return false;
      }

      // Update user
      const updatedUsers = users.map((u: User) =>
        u.id === currentUser.id ? { ...u, name, email } : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const updatedUser = { ...currentUser, name, email };
      setCurrentUser(updatedUser);

      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update profile");
      return false;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    if (!currentUser) return false;

    try {
      // Verify current password
      if (currentUser.password !== currentPassword) {
        toast.error("Current password is incorrect");
        return false;
      }

      // Update password
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: User) =>
        u.id === currentUser.id ? { ...u, password: newPassword } : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const updatedUser = { ...currentUser, password: newPassword };
      setCurrentUser(updatedUser);

      toast.success("Password changed successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to change password");
      return false;
    }
  };

  const deleteAccount = () => {
    if (!currentUser) return;

    // Remove user from users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter((u: User) => u.id !== currentUser.id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Remove wallet data
    localStorage.removeItem(`wallet_${currentUser.id}`);

    // Remove session
    localStorage.removeItem("currentUserId");

    setCurrentUser(null);
    toast.success("Account deleted successfully");
    router.push("/login");
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        updateProfile,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
