import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

interface LoginPageProps {
  searchParams: Promise<{
    returnUrl?: string;
    error?: string;
  }>;
}

export const metadata = {
  title: "Sign In | NovaCart",
  description: "Sign in to access your account, orders, and cart.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { returnUrl, error } = await searchParams;

  let initialError: string | undefined;
  if (error === "unauthorized") {
    initialError = "You need administrator permissions to view that page.";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <LoginForm returnUrl={returnUrl} initialError={initialError} />
    </div>
  );
}
