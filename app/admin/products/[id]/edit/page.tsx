import React from "react";
import { notFound } from "next/navigation";
import { getCategories } from "@/lib/db/categories";
import { getProductById } from "@/lib/db/products";
import { ProductForm } from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Edit Product | Admin Portal",
  description: "Modify product pricing, description, and inventory.",
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [categories, product] = await Promise.all([
    getCategories(),
    getProductById(id),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductForm categories={categories} initialProduct={product} />;
}
