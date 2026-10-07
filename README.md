# E-Commerce Website

> **Thiranex Internship Task 3** — Complete, Functional Full-Stack E-Commerce Web Application built with Next.js 16, TypeScript, Tailwind CSS v4, and Supabase PostgreSQL.

Repository: [https://github.com/mitesh02pujari-svg/E-Commerce-Website](https://github.com/mitesh02pujari-svg/E-Commerce-Website)

---

## 📌 Project Overview

This repository is a production-grade full-stack e-commerce web platform engineered for **Task 3 of the Thiranex Internship**. The platform supports two core roles: **User** and **Admin**, integrated with **Supabase Authentication**, **PostgreSQL**, and **Row Level Security (RLS)**.

All business operations—product discovery, filtering, cart management, checkout, order generation, inventory tracking, and administrative catalog management—are backed by real database transactions without mock data.

---

## ✨ Features Implemented

### 🛒 Customer Experience (User Role)
- **Account Registration & Authentication**: Secure sign-up (`/signup`), sign-in (`/login`), and sign-out with session cookies.
- **Dynamic Product Catalog**: Search by keyword/title, filter by category collections, and sort by price or newest arrivals (`/products`).
- **Product Details**: High-resolution image showcase, dynamic discount calculations, live stock availability, quantity selector, and related products (`/products/[slug]`).
- **Category Browsing**: Dedicated category collection views (`/categories/[slug]`).
- **Persistent Database Shopping Cart**: Items are synced to Supabase `cart_items` for authenticated users with stock-capped quantity adjustment (`/cart`).
- **Secure Server-Validated Checkout**: Complete delivery address form with server-side recalculated pricing and atomic stock decrements (`/checkout`).
- **Order History & Live Delivery Tracking**: Detailed order receipt and a visual multi-stage fulfillment tracker (`PENDING` → `CONFIRMED` → `PROCESSING` → `SHIPPED` → `OUT_FOR_DELIVERY` → `DELIVERED`) (`/orders` & `/orders/[id]`).
- **Account Profile**: Overview of user information, role badges, and order shortcuts (`/profile`).

### 🛡️ Administrative Portal (Admin Role)
- **Executive Operations Dashboard**: Real-time KPI metrics displaying total revenue, total orders, pending orders, low-stock inventory alerts, and recent customer purchases (`/admin`).
- **Product Inventory Management**: Complete catalog listing with search, stock counts, SKU identifiers, draft/published visibility toggles, and edit links (`/admin/products`).
- **Product Creation & Editing**: Comprehensive form with name, slug generation, category assignment, price, compare-at price, SKU, stock count, and active status (`/admin/products/new` & `/admin/products/[id]/edit`).
- **Category Management**: Create, edit, and safely delete product collections with associated image URLs (`/admin/categories`).
- **Order Management & Fulfillment**: Filter orders by status, inspect customer details, line items, and transition fulfillment/payment statuses (`/admin/orders` & `/admin/orders/[id]`).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Turbopack)
- **Frontend & UI**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict typing, no `any`)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL 15+, Supabase Auth, Row Level Security)
- **Data Access & State**: `@supabase/ssr`, `@supabase/supabase-js`, `clsx`, `tailwind-merge`

---

## 🗂️ Project Architecture & Folder Structure

