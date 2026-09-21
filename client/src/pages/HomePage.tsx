import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <h1>Recipe Manager</h1>

      <p>
        Discover, organize, and share recipes with the Recipe Manager.
        Browse recipes from the community or explore recipes by category.
      </p>

      <div>
        <Link to="/recipes">Browse Recipes</Link>{" "}
        <Link to="/categories">Browse Categories</Link>
      </div>
    </main>
  );
}