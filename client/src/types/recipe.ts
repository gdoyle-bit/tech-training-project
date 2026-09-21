export interface User {
  UserId: number;
  UserName: string | null;
  FirstName: string | null;
  LastName: string | null;
}

export interface Category {
  CategoryId: number;
  Name: string;
  Description: string | null;
}

export interface RecipeCategory {
  RecipeId: number;
  CategoryId: number;
  Category: Category;
}

export interface Ingredient {
  IngredientId: number;
  RecipeId: number;
  IngredientOrder: number;
  Name: string;
  Quantity: string | null;
  Unit: string | null;
  Notes: string | null;
}

export interface Direction {
  DirectionId: number;
  RecipeId: number;
  StepNumber: number;
  Instruction: string;
}

export interface Recipe {
  RecipeId: number;
  UserId: number;
  Title: string;
  Photo: string | null;
  PrepTime: number | null;
  Yield: number | null;
  TimeStamp: string;
  Comments: string | null;

  User: User;
  RecipeCategories: RecipeCategory[];
}

export interface RecipeDetail extends Recipe {
  Ingredients: Ingredient[];
  Directions: Direction[];
}