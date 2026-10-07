import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/lib/db/orders";
import { formatCurrency } from "@/lib/utils";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ecommerce/OrderStatusBadge";
import { OrderStatusUpdater } from "@/components/admin/OrderStatusUpdater";
import { ArrowLeft, Mail, Phone, Calendar, CreditCard } from "lucide-react";

interface AdminOrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Admin Order Detail & Dispatch | Admin Portal",
  description: "Fulfill order, inspect line items, and adjust order status.",
};

export default async function AdminOrderDetailPage({
  params,
}: AdminOrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id, undefined, true);

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
    <div className="space-y-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to All Orders</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Order #{order.id}
            </h1>
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.payment_status} />
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>Placed on {dateStr}</span>
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 block">Total</span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(order.total_amount)}
          </span>
        </div>
      </div>

      {/* Main Grid: Status Updater & Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Status Updater Card */}
          <OrderStatusUpdater
            orderId={order.id}
            currentStatus={order.status}
            currentPaymentStatus={order.payment_status}
          />

          {/* Ordered Line Items */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
              Purchased Items ({order.order_items.length})
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {order.order_items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.product_name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} &times; {formatCurrency(item.product_price)}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
              <span>Total Revenue</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                {formatCurrency(order.total_amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
              Customer & Delivery Destination
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[11px] text-slate-400">Recipient Name</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">
                  {order.shipping_name}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400">Shipping Address</p>
                <p className="text-slate-700 dark:text-slate-300">
                  {order.shipping_address} <br />
                  {order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{order.shipping_email}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>{order.shipping_phone}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                  <span>Method: {order.payment_method}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
