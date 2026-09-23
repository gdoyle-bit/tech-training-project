import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import { Link } from "react-router-dom";

import {
  getCurrentUser,
  getCurrentUserRecipes,
} from "../api/users";
import type { CurrentUser } from "../types/user";
import type { Recipe } from "../types/recipe";

export default function DashboardPage() {
  const { getToken } = useAuth();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = await getToken();

        if (!token) {
          setError("Unable to authenticate user.");
          return;
        }

        const currentUser = await getCurrentUser(token);
        const userRecipes = await getCurrentUserRecipes(token);

        setUser(currentUser);
        setRecipes(userRecipes);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        setError("Unable to load your dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [getToken]);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error || !user) {
    return <p>{error ?? "Unable to load your account."}</p>;
  }

  const displayName =
    user.UserName ??
    `${user.FirstName ?? ""} ${user.LastName ?? ""}`.trim();

  return (
    <main>
      <h1>Dashboard</h1>

      <h2>Your Account</h2>

      {displayName && <p>Name: {displayName}</p>}

      <p>Email: {user.Email}</p>

      <h2>Your Recipes</h2>

      <p>
        You have created {recipes.length}{" "}
        {recipes.length === 1 ? "recipe" : "recipes"}.
      </p>

      {recipes.length === 0 ? (
        <p>You haven't created any recipes yet.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.RecipeId}>
              <Link to={`/recipes/${recipe.RecipeId}`}>
                {recipe.Title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p>
        <Link to="/recipes/new">Create a Recipe</Link>
      </p>
    </main>
  );
}