"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductFiltersProps {
  categories: Category[];
  currentCategory?: string;
  currentSearch?: string;
  currentSort?: string;
}

export function ProductFilters({
  categories,
  currentCategory,
  currentSearch,
  currentSort = "newest",
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(currentSearch || "");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const applyParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value.trim() !== "") {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyParam("search", search);
  };

  const handleClearFilters = () => {
    setSearch("");
    router.push("/products");
  };

  const hasActiveFilters = Boolean(currentCategory || currentSearch || (currentSort && currentSort !== "newest"));

  return (
    <div className="space-y-4 mb-8">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search catalog by name or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-20 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <button
            type="submit"
            className="absolute right-1.5 top-1 px-3 py-1 text-[11px] font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <select
            value={currentSort}
            onChange={(e) => applyParam("sort", e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white cursor-pointer"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Alphabetical (A-Z)</option>
          </select>

          {/* Mobile toggle button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="sm:hidden flex items-center gap-1.5"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Categories</span>
          </Button>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Desktop) */}
      <div className="hidden sm:flex flex-wrap items-center gap-2">
        <button
          onClick={() => applyParam("category", null)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            !currentCategory
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          All Items
        </button>

        {categories.map((cat) => {
          const isSelected = currentCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => applyParam("category", isSelected ? null : cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Category Pills (Mobile Accordion) */}
      {mobileFiltersOpen && (
        <div className="sm:hidden bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Filter Category</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                applyParam("category", null);
                setMobileFiltersOpen(false);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                !currentCategory ? "bg-indigo-600 text-white" : "border text-slate-700 dark:text-slate-300"
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  applyParam("category", cat.slug);
                  setMobileFiltersOpen(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentCategory === cat.slug
                    ? "bg-indigo-600 text-white"
                    : "border text-slate-700 dark:text-slate-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
