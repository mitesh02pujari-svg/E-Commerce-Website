import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function Home() {
  const isSupabaseReady = isSupabaseConfigured();

  const architectureItems = [
    {
      title: "App Router (Next.js 16)",
      path: "app/",
      description: "Modern server & client component routing, optimized layouts, and pre-rendering.",
      status: "Ready",
      variant: "success" as const,
      icon: (
        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "TypeScript Architecture",
      path: "types/",
      description: "Strict end-to-end typing with Database schema types, cart, and domain definitions.",
      status: "Configured",
      variant: "success" as const,
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Tailwind CSS Styling",
      path: "globals.css",
      description: "Responsive design system with fluid typography, dark mode, and UI components.",
      status: "Active",
      variant: "success" as const,
      icon: (
        <svg className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: "Supabase PostgreSQL & Auth",
      path: "lib/supabase/",
      description: "SSR and Browser clients configured with cookie persistence and SQL migrations.",
      status: isSupabaseReady ? "Connected" : "Placeholder Set",
      variant: isSupabaseReady ? ("success" as const) : ("info" as const),
      icon: (
        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="default">Thiranex Internship</Badge>
            <span className="text-slate-400">&bull;</span>
            <Badge variant="success">Task 3: Full-Stack Setup Verified</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Next.js Full-Stack <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
              E-Commerce Platform
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Repository successfully initialized with Next.js App Router, TypeScript, Tailwind CSS, and Supabase client architecture. Clean, production-ready foundation prepared for e-commerce feature development.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="#architecture">
              <Button size="lg" variant="primary">
                Explore Project Structure
              </Button>
            </Link>
            <Link
              href="https://github.com/mitesh02pujari-svg/E-Commerce-Website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                View on GitHub
              </Button>
            </Link>
          </div>

          {/* Quick Status Bar */}
          <div className="mt-12 mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white/70 p-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Framework</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Next.js 16 (App)</p>
              </div>
              <div className="p-2 border-l border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Language</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">TypeScript 5</p>
              </div>
              <div className="p-2 border-l border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Styling</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Tailwind CSS v4</p>
              </div>
              <div className="p-2 border-l border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Database</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Supabase (PostgreSQL)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="w-full py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Scalable Project Architecture
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Clean modular folders structured for scale, separation of concerns, and rapid e-commerce feature integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureItems.map((item) => (
              <Card key={item.title} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      {item.icon}
                    </div>
                    <Badge variant={item.variant}>{item.status}</Badge>
                  </div>
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <code className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                      {item.path}
                    </code>
                  </CardHeader>
                  <CardContent className="p-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supabase & Database Setup Details */}
      <section className="w-full py-12 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block mb-3">
                <Badge variant="info">Database & Authentication</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Supabase Client & SQL Migrations Ready
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Supabase client factories are configured for both Client and Server Components in <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">lib/supabase/</code>. Production schema migrations with Row Level Security (RLS) policies are provided in <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">supabase/migrations/</code>.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs">✓</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">`.env.local` & `.env.example`</span> initialized with Supabase URL & Anon Key placeholders.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs">✓</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">Git Protection:</span> `.env.local` is ignored in `.gitignore`, preventing accidental key leaks.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs">✓</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">Database Schema:</span> Includes <code className="text-xs">profiles</code>, <code className="text-xs">categories</code>, <code className="text-xs">products</code>, <code className="text-xs">orders</code>, and <code className="text-xs">cart_items</code>.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-900 p-6 text-slate-100 dark:border-slate-800 font-mono text-xs shadow-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                <span className="font-sans text-xs font-semibold">Environment Status</span>
                <span className="flex items-center gap-1.5">
                  <span className={`inline-block h-2 w-2 rounded-full ${isSupabaseReady ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`}></span>
                  {isSupabaseReady ? 'Credentials Configured' : 'Awaiting Supabase Keys'}
                </span>
              </div>
              <p className="text-slate-400 mb-2"># .env.local configuration:</p>
              <p className="text-emerald-400">NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co</p>
              <p className="text-emerald-400">NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here</p>
              <p className="mt-4 text-slate-400"># Connect your live project:</p>
              <p className="text-slate-300">1. Create a project at https://supabase.com</p>
              <p className="text-slate-300">2. Copy URL & Anon Key into .env.local</p>
              <p className="text-slate-300">3. Run migrations via Supabase SQL Editor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Card */}
      <section id="features" className="w-full py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white border-0 shadow-lg">
            <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <Badge variant="default" className="bg-indigo-700/80 text-white">
                  Milestone Status
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Setup Complete & Build Verified
                </h3>
                <p className="text-sm text-indigo-200 max-w-xl">
                  Phase 1 requirement completed: repository setup, dependencies, Supabase integration foundation, Git config, and verification. Ready for next phases (product catalog, authentication, cart & checkout).
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href="https://github.com/mitesh02pujari-svg/E-Commerce-Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="secondary" className="w-full">
                    Inspect Repository
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
