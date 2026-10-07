-- ==============================================================================
-- Thiranex Internship Task 3 - Full-Stack E-Commerce Database Schema
-- PostgreSQL Schema with Row Level Security (RLS) for Supabase
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 1. Profiles Table (syncs with Supabase auth.users)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

-- Function to check if a user has admin privileges (Security Definer avoids recursive RLS)
create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = user_id and role = 'admin'
  );
$$;

-- Profiles Policies
create policy "Users can view own profile or admins view all"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "Users can update own profile (cannot escalate role)"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id and (
      role = (select p.role from public.profiles p where p.id = auth.uid())
      or public.is_admin(auth.uid())
    )
  );

-- ==============================================================================
-- 2. Categories Table
-- ==============================================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamptz default now() not null
);

alter table public.categories enable row level security;

create policy "Categories are publicly viewable"
  on public.categories for select
  using (true);

create policy "Admins can insert categories"
  on public.categories for insert
  with check (public.is_admin(auth.uid()));

create policy "Admins can update categories"
  on public.categories for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

create policy "Admins can delete categories"
  on public.categories for delete
  using (public.is_admin(auth.uid()));

-- ==============================================================================
-- 3. Products Table
-- ==============================================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2) check (compare_at_price >= 0),
  image_url text not null,
  stock integer not null default 0 check (stock >= 0),
  sku text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.products enable row level security;

create policy "Active products are viewable by everyone, all viewable by admin"
  on public.products for select
  using (is_active = true or public.is_admin(auth.uid()));

create policy "Admins can insert products"
  on public.products for insert
  with check (public.is_admin(auth.uid()));

create policy "Admins can update products"
  on public.products for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

create policy "Admins can delete products"
  on public.products for delete
  using (public.is_admin(auth.uid()));

-- ==============================================================================
-- 4. Cart Items Table
-- ==============================================================================
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, product_id)
);

alter table public.cart_items enable row level security;

create policy "Users can view own cart items"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can insert own cart items"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cart items"
  on public.cart_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own cart items"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- ==============================================================================
-- 5. Orders Table
-- ==============================================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_amount numeric(10, 2) not null check (total_amount >= 0),
  status text not null default 'PENDING' check (status in ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED')),
  shipping_name text not null,
  shipping_email text not null,
  shipping_phone text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_state text not null,
  shipping_postal_code text not null,
  payment_method text not null default 'Cash on Delivery',
  payment_status text not null default 'PENDING' check (payment_status in ('PENDING', 'PAID', 'FAILED')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.orders enable row level security;

create policy "Users can view own orders, admins view all orders"
  on public.orders for select
  using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy "Users can create own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Admins can update orders (e.g. change status)"
  on public.orders for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- ==============================================================================
-- 6. Order Items Table
-- ==============================================================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_price numeric(10, 2) not null check (product_price >= 0),
  quantity integer not null check (quantity > 0),
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  created_at timestamptz default now() not null
);

alter table public.order_items enable row level security;

create policy "Users can view own order items, admins view all"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
      and (o.user_id = auth.uid() or public.is_admin(auth.uid()))
    )
  );

create policy "Users can insert order items for own order"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
      and o.user_id = auth.uid()
    )
  );

-- ==============================================================================
-- 7. Triggers and Stored Procedures
-- ==============================================================================

-- Trigger to create a profile automatically when a user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    'user'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Atomic Stock Decrement Procedure
create or replace function public.decrement_product_stock(p_product_id uuid, p_quantity integer)
returns void
language plpgsql
security definer
as $$
begin
  update public.products
  set stock = stock - p_quantity,
      updated_at = now()
  where id = p_product_id and stock >= p_quantity;

  if not found then
    raise exception 'Insufficient stock or product not found';
  end if;
end;
$$;
