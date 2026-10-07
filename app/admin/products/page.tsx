import React from "react";
import Link from "next/link";
import { getProducts } from "@/lib/db/products";
import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Product Inventory Management | Admin Portal",
  description: "View and manage catalog items, pricing, and stock levels.",
};

export default async function AdminProductsPage() {
  const products = await getProducts({ activeOnly: false, limit: 100 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Product Catalog & Inventory
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Control product availability, update quantities, and edit pricing.
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button size="sm" className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Button>
        </Link>
      </div>

      <ProductTable initialProducts={products} />
    </div>
  );
}
