import type { Recipe, RecipeDetail } from "../types/recipe";

const API_URL = import.meta.env.VITE_API_URL;

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_URL}/api/recipes`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes.");
  }

  return response.json();
}

export async function getRecipeById(
  recipeId: number
): Promise<RecipeDetail> {
  const response = await fetch(
    `${API_URL}/api/recipes/${recipeId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Recipe not found.");
    }

    throw new Error("Failed to fetch recipe.");
  }

  return response.json();
}