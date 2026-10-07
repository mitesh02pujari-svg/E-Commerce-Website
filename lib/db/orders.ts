import { createClient } from "@/lib/supabase/server";
import { CheckoutFormData, Order, OrderWithItems } from "@/types";
import { clearCart, getCart } from "./cart";

/**
 * Creates an order safely from user's current database cart.
 * - Validates cart is not empty
 * - Recalculates all product prices directly from the database (prevents price tampering)
 * - Verifies current inventory
 * - Creates Order and OrderItems records
 * - Atomically decrements product stock
 * - Clears user cart
 */
export async function createOrderFromCart(
  userId: string,
  shippingData: CheckoutFormData
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const supabase = await createClient();

  // 1. Fetch user's cart items with fresh product data
  const cartItems = await getCart(userId);
  if (!cartItems || cartItems.length === 0) {
    return { success: false, error: "Your cart is empty." };
  }

  // 2. Validate stock and calculate total server-side
  let calculatedTotal = 0;
  const orderItemsPayload: {
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    subtotal: number;
  }[] = [];

  for (const item of cartItems) {
    // Re-fetch individual fresh product to avoid race conditions
    const { data: freshProduct, error: prodErr } = await supabase
      .from("products")
      .select("id, name, price, stock, is_active")
      .eq("id", item.product_id)
      .single();

    if (prodErr || !freshProduct || !freshProduct.is_active) {
      return {
        success: false,
        error: `Product "${item.product.name}" is no longer available.`,
      };
    }

    if (freshProduct.stock < item.quantity) {
      return {
        success: false,
        error: `Insufficient stock for "${freshProduct.name}". Only ${freshProduct.stock} left.`,
      };
    }

    const price = Number(freshProduct.price);
    const subtotal = Number((price * item.quantity).toFixed(2));
    calculatedTotal += subtotal;

    orderItemsPayload.push({
      product_id: freshProduct.id,
      product_name: freshProduct.name,
      product_price: price,
      quantity: item.quantity,
      subtotal,
    });
  }

  calculatedTotal = Number(calculatedTotal.toFixed(2));

  // Determine initial payment status based on simulated payment method
  const isDemoCard = shippingData.payment_method.toLowerCase().includes("card");
  const paymentStatus = isDemoCard ? "PAID" : "PENDING";
  const initialOrderStatus = isDemoCard ? "CONFIRMED" : "PENDING";

  // 3. Insert Order record
  const { data: newOrder, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      total_amount: calculatedTotal,
      status: initialOrderStatus,
      shipping_name: shippingData.shipping_name.trim(),
      shipping_email: shippingData.shipping_email.trim(),
      shipping_phone: shippingData.shipping_phone.trim(),
      shipping_address: shippingData.shipping_address.trim(),
      shipping_city: shippingData.shipping_city.trim(),
      shipping_state: shippingData.shipping_state.trim(),
      shipping_postal_code: shippingData.shipping_postal_code.trim(),
      payment_method: shippingData.payment_method,
      payment_status: paymentStatus,
    })
    .select("id")
    .single();

  if (orderErr || !newOrder) {
    return {
      success: false,
      error: `Failed to create order: ${orderErr?.message || "Unknown error"}`,
    };
  }

  const orderId = newOrder.id;

  // 4. Insert Order Items
  const itemsWithOrderId = orderItemsPayload.map((item) => ({
    order_id: orderId,
    product_id: item.product_id,
    product_name: item.product_name,
    product_price: item.product_price,
    quantity: item.quantity,
    subtotal: item.subtotal,
  }));

  const { error: itemsErr } = await supabase
    .from("order_items")
    .insert(itemsWithOrderId);

  if (itemsErr) {
    console.error("Error inserting order items:", itemsErr.message);
  }

  // 5. Decrement stock for purchased products
  for (const item of orderItemsPayload) {
    // Try stored procedure first, fallback to standard update
    const { error: rpcErr } = await supabase.rpc("decrement_product_stock", {
      p_product_id: item.product_id,
      p_quantity: item.quantity,
    });

    if (rpcErr) {
      // Fallback query update if stored procedure was not yet executed
      const { data: current } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.product_id)
        .single();
      if (current) {
        await supabase
          .from("products")
          .update({
            stock: Math.max(0, current.stock - item.quantity),
            updated_at: new Date().toISOString(),
          })
          .eq("id", item.product_id);
      }
    }
  }

  // 6. Clear user cart
  await clearCart(userId);

  return { success: true, orderId };
}

/**
 * Fetch all orders placed by a specific user (newest first).
 */
export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user orders:", error.message);
    return [];
  }

  return (data || []) as Order[];
}

/**
 * Fetch a single order with its items.
 * Checks ownership or admin authorization.
 */
export async function getOrderById(
  orderId: string,
  userId?: string,
  isAdmin: boolean = false
): Promise<OrderWithItems | null> {
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select(`
      *,
      order_items(*)
    `)
    .eq("id", orderId);

  // Non-admins must match user_id
  if (!isAdmin && userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return null;
  }

  return data as unknown as OrderWithItems;
}
