# Supabase Database & Security Architecture

> **Thiranex Internship Task 3** — Production-grade PostgreSQL Schema, Row Level Security (RLS), and Seed Data

---

## 🗄️ Database Tables Overview

| Table | Description | RLS Policy Summary |
| :--- | :--- | :--- |
| `profiles` | Syncs automatically with `auth.users` via trigger. Contains role (`user` / `admin`). | Users can view/update own profile; Admins view all; Users cannot elevate their own role. |
| `categories` | Product collections (Electronics, Fashion, Home & Living, Sports, Beauty, Accessories). | Public read; Admin insert/update/delete. |
| `products` | Product catalog with price, compare_at_price, stock, SKU, image_url. | Public view active items; Admin manage all. |
| `cart_items` | Real-time user shopping cart items with stock constraints. | Restricted to owning user (`auth.uid() = user_id`). |
| `orders` | Customer orders with shipping info, payment status, and order fulfillment status. | Users view/create own orders; Admins view and update all. |
| `order_items` | Line items belonging to specific orders with snapshot price at time of purchase. | Viewable only by order owner and admins. |

---

## 🚀 Setup & Migration Steps

### Step 1: Run the Database Migration
In your [Supabase Dashboard](https://supabase.com/dashboard):
1. Navigate to your project -> **SQL Editor**.
2. Click **New query**.
3. Copy and paste the entire contents of [`supabase/migrations/20261007000000_init_schema.sql`](./migrations/20261007000000_init_schema.sql).
4. Click **Run**. This establishes all tables, constraints, security definer functions, and RLS policies.

### Step 2: Seed the Product Catalog
1. In the **SQL Editor**, open another new query.
2. Copy and paste the contents of [`supabase/seed.sql`](./seed.sql).
3. Click **Run**. This will populate 6 curated categories and 18 realistic items with images and inventory counts.

---

## 🛡️ Promoting a User to Administrator

To test the **Admin Portal** (`/admin`, `/admin/products`, `/admin/categories`, `/admin/orders`):

1. Go to the web application at `http://localhost:3000/signup`.
2. Register a new customer account with your preferred email (e.g. `admin@thiranex.com`).
3. Open your Supabase project **SQL Editor** and execute:

```sql
-- Promote your user account to Administrator
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@thiranex.com';

-- Verify the role assignment
SELECT id, email, full_name, role
FROM public.profiles
WHERE email = 'admin@thiranex.com';
```

4. Return to the app or re-login. The navigation bar will now show the **Admin Portal** button, granting access to `/admin`.

---

## 🔒 Security Best Practices Implemented

- **No Public Service Role Key**: Only public Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are stored in frontend environment variables.
- **Role Isolation**: User metadata is never trusted for authorization. All authorization checks are executed against the database `profiles` table using the `public.is_admin(auth.uid())` Security Definer function.
- **Server-Side Price Verification**: Order totals are calculated on the server using fresh database prices, preventing client-side price tampering.
- **Atomic Stock Decrements**: Inventory is reduced during checkout execution.
