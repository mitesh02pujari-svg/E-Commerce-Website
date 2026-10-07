import { Database } from "./database";

export * from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];

export interface ProductWithCategory extends Product {
  category?: Category | null;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

export interface CheckoutFormData {
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  payment_method: string;
}

export interface AdminDashboardStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  recentOrders: Order[];
  lowStockItems: Product[];
}
