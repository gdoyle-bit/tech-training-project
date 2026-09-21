import { Link } from "react-router-dom";
import type { Category } from "../types/recipe";

interface CategoryBadgeProps {
  category: Category;
}

export default function CategoryBadge({
  category,
}: CategoryBadgeProps) {
  return (
    <>
      <Link to={`/categories/${category.CategoryId}`}>
        {category.Name}
      </Link>{" "}
    </>
  );
}