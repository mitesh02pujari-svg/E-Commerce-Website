import { createClient } from "@/lib/supabase/server";
import { Product, ProductWithCategory } from "@/types";

export interface GetProductsParams {
  categorySlug?: string;
  categoryId?: string;
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest" | "name-asc";
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
  activeOnly?: boolean;
}

/**
 * Fetch products with flexible filtering, searching, and sorting.
 */
export async function getProducts(params: GetProductsParams = {}): Promise<ProductWithCategory[]> {
  const {
    categorySlug,
    categoryId,
    search,
    sort = "newest",
    minPrice,
    maxPrice,
    limit = 50,
    offset = 0,
    activeOnly = true,
  } = params;

  const supabase = await createClient();

  // If categorySlug is specified, look up category ID first
  let resolvedCategoryId = categoryId;
  if (categorySlug && !resolvedCategoryId) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();
    if (cat) {
      resolvedCategoryId = cat.id;
    }
  }

  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `);

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  if (resolvedCategoryId) {
    query = query.eq("category_id", resolvedCategoryId);
  }

  if (search && search.trim() !== "") {
    query = query.or(`name.ilike.%${search.trim()}%,description.ilike.%${search.trim()}%`);
  }

  if (typeof minPrice === "number" && minPrice > 0) {
    query = query.gte("price", minPrice);
  }

  if (typeof maxPrice === "number" && maxPrice > 0) {
    query = query.lte("price", maxPrice);
  }

  // Sorting
  switch (sort) {
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price", { ascending: false });
      break;
    case "name-asc":
      query = query.order("name", { ascending: true });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  if (limit) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return (data || []) as ProductWithCategory[];
}

/**
 * Fetch a single product by slug with category details.
 */
export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as ProductWithCategory;
}

/**
 * Fetch a single product by ID.
 */
export async function getProductById(id: string): Promise<ProductWithCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as ProductWithCategory;
}

/**
 * Fetch featured products for the homepage.
 */
export async function getFeaturedProducts(limit: number = 8): Promise<ProductWithCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error.message);
    return [];
  }

  return (data || []) as ProductWithCategory[];
}

/**
 * Fetch related products from the same category.
 */
export async function getRelatedProducts(
  productId: string,
  categoryId: string | null,
  limit: number = 4
): Promise<ProductWithCategory[]> {
  if (!categoryId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("id", productId)
    .limit(limit);

  if (error) return [];
  return (data || []) as ProductWithCategory[];
}

/**
 * Admin: Create a new product.
 */
export async function createProduct(data: {
  category_id?: string | null;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  image_url: string;
  stock: number;
  sku?: string | null;
  is_active?: boolean;
}) {
  const supabase = await createClient();
  const { data: created, error } = await supabase
    .from("products")
    .insert([data])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return created as Product;
}

/**
 * Admin: Update an existing product.
 */
export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "created_at" | "updated_at">>
) {
  const supabase = await createClient();
  const { data: updated, error } = await supabase
    .from("products")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return updated as Product;
}

/**
 * Admin: Toggle product active status (soft-deactivation).
 */
export async function toggleProductActive(id: string, is_active: boolean) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Product;
}
