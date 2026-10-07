import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/db/auth";
import { getCart } from "@/lib/db/cart";
import { CartView } from "@/components/ecommerce/CartView";
import { Button } from "@/components/ui/Button";
import { LogIn, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Shopping Cart | Thiranex Store",
  description: "View and manage items in your shopping cart.",
};

export default async function CartPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-6">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Sign In to Access Your Cart
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Your cart items are synchronized securely with Supabase. Sign in or create an account to view and update your cart.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/login?returnUrl=/cart">
            <Button size="lg" className="gap-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In to Continue</span>
            </Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="outline">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const cartItems = await getCart(user.id);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Shopping Cart
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Review your selected items, modify quantities, and proceed to secure checkout.
        </p>
      </div>

      <CartView initialItems={cartItems} />
    </div>
  );
}
