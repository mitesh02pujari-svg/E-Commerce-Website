"use client";

import React, { useState } from "react";
import { AddToCartButton } from "./AddToCartButton";
import { Minus, Plus } from "lucide-react";

interface ProductDetailActionProps {
  productId: string;
  stock: number;
}

export function ProductDetailAction({ productId, stock }: ProductDetailActionProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const isOutOfStock = stock <= 0;

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      {!isOutOfStock && (
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Quantity:
          </span>
          <div className="inline-flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
            <button
              type="button"
              onClick={decrement}
              disabled={quantity <= 1}
              className="p-2 text-slate-600 hover:text-indigo-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-xs font-bold text-slate-900 dark:text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increment}
              disabled={quantity >= stock}
              className="p-2 text-slate-600 hover:text-indigo-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-xs text-slate-400">
            ({stock} available)
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="flex items-center gap-3">
        <AddToCartButton
          productId={productId}
          stock={stock}
          quantity={quantity}
          size="lg"
          className="flex-1"
        />
      </div>
    </div>
  );
}
