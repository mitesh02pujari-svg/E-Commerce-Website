import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/db/auth";
import { getOrderById } from "@/lib/db/orders";
import { formatCurrency } from "@/lib/utils";
import { OrderTracker } from "@/components/ecommerce/OrderTracker";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ecommerce/OrderStatusBadge";
import { ArrowLeft, CheckCircle2, MapPin, CreditCard, Calendar } from "lucide-react";

interface OrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    confirmed?: string;
  }>;
}

export const metadata = {
  title: "Order Details & Tracking | Thiranex Store",
  description: "Live tracking, delivery status, and order receipt.",
};

export default async function OrderDetailPage({
  params,
  searchParams,
}: OrderDetailPageProps) {
  const { id } = await params;
  const { confirmed } = await searchParams;

  const user = await requireUser(`/orders/${id}`);
  const order = await getOrderById(id, user.id, false);

  if (!order) {
    notFound();
  }

  const dateStr = new Date(order.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back to Orders */}
      <div className="flex items-center justify-between">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Orders</span>
        </Link>
      </div>

      {/* Confirmation Banner (if just redirected from checkout) */}
      {confirmed === "true" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 dark:border-emerald-900/60 dark:bg-emerald-950/30 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
              Order Successfully Placed!
            </h2>
            <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
              Thank you for shopping with Thiranex Store. Your order has been registered in the database, product inventory has been updated, and fulfillment is in progress.
            </p>
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Order #{order.id.slice(0, 8)}
            </h1>
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.payment_status} />
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Placed on {dateStr}</span>
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 block">Total Amount</span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(order.total_amount)}
          </span>
        </div>
      </div>

      {/* Visual Progress Tracker */}
      <OrderTracker status={order.status} />

      {/* Two Column Layout: Items & Shipping */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Purchased Items List */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
            Ordered Items ({order.order_items.length})
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {order.order_items.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {item.product_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.quantity} &times; {formatCurrency(item.product_price)}
                  </p>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">
                  {formatCurrency(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
            <span>Order Total</span>
            <span className="text-indigo-600 dark:text-indigo-400">
              {formatCurrency(order.total_amount)}
            </span>
          </div>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="lg:col-span-4 space-y-6">
          {/* Shipping Address */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <span>Delivery Details</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {order.shipping_name}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {order.shipping_address} <br />
              {order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p>Email: {order.shipping_email}</p>
              <p>Phone: {order.shipping_phone}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500">
              <CreditCard className="h-4 w-4 text-indigo-600" />
              <span>Payment Details</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Method</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {order.payment_method}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Status</span>
              <PaymentStatusBadge status={order.payment_status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
