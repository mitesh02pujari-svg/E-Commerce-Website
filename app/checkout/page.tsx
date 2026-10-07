import React from "react";
import { redirect } from "next/navigation";
import { getCurrentProfile, requireUser } from "@/lib/db/auth";
import { getCart } from "@/lib/db/cart";
import { CheckoutForm } from "@/components/ecommerce/CheckoutForm";

export const metadata = {
  title: "Checkout | Thiranex Store",
  description: "Secure checkout and order placement.",
};

export default async function CheckoutPage() {
  const user = await requireUser("/checkout");
  const profile = await getCurrentProfile();
  const cartItems = await getCart(user.id);

  if (cartItems.length === 0) {
    redirect("/cart");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Complete Your Order
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Enter your delivery destination and confirm payment. All prices are verified server-side.
        </p>
      </div>

      <CheckoutForm cartItems={cartItems} userProfile={profile!} />
    </div>
  );
}
