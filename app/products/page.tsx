import React from "react";
import { getCategories } from "@/lib/db/categories";
import { getProducts } from "@/lib/db/products";
import { ProductFilters } from "@/components/ecommerce/ProductFilters";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: "price-asc" | "price-desc" | "newest" | "name-asc";
  }>;
}

export const metadata = {
  title: "Product Catalog | Thiranex Store",
  description: "Browse our complete collection of electronics, apparel, homeware, and lifestyle essentials.",
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams.category;
  const search = resolvedParams.search;
  const sort = resolvedParams.sort || "newest";

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug,
      search,
      sort,
      activeOnly: true,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {activeCategory ? activeCategory.name : "All Products"}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-2xl">
          {activeCategory?.description ||
            "Discover premium items curated for quality, style, and everyday function. All products backed by verified Supabase inventory."}
        </p>
      </div>

      {/* Filter Controls */}
      <ProductFilters
        categories={categories}
        currentCategory={categorySlug}
        currentSearch={search}
        currentSort={sort}
      />

      {/* Results Count & Product Grid */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {products.length} product{products.length === 1 ? "" : "s"}</span>
      </div>

      <ProductGrid
        products={products}
        emptyMessage={
          search
            ? `No products found matching "${search}". Try adjusting your keywords or category filter.`
            : "No products available in this category yet."
        }
      />
    </div>
  );
}
