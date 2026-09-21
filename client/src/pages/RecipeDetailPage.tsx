import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getRecipeById } from "../api/recipes";
import CategoryBadge from "../components/CategoryBadge";
import IngredientList from "../components/IngredientList";
import DirectionsList from "../components/DirectionsList";
import type { RecipeDetail } from "../types/recipe";


export default function RecipeDetailPage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      const recipeId = Number(id);

      if (!Number.isInteger(recipeId) || recipeId <= 0) {
        setError("Invalid recipe ID.");
        setLoading(false);
        return;
      }

      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to load recipe:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load recipe."
        );
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (error || !recipe) {
    return (
      <main>
        <p>{error ?? "Recipe not found."}</p>
        <Link to="/recipes">Back to recipes</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/recipes">← Back to recipes</Link>

      <h1>{recipe.Title}</h1>

      <p>
        By{" "}
        {recipe.User.UserName ??
          `${recipe.User.FirstName ?? ""} ${
            recipe.User.LastName ?? ""
          }`.trim()}
      </p>

      {recipe.Description && <p>{recipe.Description}</p>}

      {recipe.PrepTime !== null && (
        <p>Prep time: {recipe.PrepTime} minutes</p>
      )}

      {recipe.CookTime !== null && (
        <p>Cook time: {recipe.CookTime} minutes</p>
      )}

      {recipe.Yield !== null && (
        <p>Servings: {recipe.Yield}</p>
      )}

      <div>
        {recipe.RecipeCategories.map(({ Category }) => (
          <CategoryBadge
            key={Category.CategoryId}
            category={Category}
          />
        ))}
      </div>

      {recipe.Comments && <p>{recipe.Comments}</p>}

      <IngredientList ingredients={recipe.Ingredients} />

      <DirectionsList directions={recipe.Directions} />
    </main>
  );
}