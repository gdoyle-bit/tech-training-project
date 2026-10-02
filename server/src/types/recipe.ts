export interface CreateRecipeIngredient {
  name: string;
  quantity?: number | null;
  unit?: string | null;
  notes?: string | null;
}

export interface CreateRecipeDirection {
  instruction: string;
}

export interface CreateRecipeRequest {
  title: string;
  description?: string | null;
  prepTime?: number | null;
  cookTime?: number | null;
  servings?: number | null;
  ingredients: CreateRecipeIngredient[];
  directions: CreateRecipeDirection[];
  categoryIds: number[];
}