```text
E-Commerce/
├── app/                              # Next.js App Router routes & layouts
│   ├── (public)/                     # Public & customer store
│   │   ├── page.tsx                  # E-commerce landing page with hero, categories & catalog
│   │   ├── layout.tsx                # Root layout with responsive Navbar and Footer
│   │   ├── globals.css               # Tailwind CSS v4 theme variables
│   │   ├── loading.tsx               # Root loading fallback
│   │   ├── products/
│   │   │   ├── page.tsx              # Searchable, filterable catalog
│   │   │   ├── loading.tsx           # Product catalog skeleton
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # Dynamic product detail page
│   │   │       └── loading.tsx
│   │   ├── categories/
│   │   │   └── [slug]/page.tsx       # Category-specific catalog
│   │   ├── cart/
│   │   │   ├── page.tsx              # Persistent database cart page
│   │   │   └── loading.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx              # Shipping form and server-validated checkout
│   │   ├── orders/
│   │   │   ├── page.tsx              # Order history list
│   │   │   ├── loading.tsx
│   │   │   └── [id]/page.tsx         # Receipt and visual order progress tracker
│   │   ├── login/page.tsx            # Sign in
│   │   ├── signup/page.tsx           # Customer registration
│   │   └── profile/page.tsx          # User profile view
│   └── admin/                        # Protected Administrative Portal
│       ├── layout.tsx                # Admin authorization check and console navigation
│       ├── page.tsx                  # Admin analytics and metrics dashboard
│       ├── loading.tsx
│       ├── products/
│       │   ├── page.tsx              # Inventory and product management table
│       │   ├── new/page.tsx          # Create new catalog product
│       │   └── [id]/edit/page.tsx    # Edit existing product
│       ├── categories/
│       │   └── page.tsx              # Category creation and organization
│       └── orders/
│           ├── page.tsx              # Filterable admin order management
│           └── [id]/page.tsx         # Order fulfillment and status updater
├── components/                       # Modular UI components
│   ├── admin/                        # Admin-specific tables and forms
│   │   ├── CategoryManager.tsx
│   │   ├── OrderStatusUpdater.tsx
│   │   ├── ProductForm.tsx
│   │   └── ProductTable.tsx
│   ├── auth/                         # Authentication forms
│   │   ├── LoginForm.tsx
│   │   └── SignUpForm.tsx
│   ├── ecommerce/                    # Reusable customer components
│   │   ├── AddToCartButton.tsx
│   │   ├── CartView.tsx
│   │   ├── CheckoutForm.tsx
│   │   ├── OrderStatusBadge.tsx
│   │   ├── OrderTracker.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetailAction.tsx
│   │   ├── ProductFilters.tsx
│   │   └── ProductGrid.tsx
│   ├── layout/                       # App layout elements
│   │   ├── Navbar.tsx                # Responsive header with cart count and user profile
│   │   └── Footer.tsx                # Comprehensive e-commerce footer
│   └── ui/                           # Primitive UI components
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── Card.tsx
├── lib/                              # Centralized business logic & integrations
│   ├── actions/                      # Server Actions for mutations
│   │   ├── admin.ts                  # Admin product, category, and order status mutations
│   │   ├── auth.ts                   # Sign in, sign up, and sign out actions
│   │   ├── cart.ts                   # Cart addition, updates, and removals
│   │   └── checkout.ts               # Atomic order placement and stock decrement
│   ├── db/                           # Reusable Supabase database queries
│   │   ├── admin.ts                  # Operations metrics and order lists
│   │   ├── auth.ts                   # Session and profile helpers
│   │   ├── cart.ts                   # Cart queries and stock checks
│   │   ├── categories.ts             # Category fetch and admin mutations
│   │   ├── orders.ts                 # Order creation and retrieval
│   │   └── products.ts               # Filtered product queries
│   ├── supabase/                     # Supabase client factories
│   │   ├── client.ts                 # Typed browser client factory (@supabase/ssr)
│   │   └── server.ts                 # Typed server client factory with cookie handling
│   ├── constants.ts                  # Application constants and navigation links
│   ├── supabase.ts                   # Client re-export
│   └── utils.ts                      # Class merging (`cn`) and currency formatter
├── supabase/                         # Database schema & migrations
│   ├── migrations/
│   │   └── 20261007000000_init_schema.sql  # Complete PostgreSQL schema with RLS
│   ├── seed.sql                      # 6 categories & 18 realistic items
│   └── README.md                     # Setup instructions & admin promotion guide
├── types/                            # Strict TypeScript definitions
│   ├── database.ts                   # Supabase Database schema typings
│   └── index.ts                      # Domain entities (Product, Category, Order, Cart)
├── .env.example                      # Template environment variables
├── .env.local                        # Local secrets (strictly ignored by Git)
├── .gitignore                        # Git configuration
├── next.config.ts                    # Next.js configuration with remote image patterns
├── package.json                      # Dependencies and scripts
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## 🗄️ Database Schema & Entities

The PostgreSQL schema is defined in [`supabase/migrations/20261007000000_init_schema.sql`](./supabase/migrations/20261007000000_init_schema.sql):

1. **`profiles`**: `id` (references `auth.users`), `email`, `full_name`, `role` (`user` / `admin`), `avatar_url`, `created_at`, `updated_at`.
2. **`categories`**: `id`, `name`, `slug`, `description`, `image_url`, `created_at`.
3. **`products`**: `id`, `category_id`, `name`, `slug`, `description`, `price`, `compare_at_price`, `image_url`, `stock`, `sku`, `is_active`, `created_at`, `updated_at`.
4. **`cart_items`**: `id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`.
5. **`orders`**: `id`, `user_id`, `total_amount`, `status`, `shipping_name`, `shipping_email`, `shipping_phone`, `shipping_address`, `shipping_city`, `shipping_state`, `shipping_postal_code`, `payment_method`, `payment_status`, `created_at`, `updated_at`.
6. **`order_items`**: `id`, `order_id`, `product_id`, `product_name`, `product_price`, `quantity`, `subtotal`, `created_at`.

### Supported Order Statuses
- `PENDING` &bull; `CONFIRMED` &bull; `PROCESSING` &bull; `SHIPPED` &bull; `OUT_FOR_DELIVERY` &bull; `DELIVERED` &bull; `CANCELLED`

### Payment Statuses
- `PENDING` &bull; `PAID` &bull; `FAILED`

---

## 🔒 Security & Row Level Security (RLS)

- **Database-Backed Authorization**: Authorization is never based on editable user metadata. The `public.is_admin(user_id)` Security Definer function evaluates the `profiles` table directly.
- **Cart Privacy**: Only the owning user (`auth.uid() = user_id`) can view, add, or delete their cart items.
- **Order Isolation**: Customers can only inspect their own orders. Administrators can view and update all orders.
- **Catalog Protection**: Only administrators can insert, update, or delete products and categories.
- **Zero Secret Exposure**: Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used in frontend environment files. Service-role keys are never used in client or public repositories.

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/mitesh02pujari-svg/E-Commerce-Website.git
cd E-Commerce-Website
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your Supabase project credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Apply Supabase Migrations & Seed Data
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) -> **SQL Editor**.
2. Run the SQL script in [`supabase/migrations/20261007000000_init_schema.sql`](./supabase/migrations/20261007000000_init_schema.sql).
3. Run the SQL script in [`supabase/seed.sql`](./supabase/seed.sql) to load the 6 categories and 18 products.

### 4. Create & Promote an Admin User
1. Register a new user at `http://localhost:3000/signup` (e.g. `admin@thiranex.com`).
2. In the Supabase **SQL Editor**, run:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'admin@thiranex.com';
   ```
3. Sign in to access the **Admin Console** at `/admin`.

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Build

```bash
# Run linting
npm run lint

# Run production build
npm run build
```

---

## 🔮 Future Improvements

- Automated invoice generation (PDF download).
- Live real-time order status updates via Supabase Realtime channels.
- Integration with third-party payment gateways (Stripe, Razorpay) when moving to commercial production.
- Product customer reviews and star rating submissions.
