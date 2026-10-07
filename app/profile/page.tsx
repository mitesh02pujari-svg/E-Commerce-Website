import React from "react";
import Link from "next/link";
import { getCurrentProfile, requireUser } from "@/lib/db/auth";
import { signOutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  ShieldCheck,
  Package,
  ShoppingBag,
  LogOut,
} from "lucide-react";

export const metadata = {
  title: "Account Profile | Thiranex Store",
  description: "View and manage your account details.",
};

export default async function ProfilePage() {
  const user = await requireUser("/profile");
  const profile = await getCurrentProfile();

  const joinedDate = profile
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-8">
        {/* Header Profile Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 font-extrabold text-2xl uppercase">
              {profile?.full_name ? profile.full_name.charAt(0) : user.email?.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  {profile?.full_name || "Customer Account"}
                </h1>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    profile?.role === "admin"
                      ? "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-950 dark:text-purple-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {profile?.role || "user"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{user.email}</span>
              </p>
            </div>
          </div>

          <form action={signOutAction}>
            <Button variant="outline" size="sm" type="submit" className="gap-2 text-rose-600 hover:text-rose-700">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </form>
        </div>

        {/* Profile Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Account Role
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white capitalize">
              {profile?.role || "Standard Customer"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Member Since
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {joinedDate}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Security Level
            </span>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              <span>RLS Protected</span>
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Navigation Shortcuts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/orders"
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Order History
                  </p>
                  <p className="text-[11px] text-slate-500">Track and review previous orders</p>
                </div>
              </div>
              <span className="text-xs text-indigo-600 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Shopping Cart
                  </p>
                  <p className="text-[11px] text-slate-500">Check current items and checkout</p>
                </div>
              </div>
              <span className="text-xs text-indigo-600 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>

          {profile?.role === "admin" && (
            <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                  Administrative Access Granted
                </p>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                  You have full rights to manage products, categories, stock, and orders.
                </p>
              </div>
              <Link href="/admin">
                <Button size="sm">Go to Admin Portal</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
