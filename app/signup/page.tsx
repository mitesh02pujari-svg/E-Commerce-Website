import React from "react";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Create Account | NovaCart",
  description: "Register a customer account with NovaCart.",
};

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <SignUpForm />
    </div>
  );
}
