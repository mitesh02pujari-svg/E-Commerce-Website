import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100 dark:border-blue-900/50">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, removed, or never existed.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-medium text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
