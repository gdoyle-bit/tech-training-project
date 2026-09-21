import { Link } from "react-router-dom";

import CategoryBadge from "./CategoryBadge";
import type { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({
  recipe,
}: RecipeCardProps) {
  const authorName =
    recipe.User.UserName ??
    `${recipe.User.FirstName ?? ""} ${
      recipe.User.LastName ?? ""
    }`.trim();

  return (
    <article>
      <h2>
        <Link to={`/recipes/${recipe.RecipeId}`}>
          {recipe.Title}
        </Link>
      </h2>

      {recipe.Description && <p>{recipe.Description}</p>}

      <p>By {authorName}</p>

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
    </article>
  );
}