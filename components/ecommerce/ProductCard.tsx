import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductWithCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";
import { Eye } from "lucide-react";

interface ProductCardProps {
  product: ProductWithCategory;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.compare_at_price) - Number(product.price)) /
          Number(product.compare_at_price)) *
          100
      )
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm hover:shadow-xl hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all duration-300">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {hasDiscount && (
            <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm uppercase tracking-wide">
              {discountPercent}% OFF
            </span>
          )}
          {isLowStock && (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Only {product.stock} Left
            </span>
          )}
          {isOutOfStock && (
            <span className="rounded-full bg-slate-800/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick View Floating Action */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow backdrop-blur hover:bg-white hover:text-indigo-600 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="View product details"
        >
          <Eye className="h-4 w-4" />
        </Link>
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-1 flex-col justify-between">
        <div>
          {/* Category */}
          {product.category && (
            <Link
              href={`/products?category=${product.category.slug}`}
              className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              {product.category.name}
            </Link>
          )}

          {/* Product Title */}
          <h3 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Price & Stock */}
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.compare_at_price!)}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] font-medium ${
                isOutOfStock
                  ? "text-red-500"
                  : isLowStock
                  ? "text-amber-500"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {isOutOfStock ? "Sold Out" : isLowStock ? "Low Stock" : "In Stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <AddToCartButton
              productId={product.id}
              stock={product.stock}
              size="sm"
              className="flex-1"
            />
            <Link
              href={`/products/${product.slug}`}
              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors text-center"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
