import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCategories } from "../api/categories";
import type { Category } from "../types/recipe";

export default function CategoryListPage() {
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
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Categories</h1>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.CategoryId}>
            <Link to={`/categories/${category.CategoryId}`}>
              {category.Name}
            </Link>

            {category.Description && <p>{category.Description}</p>}

            <p>
              {category._count?.RecipeCategories ?? 0}{" "}
              {category._count?.RecipeCategories === 1 ? "recipe" : "recipes"}
            </p>
          </li>
          ))}
        </ul>
      )}

      <Link to="/recipes">View all recipes</Link>
    </main>
  );
}