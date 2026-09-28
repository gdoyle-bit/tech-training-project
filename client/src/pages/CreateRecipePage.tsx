import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCategories } from "../api/categories";
import RecipeForm from "../components/RecipeForm";
import type { Category } from "../types/recipe";

export default function CreateRecipePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <p>Loading recipe form...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <Link to="/dashboard">← Back to dashboard</Link>

      <h1>Create Recipe</h1>

      <RecipeForm categories={categories} />
    </main>
  );
}