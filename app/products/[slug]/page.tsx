import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/db/products";
import { formatCurrency } from "@/lib/utils";
import { ProductDetailAction } from "@/components/ecommerce/ProductDetailAction";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | NovaCart" };
  }

  return {
    title: `${product.name} | NovaCart`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.is_active) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.id,
    product.category_id,
    4
  );

  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  const savings = hasDiscount
    ? Number(product.compare_at_price) - Number(product.price)
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-indigo-600 transition-colors">
          Products
        </Link>
        {product.category && (
          <>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Large Image Display */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover object-center"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {hasDiscount && (
                <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow uppercase tracking-wide">
                  Save {formatCurrency(savings)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {product.category && (
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {product.category.name}
              </span>
            )}
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {product.name}
            </h1>
            {product.sku && (
              <p className="mt-1 text-xs text-slate-400 font-mono">
                SKU: {product.sku}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-base text-slate-400 line-through">
                {formatCurrency(product.compare_at_price!)}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          <div className="flex items-center gap-2">
            {isOutOfStock ? (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                <AlertTriangle className="h-4 w-4" />
                <span>Currently Out of Stock</span>
              </div>
            ) : isLowStock ? (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span>Hurry! Only {product.stock} units remaining in inventory</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>In Stock & Ready for Immediate Dispatch</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
              Product Overview
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Interactive Actions (Quantity + Add to Cart) */}
          <div className="pt-2">
            <ProductDetailAction productId={product.id} stock={product.stock} />
          </div>

          {/* Assurance Highlights */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-3">
            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
              <Truck className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              <span>Free standard express delivery on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
              <RotateCcw className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              <span>30-day hassle-free return and exchange guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
              <ShieldCheck className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              <span>100% genuine product verified with Supabase RLS security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Related Items
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              You May Also Like
            </h2>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
