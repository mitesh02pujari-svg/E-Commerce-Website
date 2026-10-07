import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/db/categories";
import { getFeaturedProducts } from "@/lib/db/products";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Zap,
  ShoppingBag,
  Clock,
} from "lucide-react";

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>Thiranex Task 3 &bull; Curated Collection 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Elevate Everyday Living with{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  Exceptional Craft.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mx-auto lg:mx-0">
                Discover studio-grade acoustics, bespoke apparel, and artisanal living accessories. Engineered with precision and backed by real-time inventory management.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/products">
                  <Button size="lg" className="gap-2 shadow-lg shadow-indigo-600/20">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Explore Products</span>
                  </Button>
                </Link>
                <Link href="#categories">
                  <Button size="lg" variant="outline" className="gap-2">
                    <span>Browse Categories</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 text-left">
                <div>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">100%</p>
                  <p className="text-xs text-slate-500">Verified Products</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">PostgreSQL</p>
                  <p className="text-xs text-slate-500">Live Inventory</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">&lt; 48 hrs</p>
                  <p className="text-xs text-slate-500">Fast Dispatch</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-slate-200/80 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80"
                    alt="Featured headphones showcase"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="rounded-full bg-indigo-600/90 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Editor&apos;s Pick
                    </span>
                    <h3 className="mt-1.5 text-lg font-bold">Aura Wireless Noise-Cancelling</h3>
                    <p className="text-xs text-slate-200 mt-0.5">Starting at $299.99 &bull; Free Shipping</p>
                  </div>
                </div>

                {/* Floating highlight card */}
                <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Active Promotion</p>
                      <p className="text-[11px] text-slate-500">Save up to 30% this week</p>
                    </div>
                  </div>
                  <Link href="/products">
                    <Button size="sm" variant="outline">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section id="categories" className="py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Collections
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1 group"
            >
              <span>Explore all collections</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative flex flex-col items-center rounded-2xl border border-slate-200/80 bg-slate-50 p-3 text-center transition-all hover:bg-white hover:shadow-lg hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-3">
                  {cat.image_url ? (
                    <Image
                      src={cat.image_url}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 font-bold text-lg">
                      {cat.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="mt-0.5 text-[10px] text-slate-400">View items &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="py-16 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Handpicked
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Featured Products
              </h2>
              <p className="mt-1 text-xs text-slate-500 max-w-md">
                Top rated essentials with real-time stock availability and instant order dispatch.
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="sm" className="gap-1.5">
                <span>View Full Catalog</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold text-indigo-200">
                <Clock className="h-3.5 w-3.5" />
                Limited Time Special
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Upgrade Your Lifestyle with Cutting-Edge Gear.
              </h2>
              <p className="text-sm sm:text-base text-indigo-200 leading-relaxed">
                Enjoy complimentary express delivery on orders over $50. Tested and verified full-stack checkout with instant simulated fulfillment.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/products">
                  <Button variant="secondary" size="md">
                    Shop Trending Items
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
                    Create Customer Account
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Why Shop With Us / Core Strengths */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Reliability First
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Engineered for Seamless Shopping
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-4">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Real-Time Inventory
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Never worry about ordering out-of-stock items. Inventory counters are decremented atomically with PostgreSQL transactions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Row Level Security
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cart contents, user orders, and administrative capabilities are strictly isolated by Supabase database policies.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Next.js 16 Performance
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Blazing fast load times with Turbopack, App Router Server Components, and optimized image rendering.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
