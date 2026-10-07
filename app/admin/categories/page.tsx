import React from "react";
import { getCategories } from "@/lib/db/categories";
import { CategoryManager } from "@/components/admin/CategoryManager";

export const metadata = {
  title: "Categories Management | Admin Portal",
  description: "Create, edit, and organize product categories.",
};

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return <CategoryManager initialCategories={categories} />;
}
