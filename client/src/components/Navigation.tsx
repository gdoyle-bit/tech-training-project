import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Recipe Manager</Link>{" "}
      <Link to="/recipes">Recipes</Link>{" "}
      <Link to="/categories">Categories</Link>
    </nav>
  );
}