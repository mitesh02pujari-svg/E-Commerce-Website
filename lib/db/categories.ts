import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types";

/**
 * Fetch all categories ordered by name.
 */
export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  return (data || []) as Category[];
}

/**
 * Fetch a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Category;
}

/**
 * Admin: Create a new category.
 */
export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}) {
  const supabase = await createClient();
  const { data: created, error } = await supabase
    .from("categories")
    .insert([data])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return created as Category;
}

/**
 * Admin: Update an existing category.
 */
export async function updateCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string | null;
    image_url?: string | null;
  }
) {
  const supabase = await createClient();
  const { data: updated, error } = await supabase
    .from("categories")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return updated as Category;
}

/**
 * Admin: Delete a category (checks if products are linked).
 */
export async function deleteCategory(id: string) {
  const supabase = await createClient();

  // Check if any products are using this category
  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);

  if (count && count > 0) {
    throw new Error(`Cannot delete category: ${count} product(s) are still assigned to it.`);
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}
