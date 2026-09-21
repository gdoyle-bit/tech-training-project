import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getRecipesByCategory,
  type CategoryRecipesResponse,
} from "../api/categories";

export default function CategoryRecipesPage() {
  const { id } = useParams();

  const [data, setData] =
    useState<CategoryRecipesResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategory() {
      const categoryId = Number(id);

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        setError("Invalid category ID.");
        setLoading(false);
        return;
      }

      try {
        const result = await getRecipesByCategory(categoryId);
        setData(result);
      } catch (error) {
        console.error("Failed to load category:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load category."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [id]);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error || !data) {
    return (
      <main>
        <p>{error ?? "Category not found."}</p>
        <Link to="/categories">Back to categories</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/categories">← Back to categories</Link>

      <h1>{data.category.Name} Recipes</h1>

      {data.category.Description && (
        <p>{data.category.Description}</p>
      )}

      {data.recipes.length === 0 ? (
        <p>No recipes found in this category.</p>
      ) : (
        <div>
          {data.recipes.map((recipe) => (
            <article key={recipe.RecipeId}>
              <h2>
                <Link to={`/recipes/${recipe.RecipeId}`}>
                  {recipe.Title}
                </Link>
              </h2>

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
            </article>
          ))}
        </div>
      )}
    </main>
  );
}