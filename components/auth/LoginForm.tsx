"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signInAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import { LogIn, Loader2, Mail, Lock, ShieldAlert } from "lucide-react";

interface LoginFormProps {
  returnUrl?: string;
  initialError?: string;
}

export function LoginForm({ returnUrl = "/products", initialError }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(initialError || null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    formData.set("returnUrl", returnUrl);

    try {
      const res = await signInAction(formData);
      if (res && !res.success && res.error) {
        setErrorMsg(res.error);
      }
    } catch {
      // Next.js redirect throws a special internal error which is caught as expected
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to your account to manage orders, cart, and profile.
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
          <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              placeholder="user@example.com"
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="w-full gap-2 shadow-md shadow-indigo-600/20"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </>
          )}
        </Button>
      </form>

      <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/signup"
            className="font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            Create an Account &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}
