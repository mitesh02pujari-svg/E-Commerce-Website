import React from "react";
import Link from "next/link";
import { getAllOrders } from "@/lib/db/admin";
import { formatCurrency } from "@/lib/utils";
import { OrderStatus } from "@/types";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ecommerce/OrderStatusBadge";
import { Button } from "@/components/ui/Button";
import { Search, Eye } from "lucide-react";

interface AdminOrdersPageProps {
  searchParams: Promise<{
    status?: OrderStatus;
    search?: string;
  }>;
}

export const metadata = {
  title: "Order Fulfillment & Management | Admin Portal",
  description: "Monitor, update, and manage all incoming customer orders.",
};

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const { status, search } = await searchParams;
  const orders = await getAllOrders({ status, search });

  const filterTabs: { label: string; value?: OrderStatus }[] = [
    { label: "All Orders" },
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Order Management & Fulfillment
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Inspect order details, track customer requests, and advance fulfillment stages.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map((tab) => {
            const isSelected = (!status && !tab.value) || status === tab.value;
            const queryUrl = tab.value
              ? `/admin/orders?status=${tab.value}`
              : "/admin/orders";

            return (
              <Link
                key={tab.label}
                href={queryUrl}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Customer Search */}
        <form method="GET" action="/admin/orders" className="relative max-w-xs">
          <input
            type="text"
            name="search"
            defaultValue={search || ""}
            placeholder="Search by name, email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-all"
          />
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
        </form>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No orders match the selected criteria.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const dateStr = new Date(order.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600">
                        <Link href={`/admin/orders/${order.id}`}>
                          #{order.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{dateStr}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {order.shipping_name}
                        </p>
                        <p className="text-[10px] text-slate-400">{order.shipping_email}</p>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td className="py-3 px-4">
                        <PaymentStatusBadge status={order.payment_status} />
                      </td>
                      <td className="py-3 px-4">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>Manage</span>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
