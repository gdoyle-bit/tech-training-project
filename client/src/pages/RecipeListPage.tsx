import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipes";
import type { Recipe } from "../types/recipe";
import { Link } from "react-router-dom";

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

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div>
          {recipes.map((recipe) => (
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
                  <Link
                    key={Category.CategoryId}
                    to={`/categories/${Category.CategoryId}`}
                  >
                    {Category.Name}{" "}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}