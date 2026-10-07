import { createClient } from "@/lib/supabase/server";
import { CartItemWithProduct } from "@/types";

/**
 * Fetch all cart items for a given user with product details.
 */
export async function getCart(userId: string): Promise<CartItemWithProduct[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cart:", error.message);
    return [];
  }

  // Filter out any cart items where the product was deleted or inactive
  const validItems = (data || []).filter(
    (item) => item.product && item.product.is_active
  ) as unknown as CartItemWithProduct[];

  return validItems;
}

/**
 * Get total quantity count of items in user's cart.
 */
export async function getCartItemCount(userId: string): Promise<number> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", userId);

  if (error || !data) return 0;

  return data.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Add product to cart or increment quantity if already present.
 */
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Check product exists and has stock
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, stock, is_active, name")
    .eq("id", productId)
    .single();

  if (productError || !product || !product.is_active) {
    return { success: false, error: "Product not available" };
  }

  if (product.stock <= 0) {
    return { success: false, error: "Product is out of stock" };
  }

  // Check existing cart item
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock) {
      return {
        success: false,
        error: `Only ${product.stock} units available in stock (you already have ${existingItem.quantity} in cart)`,
      };
    }

    const { error: updateError } = await supabase
      .from("cart_items")
      .update({
        quantity: newQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingItem.id);

    if (updateError) return { success: false, error: updateError.message };
    return { success: true };
  } else {
    if (quantity > product.stock) {
      return {
        success: false,
        error: `Only ${product.stock} units available in stock`,
      };
    }

    const { error: insertError } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: productId,
      quantity,
    });

    if (insertError) return { success: false, error: insertError.message };
    return { success: true };
  }
}

/**
 * Update quantity for an existing cart item.
 */
export async function updateCartItemQuantity(
  userId: string,
  cartItemId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  if (quantity <= 0) {
    return removeFromCart(userId, cartItemId);
  }

  // Get cart item and associated product stock
  const { data: item } = await supabase
    .from("cart_items")
    .select("id, product_id, product:products(stock)")
    .eq("id", cartItemId)
    .eq("user_id", userId)
    .single();

  if (!item) {
    return { success: false, error: "Cart item not found" };
  }

  const stock = (item.product as unknown as { stock: number })?.stock ?? 0;
  if (quantity > stock) {
    return { success: false, error: `Only ${stock} units available in stock` };
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq("id", cartItemId)
    .eq("user_id", userId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/**
 * Remove an item from the cart.
 */
export async function removeFromCart(
  userId: string,
  cartItemId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", userId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/**
 * Clear all items from user's cart.
 */
export async function clearCart(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from("cart_items").delete().eq("user_id", userId);
  return !error;
}
