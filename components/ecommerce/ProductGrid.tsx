import React from "react";
import { ProductWithCategory } from "@/types";
import { ProductCard } from "./ProductCard";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
  products: ProductWithCategory[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No products found matching your criteria.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white/50 dark:bg-slate-900/50">
        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4 text-slate-400 mb-4">
          <PackageOpen className="h-8 w-8" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          No Products Found
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">{emptyMessage}</p>
        <div className="mt-6">
          <Link href="/products">
            <Button size="sm" variant="outline">
              Clear Filters & View All
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
