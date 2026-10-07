# Full-Stack E-Commerce Platform

> **Thiranex Internship Task 3** — Production-ready Next.js Full-Stack E-Commerce Setup

An enterprise-grade, scalable full-stack e-commerce project built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL & Authentication)**.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security & Auth)
- **State & Utilities:** `@supabase/ssr`, `clsx`, `tailwind-merge`

---

## 📁 Scalable Project Structure

```text
E-Commerce-Website/
├── app/                      # Next.js App Router
│   ├── favicon.ico
│   ├── globals.css           # Tailwind CSS and global style definitions
│   ├── layout.tsx            # Root layout with Navbar and Footer
│   └── page.tsx              # Setup confirmation and architecture dashboard
├── components/               # Modular UI components
│   ├── layout/
│   │   ├── Navbar.tsx        # Responsive header navigation
│   │   └── Footer.tsx        # Responsive footer
│   └── ui/
│       ├── Badge.tsx         # Status indicator badge component
│       ├── Button.tsx        # Reusable button component
│       └── Card.tsx          # Card container and layout primitives
├── lib/                      # Core business logic and integrations
│   ├── constants.ts          # Site-wide constants and configurations
│   ├── utils.ts              # Styling merge (cn) and formatting helpers
│   ├── supabase.ts           # Convenience Supabase client export
│   └── supabase/
│       ├── client.ts         # Browser-side Supabase client (@supabase/ssr)
│       └── server.ts         # Server-side Supabase client with cookie storage
├── supabase/                 # Database schema & migrations
│   ├── migrations/
│   │   └── 20261007000000_init_schema.sql  # PostgreSQL schema with RLS
│   ├── seed.sql              # Initial category & sample product seeds
│   └── README.md             # Supabase setup guide
├── types/                    # Shared TypeScript typings
│   ├── database.ts           # Supabase database table definitions
│   └── index.ts              # Domain entities (Product, CartItem, Order, User)
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── .env.local                # Local environment secrets (ignored by git)
├── .gitignore                # Git ignore configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript compiler settings
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v20+ or v22+ recommended)
- npm, pnpm, or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Note:** `.env.local` is included in `.gitignore` and is never committed to GitHub.

### 4. Database Setup (Supabase)
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) and create a project.
2. Open the **SQL Editor**.
3. Run the SQL script from [`supabase/migrations/20261007000000_init_schema.sql`](./supabase/migrations/20261007000000_init_schema.sql) to create tables (`profiles`, `categories`, `products`, `orders`, `cart_items`) with Row Level Security.
4. (Optional) Run [`supabase/seed.sql`](./supabase/seed.sql) to populate initial sample categories and items.

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the verified setup.

---

## 🧪 Build & Lint Verification

To build for production:
```bash
npm run build
```

To run linting:
```bash
npm run lint
```
