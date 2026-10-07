"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartItemWithProduct } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  clearCartAction,
  removeCartItemAction,
  updateCartQuantityAction,
} from "@/lib/actions/cart";
import { Button } from "@/components/ui/Button";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Loader2,
} from "lucide-react";

interface CartViewProps {
  initialItems: CartItemWithProduct[];
}

export function CartView({ initialItems }: CartViewProps) {
  const [items, setItems] = useState<CartItemWithProduct[]>(initialItems);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const router = useRouter();

  const handleUpdateQuantity = async (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setLoadingItemId(cartItemId);
    try {
      const res = await updateCartQuantityAction(cartItemId, newQty);
      if (res.success) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === cartItemId ? { ...item, quantity: newQty } : item
          )
        );
        router.refresh();
      } else if (res.error) {
        alert(res.error);
      }
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    setLoadingItemId(cartItemId);
    try {
      const res = await removeCartItemAction(cartItemId);
      if (res.success) {
        setItems((prev) => prev.filter((item) => item.id !== cartItemId));
        router.refresh();
      }
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear all items from your cart?")) return;
    setClearing(true);
    try {
      await clearCartAction();
      setItems([]);
      router.refresh();
    } finally {
      setClearing(false);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const estimatedTotal = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-6">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Your Shopping Cart is Empty
        </h2>
        <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
          Explore our handcrafted collections and discover studio acoustic headphones, luxury watches, and modern home essentials.
        </p>
        <div className="mt-8">
          <Link href="/products">
            <Button size="lg" className="gap-2">
              <span>Start Shopping Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Items List Column */}
      <div className="lg:col-span-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {items.length} Product{items.length === 1 ? "" : "s"} in Cart
          </span>
          <button
            type="button"
            onClick={handleClearCart}
            disabled={clearing}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer disabled:opacity-50"
          >
            {clearing ? "Clearing..." : "Clear Cart"}
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const isLoading = loadingItemId === item.id;
            const itemTotal = Number(item.product.price) * item.quantity;
            const maxStock = item.product.stock;

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={item.product.image_url}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Unit Price: {formatCurrency(item.product.price)}
                    </p>
                    {item.product.stock <= 5 && (
                      <p className="text-[11px] text-amber-600 mt-0.5">
                        Only {item.product.stock} in stock
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                  {/* Quantity Counter */}
                  <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                    <button
                      type="button"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={isLoading}
                      className="p-1.5 text-slate-600 hover:text-indigo-600 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">
                      {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin mx-auto text-indigo-600" />
                      ) : (
                        item.quantity
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isLoading || item.quantity >= maxStock}
                      className="p-1.5 text-slate-600 hover:text-indigo-600 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[80px]">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {formatCurrency(itemTotal)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isLoading}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary Column */}
      <div className="lg:col-span-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {shipping === 0 ? "FREE" : formatCurrency(shipping)}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-[11px] text-indigo-600">
                Add {formatCurrency(50 - subtotal)} more to qualify for FREE shipping!
              </p>
            )}
          </div>

          <div className="flex justify-between items-baseline pt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Estimated Total
            </span>
            <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {formatCurrency(estimatedTotal)}
            </span>
          </div>

          <div className="space-y-2 pt-2">
            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full gap-2 shadow-lg shadow-indigo-600/20">
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products" className="block">
              <Button variant="outline" size="md" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-indigo-500" />
              <span>Free Delivery On Orders Over $50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
