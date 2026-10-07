"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/lib/actions/cart";
import { ShoppingCart, Check, Loader2 } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  quantity?: number;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

export function AddToCartButton({
  productId,
  stock,
  quantity = 1,
  variant = "primary",
  size = "md",
  className = "",
  showIcon = true,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const isOutOfStock = stock <= 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await addToCartAction(productId, quantity);

      if ("requireAuth" in res && res.requireAuth) {
        router.push(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      if (res.success) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        router.refresh();
      } else if (res.error) {
        setErrorMsg(res.error);
        setTimeout(() => setErrorMsg(null), 3000);
      }
    } catch {
      setErrorMsg("Failed to add to cart");
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-4 py-2 text-xs",
    lg: "px-6 py-3 text-sm font-semibold",
  };

  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm focus:ring-indigo-500",
    secondary:
      "bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900",
    outline:
      "border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200",
  };

  if (isOutOfStock) {
    return (
      <button
        disabled
        className={`inline-flex items-center justify-center rounded-lg bg-slate-200 text-slate-500 cursor-not-allowed font-medium ${sizeClasses[size]} ${className}`}
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button
        type="button"
        onClick={handleAdd}
        disabled={loading}
        className={`relative w-full inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 disabled:opacity-75 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Adding...</span>
          </>
        ) : added ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            {showIcon && <ShoppingCart className="h-4 w-4" />}
            <span>Add to Cart</span>
          </>
        )}
      </button>

      {errorMsg && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 z-30 whitespace-nowrap rounded bg-red-600 px-2 py-1 text-[11px] text-white shadow-lg">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
