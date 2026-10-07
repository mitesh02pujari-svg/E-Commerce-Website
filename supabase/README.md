# Supabase Database Setup

This directory contains the database migration and schema setup for the E-Commerce platform.

## Setup Instructions

1. **Create a Supabase Project:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.

2. **Apply Migrations:**
   - Option A (Dashboard): Copy the contents of [`migrations/20261007000000_init_schema.sql`](./migrations/20261007000000_init_schema.sql) and paste into the Supabase SQL Editor, then click **Run**.
   - Option B (Supabase CLI):
     ```bash
     npx supabase db push
     ```

3. **(Optional) Seed Data:**
   - Run the contents of [`seed.sql`](./seed.sql) in the SQL Editor to insert initial categories and sample products.

4. **Environment Variables:**
   - Obtain your **Project URL** and **anon / public key** from Project Settings -> API.
   - Add them to `.env.local`:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
     ```
