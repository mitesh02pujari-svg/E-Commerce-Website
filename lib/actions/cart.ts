"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/db/auth";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/lib/db/cart";

export async function addToCartAction(productId: string, quantity: number = 1) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, requireAuth: true, error: "Please log in to add items to your cart." };
  }

  const result = await addToCart(user.id, productId, quantity);
  if (result.success) {
    revalidatePath("/cart");
    revalidatePath("/products");
  }
  return result;
}

export async function updateCartQuantityAction(cartItemId: string, quantity: number) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, requireAuth: true, error: "Please log in to manage your cart." };
  }

  const result = await updateCartItemQuantity(user.id, cartItemId, quantity);
  if (result.success) {
    revalidatePath("/cart");
  }
  return result;
}

export async function removeCartItemAction(cartItemId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, requireAuth: true, error: "Please log in to manage your cart." };
  }

  const result = await removeFromCart(user.id, cartItemId);
  if (result.success) {
    revalidatePath("/cart");
  }
  return result;
}

export async function clearCartAction() {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, requireAuth: true, error: "Please log in." };
  }

  const success = await clearCart(user.id);
  if (success) {
    revalidatePath("/cart");
  }
  return { success };
}
