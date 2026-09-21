import type { Category, Recipe } from "../types/recipe";

const API_URL = import.meta.env.VITE_API_URL;

export interface CategoryRecipesResponse {
  category: Category;
  recipes: Recipe[];
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  return response.json();
}

export async function getRecipesByCategory(
  categoryId: number
): Promise<CategoryRecipesResponse> {
  const response = await fetch(
    `${API_URL}/api/categories/${categoryId}/recipes`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Category not found.");
    }

    throw new Error("Failed to fetch category recipes.");
  }

  return response.json();
}