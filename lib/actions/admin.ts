"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/db/auth";
import { createProduct, toggleProductActive, updateProduct } from "@/lib/db/products";
import { createCategory, deleteCategory, updateCategory } from "@/lib/db/categories";
import { updateOrderStatus } from "@/lib/db/admin";
import { OrderStatus, PaymentStatus } from "@/types";

export async function createProductAction(formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const description = (formData.get("description") as string)?.trim();
  const price = parseFloat(formData.get("price") as string);
  const compareAtPriceStr = formData.get("compare_at_price") as string;
  const compare_at_price = compareAtPriceStr ? parseFloat(compareAtPriceStr) : null;
  const category_id = (formData.get("category_id") as string) || null;
  const image_url = (formData.get("image_url") as string)?.trim();
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const sku = (formData.get("sku") as string)?.trim() || null;
  const is_active = formData.get("is_active") === "true";

  if (!name || !slug || !description || isNaN(price) || !image_url) {
    return { success: false, error: "Please provide all required fields." };
  }

  try {
    const created = await createProduct({
      name,
      slug,
      description,
      price,
      compare_at_price,
      category_id,
      image_url,
      stock,
      sku,
      is_active,
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true, product: created };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create product";
    return { success: false, error: message };
  }
}

export async function updateProductAction(productId: string, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const description = (formData.get("description") as string)?.trim();
  const price = parseFloat(formData.get("price") as string);
  const compareAtPriceStr = formData.get("compare_at_price") as string;
  const compare_at_price = compareAtPriceStr ? parseFloat(compareAtPriceStr) : null;
  const category_id = (formData.get("category_id") as string) || null;
  const image_url = (formData.get("image_url") as string)?.trim();
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const sku = (formData.get("sku") as string)?.trim() || null;
  const is_active = formData.get("is_active") === "true";

  if (!name || !slug || !description || isNaN(price) || !image_url) {
    return { success: false, error: "Please fill all required fields correctly." };
  }

  try {
    const updated = await updateProduct(productId, {
      name,
      slug,
      description,
      price,
      compare_at_price,
      category_id,
      image_url,
      stock,
      sku,
      is_active,
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}/edit`);
    revalidatePath(`/products/${slug}`);
    revalidatePath("/products");
    return { success: true, product: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update product";
    return { success: false, error: message };
  }
}

export async function toggleProductActiveAction(productId: string, isActive: boolean) {
  await requireAdmin();

  try {
    const updated = await toggleProductActive(productId, isActive);
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, product: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle status";
    return { success: false, error: message };
  }
}

export async function createCategoryAction(formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const description = (formData.get("description") as string)?.trim() || null;
  const image_url = (formData.get("image_url") as string)?.trim() || null;

  if (!name || !slug) {
    return { success: false, error: "Category name and slug are required." };
  }

  try {
    const category = await createCategory({
      name,
      slug,
      description: description || undefined,
      image_url: image_url || undefined,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    revalidatePath("/");
    return { success: true, category };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create category";
    return { success: false, error: message };
  }
}

export async function updateCategoryAction(categoryId: string, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const description = (formData.get("description") as string)?.trim() || null;
  const image_url = (formData.get("image_url") as string)?.trim() || null;

  if (!name || !slug) {
    return { success: false, error: "Category name and slug are required." };
  }

  try {
    const category = await updateCategory(categoryId, {
      name,
      slug,
      description,
      image_url,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    revalidatePath("/");
    return { success: true, category };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update category";
    return { success: false, error: message };
  }
}

export async function deleteCategoryAction(categoryId: string) {
  await requireAdmin();

  try {
    await deleteCategory(categoryId);
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete category";
    return { success: false, error: message };
  }
}

export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus,
  paymentStatus?: PaymentStatus
) {
  await requireAdmin();

  try {
    const updated = await updateOrderStatus(orderId, status, paymentStatus);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath(`/orders/${orderId}`);
    revalidatePath("/orders");
    return { success: true, order: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update order status";
    return { success: false, error: message };
  }
}
