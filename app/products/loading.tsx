import React from "react";

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 space-y-3"
          >
            <div className="aspect-square w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-8 w-full bg-slate-200 dark:bg-slate-800 rounded-lg pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
