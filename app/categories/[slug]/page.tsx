import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getCategories } from "@/lib/db/categories";
import { getProducts } from "@/lib/db/products";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { ProductFilters } from "@/components/ecommerce/ProductFilters";
import { ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    search?: string;
    sort?: "price-asc" | "price-desc" | "newest" | "name-asc";
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | Thiranex Store" };
  }

  return {
    title: `${category.name} | Thiranex Store`,
    description: category.description || `Browse our ${category.name} collection.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { search, sort = "newest" } = await searchParams;

  const [category, categories, products] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getProducts({
      categorySlug: slug,
      search,
      sort,
      activeOnly: true,
    }),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-indigo-600 transition-colors">
          Categories
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 dark:text-white font-medium">
          {category.name}
        </span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {category.name}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-2xl">
          {category.description ||
            `Curated selection of ${category.name} designed for everyday utility and performance.`}
        </p>
      </div>

      <ProductFilters
        categories={categories}
        currentCategory={category.slug}
        currentSearch={search}
        currentSort={sort}
      />

      <ProductGrid
        products={products}
        emptyMessage={`No products currently available in ${category.name}. Check back soon!`}
      />
    </div>
  );
}
