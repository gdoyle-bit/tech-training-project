import { useState, type SyntheticEvent } from "react";
import type {
  Category,
  CreateRecipeRequest,
} from "../types/recipe";

interface IngredientFormData {
  name: string;
  quantity: string;
  unit: string;
  notes: string;
}

interface DirectionFormData {
  instruction: string;
}

interface RecipeFormProps {
  categories: Category[];
  onSubmit: (recipe: CreateRecipeRequest) => Promise<void>;
  submitting: boolean;
}

export default function RecipeForm({
  categories,
  onSubmit,
  submitting,
}: RecipeFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");

  const [ingredients, setIngredients] = useState<IngredientFormData[]>([
    {
      name: "",
      quantity: "",
      unit: "",
      notes: "",
    },
  ]);

  const [directions, setDirections] = useState<DirectionFormData[]>([
  {
      instruction: "",
  },
  ]);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([

  ]);

    function addIngredient() {
    setIngredients([
        ...ingredients,
        {
        name: "",
        quantity: "",
        unit: "",
        notes: "",
        },
    ]);
    }

    function removeIngredient(index: number) {
    setIngredients(
        ingredients.filter((_, ingredientIndex) => ingredientIndex !== index),
    );
    }

    function updateIngredient(
    index: number,
    field: keyof IngredientFormData,
    value: string,
    ) {
    setIngredients(
        ingredients.map((ingredient, ingredientIndex) =>
        ingredientIndex === index
            ? {
                ...ingredient,
                [field]: value,
            }
            : ingredient,
        ),
    );
    }

    function addDirection() {
    setDirections([
        ...directions,
        {
        instruction: "",
        },
    ]);
    }

    function removeDirection(index: number) {
    setDirections(
        directions.filter(
        (_, directionIndex) => directionIndex !== index,
        ),
    );
    }

    function updateDirection(index: number, value: string) {
    setDirections(
        directions.map((direction, directionIndex) =>
        directionIndex === index
            ? {
                ...direction,
                instruction: value,
            }
            : direction,
        ),
    );
    }

    function toggleCategory(categoryId: number) {
    setSelectedCategoryIds((currentCategoryIds) =>
        currentCategoryIds.includes(categoryId)
        ? currentCategoryIds.filter((id) => id !== categoryId)
        : [...currentCategoryIds, categoryId],
    );
    }

    async function handleSubmit(
      event: SyntheticEvent<HTMLFormElement>,
    ) {
      event.preventDefault();

      const recipe: CreateRecipeRequest = {
        title: title.trim(),
        description: description.trim() || null,
        prepTime: prepTime === "" ? null : Number(prepTime),
        cookTime: cookTime === "" ? null : Number(cookTime),
        servings: servings === "" ? null : Number(servings),

        ingredients: ingredients.map((ingredient) => ({
          name: ingredient.name.trim(),
          quantity:
            ingredient.quantity === ""
              ? null
              : Number(ingredient.quantity),
          unit: ingredient.unit.trim() || null,
          notes: ingredient.notes.trim() || null,
        })),

        directions: directions.map((direction) => ({
          instruction: direction.instruction.trim(),
        })),

        categoryIds: selectedCategoryIds,
      };

      await onSubmit(recipe);
    }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="prepTime">Prep Time (minutes)</label>
        <br />
        <input
          id="prepTime"
          type="number"
          min="0"
          value={prepTime}
          onChange={(event) => setPrepTime(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="cookTime">Cook Time (minutes)</label>
        <br />
        <input
          id="cookTime"
          type="number"
          min="0"
          value={cookTime}
          onChange={(event) => setCookTime(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="servings">Servings</label>
        <br />
        <input
          id="servings"
          type="number"
          min="1"
          value={servings}
          onChange={(event) => setServings(event.target.value)}
        />
      </div>

        <fieldset>
    <legend>Ingredients</legend>

    {ingredients.map((ingredient, index) => (
        <div key={index}>
        <h3>Ingredient {index + 1}</h3>

        <div>
            <label htmlFor={`ingredient-name-${index}`}>Name</label>
            <br />
            <input
            id={`ingredient-name-${index}`}
            type="text"
            value={ingredient.name}
            onChange={(event) =>
                updateIngredient(index, "name", event.target.value)
            }
            required
            />
        </div>

        <div>
            <label htmlFor={`ingredient-quantity-${index}`}>
            Quantity
            </label>
            <br />
            <input
            id={`ingredient-quantity-${index}`}
            type="number"
            min="0"
            step="0.01"
            value={ingredient.quantity}
            onChange={(event) =>
                updateIngredient(index, "quantity", event.target.value)
            }
            />
        </div>

        <div>
            <label htmlFor={`ingredient-unit-${index}`}>Unit</label>
            <br />
            <input
            id={`ingredient-unit-${index}`}
            type="text"
            value={ingredient.unit}
            onChange={(event) =>
                updateIngredient(index, "unit", event.target.value)
            }
            />
        </div>

        <div>
            <label htmlFor={`ingredient-notes-${index}`}>Notes</label>
            <br />
            <input
            id={`ingredient-notes-${index}`}
            type="text"
            value={ingredient.notes}
            onChange={(event) =>
                updateIngredient(index, "notes", event.target.value)
            }
            />
        </div>

        {ingredients.length > 1 && (
            <button
            type="button"
            onClick={() => removeIngredient(index)}
            >
            Remove Ingredient
            </button>
        )}
        </div>
    ))}

            <button type="button" onClick={addIngredient}>
            Add Ingredient
            </button>
    </fieldset>

        <fieldset>
    <legend>Directions</legend>

    {directions.map((direction, index) => (
        <div key={index}>
        <h3>Step {index + 1}</h3>

        <label htmlFor={`direction-${index}`}>
            Instruction
        </label>
        <br />

        <textarea
            id={`direction-${index}`}
            value={direction.instruction}
            onChange={(event) =>
            updateDirection(index, event.target.value)
            }
            required
        />

        {directions.length > 1 && (
            <button
            type="button"
            onClick={() => removeDirection(index)}
            >
            Remove Step
            </button>
        )}
        </div>
    ))}

    <button type="button" onClick={addDirection}>
        Add Step
    </button>
    </fieldset>

    <fieldset>
    <legend>Categories</legend>

    {categories.map((category) => (
        <div key={category.CategoryId}>
        <label>
            <input
            type="checkbox"
            checked={selectedCategoryIds.includes(category.CategoryId)}
            onChange={() => toggleCategory(category.CategoryId)}
            />
            {" "}
            {category.Name}
        </label>
        </div>
    ))}
    </fieldset>

      <button type="submit" disabled={submitting}>
        {submitting ? "Creating Recipe..." : "Create Recipe"}
      </button>
    </form>
  );
}