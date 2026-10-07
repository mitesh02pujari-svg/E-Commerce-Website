import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              {SITE_CONFIG.description}
            </p>
            <p className="text-xs text-slate-500">
              Built for Thiranex Internship Task 3 — Clean Production Architecture.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Stack
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Next.js 16 (App Router)</li>
              <li>TypeScript</li>
              <li>Tailwind CSS v4</li>
              <li>Supabase (PostgreSQL & Auth)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Repository
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href="https://github.com/mitesh02pujari-svg/E-Commerce-Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Supabase Console
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          &copy; 2026 {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
