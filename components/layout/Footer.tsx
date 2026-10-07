import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Store, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Free Express Shipping</p>
              <p className="text-[11px] text-slate-500">Orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Secure Checkout</p>
              <p className="text-[11px] text-slate-500">Supabase & RLS Protected</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">30-Day Returns</p>
              <p className="text-[11px] text-slate-500">Hassle-free exchange</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">24/7 Dedicated Support</p>
              <p className="text-[11px] text-slate-500">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                <Store className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                Nova<span className="text-indigo-600">Cart</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              A modern, production-grade full-stack e-commerce solution. Powered by Next.js 16, Supabase PostgreSQL, and Tailwind CSS.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>Demo Platform</span>
              <span>&bull;</span>
              <span>PostgreSQL RLS</span>
              <span>&bull;</span>
              <span>TypeScript</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/products?category=electronics" className="hover:text-indigo-600 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="hover:text-indigo-600 transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=home-living" className="hover:text-indigo-600 transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/products?category=sports-outdoors" className="hover:text-indigo-600 transition-colors">
                  Sports & Outdoors
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-indigo-600 font-semibold text-indigo-600 transition-colors">
                  View All Products &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Customer Account
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/cart" className="hover:text-indigo-600 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-indigo-600 transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-indigo-600 transition-colors">
                  Account Profile
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-600 transition-colors">
                  Customer Sign In
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-indigo-600 transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Repository
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href="https://github.com/mitesh02pujari-svg/E-Commerce-Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition-colors"
                >
                  GitHub Source Code
                </Link>
              </li>
              <li>
                <Link
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Supabase Backend
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-400">NovaCart Platform</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; 2026 {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="text-[11px]">Designed & Engineered for High Performance.</p>
        </div>
      </div>
    </footer>
  );
}
