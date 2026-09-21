import RecipeCard from "./RecipeCard";
import type { Recipe } from "../types/recipe";

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({
  recipes,
}: RecipeListProps) {
  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.RecipeId}
          recipe={recipe}
        />
      ))}
    </div>
  );
}