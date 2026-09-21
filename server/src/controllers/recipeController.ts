import type { Request, Response } from "express";
import prisma from "../lib/prisma.ts";

export async function getRecipes(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        User: true,
        RecipeCategories: {
          include: {
            Category: true,
          },
        },
      },
      orderBy: {
        TimeStamp: "desc",
      },
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Failed to get recipes:", error);

    res.status(500).json({
      message: "Failed to get recipes.",
    });
  }
}

export async function getRecipeById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const recipeId = Number(req.params.id);

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
      res.status(400).json({
        message: "Invalid recipe ID.",
      });
      return;
    }

    const recipe = await prisma.recipe.findUnique({
      where: {
        RecipeId: recipeId,
      },

      include: {
        User: true,

        Ingredients: {
          orderBy: {
            IngredientOrder: "asc",
          },
        },

        Directions: {
          orderBy: {
            StepNumber: "asc",
          },
        },

        RecipeCategories: {
          include: {
            Category: true,
          },
        },
      },
    });

    if (!recipe) {
      res.status(404).json({
        message: "Recipe not found.",
      });
      return;
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Failed to get recipe:", error);

    res.status(500).json({
      message: "Failed to get recipe.",
    });
  }
}