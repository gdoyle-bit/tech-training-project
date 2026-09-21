import { useEffect, useState } from "react";

import { getRecipes } from "../api/recipes";
import RecipeList from "../components/RecipeList";
import type { Recipe } from "../types/recipe";

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to load recipes:", error);
        setError("Unable to load recipes.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Recipes</h1>

      <RecipeList recipes={recipes} />
    </main>
  );
}