import { createClient as createBrowserClient, isSupabaseConfigured } from "./supabase/client";

/**
 * Default browser-ready Supabase client instance.
 * For server components or routes, import { createClient } from "@/lib/supabase/server".
 */
export const supabase = createBrowserClient();

export { createBrowserClient, isSupabaseConfigured };
export { createClient as createServerSupabaseClient } from "./supabase/server";
