import React from "react";
import Link from "next/link";
import { getAdminDashboardStats } from "@/lib/db/admin";
import { formatCurrency } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/ecommerce/OrderStatusBadge";
import { Button } from "@/components/ui/Button";
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Plus,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Thiranex Store",
  description: "Overview statistics, order fulfillment, and product catalog management.",
};

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Operations & Performance Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Real-time business metrics and database state for Thiranex Store.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/products/new">
            <Button size="sm" className="gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Add New Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Revenue
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(stats.totalRevenue)}
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">From verified orders</span>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Orders
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.totalOrders}
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {stats.pendingOrders} pending fulfillment
          </span>
        </div>

        {/* Total Products */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Catalog Items
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.totalProducts}
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {stats.activeProducts} actively published
          </span>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Low Stock Alert
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.lowStockProducts}
          </p>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 block">
            Items under 10 units
          </span>
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/products/new"
          className="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Add Product</p>
              <p className="text-[10px] text-slate-500">Create new catalog item</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/products"
          className="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Manage Products</p>
              <p className="text-[10px] text-slate-500">Stock, edit, activate</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/categories"
          className="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Categories</p>
              <p className="text-[10px] text-slate-500">Add or edit collections</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/orders"
          className="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Manage Orders</p>
              <p className="text-[10px] text-slate-500">Fulfill & update statuses</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Two Column Section: Recent Orders & Low Stock Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recent Customer Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              View All Orders &rarr;
            </Link>
          </div>

          {stats.recentOrders.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">
              No orders registered yet in the database.
            </p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-mono font-bold text-indigo-600 hover:underline"
                    >
                      #{order.id.slice(0, 8)}
                    </Link>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {order.shipping_name} &bull; {order.shipping_city}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatCurrency(order.total_amount)}
                    </span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Items */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Inventory Watch</span>
            </h3>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              Manage &rarr;
            </Link>
          </div>

          {stats.lowStockItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-emerald-600 flex flex-col items-center gap-2">
              <CheckCircle className="h-8 w-8 text-emerald-500" />
              <span>All inventory levels are healthy!</span>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {stats.lowStockItems.slice(0, 5).map((prod) => (
                <div key={prod.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                      {prod.name}
                    </p>
                    <p className="text-[11px] text-slate-400">SKU: {prod.sku || "N/A"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold">
                      {prod.stock} Left
                    </span>
                    <Link href={`/admin/products/${prod.id}/edit`}>
                      <Button size="sm" variant="outline">
                        Restock
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
