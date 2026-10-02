import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getRecipesByCategory } from "../api/categories";
import RecipeList from "../components/RecipeList";
import type { Recipe } from "../types/recipe";

export default function CategoryRecipesPage() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const categoryId = Number(id);

        if (!Number.isInteger(categoryId) || categoryId <= 0) {
          setError("Invalid category.");
          return;
        }

        const data = await getRecipesByCategory(categoryId);
        setRecipes(data);
      } catch (error) {
        console.error("Failed to load category recipes:", error);
        setError("Unable to load recipes for this category.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, [id]);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <Link to="/categories">← Back to categories</Link>

      <h1>Category Recipes</h1>

      {recipes.length === 0 ? (
        <p>No recipes found in this category.</p>
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </main>
  );
}