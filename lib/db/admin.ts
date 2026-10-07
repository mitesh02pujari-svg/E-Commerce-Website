import { createClient } from "@/lib/supabase/server";
import { AdminDashboardStats, Order, OrderStatus, PaymentStatus, Product } from "@/types";

/**
 * Computes administrative dashboard metrics from real Supabase data.
 */
export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const supabase = await createClient();

  // 1. Fetch Orders metrics
  const { data: orders } = await supabase
    .from("orders")
    .select("id, total_amount, status, created_at")
    .order("created_at", { ascending: false });

  // 2. Fetch Products metrics
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("stock", { ascending: true });

  const allOrders = orders || [];
  const allProducts = products || [];

  const totalRevenue = allOrders.reduce((sum, o) => {
    // Only count non-cancelled orders towards revenue
    if (o.status !== "CANCELLED") {
      return sum + Number(o.total_amount || 0);
    }
    return sum;
  }, 0);

  const pendingOrders = allOrders.filter(
    (o) => o.status === "PENDING" || o.status === "PROCESSING" || o.status === "CONFIRMED"
  ).length;

  const deliveredOrders = allOrders.filter((o) => o.status === "DELIVERED").length;

  const activeProducts = allProducts.filter((p) => p.is_active).length;
  const lowStockItems = allProducts.filter((p) => p.is_active && p.stock <= 10);

  // Recent 5 full orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalOrders: allOrders.length,
    pendingOrders,
    deliveredOrders,
    totalProducts: allProducts.length,
    activeProducts,
    lowStockProducts: lowStockItems.length,
    recentOrders: (recentOrders || []) as Order[],
    lowStockItems: (lowStockItems || []) as Product[],
  };
}

/**
 * Fetch all orders with optional status filter and customer search.
 */
export async function getAllOrders(params: {
  status?: OrderStatus;
  search?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<Order[]> {
  const { status, search, limit = 50, offset = 0 } = params;
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (search && search.trim() !== "") {
    const term = search.trim();
    query = query.or(
      `shipping_name.ilike.%${term}%,shipping_email.ilike.%${term}%,id.eq.${term}`
    );
  }

  if (limit) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching admin orders:", error.message);
    return [];
  }

  return (data || []) as Order[];
}

/**
 * Update an order's fulfillment and/or payment status.
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  paymentStatus?: PaymentStatus
) {
  const supabase = await createClient();

  const updatePayload: {
    status: OrderStatus;
    updated_at: string;
    payment_status?: PaymentStatus;
  } = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (paymentStatus) {
    updatePayload.payment_status = paymentStatus;
  } else if (status === "DELIVERED") {
    // If delivered, mark payment as paid if it was pending COD
    updatePayload.payment_status = "PAID";
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updatePayload)
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Order;
}
