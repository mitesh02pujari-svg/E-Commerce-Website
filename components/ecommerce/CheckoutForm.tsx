"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartItemWithProduct, CheckoutFormData, Profile } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { placeOrderAction } from "@/lib/actions/checkout";
import { Button } from "@/components/ui/Button";
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  Truck,
  Loader2,
  Lock,
} from "lucide-react";

interface CheckoutFormProps {
  cartItems: CartItemWithProduct[];
  userProfile: Profile;
}

export function CheckoutForm({ cartItems, userProfile }: CheckoutFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<CheckoutFormData>({
    shipping_name: userProfile.full_name || "",
    shipping_email: userProfile.email || "",
    shipping_phone: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_postal_code: "",
    payment_method: "Cash on Delivery",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const grandTotal = subtotal + shipping;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await placeOrderAction(formData);
      if (res.success && res.orderId) {
        router.push(`/orders/${res.orderId}?confirmed=true`);
      } else {
        setErrorMsg(res.error || "An error occurred while placing your order.");
      }
    } catch {
      setErrorMsg("Failed to submit checkout. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Shipping & Payment Details Column */}
      <div className="lg:col-span-7 space-y-8">
        {/* Shipping Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Truck className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Shipping Address & Contact
            </h2>
          </div>

          {errorMsg && (
            <div className="rounded-xl bg-red-50 p-4 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Full Name *
              </label>
              <input
                type="text"
                name="shipping_name"
                required
                value={formData.shipping_name}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email Address *
              </label>
              <input
                type="email"
                name="shipping_email"
                required
                value={formData.shipping_email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Phone Number *
              </label>
              <input
                type="tel"
                name="shipping_phone"
                required
                value={formData.shipping_phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Street Address *
              </label>
              <input
                type="text"
                name="shipping_address"
                required
                value={formData.shipping_address}
                onChange={handleChange}
                placeholder="123 Market Street, Apt 4B"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                City *
              </label>
              <input
                type="text"
                name="shipping_city"
                required
                value={formData.shipping_city}
                onChange={handleChange}
                placeholder="San Francisco"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                State / Province *
              </label>
              <input
                type="text"
                name="shipping_state"
                required
                value={formData.shipping_state}
                onChange={handleChange}
                placeholder="California"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Postal / Zip Code *
              </label>
              <input
                type="text"
                name="shipping_postal_code"
                required
                value={formData.shipping_postal_code}
                onChange={handleChange}
                placeholder="94103"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Payment Options Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Lock className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Payment Method
            </h2>
          </div>

          <div className="space-y-3">
            {/* Cash on Delivery option */}
            <label
              className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                formData.payment_method === "Cash on Delivery"
                  ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
              }`}
            >
              <input
                type="radio"
                name="payment_method"
                value="Cash on Delivery"
                checked={formData.payment_method === "Cash on Delivery"}
                onChange={handleChange}
                className="mt-1 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Cash on Delivery (COD)
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Pay securely with cash upon courier package arrival at your doorstep.
                </p>
              </div>
            </label>

            {/* Demo Card Payment */}
            <label
              className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                formData.payment_method === "Demo Card Payment"
                  ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
              }`}
            >
              <input
                type="radio"
                name="payment_method"
                value="Demo Card Payment"
                checked={formData.payment_method === "Demo Card Payment"}
                onChange={handleChange}
                className="mt-1 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Demo Card Payment (Simulated)
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Simulates instant 100% successful payment for demonstration purposes. No real payment card details collected.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Order Items & Total Summary Column */}
      <div className="lg:col-span-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6 sticky top-24">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Order Review ({cartItems.length} Items)
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={item.product.image_url}
                      alt={item.product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} &times; {formatCurrency(item.product.price)}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white whitespace-nowrap">
                  {formatCurrency(Number(item.product.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {shipping === 0 ? "FREE" : formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Grand Total</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full gap-2 shadow-lg shadow-indigo-600/20"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying & Placing Order...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>Place Order ({formatCurrency(grandTotal)})</span>
              </>
            )}
          </Button>

          <p className="text-[11px] text-center text-slate-400">
            By placing this order, you agree to our terms of service. Server validates all prices and decrements inventory automatically.
          </p>
        </div>
      </div>
    </form>
  );
}
