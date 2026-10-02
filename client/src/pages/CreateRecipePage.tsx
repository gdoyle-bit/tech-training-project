import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";

import { getCategories } from "../api/categories";
import { createRecipe } from "../api/recipes";
import RecipeForm from "../components/RecipeForm";
import type {
  Category,
  CreateRecipeRequest,
} from "../types/recipe";

export default function CreateRecipePage() {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  async function handleCreateRecipe(
    recipe: CreateRecipeRequest,
  ): Promise<void> {
    try {
      setSubmitting(true);
      setError(null);

      const token = await getToken();

      if (!token) {
        setError("Unable to authenticate user.");
        return;
      }

      const createdRecipe = await createRecipe(token, recipe);

      navigate(`/recipes/${createdRecipe.RecipeId}`);
    } catch (error) {
      console.error("Failed to create recipe:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to create recipe.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p>Loading recipe form...</p>;
  }

  return (
    <main>
      <Link to="/dashboard">← Back to dashboard</Link>

      <h1>Create Recipe</h1>

      {error && <p>{error}</p>}

      <RecipeForm
        categories={categories}
        onSubmit={handleCreateRecipe}
        submitting={submitting}
      />
    </main>
  );
}