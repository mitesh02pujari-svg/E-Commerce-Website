import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates and returns a Supabase client for client-side components.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Helper to check whether Supabase environment variables have been configured
 * with non-placeholder values.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;
  if (url.includes("your-project-id") || key.includes("your-anon-key")) return false;

  return true;
}
