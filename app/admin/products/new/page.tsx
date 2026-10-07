import React from "react";
import { getCategories } from "@/lib/db/categories";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = {
  title: "New Product | Admin Portal",
  description: "Create a new catalog product.",
};

export default async function NewProductPage() {
  const categories = await getCategories();

  return <ProductForm categories={categories} />;
}
