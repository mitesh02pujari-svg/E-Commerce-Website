import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types";
import { redirect } from "next/navigation";

/**
 * Retrieves the currently authenticated Supabase Auth user from cookies.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Retrieves the currently authenticated user's database profile (including role).
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    // If the profile hasn't been created yet by the trigger, return a fallback object
    return {
      id: user.id,
      email: user.email || "",
      full_name: user.user_metadata?.full_name || null,
      role: "user",
      avatar_url: user.user_metadata?.avatar_url || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  return profile as Profile;
}

/**
 * Checks whether the currently authenticated user is an admin.
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const profile = await getCurrentProfile();
  return profile?.role === "admin";
}

/**
 * Route protection helper: requires an authenticated user or redirects to login.
 */
export async function requireUser(returnUrl?: string) {
  const user = await getCurrentUser();
  if (!user) {
    const url = returnUrl ? `/login?returnUrl=${encodeURIComponent(returnUrl)}` : "/login";
    redirect(url);
  }
  return user;
}

/**
 * Route protection helper: requires an admin user or redirects to unauthorized/home.
 */
export async function requireAdmin() {
  const user = await requireUser("/admin");
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/?error=unauthorized");
  }

  return user;
}
