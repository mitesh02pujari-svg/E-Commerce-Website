"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/db/auth";
import { createOrderFromCart } from "@/lib/db/orders";
import { CheckoutFormData } from "@/types";

export async function placeOrderAction(data: CheckoutFormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Please log in to complete checkout." };
  }

  // Validate form fields
  if (!data.shipping_name || data.shipping_name.trim().length < 2) {
    return { success: false, error: "Please provide a valid recipient full name." };
  }
  if (!data.shipping_email || !data.shipping_email.includes("@")) {
    return { success: false, error: "Please provide a valid shipping email address." };
  }
  if (!data.shipping_phone || data.shipping_phone.trim().length < 6) {
    return { success: false, error: "Please provide a valid contact phone number." };
  }
  if (!data.shipping_address || data.shipping_address.trim().length < 5) {
    return { success: false, error: "Please provide a detailed delivery street address." };
  }
  if (!data.shipping_city || data.shipping_city.trim().length < 2) {
    return { success: false, error: "Please specify your city." };
  }
  if (!data.shipping_state || data.shipping_state.trim().length < 2) {
    return { success: false, error: "Please specify your state or province." };
  }
  if (!data.shipping_postal_code || data.shipping_postal_code.trim().length < 3) {
    return { success: false, error: "Please specify a valid postal/zip code." };
  }

  const result = await createOrderFromCart(user.id, data);

  if (result.success) {
    revalidatePath("/cart");
    revalidatePath("/orders");
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
  }

  return result;
}
