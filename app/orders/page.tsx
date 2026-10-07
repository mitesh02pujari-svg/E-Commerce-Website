import React from "react";
import Link from "next/link";
import { requireUser } from "@/lib/db/auth";
import { getUserOrders } from "@/lib/db/orders";
import { formatCurrency } from "@/lib/utils";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ecommerce/OrderStatusBadge";
import { Button } from "@/components/ui/Button";
import { Package, ArrowRight, Calendar, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "My Orders | NovaCart",
  description: "View your order history and live delivery tracking.",
};

export default async function UserOrdersPage() {
  const user = await requireUser("/orders");
  const orders = await getUserOrders(user.id);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          My Order History
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Track fulfillment status, view detailed receipts, and monitor delivery timelines.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white/50 dark:bg-slate-900/50 max-w-lg mx-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
            <Package className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Orders Placed Yet
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            You haven&apos;t placed any orders yet. Once you complete checkout, your order will appear here with live tracking.
          </p>
          <div className="mt-6">
            <Link href="/products">
              <Button size="md" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Start Shopping</span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const dateStr = new Date(order.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-slate-300"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      Order #{order.id.slice(0, 8)}...
                    </span>
                    <OrderStatusBadge status={order.status} />
                    <PaymentStatusBadge status={order.payment_status} />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {dateStr}
                    </span>
                    <span>&bull;</span>
                    <span>Payment: {order.payment_method}</span>
                    <span>&bull;</span>
                    <span>Ship to: {order.shipping_city}, {order.shipping_state}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">
                      {formatCurrency(order.total_amount)}
                    </p>
                  </div>

                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <span>Track Order</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
