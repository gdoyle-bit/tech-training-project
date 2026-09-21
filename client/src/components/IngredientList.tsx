import type { Ingredient } from "../types/recipe";

interface IngredientListProps {
  ingredients: Ingredient[];
}

export default function IngredientList({
  ingredients,
}: IngredientListProps) {
  return (
    <section>
      <h2>Ingredients</h2>

      {ingredients.length === 0 ? (
        <p>No ingredients listed.</p>
      ) : (
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.IngredientId}>
              {ingredient.Quantity && `${ingredient.Quantity} `}
              {ingredient.Unit && `${ingredient.Unit} `}
              {ingredient.Name}
              {ingredient.Notes && ` (${ingredient.Notes})`}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}