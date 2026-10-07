"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductWithCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { toggleProductActiveAction } from "@/lib/actions/admin";
import { Edit, Eye, Power, Search } from "lucide-react";

interface ProductTableProps {
  initialProducts: ProductWithCategory[];
}

export function ProductTable({ initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState<ProductWithCategory[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleActive = async (productId: string, currentStatus: boolean) => {
    setTogglingId(productId);
    try {
      const res = await toggleProductActiveAction(productId, !currentStatus);
      if (res.success && res.product) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, is_active: !currentStatus } : p))
        );
      }
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search products by title, SKU, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500 transition-all"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <span className="text-xs text-slate-500">
          Showing {filtered.length} of {products.length} products
        </span>
      </div>

      {/* Products Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((prod) => {
                const isToggling = togglingId === prod.id;
                return (
                  <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <Image
                            src={prod.image_url}
                            alt={prod.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <p className="font-semibold text-slate-900 dark:text-white truncate">
                            {prod.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            SKU: {prod.sku || "None"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {prod.category?.name || "Uncategorized"}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {formatCurrency(prod.price)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.stock <= 5
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}
                      >
                        {prod.stock} Units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(prod.id, prod.is_active)}
                        disabled={isToggling}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold cursor-pointer transition-colors ${
                          prod.is_active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        <Power className="h-3 w-3" />
                        <span>{prod.is_active ? "Active" : "Draft"}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link href={`/products/${prod.slug}`} target="_blank">
                          <button
                            type="button"
                            className="p-1.5 text-slate-400 hover:text-indigo-600 cursor-pointer"
                            title="View public page"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>
                        <Link href={`/admin/products/${prod.id}/edit`}>
                          <button
                            type="button"
                            className="p-1.5 text-slate-400 hover:text-indigo-600 cursor-pointer"
                            title="Edit product"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
